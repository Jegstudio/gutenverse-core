import { registerPlugin } from '@wordpress/plugins';
import { PluginBlockSettingsMenuItem } from '@wordpress/editor';
import { useSelect } from '@wordpress/data';
import { store as noticesStore } from '@wordpress/notices';
import { useDispatch } from '@wordpress/data';
import { __ } from '@wordpress/i18n';
import { store as blockEditorStore } from '@wordpress/block-editor';
import cryptoRandomString from 'crypto-random-string';
import { getAllGutenverseBlock } from './copy-style-plugin';
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

    return PluginBlockSettingsMenuItem ? <PluginBlockSettingsMenuItem
        allowedBlocks={registeredGutenverse}
        label={__('Paste Style', '--gctd--')}
        icon={<GradientIconPasteSVG/>}
        onClick={() => {
            if (navigator.clipboard) {
                navigator.clipboard
                    .readText()
                    .then(text => {
                        const data = JSON.parse(text);
                        const { gutenverse, type, attributes } = data;

                        if (gutenverse) {
                            const block = getSelectedBlock();
                            const { clientId, name } = block;

                            if (name === type) {
                                updateBlockAttributes(clientId, {
                                    ...attributes,
                                    refreshStyleId: 'refresh-' + cryptoRandomString({ length: 6, type: 'alphanumeric' })
                                });

                                showNotice(__('Gutenverse Style Pasted', '--gctd--'));
                            } else {
                                showNotice(__('Failed! Please paste style to same block type', '--gctd--'));
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
