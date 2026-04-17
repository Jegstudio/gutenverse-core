
import { registerPlugin } from '@wordpress/plugins';
import { PluginBlockSettingsMenuItem } from '@wordpress/editor';
import { PluginBlockSettingsMenuItem as PluginBlockSettingsMenuItemOld } from '@wordpress/edit-post';
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

export const getCopyableAttributes = (blockAttributes = {}) => {
    return Object.keys(blockAttributes).reduce((result, key) => {
        if (blockAttributes[key]?.copyStyle === true) {
            result[key] = true;
        }

        return result;
    }, {});
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

    const PluginComponent = PluginBlockSettingsMenuItem ? PluginBlockSettingsMenuItem : PluginBlockSettingsMenuItemOld;

    return PluginComponent ? <PluginComponent
        allowedBlocks={registeredGutenverse}
        label={__('Copy Style', '--gctd--')}
        icon={<GradientIconCopySVG />}
        onClick={() => {
            const block = getSelectedBlock();
            const { attributes, name } = block;
            const blockDetail = getBlockType(name);
            const { title, attributes: blockAttributes, styleGroup } = blockDetail;
            let copiedStyle = {};
            const copyableAttributes = getCopyableAttributes(blockAttributes);

            Object.keys(copyableAttributes).forEach(key => {
                copiedStyle[key] = attributes[key];
            });

            copiedStyle = {
                gutenverse: true,
                type: name,
                styleGroup,
                attributes: copiedStyle
            };

            copy(JSON.stringify(copiedStyle)).then(() => {
                createInfoNotice(sprintf(__('Gutenverse "%s" Style Copied', '--gctd--'), title), {
                    type: 'snackbar',
                    isDismissible: true,
                });
            });
        }}
    /> : null;
};

const gutenverseCopyPlugin = registerPlugin('gutenverse-block-menu-setting-copy', {
    render: BlockSettingMenuCopy,
});

export default gutenverseCopyPlugin;
