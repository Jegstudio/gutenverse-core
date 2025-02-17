import { RichText } from '@wordpress/block-editor';
import { useSelect, dispatch } from '@wordpress/data';
import { createBlock } from '@wordpress/blocks';
import { dynamicData } from './module/dynamic-data';
import { highlight } from './module/highlight';
import { useEffect, useState, useDeferredValue } from '@wordpress/element';

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
        classNames = '',
        isBlockProps = false,
        isUseDinamic = false,
        isUseHighlight = false,
    } = props;

    const [query, setQuery] = useState(content); // Input value
    const [isTyping, setIsTyping] = useState(false);
    const deferredQuery = useDeferredValue(query);

    if(isUseDinamic){
        dynamicData(props);
    }
    if(isUseHighlight){
        highlight(props);
    }

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
        const newBlock = createBlock( 'gutenverse/text-paragraph', {
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
        setQuery(value);
        setIsTyping(true);
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsTyping(false);
        }, 500);

        return () => clearTimeout(timer);
    }, [query]);

    useEffect(() => {
        if (!isTyping && deferredQuery !== undefined) {
            onChange(deferredQuery);
        }
    }, [deferredQuery, isTyping]);

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
                onChange={value => handleOnChange(value)}
            />;
        }
    };

    return (
        contentOfRichText()
    );

};
export default RichTextComponent;