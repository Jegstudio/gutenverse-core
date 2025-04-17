import { handleColor } from '../handler/handle-color';

export const backgroundCSS = (attribute) => {
    let background = {
        'Desktop': [],
        'Tablet': [],
        'Mobile': [],
    };

    const {
        type,
        color,
        image,
        position,
        xposition = {},
        yposition = {},
        repeat,
        size,
        width,
        blendMode,
        fixed,
        gradientColor,
        gradientType = 'linear',
        gradientAngle = 180,
        gradientRadial = 'center center',
        videoImage = {}
    } = attribute;

    switch (type) {
        case 'default':
            if (color) {
                const colorCSS = handleColor(color, 'background-color');
                background.Desktop.push(colorCSS);
            }

            if (image) {
                if (image?.Desktop?.image) {
                    background.Desktop.push(`background-image: url(${image.Desktop.image});`);
                }
                if (image?.Tablet?.image) {
                    background.Tablet.push(`background-image: url(${image.Tablet.image});`);
                }
                if (image?.Mobile?.image) {
                    background.Mobile.push(`background-image: url(${image.Mobile.image});`);
                }
            }

            if (position) {
                if (position?.Desktop && position.Desktop !== 'default' && position.Desktop !== 'custom') {
                    background.Desktop.push(`background-position: ${position.Desktop};`);
                }
                if (position?.Tablet && position.Tablet !== 'default' && position.Tablet !== 'custom') {
                    background.Tablet.push(`background-position: ${position.Tablet};`);
                }
                if (position?.Mobile && position.Mobile !== 'default' && position.Mobile !== 'custom') {
                    background.Mobile.push(`background-position: ${position.Mobile};`);
                }

                if (position?.Desktop === 'custom' || position?.Tablet === 'custom' || position?.Mobile === 'custom') {
                    const addCustomPosition = (device) => {
                        const xPos = xposition[device] ? `background-position-x: ${xposition[device].point}${xposition[device].unit};` : '';
                        const yPos = yposition[device] ? `background-position-y: ${yposition[device].point}${yposition[device].unit};` : '';
                        if (xPos || yPos) {
                            background[device].push(`${xPos} ${yPos}`);
                        }
                    };

                    if (position?.Desktop === 'custom') addCustomPosition('Desktop');
                    if (position?.Tablet === 'custom') addCustomPosition('Tablet');
                    if (position?.Mobile === 'custom') addCustomPosition('Mobile');
                }
            }

            if (repeat) {
                if (repeat?.Desktop && repeat.Desktop !== 'default') {
                    background.Desktop.push(`background-repeat: ${repeat.Desktop};`);
                }
                if (repeat?.Tablet && repeat.Tablet !== 'default') {
                    background.Tablet.push(`background-repeat: ${repeat.Tablet};`);
                }
                if (repeat?.Mobile && repeat.Mobile !== 'default') {
                    background.Mobile.push(`background-repeat: ${repeat.Mobile};`);
                }
            }

            if (size) {
                if (size?.Desktop && size.Desktop !== 'default' && size.Desktop !== 'custom') {
                    background.Desktop.push(`background-size: ${size.Desktop};`);
                }
                if (size?.Tablet && size.Tablet !== 'default' && size.Tablet !== 'custom') {
                    background.Tablet.push(`background-size: ${size.Tablet};`);
                }
                if (size?.Mobile && size.Mobile !== 'default' && size.Mobile !== 'custom') {
                    background.Mobile.push(`background-size: ${size.Mobile};`);
                }

                if (size?.Desktop === 'custom' || size?.Tablet === 'custom' || size?.Mobile === 'custom') {
                    const addCustomSize = (device) => {
                        if (width?.[device]?.point && width[device]?.unit) {
                            background[device].push(`background-size: ${width[device].point}${width[device].unit};`);
                        }
                    };

                    if (size?.Desktop === 'custom') addCustomSize('Desktop');
                    if (size?.Tablet === 'custom') addCustomSize('Tablet');
                    if (size?.Mobile === 'custom') addCustomSize('Mobile');
                }
            }

            if (blendMode) {
                if (blendMode?.Desktop) {
                    background.Desktop.push(`background-blend-mode: ${blendMode.Desktop}; mix-blend-mode: ${blendMode.Desktop};`);
                }
                if (blendMode?.Tablet) {
                    background.Tablet.push(`background-blend-mode: ${blendMode.Tablet}; mix-blend-mode: ${blendMode.Tablet};`);
                }
                if (blendMode?.Mobile) {
                    background.Mobile.push(`background-blend-mode: ${blendMode.Mobile}; mix-blend-mode: ${blendMode.Mobile};`);
                }
            }

            if (fixed) {
                if (fixed?.Desktop) {
                    background.Desktop.push(`background-attachment: ${fixed.Desktop ? 'fixed' : 'scroll'};`);
                }
                if (fixed?.Tablet) {
                    background.Tablet.push(`background-attachment: ${fixed.Tablet ? 'fixed' : 'scroll'};`);
                }
                if (fixed?.Mobile) {
                    background.Mobile.push(`background-attachment: ${fixed.Mobile ? 'fixed' : 'scroll'};`);
                }
            }
            break;

        case 'gradient':
            if (gradientColor) {
                const colors = gradientColor.map(gradient => `${gradient.color} ${gradient.offset * 100}%`);
                const gradientCSS = gradientType === 'radial'
                    ? `background: radial-gradient(at ${gradientRadial}, ${colors.join(',')});`
                    : `background: linear-gradient(${gradientAngle}deg, ${colors.join(',')});`;

                background.Desktop.push(gradientCSS);
                background.Tablet.push(gradientCSS);
                background.Mobile.push(gradientCSS);
            }
            break;

        case 'video':
            if (videoImage?.Desktop?.image) {
                background.Desktop.push(`background-image: url(${videoImage.Desktop.image}); background-size: cover; background-position: center;`);
            }
            if (videoImage?.Tablet?.image) {
                background.Tablet.push(`background-image: url(${videoImage.Tablet.image}); background-size: cover; background-position: center;`);
            }
            if (videoImage?.Mobile?.image) {
                background.Mobile.push(`background-image: url(${videoImage.Mobile.image}); background-size: cover; background-position: center;`);
            }
            break;

        default:
            break;
    }

    return background;
};

export const backgroundGenerator = (attribute, style, css) => {
    const {selector} = style;

    const background = backgroundCSS(attribute);

    if (background.Desktop.length) {
        css.Desktop = `${selector} { ` + background.Desktop.join(' ') + ' }';
    }

    if (background.Tablet.length) {
        css.Tablet = `${selector} { ` + background.Tablet.join(' ') + ' }';
    }

    if (background.Mobile.length) {
        css.Mobile = `${selector} { ` + background.Mobile.join(' ') + ' }';
    }

    return css;
};
