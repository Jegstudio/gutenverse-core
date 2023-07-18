import { getBlockType, registerBlockType } from '@wordpress/blocks';
import { doAction } from '@wordpress/hooks';
import { isBlockActive } from 'gutenverse-core/helper';
import { updateBlockList } from 'gutenverse-core-editor/editor-helper';

const registerBlocks = () => {
    const r = require.context('./', true, /index\.js$/);

    r.keys().forEach(key => {
        const { settings, metadata, name } = r(key);

        name && updateBlockList({ name, settings, metadata });

        if (window?.GutenverseConfig && name && !getBlockType(name) && isBlockActive(name)) {
            registerBlockType(name, {
                ...settings,
                ...metadata
            });
        }
    });
};

(() => {
    doAction('gutenverse.before.register.block');
    registerBlocks();
    doAction('gutenverse.after.register.block');
})();
