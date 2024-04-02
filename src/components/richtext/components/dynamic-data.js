import { useEffect, useState } from '@wordpress/element';
import u from 'umbrellajs';
import { applyFilters } from '@wordpress/hooks';
import isEmpty from 'lodash/isEmpty';

export const dynamicData = (props) => {
    const {
        attributes,
        setAttributes,
        ref,
        contentAttribute
    } = props;

    const {
        dynamicDataList
    } = attributes;
    const content = attributes[contentAttribute];
    const [dynamicText, setDynamicText] = useState([]);

    useEffect(()=>{
        if (ref) {
            const dynamicList = getDynamicDataList();
            const currentList = dynamicDataList;
            if (dynamicList.length > 0) {
                const newList = dynamicList.map(element => {
                    const indexExist = currentList.findIndex(item => element.id === item.id);
                    if (indexExist !== -1) {
                        element._key = currentList[indexExist]?._key;
                        element.dynamicContent = currentList[indexExist]?.dynamicContent;
                        element.dynamicUrl = currentList[indexExist]?.dynamicUrl;
                        currentList[indexExist]?.parent ? element.parent = currentList[indexExist]?.parent : {};
                    }
                    return element;
                });
                setAttributes({dynamicDataList: newList});
            } else setAttributes({dynamicDataList: []});
        }
    },[content, ref, dynamicText]);

    const getDynamicDataList = () => {
        let newElement = {};
        if(u(ref).nodes[0].classList.contains('block-editor-rich-text__editable')){
            newElement = u(ref).children().map(child => {
                const isDynamic = u(child).nodes[0].classList.contains('guten-dynamic-data');
                if( isDynamic ){
                    return {
                        dynamicContent: {},
                        dynamicUrl: {},
                        _key: {},
                        value: child,
                        id: u(child).attr('id')
                    };
                } else {
                    const dynamics = u(child).find('.guten-dynamic-data');
                    const nested = dynamics.nodes.map(el => {
                        return {
                            dynamicContent: {},
                            dynamicUrl: {},
                            _key: {},
                            parent: child,
                            value: el,
                            id: u(el).attr('id')
                        };
                    });
                    return nested;
                }
            });
            if( newElement.nodes.length === 0 ){
                const arrElement = [];
                const dynamics = u(ref).find('.guten-dynamic-data');
                dynamics.nodes.map(el => {
                    arrElement.push({
                        dynamicContent: {},
                        dynamicUrl: {},
                        _key: {},
                        value: el,
                        id: u(el).attr('id')
                    });
                });
                newElement.nodes = arrElement;
            }
        }else{
            const arrElement = [];
            newElement = u(ref).find('.block-editor-rich-text__editable').map(child => {
                const dynamics = u(child).find('.guten-dynamic-data');
                dynamics.nodes.map(el => {
                    arrElement.push({
                        dynamicContent: {},
                        dynamicUrl: {},
                        _key: {},
                        value: el,
                        id: u(el).attr('id')
                    });
                });
            });
            newElement.nodes = arrElement;
        }
        return newElement.nodes;
    };

    const descendantTags = new Set();
    function checkDescendants(element) {
        for (let node of element.childNodes) {
            if (node.nodeType === Node.ELEMENT_NODE) {
                const tagName = node.tagName.toLowerCase();
                const attributes = Array.from(node.attributes).map(attr => `${attr.name}="${attr.value}"`).join(' ');
                const tagWithAttributes = `<${tagName}${attributes ? ' ' + attributes : ''}></${tagName}>`;
                if (!descendantTags.has(tagWithAttributes)) {
                    descendantTags.add(tagWithAttributes);
                }
                checkDescendants(node);
            }
        }
    }

    const ancestorTags = new Set();
    function checkAncestor(element) {
        if (!element || isEmpty(element)) return;
        const tagName = element.tagName.toLowerCase();
        const attributes = Array.from(element.attributes).map(attr => `${attr.name}="${attr.value}"`).join(' ');
        const tagWithAttributes = `<${tagName}${attributes ? ' ' + attributes : ''}></${tagName}>`;
        if (!ancestorTags.has(tagWithAttributes)) {
            ancestorTags.add(tagWithAttributes);
        }

        for (let node of element.childNodes) {
            if (node.nodeType === Node.ELEMENT_NODE && !node.classList.contains('guten-dynamic-data')) {
                checkAncestor(node);
            }
        }
    }

    function mergeTags(elementsArray, text) {
        let temp = null;
        if (elementsArray.length === 0) return text;
        if (elementsArray.length === 1) {
            temp = elementsArray[0];
        }
        for (let i = 0; i <= elementsArray.length - 2; i++) {
            if (temp === null) {
                temp = elementsArray[i];
            }
            const outerElement = temp;
            const innerElement = elementsArray[i + 1];
            temp = outerElement.replace('</', innerElement + '</');
        }
        const mergedElements = temp.replace('</', text + '</');
        return mergedElements;
    }
    function parseElement(elementString){
        var parser = new DOMParser();
        var htmlElement = parser.parseFromString(elementString, 'text/html').body.firstChild;

        return htmlElement;
    }

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
        const selectedItems = [];
        for (const [index, item] of contentArray.entries()) {
            const parser = new DOMParser();
            const doc = parser.parseFromString(item, 'text/html');
            const selectElements = doc.querySelectorAll('span.guten-dynamic-data');
            const pushData = {
                key : index,
                element: selectElements
            };

            if (selectElements.length > 0) {
                selectedItems.push(pushData);
            }
        }

        if ( selectedItems.length > 0 && dynamicDataList.length === selectedItems.length) {

            selectedItems.map((item, index)=>{
                const id = item.element[0].id;
                const linkExist = document.querySelector(`.link-${id}`);

                const href = applyFilters(
                    'gutenverse.dynamic.generate-url',
                    '#',
                    'dynamicUrl',
                    dynamicDataList[index],
                    id,
                );

                const title = applyFilters(
                    'gutenverse.dynamic.generate-content',
                    content,
                    'dynamicContent',
                    dynamicDataList[index],
                    id,
                );
                const dynamicTextContent = applyFilters(
                    'gutenverse.dynamic.fetch-text',
                    dynamicDataList[index].dynamicContent
                );
                if (title !== content){
                    dynamicTextContent
                        .then(result => {
                            if ((!Array.isArray(result) || result.length > 0 ) && result !== undefined && result !== dynamicText[index]) {
                                setDynamicText(prevState => {
                                    const newState = [...prevState];
                                    newState[index] = result;
                                    return newState;
                                });
                            }
                        })
                        .catch(error => {
                            console.error(error);
                        });
                }

                if (href !== '#') {
                    const anchorElement = document.createElement('a');
                    anchorElement.setAttribute('class', `link-${id}`);
                    // anchorElement.setAttribute('href', href);
                    if (title !== content) {
                        //if dynamic data element is inside other element format
                        if (dynamicDataList[index].parent){
                            let parent = dynamicDataList[index].parent;
                            checkAncestor(parent);
                            const elementWithAttr = item.element[0];
                            elementWithAttr.setAttribute('dynamic-data-content', title);
                            elementWithAttr.setAttribute('dynamic-data-url', href);
                            const tagsMerged = mergeTags(Array.from(ancestorTags), elementWithAttr.outerHTML);
                            var htmlElement1 = parseElement(tagsMerged);
                            if (dynamicText[index] !== undefined) {
                                checkDescendants(htmlElement1);
                                const tagsMerged = mergeTags(Array.from(descendantTags), dynamicText[index]);
                                htmlElement1.innerHTML = tagsMerged;
                            }
                            anchorElement.innerHTML = htmlElement1.innerHTML;
                        } else { //if dynamic data element is the wrapper of other element format
                            item.element[0].setAttribute('dynamic-data-content', title);
                            item.element[0].setAttribute('dynamic-data-url', href);
                            if (dynamicText[index] !== undefined) {
                                checkDescendants(item.element[0]);
                                const tagsMerged = mergeTags(Array.from(descendantTags), dynamicText[index]);
                                item.element[0].innerHTML = tagsMerged;
                            }
                            anchorElement.innerHTML = item.element[0].outerHTML;
                        }
                    } else {
                        if ( linkExist ) {
                            var htmlElement2 = parseElement(contentArray[item.key]);
                            anchorElement.innerHTML = htmlElement2.innerHTML;
                        } else anchorElement.innerHTML = item.element[0].outerHTML;
                    }
                    contentArray[item.key] = anchorElement.outerHTML;
                }else if (title !== content){

                    //if dynamic data element is inside other element format
                    if (dynamicDataList[index].parent){
                        let parent = dynamicDataList[index].parent;
                        checkAncestor(parent);
                        const elementWithAttr = item.element[0];
                        elementWithAttr.setAttribute('dynamic-data-content', title);
                        const tagsMerged = mergeTags(Array.from(ancestorTags), elementWithAttr.outerHTML);
                        var htmlElement = parseElement(tagsMerged);
                        if (dynamicText[index] !== undefined) {
                            checkDescendants(htmlElement);
                            const tagsMerged = mergeTags(Array.from(descendantTags), dynamicText[index]);
                            htmlElement.innerHTML = tagsMerged;
                        }
                        contentArray[item.key] = htmlElement.outerHTML;
                    } else { //if dynamic data element is the wrapper of other element format
                        item.element[0].setAttribute('dynamic-data-content', title);
                        if (dynamicText[index] !== undefined) {
                            checkDescendants(item.element[0]);
                            const tagsMerged = mergeTags(Array.from(descendantTags), dynamicText[index]);
                            item.element[0].innerHTML = tagsMerged;
                        }
                        contentArray[item.key] = item.element[0].outerHTML;
                    }
                }
            });
            setAttributes({ [contentAttribute] : contentArray.join('') });
        }

    },[dynamicDataList, dynamicText]);
};