export const TAG_NAMES = {
    LINK: 'link',
    SCRIPT: 'script',
    STYLE: 'style',
    HEAD: 'head',
    BODY: 'body',
};

export const VALID_TAG_NAMES = Object.values(TAG_NAMES);

export const TAG_PROPERTIES = {
    CHARSET: 'charset',
    CSS_TEXT: 'cssText',
    HREF: 'href',
    HTTPEQUIV: 'http-equiv',
    INNER_HTML: 'innerHTML',
    ITEM_PROP: 'itemprop',
    NAME: 'name',
    PROPERTY: 'property',
    REL: 'rel',
    SRC: 'src',
};

export const REACT_TAG_MAP = {
    accesskey: 'accessKey',
    charset: 'charSet',
    class: 'className',
    contenteditable: 'contentEditable',
    contextmenu: 'contextMenu',
    'http-equiv': 'httpEquiv',
    itemprop: 'itemProp',
    tabindex: 'tabIndex'
};

export const HELMET_PROPS = {
    DEFER: 'defer',
    ENCODE_SPECIAL_CHARACTERS: 'encodeSpecialCharacters',
    ON_CHANGE_CLIENT_STATE: 'onChangeClientState',
};

export const HTML_TAG_MAP = Object.keys(REACT_TAG_MAP).reduce((obj, key) => {
    obj[REACT_TAG_MAP[key]] = key;
    return obj;
}, {});

export const SELF_CLOSING_TAGS = [
    TAG_NAMES.SCRIPT,
    TAG_NAMES.STYLE
];

export const HELMET_ATTRIBUTE = 'data-react-helmet';
