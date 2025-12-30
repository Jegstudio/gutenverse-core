import { InnerBlocks, useBlockProps, useInnerBlocksProps } from '@wordpress/block-editor';
import { compose } from '@wordpress/compose';
import { useSelect } from '@wordpress/data';
import { useRef } from '@wordpress/element';
import classnames from 'classnames';
import { CopyElementToolbar } from 'gutenverse-core/components';
import { BlockPanelController } from 'gutenverse-core/controls';
import { withAnimationAdvance } from 'gutenverse-core/hoc';
import { useAnimationEditor, useDisplayEditor } from 'gutenverse-core/hooks';
import { useDynamicStyle, useGenerateElementId } from 'gutenverse-core/styling';
import { panelList } from './panels/panel-list';
import getBlockStyle from './styles/block-style';

const ContainerBlock = compose(
    withAnimationAdvance('container'),
)((props) => {
    const {
        getBlockOrder
    } = useSelect((select) => select('core/block-editor'), []);

    const {
        clientId,
        attributes,
    } = props;

    const {
        elementId,
    } = attributes;

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
        ),
        ref: elementRef
    });

    const innerBlocksProps = useInnerBlocksProps(blockProps, {
        renderAppender: hasChildBlocks ? undefined : InnerBlocks.ButtonBlockAppender
    });

    return <>
        <CopyElementToolbar {...props} />
        <BlockPanelController props={props} panelList={panelList} elementRef={elementRef} />
        <div {...innerBlocksProps} />
    </>;
});

export default ContainerBlock;
