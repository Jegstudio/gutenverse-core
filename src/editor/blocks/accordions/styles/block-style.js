import { getDeviceType } from 'gutenverse-core/editor-helper';
import { isNotEmpty } from 'gutenverse-core/helper';
const device = getDeviceType();
const getBlockStyle = (elementId, attributes) => {
    let data = [];

    /**Panel Accordions */
    isNotEmpty(attributes['accordionMargin']) && data.push({
        'type': 'dimension',
        'id': 'accordionMargin',
        'responsive': true,
        'property': ['margin'],
        'selector': `.${elementId} .accordion-item, .guten-column .wp-block .${elementId} .accordion-item`,
    });

    isNotEmpty(attributes['accordionBorder']) && data.push({
        'type': 'border',
        'id': 'accordionBorder',
        'selector': `.${elementId} .accordion-item`,
    });

    isNotEmpty(attributes['accordionBorderResponsive']) && device !== 'Desktop' && data.push({
        'type': 'borderResponsive',
        'responsive': true,
        'id': 'accordionBorderResponsive',
        'selector': `.${elementId} .accordion-item`,
    });

    isNotEmpty(attributes['accordionBorderActive']) && data.push({
        'type': 'border',
        'id': 'accordionBorderActive',
        'selector': `.${elementId} .accordion-item.active`,
    });

    isNotEmpty(attributes['accordionBorderActiveResponsive']) && device !== 'Desktop' && data.push({
        'type': 'borderResponsive',
        'responsive': true,
        'id': 'accordionBorderActiveResponsive',
        'selector': `.${elementId} .accordion-item.active`,
    });

    isNotEmpty(attributes['accordionBoxShadow']) && data.push({
        'type': 'boxShadow',
        'id': 'accordionBoxShadow',
        'property': ['box-shadow'],
        'selector': `.${elementId} .accordion-item`,
    });

    isNotEmpty(attributes['accordionBoxShadowActive']) && data.push({
        'type': 'boxShadow',
        'id': 'accordionBoxShadowActive',
        'property': ['box-shadow'],
        'selector': `.${elementId} .accordion-item.active`,
    });

    /**Panel Body */
    isNotEmpty(attributes['contentTypography']) && data.push({
        'type': 'typography',
        'id': 'contentTypography',
        'selector': `.${elementId} .accordion-item .accordion-content`,
    });

    isNotEmpty(attributes['contentPadding']) && data.push({
        'type': 'dimension',
        'id': 'contentPadding',
        'responsive': true,
        'property': ['padding'],
        'selector': `.${elementId} .accordion-item .accordion-content`,
    });

    isNotEmpty(attributes['contentTextColor']) && data.push({
        'type': 'color',
        'id': 'contentTextColor',
        'selector': `.${elementId} .accordion-item .accordion-content`,
        'property': ['color'],
    });

    isNotEmpty(attributes['contentBackgroundColor']) && data.push({
        'type': 'color',
        'id': 'contentBackgroundColor',
        'selector': `.${elementId} .accordion-item .accordion-content`,
        'property': ['background-color'],
    });

    isNotEmpty(attributes['contentBorder']) && data.push({
        'type': 'border',
        'id': 'contentBorder',
        'selector': `.${elementId} .accordion-item .accordion-content`,
    });

    isNotEmpty(attributes['contentBorderResponsive']) && device !== 'Desktop' && data.push({
        'type': 'borderResponsive',
        'responsive': true,
        'id': 'contentBorderResponsive',
        'selector': `.${elementId} .accordion-item .accordion-content`,
    });

    /**Panel Icon Style */
    isNotEmpty(attributes['iconMargin']) && data.push({
        'type': 'dimension',
        'id': 'iconMargin',
        'responsive': true,
        'property': ['margin'],
        'selector': `.${elementId} .accordion-item .accordion-icon`,
    });

    isNotEmpty(attributes['iconPadding']) && data.push({
        'type': 'dimension',
        'id': 'iconPadding',
        'responsive': true,
        'property': ['padding'],
        'selector': `.${elementId} .accordion-item .accordion-icon`,
    });

    isNotEmpty(attributes['iconSize']) && data.push({
        'type': 'plain',
        'id': 'iconSize',
        'responsive': true,
        'property': ['font-size'],
        'selector': `.${elementId} .accordion-item .accordion-icon`,
        'valueCSS' : '{value}px',
        'values' : {
            'value' : {
                'type' : 'direct',
            }
        }
    });

    isNotEmpty(attributes['iconColor']) && data.push({
        'type': 'color',
        'id': 'iconColor',
        'selector': `.${elementId} .accordion-item .accordion-icon i`,
        'property': ['color'],
    });

    isNotEmpty(attributes['iconBackground']) && data.push({
        'type': 'background',
        'id': 'iconBackground',
        'selector': `.${elementId} .accordion-item .accordion-icon`,
        'responsive' : true
    });

    isNotEmpty(attributes['iconBorder']) && data.push({
        'type': 'border',
        'id': 'iconBorder',
        'selector': `.${elementId} .accordion-item .accordion-icon`,
    });

    isNotEmpty(attributes['iconBorderResponsive']) && device !== 'Desktop' && data.push({
        'type': 'borderResponsive',
        'responsive': true,
        'id': 'iconBorderResponsive',
        'selector': `.${elementId} .accordion-item .accordion-icon`,
    });

    isNotEmpty(attributes['iconBoxShadow']) && data.push({
        'type': 'boxShadow',
        'id': 'iconBoxShadow',
        'property': ['box-shadow'],
        'selector': `.${elementId} .accordion-item .accordion-icon`,
    });

    isNotEmpty(attributes['iconActiveSize']) && data.push({
        'type': 'plain',
        'id': 'iconActiveSize',
        'responsive': true,
        'property': ['font-size'],
        'selector': `.${elementId} .accordion-item.active .accordion-icon`,
        'valueCSS' : '{value}px',
        'values' : {
            'value' : {
                'type' : 'direct',
            }
        }
    });

    isNotEmpty(attributes['iconActiveColor']) && data.push({
        'type': 'color',
        'id': 'iconActiveColor',
        'selector': `.${elementId} .accordion-item.active .accordion-icon i`,
        'property': ['color'],
    });

    isNotEmpty(attributes['iconActiveBackground']) && data.push({
        'type': 'background',
        'id': 'iconActiveBackground',
        'selector': `.${elementId} .accordion-item.active .accordion-icon`,
        'responsive' : true
    });

    isNotEmpty(attributes['iconActiveBorder']) && data.push({
        'type': 'border',
        'id': 'iconActiveBorder',
        'selector': `.${elementId} .accordion-item.active .accordion-icon`,
    });

    isNotEmpty(attributes['iconActiveBorderResponsive']) && device !== 'Desktop' && data.push({
        'type': 'borderResponsive',
        'responsive': true,
        'id': 'iconActiveBorderResponsive',
        'selector': `.${elementId} .accordion-item.active .accordion-icon`,
    });

    isNotEmpty(attributes['iconActiveBoxShadow']) && data.push({
        'type': 'boxShadow',
        'id': 'iconActiveBoxShadow',
        'property': ['box-shadow'],
        'selector': `.${elementId} .accordion-item.active .accordion-icon`,
    });

    /**Panel Icon */

    isNotEmpty(attributes['iconPosition']) && isNotEmpty(attributes['iconSpacing']) && attributes['iconPosition'] === 'left' && data.push({
        'type': 'plain',
        'id': 'iconPosition',
        'responsive': true,
        'property': ['margin-right'],
        'selector': `.${elementId} .accordion-item .accordion-icon`,
        'valueCSS' : '{value}px',
        'values' : {
            'value' : {
                'type' : 'direct',
            },
        },
        'multiAttr' : [attributes['iconSpacing']]
    });

    isNotEmpty(attributes['iconPosition']) && isNotEmpty(attributes['iconSpacing']) && attributes['iconPosition'] === 'right' && data.push({
        'type': 'plain',
        'id': 'iconPosition',
        'responsive': true,
        'property': ['margin-left'],
        'selector': `.${elementId} .accordion-item .accordion-icon`,
        'valueCSS' : '{value}px',
        'values' : {
            'value' : {
                'type' : 'direct',
            },
        },
        'multiAttr' : [attributes['iconSpacing']]
    });

    /**Panel Title */
    isNotEmpty(attributes['titleAlign']) && data.push({
        'type': 'plain',
        'id': 'titleAlign',
        'selector': `.${elementId} .accordion-item .accordion-text`,
        'property': ['text-align'],
        'responsive': true,
    });

    isNotEmpty(attributes['titleTypography']) && data.push({
        'type': 'typography',
        'id': 'titleTypography',
        'selector': `.${elementId} .accordion-item .accordion-text`,
    });

    isNotEmpty(attributes['titlePadding']) && data.push({
        'type': 'dimension',
        'id': 'titlePadding',
        'responsive': true,
        'property': ['padding'],
        'selector': `.${elementId} .accordion-item .accordion-text`,
    });

    isNotEmpty(attributes['titleTextColor']) && data.push({
        'type': 'color',
        'id': 'titleTextColor',
        'selector': `.${elementId} .accordion-item .accordion-text`,
        'property': ['color'],
    });

    isNotEmpty(attributes['titleBackgroundColor']) && data.push({
        'type': 'color',
        'id': 'titleBackgroundColor',
        'selector': `.${elementId} .accordion-item .accordion-text`,
        'property': ['background-color'],
    });

    isNotEmpty(attributes['titleBorder']) && data.push({
        'type': 'border',
        'id': 'titleBorder',
        'selector': `.${elementId} .accordion-item .accordion-text`,
    });

    isNotEmpty(attributes['titleBorderResponsive']) && device !== 'Desktop' && data.push({
        'type': 'borderResponsive',
        'responsive': true,
        'id': 'titleBorderResponsive',
        'selector': `.${elementId} .accordion-item .accordion-text`,
    });

    isNotEmpty(attributes['titleActiveColor']) && data.push({
        'type': 'color',
        'id': 'titleActiveColor',
        'selector': `.${elementId} .accordion-item.active .accordion-text`,
        'property': ['color'],
    });

    isNotEmpty(attributes['titleBackgroundActiveColor']) && data.push({
        'type': 'color',
        'id': 'titleBackgroundActiveColor',
        'selector': `.${elementId} .accordion-item.active .accordion-text`,
        'property': ['background-color'],
    });

    isNotEmpty(attributes['titleBorderActive']) && data.push({
        'type': 'border',
        'id': 'titleBorderActive',
        'selector': `.${elementId} .accordion-item.active .accordion-text`,
    });

    isNotEmpty(attributes['titleBorderActiveResponsive']) && device !== 'Desktop' && data.push({
        'type': 'borderResponsive',
        'responsive': true,
        'id': 'titleBorderActiveResponsive',
        'selector': `.${elementId} .accordion-item.active .accordion-text`,
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
        'id' : 'animation',
        'property': ['animation-delay'],
        'selector': `.editor-styles-wrapper .is-root-container .${elementId}`,
        'valueCSS' : '{value}ms',
        'values' : {
            'value' : {
                'type' : 'attribute',
                'key'  : 'delay'
            }
        }
    });

    return data;
};


export default getBlockStyle;