import { __ } from '@wordpress/i18n';
import { useCallback, useState } from '@wordpress/element';
import { compose } from '@wordpress/compose';
import {
    BlockControls, InspectorControls,
    RichText,
    useBlockProps,
} from '@wordpress/block-editor';
import { classnames } from 'gutenverse-core/components';
import { BlockPanelController } from 'gutenverse-core/controls';
import { panelList } from './panels/panel-list';
import { createPortal } from 'react-dom';
import { IconLibrary } from 'gutenverse-core/controls';
import { getSocialType, gutenverseRoot } from 'gutenverse-core/helper';
import { ToolbarGroup, ToolbarButton } from '@wordpress/components';
import { displayShortcut } from '@wordpress/keycodes';
import { URLToolbar } from 'gutenverse-core/toolbars';
import { LogoCircleColor24SVG } from 'gutenverse-core/icons';
import { useRef } from '@wordpress/element';
import { useEffect } from '@wordpress/element';
import { withCopyElementToolbar } from 'gutenverse-core/hoc';
import { withAnimationAdvance } from 'gutenverse-core/hoc';
import { SelectParent } from 'gutenverse-core/components';
import { useAnimationEditor } from 'gutenverse-core/hooks';
import { useDisplayEditor } from 'gutenverse-core/hooks';
import { applyFilters } from '@wordpress/hooks';
import isEmpty from 'lodash/isEmpty';
import { isOnEditor } from 'gutenverse-core/helper';
import { useDynamicStyle, useGenerateElementId } from 'gutenverse-core/styling';
import getBlockStyle from './styles/block-style';

const NEW_TAB_REL = 'noreferrer noopener';

const SocialIcon = compose(
    // withPartialRender,
    // withCustomStyle(panelList),
    // withAnimationAdvance('social-icon'),
    withCopyElementToolbar()
)(props => {
    const [openIconLibrary, setOpenIconLibrary] = useState(false);
    const {
        attributes,
        setAttributes,
        isSelected,
        clientId,
        setPanelState,
        panelIsClicked,
        setPanelIsClicked
    } = props;

    const {
        elementId,
        icon,
        text,
        url,
        linkTarget,
        rel,
        dynamicUrl,
    } = attributes;

    const displayClass = useDisplayEditor(attributes);
    const animationClass = useAnimationEditor(attributes);
    const socialType = getSocialType(icon);
    const elementRef = useRef();
    const [dynamicHref, setDynamicHref] = useState();

    const blockProps = useBlockProps({
        className: classnames(
            'guten-element',
            'guten-social-icon',
            'no-margin',
            elementId,
            socialType,
            animationClass,
            displayClass,
        ),
        ref: elementRef
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

    const panelState = {
        panel: 'setting',
        section: 1,
    };

    useEffect(() => {
        const dynamicUrlcontent = isEmpty(dynamicUrl) || !isOnEditor() ? dynamicUrl : applyFilters(
            'gutenverse.dynamic.fetch-url',
            dynamicUrl
        );

        (typeof dynamicUrlcontent.then === 'function') && !isEmpty(dynamicUrl) && dynamicUrlcontent
            .then(result => {
                if ((!Array.isArray(result) || result.length > 0) && result !== undefined && result !== dynamicHref) {
                    setDynamicHref(result);
                } else if (result !== dynamicHref) setDynamicHref(undefined);
            }).catch(() => { });
        if (dynamicHref !== undefined) {
            setAttributes({ url: dynamicHref, isDynamic: true });
        } else { setAttributes({ url: url }); }
    }, [dynamicUrl, dynamicHref]);

    useGenerateElementId(clientId, elementId, elementRef);
    useDynamicStyle(elementId, attributes, getBlockStyle, elementRef);

    return <>
        <InspectorControls>
            <SelectParent {...props}>
                {__('Modify Icon Group', 'gutenverse')}
            </SelectParent>
        </InspectorControls>
        <BlockPanelController panelList={panelList} props={props} elementRef={elementRef} />
        {openIconLibrary && createPortal(<IconLibrary
            closeLibrary={() => setOpenIconLibrary(false)}
            value={icon}
            onChange={value => setAttributes({ icon: value })}
        />, gutenverseRoot)}
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
                        title="Item Link"
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
            <a id={elementId}>
                <i className={icon} />
                <RichText
                    tagName="span"
                    aria-label={__('Button text')}
                    placeholder={__('Add text…')}
                    value={text}
                    onChange={(value) => setAttributes({ text: value })}
                    withoutInteractiveFormatting
                    identifier="text"
                />
            </a>
        </div>
    </>;
});

export default SocialIcon;