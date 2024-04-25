import MiniSignal from 'mini-signals';
import { createBlock } from '@wordpress/blocks';
import { select, useSelect, useDispatch, dispatch } from '@wordpress/data';
import { useMemo, useCallback } from '@wordpress/element';
import { store as coreStore } from '@wordpress/core-data';
import { dateI18n } from '@wordpress/date';
import { imagePlaceholder } from 'gutenverse-core/config';
import { filteredAttributes, isAlignStickyColumn, getFixData, getIndex, determineLocation } from 'gutenverse-core/helper';
import { BuildAdminStyle, DeviceLoop, deviceStyleValue, elementVar, normalAppender, responsiveAppender } from 'gutenverse-core/styling';
import identity from 'lodash/identity';
import isArray from 'lodash/isArray';
import isEmpty from 'lodash/isEmpty';
import isObject from 'lodash/isObject';
import mapValues from 'lodash/mapValues';
import pickBy from 'lodash/pickBy';

export const check = val => isArray(val) && !isEmpty(val);

export const getImageSrc = src => src && src.image ? src.image : imagePlaceholder;

export const signal = {
    styleDrawerSignal: new MiniSignal,
    refreshSignal: new MiniSignal,
    throwSignal: new MiniSignal,
    afterFilterSignal: new MiniSignal
};

export const getTimeAgo = (diff) => {
    const MINUTE_IN_SECONDS = 60;
    const HOUR_IN_SECONDS = 60 * MINUTE_IN_SECONDS;
    const DAY_IN_SECONDS = 24 * HOUR_IN_SECONDS;
    const MONTH_IN_SECONDS = 30 * DAY_IN_SECONDS;
    const YEAR_IN_SECONDS = 365 * DAY_IN_SECONDS;
    let since;
    let milliseconds;
    let seconds;
    let minutes;
    let hours;
    let days;
    let months;
    let years;

    if (0 === diff) {
        since = '0 seconds';
    }
    else if (diff > 0 && diff < 1) {
        milliseconds = Math.trunc(diff * 1000);
        since = milliseconds + ' ' + (1 === milliseconds ? 'millisecond' : 'milliseconds');
    }
    else if (diff >= 1 && diff < MINUTE_IN_SECONDS) {
        seconds = Math.trunc(diff);
        seconds = Math.max(seconds, 1);
        since = seconds + ' ' + (1 === seconds ? 'second' : 'seconds');
    }
    else if (diff >= MINUTE_IN_SECONDS && diff < HOUR_IN_SECONDS) {
        minutes = Math.trunc(diff / MINUTE_IN_SECONDS);
        minutes = Math.max(minutes, 1);
        since = minutes + ' ' + (1 === minutes ? 'minute' : 'minutes');
    }
    else if (diff >= HOUR_IN_SECONDS && diff < DAY_IN_SECONDS) {
        hours = Math.trunc(diff / HOUR_IN_SECONDS);
        hours = Math.max(hours, 1);
        since = hours + ' ' + (1 === hours ? 'hour' : 'hours');
    }
    else if (diff >= DAY_IN_SECONDS && diff < MONTH_IN_SECONDS) {
        days = Math.trunc(diff / DAY_IN_SECONDS);
        days = Math.max(days, 1);
        since = days + ' ' + (1 === days ? 'day' : 'days');
    }
    else if (diff >= MONTH_IN_SECONDS && diff < YEAR_IN_SECONDS) {
        months = Math.trunc(diff / MONTH_IN_SECONDS);
        months = Math.max(months, 1);
        since = months + ' ' + (1 === months ? 'month' : 'months');
    }
    else if (diff >= YEAR_IN_SECONDS) {
        years = Math.trunc(diff / YEAR_IN_SECONDS);
        years = Math.max(years, 1);
        since = years + ' ' + (1 === years ? 'year' : 'years');
    }

    return since + ' ago';
};

export const getDate = (format, date) => {
    if (format === 'ago') {
        const postDate = dateI18n('U', date);
        const currentDate = dateI18n('U', new Date());
        const diffDate = (currentDate - postDate);

        return getTimeAgo(diffDate);
    }

    return dateI18n(format, date);
};

export const judgement = (conditions, result, resolved, rejected) => {
    check(conditions) && conditions.map(({ value, resolver }) => {
        result = result && value === resolver;
    });

    return result ? resolved : rejected;
};

export const checkData = (conditions, resolved, rejected, result) => {
    const index = () => judgement(conditions, result, resolved, rejected);

    return data => {
        return getFixData(data, index);
    };
};

export const carryData = conditions => {
    return ids => {
        return resolveData(conditions, ids, check);
    };
};

export const resolveData = (conditions, ids, check) => {
    return (n, modxn, correct, def) => {
        const resolved = getIndex(ids, modxn / n, correct);
        const rejected = getIndex(ids, modxn / n, def);
        const result = check(conditions);

        return checkData(conditions, resolved, rejected, result);
    };
};

export const recursiveBlock = (data, images) => {
    let blocks = [];

    if (data.length > 0) {
        blocks = data.map(item => {
            const { name, attributes, innerBlocks } = item;
            const filterAttr = filteredAttributes(attributes, images);
            const inner = recursiveBlock(innerBlocks, images);
            return createBlock(name, filterAttr, inner);
        });
    }

    return blocks;
};

export const isCanStickyColumn = (props) => {
    const { clientId } = props;
    const parentId = select('core/block-editor').getBlockRootClientId(clientId);

    if (parentId) {
        const blocks = select('core/block-editor').getBlock(parentId);

        if (blocks) {
            const { attributes } = blocks;
            const { verticalAlign } = attributes;

            return isAlignStickyColumn(verticalAlign);
        }
    }

    return false;
};

export function useGlobalStylesConfig() {
    const { globalStylesId, settings, styles } = useSelect((select) => {
        const _globalStylesId = select(
            coreStore
        ).__experimentalGetCurrentGlobalStylesId();
        const record = _globalStylesId
            ? select(coreStore).getEditedEntityRecord(
                'root',
                'globalStyles',
                _globalStylesId
            )
            : undefined;
        return {
            globalStylesId: _globalStylesId,
            settings: record?.settings,
            styles: record?.styles,
        };
    }, []);

    const { getEditedEntityRecord } = useSelect(coreStore);
    const { editEntityRecord } = useDispatch(coreStore);

    const config = useMemo(() => {
        return {
            settings: settings ?? {},
            styles: styles ?? {},
        };
    }, [settings, styles]);

    const setConfig = useCallback(
        (callback) => {
            const record = getEditedEntityRecord(
                'root',
                'globalStyles',
                globalStylesId
            );
            const currentConfig = {
                styles: record?.styles ?? {},
                settings: record?.settings ?? {},
            };
            const updatedConfig = callback(currentConfig);
            editEntityRecord('root', 'globalStyles', globalStylesId, {
                styles: cleanEmptyObject(updatedConfig.styles) || {},
                settings: cleanEmptyObject(updatedConfig.settings) || {},
            });
        },
        [globalStylesId]
    );

    return {
        isUserConfigReady: !!settings || !!styles,
        userConfig: config,
        setUserConfig: setConfig
    };
}

export const renderColor = (color) => {
    if (!isEmpty(color)) {
        return 'rgba(' + color.r + ',' + color.g + ',' + color.b + ',' + color.a + ')';
    } else {
        return 'transparent';
    }
};

export const hexToRgb = (hex = '', options = {}) => {
    if (isEmpty(hex)) {
        return {};
    }

    const oldVarRgx = new RegExp(', (.*)\\)').test(hex);

    if (oldVarRgx) {
        const converted = hex.match(/, (.*)\)/);

        if (!isEmpty(converted)) {
            hex = converted[1];
        }
    }

    const hexCharacters = 'a-f\\d';
    const match3or4Hex = `#?[${hexCharacters}]{3}[${hexCharacters}]?`;
    const match6or8Hex = `#?[${hexCharacters}]{6}([${hexCharacters}]{2})?`;
    const nonHexChars = new RegExp(`[^#${hexCharacters}]`, 'gi');
    const validHexSize = new RegExp(`^${match3or4Hex}$|^${match6or8Hex}$`, 'i');

    if (typeof hex !== 'string' || nonHexChars.test(hex) || !validHexSize.test(hex)) {
        return {};
    }

    hex = hex.replace(/^#/, '');
    let alphaFromHex = 1;

    if (hex.length === 8) {
        alphaFromHex = Number.parseInt(hex.slice(6, 8), 16) / 255;
        hex = hex.slice(0, 6);
    }

    if (hex.length === 4) {
        alphaFromHex = Number.parseInt(hex.slice(3, 4).repeat(2), 16) / 255;
        hex = hex.slice(0, 3);
    }

    if (hex.length === 3) {
        hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
    }

    const number = Number.parseInt(hex, 16);
    const r = number >> 16;
    const g = (number >> 8) & 255;
    const b = number & 255;
    const a = typeof options.alpha === 'number' ? options.alpha : alphaFromHex;

    if (options.format === 'array') {
        return [r, g, b, a];
    }

    if (options.format === 'css') {
        const alphaString = a === 1 ? '' : ` / ${Number((a * 100).toFixed(2))}%`;
        return `rgb(${r} ${g} ${b}${alphaString})`;
    }

    return { r, g, b, a };
};

export const isEmptyValue = (value) => {
    if (isEmpty(value)) {
        return true;
    } else {
        if ('variable' === value.type) {
            return true;
        } else {
            return false;
        }
    }
};

export const cleanEmptyObject = (object) => {
    if (!isObject(object) || Array.isArray(object)) {
        return object;
    }

    const cleanedNestedObjects = pickBy(
        mapValues(object, cleanEmptyObject),
        identity
    );

    return isEmpty(cleanedNestedObjects) ? undefined : cleanedNestedObjects;
};

export const getDeviceType = () => {
    const location = determineLocation();
    let deviceType = null;

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

    // Update for WordPress version 6.3
    return deviceType.charAt(0).toUpperCase() + deviceType.slice(1);
};

export const setControlStyle = ({
    id,
    value,
    style,
    addStyle,
    removeStyle,
    allowDeviceControl
}) => {
    const {
        selector,
        allowRender = check => !isEmpty(check),
        hasChild = false,
        render
    } = style;

    if (allowRender(value) && (!isNaN(value) || !isEmpty(value))) {
        const elementStyle = hasChild ? render(value, id) : elementVar();

        if (!hasChild) {
            if (allowDeviceControl) {
                DeviceLoop(device => {
                    const _value = deviceStyleValue(device, value);

                    if (_value) {
                        responsiveAppender({
                            style: render(_value, id),
                            device,
                            elementStyle
                        });
                    }
                });
            } else {
                normalAppender({
                    style: render(value, id),
                    elementStyle
                });
            }
        }

        addStyle(
            id,
            BuildAdminStyle(elementStyle.adminStyle, selector)
        );
    } else {
        removeStyle(id);
    }
};

export const updateBlockList = ({ name, settings, metadata }, pro = false) => {
    dispatch('gutenverse/blocklist')?.updateList({
        name,
        pro,
        ...settings,
        ...metadata
    });
};

export const devices = ['Desktop', 'Tablet', 'Mobile'];

export const getRgbaValue = (colorId) =>{
    const color = `var(--wp--preset--color--${colorId})`;
    const tempElement = document.createElement('div');
    document.body.appendChild(tempElement);

    tempElement.style.color = color;
    const computedColor = window.getComputedStyle(tempElement).getPropertyValue('color');
    const rgbValues = computedColor.match(/\d+/g);
    const rgbaObject = {
        r: Number(rgbValues[0]),
        g: Number(rgbValues[1]),
        b: Number(rgbValues[2]),
        a:1
    };

    document.body.removeChild(tempElement);
    return rgbaObject;
};

export const getEditSiteHeader = () => {
    return new Promise(resolve => {
        setTimeout(() => {
            let header = document.getElementsByClassName('edit-post-header-toolbar')[0];
            header = header ? header : document.getElementsByClassName('edit-site-header_start')[0];
            header = header ? header : document.getElementsByClassName('edit-site-header-edit-mode__start')[0];
            header = header ? header : document.getElementsByClassName('edit-site-header-edit-mode__center')[0];
            header = header ? header : document.getElementsByClassName('edit-site-header-edit-mode__end')[0];

            resolve(header);
        }, 1000);
    });
};