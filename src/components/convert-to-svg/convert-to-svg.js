import { select, dispatch } from '@wordpress/data';
import { libraryApi } from 'gutenverse-core/config';
import { store as editorStore } from '@wordpress/editor';
import axios from 'axios';

/**
 * Prefixes that indicate an icon attribute
 */
const ICON_PREFIXES = ['fas ', 'far ', 'fab ', 'gtn '];

/**
 * Check if a value is an icon (starts with one of the icon prefixes)
 * @param {*} value - The value to check
 * @returns {boolean}
 */
const isIconValue = (value) => {
    if (typeof value !== 'string') return false;
    return ICON_PREFIXES.some(prefix => value.startsWith(prefix));
};

/**
 * Fetch SVG content from server for a given icon name with retry functionality
 * @param {string} iconName - The icon name (e.g., "fas fa-star")
 * @param {number} retries - Number of retry attempts (default: 2)
 * @param {number} delay - Delay in ms between retries (default: 50)
 * @returns {Promise<string|null>} - Base64 encoded SVG or null if failed
 */
const fetchSvgContent = async (iconName, retries = 2, delay = 50) => {
    try {
        const response = await axios.get(libraryApi + '/get-svg-font', {
            params: {
                name: iconName.toLowerCase()
            }
        });
        const { data } = response;
        if (data.data !== false) {
            return btoa(data.data);
        }
        return null;
    } catch (error) {
        if (retries > 0) {
            // Wait for delay then retry
            await new Promise(resolve => setTimeout(resolve, delay));
            return fetchSvgContent(iconName, retries - 1, delay);
        }
        return null;
    }
};

/**
 * Process a single block's attributes and convert icons to SVG
 * @param {Object} block - The block to process
 * @returns {Promise<Object|null>} - Updated attributes or null if no changes
 */
const processBlockAttributes = async (block) => {
    const { attributes, clientId } = block;
    if (!attributes) return null;

    const updatedAttributes = {};
    let hasChanges = false;

    // Loop through all attributes
    for (const [attrName, attrValue] of Object.entries(attributes)) {
        // Check if the attribute value is an icon
        if (isIconValue(attrValue)) {
            const typeAttrName = `${attrName}Type`;
            const svgAttrName = `${attrName}SVG`;

            // Check if corresponding Type and SVG attributes exist in the block
            // We'll update them regardless of whether they're defined in the schema
            const currentType = attributes[typeAttrName];
            const currentSvg = attributes[svgAttrName];

            // Only convert if not already svg type or if SVG content is empty
            if (currentType !== 'svg' || !currentSvg) {
                // Fetch SVG content from server
                const svgContent = await fetchSvgContent(attrValue);
                if (svgContent) {
                    updatedAttributes[typeAttrName] = 'svg';
                    updatedAttributes[svgAttrName] = svgContent;
                    hasChanges = true;
                    const styles = {
                        reset: 'color: inherit',
                        green: 'color: #4caf50; font-weight: bold',
                        cyan: 'color: #00bcd4; font-weight: bold',
                        yellow: 'color: #ff9800; font-weight: bold',
                        dim: 'color: #9e9e9e',
                        red: 'color: #f44336; font-weight: bold',
                    };

                    // eslint-disable-next-line no-console
                    console.log(
                        `%c[Success]%c ${attrName} (${attrValue})\n%c         └─ from: %c${block.name} (${clientId})\n`,
                        styles.green,
                        styles.cyan,
                        styles.dim,
                        styles.yellow
                    );
                } else {
                    const styles = {
                        reset: 'color: inherit',
                        green: 'color: #4caf50; font-weight: bold',
                        cyan: 'color: #00bcd4; font-weight: bold',
                        yellow: 'color: #ff9800; font-weight: bold',
                        dim: 'color: #9e9e9e',
                        red: 'color: #f44336; font-weight: bold',
                    };

                    // eslint-disable-next-line no-console
                    console.log(
                        `%c[Failed]%c ${attrName} (${attrValue})\n%c         └─ from: %c${block.name} (${clientId})\n`,
                        styles.red,
                        styles.cyan,
                        styles.dim,
                        styles.yellow
                    );
                }
            }
        }
    }

    return hasChanges ? { clientId, updatedAttributes } : null;
};

/**
 * Recursively process all blocks (including inner blocks)
 * @param {Array} blocks - Array of blocks to process
 * @returns {Promise<Array>} - Array of updates to apply
 */
const processBlocksRecursively = async (blocks) => {
    const updates = [];

    for (const block of blocks) {
        // Process current block
        const update = await processBlockAttributes(block);
        if (update) {
            updates.push(update);
        }

        // Process inner blocks recursively
        if (block.innerBlocks && block.innerBlocks.length > 0) {
            const innerUpdates = await processBlocksRecursively(block.innerBlocks);
            updates.push(...innerUpdates);
        }
    }

    return updates;
};

/**
 * Convert all icon attributes to SVG in the current editor
 * This function loops through all blocks in the editor, finds attributes
 * with icon prefixes (fas, far, fab, gtn), and converts them to SVG format.
 *
 * @returns {Promise<{success: boolean, convertedCount: number, errors: Array}>}
 */
const convertToSvg = async () => {
    const result = {
        success: false,
        convertedCount: 0,
        errors: []
    };

    const doConvertion = async () => {
        // Get all blocks from the editor
        const blocks = select('core/block-editor').getBlocks();

        if (!blocks || blocks.length === 0) {
            // eslint-disable-next-line no-console
            console.log('[ConvertToSVG] No blocks found in the editor');
            result.success = true;
            return result;
        }

        // eslint-disable-next-line no-console
        console.log(`[ConvertToSVG] Starting conversion... Found ${blocks.length} top-level blocks`);

        // Process all blocks recursively
        const updates = await processBlocksRecursively(blocks);

        // Apply all updates
        const { updateBlockAttributes } = dispatch('core/block-editor');

        for (const update of updates) {
            try {
                updateBlockAttributes(update.clientId, update.updatedAttributes);
                result.convertedCount++;
            } catch (error) {
                result.errors.push({
                    clientId: update.clientId,
                    error: error.message
                });
            }
        }

        result.success = true;
        // eslint-disable-next-line no-console
        console.log(`[ConvertToSVG] Conversion complete. Converted ${result.convertedCount} icon(s) to SVG.`);
    };

    try {
        const renderingMode = select(editorStore).getRenderingMode();
        // Set rendering mode to 'post-only' to ensure we can get all content blocks
        const { setRenderingMode } = dispatch('core/editor');
        setRenderingMode('post-only');

        if ('post-only' === renderingMode) {
            doConvertion();
        } else {
            setTimeout(async () => {
                doConvertion();
            }, 2500);
        }
    } catch (error) {
        result.errors.push({
            error: error.message
        });
    }

    return result;
};

// Expose to window for console execution
window.gutenverseConvertToSvg = convertToSvg;

export default convertToSvg;