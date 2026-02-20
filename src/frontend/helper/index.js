export const responsiveBreakpoint = () => {
    const { settingsData } = window['GutenverseConfig'] || window['GutenverseData'] || {};
    const { editor_settings } = settingsData || {};
    const { tablet_breakpoint = 1024, mobile_breakpoint = 767 } = editor_settings || {};

    return {
        tabletBreakpoint: tablet_breakpoint,
        mobileBreakpoint: mobile_breakpoint
    };
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
