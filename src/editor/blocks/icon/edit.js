import { compose } from '@wordpress/compose';
import { __ } from '@wordpress/i18n';
import { useState } from '@wordpress/element';
import { withMouseMoveEffect, withPartialRender } from 'gutenverse-core/hoc';
import { BlockControls, useBlockProps } from '@wordpress/block-editor';
import { classnames } from 'gutenverse-core/components';
import { BlockPanelController } from 'gutenverse-core/controls';
import { createPortal } from 'react-dom';
import { IconLibrary } from 'gutenverse-core/controls';
import { panelList } from './panels/panel-list';
import { ToolbarGroup, ToolbarButton } from '@wordpress/components';
import { URLToolbar } from 'gutenverse-core/toolbars';
import { useCallback } from '@wordpress/element';
import { displayShortcut } from '@wordpress/keycodes';
import { gutenverseRoot } from 'gutenverse-core/helper';
import { LogoCircleColor24SVG } from 'gutenverse-core/icons';
import { useRef } from '@wordpress/element';
import { useEffect } from '@wordpress/element';
import { withCopyElementToolbar } from 'gutenverse-core/hoc';
import { withAnimationAdvance } from 'gutenverse-core/hoc';
import { useAnimationEditor } from 'gutenverse-core/hooks';
import { useDisplayEditor } from 'gutenverse-core/hooks';
import { applyFilters } from '@wordpress/hooks';
import isEmpty from 'lodash/isEmpty';
import { isOnEditor } from 'gutenverse-core/helper';
import getBlockStyle from './styles/block-style';
import { useDynamicStyle, useGenerateElementId } from 'gutenverse-core/styling';

const NEW_TAB_REL = 'noreferrer noopener';

const IconBlock = compose(
    withPartialRender,
    withAnimationAdvance('icon'),
    withCopyElementToolbar(),
    withMouseMoveEffect
)((props) => {
    const {
        attributes,
        setAttributes,
        isSelected,
        setPanelState,
        panelIsClicked,
        setPanelIsClicked,
        clientId
    } = props;

    const {
        elementId,
        icon,
        iconShape,
        iconView,
        url,
        rel,
        linkTarget,
        dynamicUrl,
    } = attributes;

    const [openIconLibrary, setOpenIconLibrary] = useState(false);
    const elementRef = useRef();
    const animationClass = useAnimationEditor(attributes);
    const displayClass = useDisplayEditor(attributes);
    const [dynamicHref, setDynamicHref] = useState();

    const blockProps = useBlockProps({
        className: classnames(
            'guten-element',
            'guten-icon',
            'no-margin',
            elementId,
            animationClass,
            displayClass,
        ),
        ref: elementRef
    });

    const wrapperProps = {
        className: classnames(
            'guten-icon-wrapper',
            iconShape,
            iconView,
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

    const panelState = {
        panel: 'setting',
        section: 2,
    };
    useGenerateElementId(clientId, elementId, elementRef);
    useDynamicStyle(elementId, attributes, getBlockStyle, elementRef);

    useEffect(() => {
        const dynamicUrlcontent = isEmpty(dynamicUrl) || !isOnEditor() ? dynamicUrl : applyFilters(
            'gutenverse.dynamic.fetch-url',
            dynamicUrl
        );

        ( typeof dynamicUrlcontent.then === 'function' ) && !isEmpty(dynamicUrl) && dynamicUrlcontent
            .then(result => {
                if ((!Array.isArray(result) || result.length > 0) && result !== undefined && result !== dynamicHref) {
                    setDynamicHref(result);
                } else if (result !== dynamicHref) setDynamicHref(undefined);
            }).catch(() => {});
        if (dynamicHref !== undefined) {
            setAttributes({ url: dynamicHref, isDynamic: true });
        } else { setAttributes({ url: url }); }
    }, [dynamicUrl, dynamicHref]);

    return <>
        <BlockPanelController panelList={panelList} props={props}/>
        <BlockControls>
            <ToolbarGroup>
                {applyFilters('gutenverse.button.url-toolbar',
                    <URLToolbar
                        url={url}
                        setAttributes={setAttributes}
                        isSelected={isSelected}
                        opensInNewTab={linkTarget === '_blank'}
                        onToggleOpenInNewTab={onToggleOpenInNewTab}
                        anchorRef={blockProps.ref}
                        usingDynamic={true}
                        setPanelState={setPanelState}
                        panelState={panelState}
                        panelIsClicked={panelIsClicked}
                        setPanelIsClicked={setPanelIsClicked}
                    />,
                    props,
                    panelState
                )}
                <ToolbarButton
                    name="icon"
                    icon={<LogoCircleColor24SVG />}
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