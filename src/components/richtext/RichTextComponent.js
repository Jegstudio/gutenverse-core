import { RichText } from '@wordpress/block-editor';
import { useSelect, dispatch } from '@wordpress/data';
import { createBlock } from '@wordpress/blocks';
import { dynamicData } from './module/dynamic-data';
import { highlight } from './module/highlight';
import { useEffect, useRef, useCallback } from '@wordpress/element';

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

    const content = attributes[contentAttribute];
    const timerRef = useRef(null);
    const contentRef = useRef(content);
    contentRef.current = content;

    if (isUseDinamic) {
        dynamicData(props);
    }
    if (isUseHighlight) {
        highlight(props);
    }
    const {
        getBlocks
    } = useSelect(
        (select) => select('core/block-editor'),
        []
    );

    const { insertBlock, replaceBlock } = dispatch('core/block-editor');
    const oldBlock = getBlocks();

    const onSplit = (value, isOriginal) => {
        const newBlock = createBlock('gutenverse/text-paragraph', {
            paragraph: value,
        });
        if (isOriginal) {
            replaceBlock(clientId, newBlock);
        } else {
            const testBlock = getBlocks();
            const currentBlockIndex = testBlock.findIndex((el, index) => el.clientId !== oldBlock[index].clientId);
            insertBlock(newBlock, currentBlockIndex + 1);
        }
    };

    //don't delete this, it will get error when deleted;
    const onReplace = (value) => {
        console.log(value)
    };

    const handleOnChange = useCallback((value) => {
        if (timerRef.current) {
            clearTimeout(timerRef.current);
        }
        timerRef.current = setTimeout(() => {
            if (value !== contentRef.current) {
                onChange(value);
            }
            timerRef.current = null;
        }, 500);
    }, [onChange]);

    useEffect(() => {
        return () => {
            if (timerRef.current) {
                clearTimeout(timerRef.current);
            }
        };
    }, []);

    const contentOfRichText = () => {
        if (isBlockProps) {
            return <RichText
                {...blockProps}
                tagName={tagName}
                value={content}
                placeholder={placeholder}
                multiline={multiline}
                aria-label={ariaLabel}
                onSplit={isOnSplit && onSplit}
                onReplace={isOnSplit && onReplace}
                onChange={value => handleOnChange(value)}
            />;
        } else {
            return <RichText
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
