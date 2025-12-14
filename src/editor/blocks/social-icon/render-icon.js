/**
 * Render icon (font icon or SVG)
 * @param {string} icon - Icon class name
 * @param {string} iconSVG - Base64 encoded SVG data
 * @returns {JSX.Element|null} - Rendered icon element
 */
export const renderIcon = (icon, iconType, iconSVG = '') => {
    let fontIconHtml = <i className={icon}></i>;
    let svgIconHtml = '';

    if (iconType === 'svg' && iconSVG) {
        try {
            const svgData = atob(iconSVG);
            svgIconHtml = (
                <div
                    className="gutenverse-icon-svg"
                    dangerouslySetInnerHTML={{ __html: svgData }}
                />
            );
        } catch (e) {
            svgIconHtml = null;
        }
    }

    return <>{fontIconHtml}{svgIconHtml}</>;
};