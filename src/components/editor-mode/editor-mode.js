import { useEffect, useState, createPortal } from '@wordpress/element';
import { registerPlugin } from '@wordpress/plugins';
import { useSelect, useDispatch } from '@wordpress/data';
import { store as editorStore } from '@wordpress/editor';
import { getEditSiteHeader } from 'gutenverse-core/editor-helper';

const gutenverseEditorModePlugin = registerPlugin('gutenverse-editor-mode', {
    render: () => {
        const [injectLocation, setInjectLocation] = useState(null);
        const { getRenderingMode } = useSelect(editorStore);
        const { setRenderingMode } = useDispatch(editorStore);

        useEffect(() => {
            getEditSiteHeader().then(result => {
                setInjectLocation(result);
            });
        });

        const changeMode = () => {
            getRenderingMode() === 'template-locked' ? setRenderingMode('post-only') : setRenderingMode('template-locked');
        };

        const editorModeButton = (
            <div className="gutenverse-top-button" onClick={changeMode}>
                {getRenderingMode() === 'template-locked' ? 'Locked' : 'Unlocked'}
            </div>
        );

        return <>
            {injectLocation && createPortal(editorModeButton, injectLocation)}
        </>;
    },
});

export default gutenverseEditorModePlugin;