
import { compose } from '@wordpress/compose';
import { withAnimationAdvance, withMouseMoveEffect } from 'gutenverse-core/hoc';
import { useInnerBlocksProps, useBlockProps } from '@wordpress/block-editor';
import { classnames } from 'gutenverse-core/components';
import { BlockPanelController } from 'gutenverse-core/controls';
import { panelList } from './panels/panel-list';
import { useRef, useState } from '@wordpress/element';
import { withCopyElementToolbar } from 'gutenverse-core/hoc';
import { useAnimationEditor } from 'gutenverse-core/hooks';
import { useDisplayEditor } from 'gutenverse-core/hooks';
import { useDynamicStyle, useGenerateElementId } from 'gutenverse-core/styling';
import getBlockStyle from './styles/block-style';

const ButtonsBlock = compose(
    // withPartialRender,
    // withCustomStyle(panelList),
    // withAnimationAdvance('buttons'),
    withCopyElementToolbar(),
    // withMouseMoveEffect
)((props) => {
    const {
        attributes,
        clientId
    } = props;

    const {
        elementId,
        orientation,
    } = attributes;

    const elementRef = useRef();
    const animationClass = useAnimationEditor(attributes);
    const displayClass = useDisplayEditor(attributes);
    const [localAttr, setLocalAttr] = useState({});

    const blockProps = useBlockProps({
        className: classnames(
            elementId,
            'guten-element',
            'guten-buttons',
            'no-margin',
            `${orientation}`,
            animationClass,
            displayClass,
        ),
        ref: elementRef
    });

    useGenerateElementId(clientId, elementId, elementRef);
    useDynamicStyle(elementId, attributes, getBlockStyle, elementRef, localAttr);

    const innerBlockProps = useInnerBlocksProps(
        blockProps,
        {
            template: [['gutenverse/button']],
            allowedBlocks: ['gutenverse/button'],
            orientation,
            __experimentalAppenderTagName: 'div',
        }
    );

    return <>
        <BlockPanelController panelList={panelList} props={props} setLocalAttr={setLocalAttr}/>
        <div {...innerBlockProps} />
    </>;
});

export default ButtonsBlock;