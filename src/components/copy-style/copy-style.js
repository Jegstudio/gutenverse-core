
import { registerPlugin } from '@wordpress/plugins';
import { PluginBlockSettingsMenuItem } from '@wordpress/edit-post';
import { useSelect } from '@wordpress/data';
import { getBlockType } from '@wordpress/blocks';
import copy from 'clipboard-copy';
import { store as noticesStore } from '@wordpress/notices';
import { useDispatch } from '@wordpress/data';
import { sprintf, __ } from '@wordpress/i18n';
import { GradientIconCopySVG } from 'gutenverse-core/icons';

export const getAllGutenverseBlock = () => {
    const {
        getBlockTypes,
    } = useSelect(
        (select) => select('core/blocks'),
        []
    );

    let registeredGutenverse = [];
    getBlockTypes().map(block => {
        const { name, allowCopyStyle } = block;
        if (name.startsWith('gutenverse') && allowCopyStyle === true) {
            registeredGutenverse = [
                ...registeredGutenverse,
                name
            ];
        }
    });

    return registeredGutenverse;
};

const BlockSettingMenuCopy = () => {
    const { createInfoNotice } = useDispatch(noticesStore);
    let registeredGutenverse = getAllGutenverseBlock();

    const {
        getSelectedBlock,
    } = useSelect(
        (select) => select('core/block-editor'),
        []
    );

    return <PluginBlockSettingsMenuItem
        allowedBlocks={registeredGutenverse}
        label={__('Copy Style', '--gctd--')}
        icon={<GradientIconCopySVG />}
        onClick={() => {
            const block = getSelectedBlock();
            const { attributes, name } = block;
            const blockDetail = getBlockType(name);
            const { title, attributes: blockAttributes } = blockDetail;
            let copiedStyle = {};

            let copiedKey = [];
            let nonCopiedKey = [];

            Object.keys(blockAttributes).map(key => {
                if (blockAttributes[key].copyStyle === true) {
                    copiedStyle[key] = attributes[key];
                    copiedKey.push(key);
                } else {
                    nonCopiedKey.push(key);
                }
            });

            console.log('======== Copied Key ========');
            console.log(copiedKey);
            console.log('======== Non Copied Key ========');
            console.log(nonCopiedKey);

            copiedStyle = {
                gutenverse: true,
                type: name,
                attributes: copiedStyle
            };

            copy(JSON.stringify(copiedStyle)).then(() => {
                createInfoNotice(sprintf(__('Gutenverse "%s" Style Copied', '--gctd--'), title), {
                    type: 'snackbar',
                    isDismissible: true,
                });
            });
        }}
    />;
};

registerPlugin('gutenverse-block-menu-setting-copy', {
    render: BlockSettingMenuCopy,
});
