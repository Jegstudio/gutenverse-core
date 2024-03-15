import { compose } from '@wordpress/compose';
import { withCustomStyle, withHighLightText, withMouseMoveEffect } from 'gutenverse-core/hoc';
import { useBlockProps } from '@wordpress/block-editor';
import { classnames } from 'gutenverse-core/components';
import { PanelController } from 'gutenverse-core/controls';
import { panelList } from './panels/panel-list';
import { withCopyElementToolbar } from 'gutenverse-core/hoc';
import { withAnimationAdvance } from 'gutenverse-core/hoc';
import { useAnimationEditor } from 'gutenverse-core/hooks';
import { useDisplayEditor } from 'gutenverse-core/hooks';
import { RichText } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';
import { createBlock } from '@wordpress/blocks';
import { dispatch, useSelect } from '@wordpress/data';
import { HighLightToolbar } from 'gutenverse-core/toolbars';
import { useEffect, useRef } from '@wordpress/element';

const TextBlockControl = (props) => {
    const{
        attributes,
        setAttributes
    } = props
    const {
        type,
    } = attributes;

    HighLightToolbar (props, 'gutenverse/text' );
};
const TextBlock = compose(
    withCustomStyle(panelList),
    withAnimationAdvance('text'),
    withCopyElementToolbar(),
    withMouseMoveEffect,
    withHighLightText('paragraph')
)((props) => {
    const { panelProps} = props;
    const {
        attributes,
        setElementRef,
        handleOnChange,
        clientId
    } = props;
    const {
        elementId,
        paragraph
    } = attributes;
    const {
        getBlocks
    } = useSelect(
        (select) => select('core/block-editor'),
        []
    );
    useEffect(() => {
        console.log(attributes);
    },[attributes])
    const textRef = useRef();
    const oldBlock = getBlocks();
    const animationClass = useAnimationEditor(attributes);
    const displayClass = useDisplayEditor(attributes);
    const {insertBlock, replaceBlock} = dispatch('core/block-editor');
    const blockProps = useBlockProps({
        className: classnames(
            'guten-element',
            'gutenverse-text',
            'no-margin',
            elementId,
            animationClass,
            displayClass,
        ),
        ref: textRef
    });
    const onSplit = (value, isOriginal) => {
        const newBlock = createBlock( 'gutenverse/text', {
            paragraph: value,
        } );
        if(isOriginal){
            replaceBlock(clientId,newBlock);
        }else{
            const testBlock = getBlocks();
            const currentBlockIndex = testBlock.findIndex((el,index) => el.clientId !== oldBlock[index].clientId);
            insertBlock(newBlock, currentBlockIndex + 1);
        }
    };
    const onReplace = (value) => {
    }
    useEffect(() => {
        if (textRef.current) {
            setElementRef(textRef.current);
        }
    }, [textRef]);
    return <>
        <PanelController
            {...props}
            panelList={panelList}
            panelProps={panelProps}
        />
        <TextBlockControl {...props}/>
        <RichText
            {...blockProps}
            tagName={'p'}
            aria-label={__('Text Paragraph', 'gutenverse')}
            placeholder={__('Text Paragraph Placeholder', 'gutenverse')}
            value={paragraph}
            onChange={handleOnChange}
            onSplit={(value,isOriginal) => onSplit(value, isOriginal)}
            onReplace= {onReplace}
        />
    </>;
});

export default TextBlock;