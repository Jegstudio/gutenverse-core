import OptimizerLogo from '../../../framework/assets/icon/icon-optimizer.svg';
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
    <OptimizerLogo viewBox="0 0 24 24" width="16" height="16" aria-hidden="true" focusable="false" />
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
                iconSize={16}
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
