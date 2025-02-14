import { compose } from '@wordpress/compose';
import { useRef, useState, useCallback, useEffect } from '@wordpress/element';
import { withAnimationAdvance, withCustomStyle, withMouseMoveEffect, withCopyElementToolbar, withPartialRender } from 'gutenverse-core/hoc';
import { useBlockProps, RichText, BlockControls } from '@wordpress/block-editor';
import { classnames, link } from 'gutenverse-core/components';
import { __ } from '@wordpress/i18n';
import { PanelController, IconLibrary } from 'gutenverse-core/controls';
import { panelList } from './panels/panel-list';
import { createPortal } from 'react-dom';
import { ToolbarGroup, ToolbarButton } from '@wordpress/components';
import { URLToolbar } from 'gutenverse-core/toolbars';
import { displayShortcut } from '@wordpress/keycodes';
import { gutenverseRoot } from 'gutenverse-core/helper';
import { LogoCircleColor24SVG } from 'gutenverse-core/icons';
import { useAnimationEditor, useDisplayEditor } from 'gutenverse-core/hooks';
import { useSelect, dispatch } from '@wordpress/data';
import { applyFilters } from '@wordpress/hooks';
import isEmpty from 'lodash/isEmpty';
import { isOnEditor } from 'gutenverse-core/helper';
import getBlockStyle from './styles/block-style';
import { useDynamicStyle, useGenerateElementId } from 'gutenverse-core/styling';
import { BlockPanelController } from 'gutenverse-core/controls';

const NEW_TAB_REL = 'noreferrer noopener';

const ButtonBlock = compose(
    withPartialRender,
    // withCustomStyle(panelList),
    withAnimationAdvance('button'),
    withCopyElementToolbar(),
    withMouseMoveEffect
)((props) => {
    const {
        attributes,
        setAttributes,
        isSelected,
        clientId,
        context: { hoverWithParent, parentSelector },
        // refreshStyle,
        setPanelState,
        panelIsClicked,
        setPanelIsClicked
    } = props;

    const prevHoverWithParent = useRef();
    useEffect(() => {
        if (attributes.hoverWithParent !== hoverWithParent && prevHoverWithParent.current !== hoverWithParent) {
            setAttributes({
                hoverWithParent: hoverWithParent,
                parentSelector: parentSelector
            });
            // refreshStyle();
        }
        prevHoverWithParent.current = hoverWithParent;
    }, [attributes.hoverWithParent, hoverWithParent, parentSelector]);

    const {
        elementId,
        content,
        buttonType,
        buttonSize,
        showIcon,
        icon,
        url,
        rel,
        linkTarget,
        iconPosition = 'before',
        role,
        ariaLabel,
        dynamicContent,
        dynamicUrl,
    } = attributes;
    const {
        getBlockRootClientId,
        getBlock,
    } = useSelect(
        (select) => select('core/block-editor'),
        []
    );

    const {
        selectBlock
    } = dispatch('core/block-editor');

    const textRef = useRef(); 
    const elementRef = useRef(null);
    useGenerateElementId(clientId, elementId, elementRef);
    useDynamicStyle(elementId, attributes, getBlockStyle, elementRef, localAttr);
    const [openIconLibrary, setOpenIconLibrary] = useState(false);
    const placeholder = showIcon ? '' : __('Button Text...');
    const animationClass = useAnimationEditor(attributes);
    const displayClass = useDisplayEditor(attributes);
    const [allowLink, setAllowLink] = useState(true);
    const [dynamicText, setDynamicText] = useState();
    const [dynamicHref, setDynamicHref] = useState();
    const [localAttr, setLocalAttr] = useState({});

    const blockProps = useBlockProps({
        className: classnames(
            'guten-element',
            'guten-button-wrapper',
            'no-margin',
            elementId,
            displayClass,
        ),
        ref: elementRef
    });

    const buttonProps = {
        className: classnames(
            'guten-button',
            animationClass,
            {
                [`guten-button-${buttonType}`]: buttonType && buttonType !== 'default',
                [`guten-button-${buttonSize}`]: buttonSize,
            }
        ),
    };

    const getAllowedLink = () => {
        const parentId = getBlockRootClientId(clientId);

        if (parentId) {
            const block = getBlock(parentId);
            const nolink = new Set([
                'gutenverse/icon-box',
                'gutenverse/image-box'
            ]);

            if (nolink.has(block.name) && !block.attributes?.separateButtonLink) {
                return false;
            }
        }
        return true;
    };

    useEffect(() => {
        const allowed = getAllowedLink();
        setAllowLink(allowed);
    }, [props]);

    useEffect(() => {
        const allowed = getAllowedLink();

        if (!allowed && url === undefined) {
            const parentId = getBlockRootClientId(clientId);
            const block = getBlock(parentId);
            const { attributes } = block;
            const { url, linkTarget, rel } = attributes;

            setAttributes({
                url: url,
                linkTarget: linkTarget,
                rel: rel,
            });
        }
    }, []);
    
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

    const buttonText = <>
        {showIcon && iconPosition === 'before' && <i className={`fa-lg ${icon}`} onClick={() => setOpenIconLibrary(true)} />}
        <RichText
            tagName={'span'}
            value={content}
            placeholder={placeholder}
            onChange={(value) => setAttributes({ content: value })}
            multiline={false}
            withoutInteractiveFormatting
            identifier="content"
            ref={textRef}
        />
        {showIcon && iconPosition === 'after' && <i className={`fa-lg ${icon}`} onClick={() => setOpenIconLibrary(true)} />}
    </>;

    const ButtonURLToolbar = () => {
        return allowLink && role === 'link' && <URLToolbar
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
        />;
    };

    useEffect(() => {
        const dynamicUrlcontent = isEmpty(dynamicUrl) || !isOnEditor() ? dynamicUrl : applyFilters(
            'gutenverse.dynamic.fetch-url',
            dynamicUrl
        );

        const dynamicTextContent = isEmpty(dynamicContent) || !isOnEditor() ? dynamicContent : applyFilters(
            'gutenverse.dynamic.fetch-text',
            dynamicContent
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

        ( typeof dynamicTextContent.then === 'function' ) && !isEmpty(dynamicContent) && dynamicTextContent
            .then(result => {
                if ((!Array.isArray(result) || result.length > 0) && result !== undefined && result !== dynamicText) {
                    setDynamicText(result);
                }
            }).catch(() => {});
        if (dynamicText !== undefined) {
            setAttributes({ content: dynamicText });
        }
    }, [dynamicContent, dynamicUrl, dynamicText, dynamicHref]);

    return <>
        <BlockPanelController props = {props} panelList={panelList} setLocalAttr={setLocalAttr}/>
        {openIconLibrary && createPortal(
            <IconLibrary
                closeLibrary={() => setOpenIconLibrary(false)}
                value={icon}
                onChange={icon => setAttributes({ icon })}
            />,
            gutenverseRoot
        )}
        <BlockControls>
            <ToolbarGroup>
                {applyFilters('gutenverse.button.url-toolbar', <ButtonURLToolbar />, props, panelState)}
                {!allowLink && <ToolbarButton
                    name="link"
                    icon={link}
                    title={__('Set link on parent', 'gutenverse')}
                    onClick={() => {
                        const rootId = getBlockRootClientId(props.clientId);
                        selectBlock(rootId);
                    }}
                />}
                <ToolbarButton
                    name="icon"
                    icon={<LogoCircleColor24SVG />}
                    title={__('Choose Icon', 'gutenverse')}
                    shortcut={displayShortcut.primary('i')}
                    onClick={() => setOpenIconLibrary(true)}
                />
            </ToolbarGroup>
        </BlockControls>
        <span ref={elementRef} style={{ display: 'none' }}></span>
        <div  {...blockProps}>
            {role === 'link' ?
                <a {...buttonProps} onClick={() => textRef.current.focus()} aria-label={ariaLabel}>{buttonText}</a> :
                <button {...buttonProps} type="submit" onSubmit={() => textRef.current.focus()}>{buttonText}</button>
            }
        </div>
    </>;
});

export default ButtonBlock;