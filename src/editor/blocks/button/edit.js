import { compose } from '@wordpress/compose';
import { useRef } from '@wordpress/element';
import { withCustomStyle } from 'gutenverse-core/hoc';
import { useBlockProps, RichText, BlockControls } from '@wordpress/block-editor';
import classnames from 'classnames';
import { __ } from '@wordpress/i18n';
import { PanelController } from 'gutenverse-core/controls';
import { panelList } from './panels/panel-list';
import { useState } from '@wordpress/element';
import { createPortal } from 'react-dom';
import { IconLibrary } from 'gutenverse-core/controls';
import { ToolbarGroup, ToolbarButton } from '@wordpress/components';
import { URLToolbar } from 'gutenverse-core/toolbars';
import { useCallback } from '@wordpress/element';
import { displayShortcut } from '@wordpress/keycodes';
import { gutenverseRoot } from 'gutenverse-core/helper';
import { LogoCircleColor24SVG } from 'gutenverse-core/icons';
import { useEffect } from '@wordpress/element';
import { withCopyElementToolbar } from 'gutenverse-core/hoc';
import { useAnimationEditor } from 'gutenverse-core/hooks';
import { useDisplayEditor } from 'gutenverse-core/hooks';
import { useSelect, dispatch } from '@wordpress/data';
import { link } from '@wordpress/icons';

const NEW_TAB_REL = 'noreferrer noopener';

const ButtonBlock = compose(
    withCustomStyle(panelList),
    withCopyElementToolbar()
)((props) => {
    const {
        attributes,
        setAttributes,
        isSelected,
        setElementRef,
        clientId
    } = props;

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
        role
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
    const buttonRef = useRef();
    const [openIconLibrary, setOpenIconLibrary] = useState(false);
    const placeholder = showIcon ? '' : __('Button Text...');
    const animationClass = useAnimationEditor(attributes);
    const displayClass = useDisplayEditor(attributes);
    const [allowLink, setAllowLink] = useState(true);

    const blockProps = useBlockProps({
        className: classnames(
            'guten-element',
            'guten-button-wrapper',
            'no-margin',
            elementId,
            displayClass
        ),
        ref: buttonRef
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

    useEffect(() => {
        if (buttonRef.current) {
            setElementRef(buttonRef.current);
        }
    }, [buttonRef]);

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

    return <>
        <PanelController panelList={panelList} {...props} />
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
                {allowLink && role === 'link' && <URLToolbar
                    url={url}
                    setAttributes={setAttributes}
                    isSelected={isSelected}
                    opensInNewTab={linkTarget === '_blank'}
                    onToggleOpenInNewTab={onToggleOpenInNewTab}
                    anchorRef={blockProps.ref}
                />}
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
        <div  {...blockProps}>
            {role === 'link' ?
                <a {...buttonProps} onClick={() => textRef.current.focus()}>{buttonText}</a> :
                <button {...buttonProps} type="submit" onSubmit={() => textRef.current.focus()}>{buttonText}</button>
            }
        </div>
    </>;
});

export default ButtonBlock;