export const responsiveBreakpoint = () => {
    const { settingsData } = window['GutenverseConfig'] || window['GutenverseData'] || {};
    const { editor_settings } = settingsData || {};
    const { tablet_breakpoint = 1024, mobile_breakpoint = 767 } = editor_settings || {};

    return {
        tabletBreakpoint: tablet_breakpoint,
        mobileBreakpoint: mobile_breakpoint
    };
};

const nonceCache = {};
let nonceRequest = null;

export const getNonce = (actionName) => {
    const config = window.GutenverseData || {};
    const nonceActions = config.nonceActions || {};
    const allowedActions = Array.isArray(nonceActions) ? nonceActions : Object.keys(nonceActions);

    if (!config.nonceEndpoint || !allowedActions.includes(actionName)) {
        return Promise.resolve('');
    }

    if (nonceCache[actionName]) {
        return Promise.resolve(nonceCache[actionName]);
    }

    if (!nonceRequest) {
        nonceRequest = fetch(config.nonceEndpoint, {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        })
            .then(response => response.json())
            .then(response => {
                if (response.success && response.data && response.data.nonceActions) {
                    Object.assign(nonceCache, response.data.nonceActions);
                }

                return nonceCache;
            })
            .catch(() => nonceCache);
    }

    return nonceRequest
        .then(nonces => nonces[actionName] || '')
        .catch(() => '');
};

/**
 * Render Icon
 *
 * @param {string} icon
 * @param {string} iconType
 * @param {string} iconSVG
 * @param {boolean} showAriaHidden
 *
 * @return {string}
 */
export const renderIcon = ( icon, iconType = 'icon', iconSVG = '', showAriaHidden = false ) => {
    if (iconType === 'svg' && iconSVG) {
        try {
            const svgData = atob(iconSVG);
            return `<div class="gutenverse-icon-svg">${svgData}</div>`;
        } catch (e) {
            return '';
        }
    }

    if (icon) {
        const aria = showAriaHidden ? ' aria-hidden="true"' : '';
        return `<i class="${icon}"${aria}></i>`;
    }

    return '';
};

/**
 * Add reinit event handler
 *
 * @param {array} datas
 */
export const addReinitHandler = (datas = []) => {
    datas.forEach(data => {
        const { name, selector, handler } = data;
        if (!window?.GutenverseReinitData) {
            window.GutenverseReinitData = {
                [name]: {
                    selector,
                    handler
                }
            };
        } else {
            window.GutenverseReinitData[name] = {
                selector,
                handler
            };
        }
    });
};
/**
 * Add custom event.
 *
 * @param {obj} event
 *
 */
export const listenToEvent = (name, handler = () => {}) => {
    if (!window.GutenverseEventList) {
        window.GutenverseEventList = {};
    }
    if (window?.GutenverseEventList?.[name]) {
        window.GutenverseEventList[name].push(handler);
    } else {
        window.GutenverseEventList[name] = [handler];
    }
};

/**
 * Add custom event.
 *
 * @param {obj} event
 *
 */
export const detachFromEvent = (name, handler = () => {}) => {
    if (!window.GutenverseEvent) {
        return;
    }
    window.GutenverseEvent.detach(name, handler);
};

/**
 * Add custom event.
 *
 * @param {obj} event
 *
 */
export const dispatchEvent = (eventName, data) => {
    if (!window.GutenverseEvent || !window?.GutenverseEvent?.status) {
        const handler = () => {
            window.GutenverseEvent.dispatch(eventName, data);
            window.removeEventListener('GutenverseEventInit', handler);
        };
        window.addEventListener('GutenverseEventInit', handler);
        return;
    }
    window.GutenverseEvent.dispatch(eventName, data);
};
