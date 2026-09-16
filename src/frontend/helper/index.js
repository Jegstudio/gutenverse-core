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

export const reinitMap = {
    GutenverseAccordion: '.guten-accordions',
    GutenverseAnimatedText: '.guten-animated-text',
    GutenverseAnimationBasic: '.guten-element',
    GutenverseChart: '.guten-chart',
    GutenverseClientLogo: '.guten-client-logo',
    GutenverseCountdown: '.guten-countdown',
    GutenverseFunFact: '.guten-fun-fact',
    GutenverseGallery: '.guten-gallery',
    GutenverseMaps: '.guten-maps',
    GutenverseNavMenu: '.guten-nav-menu',
    GutenversePopupBuilder: '.guten-popup-builder',
    GutenversePortfolioGallery: '.guten-portfolio-gallery',
    GutenversePostblock: '.guten-post-block',
    GutenversePostComment: '.guten-post-comment',
    GutenversePostlist: '.guten-post-list',
    GutenverseProgressBar: '.guten-progress-bar',
    GutenverseSearch: '.guten-search',
    GutenverseSlideshow: '.guten-background-slideshow',
    GutenverseTabs: '.guten-tabs',
    GutenverseTeam: '.guten-team',
    GutenverseTestimonials: '.guten-testimonials',
    GutenverseVideo: '.guten-video-wrapper, .guten-video-background',
    GutenFluidBackground: '.guten-fluid-background',
    GutenverseAdvanceButton: '.guten-advance-button-wrap',
    GutenverseAdvanceTabs: '.guten-advance-tabs',
    GutenverseAnimatedShapeDivider: '.guten-shape-divider-animated',
    GutenverseEditAccount: '.guten-edit-account',
    GutenverseEditPassword: '.guten-edit-password',
    GutenverseFormInput: '.guten-form-builder',
    GutenverseFormInputCalculation: '.guten-form-input-calculation',
    GutenverseFormInputFile: '.guten-form-input-file',
    GutenverseFormInputImageRadio: '.guten-form-input-image-radio',
    GutenverseFormInputMobile: '.guten-form-input-mobile',
    GutenverseFormInputPayment: '.guten-form-input-payment',
    GutenverseFormStepper: '.guten-form-stepper',
    GutenverseLottie: '.guten-lottie',
    GutenverseMegaMenu: '.guten-mega-menu',
    GutenverseMegaMenuItem: '.guten-mega-menu-item',
    GutenverseMultiInputGroupSelect: '.guten-form-input-multi-group-select',
    GutenverseMyAccount: '.guten-my-account',
    GutenversePopupPro: '.guten-popup-builder',
    GutenversePostCarousel: '.guten-post-carousel',
    GutenverseSectionSlider: '.guten-section-slider',
    GutenverseSticky: '.guten-sticky',
    GutenverseTooltip: '.guten-element[data-hoc-tooltip]',
};
