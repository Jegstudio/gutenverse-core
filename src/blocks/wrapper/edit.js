import { compose } from '@wordpress/compose';
import { useBlockProps, InnerBlocks, BlockControls } from '@wordpress/block-editor';
import { withAnimationAdvance, withCursorEffect, withAnimationBackground, withCustomStyle, withMouseMoveEffect } from 'gutenverse-core/hoc';
import classnames from 'classnames';
import { PanelController } from 'gutenverse-core/controls';
import { panelList } from './panels/panel-list';
import { useRef } from '@wordpress/element';
import { useEffect, useCallback } from '@wordpress/element';
import { withCopyElementToolbar } from 'gutenverse-core/hoc';
import { useAnimationEditor } from 'gutenverse-core/hooks';
import { useSelect } from '@wordpress/data';
import { isAnimationActive } from 'gutenverse-core/helper';
import { FluidCanvas } from 'gutenverse-core/components';
import { ToolbarGroup } from '@wordpress/components';
import { URLToolbar } from 'gutenverse-core/toolbars';

const NEW_TAB_REL = 'noreferrer noopener';
const WrapperContainer = ({ attributes, blockProps }) => {
    const {
        elementId,
        backgroundAnimated = {}
    } = attributes;

    const dataId = elementId ? elementId.split('-')[1] : '';

    return (
        <div {...blockProps}>
            <FluidCanvas attributes={attributes} />
            <div className="guten-background-overlay" />
            <div className="guten-inner-wrap">
                {isAnimationActive(backgroundAnimated) && <div className={'guten-background-animated'}><div className={`animated-layer animated-${dataId}`}></div></div>}
                <InnerBlocks />
            </div>
        </div>
    );
};

const WrapperPlaceholder = ({ attributes, blockProps, clientId }) => {
    return (
        <div {...blockProps}>
            <FluidCanvas attributes={attributes} />
            <div className="guten-background-overlay" />
            <div className="guten-inner-wrap">
                <InnerBlocks
                    renderAppender={InnerBlocks.ButtonBlockAppender}
                    clientId={clientId}
                />
            </div>
        </div>
    );
};

const FlexibleWrapper = compose(
    withCursorEffect,
    withCustomStyle(panelList),
    withAnimationBackground(),
    withCopyElementToolbar(),
    withAnimationAdvance('wrapper'),
    withMouseMoveEffect
)((props) => {
    const {
        getBlockOrder
    } = useSelect(
        (select) => select('core/block-editor'),
        []
    );

    const {
        clientId,
        attributes,
        setElementRef,
        isSelected,
        setAttributes
    } = props;

    const {
        elementId,
        displayType,
        backgroundAnimated = {},
        url,
        rel,
        linkTarget
    } = attributes;

    const wrapperRef = useRef();
    const animationClass = useAnimationEditor(attributes);
    const hasChildBlocks = getBlockOrder(clientId).length > 0;

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
    const blockProps = useBlockProps({
        className: classnames(
            'guten-element',
            'guten-wrap-helper',
            'no-margin',
            elementId,
            animationClass,
            displayType,
            {
                'background-animated': isAnimationActive(backgroundAnimated),
            }
        ),
        ref: wrapperRef
    });

    const Component = hasChildBlocks ? WrapperContainer : WrapperPlaceholder;

    useEffect(() => {
        if (wrapperRef.current) {
            setElementRef(wrapperRef.current);
        }
    }, [wrapperRef]);

    return <>
        <PanelController panelList={panelList} {...props} />
        <BlockControls>
            <ToolbarGroup>
                <URLToolbar
                    url={url}
                    setAttributes={setAttributes}
                    isSelected={isSelected}
                    opensInNewTab={linkTarget === '_blank'}
                    anchorRef={blockProps.ref}
                    onToggleOpenInNewTab={onToggleOpenInNewTab}
                />
            </ToolbarGroup>
        </BlockControls>
        <Component blockProps={blockProps} attributes={attributes} clientId={clientId} />
    </>;
});

export default FlexibleWrapper;