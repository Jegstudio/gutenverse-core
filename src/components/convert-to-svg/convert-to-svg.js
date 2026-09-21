import { select, dispatch } from '@wordpress/data';
import { getBlockType } from '@wordpress/blocks';
import { libraryApi } from 'gutenverse-core/config';
import { store as editorStore } from '@wordpress/editor';
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

const getCompanionKeys = ({ container, key, rootSchema = null, isRoot = false }) => {
    const conventionalType = `${key}Type`;
    const conventionalSvg = `${key}SVG`;
    const schemaHasConventionalPair = Boolean(
        rootSchema?.[conventionalType] || rootSchema?.[conventionalSvg]
    );

    if (
        Object.prototype.hasOwnProperty.call(container, conventionalType) ||
        Object.prototype.hasOwnProperty.call(container, conventionalSvg) ||
        (isRoot && schemaHasConventionalPair)
    ) {
        return { typeKey: conventionalType, svgKey: conventionalSvg };
    }

    // Repeater controls may store IconSVGControl's companion values alongside
    // the icon as `type` and `svg` instead of `${attribute}Type`/`SVG`.
    if (
        !isRoot &&
        (key === 'icon' || /icon$/i.test(key)) &&
        (
            Object.prototype.hasOwnProperty.call(container, 'type') ||
            Object.prototype.hasOwnProperty.call(container, 'svg')
        )
    ) {
        return { typeKey: 'type', svgKey: 'svg' };
    }

    return null;
};

const convertIconsInValue = async ({ value, block, path = [], rootSchema = null, isRoot = false }) => {
    if (Array.isArray(value)) {
        let changed = false;
        const stats = { detectedCount: 0, convertedCount: 0, skippedCount: 0, failures: [] };
        const next = [];

        for (let index = 0; index < value.length; index++) {
            const converted = await convertIconsInValue({
                value: value[index],
                block,
                path: [...path, index],
                rootSchema,
                isRoot: false,
            });
            next.push(converted.value);
            changed = changed || converted.changed;
            stats.detectedCount += converted.detectedCount;
            stats.convertedCount += converted.convertedCount;
            stats.skippedCount += converted.skippedCount;
            stats.failures.push(...converted.failures);
        }

        return { value: changed ? next : value, changed, ...stats };
    }

    if (!value || typeof value !== 'object') {
        return { value, changed: false, detectedCount: 0, convertedCount: 0, skippedCount: 0, failures: [] };
    }

    let next = value;
    let changed = false;
    const handled = new Set();
    const stats = { detectedCount: 0, convertedCount: 0, skippedCount: 0, failures: [] };

    for (const [key, rawIcon] of Object.entries(value)) {
        const iconName = normalizeIconValue(rawIcon);
        if (!iconName) continue;

        const companion = getCompanionKeys({ container: value, key, rootSchema, isRoot });
        if (!companion) continue;

        handled.add(key);
        stats.detectedCount++;
        const currentType = value[companion.typeKey];
        const currentSvg = value[companion.svgKey];

        if (currentType && !['icon', 'svg'].includes(currentType)) {
            stats.skippedCount++;
            stats.failures.push({
                blockName: block.name,
                clientId: block.clientId,
                attributePath: [...path, key].join('.'),
                iconName,
                reason: 'unsupported_icon_type',
            });
            continue;
        }
        if (currentType === 'svg' && typeof currentSvg === 'string' && currentSvg) {
            stats.skippedCount++;
            continue;
        }

        const fetched = await fetchSvgContent(iconName);
        if (!fetched.content) {
            stats.failures.push({
                blockName: block.name,
                clientId: block.clientId,
                attributePath: [...path, key].join('.'),
                iconName,
                reason: fetched.reason,
            });
            continue;
        }

        if (!changed) next = { ...value };
        next[companion.typeKey] = 'svg';
        next[companion.svgKey] = fetched.content;
        changed = true;
        stats.convertedCount++;
    }

    for (const [key, child] of Object.entries(value)) {
        if (handled.has(key) || child === null || typeof child !== 'object') continue;
        const converted = await convertIconsInValue({
            value: child,
            block,
            path: [...path, key],
            rootSchema,
            isRoot: false,
        });
        if (converted.changed) {
            if (!changed) next = { ...value };
            next[key] = converted.value;
            changed = true;
        }
        stats.detectedCount += converted.detectedCount;
        stats.convertedCount += converted.convertedCount;
        stats.skippedCount += converted.skippedCount;
        stats.failures.push(...converted.failures);
    }

    return { value: next, changed, ...stats };
};

const processBlockAttributes = async block => {
    if (!block.attributes) return null;
    const rootSchema = getBlockType(block.name)?.attributes || {};
    const converted = await convertIconsInValue({
        value: block.attributes,
        block,
        rootSchema,
        isRoot: true,
    });

    return {
        clientId: block.clientId,
        updatedAttributes: converted.changed ? converted.value : null,
        detectedCount: converted.detectedCount,
        convertedCount: converted.convertedCount,
        skippedCount: converted.skippedCount,
        failures: converted.failures,
    };
};

const processBlocksRecursively = async blocks => {
    const results = [];
    for (const block of blocks) {
        const current = await processBlockAttributes(block);
        if (current) results.push(current);
        if (block.innerBlocks?.length) {
            results.push(...await processBlocksRecursively(block.innerBlocks));
        }
    }
    return results;
};

const convertToSvg = async () => {
    const result = {
        success: false,
        detectedCount: 0,
        convertedCount: 0,
        skippedCount: 0,
        failedCount: 0,
        errors: [],
    };

    const doConversion = async () => {
        const blocks = select('core/block-editor').getBlocks();
        if (!Array.isArray(blocks)) {
            result.errors.push({ reason: 'blocks_unavailable' });
            return;
        }

        const updates = await processBlocksRecursively(blocks);
        const { updateBlockAttributes } = dispatch('core/block-editor');
        for (const update of updates) {
            result.detectedCount += update.detectedCount;
            result.skippedCount += update.skippedCount;
            result.errors.push(...update.failures);
            if (!update.updatedAttributes) continue;

            try {
                updateBlockAttributes(update.clientId, update.updatedAttributes);
                result.convertedCount += update.convertedCount;
            } catch (error) {
                result.errors.push({
                    clientId: update.clientId,
                    reason: 'attribute_update_failed',
                    error: error.message,
                });
            }
        }
        result.failedCount = result.errors.length;
        result.success = true;
    };

    try {
        const renderingMode = select(editorStore).getRenderingMode();
        const { setRenderingMode } = dispatch('core/editor');
        setRenderingMode('post-only');

        if (renderingMode !== 'post-only') {
            await new Promise(resolve => setTimeout(resolve, 2000));
        }
        await doConversion();
    } catch (error) {
        result.errors.push({ reason: 'conversion_failed', error: error.message });
        result.failedCount = result.errors.length;
    }

    return result;
};

window.gutenverseConvertToSvg = convertToSvg;

export default convertToSvg;
