import { compose } from '@wordpress/compose';
import { __ } from '@wordpress/i18n';
import { useState } from '@wordpress/element';
import { withCustomStyle } from 'gutenverse-core/hoc';
import { BlockControls, useBlockProps } from '@wordpress/block-editor';
import classnames from 'classnames';
import { PanelController } from 'gutenverse-core/controls';
import { createPortal } from 'react-dom';
import { IconLibrary } from 'gutenverse-core/controls';
import { panelList } from './panels/panel-list';
import { ToolbarGroup, ToolbarButton } from '@wordpress/components';
import { URLToolbar } from 'gutenverse-core/toolbars';
import { useCallback } from '@wordpress/element';
import { displayShortcut } from '@wordpress/keycodes';
import { gutenverseRoot } from 'gutenverse-core/helper';
import { LogoCircleColor16SVG } from 'gutenverse-core/icons';
import { useRef } from '@wordpress/element';
import { useEffect } from '@wordpress/element';
import { withCopyElementToolbar } from 'gutenverse-core/hoc';
import { withAnimationAdvance } from 'gutenverse-core/hoc';
import { useAnimationEditor } from 'gutenverse-core/hooks';
import { useDisplayEditor } from 'gutenverse-core/hooks';
import { canRenderTransform } from 'gutenverse-core/styling';

const NEW_TAB_REL = 'noreferrer noopener';

const IconBlock = compose(
    withCustomStyle(panelList),
    withAnimationAdvance('icon'),
    withCopyElementToolbar()
)((props) => {
    const {
        attributes,
        setAttributes,
        isSelected,
        setElementRef
    } = props;

    const {
        elementId,
        icon,
        iconShape,
        iconView,
        url,
        rel,
        linkTarget,
        transform
    } = attributes;

    const [openIconLibrary, setOpenIconLibrary] = useState(false);
    const iconRef = useRef();
    const animationClass = useAnimationEditor(attributes);
    const displayClass = useDisplayEditor(attributes);
    const [theTransform, setTheTransform] = useState(false);

    useEffect(() => {
        setTheTransform(canRenderTransform(transform));
    }, [transform]);

    const blockProps = useBlockProps({
        className: classnames(
            'guten-element',
            'guten-icon',
            'no-margin',
            elementId,
            animationClass,
            displayClass,
            {
                'gutenverse-transform': theTransform
            }
        ),
        ref: iconRef
    });

    const wrapperProps = {
        className: classnames(
            'guten-icon-wrapper',
            iconShape,
            iconView
        )
    };

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
        if (iconRef.current) {
            setElementRef(iconRef.current);
        }
    }, [iconRef]);

    return <>
        <PanelController panelList={panelList} {...props} />
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
                    icon={<LogoCircleColor16SVG/>}
                    title={__('Choose Icon', 'gutenverse')}
                    shortcut={displayShortcut.primary('i')}
                    onClick={() => setOpenIconLibrary(true)}
                />
            </ToolbarGroup>
        </BlockControls>
        <div {...blockProps}>
            {openIconLibrary && createPortal(
                <IconLibrary
                    closeLibrary={() => setOpenIconLibrary(false)}
                    value={icon}
                    onChange={icon => setAttributes({ icon })}
                />,
                gutenverseRoot
            )}
            <div {...wrapperProps}>
                <i
                    className={`${icon}`}
                    onClick={() => setOpenIconLibrary(true)}
                />
            </div>
        </div>
    </>;
});

export default IconBlock;