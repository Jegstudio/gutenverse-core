import { isNotEmpty } from 'gutenverse-core/helper';
import { applyFilters } from '@wordpress/hooks';
import { backgroundStyle } from 'gutenverse-core/controls';

const getBlockStyle = (elementId, attributes) => {
    let data = [];
    data = backgroundStyle({
        attributes,
        data,
        elementId,
        backgroundSelector:`.editor-styles-wrapper .is-root-container .${elementId}`,
        backgroundHoverSelector: `.editor-styles-wrapper .is-root-container .${elementId}:hover`,
    });

    /**Panel Accordions */
    isNotEmpty(attributes['accordionMargin']) && data.push({
        'type': 'dimension',
        'id': 'accordionMargin',
        'responsive': true,
        'properties': [
            {
                'name': 'margin',
                'valueType': 'direct'
            }
        ],
        'selector': `.${elementId} .accordion-item, .guten-column .wp-block .${elementId} .accordion-item`,
    });

    isNotEmpty(attributes['accordionBorder']) && data.push({
        'type': 'border',
        'id': 'accordionBorder',
        'selector': `.${elementId} .accordion-item`,
    });

    isNotEmpty(attributes['accordionBorderResponsive']) && data.push({
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

    isNotEmpty(attributes['accordionBorderActiveResponsive']) && data.push({
        'type': 'borderResponsive',
        'responsive': true,
        'id': 'accordionBorderActiveResponsive',
        'selector': `.${elementId} .accordion-item.active`,
    });

    isNotEmpty(attributes['accordionBoxShadow']) && data.push({
        'type': 'boxShadow',
        'id': 'accordionBoxShadow',
        'properties': [
            {
                'name': 'box-shadow',
                'valueType': 'direct'
            }
        ],
        'selector': `.${elementId} .accordion-item`,
    });

    isNotEmpty(attributes['accordionBoxShadowActive']) && data.push({
        'type': 'boxShadow',
        'id': 'accordionBoxShadowActive',
        'properties': [
            {
                'name': 'box-shadow',
                'valueType': 'direct'
            }
        ],
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
        'properties': [
            {
                'name': 'padding',
                'valueType': 'direct'
            }
        ],
        'selector': `.${elementId} .accordion-item .accordion-content`,
    });

    isNotEmpty(attributes['contentTextColor']) && data.push({
        'type': 'color',
        'id': 'contentTextColor',
        'selector': `.${elementId} .accordion-item .accordion-content`,
        'properties': [
            {
                'name': 'color',
                'valueType': 'direct'
            }
        ],
    });

    isNotEmpty(attributes['contentTextColorClosed']) && data.push({
        'type': 'color',
        'id': 'contentTextColorClosed',
        'selector': `.${elementId} .accordion-item .accordion-body.closed .accordion-content`,
        'properties': [
            {
                'name': 'color',
                'valueType': 'direct'
            }
        ],
    });

    isNotEmpty(attributes['contentTextColorHover']) && data.push({
        'type': 'color',
        'id': 'contentTextColor',
        'selector': `.${elementId} .accordion-item .accordion-body:not(.closed) .accordion-content:hover`,
        'properties': [
            {
                'name': 'color',
                'valueType': 'direct'
            }
        ],
    });

    isNotEmpty(attributes['contentBackgroundColor']) && data.push({
        'type': 'color',
        'id': 'contentBackgroundColor',
        'selector': `.${elementId} .accordion-item .accordion-content`,
        'properties': [
            {
                'name': 'background-color',
                'valueType': 'direct'
            }
        ],
    });

    isNotEmpty(attributes['contentBackgroundColorClosed']) && data.push({
        'type': 'color',
        'id': 'contentBackgroundColorClosed',
        'selector': `.${elementId} .accordion-item .accordion-body.closed .accordion-content`,
        'properties': [
            {
                'name': 'background-color',
                'valueType': 'direct'
            }
        ],
    });

    isNotEmpty(attributes['contentBackgroundColorHover']) && data.push({
        'type': 'color',
        'id': 'contentBackgroundColorHover',
        'selector': `.${elementId} .accordion-item .accordion-body:not(.closed) .accordion-content:hover`,
        'properties': [
            {
                'name': 'background-color',
                'valueType': 'direct'
            }
        ],
    });

    isNotEmpty(attributes['contentBorder']) && data.push({
        'type': 'border',
        'id': 'contentBorder',
        'selector': `.${elementId} .accordion-item .accordion-content`,
    });

    isNotEmpty(attributes['contentBorderResponsive']) && data.push({
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
        'properties': [
            {
                'name': 'margin',
                'valueType': 'direct'
            }
        ],
        'selector': `.${elementId} .accordion-item .accordion-icon`,
    });

    isNotEmpty(attributes['iconPadding']) && data.push({
        'type': 'dimension',
        'id': 'iconPadding',
        'responsive': true,
        'properties': [
            {
                'name': 'padding',
                'valueType': 'direct'
            }
        ],
        'selector': `.${elementId} .accordion-item .accordion-icon`,
    });

    isNotEmpty(attributes['iconSize']) && data.push({
        'type': 'plain',
        'id': 'iconSize',
        'responsive': true,
        'selector': `.${elementId} .accordion-item .accordion-icon`,
        'properties': [
            {
                'name': 'font-size',
                'valueType': 'pattern',
                'pattern': '{value}px',
                'patternValues': {
                    'value': {
                        'type': 'direct',
                    }
                }
            }
        ],
    });

    isNotEmpty(attributes['iconColor']) && data.push({
        'type': 'color',
        'id': 'iconColor',
        'selector': `.${elementId} .accordion-item .accordion-icon i`,
        'properties': [
            {
                'name': 'color',
                'valueType': 'direct'
            }
        ],
    });

    isNotEmpty(attributes['iconBackground']) && data.push({
        'type': 'background',
        'id': 'iconBackground',
        'selector': `.${elementId} .accordion-item .accordion-icon`,
        'responsive': true
    });

    isNotEmpty(attributes['iconBorder']) && data.push({
        'type': 'border',
        'id': 'iconBorder',
        'selector': `.${elementId} .accordion-item .accordion-icon`,
    });

    isNotEmpty(attributes['iconBorderResponsive']) && data.push({
        'type': 'borderResponsive',
        'responsive': true,
        'id': 'iconBorderResponsive',
        'selector': `.${elementId} .accordion-item .accordion-icon`,
    });

    isNotEmpty(attributes['iconBoxShadow']) && data.push({
        'type': 'boxShadow',
        'id': 'iconBoxShadow',
        'properties': [
            {
                'name': 'box-shadow',
                'valueType': 'direct'
            }
        ],
        'selector': `.${elementId} .accordion-item .accordion-icon`,
    });

    isNotEmpty(attributes['iconActiveSize']) && data.push({
        'type': 'plain',
        'id': 'iconActiveSize',
        'responsive': true,
        'selector': `.${elementId} .accordion-item.active .accordion-icon`,
        'properties': [
            {
                'name': 'font-size',
                'valueType': 'pattern',
                'pattern': '{value}px',
                'patternValues': {
                    'value': {
                        'type': 'direct',
                    }
                }
            }
        ],
    });

    isNotEmpty(attributes['iconActiveColor']) && data.push({
        'type': 'color',
        'id': 'iconActiveColor',
        'selector': `.${elementId} .accordion-item.active .accordion-icon i`,
        'properties': [
            {
                'name': 'color',
                'valueType': 'direct'
            }
        ],
    });

    isNotEmpty(attributes['iconActiveBackground']) && data.push({
        'type': 'background',
        'id': 'iconActiveBackground',
        'selector': `.${elementId} .accordion-item.active .accordion-icon`,
        'responsive': true
    });

    isNotEmpty(attributes['iconActiveBorder']) && data.push({
        'type': 'border',
        'id': 'iconActiveBorder',
        'selector': `.${elementId} .accordion-item.active .accordion-icon`,
    });

    isNotEmpty(attributes['iconActiveBorderResponsive']) && data.push({
        'type': 'borderResponsive',
        'responsive': true,
        'id': 'iconActiveBorderResponsive',
        'selector': `.${elementId} .accordion-item.active .accordion-icon`,
    });

    isNotEmpty(attributes['iconActiveBoxShadow']) && data.push({
        'type': 'boxShadow',
        'id': 'iconActiveBoxShadow',
        'properties': [
            {
                'name': 'box-shadow',
                'valueType': 'direct'
            }
        ],
        'selector': `.${elementId} .accordion-item.active .accordion-icon`,
    });

    /**Panel Icon */

    isNotEmpty(attributes['iconPosition']) && isNotEmpty(attributes['iconSpacing']) && attributes['iconPosition'] === 'left' && data.push({
        'type': 'plain',
        'id': 'iconPosition',
        'responsive': true,
        'selector': `.${elementId} .accordion-item .accordion-icon`,
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
        'multiAttr': {
            'iconSpacing': attributes['iconSpacing']
        }
    });

    isNotEmpty(attributes['iconPosition']) && isNotEmpty(attributes['iconSpacing']) && attributes['iconPosition'] === 'right' && data.push({
        'type': 'plain',
        'id': 'iconPosition',
        'responsive': true,
        'selector': `.${elementId} .accordion-item .accordion-icon`,
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
        'multiAttr': {
            'iconSpacing': attributes['iconSpacing']
        }
    });

    /**Panel Title */
    isNotEmpty(attributes['titleAlign']) && data.push({
        'type': 'plain',
        'id': 'titleAlign',
        'selector': `.${elementId} .accordion-item .accordion-text`,
        'properties': [
            {
                'name': 'text-align',
                'valueType': 'direct'
            }
        ],
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
        'properties': [
            {
                'name': 'padding',
                'valueType': 'direct'
            }
        ],
        'selector': `.${elementId} .accordion-item .accordion-heading`,
    });

    isNotEmpty(attributes['titleTextColor']) && data.push({
        'type': 'color',
        'id': 'titleTextColor',
        'selector': `.${elementId} .accordion-item .accordion-text`,
        'properties': [
            {
                'name': 'color',
                'valueType': 'direct'
            }
        ],
    });

    isNotEmpty(attributes['titleBackgroundColor']) && data.push({
        'type': 'color',
        'id': 'titleBackgroundColor',
        'selector': `.${elementId} .accordion-item .accordion-heading`,
        'properties': [
            {
                'name': 'background-color',
                'valueType': 'direct'
            }
        ],
    });

    isNotEmpty(attributes['titleBackground']) && data.push({
        'type': 'background',
        'id': 'titleBackground',
        'selector': `.${elementId} .accordion-item .accordion-heading`,
    });

    isNotEmpty(attributes['titleBorder']) && data.push({
        'type': 'border',
        'id': 'titleBorder',
        'selector': `.${elementId} .accordion-item .accordion-heading`,
    });

    isNotEmpty(attributes['titleBorderResponsive']) && data.push({
        'type': 'borderResponsive',
        'responsive': true,
        'id': 'titleBorderResponsive',
        'selector': `.${elementId} .accordion-item .accordion-heading`,
    });

    isNotEmpty(attributes['titleActiveColor']) && data.push({
        'type': 'color',
        'id': 'titleActiveColor',
        'selector': `.${elementId} .accordion-item.active .accordion-text`,
        'properties': [
            {
                'name': 'color',
                'valueType': 'direct'
            }
        ],
    });

    isNotEmpty(attributes['titleBackgroundActiveColor']) && data.push({
        'type': 'color',
        'id': 'titleBackgroundActiveColor',
        'selector': `.${elementId} .accordion-item.active .accordion-heading`,
        'properties': [
            {
                'name': 'background-color',
                'valueType': 'direct'
            }
        ],
    });

    isNotEmpty(attributes['titleActiveBackground']) && data.push({
        'type': 'background',
        'id': 'titleActiveBackground',
        'selector': `.${elementId} .accordion-item.active .accordion-heading`,
    });

    isNotEmpty(attributes['titleBorderActive']) && data.push({
        'type': 'border',
        'id': 'titleBorderActive',
        'selector': `.${elementId} .accordion-item.active .accordion-heading`,
    });

    isNotEmpty(attributes['titleBorderActiveResponsive']) && data.push({
        'type': 'borderResponsive',
        'responsive': true,
        'id': 'titleBorderActiveResponsive',
        'selector': `.${elementId} .accordion-item.active .accordion-heading`,
    });

    /**Panel List */
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
        'properties': [
            {
                'name': 'box-shadow',
                'valueType': 'direct'
            }
        ],
        'selector': `.editor-styles-wrapper .is-root-container .${elementId}`,
    });

    isNotEmpty(attributes['boxShadowHover']) && data.push({
        'type': 'boxShadow',
        'id': 'boxShadowHover',
        'properties': [
            {
                'name': 'box-shadow',
                'valueType': 'direct'
            }
        ],
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
        'properties': [
            {
                'name': 'padding',
                'valueType': 'direct'
            }
        ],
        'selector': `.editor-styles-wrapper .is-root-container .${elementId}`,
    });

    isNotEmpty(attributes['margin']) && data.push({
        'type': 'dimension',
        'id': 'margin',
        'responsive': true,
        'properties': [
            {
                'name': 'margin',
                'valueType': 'direct'
            }
        ],
        'selector': `.editor-styles-wrapper .is-root-container .${elementId}`,
    });

    isNotEmpty(attributes['zIndex']) && data.push({
        'type': 'plain',
        'id': 'zIndex',
        'responsive': true,
        'properties': [
            {
                'name': 'z-index',
                'valueType': 'direct'
            }
        ],
        'selector': `.editor-styles-wrapper .is-root-container .${elementId}`,
    });

    isNotEmpty(attributes['animation']) && isNotEmpty(attributes['animation']['delay']) && data.push({
        'type': 'plain',
        'id': 'animation',
        'selector': `.editor-styles-wrapper .is-root-container .${elementId}`,
        'properties': [
            {
                'name': 'animation-delay',
                'valueType': 'pattern',
                'pattern': '{value}ms',
                'patternValues': {
                    'value': {
                        'type': 'attribute',
                        'key': 'delay',
                    },

                }
            }
        ],
    });

    //Positioning Panel
    isNotEmpty(attributes['positioningType']) && data.push(
        {
            'type': 'positioning',
            'id': 'positioningType',
            'selector': `.${elementId}`,
            'skipDeviceType': 'first',
            'attributeType': 'type',
            'multiAttr': {
                'positioningType': attributes['positioningType'],
                'inBlock': attributes['inBlock']
            }
        },
    );
    isNotEmpty(attributes['positioningType']) && isNotEmpty(attributes['positioningWidth']) && data.push(
        {
            'type': 'positioning',
            'id': 'positioningType',
            'selector': `.${elementId}`,
            'skipDeviceType': 'second',
            'attributeType': 'type',
            'multiAttr': {
                'positioningWidth': attributes['positioningWidth'],
                'positioningType': attributes['positioningType'],
                'inBlock': attributes['inBlock']
            }
        }
    );
    isNotEmpty(attributes['positioningWidth']) && isNotEmpty(attributes['positioningType']) && data.push({
        'type': 'positioning',
        'id': 'positioningWidth',
        'selector': `.${elementId}`,
        'skipDeviceType': 'first',
        'attributeType': 'width',
        'multiAttr': {
            'positioningWidth': attributes['positioningWidth'],
            'positioningType': attributes['positioningType'],
            'inBlock': attributes['inBlock']
        }
    });
    isNotEmpty(attributes['positioningAlign']) && data.push(
        {
            'type': 'plain',
            'id': 'positioningAlign',
            'responsive': true,
            'properties': [
                {
                    'name': 'align-self',
                    'valueType': 'direct'
                }
            ],
            'selector': `.${elementId}`,
        },
        {
            'type': 'positioning',
            'id': 'positioningAlign',
            'properties': [
                {
                    'name': 'vertical-align',
                    'valueType': 'direct'
                }
            ],
            'attributeType': 'align',
            'selector': `.${elementId}`,
        }
    );
    isNotEmpty(attributes['positioningLocation']) && attributes['positioningLocation'] !== 'default' && data.push({
        'type': 'plain',
        'id': 'positioningLocation',
        'properties': [
            {
                'name': 'position',
                'valueType': 'direct'
            }
        ],
        'selector': `.${elementId}`,
    });
    isNotEmpty(attributes['positioningLeft']) && isNotEmpty(attributes['positioningLocation']) && attributes['positioningLocation'] !== 'default' && data.push({
        'type': 'positioning',
        'id': 'positioningLeft',
        'properties': [
            {
                'name': 'left',
                'valueType': 'direct'
            }
        ],
        'responsive': true,
        'selector': `.${elementId}`,
        'attributeType': 'custom',
    });
    isNotEmpty(attributes['positioningRight']) && isNotEmpty(attributes['positioningLocation']) && attributes['positioningLocation'] !== 'default' && data.push({
        'type': 'positioning',
        'id': 'positioningRight',
        'properties': [
            {
                'name': 'right',
                'valueType': 'direct'
            }
        ],
        'responsive': true,
        'selector': `.${elementId}`,
        'attributeType': 'custom',
    });
    isNotEmpty(attributes['positioningTop']) && isNotEmpty(attributes['positioningLocation']) && attributes['positioningLocation'] !== 'default' && data.push({
        'type': 'positioning',
        'id': 'positioningTop',
        'properties': [
            {
                'name': 'top',
                'valueType': 'direct'
            }
        ],
        'responsive': true,
        'selector': `.${elementId}`,
        'attributeType': 'custom',
    });
    isNotEmpty(attributes['positioningBottom']) && isNotEmpty(attributes['positioningLocation']) && attributes['positioningLocation'] !== 'default' && data.push({
        'type': 'positioning',
        'id': 'positioningBottom',
        'properties': [
            {
                'name': 'bottom',
                'valueType': 'direct'
            }
        ],
        'responsive': true,
        'selector': `.${elementId}`,
        'attributeType': 'custom',
    });

    return [
        ...data,
        ...applyFilters(
            'gutenverse.accordions.blockStyle',
            [],
            {
                elementId,
                attributes
            }
        )
    ];
};


export default getBlockStyle;