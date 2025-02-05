import { RichText } from '@wordpress/block-editor';
import { useSelect, dispatch } from '@wordpress/data';
import { createBlock } from '@wordpress/blocks';
import { dynamicData } from './module/dynamic-data';
import { highlight } from './module/highlight';
import { useEffect, useState } from '@wordpress/element';

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
        isUseDinamic = false,
        isUseHighlight = false,
    } = props;
    
    const [query, setQuery] = useState(content); // Input value
    const [debouncedQuery, setDebouncedQuery] = useState(''); 

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

    useEffect(() => {
        // Start a timer for the debounce
        const timer = setTimeout(() => {
            setDebouncedQuery(query); // Update debounced value after delay
        }, 500); // Delay: 500ms

        return () => {
            clearTimeout(timer); // Cleanup the timer if query changes before the delay ends
        };
    }, [query]);

    const handleOnChange = (value) => {
        setQuery(value);
    };

    useEffect(() => {
        if (debouncedQuery) {
            onChange(debouncedQuery);
        }
    }, [debouncedQuery]);

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