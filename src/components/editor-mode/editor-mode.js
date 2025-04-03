import { useEffect, useState, createPortal } from '@wordpress/element';
import { registerPlugin } from '@wordpress/plugins';
import { useSelect, useDispatch } from '@wordpress/data';
import { store as editorStore } from '@wordpress/editor';
import { getEditSiteHeader } from 'gutenverse-core/editor-helper';

const gutenverseEditorModePlugin = registerPlugin('gutenverse-editor-mode', {
    render: () => {
        const [injectLocation, setInjectLocation] = useState(null);
        const { renderingMode, currentPostType } = useSelect((select) => {
            return {
                renderingMode: select(editorStore).getRenderingMode(),
                currentPostType: select(editorStore).getCurrentPostType(),
            };
        }, []);

        const { setRenderingMode } = useDispatch(editorStore);

        useEffect(() => {
            getEditSiteHeader().then(result => {
                setInjectLocation(result);
            });
        });

        const changeMode = () => {
            renderingMode === 'template-locked' ? setRenderingMode('post-only') : setRenderingMode('template-locked');
        };

        const editorModeButton = (
            <div className="gutenverse-lock-button" onClick={changeMode}>
                {renderingMode === 'template-locked' ? '🔒 Locked' : '🔓 Unlocked'}
            </div>
        );

        console.log(renderingMode, currentPostType);

        return <>
            {injectLocation && ['post', 'page'].includes(currentPostType) && createPortal(editorModeButton, injectLocation)}
        </>;
    },
});

export default gutenverseEditorModePlugin;