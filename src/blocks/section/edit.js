import { useCallback, useEffect, useRef } from '@wordpress/element';
import { BlockControls, InnerBlocks, useBlockProps, useInnerBlocksProps } from '@wordpress/block-editor';
import { default as SectionVariation } from './components/section-variation';
import { createBlocksFromInnerBlocksTemplate, createBlock } from '@wordpress/blocks';
import classnames from 'classnames';
import SectionLayoutToolbar from './components/section-layout-toolbar';
import { withCursorEffect, withAnimationBackground, withCustomStyle, withBackgroundEffect, withMouseMoveEffect, withPartialRender, withBackgroundSlideshow, withAnimationAdvance, withAnimationSticky, withCopyElementToolbar } from 'gutenverse-core/hoc';
import { compose } from '@wordpress/compose';
import SectionVideoContainer from './components/section-video-container';
import { panelList } from './panels/panel-list';
import { PanelController } from 'gutenverse-core/controls';
import { SectionDividerBottom, SectionDividerTop } from './components/section-divider';
import { SectionDividerAnimatedBottom, SectionDividerAnimatedTop } from './components/section-divider-animated';
import { dispatch, useSelect } from '@wordpress/data';
import { useAnimationEditor, useDisplayEditor } from 'gutenverse-core/hooks';
import { isSticky, isAnimationActive } from 'gutenverse-core/helper';
import { __ } from '@wordpress/i18n';
import { ToolbarButton, ToolbarGroup } from '@wordpress/components';
import { IconToolbarColumnAddSVG } from 'gutenverse-core/icons';
import { isEmptyValue } from 'gutenverse-core/editor-helper';
import { FluidCanvas } from 'gutenverse-core/components';
import isEmpty from 'lodash/isEmpty';
import { roundToDown } from 'round-to';
import { useDynamicScript, useDynamicStyle, useGenerateElementId } from 'gutenverse-core/styling';
import getBlockStyle from './styles/block-style';

const SectionPlaceholder = ({ clientId, name, wrapper }) => {
    const { getBlockType } = useSelect((select) => select('core/blocks'), []);
    const { replaceInnerBlocks } = dispatch('core/block-editor');
    const blockType = getBlockType(name);

    const handleVariation = useCallback((nextVariation) => {
        const variation = createBlocksFromInnerBlocksTemplate(nextVariation);
        replaceInnerBlocks(clientId, variation, true);
    }, [clientId]);

    return <>
        <SectionVariation
            icon={blockType?.icon?.src}
            label={blockType?.title}
            blockId={clientId}
            wrapper={wrapper}
            onSelect={handleVariation}
        />
        <div style={{ display: 'none' }}>
            {/* Note: Inner Block is here to allow insert block when section total column is at 0. */}
            <InnerBlocks />
        </div>
    </>;
};

const SectionWrapper = (props) => {
    const {
        attributes,
        containerRef
    } = props;

    const {
        gap,
        topDivider,
        bottomDivider,
        topDividerAnimated,
        bottomDividerAnimated
    } = attributes;

    const innerBlocksProps = useInnerBlocksProps({
        className: classnames('guten-container', {
            [`guten-column-gap-${gap}`]: true,
        }),
        ref: containerRef,
    }, {
        orientation: 'horizontal',
        renderAppender: false,
        allowedBlocks: ['gutenverse/column'],
    });

    return <>
        {topDivider && <SectionDividerTop {...props} />}
        {bottomDivider && <SectionDividerBottom {...props} />}
        {(!isEmptyValue(topDividerAnimated) && topDividerAnimated.type !== 'none') && <SectionDividerAnimatedTop {...props} />}
        {(!isEmptyValue(bottomDividerAnimated) && bottomDividerAnimated.type !== 'none') && <SectionDividerAnimatedBottom {...props} />}
        <div {...innerBlocksProps} />
    </>;
};

const SectionInspection = (props) => {
    const { clientId, panelProps, isSelected, attributes, setAttributes, elementRef } = props;

    const defaultPanelProps = {
        ...panelProps,
        ...attributes,
        clientId,
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

const SectionAddColumn = ({ clientId }) => {
    const {
        insertBlock,
    } = dispatch('core/block-editor');

    const {
        getBlocks
    } = useSelect(
        (select) => select('core/block-editor'),
        []
    );

    const addNewColumn = () => {
        const newChild = createBlock('gutenverse/column', {
            width: {
                Desktop: roundToDown(100 / (getBlocks(clientId).length + 1), 1)
            }
        });
        insertBlock(newChild, getBlocks(clientId).length + 1, clientId);
    };

    return <ToolbarButton
        name="add-column"
        icon={<IconToolbarColumnAddSVG />}
        title={__('Add Column', '--gctd--')}
        onClick={() => addNewColumn()}
    />;
};

// Block Control
const SectionBlockControl = ({ attributes, setAttributes, clientId }) => {
    const { layout } = attributes;

    return <BlockControls>
        <ToolbarGroup>
            <SectionLayoutToolbar
                onChange={layout => {
                    setAttributes({ layout });
                }}
                value={layout}
            />
            <SectionAddColumn clientId={clientId} />
        </ToolbarGroup>
    </BlockControls>;
};

// Section Block
const SectionBlock = compose(
    withPartialRender,
    // withAnimationAdvance('section'),
    // withAnimationBackground(),
    withAnimationSticky(),
    withCopyElementToolbar(),
    // withMouseMoveEffect,
    // withCursorEffect,
    // withBackgroundEffect,
    // withBackgroundSlideshow,
)((props) => {
    const {
        getBlockRootClientId,
        getBlocks,
        getBlock
    } = useSelect((select) => select('core/block-editor'), []);

    const {
        clientId,
        attributes,
        setAttributes,
        isSelected,
        slideElement
    } = props;

    const {
        elementId,
        layout,
        align,
        overflow,
        sticky = {},
        stickyPosition,
        backgroundAnimated = {},
        cursorEffect,
        backgroundEffect,
        background,
        backgroundOverlay
    } = attributes;

    const elementRef = useRef();
    useGenerateElementId(clientId, elementId, elementRef);
    useDynamicStyle(elementId, attributes, getBlockStyle, elementRef);
    useDynamicScript(elementRef);

    const { settingsData } = window['GutenverseConfig'];
    const { template_page: templatePage } = settingsData || {};
    const { inherit_layout: inheritLayout } = templatePage || {};

    const animationClass = useAnimationEditor(attributes);
    const displayClass = useDisplayEditor(attributes);
    const innerBlocks = getBlocks(clientId);
    const innerBlocksLength = innerBlocks.length;
    const sectionWrapper = useRef();
    const containerRef = useRef();
    const isBackgroundEffect = (backgroundEffect !== undefined) && (backgroundEffect?.type !== 'none') && !isEmpty(backgroundEffect);
    const blockProps = useBlockProps({
        className: classnames(
            'guten-element',
            'guten-section',
            elementId,
            animationClass,
            displayClass,
            {
                'section-variation-picker': !innerBlocksLength,
                'background-animated': isAnimationActive(backgroundAnimated),
                [`layout-${layout}`]: layout,
                [`align-${align}`]: align,
                [`overflow-${overflow}`]: overflow && overflow !== 'none',
                ['guten-sticky']: isSticky(sticky),
                [`sticky-${stickyPosition}`]: isSticky(sticky),
                'guten-background-effect-active': isBackgroundEffect,
            }
        ),
        ref: elementRef
    });

    useEffect(() => {
        const rootId = getBlockRootClientId(clientId);
        const rootBlock = getBlock(rootId);
        const isChild = rootBlock && (rootBlock.name === 'gutenverse/column' || rootBlock.name === 'gutenverse/form-builder');

        setAttributes({ isChild });
    }, [isSelected]);

    const componentProps = {
        ...props,
        wrapper: 'guten-container',
        containerRef
    };

    const Component = innerBlocksLength ? SectionWrapper : SectionPlaceholder;
    const dataId = elementId ? elementId.split('-')[1] : '';

    return <>
        <SectionBlockControl {...props} clientId={clientId} />
        <SectionInspection {...props} elementRef={elementRef}/>
        <div id={dataId} className={`guten-section-wrapper section-wrapper section-${elementId} sticky-${stickyPosition} ${inheritLayout ? 'inherit-layout' : ''} ${cursorEffect?.show ? 'guten-cursor-effect' : ''}`} ref={sectionWrapper} data-id={dataId}>
            <section {...blockProps}>
                {!isAnimationActive(backgroundAnimated) && background?.slideImage?.length > 0 && slideElement}
                {isBackgroundEffect && <div className="guten-background-effect"><div className="inner-background-container"></div></div>}
                <FluidCanvas attributes={attributes} />
                {isAnimationActive(backgroundAnimated) && <div className={'guten-background-animated'}><div className={`animated-layer animated-${dataId}`}>
                    {background?.slideImage?.length > 0 && slideElement}
                </div></div>}
                <SectionVideoContainer {...props} />
                {!isEmpty(backgroundOverlay) && <div className="guten-background-overlay" />}
                <Component {...componentProps} />
            </section>
        </div>
    </>;
});

export default SectionBlock;