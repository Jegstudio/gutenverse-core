import { select, dispatch } from '@wordpress/data';
import { getBlockType } from '@wordpress/blocks';
import { store as editorStore } from '@wordpress/editor';
import { normalizeIconValue, fetchSvgContent, encodePreparedIconScope } from './scoped-icon-encoder';

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

        // Image-mode controls retain a default font name that is not rendered.
        // Preserve the selected image instead of reporting its dormant icon as
        // an unresolved conversion.
        if (currentType === 'image') {
            stats.skippedCount++;
            continue;
        }

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

const convertScopedIcons = async scope => {
    if (!Array.isArray(scope?.fields) || !scope.fields.length || scope.fields.length > 100) throw new Error('icon_scope_invalid');
    const editor = select('core/editor');
    const type = ['post', 'page'].includes(editor.getCurrentPostType()) ? 'post' : editor.getCurrentPostType();
    if (![String(scope.sourceId), String(scope.editorEntityId)].includes(String(editor.getCurrentPostId())) || type !== scope.sourceType) throw new Error('icon_source_context_mismatch');
    if (editor.getRenderingMode() !== 'post-only') {
        dispatch('core/editor').setRenderingMode('post-only');
        await new Promise(resolve => setTimeout(resolve, 500));
    }
    const blocks = [];
    const visit = (values, depth = 0) => values.forEach(block => {
        if (depth > 32 || blocks.length >= 2000) throw new Error('icon_scope_tree_incomplete');
        blocks.push(block);
        if (!['core/block', 'core/template-part', 'core/pattern', 'gutenverse-themes-builder/pattern-wrapper'].includes(block.name)) visit(block.innerBlocks || [], depth + 1);
    });
    visit(select('core/block-editor').getBlocks());
    const patches = [];
    for (const field of scope.fields) {
        const matches = blocks.filter(block => block.name === field.blockName && block.attributes?.elementId === field.elementId);
        if (matches.length !== 1) throw new Error('icon_scope_block_unresolved');
        const block = matches[0];
        let container = block.attributes;
        const path = [...field.fieldPath]; const key = path.pop();
        for (const part of path) container = container?.[part];
        const raw = container?.[key] ?? (!path.length ? getBlockType(block.name)?.attributes?.[key]?.default : '');
        const mode = container?.[field.typeKey] || 'icon';
        if (normalizeIconValue(raw) !== normalizeIconValue(field.iconClass) || mode !== 'icon') throw new Error('icon_scope_field_changed');
        const fetched = await fetchSvgContent(field.iconClass);
        if (!fetched.content) throw new Error(fetched.reason || 'icon_conversion_failed');
        patches.push({ occurrenceId: field.occurrenceId, svg: fetched.content });
    }
    return { success: true, convertedCount: patches.length, patches, failedCount: 0 };
};

const convertToSvg = async (options = {}) => {
    if (options.scope) return convertScopedIcons(options.scope);
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
window.gutenverseEncodeScopedIcons = encodePreparedIconScope;

export default convertToSvg;
