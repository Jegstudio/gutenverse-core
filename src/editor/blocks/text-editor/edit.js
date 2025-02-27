import { compose } from '@wordpress/compose';
import { withMouseMoveEffect } from 'gutenverse-core/hoc';
import { useBlockProps } from '@wordpress/block-editor';
import { classnames } from 'gutenverse-core/components';
import { BlockPanelController } from 'gutenverse-core/controls';
import { panelList } from './panels/panel-list';
import { useInnerBlocksProps } from '@wordpress/block-editor';
import { useRef } from '@wordpress/element';
import { withCopyElementToolbar } from 'gutenverse-core/hoc';
import { withAnimationAdvance } from 'gutenverse-core/hoc';
import { useAnimationEditor } from 'gutenverse-core/hooks';
import { useDisplayEditor } from 'gutenverse-core/hooks';
import { useDynamicStyle, useGenerateElementId } from 'gutenverse-core/styling';
import getBlockStyle from './styles/block-style';

const TextEditorBlock = compose(
    // withPartialRender,
    // withCustomStyle(panelList),
    // withAnimationAdvance('text-editor'),
    withCopyElementToolbar(),
    // withMouseMoveEffect
)((props) => {
    const {
        attributes,
        clientId
    } = props;

    const {
        elementId,
        dropcap,
        enableHeading
    } = attributes;

    const animationClass = useAnimationEditor(attributes);
    const displayClass = useDisplayEditor(attributes);
    const elementRef = useRef();

    const blockProps = useBlockProps({
        className: classnames(
            'guten-element',
            'gutenverse-text-editor',
            'no-margin',
            elementId,
            animationClass,
            displayClass,
            {
                'dropcap': dropcap
            },
        ),
        ref: elementRef
    });

    const innerBlocksProps = enableHeading ? useInnerBlocksProps({
        template: [['gutenverse/text-paragraph']]
    }, {
        allowedBlocks: ['gutenverse/text-paragraph', 'core/paragraph', 'core/heading'],
    }) : useInnerBlocksProps({
        template: [['gutenverse/text-paragraph']]
    }, {
        allowedBlocks: ['gutenverse/text-paragraph', 'core/paragraph'],
    });

    useGenerateElementId(clientId, elementId, elementRef);
    useDynamicStyle(elementId, attributes, getBlockStyle, elementRef);

    return <>
        <BlockPanelController panelList={panelList} props={props} elementRef={elementRef} />
        <div  {...blockProps}>
            <div {...innerBlocksProps} />
        </div>
    </>;
});

export default TextEditorBlock;