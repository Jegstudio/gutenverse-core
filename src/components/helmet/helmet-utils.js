
import objectAssign from 'object-assign';
import { createElement } from '@wordpress/element';
import {
    HELMET_ATTRIBUTE,
    HELMET_PROPS,
    HTML_TAG_MAP,
    REACT_TAG_MAP,
    SELF_CLOSING_TAGS,
    TAG_NAMES,
    TAG_PROPERTIES
} from './helmet-constants';

const encodeSpecialCharacters = (str, encode = true) => {
    if (encode === false) {
        return String(str);
    }

    return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#x27;');
};

const getOnChangeClientState = propsList => {
    return (
        getInnermostProperty(propsList, HELMET_PROPS.ON_CHANGE_CLIENT_STATE) ||
        (() => { })
    );
};

const getTagsFromPropsList = (tagName, primaryAttributes, propsList) => {
    // Calculate list of tags, giving priority innermost component (end of the propslist)
    const approvedSeenTags = {};

    return propsList
        .filter(props => {
            if (Array.isArray(props[tagName])) {
                return true;
            }
            if (typeof props[tagName] !== 'undefined') {
                warn(
                    `Helmet: ${tagName} should be of type "Array". Instead found type "${typeof props[
                        tagName
                    ]}"`
                );
            }
            return false;
        })
        .map(props => props[tagName])
        .reverse()
        .reduce((approvedTags, instanceTags) => {
            const instanceSeenTags = {};

            instanceTags
                .filter(tag => {
                    let primaryAttributeKey;
                    const keys = Object.keys(tag);
                    for (let i = 0; i < keys.length; i++) {
                        const attributeKey = keys[i];
                        const lowerCaseAttributeKey = attributeKey.toLowerCase();

                        // Special rule with link tags, since rel and href are both primary tags, rel takes priority
                        if (
                            primaryAttributes.indexOf(lowerCaseAttributeKey) !==
                            -1 &&
                            !(
                                primaryAttributeKey === TAG_PROPERTIES.REL &&
                                tag[primaryAttributeKey].toLowerCase() ===
                                'canonical'
                            ) &&
                            !(
                                lowerCaseAttributeKey === TAG_PROPERTIES.REL &&
                                tag[lowerCaseAttributeKey].toLowerCase() ===
                                'stylesheet'
                            )
                        ) {
                            primaryAttributeKey = lowerCaseAttributeKey;
                        }
                        // Special case for innerHTML which doesn't work lowercased
                        if (
                            primaryAttributes.indexOf(attributeKey) !== -1 &&
                            (attributeKey === TAG_PROPERTIES.INNER_HTML ||
                                attributeKey === TAG_PROPERTIES.CSS_TEXT ||
                                attributeKey === TAG_PROPERTIES.ITEM_PROP)
                        ) {
                            primaryAttributeKey = attributeKey;
                        }
                    }

                    if (!primaryAttributeKey || !tag[primaryAttributeKey]) {
                        return false;
                    }

                    const value = tag[primaryAttributeKey].toLowerCase();

                    if (!approvedSeenTags[primaryAttributeKey]) {
                        approvedSeenTags[primaryAttributeKey] = {};
                    }

                    if (!instanceSeenTags[primaryAttributeKey]) {
                        instanceSeenTags[primaryAttributeKey] = {};
                    }

                    if (!approvedSeenTags[primaryAttributeKey][value]) {
                        instanceSeenTags[primaryAttributeKey][value] = true;
                        return true;
                    }

                    return false;
                })
                .reverse()
                .forEach(tag => approvedTags.push(tag));

            // Update seen tags with tags from this instance
            const keys = Object.keys(instanceSeenTags);
            for (let i = 0; i < keys.length; i++) {
                const attributeKey = keys[i];
                const tagUnion = objectAssign(
                    {},
                    approvedSeenTags[attributeKey],
                    instanceSeenTags[attributeKey]
                );

                approvedSeenTags[attributeKey] = tagUnion;
            }

            return approvedTags;
        }, [])
        .reverse();
};

const getInnermostProperty = (propsList, property) => {
    for (let i = propsList.length - 1; i >= 0; i--) {
        const props = propsList[i];

        if (props.hasOwnProperty(property)) {
            return props[property];
        }
    }

    return null;
};

const reducePropsToState = propsList => ({
    defer: getInnermostProperty(propsList, HELMET_PROPS.DEFER),
    encode: getInnermostProperty(
        propsList,
        HELMET_PROPS.ENCODE_SPECIAL_CHARACTERS
    ),
    linkTags: getTagsFromPropsList(
        TAG_NAMES.LINK,
        [TAG_PROPERTIES.REL, TAG_PROPERTIES.HREF],
        propsList
    ),
    onChangeClientState: getOnChangeClientState(propsList),
    scriptTags: getTagsFromPropsList(
        TAG_NAMES.SCRIPT,
        [TAG_PROPERTIES.SRC, TAG_PROPERTIES.INNER_HTML],
        propsList
    ),
    styleTags: getTagsFromPropsList(
        TAG_NAMES.STYLE,
        [TAG_PROPERTIES.CSS_TEXT],
        propsList
    ),
    head: getInnermostProperty(propsList, 'head')
});

const rafPolyfill = (() => {
    let clock = Date.now();

    return (callback) => {
        const currentTime = Date.now();

        if (currentTime - clock > 16) {
            clock = currentTime;
            callback(currentTime);
        } else {
            setTimeout(() => {
                rafPolyfill(callback);
            }, 0);
        }
    };
})();

const cafPolyfill = (id) => clearTimeout(id);

const requestAnimationFrame =
    typeof window !== 'undefined'
        ? (window.requestAnimationFrame &&
            window.requestAnimationFrame.bind(window)) ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        rafPolyfill
        : global.requestAnimationFrame || rafPolyfill;

const cancelAnimationFrame =
    typeof window !== 'undefined'
        ? window.cancelAnimationFrame ||
        window.webkitCancelAnimationFrame ||
        window.mozCancelAnimationFrame ||
        cafPolyfill
        : global.cancelAnimationFrame || cafPolyfill;

const warn = msg => {
    return console && typeof console.warn === 'function' && console.warn(msg);
};

let _helmetCallback = null;

const handleClientStateChange = newState => {
    if (_helmetCallback) {
        cancelAnimationFrame(_helmetCallback);
    }

    if (newState.defer) {
        _helmetCallback = requestAnimationFrame(() => {
            commitTagChanges(newState, () => {
                _helmetCallback = null;
            });
        });
    } else {
        commitTagChanges(newState);
        _helmetCallback = null;
    }
};

const commitTagChanges = (newState, cb) => {
    const {
        linkTags,
        onChangeClientState,
        scriptTags,
        styleTags,
        head,
    } = newState;

    const tagUpdates = {
        linkTags: updateTags(TAG_NAMES.LINK, linkTags, head),
        scriptTags: updateTags(TAG_NAMES.SCRIPT, scriptTags, head),
        styleTags: updateTags(TAG_NAMES.STYLE, styleTags, head)
    };

    const addedTags = {};
    const removedTags = {};

    Object.keys(tagUpdates).forEach(tagType => {
        const { newTags, oldTags } = tagUpdates[tagType];

        if (newTags.length) {
            addedTags[tagType] = newTags;
        }
        if (oldTags.length) {
            removedTags[tagType] = tagUpdates[tagType].oldTags;
        }
    });

    cb && cb();

    onChangeClientState(newState, addedTags, removedTags);
};

const updateTags = (type, tags, head) => {
    let headElement = head ? head : document.head || document.querySelector(TAG_NAMES.HEAD);
    const tagNodes = headElement.querySelectorAll(
        `${type}[${HELMET_ATTRIBUTE}]`
    );
    const oldTags = Array.prototype.slice.call(tagNodes);
    const newTags = [];
    let indexToDelete;

    if (tags && tags.length) {
        tags.forEach(tag => {
            const newElement = document.createElement(type);

            for (const attribute in tag) {
                if (tag.hasOwnProperty(attribute)) {
                    if (attribute === TAG_PROPERTIES.INNER_HTML) {
                        newElement.innerHTML = tag.innerHTML;
                    } else if (attribute === TAG_PROPERTIES.CSS_TEXT) {
                        if (newElement.styleSheet) {
                            newElement.styleSheet.cssText = tag.cssText;
                        } else {
                            newElement.appendChild(
                                document.createTextNode(tag.cssText)
                            );
                        }
                    } else {
                        const value =
                            typeof tag[attribute] === 'undefined'
                                ? ''
                                : tag[attribute];
                        newElement.setAttribute(attribute, value);
                    }
                }
            }

            newElement.setAttribute(HELMET_ATTRIBUTE, 'true');

            // Remove a duplicate tag from domTagstoRemove, so it isn't cleared.
            if (
                oldTags.some((existingTag, index) => {
                    indexToDelete = index;
                    return newElement.isEqualNode(existingTag);
                })
            ) {
                oldTags.splice(indexToDelete, 1);
            } else {
                newTags.push(newElement);
            }
        });
    }

    oldTags.forEach(tag => tag.parentNode.removeChild(tag));
    newTags.forEach(tag => headElement.appendChild(tag));

    return {
        oldTags,
        newTags
    };
};

const generateTagsAsString = (type, tags, encode) =>
    tags.reduce((str, tag) => {
        const attributeHtml = Object.keys(tag)
            .filter(
                attribute =>
                    !(
                        attribute === TAG_PROPERTIES.INNER_HTML ||
                        attribute === TAG_PROPERTIES.CSS_TEXT
                    )
            )
            .reduce((string, attribute) => {
                const attr =
                    typeof tag[attribute] === 'undefined'
                        ? attribute
                        : `${attribute}="${encodeSpecialCharacters(
                            tag[attribute],
                            encode
                        )}"`;
                return string ? `${string} ${attr}` : attr;
            }, '');

        const tagContent = tag.innerHTML || tag.cssText || '';

        const isSelfClosing = SELF_CLOSING_TAGS.indexOf(type) === -1;

        return `${str}<${type} ${HELMET_ATTRIBUTE}="true" ${attributeHtml}${isSelfClosing ? '/>' : `>${tagContent}</${type}>`
        }`;
    }, '');

const convertReactPropstoHtmlAttributes = (props, initAttributes = {}) => {
    return Object.keys(props).reduce((obj, key) => {
        obj[HTML_TAG_MAP[key] || key] = props[key];
        return obj;
    }, initAttributes);
};

const generateTagsAsReactComponent = (type, tags) =>
    tags.map((tag, i) => {
        const mappedTag = {
            key: i,
            [HELMET_ATTRIBUTE]: true
        };

        Object.keys(tag).forEach(attribute => {
            const mappedAttribute = REACT_TAG_MAP[attribute] || attribute;

            if (
                mappedAttribute === TAG_PROPERTIES.INNER_HTML ||
                mappedAttribute === TAG_PROPERTIES.CSS_TEXT
            ) {
                const content = tag.innerHTML || tag.cssText;
                mappedTag.dangerouslySetInnerHTML = { __html: content };
            } else {
                mappedTag[mappedAttribute] = tag[attribute];
            }
        });

        return createElement(type, mappedTag);
    });

const getMethodsForTag = (type, tags, encode) => {
    return {
        toComponent: () => generateTagsAsReactComponent(type, tags),
        toString: () => generateTagsAsString(type, tags, encode)
    };
};

const mapStateOnServer = ({
    encode,
    linkTags,
    scriptTags,
    styleTags,
}) => ({
    link: getMethodsForTag(TAG_NAMES.LINK, linkTags, encode),
    script: getMethodsForTag(TAG_NAMES.SCRIPT, scriptTags, encode),
    style: getMethodsForTag(TAG_NAMES.STYLE, styleTags, encode),
});

export { convertReactPropstoHtmlAttributes };
export { handleClientStateChange };
export { mapStateOnServer };
export { reducePropsToState };
export { requestAnimationFrame };
export { cancelAnimationFrame };
export { warn };