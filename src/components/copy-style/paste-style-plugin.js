import { registerPlugin } from '@wordpress/plugins';
import { PluginBlockSettingsMenuItem } from '@wordpress/editor';
import { PluginBlockSettingsMenuItem as PluginBlockSettingsMenuItemOld } from '@wordpress/edit-post';
import { useSelect } from '@wordpress/data';
import { store as noticesStore } from '@wordpress/notices';
import { useDispatch } from '@wordpress/data';
import { __ } from '@wordpress/i18n';
import { store as blockEditorStore } from '@wordpress/block-editor';
import { getBlockType } from '@wordpress/blocks';
import cryptoRandomString from 'crypto-random-string';
import { getAllGutenverseBlock, getCopyableAttributes } from './copy-style-plugin';
import { GradientIconPasteSVG } from 'gutenverse-core/icons';

const BlockSettingMenuPaste = () => {
    const { createInfoNotice } = useDispatch(noticesStore);
    const { updateBlockAttributes } = useDispatch(blockEditorStore);
    let registeredGutenverse = getAllGutenverseBlock();

    const {
        getSelectedBlock
    } = useSelect(
        (select) => select('core/block-editor'),
        []
    );

    const showNotice = (string) => {
        createInfoNotice(string, {
            type: 'snackbar',
            isDismissible: true,
        });
    };

    const PluginComponent = PluginBlockSettingsMenuItem ? PluginBlockSettingsMenuItem : PluginBlockSettingsMenuItemOld;

    return PluginComponent ? <PluginComponent
        allowedBlocks={registeredGutenverse}
        label={__('Paste Style', '--gctd--')}
        icon={<GradientIconPasteSVG/>}
        onClick={() => {
            if (navigator.clipboard) {
                navigator.clipboard
                    .readText()
                    .then(text => {
                        const data = JSON.parse(text);
                        const { gutenverse, type, styleGroup, attributes } = data;

                        if (gutenverse) {
                            const block = getSelectedBlock();
                            const { clientId, name } = block;
                            const blockDetail = getBlockType(name);
                            const targetStyleGroup = blockDetail?.styleGroup;
                            const targetAttributes = blockDetail?.attributes || {};
                            const copyableAttributes = getCopyableAttributes(targetAttributes);
                            const filteredAttributes = Object.keys(attributes || {}).reduce((result, key) => {
                                if (copyableAttributes[key]) {
                                    result[key] = attributes[key];
                                }

                                return result;
                            }, {});
                            const canPasteSameType = name === type;
                            const canPasteSameGroup = !canPasteSameType && !!styleGroup && styleGroup === targetStyleGroup;

                            if (canPasteSameType || canPasteSameGroup) {
                                updateBlockAttributes(clientId, {
                                    ...filteredAttributes,
                                    refreshStyleId: 'refresh-' + cryptoRandomString({ length: 6, type: 'alphanumeric' })
                                });

                                showNotice(__('Gutenverse Style Pasted', '--gctd--'));
                            } else {
                                showNotice(__('Failed! Please paste style to the same block type or compatible style group', '--gctd--'));
                            }
                        }
                    })
                    .catch(() => {
                        showNotice(__('Failed to Paste Style', '--gctd--'));
                    });
            } else {
                showNotice(__('Unable to read Paste Style', '--gctd--'));
            }
        }}
    /> : null;
};

const gutenversePastePlugin = registerPlugin('gutenverse-block-menu-setting-paste', {
    render: BlockSettingMenuPaste,
});

export default gutenversePastePlugin;
