import { RichText } from '@wordpress/block-editor';
import { useSelect, dispatch } from '@wordpress/data';
import { createBlock } from '@wordpress/blocks';
import { dynamicData } from './components/dynamic-data';
import { highlight } from './components/highlight';

const RichTextComponent = (props) => {
    const {
        attributes,
        clientId,
        blockProps,
        contentAttribute,
        tagName,
        multiline,
        placeholder,
        isOnSplit = false,
        ariaLabel,
        onChange,
        ref,
        classNames = '',
        isBlockProps = false,
    } = props;

    dynamicData(props);
    highlight(props);
    const content = attributes[contentAttribute];
    const {
        getBlocks
    } = useSelect(
        (select) => select('core/block-editor'),
        []
    );
    const {insertBlock, replaceBlock} = dispatch('core/block-editor');
    const oldBlock = getBlocks();
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
    //don't delete this, it will get error when deleted;
    const onReplace = (value) => {
    };
    const handleOnChange = (value) => {
        onChange(value);
    };
    const contentOfRichText = () => {
        if(isBlockProps){
            return <RichText
                {...blockProps}
                identifier={contentAttribute}
                tagName={tagName}
                value={content}
                placeholder={placeholder}
                multiline={multiline}
                aria-label={ariaLabel}
                onSplit={ isOnSplit  && onSplit}
                onReplace={ isOnSplit && onReplace}
                onChange={value => handleOnChange(value)}
            />;
        }else{
            return <RichText
                identifier={contentAttribute}
                tagName={tagName}
                value={content}
                placeholder={placeholder}
                multiline={multiline}
                aria-label={ariaLabel}
                className={classNames}
                ref={ref}
                onChange={value => handleOnChange(value)}
            />;
        }
    };
    return (
        contentOfRichText()
    );
};
export default RichTextComponent;