import { compose } from '@wordpress/compose';
import { useBlockProps, InnerBlocks, BlockControls } from '@wordpress/block-editor';
import { withAnimationAdvance, withCursorEffect, withAnimationBackground, withCustomStyle, withMouseMoveEffect, withBackgroundEffect, withPartialRender, withBackgroundSlideshow } from 'gutenverse-core/hoc';
import classnames from 'classnames';
import { PanelController } from 'gutenverse-core/controls';
import { panelList } from './panels/panel-list';
import { useRef } from '@wordpress/element';
import { useEffect, useCallback } from '@wordpress/element';
import { withCopyElementToolbar } from 'gutenverse-core/hoc';
import { useAnimationEditor, useDisplayEditor } from 'gutenverse-core/hooks';
import { useSelect } from '@wordpress/data';
import { isAnimationActive } from 'gutenverse-core/helper';
import { FluidCanvas } from 'gutenverse-core/components';
import { ToolbarGroup } from '@wordpress/components';
import { URLToolbar } from 'gutenverse-core/toolbars';
import isEmpty from 'lodash/isEmpty';

const NEW_TAB_REL = 'noreferrer noopener';
const WrapperContainer = ({ attributes, blockProps, slideElement }) => {
    const {
        elementId,
        backgroundAnimated = {},
        backgroundEffect,
        background
    } = attributes;

    const dataId = elementId ? elementId.split('-')[1] : '';
    const isBackgroundEffect = (backgroundEffect !== undefined) && (backgroundEffect?.type !== 'none') && !isEmpty(backgroundEffect);

    return (
        <div {...blockProps}>
            <FluidCanvas attributes={attributes} />
            {!isAnimationActive(backgroundAnimated) && background?.slideImage?.length > 0 && slideElement}
            <div className="guten-background-overlay" />
            <div className="guten-inner-wrap">
                {isBackgroundEffect && <div className="guten-background-effect"><div className="inner-background-container"></div></div>}
                {isAnimationActive(backgroundAnimated) && <div className={'guten-background-animated'}><div className={`animated-layer animated-${dataId}`}>
                    {background?.slideImage?.length > 0 && slideElement}
                </div></div>}
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
    withPartialRender,
    withCustomStyle(panelList),
    withAnimationBackground(),
    withCopyElementToolbar(),
    withAnimationAdvance('wrapper'),
    withMouseMoveEffect,
    withBackgroundEffect,
    withCursorEffect,
    withBackgroundSlideshow,
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
        setAttributes,
        panelIsClicked,
        setPanelIsClicked,
        slideElement
    } = props;

    const {
        elementId,
        displayType,
        backgroundAnimated = {},
        backgroundEffect,
        url,
        rel,
        linkTarget,
        background
    } = attributes;

    const wrapperRef = useRef();
    const displayClass = useDisplayEditor(attributes);
    const animationClass = useAnimationEditor(attributes);
    const hasChildBlocks = getBlockOrder(clientId).length > 0;
    const isBackgroundEffect = (backgroundEffect !== undefined) && (backgroundEffect?.type !== 'none') && !isEmpty(backgroundEffect);
    const isSlideShow = background?.slideImage?.length > 0;

    const onToggleOpenInNewTab = useCallback(
        (value) => {
            const newLinkTarget = value ? '_blank' : '_self';

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
            displayClass,
            {
                'background-animated': isAnimationActive(backgroundAnimated),
                'guten-background-effect-active': isBackgroundEffect,
                'guten-background-slideshow' : isSlideShow,
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
                    panelIsClicked={panelIsClicked}
                    setPanelIsClicked={setPanelIsClicked}
                />
            </ToolbarGroup>
        </BlockControls>
        <Component blockProps={blockProps} attributes={attributes} slideElement={slideElement} clientId={clientId} />
    </>;
});

export default FlexibleWrapper;