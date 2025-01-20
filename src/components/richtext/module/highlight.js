
import u from 'umbrellajs';
import { cryptoRandomString } from 'gutenverse-core/components';
import { __ } from '@wordpress/i18n';
import { useEffect, useState } from '@wordpress/element';
import { useSelect, subscribe, dispatch } from '@wordpress/data';

export const highlight = (props) => {
    const {
        attributes,
        setAttributes,
        clientId,
        setPanelState,
        contentAttribute,
        tagName,
        panelPosition,
        textChilds
    } = props;
    const content = attributes[contentAttribute];
    const [lastChildLength, setLastChildLength] = useState(attributes[textChilds].length);

    useEffect(() => {
        setLastChildLength(attributes[textChilds].length);
    },[attributes[textChilds]]);

    useEffect(() => {
        const child = getListOfChildTag(content);
        let childs = attributes[textChilds];
        if (attributes[contentAttribute]) {
            let anyChange = 0;
            const newChild = child.map(element => {
                const indexExist = childs.findIndex(item => element.id === item.id);
                if (indexExist !== -1) {
                    return childs[indexExist];
                }else{
                    anyChange += 1;
                    return element;
                }
            });
            if( anyChange > 0 || newChild.length !== childs.length ){
                setAttributes({ [textChilds]: newChild });
            }
        }
        if(lastChildLength !== attributes[textChilds].length && lastChildLength < attributes[textChilds].length){
            setPanelState({...panelPosition, randKey : Math.random() });
        }
    }, [content]);

    const getListOfChildTag = (content) => {
        const fakeContent = document.createElement(tagName);
        fakeContent.innerHTML = content;
        const newElement = u(fakeContent).children().map(child => {
            const newChild = u(child).children().map(grandChild => {
                if( u(grandChild).nodes[0].localName === 'span' && u(grandChild).hasClass('guten-text-highlight')){
                    return {
                        color: {},
                        colorHover: {},
                        typography: {},
                        typographyHover: {},
                        textClip:{},
                        textClipHover:{},
                        textStroke:{},
                        textStrokeHover:{},
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
};