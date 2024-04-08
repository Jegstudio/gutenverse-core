import { useEffect, useState } from '@wordpress/element';
import u from 'umbrellajs';
import { applyFilters } from '@wordpress/hooks';
import isEmpty from 'lodash/isEmpty';

export const dynamicData = (props) => {
    const {
        attributes,
        setAttributes,
        contentAttribute,
        tagName,
        setPanelState,
        panelDynamic,
        dynamicList,
    } = props;

    const dynamicDataList = attributes[dynamicList];
    const content = attributes[contentAttribute];
    const [dynamicText, setDynamicText] = useState([]);
    const [dynamicUrl, setDynamicUrl] = useState([]);

    function findNewData(arr1, arr2) {
        const newData = [];

        arr1.map(item => {
            if (!arr2.some(elem => elem.id === item.id)) {
                newData.push(item);
            }
        });

        return newData;
    }

    // set up the dynamic data
    useEffect(()=>{
        const fakeContent = document.createElement(tagName);
        fakeContent.innerHTML = content;

        const dynamicLists = getDynamicDataList(fakeContent);
        const currentList = dynamicDataList;

        // find the lastest dynamic added and open it in the panel
        if (dynamicLists.length > currentList.length && currentList.length > 0) {
            const newData = findNewData(dynamicLists, currentList);
            if (!isEmpty(newData)) {
                setAttributes({openDynamic: newData[0].id});
            }
            setPanelState(panelDynamic);
        }

        //set the attributes if new data added
        if (dynamicLists.length > 0) {
            const newList = dynamicLists.map(element => {
                const indexExist = currentList.findIndex(item => element.id === item.id);
                if (indexExist !== -1) {
                    const {
                        _key,
                        dynamicContent,
                        dynamicUrl,
                        parent,
                        setAsLink
                    } = currentList[indexExist] ?? {};

                    element._key = _key;
                    element.dynamicContent = dynamicContent;
                    element.dynamicUrl = dynamicUrl;
                    element.parent = parent;
                    element.setAsLink = setAsLink;
                }
                return element;
            });

            setAttributes({[dynamicList]: newList});
        } else setAttributes({[dynamicList]: []});
    },[content]);

    // function to get dynamic data
    const getDynamicDataList = (fakeContent) => {
        let newElement = {};
        newElement = u(fakeContent).children().map(child => {
            const isDynamic = u(child).nodes[0].classList.contains('guten-dynamic-data');

            if( isDynamic ){
                return {
                    dynamicContent: {},
                    dynamicUrl: {},
                    _key: {},
                    setAsLink: false,
                    value: child.outerHTML,
                    id: u(child).attr('id')
                };
            } else {
                const findDynamics = u(child).find('.guten-dynamic-data');
                if (findDynamics.nodes.length > 0) {
                    return {
                        dynamicContent: {},
                        dynamicUrl: {},
                        _key: {},
                        setAsLink: false,
                        parent: child.outerHTML,
                        value: findDynamics.nodes[0].outerHTML,
                        id: u(findDynamics.nodes).attr('id')
                    };
                }
            }
        });
        if( newElement.nodes.length === 0 ){
            const arrElement = [];
            fakeContent.innerHTML = content;
            const dynamics = u(fakeContent).find('.guten-dynamic-data');
            dynamics.nodes.map(el => {
                arrElement.push({
                    dynamicContent: {},
                    dynamicUrl: {},
                    _key: {},
                    setAsLink: false,
                    value: el.outerHTML,
                    id: u(el).attr('id')
                });
            });
            newElement.nodes = arrElement;
        }
        return newElement.nodes;
    };

    // get all the descendant tag inside the dynamic data element <span class='guten-dynamic-data'>
    // and put all the tag inside a set
    function getDescendantTags(element) {
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

        checkDescendants(element);
        return descendantTags;
    }

    // get all the ancestor tag of the dynamic data element <span class='guten-dynamic-data'>
    // and putting it inside a set
    function getAncestorTags(element) {
        const ancestorTags = new Set();
        function checkAncestor(element) {
            if (!element) return;
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

        checkAncestor(element);
        return ancestorTags;
    }

    // function to merge set of tags
    // parameter 'text' will always be the last descendant
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

    // function to parse string into a HTML element
    function parseElement(elementString){
        var parser = new DOMParser();
        var htmlElement = parser.parseFromString(elementString, 'text/html').body.firstChild;

        return htmlElement;
    }

    // remove <a.dynamic-link> from the element
    function removeDynamicLink(element) {
        const clonedElement = element.cloneNode(true);
        const getAllTAgs = getAncestorTags(clonedElement);
        let selectedTag;
        let innerHtml;
        getAllTAgs.forEach((tag) => {
            const parsed = parseElement(tag);
            if (u(parsed).hasClass('dynamic-link')) {
                selectedTag = tag;
                innerHtml = element.innerText;
            }
        });
        if (!selectedTag) return element;
        getAllTAgs.delete(selectedTag);
        selectedTag = mergeTags(Array.from(getAllTAgs), innerHtml);
        selectedTag = parseElement(selectedTag);
        return selectedTag;
    }

    // this is where all the fun is!
    // change the text and href dynamically and set up the content
    useEffect(() => {
        // take the content and put them in an array separated by childNodes
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

        const selectedLink = [];
        let selectedItems = [];

        // select the nodes associated with dynamic data
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

            const selectLink = doc.querySelectorAll('a.dynamic-link');
            const pushLink = {
                key : index,
                element: selectLink
            };

            if (selectLink.length > 0) {
                selectedLink.push(pushLink);
            }
        }

        //to remove tag <a> if dynamic content does not exist
        if( selectedLink.length > 0 ) {
            selectedLink.map((link) => {
                const dynamicExist =  link.element[0].querySelector('span.guten-dynamic-data');
                // remove the <a> tag when it doeasn't have the dynamic <span>, also remove it from the selected items
                if (dynamicExist === null) {
                    selectedItems = selectedItems.filter(item => item.key !== link.key);
                    const elementWithNoLink = removeDynamicLink(parseElement(contentArray[link.key]));
                    contentArray[link.key] = elementWithNoLink.outerHTML;
                } else {
                    const getDynamicData = dynamicDataList.find(item => item.id === u(dynamicExist).nodes[0].id);
                    const index = dynamicDataList.findIndex(item => item.id === u(dynamicExist).nodes[0].id);
                    // if it has the dynamic <span> but the set as link is disabled, also removes the <a> tag and remove the dynamicUrl from the data
                    if (!getDynamicData.setAsLink) {
                        const element = parseElement(link.element[0].innerHTML);
                        element.removeAttribute('dynamic-data-url');
                        contentArray[link.key] = element.outerHTML;
                        getDynamicData.dynamicUrl = {};
                        dynamicDataList[index] = getDynamicData;
                    }
                }
            });
        }

        if ( selectedItems.length > 0 && dynamicDataList.length === selectedItems.length) {
            // for some reason, data list doesnt save data as HTML element so the element is saved as string and nedded to be parsed again into HTML element. its confusing
            const newestList = dynamicDataList.map((list)=> {
                if (typeof list.value !== 'string') return {...list};
                const newValue = parseElement(list.value);
                let newParent;
                if (list.parent){
                    newParent = parseElement(list.parent);
                }
                return {
                    ...list,
                    value: newValue,
                    parent: newParent
                };
            });

            // the loop that is the core function of the features
            selectedItems.map((item, index)=>{
                const id = item.element[0].id;
                const linkExist = document.querySelector(`.link-${id}`);

                // filter for dynamically set the content and link both in editor ang frontend
                const href = applyFilters(
                    'gutenverse.dynamic.generate-url',
                    '#',
                    'dynamicUrl',
                    dynamicDataList[index],
                    id,
                );
                const dynamicUrlcontent = applyFilters(
                    'gutenverse.dynamic.fetch-url',
                    dynamicDataList[index].dynamicUrl
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

                // get dynamic content text
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

                // when url is set
                if (href !== '#') {
                    let anchorElement = document.createElement('a');
                    anchorElement.setAttribute('class', `link-${id} dynamic-link`);
                    //get dynamic content url
                    dynamicUrlcontent
                        .then(result => {
                            if ((!Array.isArray(result) || result.length > 0 ) && result !== undefined && result !== dynamicUrl[index]) {
                                setDynamicUrl(prevState => {
                                    const newState = [...prevState];
                                    newState[index] = result;
                                    return newState;
                                });
                            }
                        }).catch(error => {
                            console.log(error);
                        });
                    if (dynamicUrl[index] || dynamicUrl[index] !== undefined) {
                        anchorElement.setAttribute('href', dynamicUrl[index]);
                        item.element[0].setAttribute('dynamic-data-url', href);
                    }
                    if (title !== content) {
                        //if dynamic data element is inside other element format
                        if (newestList[index].parent){

                            let parent = newestList[index].parent;
                            if (dynamicText[index] !== undefined) item.element[0].setAttribute('dynamic-data-content', title);
                            anchorElement.innerHTML = item.element[0].outerHTML;
                            const ancestorTags = getAncestorTags(parent);

                            const tagsMerged = mergeTags(Array.from(ancestorTags), anchorElement.outerHTML);
                            const htmlElement = parseElement(tagsMerged);
                            if (dynamicText[index] !== undefined) {
                                const newDescendantTags = getDescendantTags(htmlElement);
                                const newTagsMerged = mergeTags(Array.from(newDescendantTags), dynamicText[index]);
                                htmlElement.innerHTML = newTagsMerged;
                            }
                            anchorElement = htmlElement;
                        } else { //if dynamic data element is the wrapper of other element format
                            if (dynamicText[index] !== undefined) {
                                item.element[0].setAttribute('dynamic-data-content', title);
                                const descendantTags = getDescendantTags(item.element[0]);
                                const tagsMerged = mergeTags(Array.from(descendantTags), dynamicText[index]);
                                item.element[0].innerHTML = tagsMerged;
                            }
                            anchorElement.innerHTML = item.element[0].outerHTML;
                        }
                    } else {
                        if ( linkExist ) {
                            const htmlElement = parseElement(contentArray[item.key]);
                            if (dynamicUrl[index] || dynamicUrl[index] !== undefined) htmlElement.setAttribute('dynamic-data-url', href);
                            anchorElement.innerHTML = htmlElement.innerHTML;
                        } else {
                            if (newestList[index].parent) {
                                let parent = newestList[index].parent;
                                const ancestorTags = getAncestorTags(parent);
                                const tagsMerged = mergeTags(Array.from(ancestorTags), item.element[0].outerHTML);
                                const htmlElement = parseElement(tagsMerged);
                                anchorElement.innerHTML = htmlElement.outerHTML;
                            } else anchorElement.innerHTML = item.element[0].outerHTML;
                        }
                    }
                    contentArray[item.key] = anchorElement.outerHTML;
                // when content is set
                }else if (title !== content){

                    //if dynamic data element is inside other element format
                    if (newestList[index].parent){
                        let parent = newestList[index].parent;
                        const ancestorTags = getAncestorTags(parent);
                        const elementWithAttr = item.element[0];
                        elementWithAttr.setAttribute('dynamic-data-content', title);
                        const tagsMerged = mergeTags(Array.from(ancestorTags), elementWithAttr.outerHTML);
                        const htmlElement = parseElement(tagsMerged);
                        if (dynamicText[index] !== undefined) {
                            const descendantTags = getDescendantTags(htmlElement);
                            const tagsMerged = mergeTags(Array.from(descendantTags), dynamicText[index]);
                            htmlElement.innerHTML = tagsMerged;
                        }
                        contentArray[item.key] = htmlElement.outerHTML;
                    } else { //if dynamic data element is the wrapper of other element format
                        item.element[0].setAttribute('dynamic-data-content', title);
                        if (dynamicText[index] !== undefined) {
                            const descendantTags = getDescendantTags(item.element[0]);
                            const tagsMerged = mergeTags(Array.from(descendantTags), dynamicText[index]);
                            item.element[0].innerHTML = tagsMerged;
                        }
                        contentArray[item.key] = item.element[0].outerHTML;
                    }
                }
            });
        }
        setAttributes({ [contentAttribute] : contentArray.join('') });

    },[content, dynamicDataList, dynamicText, dynamicUrl]);
};