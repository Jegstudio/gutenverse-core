import { compose } from '@wordpress/compose';
import { withCustomStyle, withMouseMoveEffect } from 'gutenverse-core/hoc';
import { useBlockProps } from '@wordpress/block-editor';
import { classnames } from 'gutenverse-core/components';
import { PanelController } from 'gutenverse-core/controls';
import { panelList } from './panels/panel-list';
import { useInnerBlocksProps } from '@wordpress/block-editor';
import { useRef, useEffect } from '@wordpress/element';
import { withCopyElementToolbar } from 'gutenverse-core/hoc';
import { withAnimationAdvance } from 'gutenverse-core/hoc';
import { useAnimationEditor } from 'gutenverse-core/hooks';
import { useDisplayEditor } from 'gutenverse-core/hooks';

const TextEditorBlock = compose(
    withCustomStyle(panelList),
    withAnimationAdvance('text-editor'),
    withCopyElementToolbar(),
    withMouseMoveEffect
)((props) => {
    const { panelProps} = props;


    const {
        attributes,
        setElementRef,
    } = props;

    const {
        elementId,
        dropcap,
    } = attributes;

    const animationClass = useAnimationEditor(attributes);
    const displayClass = useDisplayEditor(attributes);
    const textEditorRef = useRef();

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
        ref: textEditorRef
    });

    const innerBlocksProps = useInnerBlocksProps({
        template: [['gutenverse/text-paragraph']]
    }, {
        allowedBlocks: ['gutenverse/text-paragraph','core/paragraph'],
    });

    useEffect(() => {
        if (textEditorRef.current) {
            setElementRef(textEditorRef.current);
        }
    }, [textEditorRef]);

    return <>
        <PanelController
            {...props}
            panelList={panelList}
            panelProps={panelProps}
        />
        <div  {...blockProps}>
            <div {...innerBlocksProps} />
        </div>
    </>;
});

export default TextEditorBlock;