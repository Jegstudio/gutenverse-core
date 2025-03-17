import { useRef, useState, useEffect } from '@wordpress/element';
import { InnerBlocks, useBlockProps, Inserter, BlockControls } from '@wordpress/block-editor';
import classnames from 'classnames';
import { compose, debounce } from '@wordpress/compose';
import { withCursorEffect, withMouseMoveEffect, withBackgroundEffect, withBackgroundSlideshow, withPassRef, withAnimationStickyV2, withAnimationAdvanceV2, withAnimationBackgroundV2 } from 'gutenverse-core/hoc';
import { panelList } from './panels/panel-list';
import { PanelController } from 'gutenverse-core/controls';
import { removeLiveStyle, setDeviceClasses, updateLiveStyle, useDynamicScript, useDynamicStyle, useGenerateElementId } from 'gutenverse-core/styling';
import { determineLocation, isAnimationActive, isSticky, theDeviceType } from 'gutenverse-core/helper';
import { dispatch, select, useSelect } from '@wordpress/data';
import { useAnimationEditor, useDisplayEditor } from 'gutenverse-core/hooks';
import { ToolbarButton, ToolbarGroup } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { roundToDown } from 'round-to';
import { createBlock } from '@wordpress/blocks';
import { IconToolbarColumnAddSVG, IconToolbarColumnDeleteSVG } from 'gutenverse-core/icons';
import { ResizableBox } from '@wordpress/components';
import { isFSE } from 'gutenverse-core/helper';
import { FluidCanvas } from 'gutenverse-core/components';
import isEmpty from 'lodash/isEmpty';
import { useMemo } from 'react';
import { useCallback } from 'react';
import getBlockStyle from './styles/block-style';
import { CopyElementToolbar } from 'gutenverse-core/components';

const getPosition = (blockId) => {
    const parentClientId = useSelect((select) => {
        return select('core/block-editor').getBlockParents(blockId, true)[0];
    }, [blockId]);
    const childBlockIds = useSelect((select) => {
        return select('core/block-editor').getBlockOrder(parentClientId);
    }, [parentClientId]);
    const blockIndex = childBlockIds.findIndex((id) => id === blockId);
    let position = '';
    if (blockIndex === 0 && childBlockIds.length === 1) {
        position = 'only';
    } else if (blockIndex === 0) {
        position = 'first';
    } else if (blockIndex === childBlockIds.length - 1) {
        position = 'last';
    } else {
        position = 'middle';
    }

    return position;
};

const onResizeStart = (props, p) => {
    const {
        clientId,
        attributes,
        setTargetBlock,
        getBlock,
        getNextBlockClientId,
        getPreviousBlockClientId,
        getBlockParents,
        setParentBlockWidth,
        setCurentBlockWidth,
        setTargetId,
        setParentId,
        editorDom,
        setOpenTool,
        setTotalWidth,
        deviceType
    } = props;

    const parentClientId = getBlockParents(clientId, true)[0];
    const parentBlock = getBlock(parentClientId);
    if (deviceType === 'Desktop') {
        parentBlock.innerBlocks.map(({ clientId }) => {
            const toolTip = editorDom?.querySelector(`.wp-block[data-block="${clientId}"] > .guten-column-resizeable > .column-resize`);
            toolTip?.classList.add('dragging');
        });
    }

    let targetId = '';

    if ('right' === p) {
        targetId = getNextBlockClientId(clientId);
    } else {
        targetId = getPreviousBlockClientId(clientId);
    }

    const targetBlock = getBlock(targetId);
    const parentElement = editorDom.querySelector(`.wp-block[data-block="${parentClientId}"] .guten-container`);
    const domParentWidth = parentElement?.offsetWidth;
    const currentWidth = attributes.width[deviceType] ? attributes.width[deviceType] : attributes.width['Desktop'];

    setCurentBlockWidth(currentWidth);
    setParentBlockWidth(domParentWidth);
    setParentId(parentClientId);
    setOpenTool(true);

    if (!targetBlock) {
        setTargetBlock(0);
    } else {
        const targetWidth = targetBlock.attributes.width[deviceType]
            ? targetBlock.attributes.width[deviceType]
            : targetBlock.attributes.width['Desktop'];

        setTargetBlock(targetWidth);
        setTargetId(targetId);
        setTotalWidth(targetWidth + currentWidth);
    }
};

const onResize = (props, off) => {
    const {
        clientId,
        elementId,
        targetBlock,
        getBlock,
        parentBlockWidth,
        curentBlockWidth,
        targetId,
        setNewWidth,
        totalWidth,
        deviceType,
        elementRef
    } = props;

    const validTargetBlock = targetBlock != null ? targetBlock : 0;
    const minWidth = {
        Desktop: 5,
        Tablet: 10,
        Mobile: 15,
    };

    const {
        getBlockParents,
        getBlockOrder,
    } = select('core/block-editor');

    const parentId = getBlockParents(clientId, true)[0];
    const blockOrder = getBlockOrder(parentId);
    const blockIndex = blockOrder.findIndex((id) => id === clientId);

    const targetWidth = targetId ? getBlock(targetId).attributes.width : null;
    const currentWidth = clientId ? getBlock(clientId).attributes.width : null;
    const targetColumnElementId = targetId ? getBlock(targetId).attributes.elementId : null;
    const targetBlockPx = (validTargetBlock / 100) * parentBlockWidth;
    const curentBlockPx = (curentBlockWidth / 100) * parentBlockWidth;
    const curentModPx = curentBlockPx + off;
    const curentModPercent = ((((curentModPx / parentBlockWidth) * 100) * 100) / 100).toFixed(1);
    const targetModPx = targetBlockPx - off;
    const targetModPercent = ((((targetModPx / parentBlockWidth) * 100) * 100) / 100).toFixed(1);
    const bothModPercent = parseFloat((parseFloat(curentModPercent) + parseFloat(targetModPercent))).toFixed(1);

    let calcCurentModPercent = curentModPercent;
    let calcTargetModPercent = targetModPercent;

    if (calcCurentModPercent < minWidth[deviceType]) {
        calcCurentModPercent = minWidth[deviceType];
        calcTargetModPercent = bothModPercent - minWidth[deviceType];
    }

    if (calcTargetModPercent < minWidth[deviceType]) {
        calcTargetModPercent = minWidth[deviceType];
        calcCurentModPercent = bothModPercent - minWidth[deviceType];
    }

    calcCurentModPercent = curentModPercent;

    if (calcCurentModPercent < minWidth[deviceType]) {
        calcCurentModPercent = minWidth[deviceType];
    }

    if (calcCurentModPercent > 100) {
        calcCurentModPercent = 100;
    }

    const max = (deviceType === 'Desktop') && !(blockIndex === 0 && blockOrder.length === 1) ? totalWidth - minWidth['Desktop'] : 100;
    if (calcCurentModPercent > max) {
        calcCurentModPercent = max;
    } else if (calcCurentModPercent < minWidth['Desktop']) {
        calcCurentModPercent = minWidth['Desktop'];
    }

    calcCurentModPercent = parseFloat(calcCurentModPercent);
    calcTargetModPercent = parseFloat(calcTargetModPercent);

    if (calcCurentModPercent + calcTargetModPercent > totalWidth) {
        calcTargetModPercent = calcTargetModPercent - 0.1;
    }

    currentWidth[deviceType] = calcCurentModPercent;
    const attributes = {
        currentWidth
    };
    const styles = [
        {
            'type': 'plain',
            'id': 'currentWidth',
            'responsive': true,
            'selector': `.${elementId}`,
            'properties': [
                {
                    'name': 'width',
                    'valueType': 'pattern',
                    'pattern': '{value}%',
                    'patternValues': {
                        'value': {
                            'type': 'direct',
                        },
                    }
                }
            ],
        }
    ];

    if (deviceType === 'Desktop') {
        targetWidth[deviceType] = calcTargetModPercent;
        attributes.targetWidth = targetWidth;
        styles.push({
            'type': 'plain',
            'id': 'targetWidth',
            'responsive': true,
            'selector': `.${targetColumnElementId}`,
            'properties': [
                {
                    'name': 'width',
                    'valueType': 'pattern',
                    'pattern': '{value}%',
                    'patternValues': {
                        'value': {
                            'type': 'direct',
                        },
                    }
                }
            ],
        });
    }

    updateLiveStyle(
        'guten-column-editor',
        elementId,
        attributes,
        styles,
        elementRef,
        false
    );

    setNewWidth({
        current: calcCurentModPercent,
        target: calcTargetModPercent,
        targetColumnElementId,
        targetWidth
    });
};

const onResizeStop = (props) => {
    const {
        elementId,
        parentId,
        getBlock,
        newWidth,
        setAttributes,
        updateBlockAttributes,
        targetId,
        editorDom,
        setOpenTool,
        deviceType,
        elementRef
    } = props;

    removeLiveStyle('guten-column-editor', elementRef, elementId);

    const parentBlock = getBlock(parentId);
    if (parentBlock) {
        parentBlock.innerBlocks.map(({ clientId }) => {
            const toolTip = editorDom?.querySelector(`.wp-block[data-block="${clientId}"] > .guten-column-resizeable > .column-resize`);
            toolTip?.classList.remove('dragging');
        });
    }

    setOpenTool(false);

    if (newWidth.current) {
        setAttributes({ width: { ...props.attributes.width, [deviceType]: newWidth.current } });

        if (deviceType === 'Desktop' && newWidth.target) {
            const nextColumnWidthAttr = getBlock(targetId).attributes.width;
            updateBlockAttributes(targetId, { width: { ...nextColumnWidthAttr, [deviceType]: newWidth.target } });
        }
    }
};

// Column Placeholder component
const ColumnPlaceholder = (props) => {
    const {
        blockProps,
        clientId,
        stickyFlagRef,
        columnWrapRef,
        sticky = null,
        stickyPosition,
        eSelect,
        isHovered,
        position,
        attributes,
        openTool,
        setOpenTool,
        editorDom,
        deviceType
    } = props;

    const {
        width,
    } = attributes;

    const wvalue = width ? width[deviceType] ? width[deviceType] : width['Desktop'] : 10;

    const wrapperClass = useMemo(() =>
        classnames(
            'guten-column-wrapper',
            {
                'guten-sticky': sticky ? isSticky(sticky) : isSticky({}),
                [`sticky-${stickyPosition}`]: sticky ? isSticky(sticky) : isSticky({}),
            }
        ), [sticky, stickyPosition]
    );

    const resizeStart = (e, p) => {
        onResizeStart(props, p);
    };

    const resize = (e, p, t, d) => {
        onResize(props, d.width);
    };

    const resizeStop = () => {
        onResizeStop(props);
    };

    const {
        getBlock,
        getBlockParents
    } = useSelect(
        (select) => select('core/block-editor'),
        []
    );
    const parentClientId = getBlockParents(clientId, true)[0];
    const parentBlock = getBlock(parentClientId);

    const valueLength = parseFloat(wvalue).toFixed(1).toString().length - (parseFloat(wvalue).toFixed(1).toString().includes('.') ? 0.5 : 0);

    const onOpen = () => {
        if (deviceType === 'Desktop') {
            parentBlock.innerBlocks.map(({ clientId }) => {
                const toolTip = editorDom?.querySelector(`.wp-block[data-block="${clientId}"] > .guten-column-resizeable > .column-resize`);
                toolTip?.classList?.add('dragging');
            });
        }
    };

    const onClose = () => {
        if (deviceType === 'Desktop') {
            parentBlock.innerBlocks.map(({ clientId }) => {
                const toolTip = editorDom?.querySelector(`.wp-block[data-block="${clientId}"] > .guten-column-resizeable > .column-resize`);
                toolTip?.classList?.remove('dragging');
            });
        }
    };

    return (
        <div {...blockProps}>
            <ResizableBox
                enable={{
                    top: false,
                    right: ('last' !== position || ('Tablet' === deviceType || 'Mobile' === deviceType)) && 'only' !== position ? true : false,
                    bottom: false,
                    left: 'first' !== position && 'only' !== position && 'Desktop' === deviceType ? true : false,
                    topRight: false,
                    bottomRight: false,
                    bottomLeft: false,
                    topLeft: false,
                }}
                showHandle={eSelect || isHovered}
                className="guten-column-resizeable"
                onResizeStart={resizeStart}
                onResize={resize}
                onResizeStop={resizeStop}
            >
                <FluidCanvas attributes={attributes} />
                <div className="guten-background-overlay"></div>
                <div className={'sticky-wrapper'} ref={stickyFlagRef}>
                    <div className={wrapperClass} ref={columnWrapRef}>
                        <InnerBlocks
                            renderAppender={InnerBlocks.ButtonBlockAppender}
                            clientId={clientId}
                        />
                    </div>
                </div>
                {isHovered && <div className={`column-resize ${openTool ? 'dragging' : ''}`}>
                    <div
                        onMouseEnter={() => {
                            onOpen();
                        }}
                        onMouseLeave={() => {
                            onClose();
                        }}
                    >
                        <svg width="6" height="6" viewBox="0 0 6 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M0 2C0 0.89543 0.895431 0 2 0H6L0 6V2Z" fill="#3B57F7" />
                        </svg>
                    </div>
                    <div className={'column-popup'} onFocus={() => {
                        onOpen();
                        setOpenTool(true);
                    }} onBlur={() => {
                        onClose();
                        setOpenTool(false);
                    }} onMouseEnter={() => {
                        onOpen();
                    }} onMouseLeave={() => {
                        if (!openTool) {
                            onClose();
                        }
                    }}>
                        <div>
                            <input
                                type="number"
                                className="column-next"
                                style={{ width: valueLength + 'ch' }}
                                value={parseFloat(wvalue).toFixed(1)}
                                onChange={() => { }}
                                onKeyDown={(event) => {
                                    if (event.key === 'Enter') {
                                        onClose();
                                        setOpenTool(false);
                                    }
                                }}
                            />
                        </div>
                        <div className={'column-next'}>{'%'}</div>
                    </div>
                </div>}
            </ResizableBox>
        </div>
    );
};

// Column InnerBlocks Wrapper component
const ColumnWrapper = (props) => {
    const { getBlocks } = useSelect((select) => select('core/block-editor'), []);

    const {
        clientId,
        blockProps,
        columnWrapRef,
        stickyFlagRef,
        sticky = null,
        stickyPosition,
        eSelect,
        isHovered,
        position,
        attributes,
        openTool,
        setOpenTool,
        editorDom,
        slideElement,
        deviceType
    } = props;

    const {
        elementId,
        width,
        backgroundAnimated = {},
        backgroundEffect,
        background,
    } = attributes;

    const dataId = elementId ? elementId.split('-')[1] : '';

    const wvalue = width[deviceType] ? width[deviceType] : width['Desktop'];

    const blocks = getBlocks(clientId);
    const size = getBlocks(clientId).length;
    const clientColumnId = size > 1 ? blocks[0].clientId : clientId;
    const isBackgroundEffect = (backgroundEffect !== undefined) && (backgroundEffect?.type !== 'none') && !isEmpty(backgroundEffect);

    const wrapperClass = useMemo(() =>
        classnames(
            'guten-column-wrapper',
            {
                ['guten-sticky']: sticky ? isSticky(sticky) : isSticky({}),
                [`sticky-${stickyPosition}`]: sticky ? isSticky(sticky) : isSticky({}),
            }
        ), [sticky, stickyPosition]
    );

    const resizeStart = (e, p) => {
        onResizeStart(props, p);
    };

    const resize = (e, p, t, d) => {
        onResize(props, d.width);
    };

    const resizeStop = () => {
        onResizeStop(props);
    };

    const {
        getBlock,
        getBlockParents
    } = useSelect(
        (select) => select('core/block-editor'),
        []
    );
    const parentClientId = getBlockParents(clientId, true)[0];
    const parentBlock = getBlock(parentClientId);

    const valueLength = useMemo(() => {
        return parseFloat(wvalue).toFixed(1).toString().length - (parseFloat(wvalue).toFixed(1).toString().includes('.') ? 0.5 : 0);
    }, [wvalue]);

    const onOpen = useCallback(() => {
        if (deviceType === 'Desktop') {
            parentBlock.innerBlocks.forEach(({ clientId }) => {
                const toolTip = editorDom?.querySelector(`.wp-block[data-block="${clientId}"] > .guten-column-resizeable > .column-resize`);
                toolTip.classList.add('dragging');
            });
        }
    }, [deviceType]);

    const onClose = useCallback(() => {
        if (deviceType === 'Desktop') {
            parentBlock.innerBlocks.forEach(({ clientId }) => {
                const toolTip = editorDom?.querySelector(`.wp-block[data-block="${clientId}"] > .guten-column-resizeable > .column-resize`);
                toolTip.classList.remove('dragging');
            });
        }
    }, [deviceType]);

    return (
        <div {...blockProps}>
            <ResizableBox
                enable={{
                    top: false,
                    right: ('last' !== position || ('Tablet' === deviceType || 'Mobile' === deviceType)) && 'only' !== position ? true : false,
                    bottom: false,
                    left: 'first' !== position && 'only' !== position && 'Desktop' === deviceType ? true : false,
                    topRight: false,
                    bottomRight: false,
                    bottomLeft: false,
                    topLeft: false,
                }}
                showHandle={eSelect || isHovered}
                className="guten-column-resizeable"
                onResizeStart={resizeStart}
                onResize={resize}
                onResizeStop={resizeStop}
            >
                <FluidCanvas attributes={attributes} />
                {(isHovered && eSelect) && <div className={'guten-inserter insert-top'}>
                    <Inserter
                        __experimentalIsQuick={true}
                        rootClientId={clientId}
                        clientId={clientColumnId}
                    />
                </div>}
                <div className={'sticky-wrapper'} ref={stickyFlagRef}>
                    <div className={wrapperClass} ref={columnWrapRef}>
                        {!isAnimationActive(backgroundAnimated) && background?.slideImage?.length > 0 && slideElement}
                        {isBackgroundEffect && <div className="guten-background-effect"><div className="inner-background-container"></div></div>}
                        {isAnimationActive(backgroundAnimated) && <div className={'guten-background-animated'}><div className={`animated-layer animated-${dataId}`}>
                            {background?.slideImage?.length > 0 && slideElement}
                        </div></div>}
                        <div className="guten-background-overlay" />
                        <InnerBlocks />
                    </div>
                </div>
                {isHovered && <div className={`column-resize ${openTool ? 'dragging' : ''}`}>
                    <div
                        onMouseEnter={() => {
                            onOpen();
                        }}
                        onMouseLeave={() => {
                            onClose();
                        }}
                    >
                        <svg width="6" height="6" viewBox="0 0 6 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M0 2C0 0.89543 0.895431 0 2 0H6L0 6V2Z" fill="#3B57F7" />
                        </svg></div>
                    <div
                        className={'column-popup'}
                        onFocus={() => {
                            onOpen();
                            setOpenTool(true);
                        }}
                        onBlur={() => {
                            onClose();
                            setOpenTool(false);
                        }}
                        onMouseEnter={() => {
                            onOpen();
                        }}
                        onMouseLeave={() => {
                            if (!openTool) {
                                onClose();
                            }
                        }}
                    >
                        <div>
                            <input
                                type="number"
                                className="column-next"
                                style={{ width: valueLength + 'ch' }}
                                value={parseFloat(wvalue).toFixed(1)}
                                onChange={() => { }}
                                onKeyDown={(event) => {
                                    if (event.key === 'Enter') {
                                        onClose();
                                        setOpenTool(false);
                                    }
                                }}
                            />
                        </div>
                        <div className={'column-next'}>{'%'}</div>
                    </div>
                </div>}
                {(isHovered && eSelect) && <div className={'guten-inserter insert-bottom'}>
                    <Inserter
                        __experimentalIsQuick={true}
                        rootClientId={clientId}
                        clientId={clientColumnId}
                    />
                </div>}
            </ResizableBox>
        </div>
    );
};

// Column Block Control
const ColumnInspection = (props) => {
    const { panelProps, isSelected, attributes, setAttributes, elementRef } = props;

    const defaultPanelProps = {
        ...panelProps,
        ...attributes,
        setAttributes,
    };

    return <PanelController
        panelList={panelList}
        panelProps={defaultPanelProps}
        isSelected={isSelected}
        elementRef={elementRef}
        {...props}
    />;
};

const ColumnRemove = (props) => {
    const { clientId } = props;
    const {
        removeBlocks,
    } = dispatch('core/block-editor');

    const removeColumn = () => {
        removeBlocks(clientId, false);
    };

    return <ToolbarButton
        name="remove-column"
        icon={<IconToolbarColumnDeleteSVG />}
        title={__('Remove Column', '--gctd--')}
        onClick={() => removeColumn()}
    />;
};

const ColumnAdd = (props) => {
    const {
        clientId,
        updateBlockWidth,
        adjacentBlock
    } = props;
    const {
        insertBlock,
    } = dispatch('core/block-editor');
    const blockCount = adjacentBlock.length;

    const {
        getBlocks,
        getBlockRootClientId
    } = useSelect(
        (select) => select('core/block-editor'),
        []
    );

    const addNewColumn = () => {
        const width = roundToDown(100 / (blockCount + 1), 1);
        const newChild = createBlock('gutenverse/column', {
            width: {
                Desktop: width
            }
        });
        const rootClientId = getBlockRootClientId(clientId);

        adjacentBlock.map(item => {
            updateBlockWidth(item.clientId, width);
        });

        let insertIndex = 0;
        getBlocks(rootClientId).map((block, index) => {
            if (block.clientId === clientId) {
                insertIndex = index + 1;
            }
        });

        insertBlock(newChild, insertIndex, rootClientId);
    };

    return <ToolbarButton
        name="add-column"
        icon={<IconToolbarColumnAddSVG />}
        title={__('Add Column', '--gctd--')}
        onClick={() => addNewColumn()}
    />;
};

const ColumnBlockControl = (props) => {

    return <BlockControls>
        <ToolbarGroup>
            <ColumnAdd {...props} />
            <ColumnRemove {...props} />
        </ToolbarGroup>
    </BlockControls>;
};

// Column Block edit component
const ColumnBlock = compose(
    withPassRef,
    withAnimationStickyV2(),
    withAnimationAdvanceV2('column'),
    withAnimationBackgroundV2(),
    withMouseMoveEffect,
    withBackgroundSlideshow,
    withBackgroundEffect('column'),
    // withCursorEffect,
)((props) => {
    const {
        getBlock,
        getBlocks,
        getBlockOrder,
        getBlockRootClientId,
        getNextBlockClientId,
        getPreviousBlockClientId,
        getBlockParents
    } = useSelect(
        (select) => select('core/block-editor'),
        []
    );

    const {
        updateBlockAttributes,
    } = dispatch('core/block-editor');

    const {
        clientId,
        attributes,
        setAttributes,
        isSelected,
        setBlockRef
    } = props;

    const {
        elementId,
        verticalAlign,
        horizontalAlign,
        width,
        sticky = null,
        stickyPosition,
        backgroundAnimated = null,
        backgroundEffect
    } = attributes;

    const deviceType = useSelect(() => theDeviceType(determineLocation()), []);
    const [delayedDeviceType, setDelayedDeviceType] = useState(deviceType);
    const updateDelayedDeviceType = debounce((newDeviceType) => {
        setDelayedDeviceType(newDeviceType);
    }, 1000);
    useEffect(() => {
        updateDelayedDeviceType(deviceType);
    }, [deviceType]);

    const elementRef = useRef(null);
    useGenerateElementId(clientId, elementId, elementRef);
    useDynamicStyle(elementId, attributes, getBlockStyle, elementRef);
    useDynamicScript(elementRef);

    const hasChildBlocks = getBlockOrder(clientId).length > 0;
    const rootClientId = getBlockRootClientId(clientId);
    const columnWrapRef = useRef();
    const stickyFlagRef = useRef();
    const animationClass = useAnimationEditor(attributes);
    const displayClass = useDisplayEditor(attributes);
    const position = getPosition(clientId);
    const adjacentCount = getBlocks(rootClientId).length;
    const adjacentBlock = getBlocks(rootClientId);
    const [prevAdjacentCount, setPrevAdjacentCount] = useState(false);
    const isBackgroundEffect = (backgroundEffect !== undefined) && (backgroundEffect?.type !== 'none') && !isEmpty(backgroundEffect);

    const updateBlockWidth = useCallback((clientId, eachWidth) => {
        const targetColumnWidthAttr = getBlock(clientId).attributes.width;
        const updatedWidth = { ...targetColumnWidthAttr, [delayedDeviceType]: eachWidth };

        updateBlockAttributes(clientId, { width: updatedWidth });
    }, [clientId]);

    const getChildTotalWidth = () => {
        let total = 0;

        getBlocks(rootClientId).map(item => {
            const { name, attributes } = item;

            if (name === 'gutenverse/column') {
                const { width } = attributes;
                let Desktop = 0;

                if (width !== undefined) {
                    Desktop = width.Desktop;
                } else {
                    Desktop = 100;
                }

                if (isNaN(Desktop)) {
                    Desktop = 5;
                }

                total += Desktop;
            }
        });

        return total;
    };

    useEffect(() => {
        const eachWidth = roundToDown(100 / adjacentCount, 1);
        let timeout = null;

        if (!prevAdjacentCount) {
            if ((getChildTotalWidth() > 100) || (getChildTotalWidth() < 99 && !width)) {
                setAttributes({ width: { ...width, [deviceType]: eachWidth } });
            }
            setPrevAdjacentCount(getBlocks(rootClientId).length);
        } else if (prevAdjacentCount && (prevAdjacentCount !== adjacentCount)) {
            const innerBlocks = getBlocks(rootClientId);
            setPrevAdjacentCount(adjacentCount);
            timeout = setTimeout(() => {
                innerBlocks.map(item => {
                    updateBlockWidth(item.clientId, eachWidth);
                });
            }, 20);
        }

        return () => clearTimeout(timeout);
    }, [adjacentCount]);

    const vertical = setDeviceClasses(verticalAlign, 'vertical');
    const horizontal = setDeviceClasses(horizontalAlign, 'horizontal');
    const [targetBlock, setTargetBlock] = useState('');
    const [parentBlockWidth, setParentBlockWidth] = useState('');
    const [curentBlockWidth, setCurentBlockWidth] = useState('');
    const [targetId, setTargetId] = useState('');
    const [parentId, setParentId] = useState('');
    const [isHovered, setIsHovered] = useState(false);
    const [newWidth, setNewWidth] = useState(false);
    const [openTool, setOpenTool] = useState(false);
    const [editorDom, setEditorDom] = useState(null);
    const [totalWidth, setTotalWidth] = useState(0);

    useEffect(() => {
        let timeout = null;

        if (isFSE()) {
            timeout = setTimeout(() => {
                const iframeEl = document.querySelector('iframe[name="editor-canvas"]');
                if (iframeEl) {
                    if (iframeEl.contentDocument.body.innerHTML === '') {
                        setTimeout(() => {
                            const iframeEl = document.querySelector('iframe[name="editor-canvas"]');
                            if (iframeEl) {
                                setEditorDom(iframeEl.contentDocument.body);
                            }
                        }, 200);
                    } else {
                        setEditorDom(iframeEl.contentDocument.body);
                    }
                } else {
                    setEditorDom(document.querySelector('.editor-styles-wrapper'));
                }
            }, 200);
        } else {
            const iframeEl = document.querySelector('iframe[name="editor-canvas"]');
            if (iframeEl) {
                setEditorDom(iframeEl.contentDocument.body);
            } else {
                setEditorDom(document.querySelector('.editor-styles-wrapper'));
            }
        }

        return () => clearTimeout(timeout);
    }, [delayedDeviceType]);

    useEffect(() => {
        if (elementRef) {
            setBlockRef(elementRef);
        }
    }, [elementRef]);

    const stickyClasses = useMemo(() => {
        if (!sticky) return '';

        return Object.keys(sticky)
            .filter((device) => Boolean(sticky[device]))
            .map((device) => `sticky-${device.toLowerCase()}`)
            .join(' ');
    }, [sticky]);

    const onMouseEnter = useCallback(() => setIsHovered(true), []);
    const onMouseLeave = useCallback(() => setIsHovered(false), []);

    const blockProps = useBlockProps({
        className: classnames(
            'guten-element',
            'guten-column',
            'no-margin',
            elementId,
            animationClass,
            displayClass,
            stickyClasses,
            delayedDeviceType.toLowerCase(),
            ...vertical,
            ...horizontal,
            {
                'column-empty': !hasChildBlocks,
                'column-filled': hasChildBlocks,
                [`sticky-${stickyPosition}`]: isSticky(sticky),
                'is-hovered': isHovered,
                'background-animated': isAnimationActive(backgroundAnimated),
                'guten-background-effect-active': isBackgroundEffect,
            }
        ),
        ref: elementRef,
        onMouseEnter,
        onMouseLeave,
    });

    const theProps = {
        ...props,
        attributes,
        setAttributes,
        blockProps,
        clientId,
        columnRef: elementRef.current,
        stickyFlagRef,
        columnWrapRef,
        eSelect: isSelected,
        isHovered,
        position,
        targetBlock,
        setTargetBlock,
        updateBlockAttributes,
        getBlock,
        getBlocks,
        getBlockOrder,
        getBlockRootClientId,
        getNextBlockClientId,
        getPreviousBlockClientId,
        getBlockParents,
        parentBlockWidth,
        setParentBlockWidth,
        curentBlockWidth,
        setCurentBlockWidth,
        targetId,
        setTargetId,
        parentId,
        setParentId,
        newWidth,
        setNewWidth,
        openTool,
        setOpenTool,
        editorDom,
        setTotalWidth,
        totalWidth,
        deviceType: delayedDeviceType,
        elementId,
        elementRef
    };

    const Component = hasChildBlocks ? ColumnWrapper : ColumnPlaceholder;

    return <>
        <CopyElementToolbar {...props}/>
        {isSelected && <ColumnBlockControl {...props} updateBlockWidth={updateBlockWidth} adjacentBlock={adjacentBlock} clientId={clientId} />}
        <ColumnInspection {...props} setAttributes={setAttributes} elementRef={elementRef} />
        <Component {...theProps} />
    </>;
});

export default ColumnBlock;