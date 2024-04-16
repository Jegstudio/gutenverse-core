import { useState } from '@wordpress/element';
import { KeyboardShortcuts, Popover, ToolbarButton, CheckboxControl } from '@wordpress/components';
import { __experimentalLinkControl as LinkControl } from '@wordpress/block-editor';
import { link, linkOff } from '@wordpress/icons';
import { __ } from '@wordpress/i18n';
import { displayShortcut, rawShortcut } from '@wordpress/keycodes';
import { applyFilters } from '@wordpress/hooks';

export const URLToolbar = ({
    isSelected,
    url,
    setAttributes,
    opensInNewTab,
    onToggleOpenInNewTab,
    anchorRef,
    usingDynamic,
    setPanelState,
    panelState,
    isDynamic = false,
}) => {
    const [isURLPickerOpen, setIsURLPickerOpen] = useState(false);
    const [isChecked, setIsChecked] = useState(false);
    const urlIsSet = !!url;
    const urlIsSetandSelected = urlIsSet && isSelected;

    const openLinkControl = () => {
        setIsURLPickerOpen(true);
        return false; // prevents default behaviour for event
    };

    const unlinkButton = () => {
        setAttributes({
            url: undefined,
            linkTarget: undefined,
            rel: undefined,
        });
        setIsURLPickerOpen(false);
    };

    const isPro = applyFilters('gutenverse.toolbar.url-toolbar');

    const linkControl = (isURLPickerOpen || urlIsSetandSelected) && (
        <Popover
            position="bottom center"
            onClose={() => setIsURLPickerOpen(false)}
            anchorRef={anchorRef?.current}
        >
            <LinkControl
                className="wp-block-navigation-link__inline-link-input"
                value={{ url, opensInNewTab, isDynamic }}
                settings={(urlIsSetandSelected && isPro) ? [
                    {
                        id: 'opensInNewTab',
                        title: 'Open in new tab',
                    },
                    {
                        id: 'isDynamic',
                        title: 'Use dynamic link'
                    }
                ] : [
                    {
                        id: 'opensInNewTab',
                        title: 'Open in new tab',
                    }
                ]}
                onChange={({
                    url: newURL = '',
                    opensInNewTab: newOpensInNewTab,
                    isDynamic: newIsDynamic,
                }) => {
                    setAttributes({ url: newURL, isDynamic: newIsDynamic });

                    if (opensInNewTab !== newOpensInNewTab) {
                        onToggleOpenInNewTab(newOpensInNewTab);
                    }
                }}
            />
            {usingDynamic && !urlIsSetandSelected && isPro &&<div className="gutenverse-dynamic-pop-over-container">
                <CheckboxControl
                    label="Use Dynamic Link"
                    checked={isChecked}
                    onChange={() => {setIsChecked(prev => !prev);}}
                />
                <div className="button-container">
                    <button className="gutenverse-pop-over-button-cancel" onClick={()=>{setIsURLPickerOpen(false);}}>Cancel</button>
                    <button className={`gutenverse-pop-over-button-apply ${isChecked ? 'checked' : ''}`} onClick={isChecked ? ()=>{setAttributes({isDynamic: true}); setIsURLPickerOpen(false); setPanelState(panelState);} : {}}>Apply</button>
                </div>
            </div>}
        </Popover>
    );

    return (
        <>
            {!urlIsSet && (
                <ToolbarButton
                    name="link"
                    icon={link}
                    title={__('Link', '--gctd--')}
                    shortcut={displayShortcut.primary('k')}
                    onClick={openLinkControl}
                />
            )}
            {urlIsSetandSelected && (
                <ToolbarButton
                    name="link"
                    icon={linkOff}
                    title={__('Unlink', '--gctd--')}
                    shortcut={displayShortcut.primaryShift('k')}
                    onClick={unlinkButton}
                    isActive={true}
                />
            )}
            {isSelected && (
                <KeyboardShortcuts
                    bindGlobal
                    shortcuts={{
                        [rawShortcut.primary('k')]: openLinkControl,
                        [rawShortcut.primaryShift('k')]: unlinkButton,
                    }}
                />
            )}
            {linkControl}
        </>
    );
};