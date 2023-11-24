
import { compose } from '@wordpress/compose';
import { withCustomStyle } from 'gutenverse-core/hoc';
import { useInnerBlocksProps, useBlockProps } from '@wordpress/block-editor';
import { classnames } from 'gutenverse-core/components';
import { PanelController } from 'gutenverse-core/controls';
import { panelList } from './panels/panel-list';
import { useRef } from '@wordpress/element';
import { useEffect } from '@wordpress/element';
import { withCopyElementToolbar } from 'gutenverse-core/hoc';
import { useAnimationEditor } from 'gutenverse-core/hooks';
import { useDisplayEditor } from 'gutenverse-core/hooks';

const ButtonsBlock = compose(
    withCustomStyle(panelList),
    withCopyElementToolbar()
)((props) => {
    const {
        attributes,
        setElementRef
    } = props;

    const {
        elementId,
        orientation,
    } = attributes;

    const buttonsRef = useRef();
    const animationClass = useAnimationEditor(attributes);
    const displayClass = useDisplayEditor(attributes);

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
        ref: buttonsRef
    });

    const innerBlockProps = useInnerBlocksProps(
        blockProps,
        {
            template: [['gutenverse/button']],
            allowedBlocks: ['gutenverse/button'],
            orientation,
            __experimentalAppenderTagName: 'div',
        }
    );

    useEffect(() => {
        if (buttonsRef.current) {
            setElementRef(buttonsRef.current);
        }
    }, [buttonsRef]);

    return <>
        <PanelController panelList={panelList} {...props} />
        <div {...innerBlockProps} />
    </>;
});

export default ButtonsBlock;