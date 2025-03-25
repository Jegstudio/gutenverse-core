import { registerPlugin } from '@wordpress/plugins';
import { useSelect, useDispatch, select } from '@wordpress/data';
import { store as editorStore } from '@wordpress/editor';
import { useEffect } from '@wordpress/element';
import { __dangerousOptInToUnstableAPIsOnlyForCoreModules } from '@wordpress/private-apis';
import { getParentId } from 'gutenverse-core/helper';

export const { lock, unlock } = __dangerousOptInToUnstableAPIsOnlyForCoreModules(
    'I acknowledge private features are not for use in themes or plugins and doing so will break in the next version of WordPress.',
    '@wordpress/block-editor'
);

const gutenverseInserterPlugin = registerPlugin('gutenverse-inserter', {
    render: () => {
        const screen = useSelect((select) => {
            return select(editorStore).getCurrentPostType();
        }, []);

        const {
            setInsertionPoint
        } = unlock(useDispatch('core/block-editor'));

        useEffect(() => {
            const renderingMode = select(editorStore).getRenderingMode();

            console.log('Test set insertion point to : ', {
                rootClientId: getParentId(),
                index: undefined,
            });

            if (renderingMode === 'template-locked') {
                setInsertionPoint({
                    rootClientId: getParentId(),
                    index: undefined,
                });
            } else {
                setInsertionPoint({
                    rootClientId: undefined,
                    index: undefined,
                });
            }
        }, [screen]);
    },
});

export default gutenverseInserterPlugin;