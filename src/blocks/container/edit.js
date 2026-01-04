import { InnerBlocks, useBlockProps, useInnerBlocksProps } from '@wordpress/block-editor';
import { createBlocksFromInnerBlocksTemplate } from '@wordpress/blocks';
import { ResizableBox } from '@wordpress/components';
import { compose } from '@wordpress/compose';
import { dispatch, useSelect } from '@wordpress/data';
import { useCallback, useRef, useState } from '@wordpress/element';
import classnames from 'classnames';
import { CopyElementToolbar } from 'gutenverse-core/components';
import { BlockPanelController } from 'gutenverse-core/controls';
import { determineLocation, theDeviceType } from 'gutenverse-core/helper';
import { withAnimationAdvance } from 'gutenverse-core/hoc';
import { useAnimationEditor, useDisplayEditor } from 'gutenverse-core/hooks';
import { removeLiveStyle, updateLiveStyle, useDynamicStyle, useGenerateElementId } from 'gutenverse-core/styling';
import ContainerVariation from './components/container-variation';
import { panelList } from './panels/panel-list';
import getBlockStyle from './styles/block-style';

const ContainerPlaceholder = ({ clientId, blockProps, setAttributes }) => {
    const { replaceInnerBlocks } = dispatch('core/block-editor');

    const handleVariation = useCallback(({ content, attributes }) => {
        if (content) {
            const variation = createBlocksFromInnerBlocksTemplate(content);
            replaceInnerBlocks(clientId, variation, true);
        }
        setAttributes(attributes);
    }, [clientId]);

    return <div {...blockProps}>
        <ContainerVariation
            wrapper={'guten-container initial'}
            onSelect={handleVariation}
        />
    </div>;
};

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
    if (newPercent < 10) newPercent = 10;
    newPercent = parseFloat(newPercent.toFixed(1));

    setNewWidth(newPercent);

    // Live Style
    // Use a unique ID and key to avoid conflict with the existing complex 'containerWidth' attribute logic
    // and ensuring specificity matches or exceeds the default styles.
    const styles = [{
        type: 'plain',
        id: 'resizeContainerWidth',
        responsive: true,
        selector: `.guten-flex-container.${elementId}`,
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

const EmptyContainer = (props) => {
    const {
        blockProps,
        clientId,
        isSelected,
        isHovered,
        attributes,
    } = props;

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
                // If it's an object, we try to show the point value.
                // Note: If unit is NOT %, this might look weird if we interpret it as % visually here without conversion,
                // but usually the user sees what they set.
                // However, the resizing tool logic converts everything to % upon START.
                // So for display purposes before interaction, we just show the point value.
                // If unit is different, it might be misleading if we just say "%" next to it.
                // The prompt says: "when dragged it will change value of containerWidth with percentage."
                // So defaulting to showing the point is fine as long as we assume it's valid.
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
        if (blockProps.ref) {
            if (typeof blockProps.ref === 'function') {
                blockProps.ref(node);
            } else {
                blockProps.ref.current = node;
            }
        }
    }, [blockProps.ref]);

    const resizeStart = (e, p) => {
        onResizeStart({
            ...props,
            setInitialWidth,
            setParentWidth,
            setOpenTool,
            deviceType,
            elementRef,
        }, p);
    };

    const resize = (e, p, t, d) => {
        onResize({
            ...props,
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
            ...props,
            elementId: attributes.elementId,
            elementRef,
            newWidth,
            deviceType,
            setOpenTool,
        });
        setNewWidth(null);
    };

    const onClose = () => {
        setOpenTool(false);
    };

    return (
        <div
            {...blockProps}
            ref={mergedRef}
            onMouseEnter={() => setIsHoveredState(true)}
            onMouseLeave={() => setIsHoveredState(false)}
        >
            <ResizableBox
                enable={{
                    top: false,
                    right: true,
                    bottom: false,
                    left: false,
                    topRight: false,
                    bottomRight: false,
                    bottomLeft: false,
                    topLeft: false,
                }}
                showHandle={isSelected || isHovered || isHoveredState}
                className="guten-container-resizeable"
                onResizeStart={resizeStart}
                onResize={resize}
                onResizeStop={resizeStop}
            >
                <InnerBlocks
                    renderAppender={InnerBlocks.ButtonBlockAppender}
                    clientId={clientId}
                />

                {(isSelected || isHovered || isHoveredState) && (
                    <div className={`container-resize ${openTool ? 'dragging' : ''}`}>
                        <div
                            className={'container-popup'}
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
        </div>
    );
};

const Container = (props) => {
    const { innerBlocksProps } = props;
    return <div {...innerBlocksProps} />;
};

const ContainerBlock = compose(
    withAnimationAdvance('container'),
)((props) => {
    const {
        getBlockOrder
    } = useSelect((select) => select('core/block-editor'), []);

    const {
        clientId,
        attributes,
        setAttributes,
        name,
    } = props;

    const {
        elementId,
        mode
    } = attributes;

    const [isHovered, setIsHovered] = useState(false);
    const onMouseEnter = useCallback(() => setIsHovered(true), []);
    const onMouseLeave = useCallback(() => setIsHovered(false), []);

    const elementRef = useRef();
    useGenerateElementId(clientId, elementId, elementRef);
    useDynamicStyle(elementId, attributes, getBlockStyle, elementRef);

    const displayClass = useDisplayEditor(attributes);
    const animationClass = useAnimationEditor(attributes);
    const hasChildBlocks = getBlockOrder(clientId).length > 0;

    const blockProps = useBlockProps({
        className: classnames(
            'guten-element',
            'guten-flex-container',
            elementId,
            animationClass,
            displayClass,
            {
                'empty-container': !hasChildBlocks,
            }
        ),
        ref: elementRef,
        onMouseEnter,
        onMouseLeave,
    });

    const innerBlocksProps = useInnerBlocksProps(blockProps, {
        renderAppender: hasChildBlocks ? undefined : InnerBlocks.ButtonBlockAppender
    });

    const Component = hasChildBlocks ? Container : EmptyContainer;

    return <>
        <CopyElementToolbar {...props} />
        <BlockPanelController props={props} panelList={panelList} elementRef={elementRef} />
        {mode === 'initial' ?
            <ContainerPlaceholder
                blockProps={blockProps}
                clientId={clientId}
                name={name}
                setAttributes={setAttributes}
            /> :
            <Component
                {...props}
                blockProps={blockProps}
                innerBlocksProps={innerBlocksProps}
                isHovered={isHovered}
            />}
    </>;
});

export default ContainerBlock;
