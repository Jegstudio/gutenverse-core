import { libraryApi } from 'gutenverse-core/config';
import axios from 'axios';

const ICON_FAMILY_PATTERN = /^(?:gtn|fa[bsrldt]?|fa-(?:solid|regular|brands|light|duotone|thin))$/i;
const ICON_GLYPH_PATTERN = /^(?:gtn|fa)-[\w-]+$/i;

const normalizeIconValue = value => {
    if (typeof value !== 'string') return '';
    const tokens = value.trim().split(/\s+/).filter(Boolean);
    if (!tokens.some(token => ICON_FAMILY_PATTERN.test(token))) return '';
    if (!tokens.some(token => ICON_GLYPH_PATTERN.test(token))) return '';
    return tokens.join(' ');
};

const fetchSvgContent = async (iconName, retries = 5, delay = 50) => {
    try {
        const response = await axios.get(`${libraryApi}/get-svg-font`, {
            params: { name: iconName.toLowerCase() }
        });
        const svg = response?.data?.data;
        if (typeof svg === 'string' && svg.trim()) {
            return { content: btoa(svg), reason: '' };
        }
        return { content: null, reason: 'icon_not_found' };
    } catch (error) {
        if (retries > 0) {
            await new Promise(resolve => setTimeout(resolve, delay));
            return fetchSvgContent(iconName, retries - 1, delay);
        }
        return {
            content: null,
            reason: error?.response?.status ? `request_failed_${error.response.status}` : 'request_failed'
        };
    }
};

// Scoped optimizer work is an encoder only. The server owns paths, revision
// validation and the native save; no editor attributes or content are changed.
// Encoding is pure: server-issued fields select glyphs, while the server alone
// validates current source authority and persists the resulting patches.
const encodePreparedIconScope = async scope => {
    if (!Number.isInteger(Number(scope?.sourceId)) || Number(scope.sourceId) < 1 || !['post', 'wp_block', 'gutenverse-pattern', 'wp_template', 'wp_template_part'].includes(scope?.sourceType) || !Array.isArray(scope?.fields) || !scope.fields.length || scope.fields.length > 100) throw new Error('icon_scope_invalid');
    const ids = new Set(); const cache = new Map(); const patches = [];
    for (const field of scope.fields) {
        if (!/^gvo-icon-[a-f0-9]{32}$/.test(field.occurrenceId || '') || field.adapterId !== 'gutenverse/icon-attributes' || ids.has(field.occurrenceId)) throw new Error('icon_scope_invalid');
        const icon = normalizeIconValue(field.iconClass);
        if (!icon) throw new Error('icon_scope_field_changed');
        ids.add(field.occurrenceId);
        if (!cache.has(icon)) cache.set(icon, await fetchSvgContent(icon));
        const result = cache.get(icon);
        if (!result.content) throw new Error(result.reason || 'icon_conversion_failed');
        patches.push({ occurrenceId: field.occurrenceId, svg: result.content });
    }
    return { success: true, patches, convertedCount: patches.length, failedCount: 0 };
};

window.gutenverseEncodeScopedIcons = encodePreparedIconScope;

export { normalizeIconValue, fetchSvgContent, encodePreparedIconScope };
