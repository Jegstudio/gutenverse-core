import { compose } from '@wordpress/compose';
import { withCustomStyle, withMouseMoveEffect } from 'gutenverse-core/hoc';
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

const TextBlock = compose(
    withCustomStyle(panelList),
    withAnimationAdvance('text-editor'),
    withCopyElementToolbar(),
    withMouseMoveEffect
)((props) => {
    const { panelProps} = props;
    const {
        attributes,
        setAttributes,
        clientId
    } = props;
    const {
        elementId,
        dropcap,
        paragraph
    } = attributes;
    const {
        getBlocks
    } = useSelect(
        (select) => select('core/block-editor'),
        []
    );

    const animationClass = useAnimationEditor(attributes);
    const displayClass = useDisplayEditor(attributes);
    const {insertBlock, replaceBlock} = dispatch('core/block-editor');
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
    });
    const onSplit = (value, isOriginal) => {
        const newBlock = createBlock( 'gutenverse/text', {
            paragraph: value,
        } );
        if(isOriginal){
            replaceBlock(clientId,newBlock);
        }else{
            const testBlock = getBlocks();
            insertBlock(newBlock, testBlock.length + 1, clientId);
        }
    };
    const onReplace = (value) => {
    }
    return <>
        <PanelController
            {...props}
            panelList={panelList}
            panelProps={panelProps}
        />
        <div  {...blockProps}>
            <RichText
                className={'gutenverse-text-paragraph'}
                tagName={'p'}
                aria-label={__('Text Paragraph', 'gutenverse')}
                placeholder={__('Text Paragraph Placeholder', 'gutenverse')}
                value={paragraph}
                onChange={value => setAttributes({ paragraph: value })}
                onSplit={onSplit}
                onReplace= {onReplace}
            />
        </div>
    </>;
});

export default TextBlock;