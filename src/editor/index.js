import { getBlockType, registerBlockType } from '@wordpress/blocks';
import { isBlockActive, updateBlockList } from 'gutenverse-core/helper';

const registerBlocks = () => {
    const general = require.context('./blocks', true, /index\.js$/);
    const socials = require.context('./blocks/social-share-item', true, /social-share-.+\.js$/);
    const blocks = [general, socials];

    blocks.forEach(block => {
        block.keys().forEach(key => {
            const { settings, metadata, name } = block(key);

            name && updateBlockList({ name, settings, metadata });

            if (window?.GutenverseConfig && name && !getBlockType(name) && isBlockActive(name)) {
                registerBlockType(name, {
                    ...settings,
                    ...metadata
                });
            }
        });
    });
};

(() => {
    registerBlocks();
})();
