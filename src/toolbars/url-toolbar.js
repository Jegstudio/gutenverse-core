import { useState } from '@wordpress/element';
import { KeyboardShortcuts, Popover, ToolbarButton, CheckboxControl } from '@wordpress/components';
import { __experimentalLinkControl as LinkControl } from '@wordpress/block-editor';
import { link, linkOff } from '@wordpress/icons';
import { __ } from '@wordpress/i18n';
import { displayShortcut, rawShortcut } from '@wordpress/keycodes';
import { applyFilters } from '@wordpress/hooks';
import { IconDinamicSVG } from 'gutenverse-core/icons';

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
    isDynamic,
    title = 'Link',
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
                <div className="checkbox-dynamic-container">
                    <CheckboxControl
                        label={__('Use Dynamic Link', '--gctd--')}
                        checked={isChecked}
                        onChange={() => {setIsChecked(prev => !prev);}}
                    />
                    <IconDinamicSVG className="gutenverse-dynamic-icon-toolbar" />
                </div>

                <div className="button-container">
                    <button className="gutenverse-pop-over-button-cancel" onClick={()=>{setIsURLPickerOpen(false); setIsChecked(false);}}>{__('Cancel', '--gctd--')}</button>
                    <button className={`gutenverse-pop-over-button-apply ${isChecked ? 'checked' : ''}`} onClick={isChecked ? ()=>{setAttributes({isDynamic: true}); setIsURLPickerOpen(false); setPanelState(panelState);} : {}}>{__('Apply', '--gctd--')}</button>
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
                    title={title}
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