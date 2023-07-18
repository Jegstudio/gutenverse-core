import { compose } from '@wordpress/compose';
import { useCallback, useState } from '@wordpress/element';
import { withCustomStyle } from 'gutenverse-core/hoc';
import { BlockControls, InspectorControls, RichText, useBlockProps } from '@wordpress/block-editor';
import classnames from 'classnames';
import { __ } from '@wordpress/i18n';
import { PanelController } from 'gutenverse-core/controls';
import { panelList } from './panels/panel-list';
import { ToolbarButton, ToolbarGroup } from '@wordpress/components';
import { displayShortcut } from '@wordpress/keycodes';
import { createPortal } from 'react-dom';
import { IconLibrary } from 'gutenverse-core/controls';
import { URLToolbar } from 'gutenverse-core/toolbars';
import { gutenverseRoot } from 'gutenverse-core/helper';
import { LogoCircleColor24SVG } from 'gutenverse-core/icons';
import { useEffect } from '@wordpress/element';
import { useRef } from '@wordpress/element';
import { withCopyElementToolbar } from 'gutenverse-core/hoc';
import { SelectParent } from 'gutenverse-core/components';
import { useAnimationEditor } from 'gutenverse-core/hooks';
import { useDisplayEditor } from 'gutenverse-core/hooks';

const NEW_TAB_REL = 'noreferrer noopener';

const IconListItemBlock = compose(
    withCustomStyle(panelList),
    withCopyElementToolbar()
)((props) => {
    const [openIconLibrary, setOpenIconLibrary] = useState(false);

    const {
        attributes,
        setAttributes,
        isSelected,
        setElementRef
    } = props;

    const {
        elementId,
        icon,
        rel,
        url,
        linkTarget,
        text,
        hideIcon
    } = attributes;

    const iconListItemRef = useRef();
    const animationClass = useAnimationEditor(attributes);
    const displayClass = useDisplayEditor(attributes);

    const blockProps = useBlockProps({
        className: classnames(
            'guten-element',
            'guten-icon-list-item',
            elementId,
            animationClass,
            displayClass,
        ),
        ref: iconListItemRef
    });

    const onToggleOpenInNewTab = useCallback(
        (value) => {
            const newLinkTarget = value ? '_blank' : undefined;

            let updatedRel = rel;
            if (newLinkTarget && !rel) {
                updatedRel = NEW_TAB_REL;
            } else if (!newLinkTarget && rel === NEW_TAB_REL) {
                updatedRel = undefined;
            }

            setAttributes({
                linkTarget: newLinkTarget,
                rel: updatedRel,
            });
        },
        [rel, setAttributes]
    );

    useEffect(() => {
        if (iconListItemRef.current) {
            setElementRef(iconListItemRef.current);
        }
    }, [iconListItemRef]);

    return <>
        <InspectorControls>
            <SelectParent {...props}>
                {__('Modify Icon Group', 'gutenverse')}
            </SelectParent>
        </InspectorControls>
        <PanelController panelList={panelList} {...props} />
        {openIconLibrary && createPortal(<IconLibrary
            closeLibrary={() => setOpenIconLibrary(false)}
            value={icon}
            onChange={value => setAttributes({ icon: value })}
        />, gutenverseRoot)}
        <BlockControls>
            <ToolbarGroup>
                <URLToolbar
                    url={url}
                    setAttributes={setAttributes}
                    isSelected={isSelected}
                    opensInNewTab={linkTarget === '_blank'}
                    onToggleOpenInNewTab={onToggleOpenInNewTab}
                    anchorRef={blockProps.ref}
                />
                <ToolbarButton
                    name="icon"
                    icon={<LogoCircleColor24SVG/>}
                    title={__('Choose Icon', 'gutenverse')}
                    shortcut={displayShortcut.primary('i')}
                    onClick={() => setOpenIconLibrary(true)}
                />
            </ToolbarGroup>
        </BlockControls>
        <li  {...blockProps}>
            <a id={elementId}>
                {!hideIcon && <i className={icon} />}
                <RichText
                    className={`list-text ${hideIcon ? 'no-icon' : ''}`}
                    tagName="span"
                    aria-label={__('List text')}
                    placeholder={__('Add text…')}
                    value={text}
                    onChange={(value) => setAttributes({ text: value })}
                    withoutInteractiveFormatting
                    identifier="text"
                />
            </a>
        </li>
    </>;
});

export default IconListItemBlock;