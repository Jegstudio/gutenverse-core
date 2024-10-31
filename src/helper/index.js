import { AES, enc, mode, pad } from 'crypto-js';
import isEmpty from 'lodash/isEmpty';
import isArray from 'lodash/isArray';
import { select } from '@wordpress/data';
import { useSetting, useSettings } from '@wordpress/block-editor';

export const check = val => isArray(val) && !isEmpty(val);

export const getFixData = (value, index) => value[index()];

export const getIndex = (value, mod, index) => value[index % mod];

export const checkEmpty = (value) => {
    let empty = true;

    if (typeof value === 'object') {
        for (let key in value) {
            empty &&= checkEmpty(value[key]);
        }

        return empty;
    } else if (typeof value === 'number') {
        return false;
    }

    return !value;
};

export const isEmptyDimension = (param) => {
    let flag = true;

    if (param.dimension) {
        Object.keys(param.dimension).map(id => {
            const position = param.dimension[id] === '';
            flag = flag && position;
        });
    }

    return flag;
};

export const styleAppender = (css, selector, attribute) => {
    return {
        ...css,
        [selector]: [
            ...(css[selector] || []),
            attribute
        ]
    };
};

export const buildStyle = (css) => {
    return Object.keys(css).map(selector => {
        return selector + '{ ' + css[selector].join(';') + ' }';
    }).join(' ');
};

export const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
};

/* Check empty string */
export const isEmptyString = (str) => {
    return !str || str === '';
};

export const encodeDataToURL = (data) => {
    return Object
        .keys(data)
        .map(value => `${value}=${encodeURIComponent(data[value])}`)
        .join('&');
};

export const ucfirst = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
};

export const getSocialType = socialIcon => {
    const socials = [
        'facebook',
        'instagram',
        'twitter',
        'pinterest',
        'android',
        'apple',
        'behance',
        'bitbucket',
        'codepen',
        'delicious',
        'deviantart',
        'digg',
        'dribbble',
        'elementor',
        'envelope',
        'flickr',
        'foursquare',
        'freecodecamp',
        'github',
        'gitlab',
        'globe',
        'google',
        'houzz',
        'jsfiddle',
        'link',
        'linkedin',
        'medium',
        'meetup',
        'mixcloud',
        'odnoklassniki',
        'product-hunt',
        'reddit',
        'rss',
        'shopping-cart',
        'skype',
        'slideshare',
        'snapchat',
        'soundcloud',
        'spotify',
        'stack-overflow',
        'steam',
        'stumbleupon',
        'telegram',
        'thumb-tack',
        'tripadvisor',
        'tumblr',
        'twitch',
        'viber',
        'vimeo',
        'vk',
        'weibo',
        'weixin',
        'whatsapp',
        'wordpress',
        'xing',
        'yelp',
        'youtube',
        '500',
    ];

    for (let i = 0; i < socials.length; i++) {
        if (socialIcon.includes(socials[i])) {
            return socials[i];
        }
    }

    return 'default';
};

export const gutenverseRoot = document.getElementById('gutenverse-root');


export const isYoutubeUrl = (url) => {
    if (url !== undefined) {
        const p = /^(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
        if (url.match(p)) {
            return url.match(p)[1];
        }
    }
    return false;
};

export const filteredAttributes = (attributes, images) => {
    const data = {};

    Object.keys(attributes).map(key => {
        const value = attributes[key];
        if (typeof value === 'string' && value.match(/{{{image\|\d+\|src}}}$/i)) {
            const match = value.match(/\d+/i);
            const id = match[0];
            data[key] = images[id]['url'];
        } else if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
            if (value.image !== undefined && value.id !== undefined) {
                if (typeof value.image === 'string' && value.image.match(/{{{image\|\d+\|src}}}$/i)) {
                    const match = value.image.match(/\d+/i);
                    const id = match[0];
                    data[key] = {
                        id: images[id]['id'],
                        image: images[id]['url'],
                    };
                }
            } else {
                data[key] = filteredAttributes(value, images);
            }
        } else {
            data[key] = value;
        }
    });

    return data;
};

export const injectImagesToContent = (data, images) => {
    const regex = /{{{image:(\d+):(\w+)}}}/gmi;
    let regmatch;

    do {
        const regexp = new RegExp(regex, 'g');
        regmatch = regexp.exec(data);
        if (regmatch) {
            const id = regmatch[1];
            const key = regmatch[2];
            const index = regmatch['index'];
            const end = index + regmatch[0].length;
            const replaceWith = images[id][key];
            data = replaceString(data, index, end, replaceWith);
        }
    } while (regmatch);

    return data;
};

export const replaceString = (string, begin, end, replace) => {
    return string.substring(0, begin) + replace + string.substring(end);
};

export const getDevice = () => {
    const deviceWidth = window.screen.width;
    const { tabletBreakpoint, mobileBreakpoint } = responsiveBreakpoint();

    if (deviceWidth > tabletBreakpoint) {
        return 'Desktop';
    } else if (deviceWidth <= tabletBreakpoint && deviceWidth > mobileBreakpoint) {
        return 'Tablet';
    }

    return 'Mobile';
};

export const setDeviceType = (device, editorDispatch = null) => {
    // editor dispatch still need to be passed as parameter,
    // cannot call dispatch hook here because this is not a component.
    if (editorDispatch) {
        const {
            __experimentalSetPreviewDeviceType: setPreviewDeviceType,
        } = editorDispatch;

        setPreviewDeviceType(device);
    }

    /* if (store) {
        changeDevice(device);
    } */
};

export const variableColorName = (id) => {
    return `--wp--preset--color--${id}`;
};

export const variableFontName = (id, child) => {
    return `--gutenverse-font-${child}-${id}`;
};

export const getLastSequence = (items) => {
    let largest = 1;

    items.map(item => {
        const arr = /#(\d+)/.exec(item.name);
        if (Array.isArray(arr)) {
            const value = parseInt(arr[1]) + 1;
            if (largest < value) {
                largest = value;
            }
        }
    });

    return largest;
};

export const getGoogleFontParams = (googleFont) => {
    const family = {};
    const arrString = [];

    Object.keys(googleFont).map(key => {
        if (googleFont[key] !== undefined) {
            family[googleFont[key]['value']] = family[googleFont[key]['value']] ? [
                ...family[googleFont[key]['value']],
                googleFont[key]['weight']
            ] : [googleFont[key]['weight']];
        }
    });

    Object.keys(family).map(name => {
        let weights = ['400', '400italic', '700', '700italic', ...family[name]];

        weights = weights.filter((weight, index) => weights.indexOf(weight) === index);
        arrString.push(`${name}:${weights.join(',')}`);
    });

    return arrString.join('|');
};

export const getGoogleFontDatas = (googleFonts) => Object.keys(googleFonts).map(key => {
    if (googleFonts[key] !== undefined) {
        return {
            ...googleFonts[key],
            id: key,
            weights: [googleFonts[key]['weight']]
        };
    }
});


export const buildFrontendStyles = styles => {
    const frontend = {};

    Object.keys(styles).map(id => {
        if (typeof styles[id] === 'string') {
            frontend['string'] = frontend['string'] ? frontend['string'] + styles[id] : styles[id];
            return;
        }

        const selector = styles[id]['selector'];
        const devices = styles[id]['devices'];

        !frontend[selector] ? frontend[selector] = {} : null;

        Object.keys(devices).map(type => {
            frontend[selector][type] ? frontend[selector][type] += devices[type] : frontend[selector][type] = devices[type];
        });
    });

    const final = Object.keys(frontend).map(id => {
        let allEmpty = true;

        if (id === 'string') {
            return frontend['string'];
        }

        const merge = Object.keys(frontend[id]).map(key => {
            const thisEmpty = isEmptyString(frontend[id][key]);

            allEmpty = thisEmpty && allEmpty;

            switch (key) {
                case 'Tablet':
                    return !thisEmpty ? `@media only screen and (max-width: 780px) { ${id} { ${frontend[id][key]} } }` : '';
                case 'Mobile':
                    return !thisEmpty ? `@media only screen and (max-width: 425px) { ${id} { ${frontend[id][key]} } }` : '';
                case 'Desktop':
                default:
                    return !thisEmpty ? `${id} { ${frontend[id][key]} }` : '';
            }
        });

        return !allEmpty ? merge.join(' ') : null;
    });

    return final ? final.join(' ') : null;
};

export const normalizeString = (string) => {
    const result = [];

    string.split(',').map(str => {
        let regexpNames = /[A-Z|-]*([0-9]+)[a-z|.]*/;
        const match = regexpNames.exec(str);
        result.push(String.fromCharCode(match[1]));
    });

    return result.join('');
};

/**
* Encrypt
*
* @param string plainText plain text.
* @return bool|string
*/
export const encodeString = (plainText, securityKey, iv) => {
    securityKey = enc.Utf8.parse(securityKey);
    iv = enc.Utf8.parse(iv);
    let encrypted = AES.encrypt(plainText, securityKey, {
        iv: iv,
        mode: mode.CBC,
        padding: pad.Pkcs7
    });
    return encrypted.toString();
};

/**
 * Decrypt
 * @param string cipherText cipherText
 * @return bool|string
 */
export const decodeString = (cipherText, securityKey, iv) => {
    securityKey = enc.Utf8.parse(securityKey);
    iv = enc.Utf8.parse(iv);
    let decrypted = AES.decrypt(cipherText, securityKey, {
        iv: iv,
        mode: mode.CBC,
        padding: pad.Pkcs7
    });
    return decrypted.toString(enc.Utf8);
};

/**
 * Get the key.
 *
 * @returns string
 */
export const theKey = () => {
    return {
        key: 'CU7HFM2RoA8cOG8DZC4fMA9260PjY+vgaWVHdyMqEAk=',
        func: 'getOwnProperties',
        iv: 'initialised',
        additional: 'eeRTbdxnd32+syfwAwaatg==',
    };
};

export const refine = (filter, namespace, callback) => window.dispatcher && window.dispatcher.refine(filter, namespace, callback);

export const execute = (action, namespace, callback) => window.dispatcher && window.dispatcher.execute(action, namespace, callback);

export const empty = (action) => window.dispatcher && window.dispatcher.empty(action);

export const roundFloat = (number, digit = 2) => {
    const multiplier = Math.pow(10, digit || 0);
    return Math.round(number * multiplier) / multiplier;
};

export const isSticky = (sticky) => {
    return Object.keys(sticky).reduce((prev, cur) => sticky[cur] || prev, false);
};

export const isAlignStickyColumn = (align) => {
    /**
     * Sticky option can be used if section vertical align set to top, center, or bottom
     */
    if (['flex-start', 'center', 'flex-end'].includes(align)) {
        return true;
    }

    return false;
};

export const isAnimationActive = (animation) => {
    return animation && Array.isArray(animation.actions) && animation.actions.length > 0;
};

export const swiperData = (attributes) => {
    const {
        spacing,
        itemShowed,
        loop,
        autoplay,
        autoplayTimeout,
        showNav,
        showArrow,
    } = attributes;

    const data = {
        ['data-loop']: loop,
        ['data-autoplay']: autoplay,
        ['data-timeout']: autoplayTimeout,
        ['data-nav']: showNav,
        ['data-arrow']: showArrow,
        ['data-breakpoints']: JSON.stringify({
            0: {
                spaceBetween: spacing['Mobile'] ? parseInt(spacing['Mobile']) : 10,
                slidesPerView: itemShowed['Mobile'] ? parseInt(itemShowed['Mobile']) : 1,
            },
            768: {
                spaceBetween: spacing['Tablet'] ? parseInt(spacing['Tablet']) : 10,
                slidesPerView: itemShowed['Tablet'] ? parseInt(itemShowed['Tablet']) : 2,
            },
            1024: {
                spaceBetween: spacing['Desktop'] ? parseInt(spacing['Desktop']) : 10,
                slidesPerView: itemShowed['Desktop'] ? parseInt(itemShowed['Desktop']) : 3,
            }
        })
    };

    return data;
};

export const getActiveWindow = () => {
    if (document.querySelector('iframe[name="editor-canvas"]')) {
        if (undefined !== window[2] && 'editor-canvas' === window[2].name) {
            return window[2];
        }

        if (undefined !== window[1] && 'editor-canvas' === window[1].name) {
            return window[1];
        }

        if (undefined !== window[0] && 'editor-canvas' === window[0].name) {
            return window[0];
        }

        if (undefined !== window && 'editor-canvas' === window.name) {
            return window;
        }

    } else if (document.getElementsByClassName('block-editor-block-preview__content')[0]) {
        return document.getElementsByClassName('block-editor-block-preview__content')[0];
    } else if (document.getElementsByClassName('interface-interface-skeleton__content')[0]) {
        return document.getElementsByClassName('interface-interface-skeleton__content')[0];
    }

    return window;
};

export const recursiveDuplicateCheck = (blocks, clientId, elementId) => {
    let count = 0;

    blocks.map(block => {
        if (!(elementId === undefined && block.attributes.elementId === undefined) &&
            elementId === block.attributes.elementId &&
            clientId !== block.clientId) {
            count += 1;
        }

        if (block.innerBlocks.length > 0) {
            count += recursiveDuplicateCheck(block.innerBlocks, clientId, elementId);
        }
    });

    return count;
};

export function rgbToHex({ r, g, b, a }) {
    const color = [
        r.toString(16),
        g.toString(16),
        b.toString(16),
        a < 1 ? Math.round(a * 255).toString(16).substring(0, 2) : ''
    ];

    // Pad single-digit output values
    color.forEach(function (part, i) {
        if (part.length === 1) {
            color[i] = '0' + part;
        }
    });

    return ('#' + color.join(''));
}

export const isFSE = () => {
    const { wp } = window;
    return wp.editSite !== undefined;
};

export const determineLocation = () => {
    const { wp } = window;

    if (wp.editSite) {
        return 'editor';
    }

    if (wp.editPost) {
        return 'post';
    }

    if (wp.editWidgets) {
        return 'widget';
    }

    return undefined;
};

export const getOffset = (el) => {
    let _x = 0;
    let _y = 0;
    while (el && !isNaN(el.offsetLeft) && !isNaN(el.offsetTop)) {
        _x += el.offsetLeft;
        _y += el.offsetTop;
        el = el.offsetParent;
    }
    return { top: _y, left: _x };
};

export const pointOfAngle = (a) => {
    return {
        x: Math.cos(a),
        y: Math.sin(a)
    };
};

export const degreesToRadians = (d) => {
    return ((d * Math.PI) / 180);
};

export const directionStartEndPoint = (direction) => {
    const eps = Math.pow(2, -52);
    const angle = (direction % 360);

    let startPoint = pointOfAngle(degreesToRadians(180 - angle));
    let endPoint = pointOfAngle(degreesToRadians(360 - angle));

    if (Math.abs(startPoint.x) <= eps)
        startPoint.x = 0;

    if (Math.abs(startPoint.y) <= eps)
        startPoint.y = 0;

    if (Math.abs(endPoint.x) <= eps)
        endPoint.x = 0;

    if (Math.abs(endPoint.y) <= eps)
        endPoint.y = 0;

    return { startPoint, endPoint };
};

export const gradientDefault = () => {
    return [
        {
            color: 'rgb(49, 207, 180)',
            id: 1,
            offset: '0.000',
            active: true,
        },
        {
            color: 'rgb(126, 32, 207)',
            id: 2,
            offset: '1.000',
            active: false,
        },
    ];
};

export const addLeadingZeros = (num, totalLength) => {
    return String(num).padStart(totalLength, '0');
};

export const responsiveBreakpoint = () => {
    const { settingsData } = window['GutenverseConfig'] || window['GutenverseData'] || {};
    const { editor_settings } = settingsData || {};
    const { tablet_breakpoint = 1024, mobile_breakpoint = 767 } = editor_settings || {};

    return {
        tabletBreakpoint: tablet_breakpoint,
        mobileBreakpoint: mobile_breakpoint
    };
};

export const isBlockActive = (name) => {
    const { settingsData } = window['GutenverseConfig'] || window['GutenverseSettings'] || {};
    const { active_blocks = {} } = settingsData;
    return name in active_blocks ? active_blocks[name] : true;
};


export const theDeviceType = (location) => {
    let deviceType = null;

    if (select('core/editor').getDeviceType !== undefined) {
        deviceType = select('core/editor').getDeviceType();
    } else {
        switch (location) {
            case 'editor':
                deviceType = select('core/edit-site').__experimentalGetPreviewDeviceType();
                break;
            case 'post':
                deviceType = select('core/edit-post').__experimentalGetPreviewDeviceType();
                break;
            default:
                deviceType = 'Desktop';
        }
    }

    return deviceType;
};

export const useSettingFallback = (param) => {
    return useSettings === undefined ? useSetting(param) : useSettings(param)[0];
};

export const parseCurrentURL = () => {
    const url = window.location;

    const parsedURL = {
        protocol: url.protocol,         // Protocol (e.g., 'https:')
        hostname: url.hostname,         // Hostname (e.g., 'www.example.com')
        port: url.port || 'default',    // Port (e.g., '8080' or default)
        pathname: url.pathname,         // Pathname (e.g., '/path/to/page')
        search: url.search,             // Search query (e.g., '?query=123')
        hash: url.hash,                 // Fragment (e.g., '#section1')
        params: {}                      // Object for search parameters
    };

    const searchParams = new URLSearchParams(url.search);
    for (const [key, value] of searchParams.entries()) {
        parsedURL.params[key] = value;
    }

    return parsedURL;
};

export const isOnEditor = () => {
    const { params = {} } = parseCurrentURL();
    const { action = false, canvas = false, postType = false } = params;

    return !action && !canvas && !postType ? true : action || canvas ? true : false;
};

export const dummyText = (minLength, maxLength) => {
    const loremIpsumWords = [
        'lorem', 'ipsum', 'dolor', 'sit', 'amet', 'consectetur', 'adipiscing', 'elit',
        'sed', 'do', 'eiusmod', 'tempor', 'incididunt', 'ut', 'labore', 'et', 'dolore',
        'magna', 'aliqua', 'ut', 'enim', 'ad', 'minim', 'veniam', 'quis', 'nostrud',
        'exercitation', 'ullamco', 'laboris', 'nisi', 'ut', 'aliquip', 'ex', 'ea',
        'commodo', 'consequat', 'duis', 'aute', 'irure', 'dolor', 'in', 'reprehenderit',
        'in', 'voluptate', 'velit', 'esse', 'cillum', 'dolore', 'eu', 'fugiat', 'nulla',
        'pariatur', 'excepteur', 'sint', 'occaecat', 'cupidatat', 'non', 'proident',
        'sunt', 'in', 'culpa', 'qui', 'officia', 'deserunt', 'mollit', 'anim', 'id',
        'est', 'laborum'
    ];

    const wordCount = Math.floor(Math.random() * (maxLength - minLength + 1)) + minLength;
    let result = [];
    for (let i = 0; i < wordCount; i++) {
        result.push(loremIpsumWords[Math.floor(Math.random() * loremIpsumWords.length)]);
    }
    return result.join(' ');
};