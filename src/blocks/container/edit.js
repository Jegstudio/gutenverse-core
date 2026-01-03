import { InnerBlocks, useBlockProps, useInnerBlocksProps } from '@wordpress/block-editor';
import { compose } from '@wordpress/compose';
import { dispatch, useSelect } from '@wordpress/data';
import { useCallback, useRef, useState } from '@wordpress/element';
import classnames from 'classnames';
import { createBlocksFromInnerBlocksTemplate } from '@wordpress/blocks';
import { CopyElementToolbar } from 'gutenverse-core/components';
import { BlockPanelController } from 'gutenverse-core/controls';
import { withAnimationAdvance } from 'gutenverse-core/hoc';
import { useAnimationEditor, useDisplayEditor } from 'gutenverse-core/hooks';
import { useDynamicStyle, useGenerateElementId } from 'gutenverse-core/styling';
import { panelList } from './panels/panel-list';
import getBlockStyle from './styles/block-style';
import ContainerVariation from './components/container-variation';
import { ResizableBox } from '@wordpress/components';

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

const onResizeStart = (props, p) => {};
const onResize = (props, off) => {};
const onResizeStop = (props) => {};

const EmptyContainer = (props) => {
    const {
        blockProps,
        clientId,
        isSelected,
        isHovered
    } = props;

    const resizeStart = (e, p) => {
        onResizeStart(props, p);
    };

    const resize = (e, p, t, d) => {
        onResize(props, d.width);
    };

    const resizeStop = () => {
        onResizeStop(props);
    };

    return <div {...blockProps}>
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
            showHandle={isSelected || isHovered}
            className="guten-container-resizeable"
            onResizeStart={resizeStart}
            onResize={resize}
            onResizeStop={resizeStop}
        >
            <InnerBlocks
                renderAppender={InnerBlocks.ButtonBlockAppender}
                clientId={clientId}
            />
        </ResizableBox>
    </div>;
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
        isSelected,
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
                blockProps={blockProps}
                innerBlocksProps={innerBlocksProps}
                clientId={clientId}
                isSelected={isSelected}
                isHovered={isHovered}
            />}
    </>;
});

export default ContainerBlock;
