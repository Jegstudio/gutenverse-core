import { isNotEmpty } from 'gutenverse-core/helper';

export const tooltipCSS = (attribute, selector, handler) => {
    let css = {
        Desktop: [],
        Tablet: [],
        Mobile: [],
    };

    let data = [];

    isNotEmpty(attribute['tooltipMaxWidth']) && data.push({
        'type': 'plain',
        'id': 'tooltipMaxWidth',
        'selector': selector,
        'responsive': true,
        'properties': [
            {
                'name': 'max-width',
                'valueType': 'pattern',
                'pattern': '{value}px',
                'patternValues': {
                    'value': {
                        'type': 'direct',
                    },
                }
            }
        ],
    });

    isNotEmpty(attribute['tooltipBackground']) && data.push({
        'type': 'color',
        'id': 'tooltipBackground',
        'selector': `${selector}, ${selector}.arrow:before`,
        'properties': [
            {
                'name': 'background',
                'valueType': 'direct'
            }
        ],
    });

    isNotEmpty(attribute['tooltipTextAlign']) && data.push({
        'type': 'plain',
        'id': 'tooltipTextAlign',
        'selector': `${selector} .guten-tooltip-text`,
        'responsive': true,
        'properties': [
            {
                'name': 'text-align',
                'valueType': 'direct'
            }
        ],
    });

    isNotEmpty(attribute['tooltipColor']) && data.push({
        'type': 'color',
        'id': 'tooltipColor',
        'selector': `${selector} .guten-tooltip-text`,
        'properties': [
            {
                'name': 'color',
                'valueType': 'direct'
            }
        ],
    });

    isNotEmpty(attribute['tooltipIconColor']) && data.push({
        'type': 'color',
        'id': 'tooltipIconColor',
        'selector': `${selector} .guten-tooltip-text .guten-tooltip-icon`,
        'properties': [
            {
                'name': 'color',
                'valueType': 'direct'
            }
        ],
    });

    isNotEmpty(attribute['tooltipIconSize']) && data.push({
        'type': 'plain',
        'id': 'tooltipIconSize',
        'selector': `${selector} .guten-tooltip-text .guten-tooltip-icon`,
        'properties': [
            {
                'name': 'font-size',
                'valueType': 'pattern',
                'pattern': '{value}px',
                'patternValues': {
                    'value': {
                        'type': 'direct',
                    },
                }
            }
        ],
    });

    isNotEmpty(attribute['tooltipIconSpacing']) && data.push({
        'type': 'plain',
        'id': 'tooltipIconSpacing',
        'selector': `${selector} .guten-tooltip-text .guten-tooltip-icon.before`,
        'properties': [
            {
                'name': 'margin-right',
                'valueType': 'pattern',
                'pattern': '{value}px',
                'patternValues': {
                    'value': {
                        'type': 'direct',
                    },
                }
            }
        ],
    },
    {
        'type': 'plain',
        'id': 'tooltipIconSpacing',
        'selector': `${selector} .guten-tooltip-text .guten-tooltip-icon.after`,
        'properties': [
            {
                'name': 'margin-left',
                'valueType': 'pattern',
                'pattern': '{value}px',
                'patternValues': {
                    'value': {
                        'type': 'direct',
                    },
                }
            }
        ],
    });

    isNotEmpty(attribute['tooltipTypography']) && data.push({
        'type': 'typography',
        'id': 'tooltipTypography',
        'selector': `${selector} .guten-tooltip-text`,
    });

    isNotEmpty(attribute['tooltipPadding']) && data.push({
        'type': 'dimension',
        'id': 'tooltipPadding',
        'selector': selector,
        'responsive': true,
        'properties': [
            {
                'name': 'padding',
                'valueType': 'direct'
            }
        ],
    });

    isNotEmpty(attribute['tooltipMargin']) && data.push({
        'type': 'dimension',
        'id': 'tooltipMargin',
        'selector': `.block-editor-block-list__layout.is-root-container ${selector}`,
        'responsive': true,
        'properties': [
            {
                'name': 'margin',
                'valueType': 'direct'
            }
        ],
    });

    isNotEmpty(attribute['tooltipBorderResponsive']) && data.push({
        'type': 'borderResponsive',
        'id': 'tooltipBorderResponsive',
        'selector': selector,
        'responsive': true,
    });

    data.forEach((dt) => {
        if (dt['type'] === 'tooltip') {
            return;
        }
        const { Desktop, Tablet, Mobile } = handler(attribute[dt['id']], dt);
        css.Desktop.push(Desktop);
        css.Tablet.push(Tablet);
        css.Mobile.push(Mobile);
    });
    return css;
};

export const tooltipStyleGenerator = (attribute, style, css, handler) => {
    const { selector } = style;
    const { Desktop, Tablet, Mobile } = tooltipCSS(attribute, selector, handler);

    if (Desktop.length) {
        css.Desktop = Desktop.join('');
    }

    if (Tablet.length) {
        css.Tablet = Tablet.join('');
    }

    if (Mobile.length) {
        css.Mobile = Mobile.join(' ');
    }

    return css;
};