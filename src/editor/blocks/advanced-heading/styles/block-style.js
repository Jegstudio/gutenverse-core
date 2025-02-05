import { isNotEmpty } from 'gutenverse-core/helper';
const getBlockStyle = (elementId, attributes) => {
    let data = [];

    /**Panel Focus Title */
    isNotEmpty(attributes['focusColor']) && data.push({
        'type': 'color',
        'id': 'focusColor',
        'selector': `.editor-styles-wrapper .${elementId} .heading-focus`,
        'property': ['color'],
    });

    isNotEmpty(attributes['focusTypography']) && data.push({
        'type': 'typography',
        'id': 'focusTypography',
        'selector': `.editor-styles-wrapper .${elementId} .heading-focus`,
    });

    isNotEmpty(attributes['focusTextStroke']) && data.push({
        'type': 'textStroke',
        'id': 'focusTextStroke',
        'selector': `.editor-styles-wrapper .${elementId} .heading-focus`,
    });

    isNotEmpty(attributes['focusBackground']) && data.push({
        'type': 'background',
        'id': 'focusBackground',
        'responsive': true,
        'selector': `.editor-styles-wrapper .${elementId} .heading-focus`,
    });

    isNotEmpty(attributes['focusMargin']) && data.push({
        'type': 'dimension',
        'id': 'focusMargin',
        'responsive': true,
        'property': ['margin'],
        'selector': `.editor-styles-wrapper .${elementId} .heading-focus`,
    });

    isNotEmpty(attributes['focusPadding']) && data.push({
        'type': 'dimension',
        'id': 'focusPadding',
        'responsive': true,
        'property': ['padding'],
        'selector': `.editor-styles-wrapper .${elementId} .heading-focus`,
    });

    /**Panel Line */
    isNotEmpty(attributes['lineColor']) && data.push({
        'type': 'color',
        'id': 'lineColor',
        'selector': `.editor-styles-wrapper .${elementId} .heading-line`,
        'property': ['border-color'],
    });

    isNotEmpty(attributes['lineWidth']) && isNotEmpty(attributes['showLine']) && attributes['showLine'] !== 'none' && data.push({
        'type': 'plain',
        'id': 'lineWidth',
        'property': ['width'],
        'selector': `.editor-styles-wrapper .${elementId} .heading-line`,
        'valueCSS': '{value}%',
        'values': {
            'value': {
                'type': 'direct',
            }
        }
    });

    /**Panel List */
    isNotEmpty(attributes['background']) && data.push({
        'type': 'background',
        'id': 'background',
        'selector': `.editor-styles-wrapper .is-root-container .${elementId}`,
    });

    isNotEmpty(attributes['backgroundHover']) && data.push({
        'type': 'background',
        'id': 'backgroundHover',
        'selector': `.editor-styles-wrapper .is-root-container .${elementId}:hover`,
    });

    isNotEmpty(attributes['border']) && data.push({
        'type': 'border',
        'id': 'border',
        'selector': `.editor-styles-wrapper .is-root-container .${elementId}`,
    });

    isNotEmpty(attributes['borderHover']) && data.push({
        'type': 'border',
        'id': 'borderHover',
        'selector': `.editor-styles-wrapper .is-root-container .${elementId}:hover`,
    });

    isNotEmpty(attributes['borderResponsive']) && data.push({
        'type': 'borderResponsive',
        'id': 'borderResponsive',
        'selector': `.editor-styles-wrapper .is-root-container .${elementId}`,
    });

    isNotEmpty(attributes['borderResponsiveHover']) && data.push({
        'type': 'borderResponsive',
        'id': 'borderResponsiveHover',
        'selector': `.editor-styles-wrapper .is-root-container .${elementId}:hover`,
    });

    isNotEmpty(attributes['boxShadow']) && data.push({
        'type': 'boxShadow',
        'id': 'boxShadow',
        'property': ['box-shadow'],
        'selector': `.editor-styles-wrapper .is-root-container .${elementId}`,
    });

    isNotEmpty(attributes['boxShadowHover']) && data.push({
        'type': 'boxShadow',
        'id': 'boxShadowHover',
        'property': ['box-shadow'],
        'selector': `.editor-styles-wrapper .is-root-container .${elementId}:hover`,
    });

    isNotEmpty(attributes['mask']) && data.push({
        'type': 'mask',
        'id': 'mask',
        'responsive': true,
        'selector': `.editor-styles-wrapper .is-root-container .${elementId}`,
    });

    isNotEmpty(attributes['padding']) && data.push({
        'type': 'dimension',
        'id': 'padding',
        'responsive': true,
        'property': ['padding'],
        'selector': `.editor-styles-wrapper .is-root-container .${elementId}`,
    });

    isNotEmpty(attributes['margin']) && data.push({
        'type': 'dimension',
        'id': 'margin',
        'responsive': true,
        'property': ['margin'],
        'selector': `.editor-styles-wrapper .is-root-container .${elementId}`,
    });

    isNotEmpty(attributes['zIndex']) && data.push({
        'type': 'plain',
        'id': 'zIndex',
        'responsive': true,
        'property': ['z-index'],
        'selector': `.editor-styles-wrapper .is-root-container .${elementId}`,
    });

    isNotEmpty(attributes['animation']) && isNotEmpty(attributes['animation']['delay']) && data.push({
        'type': 'plain',
        'id': 'animation',
        'property': ['animation-delay'],
        'selector': `.editor-styles-wrapper .is-root-container .${elementId}`,
        'valueCSS': '{value}ms',
        'values': {
            'value': {
                'type': 'attribute',
                'key': 'delay'
            }
        }
    });

    return data;
};


export default getBlockStyle;