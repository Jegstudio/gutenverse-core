import { useEffect, useRef } from '@wordpress/element';
import {
    BlockControls,
    useBlockProps,
    useInnerBlocksProps,
} from '@wordpress/block-editor';
import { default as SectionVariation } from './components/section-variation';
import get from 'lodash/get';
import { createBlocksFromInnerBlocksTemplate, createBlock } from '@wordpress/blocks';
import classnames from 'classnames';
import SectionLayoutToolbar from './components/section-layout-toolbar';
import { withCursorEffect, withAnimationBackground, withCustomStyle, withBackgroundEffect, withMouseMoveEffect } from 'gutenverse-core/hoc';
import { compose } from '@wordpress/compose';
import SectionVideoContainer from './components/section-video-container';
import { panelList } from './panels/panel-list';
import { PanelController } from 'gutenverse-core/controls';
import { SectionDividerBottom, SectionDividerTop } from './components/section-divider';
import { SectionDividerAnimatedBottom, SectionDividerAnimatedTop } from './components/section-divider-animated';
import { dispatch, useSelect } from '@wordpress/data';
import { withCopyElementToolbar } from 'gutenverse-core/hoc';
import { withAnimationSticky } from 'gutenverse-core/hoc';
import { withAnimationAdvance } from 'gutenverse-core/hoc';
import { useAnimationEditor } from 'gutenverse-core/hooks';
import { useDisplayEditor } from 'gutenverse-core/hooks';
import { isSticky, isAnimationActive } from 'gutenverse-core/helper';
import { __ } from '@wordpress/i18n';
import { ToolbarButton, ToolbarGroup } from '@wordpress/components';
import { IconToolbarColumnAddSVG } from 'gutenverse-core/icons';
import { isEmptyValue } from 'gutenverse-core/editor-helper';
import { FluidCanvas } from 'gutenverse-core/components';

// Placeholder
const SectionPlaceholder = (props) => {
    const {
        getBlockType
    } = useSelect(
        (select) => select('core/blocks'),
        []
    );

    const {
        replaceInnerBlocks
    } = dispatch('core/block-editor');

    const {
        clientId,
        name,
        wrapper
    } = props;

    const blockType = getBlockType(name);

    return (<SectionVariation
        icon={get(blockType, ['icon', 'src'])}
        label={get(blockType, ['title'])}
        blockId={clientId}
        wrapper={wrapper}
        onSelect={(nextVariation) => {
            const variation = createBlocksFromInnerBlocksTemplate(
                nextVariation
            );
            replaceInnerBlocks(clientId, variation, true);
        }}
    />);
};

// Backend Wrapper
const SectionWrapper = (props) => {
    const {
        clientId,
        attributes: { gap, topDivider, bottomDivider, topDividerAnimated, bottomDividerAnimated },
        containerRef
    } = props;

    useEffect(() => {
        dispatch('gutenverse/style').injectRef(clientId, containerRef.current);
    });

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

// Inspector
const SectionInspection = (props) => {
    const { panelProps, isSelected } = props;

    const defaultPanelProps = {
        ...panelProps,
        ...props.attributes,
    };

    return <PanelController
        panelList={panelList}
        panelProps={defaultPanelProps}
        isSelected={isSelected}
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
                Desktop: 5
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
    withCursorEffect,
    withCustomStyle(panelList),
    withAnimationAdvance('section'),
    withAnimationBackground(),
    withAnimationSticky(),
    withCopyElementToolbar(),
    withBackgroundEffect,
    withMouseMoveEffect
)((props) => {
    const {
        getBlockRootClientId,
        getBlocks,
        getBlock
    } = useSelect(
        (select) => select('core/block-editor'),
        []
    );

    const {
        clientId,
        attributes,
        setAttributes,
        isSelected,
        setElementRef,
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
    } = attributes;

    const { settingsData } = window['GutenverseConfig'];
    const { template_page: templatePage } = settingsData || {};
    const { inherit_layout: inheritLayout } = templatePage || {};

    const animationClass = useAnimationEditor(attributes);
    const displayClass = useDisplayEditor(attributes);
    const innerBlocks = getBlocks(clientId);
    const innerBlocksLength = innerBlocks.length;
    const sectionWrapper = useRef();
    const sectionRef = useRef();
    const containerRef = useRef();
    const isBackgroundEffect = (backgroundEffect !== undefined) && (backgroundEffect?.type !== 'none');

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
        ref: sectionRef
    });

    useEffect(() => {
        if (sectionRef.current) {
            setElementRef(sectionRef.current);
        }
    }, [sectionRef]);

    useEffect(() => {
        const rootId = getBlockRootClientId(clientId);
        const rootBlock = getBlock(rootId);

        if (rootBlock && (rootBlock.name === 'gutenverse/column' || rootBlock.name === 'gutenverse/form-builder')) {
            setAttributes({
                isChild: true,
            });
        } else {
            setAttributes({
                isChild: false,
            });
        }
    }, [isSelected]);

    const componentProps = {
        ...props,
        wrapper: 'guten-container',
        containerRef
    };

    const Component = innerBlocksLength ? SectionWrapper : SectionPlaceholder;
    const dataId = elementId ? elementId.split('-')[1] : '';

    return <>
        <SectionBlockControl
            {...props}
            clientId={clientId}
        />
        <SectionInspection {...props} />
        <div id={dataId} className={`guten-section-wrapper section-wrapper section-${elementId} sticky-${stickyPosition} ${inheritLayout ? 'inherit-layout' : ''} ${cursorEffect?.show ? 'guten-cursor-effect' : ''}`} ref={sectionWrapper} data-id={dataId}>
            <section {...blockProps}>
                {isBackgroundEffect && <div className="guten-background-effect"><div className="inner-background-container"></div></div>}
                <FluidCanvas attributes={attributes} />
                {isAnimationActive(backgroundAnimated) && <div className={'guten-background-animated'}><div className={`animated-layer animated-${dataId}`}></div></div>}
                <SectionVideoContainer {...props} />
                <div className="guten-background-overlay" />
                <Component {...componentProps} />
            </section>
        </div>
    </>;
});

export default SectionBlock;