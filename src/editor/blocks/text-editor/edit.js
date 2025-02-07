import { compose } from '@wordpress/compose';
import { withCustomStyle, withMouseMoveEffect, withPartialRender } from 'gutenverse-core/hoc';
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
import { useSelect } from '@wordpress/data';

const TextEditorBlock = compose(
    withPartialRender,
    withCustomStyle(panelList),
    withAnimationAdvance('text-editor'),
    withCopyElementToolbar(),
    withMouseMoveEffect
)((props) => {
    const { panelProps} = props;


    const {
        attributes,
        setElementRef,
        setAttributes,
    } = props;

    const {
        elementId,
        dropcap,
        enableHeading
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

    const innerBlocksProps = enableHeading? useInnerBlocksProps({
        template: [['gutenverse/text-paragraph']]
    }, {
        allowedBlocks: ['gutenverse/text-paragraph','core/paragraph', 'core/heading', 'gutenverse/heading'],
    }) : useInnerBlocksProps({
        template: [['gutenverse/text-paragraph']]
    }, {
        allowedBlocks: ['gutenverse/text-paragraph','core/paragraph'],
    });

    const innerBlocksContent = useSelect((select) => {
        const { getBlock } = select('core/block-editor');
        const block = getBlock(props.clientId);
        return block?.innerBlocks || [];
    }, [props.clientId]);

    const hasLink = (htmlString) => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(htmlString, 'text/html');
        return doc.querySelector('a') !== null;
    }

    useEffect(() => {
        const containsAnchorTag = innerBlocksContent.some(innerBlock => 
            hasLink(innerBlock.attributes?.content || '')
        );
        setAttributes({containsAnchorTag: containsAnchorTag})
    }, [innerBlocksContent]);

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