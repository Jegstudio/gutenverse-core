import { useEffect, useState, createPortal } from '@wordpress/element';
import { registerPlugin } from '@wordpress/plugins';
import { useSelect, useDispatch } from '@wordpress/data';
import { store as editorStore } from '@wordpress/editor';
import { getEditSiteHeader } from 'gutenverse-core/editor-helper';
import { Tooltip } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

const gutenverseEditorModePlugin = registerPlugin('gutenverse-editor-mode', {
    render: () => {
        const [compatible, setCompatible] = useState(true);
        const [injectLocation, setInjectLocation] = useState(null);
        const { renderingMode, currentPostType } = useSelect((select) => {
            return {
                renderingMode: select(editorStore).getRenderingMode ? select(editorStore).getRenderingMode() : '_return',
                currentPostType: select(editorStore).getCurrentPostType ? select(editorStore).getCurrentPostType() : '_return',
            };
        }, []);

        const { setRenderingMode } = useDispatch(editorStore);

        useEffect(() => {
            getEditSiteHeader().then(result => {
                setInjectLocation(result);
            });
        });

        useEffect(() => {
            if (renderingMode === '_return' || currentPostType === '_return') {
                setCompatible(false);
            }
        }, [renderingMode]);

        const changeMode = () => {
            setRenderingMode && renderingMode === 'template-locked' ? setRenderingMode('post-only') : setRenderingMode('template-locked');
        };

        const editorModeButton = (
            <Tooltip
                placement="bottom"
                text={renderingMode === 'template-locked' ? __('You are on Show Template mode. Click to go into Content Editing.', '--gctd--') : __('You are currently in Content Editing mode. Click to go to Show Template mode.', '--gctd--')}>
                <div className={`gutenverse-lock-button ${renderingMode === 'template-locked' ? 'locked' : 'unlocked'}`} onClick={changeMode}>
                    {renderingMode === 'template-locked' ? <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M5.83268 5.83464C5.83268 3.53297 7.69768 1.66797 9.99935 1.66797C12.301 1.66797 14.166 3.53297 14.166 5.83464V8.33464H14.4993C15.2327 8.33464 15.8327 8.93464 15.8327 9.66797V15.5013C15.8327 16.6013 14.9327 17.5013 13.8327 17.5013H6.16602C5.06602 17.5013 4.16602 16.6013 4.16602 15.5013V9.66797C4.16602 8.93464 4.76602 8.33464 5.49935 8.33464H5.83268V5.83464ZM12.4993 5.83464V8.33464H7.49935V5.83464C7.49935 4.45297 8.61768 3.33464 9.99935 3.33464C11.381 3.33464 12.4993 4.45297 12.4993 5.83464ZM9.99935 10.2096C9.66796 10.2093 9.34634 10.3218 9.08746 10.5287C8.82858 10.7356 8.64787 11.0244 8.5751 11.3477C8.50232 11.671 8.54183 12.0095 8.68711 12.3073C8.83239 12.6051 9.07478 12.8446 9.37435 12.9863V15.0013C9.37435 15.1671 9.4402 15.326 9.55741 15.4432C9.67462 15.5605 9.83359 15.6263 9.99935 15.6263C10.1651 15.6263 10.3241 15.5605 10.4413 15.4432C10.5585 15.326 10.6243 15.1671 10.6243 15.0013V12.9863C10.9239 12.8446 11.1663 12.6051 11.3116 12.3073C11.4569 12.0095 11.4964 11.671 11.4236 11.3477C11.3508 11.0244 11.1701 10.7356 10.9112 10.5287C10.6524 10.3218 10.3307 10.2093 9.99935 10.2096Z" fill="#FFB200" />
                    </svg> : <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M5.83268 5.83258C5.83128 4.81744 6.20053 3.8367 6.87108 3.07455C7.54164 2.31239 8.46736 1.82125 9.47442 1.69336C10.4815 1.56547 11.5006 1.80963 12.3404 2.37998C13.1801 2.95033 13.7828 3.80764 14.0352 4.79091C14.0904 5.00497 14.0584 5.2322 13.9461 5.42263C13.8338 5.61305 13.6505 5.75108 13.4364 5.80633C13.2224 5.86158 12.9951 5.82954 12.8047 5.71725C12.6143 5.60497 12.4763 5.42163 12.421 5.20758C12.2697 4.61747 11.9081 4.1029 11.4042 3.76056C10.9003 3.41822 10.2887 3.27165 9.6844 3.3484C9.08005 3.42514 8.52452 3.71992 8.12218 4.17735C7.71983 4.63478 7.49835 5.22338 7.49935 5.83258V8.33258H14.4993C15.2327 8.33258 15.8327 8.93258 15.8327 9.66591V15.4992C15.8327 16.5992 14.9327 17.4992 13.8327 17.4992H6.16602C5.06602 17.4992 4.16602 16.5992 4.16602 15.4992V9.66591C4.16602 8.93258 4.76602 8.33258 5.49935 8.33258H5.83268V5.83258ZM9.99935 10.2076C9.66796 10.2072 9.34634 10.3198 9.08746 10.5266C8.82858 10.7335 8.64787 11.0224 8.5751 11.3457C8.50232 11.669 8.54183 12.0074 8.68711 12.3052C8.83239 12.6031 9.07478 12.8426 9.37435 12.9842V14.9992C9.37435 15.165 9.4402 15.324 9.55741 15.4412C9.67462 15.5584 9.83359 15.6242 9.99935 15.6242C10.1651 15.6242 10.3241 15.5584 10.4413 15.4412C10.5585 15.324 10.6243 15.165 10.6243 14.9992V12.9842C10.9239 12.8426 11.1663 12.6031 11.3116 12.3052C11.4569 12.0074 11.4964 11.669 11.4236 11.3457C11.3508 11.0224 11.1701 10.7335 10.9112 10.5266C10.6524 10.3198 10.3307 10.2072 9.99935 10.2076Z" fill="#12B76A" />
                    </svg>}
                </div>
            </Tooltip>
        );

        return <>
            {compatible && injectLocation && ['post', 'page'].includes(currentPostType) && createPortal(editorModeButton, injectLocation)}
        </>;
    },
});

export default gutenverseEditorModePlugin;