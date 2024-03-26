import { RichText } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';
import { useEffect, useState } from '@wordpress/element';
import { useSelect, subscribe, dispatch } from '@wordpress/data';
import u from 'umbrellajs';
import { cryptoRandomString } from 'gutenverse-core/components';
import { createBlock } from '@wordpress/blocks';

const RichTextComponent = (props) => {
    const {
        attributes,
        setAttributes,
        clientId,
        blockProps,
        setPanelState,
        contentAttribute,
        tagName,
        elementRef,
        panelPosition,
        multiline,
        placeholder,
        isOnSplit = false,
        ariaLabel,
        onChange,
    } = props;
    const content = attributes[contentAttribute];
    const [currentContent, setCurrentContent] = useState();
    const [lastChildLength, setLastChildLength] = useState(attributes?.textChilds.length);
    const {
        getBlockAttributes
    } = useSelect(
        (select) => select('core/block-editor'),
        []
    );
    useEffect(() => {
        setLastChildLength(attributes?.textChilds.length);
    },[attributes?.textChilds])
    const getContent = (clientId) => {
        const block = getBlockAttributes(clientId);
        let content = '';
        if (block) {
            content = block[contentAttribute];
        }
        return content;
    };
    useEffect(() => {
        const unsubscribe = subscribe(() => {
            const theContent = getContent(clientId);
            if (currentContent !== theContent) {
                setCurrentContent(theContent);
            }
        });
        return () => unsubscribe();
    }, []);
    useEffect(() => {
        const child = getListOfChildTag(currentContent);
        let childs = attributes?.textChilds;
        if (attributes[contentAttribute]) {
            const newChild = child.map(element => {
                const indexExist = childs.findIndex(item => element.id === item.id);
                if (indexExist !== -1) {
                    element.color = childs[indexExist].color;
                    element.colorHover = childs[indexExist].colorHover;
                    element.typography = childs[indexExist].typography;
                    element.typographyHover = childs[indexExist].typographyHover;
                    element.textClip = childs[indexExist].textClip;
                    element.textClipHover = childs[indexExist].textClipHover;
                    element.background = childs[indexExist].background;
                    element.backgroundHover = childs[indexExist].backgroundHover;
                    element.padding = childs[indexExist].padding;
                    element.paddingHover = childs[indexExist].paddingHover;
                    element.margin = childs[indexExist].margin;
                    element.marginHover = childs[indexExist].marginHover;
                }
                return element;
            });
            setAttributes({ textChilds: newChild });
        }
        if(lastChildLength !== attributes?.textChilds.length && lastChildLength < attributes?.textChilds.length){
            setPanelState({...panelPosition, randKey : Math.random() });
        }
    }, [currentContent]);

    const getListOfChildTag = () => {
        if (elementRef) {
            const newElement = u(elementRef).children().map(child => {
                const newChild = u(child).children().map(grandChild => {
                    if( u(grandChild).nodes[0].localName === 'span' && u(grandChild).hasClass('guten-text-highlight')){
                        return {
                            color: {},
                            colorHover: {},
                            typography: {},
                            typographyHover: {},
                            textClip:{},
                            textClipHover:{},
                            background: {},
                            backgroundHover: {},
                            padding:{},
                            paddingHover:{},
                            margin:{},
                            marginHover:{},
                            value: child,
                            id: u(grandChild).attr('id'),
                            spanId: u(child).attr('id')
                        };
                    }
                });
                return newChild;
            });
            return newElement.nodes;
        } else {
            return [];
        }
    };
    useEffect(() => {
        const newDiv = document.createElement('div');
        newDiv.innerHTML = content;
        const contentArray = [];
        newDiv.childNodes.forEach(node => {
            if (node.nodeType === Node.TEXT_NODE) {
                contentArray.push(node.textContent);
            } else if (node.nodeType === Node.ELEMENT_NODE) {
                contentArray.push(node.outerHTML);
            }
        });
        const newValue = contentArray.map(element => {
            const regex = /id="([^"]+)"/;
            const match = element.match(regex);
            let index = element.indexOf('>');
            if (!match && index !== -1) {
                let part1 = element.slice(1, index);
                let tagHtml = part1.split(' ');
                let child = element;
                if(tagHtml[0] === 'span' && tagHtml[1].search('guten-text-highlight')){
                    const uniqeidChild = 'guten-' + cryptoRandomString({ length: 6, type: 'alphanumeric' });
                    const uniqeidSpan = 'guten-' + cryptoRandomString({ length: 6, type: 'alphanumeric' });
                    child = `<span id=${uniqeidSpan}>` + element.replace(`<${part1}>`, `<${part1} id=${uniqeidChild}>`) + '</span>';
                    setAttributes({ openChild : uniqeidChild });
                }
                return child;
            } else {
                return element;
            }
        });
        return setAttributes({ [contentAttribute]: newValue.join('') });
    },[content]);
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
    }
    return (
        <RichText
            {...blockProps}
            identifier="content"
            tagName={tagName}
            value={content}
            placeholder={placeholder}
            multiline={multiline}
            aria-label={ariaLabel}
            onSplit={ isOnSplit  && onSplit}
            onReplace={ isOnSplit && onReplace}
            // className={classNames}
            onChange={onChange}
        />
    )
}
export default RichTextComponent;