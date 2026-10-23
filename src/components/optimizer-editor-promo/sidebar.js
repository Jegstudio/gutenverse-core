import { createPortal, useEffect, useRef, useState } from '@wordpress/element';
import { registerPlugin } from '@wordpress/plugins';
import { PluginMoreMenuItem } from '@wordpress/edit-post';
import { useSelect, useDispatch, dispatch } from '@wordpress/data';
import { Button } from '@wordpress/components';
import { closeSmall } from '@wordpress/icons';
import { applyFilters } from '@wordpress/hooks';
import { __ } from '@wordpress/i18n';
import { STORE_NAME } from './store';
import OptimizerEditorPromo from './index';

const OptimizerIcon = () => (
    <svg width="16" height="15" viewBox="0 0 16 15" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
        <path d="M2.50425 8.3095C2.56084 9.54193 3.05535 10.6583 3.83377 11.5052L2.06543 13.2945C0.834276 11.9889 0.0604923 10.2401 0.00162931 8.3095H2.50425Z" fill="currentColor" />
        <path d="M14.9984 8.3095C14.9397 10.2335 14.1704 11.9766 12.9465 13.2808L11.1776 11.4915C11.9489 10.6463 12.4384 9.53531 12.4947 8.3095H14.9984Z" fill="currentColor" />
        <path d="M3.81422 4.65808C3.03827 5.51171 2.5504 6.63581 2.50317 7.87411H0C0.0492636 5.9378 0.818332 4.18225 2.04696 2.86994L3.81422 4.65808Z" fill="currentColor" />
        <path d="M12.965 2.88365C14.1863 4.1945 14.9509 5.94438 15 7.87411H12.4957C12.4488 6.64256 11.9659 5.52424 11.1972 4.67234L12.965 2.88365Z" fill="currentColor" />
        <path d="M7.72837 0.501097C9.63787 0.558782 11.3679 1.33695 12.6614 2.57548L10.893 4.36362C10.0536 3.58006 8.94813 3.08284 7.72837 3.02731V0.501097Z" fill="currentColor" />
        <path d="M7.29769 3.02676C6.07374 3.07582 4.96287 3.56837 4.1189 4.35046L2.3511 2.56232C3.64909 1.32548 5.38429 0.551115 7.29769 0.5V3.02676Z" fill="currentColor" />
        <path d="M8.04083 10.7735C7.86716 10.7314 7.68581 10.7088 7.49935 10.7088C7.31303 10.7088 7.13197 10.7315 6.95842 10.7735L7.34131 4.72912H7.65794L8.04083 10.7735Z" fill="currentColor" />
        <path d="M8.94381 13.0418C8.94381 13.8471 8.29717 14.5 7.49951 14.5C6.70185 14.5 6.05522 13.8471 6.05522 13.0418C6.05522 12.2364 6.70185 11.5836 7.49951 11.5836C8.29717 11.5836 8.94381 12.2364 8.94381 13.0418Z" fill="currentColor" />
    </svg>
);

const usePanelToggle = () => {
    const { toggleLeftPanel } = useDispatch(STORE_NAME);
    return (open) => {
        if (open) {
            const editor = dispatch('core/editor');
            editor.setIsInserterOpened(false);
            editor.setIsListViewOpened(false);
        }
        toggleLeftPanel(open);
        if (!open) {
            document.querySelector('.gutenverse-optimizer-toolbar-button button')?.focus();
        }
    };
};

const LeftPanel = () => {
    const showLeftPanel = useSelect((select) => select(STORE_NAME).isShowLeftPanel(), []);
    const nativePanelOpen = useSelect((select) => {
        const editor = select('core/editor');
        return Boolean(editor.isInserterOpened() || editor.isListViewOpened());
    }, []);
    const previousNativePanelOpen = useRef(nativePanelOpen);
    const togglePanel = usePanelToggle();
    const [editorBody, setEditorBody] = useState(null);
    const panelRef = useRef(null);

    useEffect(() => {
        const findBody = () => setEditorBody(document.querySelector('.interface-interface-skeleton__body'));
        findBody();
        const observer = new MutationObserver(findBody);
        observer.observe(document.body, { childList: true, subtree: true });
        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        if (nativePanelOpen && !previousNativePanelOpen.current && showLeftPanel) {
            togglePanel(false);
        }
        previousNativePanelOpen.current = nativePanelOpen;
    }, [nativePanelOpen, showLeftPanel]);

    useEffect(() => {
        if (showLeftPanel) {
            panelRef.current?.querySelector('button')?.focus();
        }
    }, [showLeftPanel, editorBody]);

    if (!showLeftPanel || !editorBody) {
        return null;
    }

    const fallback = <OptimizerEditorPromo />;
    const optimizerActive = Boolean(window.GutenverseConfig?.plugins?.['gutenverse-optimizer']?.active);
    const panelContent = optimizerActive
        ? applyFilters('gutenverse-optimizer.editor.left-panel.content', fallback)
        : fallback;

    return createPortal(
        <aside
            ref={panelRef}
            className="gutenverse-optimizer-panel"
            aria-label={__('Gutenverse Optimizer', '--gctd--')}
            onKeyDown={(event) => {
                if ('Escape' === event.key) {
                    event.stopPropagation();
                    togglePanel(false);
                }
            }}
        >
            <div className="gutenverse-optimizer-panel__header">
                <h2>{__('Gutenverse Optimizer', '--gctd--')}</h2>
                <div className="gutenverse-optimizer-panel__header-actions">
                    <Button icon={closeSmall} onClick={() => togglePanel(false)} label={__('Close Optimizer', '--gctd--')} />
                </div>
            </div>
            {panelContent}
        </aside>,
        editorBody
    );
};

const ToolbarToggleButton = () => {
    const showLeftPanel = useSelect((select) => select(STORE_NAME).isShowLeftPanel(), []);
    const togglePanel = usePanelToggle();
    const [toolbarElement, setToolbarElement] = useState(null);

    useEffect(() => {
        const host = document.createElement('div');
        host.className = 'gutenverse-optimizer-toolbar-slot';
        const findToolbar = () => {
            const library = document.querySelector('.gutenverse-top-button');
            const toolbar = document.querySelector('.edit-post-header__toolbar, .editor-header__toolbar');
            if (library && library.nextElementSibling !== host) {
                library.after(host);
            } else if (!library && toolbar && host.parentElement !== toolbar) {
                toolbar.append(host);
            }
            if (host.isConnected) {
                setToolbarElement(host);
            }
        };
        findToolbar();
        const observer = new MutationObserver(findToolbar);
        observer.observe(document.body, { childList: true, subtree: true });
        return () => {
            observer.disconnect();
            host.remove();
        };
    }, []);

    if (!toolbarElement) {
        return null;
    }

    return createPortal(
        <div className={`gutenverse-optimizer-toolbar-button gutenverse-optimizer-toolbar-button-wrapper ${showLeftPanel ? 'is-active' : ''}`}>
            <Button
                onClick={() => togglePanel(!showLeftPanel)}
                isPressed={showLeftPanel}
                className={showLeftPanel ? 'is-active' : ''}
                label={showLeftPanel ? __('Close Optimizer', '--gctd--') : __('Open Optimizer', '--gctd--')}
                showTooltip={true}
                icon={<OptimizerIcon />}
            >
                {__('Optimizer', '--gctd--')}
            </Button>
        </div>,
        toolbarElement
    );
};

const LeftPanelToggle = () => {
    const showLeftPanel = useSelect((select) => select(STORE_NAME).isShowLeftPanel(), []);
    const togglePanel = usePanelToggle();
    return (
        <>
            <ToolbarToggleButton />
            <PluginMoreMenuItem icon={<OptimizerIcon />} onClick={() => togglePanel(!showLeftPanel)}>
                {__('Optimizer', '--gctd--')}
            </PluginMoreMenuItem>
            <LeftPanel />
        </>
    );
};

registerPlugin('gutenverse-optimizer-left-panel', {
    render: LeftPanelToggle,
    icon: <OptimizerIcon />,
});
