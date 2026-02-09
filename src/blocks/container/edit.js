import { InnerBlocks, useBlockProps, useInnerBlocksProps, Inserter } from '@wordpress/block-editor';
import { createBlocksFromInnerBlocksTemplate } from '@wordpress/blocks';
import { ResizableBox } from '@wordpress/components';
import { compose } from '@wordpress/compose';
import { dispatch, useSelect } from '@wordpress/data';
import { useCallback, useRef, useState } from '@wordpress/element';
import classnames from 'classnames';
import { CopyElementToolbar, FluidCanvas } from 'gutenverse-core/components';
import { BlockPanelController } from 'gutenverse-core/controls';
import { isEmptyValue } from 'gutenverse-core/editor-helper';
import { checkIsParent, determineLocation, isAnimationActive, isSticky, theDeviceType } from 'gutenverse-core/helper';
import { withAnimationAdvanceV2, withAnimationBackgroundV2, withAnimationStickyV2, withBackgroundEffect, withBackgroundSlideshow, withCursorEffect, withMouseMoveEffect, withPartialRender, withPassRef } from 'gutenverse-core/hoc';
import { useAnimationEditor, useDisplayEditor } from 'gutenverse-core/hooks';
import { removeLiveStyle, updateLiveStyle, useDynamicStyle, useGenerateElementId } from 'gutenverse-core/styling';
import isEmpty from 'lodash/isEmpty';
import { useEffect } from 'react';
import { SectionDividerBottom, SectionDividerTop } from '../section/components/section-divider';
import { SectionDividerAnimatedBottom, SectionDividerAnimatedTop } from '../section/components/section-divider-animated';
import SectionVideoContainer from '../section/components/section-video-container';
import ContainerVariation from './components/container-variation';
import { panelList } from './panels/panel-list';
import getBlockStyle from './styles/block-style';

const onResizeStart = (props) => {
    const {
        attributes,
        setInitialWidth,
        setParentWidth,
        setOpenTool,
        deviceType,
        elementRef,
    } = props;

    const document = elementRef.current.ownerDocument;
    const currentElementStr = `.guten-element.${attributes.elementId}`;
    const domElement = document.querySelector(currentElementStr);
    const domParent = domElement?.parentElement;
    const domParentWidth = domParent?.offsetWidth || 1000;

    // Disable transitions on current container
    if (domElement) {
        domElement.style.transition = 'none';
    }

    // Disable transitions on sibling containers
    if (domParent) {
        const siblings = domParent.querySelectorAll('.guten-flex-container-editor');
        siblings.forEach((sibling) => {
            if (sibling !== domElement) {
                sibling.style.transition = 'none';
            }
        });
    }

    let currentWidthVal = attributes?.containerWidth?.[deviceType] || '100%';
    let cleanWidth = 100;

    if (typeof currentWidthVal === 'object') {
        const { unit, point } = currentWidthVal;
        const value = parseFloat(point) || 0;

        if (unit === '%') {
            cleanWidth = value;
        } else if (unit === 'px') {
            cleanWidth = (value / domParentWidth) * 100;
        } else if (unit === 'vw') {
            // Approximation if we can't reliably get viewport width inside iframe easily,
            // but usually window.innerWidth works for the frame.
            const viewportWidth = document.defaultView.innerWidth;
            const pxValue = (value / 100) * viewportWidth;
            cleanWidth = (pxValue / domParentWidth) * 100;
        }
    } else {
        cleanWidth = parseFloat(currentWidthVal) || 100;
    }

    setInitialWidth(cleanWidth);
    setParentWidth(domParentWidth);
    setOpenTool(true);
};

const onResize = (props, off) => {
    const {
        initialWidth,
        parentWidth,
        setNewWidth,
        elementId,
        elementRef,
        deviceType,
    } = props;

    const currentPx = (initialWidth / 100) * parentWidth;
    const newPx = currentPx + off;
    let newPercent = (newPx / parentWidth) * 100;

    // Limits
    if (newPercent < 5) newPercent = 5;
    newPercent = parseFloat(newPercent.toFixed(1));

    setNewWidth(newPercent);

    // Live Style.
    const styles = [{
        type: 'plain',
        id: 'resizeContainerWidth',
        responsive: true,
        selector: `.guten-flex-container-editor.${elementId}`,
        properties: [{
            name: 'width',
            valueType: 'pattern',
            pattern: '{value}%',
            patternValues: { value: { type: 'direct' } }
        }]
    }];

    const liveAttributes = {
        resizeContainerWidth: {
            [deviceType]: newPercent
        }
    };

    updateLiveStyle({
        styleId: `guten-container-resize-${elementId}`,
        elementId,
        attributes: liveAttributes,
        styles,
        elementRef,
        timeout: false
    });
};

const onResizeStop = (props) => {
    const {
        elementId,
        elementRef,
        setAttributes,
        attributes,
        newWidth,
        deviceType,
        setOpenTool,
    } = props;

    removeLiveStyle(`guten-container-resize-${elementId}`, elementRef, elementId);
    setOpenTool(false);

    // Restore transitions on current container
    const document = elementRef.current.ownerDocument;
    const currentElementStr = `.guten-element.${elementId}`;
    const domElement = document.querySelector(currentElementStr);

    if (domElement) {
        domElement.style.transition = '';
    }

    // Restore transitions on sibling containers
    const domParent = domElement?.parentElement;
    if (domParent) {
        const siblings = domParent.querySelectorAll('.guten-flex-container-editor');
        siblings.forEach((sibling) => {
            if (sibling !== domElement) {
                sibling.style.transition = '';
            }
        });
    }

    if (newWidth) {
        setAttributes({
            containerWidth: {
                ...attributes.containerWidth,
                [deviceType]: {
                    unit: '%',
                    point: newWidth.toString()
                }
            }
        });
    }
};

const ContainerResizeWrapper = (props) => {
    const {
        isSelected,
        attributes,
        setAttributes,
        innerBlocksProps,
        children,
        slideElement,
        mode,
        handleVariation,
        clientId,
        hasChildBlocks
    } = props;

    const {
        backgroundAnimated,
        background,
        elementId,
        backgroundOverlay
    } = attributes;

    const { containerLayout } = attributes;
    const isDragDisabled = containerLayout !== 'boxed';

    const [isHoveredState, setIsHoveredState] = useState(false);
    const [openTool, setOpenTool] = useState(false);
    const [initialWidth, setInitialWidth] = useState(100);
    const [parentWidth, setParentWidth] = useState(1000);
    const [newWidth, setNewWidth] = useState(null);
    const elementRef = useRef(null);

    const deviceType = useSelect(() => theDeviceType(determineLocation()), []);

    let displayWidth = 100;

    if (newWidth !== null) {
        displayWidth = newWidth;
    } else {
        const widthAttr = attributes?.containerWidth?.[deviceType];
        if (widthAttr) {
            if (typeof widthAttr === 'object') {
                displayWidth = parseFloat(widthAttr.point) || 100;
            } else {
                displayWidth = parseFloat(widthAttr) || 100;
            }
        }
    }

    // Merge refs
    const ref = useRef(null);
    const mergedRef = useCallback((node) => {
        ref.current = node;
        elementRef.current = node;
        if (innerBlocksProps.ref) {
            if (typeof innerBlocksProps.ref === 'function') {
                innerBlocksProps.ref(node);
            } else {
                innerBlocksProps.ref.current = node;
            }
        }
    }, [innerBlocksProps.ref]);

    const resizeStart = (e, p) => {
        onResizeStart({
            attributes,
            setAttributes,
            setInitialWidth,
            setParentWidth,
            setOpenTool,
            deviceType,
            elementRef,
        }, p);
    };

    const resize = (e, p, t, d) => {
        onResize({
            initialWidth,
            parentWidth,
            setNewWidth,
            elementId: attributes.elementId,
            elementRef,
            deviceType,
        }, d.width);
    };

    const resizeStop = () => {
        onResizeStop({
            elementId: attributes.elementId,
            elementRef,
            setAttributes,
            attributes,
            newWidth,
            deviceType,
            setOpenTool,
        });
        setNewWidth(null);
    };

    const onClose = () => {
        setOpenTool(false);
    };

    const dataId = elementId ? elementId.split('-')[1] : '';

    const {
        topDivider,
        bottomDivider,
        topDividerAnimated,
        bottomDividerAnimated,
        backgroundEffect,
    } = attributes;

    const isBackgroundEffect = (backgroundEffect !== undefined) && (backgroundEffect?.type !== 'none') && !isEmpty(backgroundEffect);

    return (
        <div
            {...innerBlocksProps}
            ref={mergedRef}
            onMouseEnter={() => setIsHoveredState(true)}
            onMouseLeave={() => setIsHoveredState(false)}
            data-id={dataId}
        >
            {!isEmpty(topDivider) && <SectionDividerTop {...props} />}
            {(!isEmptyValue(topDividerAnimated) && topDividerAnimated.type !== 'none') && <SectionDividerAnimatedTop {...props} />}
            {isBackgroundEffect && <div className="guten-background-effect"><div className="inner-background-container"></div></div>}

            {!isAnimationActive(backgroundAnimated) && background?.slideImage?.length > 0 && slideElement}
            <FluidCanvas attributes={attributes} />
            {isAnimationActive(backgroundAnimated) &&
                <div className={'guten-background-animated'}>
                    <div className={`animated-layer animated-${elementId ? elementId.split('-')[1] : ''}`}>
                        {background?.slideImage?.length > 0 && slideElement}
                    </div>
                </div>}
            <SectionVideoContainer attributes={attributes} />
            {!isEmpty(backgroundOverlay) && <div className="guten-background-overlay" />}

            {mode === 'initial' ?
                <ContainerVariation
                    wrapper={'guten-initial-container'}
                    onSelect={handleVariation}
                /> :
                <ResizableBox
                    enable={{
                        top: false,
                        right: isDragDisabled,
                        bottom: false,
                        left: false,
                        topRight: false,
                        bottomRight: false,
                        bottomLeft: false,
                        topLeft: false,
                    }}
                    showHandle={isDragDisabled && (isSelected || isHoveredState)}
                    className="guten-container-resizeable"
                    onResizeStart={resizeStart}
                    onResize={resize}
                    onResizeStop={resizeStop}
                >
                    {children}
                    {isDragDisabled && (isSelected || isHoveredState) && (
                        <div className={`container-resize ${openTool ? 'dragging' : ''}`}>
                            <div
                                className={'container-size-popup'}
                                onMouseEnter={() => setOpenTool(true)}
                                onMouseLeave={() => !openTool && setOpenTool(false)}
                            >
                                <input
                                    type="text"
                                    className="container-next"
                                    value={parseFloat(displayWidth).toFixed(1).toString() + '%'}
                                    onChange={() => { }} // Read-only
                                    onKeyDown={(event) => {
                                        if (event.key === 'Enter') {
                                            onClose();
                                        }
                                    }}
                                />
                            </div>
                        </div>
                    )}
                </ResizableBox>
            }

            {!isEmpty(bottomDivider) && <SectionDividerBottom {...props} />}
            {(!isEmptyValue(bottomDividerAnimated) && bottomDividerAnimated.type !== 'none') && <SectionDividerAnimatedBottom {...props} />}

            {(hasChildBlocks && isSelected) && <div className={'guten-inserter'}>
                <Inserter
                    __experimentalIsQuick={true}
                    rootClientId={clientId}
                    clientId={null}
                    isAppender={true}
                />
            </div>}
        </div>
    );
};

const Container = (props) => {
    const {
        innerBlocksProps,
        isSelected,
        attributes,
        setAttributes,
        innerChildren,
        hasChildBlocks,
        slideElement,
        mode,
        clientId
    } = props;

    const { replaceInnerBlocks } = dispatch('core/block-editor');

    const handleVariation = useCallback(({ content, attributes }) => {
        if (content) {
            const variation = createBlocksFromInnerBlocksTemplate(content);
            replaceInnerBlocks(clientId, variation, true);
        }
        setAttributes(attributes);
    }, [clientId]);

    return (
        <ContainerResizeWrapper
            isSelected={isSelected}
            attributes={attributes}
            setAttributes={setAttributes}
            innerBlocksProps={innerBlocksProps}
            slideElement={slideElement}
            mode={mode}
            handleVariation={handleVariation}
            clientId={clientId}
            hasChildBlocks={hasChildBlocks}
        >
            <div className={'guten-inner-container-editor'}>
                {hasChildBlocks ? innerChildren : <InnerBlocks
                    renderAppender={InnerBlocks.ButtonBlockAppender}
                />}
            </div>
        </ContainerResizeWrapper>
    );
};

const ContainerBlock = compose(
    withPartialRender,
    withPassRef,
    withAnimationStickyV2(),
    withAnimationAdvanceV2('container'),
    withAnimationBackgroundV2(),
    withMouseMoveEffect,
    withBackgroundSlideshow,
    withBackgroundEffect('container'),
    withCursorEffect,
)((props) => {
    const {
        getBlockOrder
    } = useSelect((select) => select('core/block-editor'), []);

    const {
        clientId,
        attributes,
        setAttributes,
        setBlockRef,
        slideElement
    } = props;

    const {
        elementId,
        mode,
        containerLayout,
        backgroundAnimated = {},
        background,
        cursorEffect,
        backgroundEffect,
        sticky = {},
        stickyPosition,
    } = attributes;


    useEffect(() => {
        if (undefined === mode) {
            const isParentContainer = checkIsParent(clientId, 'gutenverse/container');
            setAttributes({ mode: isParentContainer ? 'content' : 'initial' });
        }
    }, [mode]);

    const innerBlockCount = useSelect((select) => select('core/block-editor').getBlockCount(clientId), [clientId]);

    useEffect(() => {
        if (innerBlockCount > 0 && mode === 'initial') {
            setAttributes({ mode: 'content' });
        }
    }, [innerBlockCount, mode]);

    const elementRef = useRef();
    useGenerateElementId(clientId, elementId, elementRef);
    useDynamicStyle(elementId, attributes, getBlockStyle, elementRef);

    useEffect(() => {
        if (elementRef) {
            setBlockRef(elementRef);
        }
    }, [elementRef]);

    const displayClass = useDisplayEditor(attributes);
    const animationClass = useAnimationEditor(attributes);
    const hasChildBlocks = getBlockOrder(clientId).length > 0;
    const deviceType = useSelect(() => theDeviceType(determineLocation()), []);
    const isBackgroundEffect = (backgroundEffect !== undefined) && (backgroundEffect?.type !== 'none') && !isEmpty(backgroundEffect);

    const blockProps = useBlockProps({
        className: classnames(
            'guten-element',
            'guten-flex-container-editor',
            containerLayout,
            elementId,
            animationClass,
            displayClass,
            {
                'empty-container': !hasChildBlocks,
                'filled-container': hasChildBlocks,
                'background-animated': (!hasChildBlocks && isAnimationActive(backgroundAnimated)) || (hasChildBlocks && isAnimationActive(backgroundAnimated)),
                'guten-video-background': background?.backgroundType === 'video' && background?.videoUrl,
                'guten-background-slideshow': background?.backgroundType === 'slide' && background?.slideImage?.length > 0,
                'guten-cursor-effect': cursorEffect?.show,
                'guten-background-effect-active': isBackgroundEffect,
                ['guten-sticky']: isSticky(sticky),
                [`sticky-${stickyPosition}`]: isSticky(sticky),
            }
        ),
        ref: elementRef
    });

    // Determine orientation based on flexDirection attribute
    const currentFlexDirection = attributes?.flexDirection?.[deviceType] || attributes?.flexDirection?.Desktop || 'row';
    const orientation = currentFlexDirection.includes('column') ? 'vertical' : 'horizontal';

    /** orientation untuk menghilangkan row */
    const { children, ...innerBlocksProps } = useInnerBlocksProps(blockProps, {
        renderAppender: false,
        orientation,
    });

    const [transientState, setTransientState] = useState({});

    return <>
        <CopyElementToolbar {...props} />
        <BlockPanelController props={{ ...props, transientState, setTransientState }} panelList={panelList} elementRef={elementRef} />
        <Container
            {...props}
            blockProps={blockProps}
            innerBlocksProps={innerBlocksProps}
            animationClass={animationClass}
            displayClass={displayClass}
            hasChildBlocks={hasChildBlocks}
            slideElement={slideElement}
            mode={mode}
            clientId={clientId}
            innerChildren={<>
                {children}
            </>}
        />
    </>;
});

export default ContainerBlock;
