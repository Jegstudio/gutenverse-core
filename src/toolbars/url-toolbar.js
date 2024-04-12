import { useState } from '@wordpress/element';
import { KeyboardShortcuts, Popover, ToolbarButton } from '@wordpress/components';
import { __experimentalLinkControl as LinkControl } from '@wordpress/block-editor';
import { link, linkOff } from '@wordpress/icons';
import { __ } from '@wordpress/i18n';
import { displayShortcut, rawShortcut } from '@wordpress/keycodes';

export const URLToolbar = ({
    isSelected,
    url,
    setAttributes,
    opensInNewTab,
    onToggleOpenInNewTab,
    anchorRef,
    isDynamic = false,
}) => {
    const [isURLPickerOpen, setIsURLPickerOpen] = useState(false);
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

    const linkControl = (isURLPickerOpen || urlIsSetandSelected) && (
        <Popover
            position="bottom center"
            onClose={() => setIsURLPickerOpen(false)}
            anchorRef={anchorRef?.current}
        >
            <LinkControl
                className="wp-block-navigation-link__inline-link-input"
                value={{ url, opensInNewTab, isDynamic }}
                settings={[
                    {
                        id: 'opensInNewTab',
                        title: 'Open in new tab',
                    },
                    {
                        id: 'isDynamic',
                        title: 'Use dynamic link'
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