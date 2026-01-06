import { useEffect, useState } from '@wordpress/element';
import u from 'umbrellajs';
import { applyFilters } from '@wordpress/hooks';
import { isEmpty, isEqual } from 'gutenverse-core/helper';
import { isOnEditor } from 'gutenverse-core/helper';

const contentCache = {};
const urlCache = {};
const contentPromises = {};
const urlPromises = {};

export const dynamicData = (props) => {
    const {
        attributes,
        setAttributes,
        contentAttribute,
        tagName,
        setPanelState,
        panelDynamic,
        dynamicList,
        parentHasLink,
    } = props;

    const dynamicDataList = attributes[dynamicList];
    const content = attributes[contentAttribute];
    const textContent = attributes.dynamicTextContent;
    const urlContent = attributes.dynamicUrlContent;
    const [dynamicText, setDynamicText] = useState(textContent? textContent: []);
    const [dynamicUrl, setDynamicUrl] = useState(urlContent? urlContent : []);

    function findNewData(arr1, arr2) {
        const newData = [];

        arr1.map(item => {
            if (!arr2.some(elem => elem.id === item.id)) {
                newData.push(item);
            }
        });

        return newData;
    }

    function compareList(arr1, arr2) {
        if (arr1.length !== arr2.length) return false;

        const map1 = new Map(arr1.map(obj => [obj.id, obj]));
        const map2 = new Map(arr2.map(obj => [obj.id, obj]));

        if (map1.size !== map2.size) return false;

        for (let id of map1.keys()) {
            if (!map2.has(id)) return false;
        }
        return true;
    }

    // set up the dynamic data
    useEffect(() => {
        const fakeContent = document.createElement(tagName);
        fakeContent.innerHTML = content;
        const dynamicLists = getDynamicDataList(fakeContent);
        const currentList = dynamicDataList;
        const newData = findNewData(dynamicLists, currentList);

        // Check if new data has been added and open the latest dynamic list in the panel
        if (dynamicLists.length > currentList.length && !isEmpty(newData)) {
            setAttributes({ openDynamic: newData[0].id });
            setPanelState(panelDynamic);
        }

        // Update attributes if dynamic lists are not empty and new data has been added
        if (dynamicLists.length > 0) {
            const updatedList = dynamicLists.map(element => {
                const existingItem = currentList.find(item => element.id === item.id);
                if (existingItem) {
                    // Destructure existingItem properties and assign them to element
                    Object.assign(element, {
                        _key: existingItem._key,
                        dynamicContent: existingItem.dynamicContent,
                        dynamicUrl: existingItem.dynamicUrl,
                        originalText: existingItem.originalText,
                        parent: existingItem.parent,
                        setAsLink: existingItem.setAsLink
                    });
                }
                return element;
            });
            if (!compareList(updatedList, currentList)) {
                setAttributes({ [dynamicList]: updatedList });
            }
        } else if (!compareList(dynamicLists, currentList)) {
            setAttributes({ [dynamicList]: [] });
        }
    }, [content, dynamicDataList]);

    // function to get dynamic data
    function getDynamicDataList(fakeContent) {
        let newElement = {};
        newElement = u(fakeContent).children().map(child => {
            const isDynamic = u(child).nodes[0].classList.contains('guten-dynamic-data');

            if( isDynamic ){
                return {
                    dynamicContent: {},
                    dynamicUrl: {},
                    _key: {},
                    originalText: child.innerText,
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
                        originalText: findDynamics.nodes[0].innerText,
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
                    originalText: el.innerText,
                    setAsLink: false,
                    value: el.outerHTML,
                    id: u(el).attr('id')
                });
            });
            newElement.nodes = arrElement;
        }
        return newElement.nodes;
    }

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
    let timeoutId;
    useEffect(() => {

        if ( !dynamicDataList.length > 0 ) return;
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
                const getMatch = dynamicDataList.find(item => item.id === link.element[0].childNodes[0].id);
                const dynamicExist =  link.element[0].querySelector('span.guten-dynamic-data');
                // remove the <a> tag when it doesn't have the dynamic <span>, also remove it from the selected items
                if (dynamicExist === null) {
                    selectedItems = selectedItems.filter(item => item.key !== link.key);
                    const elementWithNoLink = removeDynamicLink(parseElement(contentArray[link.key]));
                    contentArray[link.key] = elementWithNoLink.outerHTML;
                } else {
                    const getDynamicData = dynamicDataList.find(item => item.id === u(dynamicExist).nodes[0].id);
                    const index = dynamicDataList.findIndex(item => item.id === u(dynamicExist).nodes[0].id);
                    // if it has the dynamic <span> but the set as link is disabled or the parent already have link, also removes the <a> tag and remove the dynamicUrl from the data
                    if (!getDynamicData.setAsLink || parentHasLink || isEmpty(getMatch.dynamicUrl)) {
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
                const href = isEmpty(dynamicDataList[index]) || !isOnEditor() ? dynamicDataList[index] : applyFilters(
                    'gutenverse.dynamic.generate-url',
                    '#',
                    'dynamicUrl',
                    dynamicDataList[index],
                    id,
                );

                let title = content;

                const dynamicContent = dynamicDataList[index].dynamicContent;
                if (dynamicContent.postdata || dynamicContent.sitedata || dynamicContent.authordata || dynamicContent.termdata){
                    title = isEmpty(dynamicDataList[index]) || !isOnEditor() ? dynamicDataList[index] : applyFilters(
                        'gutenverse.dynamic.generate-content',
                        content,
                        'dynamicContent',
                        dynamicDataList[index],
                        id,
                    );
                }
                // get dynamic content text
                if (title !== content) {
                    const contentParams = dynamicDataList[index].dynamicContent;

                    if (!isEmpty(contentParams) && isOnEditor()) {
                        const key = JSON.stringify(contentParams);

                        const updateTextState = (result) => {
                            if ((!Array.isArray(result) || result.length > 0) && result !== undefined && result !== dynamicText[index]) {
                                setDynamicText(prevState => {
                                    const newState = [...prevState];
                                    newState[index] = result;
                                    if (!isEqual(textContent, newState) || !isEmpty(dynamicText) || dynamicText.length > 0) {
                                        setAttributes({ dynamicTextContent: newState });
                                    }
                                    return newState;
                                });
                            }
                        };

                        if (contentCache[key] !== undefined) {
                            updateTextState(contentCache[key]);
                        } else if (contentPromises[key]) {
                            contentPromises[key].then(result => {
                                if (result !== undefined) updateTextState(result);
                            });
                        } else {
                            const dynamicTextContent = applyFilters(
                                'gutenverse.dynamic.fetch-text',
                                contentParams
                            );

                            if (typeof dynamicTextContent.then === 'function') {
                                contentPromises[key] = dynamicTextContent;
                                dynamicTextContent
                                    .then(result => {
                                        if ((!Array.isArray(result) || result.length > 0) && result !== undefined) {
                                            contentCache[key] = result;
                                            updateTextState(result);
                                        }
                                    })
                                    .catch(error => {
                                        console.error(error);
                                    })
                                    .finally(() => {
                                        delete contentPromises[key];
                                    });
                            }
                        }
                    }
                }

                // when url is set
                if (href !== '#') {
                    let anchorElement = document.createElement('a');
                    anchorElement.setAttribute('class', `link-${id} dynamic-link`);
                    const urlParams = dynamicDataList[index].dynamicUrl;

                    if (!isEmpty(urlParams) && isOnEditor()) {
                        const key = JSON.stringify(urlParams);

                        const updateUrlState = (result) => {
                            if ((!Array.isArray(result) || result.length > 0) && result !== undefined && result !== dynamicUrl[index]) {
                                setDynamicUrl(prevState => {
                                    const newState = [...prevState];
                                    newState[index] = result;
                                    if (!isEqual(urlContent, newState) || !isEmpty(dynamicUrl) || dynamicUrl.length > 0) {
                                        setAttributes({ dynamicUrlContent: newState });
                                    }
                                    return newState;
                                });
                            }
                        };

                        if (urlCache[key] !== undefined) {
                            updateUrlState(urlCache[key]);
                        } else if (urlPromises[key]) {
                            urlPromises[key].then(result => {
                                if (result !== undefined) updateUrlState(result);
                            });
                        } else {
                            const dynamicUrlPromise = applyFilters(
                                'gutenverse.dynamic.fetch-url',
                                urlParams
                            );

                            if (typeof dynamicUrlPromise.then === 'function') {
                                urlPromises[key] = dynamicUrlPromise;
                                dynamicUrlPromise
                                    .then(result => {
                                        if ((!Array.isArray(result) || result.length > 0) && result !== undefined) {
                                            urlCache[key] = result;
                                            updateUrlState(result);
                                        }
                                    })
                                    .catch(error => {
                                        console.log(error);
                                    })
                                    .finally(() => {
                                        delete urlPromises[key];
                                    });
                            }
                        }
                    }
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
                    // if dynamic data element is inside other element format
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
            //use set time out to update attribute so that the dynamic content does not cause infinite loop
            //when used more than once in the same template part
            const throttledUpdateAttributes = function() {
                if (!timeoutId) {
                    timeoutId = setTimeout(() => {
                        timeoutId = null;
                        if (content.localeCompare(contentArray.join('')) !== 0) {
                            setAttributes({ [contentAttribute]: contentArray.join('') });
                        }
                    }, 200);
                }
            };
            throttledUpdateAttributes();
        }

        return () => {
            clearTimeout(timeoutId);
        };
    },[content, dynamicDataList, textContent, urlContent]);
};