import { useRef, useState, useEffect } from '@wordpress/element';
import { InnerBlocks, useBlockProps, Inserter, BlockControls } from '@wordpress/block-editor';
import classnames from 'classnames';
import { compose } from '@wordpress/compose';
import { withCustomStyle, withCopyElementToolbar, withAnimationSticky, withCursorEffect, withAnimationBackground, withAnimationAdvance, withMouseMoveEffect, withBackgroundEffect, withPartialRender, withBackgroundSlideshow } from 'gutenverse-core/hoc';
import { panelList } from './panels/panel-list';
import { PanelController } from 'gutenverse-core/controls';
import { BuildColumnWidthStyle, setDeviceClasses } from 'gutenverse-core/styling';
import { isAnimationActive, isSticky } from 'gutenverse-core/helper';
import { getDeviceType } from 'gutenverse-core/editor-helper';
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

const toolResize = (props) => {
    const {
        setAttributes,
        attributes,
        newWidth,
        addStyle,
        position,
        clientId,
        getNextBlockClientId,
        getPreviousBlockClientId,
        getBlock,
        updateBlockAttributes
    } = props;

    let targetId = '';
    if ('last' !== position) {
        targetId = getNextBlockClientId(clientId);
    } else {
        targetId = getPreviousBlockClientId(clientId);
    }

    const minWidth = {
        Desktop: 5,
        Tablet: 10,
        Mobile: 15,
    };

    const {
        width,
        elementId
    } = attributes;

    const deviceType = getDeviceType();
    const gutenverseSelector = select('gutenverse/style');
    const currentWidth = attributes.width[deviceType] ? attributes.width[deviceType] : attributes.width['Desktop'];
    const targetWidth = targetId ? getBlock(targetId).attributes.width : null;

    if ('only' === position) {
        let deviceCache = width;
        let nWidth = parseFloat(newWidth.toFixed(1));

        if (nWidth < minWidth[deviceType]) {
            nWidth = minWidth[deviceType];
        }

        if (nWidth > 100) {
            nWidth = 100;
        }

        deviceCache[deviceType] = nWidth;
        addStyle(
            'column-width',
            BuildColumnWidthStyle(deviceCache, `.${elementId}`)
        );
        setAttributes({ width: { ...props.attributes.width, [deviceType]: nWidth } });
        return;
    }

    const bothWidth = (parseFloat(currentWidth) + parseFloat(targetWidth[deviceType] ? targetWidth[deviceType] : targetWidth['Desktop']));
    const targetColumnStyle = gutenverseSelector.findElement(targetId) ? gutenverseSelector.findElement(targetId).addStyle : null;
    const targetColumnElementId = targetId ? getBlock(targetId).attributes.elementId : null;

    let newCurentWidth = newWidth.toFixed(1);
    let newTargetWidth = bothWidth.toFixed(1) - newWidth.toFixed(1);

    if (newCurentWidth > (bothWidth - minWidth[deviceType])) {
        newCurentWidth = bothWidth - minWidth[deviceType];
        newTargetWidth = minWidth[deviceType];
    }

    if (newCurentWidth < minWidth[deviceType]) {
        newCurentWidth = minWidth[deviceType];
        newTargetWidth = bothWidth - minWidth[deviceType];
    }

    if (newTargetWidth < minWidth[deviceType]) {
        newTargetWidth = minWidth[deviceType];
        newCurentWidth = bothWidth - minWidth[deviceType];
    }

    if (deviceType !== 'Desktop') {
        newCurentWidth = newWidth.toFixed(1);
        if (newCurentWidth < minWidth[deviceType]) {
            newCurentWidth = minWidth[deviceType];
        }
        if (newCurentWidth > 100) {
            newCurentWidth = 100;
        }
    }

    newCurentWidth = parseFloat(newCurentWidth);
    newTargetWidth = parseFloat(newTargetWidth);

    let deviceCache = width;
    deviceCache[deviceType] = parseFloat(newCurentWidth);

    addStyle(
        'column-width',
        BuildColumnWidthStyle(deviceCache, `.${elementId}`)
    );

    if (targetColumnStyle && deviceType === 'Desktop') {
        targetWidth[deviceType] = newTargetWidth;
        targetColumnStyle(
            'column-width',
            `.guten-column.${targetColumnElementId} { width: ${newTargetWidth}%; }`
        );
    }
    const newWidths = {
        current: newCurentWidth,
        target: newTargetWidth
    };
    const nextColumnWidthAttr = getBlock(targetId).attributes.width;

    setAttributes({ width: { ...props.attributes.width, [deviceType]: newWidths.current } });
    if (deviceType === 'Desktop') {
        updateBlockAttributes(targetId, { width: { ...nextColumnWidthAttr, [deviceType]: newWidths.target } });
    }
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
        setTotalWidth
    } = props;

    const parentClientId = getBlockParents(clientId, true)[0];
    const deviceType = getDeviceType();
    const parentBlock = getBlock(parentClientId);
    if (deviceType === 'Desktop') {
        parentBlock.innerBlocks.map(({ clientId }) => {
            const toolTip = editorDom?.querySelector(`.wp-block[data-block="${clientId}"] > .guten-column-resizeable > .column-resize`);
            toolTip.classList.add('dragging');
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
    if (deviceType === 'Desktop') {
        const targetWidth = targetBlock.attributes.width[deviceType] ? targetBlock.attributes.width[deviceType] : targetBlock.attributes.width['Desktop'];
        setTargetBlock(targetWidth);
        setTargetId(targetId);
        setParentId(parentClientId);
        setTotalWidth(targetWidth + currentWidth);
    } else {
        setOpenTool(true);
    }
};

const onResize = (props, off) => {
    const {
        clientId,
        addStyle,
        targetBlock,
        getBlock,
        parentBlockWidth,
        curentBlockWidth,
        targetId,
        setNewWidth,
        totalWidth
    } = props;

    const minWidth = {
        Desktop: 5,
        Tablet: 10,
        Mobile: 15,
    };

    const deviceType = getDeviceType();
    const gutenverseSelector = select('gutenverse/style');
    const targetWidth = targetId ? getBlock(targetId).attributes.width : null;
    const curentWidth = clientId ? getBlock(clientId).attributes.width : null;
    const targetColumnStyle = gutenverseSelector.findElement(targetId) ? gutenverseSelector.findElement(targetId).addStyle : null;
    const targetColumnElementId = targetId ? getBlock(targetId).attributes.elementId : null;
    const currentColumnElementId = getBlock(clientId).attributes.elementId;
    const targetBlockPx = (targetBlock / 100) * parentBlockWidth;
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

    if (deviceType !== 'Desktop') {
        calcCurentModPercent = curentModPercent;
        if (calcCurentModPercent < minWidth[deviceType]) {
            calcCurentModPercent = minWidth[deviceType];
        }
        if (calcCurentModPercent > 100) {
            calcCurentModPercent = 100;
        }
    }

    calcCurentModPercent = parseFloat(calcCurentModPercent);
    calcTargetModPercent = parseFloat(calcTargetModPercent);

    // Need to force column to fit with previous total width.
    if (deviceType === 'Desktop' && calcCurentModPercent + calcTargetModPercent > totalWidth) {
        calcTargetModPercent = calcTargetModPercent - 0.1;
    }

    curentWidth[deviceType] = calcCurentModPercent;

    // Update attribute
    addStyle(
        'column-width',
        BuildColumnWidthStyle(curentWidth, `.${currentColumnElementId}`)
    );

    if (targetColumnStyle && deviceType === 'Desktop') {
        targetWidth[deviceType] = calcTargetModPercent;
        targetColumnStyle(
            'column-width',
            `.guten-column.${targetColumnElementId} { width: ${calcTargetModPercent}%; }`
        );
    }

    setNewWidth({
        current: calcCurentModPercent,
        target: calcTargetModPercent,
        targetColumnStyle,
        targetColumnElementId,
        targetWidth
    });
};

const onResizeStop = (props) => {
    const {
        parentId,
        getBlock,
        newWidth,
        setAttributes,
        updateBlockAttributes,
        targetId,
        editorDom,
        setOpenTool
    } = props;
    const deviceType = getDeviceType();
    const parentBlock = getBlock(parentId);
    if (parentBlock) {
        parentBlock.innerBlocks.map(({ clientId }) => {
            const toolTip = editorDom?.querySelector(`.wp-block[data-block="${clientId}"] > .guten-column-resizeable > .column-resize`);
            toolTip.classList.remove('dragging');
        });
    }

    if (deviceType !== 'Desktop') {
        setOpenTool(false);
    }


    if (newWidth.current && newWidth.target && newWidth.targetStyle) {
        // Update style again to avoid missmatch with width style
        newWidth.targetWidth[deviceType] = newWidth.target;
        newWidth.targetColumnStyle(
            'column-width',
            `.guten-column.${newWidth.target} { width: ${newWidth.target}%; }`
        );
        const nextColumnWidthAttr = getBlock(targetId).attributes.width;

        setAttributes({ width: { ...props.attributes.width, [deviceType]: newWidth.current } });
        if (deviceType === 'Desktop') {
            updateBlockAttributes(targetId, { width: { ...nextColumnWidthAttr, [deviceType]: newWidth.target } });
        }
    }
};

// Column Placeholder component
const ColumnPlaceholder = (props) => {
    const deviceType = getDeviceType();
    const {
        blockProps,
        clientId,
        stickyFlagRef,
        columnWrapRef,
        sticky = {},
        stickyPosition,
        eSelect,
        isHovered,
        position,
        attributes,
        openTool,
        setOpenTool,
        HoverIcon,
        editorDom
    } = props;

    const {
        width,
    } = attributes;

    const wvalue = width ? width[deviceType] ? width[deviceType] : width['Desktop'] : 10;

    const wrapperClass = classnames(
        'guten-column-wrapper',
        {
            ['guten-sticky']: isSticky(sticky),
            [`sticky-${stickyPosition}`]: isSticky(sticky),
        }
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
                toolTip.classList.add('dragging');
            });
        }
    };

    const onClose = () => {
        if (deviceType === 'Desktop') {
            parentBlock.innerBlocks.map(({ clientId }) => {
                const toolTip = editorDom?.querySelector(`.wp-block[data-block="${clientId}"] > .guten-column-resizeable > .column-resize`);
                toolTip.classList.remove('dragging');
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
                <div className={`column-resize ${openTool ? 'dragging' : ''}`}>
                    <div
                        onMouseEnter={() => {
                            onOpen();
                        }}
                        onMouseLeave={() => {
                            onClose();
                        }}
                    >{HoverIcon}</div>
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
                                onChange={(event) => {
                                    const newWidth = parseFloat(event.target.value);
                                    let theWidth = 0;
                                    if (isNaN(newWidth)) {
                                        theWidth = parseFloat(wvalue);
                                    } else {
                                        theWidth = newWidth;
                                    }
                                    const theProps = {
                                        ...props,
                                        newWidth: parseFloat(theWidth),
                                        position,
                                    };
                                    toolResize(theProps);
                                }}
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
                </div>
            </ResizableBox>
        </div>
    );
};

// Column InnerBlocks Wrapper component
const ColumnWrapper = (props) => {
    const {
        getBlocks
    } = useSelect(
        (select) => select('core/block-editor'),
        []
    );
    const deviceType = getDeviceType();
    const {
        clientId,
        blockProps,
        columnWrapRef,
        stickyFlagRef,
        sticky = {},
        stickyPosition,
        eSelect,
        isHovered,
        position,
        attributes,
        openTool,
        setOpenTool,
        HoverIcon,
        editorDom,
        slideElement
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

    const wrapperClass = classnames(
        'guten-column-wrapper',
        {
            ['guten-sticky']: isSticky(sticky),
            [`sticky-${stickyPosition}`]: isSticky(sticky),
        }
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
                toolTip.classList.add('dragging');
            });
        }
    };

    const onClose = () => {
        if (deviceType === 'Desktop') {
            parentBlock.innerBlocks.map(({ clientId }) => {
                const toolTip = editorDom?.querySelector(`.wp-block[data-block="${clientId}"] > .guten-column-resizeable > .column-resize`);
                toolTip.classList.remove('dragging');
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
                <div className={'guten-inserter insert-top'}>
                    <Inserter
                        __experimentalIsQuick={true}
                        rootClientId={clientId}
                        clientId={clientColumnId}
                    />
                </div>
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
                <div className={`column-resize ${openTool ? 'dragging' : ''}`}>
                    <div
                        onMouseEnter={() => {
                            onOpen();
                        }}
                        onMouseLeave={() => {
                            onClose();
                        }}
                    >{HoverIcon}</div>
                    <div className={'column-popup'} onFocus={() => {
                        onOpen();
                        setOpenTool(true);
                    }} onBlur={() => {
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
                                onChange={(event) => {
                                    const newWidth = parseFloat(event.target.value);
                                    let theWidth = 0;
                                    if (isNaN(newWidth)) {
                                        theWidth = parseFloat(wvalue);
                                    } else {
                                        theWidth = newWidth;
                                    }
                                    const theProps = {
                                        ...props,
                                        newWidth: parseFloat(theWidth),
                                        position,
                                    };
                                    toolResize(theProps);
                                }}
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
                </div>
                <div className={'guten-inserter insert-bottom'}>
                    <Inserter
                        __experimentalIsQuick={true}
                        rootClientId={clientId}
                        clientId={clientColumnId}
                    />
                </div>

            </ResizableBox>
        </div>
    );
};

// Column Block Control
const ColumnInspection = (props) => {
    return <PanelController panelList={panelList} {...props} />;
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
    withPartialRender,
    withCustomStyle(panelList),
    withAnimationAdvance('column'),
    withAnimationBackground(),
    withAnimationSticky(),
    withCopyElementToolbar(),
    withMouseMoveEffect,
    withBackgroundEffect,
    withCursorEffect,
    withBackgroundSlideshow,
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
        setElementRef,
        deviceType,
        isSelected,
    } = props;

    const {
        elementId,
        verticalAlign,
        horizontalAlign,
        width,
        sticky = {},
        stickyPosition,
        backgroundAnimated = {},
        backgroundEffect
    } = attributes;

    const hasChildBlocks = getBlockOrder(clientId).length > 0;
    const rootClientId = getBlockRootClientId(clientId);
    const columnRef = useRef();
    const columnWrapRef = useRef();
    const stickyFlagRef = useRef();
    const animationClass = useAnimationEditor(attributes);
    const displayClass = useDisplayEditor(attributes);
    const position = getPosition(clientId);
    const adjacentCount = getBlocks(rootClientId).length;
    const gutenverseSelector = select('gutenverse/style');
    const adjacentBlock = getBlocks(rootClientId);
    const [prevAdjacentCount, setPrevAdjacentCount] = useState(false);
    const isBackgroundEffect = (backgroundEffect !== undefined) && (backgroundEffect?.type !== 'none') && !isEmpty(backgroundEffect);

    const updateBlockWidth = (clientId, eachWidth) => {
        const targetColumnStyle = gutenverseSelector.findElement(clientId) ? gutenverseSelector.findElement(clientId).addStyle : null;
        const targetColumnElementId = clientId ? getBlock(clientId).attributes.elementId : null;
        const targetWidth = clientId ? getBlock(clientId).attributes.width : null;
        const targetColumnWidthAttr = getBlock(clientId).attributes.width;

        if (targetColumnStyle) {
            targetWidth[deviceType] = eachWidth;
            targetColumnStyle(
                'column-width',
                `.guten-column.${targetColumnElementId} { width: ${eachWidth}%; }`
            );
            updateBlockAttributes(targetId, { width: { ...targetColumnWidthAttr, [deviceType]: eachWidth } });
        }
    };

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
        if (!prevAdjacentCount) {
            if ((getChildTotalWidth() > 100) || (getChildTotalWidth() < 99 && !width)) {
                setAttributes({ width: { ...width, [deviceType]: eachWidth } });
            }
            setPrevAdjacentCount(getBlocks(rootClientId).length);
        } else if (prevAdjacentCount && (prevAdjacentCount !== adjacentCount)) {
            const innerBlocks = getBlocks(rootClientId);
            setPrevAdjacentCount(adjacentCount);
            innerBlocks.map(item => {
                updateBlockWidth(item.clientId, eachWidth);
            });
        }
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
        if (isFSE()) {
            setTimeout(() => {
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
    }, [deviceType]);

    const HoverIcon = <>
        <svg width="6" height="6" viewBox="0 0 6 6" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 2C0 0.89543 0.895431 0 2 0H6L0 6V2Z" fill="#3B57F7" />
        </svg></>;

    const stickyClasses = Object.keys(sticky)
        .filter((device) => sticky[device])
        .map((device) => `sticky-${device.toLowerCase()}`)
        .join(' ');

    const blockProps = useBlockProps({
        className: classnames(
            'guten-element',
            'guten-column',
            'no-margin',
            elementId,
            animationClass,
            displayClass,
            stickyClasses,
            deviceType.toLowerCase(),
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
        ref: columnRef,
        onMouseEnter: () => {
            setIsHovered(true);
        },
        onMouseLeave: () => {
            setIsHovered(false);
        },
    });

    useEffect(() => {
        if (columnRef.current) {
            setElementRef(columnRef.current);
        }
    }, [columnRef]);

    const theProps = {
        ...props,
        attributes,
        setAttributes,
        blockProps,
        clientId,
        columnRef: columnRef.current,
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
        HoverIcon,
        setTotalWidth,
        totalWidth
    };

    const Component = hasChildBlocks ? ColumnWrapper : ColumnPlaceholder;

    return <>
        <ColumnBlockControl {...props} updateBlockWidth={updateBlockWidth} adjacentBlock={adjacentBlock} clientId={clientId} />
        <ColumnInspection {...props} />
        <Component {...theProps} />
    </>;
});

export default ColumnBlock;