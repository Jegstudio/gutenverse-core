/**
 * Render icon (font icon or SVG)
 * 
 * @param {string} icon - Icon class name
 * @param {string} iconType - Type of icon ('icon' or 'svg')
 * @param {string} iconSVG - Base64 encoded SVG data
 * @returns {JSX.Element|null} Rendered icon element
 */
export const renderIcon = (icon, iconType = 'icon', iconSVG = '') => {
    if (iconType === 'svg' && iconSVG) {
        try {
            const svgData = atob(iconSVG);
            return (
                <div
                    className="gutenverse-icon-svg"
                    dangerouslySetInnerHTML={{ __html: svgData }}
                />
            );
        } catch (e) {
            console.error('Failed to decode SVG data:', e);
            return null;
        }
    }

    if (icon) {
        return <i aria-hidden="true" className={icon}></i>;
    }

    return null;
};
