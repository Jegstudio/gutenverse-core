import { isNotEmpty } from 'gutenverse-core/helper';

const getBlockStyle = (elementId, attributes) => {
    let data = [];
    /**Panel Category */
    isNotEmpty(attributes['categoryColor']) && data.push({
        'type': 'color',
        'id': 'categoryColor',
        'selector': `.${elementId}.guten-gallery .gallery-items .gallery-item-wrap .grid-item .caption-wrap .caption-category span`,
        'properties': [
            {
                'name' : 'color',
                'valueType' : 'direct'
            }
        ]
    });

    isNotEmpty(attributes['categoryTypography']) && data.push({
        'type': 'typography',
        'id': 'categoryTypography',
        'selector': `.${elementId}.guten-gallery .gallery-items .gallery-item-wrap .grid-item .caption-wrap .caption-category span`,
    });

    isNotEmpty(attributes['categoryBackground']) && data.push({
        'type': 'background',
        'id': 'categoryBackground',
        'selector': `.${elementId}.guten-gallery .gallery-items .gallery-item-wrap .grid-item .caption-wrap .caption-category span`,
    });

    isNotEmpty(attributes['categoryPadding']) && data.push({
        'type': 'dimension',
        'id': 'categoryPadding',
        'responsive': true,
        'selector': `.${elementId}.guten-gallery .gallery-items .gallery-item-wrap .grid-item .caption-wrap .caption-category span`,
        'properties': [
            {
                'name' : 'padding',
                'valueType' : 'direct'
            }
        ]
    });

    isNotEmpty(attributes['categoryMargin']) && data.push({
        'type': 'dimension',
        'id': 'categoryMargin',
        'responsive' : true,
        'selector': `.${elementId}.guten-gallery .gallery-items .gallery-item-wrap .grid-item .caption-wrap .caption-category span`,
        'properties': [
            {
                'name' : 'margin',
                'valueType' : 'direct'
            }
        ]
    });

    isNotEmpty(attributes['categoryBorderRadius']) && data.push({
        'type': 'dimension',
        'id': 'categoryBorderRadius',
        'responsive' : true,
        'selector': `.${elementId}.guten-gallery .gallery-items .gallery-item-wrap .grid-item .caption-wrap .caption-category span`,
        'properties': [
            {
                'name' : 'border-radius',
                'valueType' : 'direct',
                'multiDimension' : false,
            }
        ]
    });

    /**Panel Filter Search */
    isNotEmpty(attributes['searchControlWidth']) && data.push({
        'type': 'unitPoint',
        'id': 'searchControlWidth',
        'responsive' : true,
        'selector': `.${elementId}.guten-gallery .search-filters-wrap`,
        'properties': [
            {
                'name' : 'width',
                'valueType' : 'direct'
            }
        ]
    });

    isNotEmpty(attributes['fitlerSearchControlWidth']) && data.push({
        'type': 'unitPoint',
        'id': 'fitlerSearchControlWidth',
        'responsive' : true,
        'selector': `.${elementId}.guten-gallery .search-filters-wrap .filter-wrap`,
        'properties': [
            {
                'name' : 'flex-basis',
                'valueType' : 'direct'
            }
        ]
    });

    isNotEmpty(attributes['fitlerSearchFormWidth']) && data.push({
        'type': 'unitPoint',
        'id': 'fitlerSearchFormWidth',
        'responsive' : true,
        'selector': `.${elementId}.guten-gallery .search-filters-wrap .guten-gallery-search-box`,
        'properties': [
            {
                'name' : 'flex-basis',
                'valueType' : 'direct'
            }
        ]
    });

    isNotEmpty(attributes['filterSearchTypography']) && data.push({
        'type': 'typography',
        'id': 'filterSearchTypography',
        'selector': `.${elementId}.guten-gallery .search-filters-wrap .filter-wrap span, .${elementId}.guten-gallery .search-filters-wrap .filter-wrap ul.search-filter-controls li, .${elementId}.guten-gallery .search-filters-wrap form.guten-gallery-search-box input[type=text]`,
    });

    isNotEmpty(attributes['filterSearchIconSpacing']) && data.push({
        'type': 'unitPoint',
        'id': 'filterSearchIconSpacing',
        'responsive' : true,
        'selector': `.${elementId}.guten-gallery .search-filter-trigger.icon-position-after i`,
        'properties': [
            {
                'name' : 'margin-left',
                'valueType' : 'direct'
            }
        ]
    });

    isNotEmpty(attributes['filterSearchIconSpacing']) && data.push({
        'type': 'unitPoint',
        'id': 'filterSearchIconSpacing',
        'responsive' : true,
        'selector': `.${elementId}.guten-gallery .search-filter-trigger.icon-position-before i`,
        'properties': [
            {
                'name' : 'margin-right',
                'valueType' : 'direct'
            }
        ]
    });

    isNotEmpty(attributes['filterSearchIconSize']) && data.push({
        'type': 'unitPoint',
        'id': 'filterSearchIconSize',
        'responsive' : true,
        'selector': `.${elementId}.guten-gallery .search-filter-trigger i`,
        'properties': [
            {
                'name' : 'font-size',
                'valueType' : 'direct'
            }
        ]
    });

    isNotEmpty(attributes['filterSearchTextBackground']) && data.push({
        'type': 'color',
        'id': 'filterSearchTextBackground',
        'responsive' : true,
        'selector': `.${elementId}.guten-gallery .search-filters-wrap .filter-wrap button.search-filter-trigger`,
        'properties': [
            {
                'name' : 'background-color',
                'valueType' : 'direct'
            }
        ]
    });

    isNotEmpty(attributes['filterSearchTextColor']) && data.push({
        'type': 'color',
        'id': 'filterSearchTextColor',
        'responsive' : true,
        'selector': `.${elementId}.guten-gallery .search-filters-wrap .filter-wrap button.search-filter-trigger`,
        'properties': [
            {
                'name' : 'color',
                'valueType' : 'direct'
            }
        ]
    });

    isNotEmpty(attributes['filterSearchBorder']) && data.push({
        'type': 'border',
        'id': 'filterSearchBorder',
        'selector': `.${elementId}.guten-gallery .search-filters-wrap .filter-wrap button.search-filter-trigger`,
    });

    isNotEmpty(attributes['filterSearchBorderResponsive']) && data.push({
        'type': 'borderResponsive',
        'id': 'filterSearchBorderResponsive',
        'selector': `.${elementId}.guten-gallery .search-filters-wrap .filter-wrap button.search-filter-trigger`,
    });

    isNotEmpty(attributes['filterSearchMargin']) && data.push({
        'type': 'dimension',
        'id': 'filterSearchMargin',
        'responsive' : true,
        'selector': `.${elementId}.guten-gallery .search-filters-wrap .filter-wrap`,
        'properties': [
            {
                'name' : 'margin',
                'valueType' : 'direct'
            }
        ]
    });

    isNotEmpty(attributes['filterSearchBoxShadow']) && data.push({
        'type': 'boxShadow',
        'id': 'filterSearchBoxShadow',
        'properties': [
            {
                'name': 'box-shadow',
                'valueType': 'direct'
            }
        ],
        'selector': `.${elementId}.guten-gallery .search-filters-wrap .filter-wrap`,
    });

    isNotEmpty(attributes['filterSearchSeparatorSize']) && data.push({
        'type': 'plain',
        'id': 'filterSearchSeparatorSize',
        'responsive' : true,
        'selector': `.${elementId}.guten-gallery .search-filters-wrap .filter-wrap button.search-filter-trigger`,
        'properties': [
            {
                'name' : 'border-right-width',
                'valueType' : 'pattern',
                'pattern' : '{value}px',
                'patternValues' : {
                    'value': {
                        'type' : 'direct'
                    }
                }
            }
        ]
    });

    isNotEmpty(attributes['filterSearchSeparatorColor']) && data.push({
        'type': 'color',
        'id': 'filterSearchSeparatorColor',
        'selector': `.${elementId}.guten-gallery .search-filters-wrap .filter-wrap button.search-filter-trigger`,
        'properties': [
            {
                'name' : 'border-right-color',
                'valueType' : 'direct'
            }
        ]
    });

    isNotEmpty(attributes['filterSearchFormBackground']) && data.push({
        'type': 'color',
        'id': 'filterSearchFormBackground',
        'selector': `.${elementId}.guten-gallery .search-filters-wrap .guten-gallery-search-box`,
        'properties' : [
            {
                'name' : 'background-color',
                'valueType' : 'direct'
            }
        ]
    });

    isNotEmpty(attributes['filterSearchFormTextColor']) && data.push({
        'type': 'color',
        'id': 'filterSearchFormTextColor',
        'selector': `.${elementId}.guten-gallery .search-filters-wrap form.guten-gallery-search-box input[type=text], .${elementId}.guten-gallery .search-filters-wrap form.guten-gallery-search-box input[type=text]::placeholder`,
        'properties' : [
            {
                'name' : 'color',
                'valueType' : 'direct'
            }
        ]
    });

    isNotEmpty(attributes['filterSearchFormBorder']) && data.push({
        'type': 'border',
        'id': 'filterSearchFormBorder',
        'selector': `.${elementId}.guten-gallery .search-filters-wrap .guten-gallery-search-box`,
    });

    isNotEmpty(attributes['filterSearchFormBorderResponsive']) && data.push({
        'type': 'borderResponsive',
        'id': 'filterSearchFormBorderResponsive',
        'selector': `.${elementId}.guten-gallery .search-filters-wrap .guten-gallery-search-box`,
    });

    isNotEmpty(attributes['filterSearchFormBoxShadow']) && data.push({
        'type': 'boxShadow',
        'id': 'filterSearchFormBoxShadow',
        'properties': [
            {
                'name': 'box-shadow',
                'valueType': 'direct'
            }
        ],
        'selector': `.${elementId}.guten-gallery .search-filters-wrap .guten-gallery-search-box`,
    });

    isNotEmpty(attributes['filterSearchDropdownTextColor']) && data.push({
        'type': 'color',
        'id': 'filterSearchDropdownTextColor',
        'selector': `.${elementId}.guten-gallery .search-filters-wrap .filter-wrap ul.search-filter-controls li`,
        'properties' : [
            {
                'name' : 'color',
                'valueType' : 'direct'
            }
        ]
    });

    isNotEmpty(attributes['filterSearchDropdownTextColorHover']) && data.push({
        'type': 'color',
        'id': 'filterSearchDropdownTextColorHover',
        'selector': `.${elementId}.guten-gallery .search-filters-wrap .filter-wrap ul.search-filter-controls li:hover`,
        'properties' : [
            {
                'name' : 'color',
                'valueType' : 'direct'
            }
        ]
    });

    isNotEmpty(attributes['filterSearchDropdownBackground']) && data.push({
        'type': 'background',
        'id': 'filterSearchDropdownBackground',
        'selector': `.${elementId}.guten-gallery .search-filters-wrap .filter-wrap ul.search-filter-controls`,
    });

    isNotEmpty(attributes['filterSearchDropdownBorder']) && data.push({
        'type': 'border',
        'id': 'filterSearchDropdownBorder',
        'selector': `.${elementId}.guten-gallery .search-filters-wrap .filter-wrap ul.search-filter-controls`,
    });

    isNotEmpty(attributes['filterSearchDropdownBorderResponsive']) && data.push({
        'type': 'borderResponsive',
        'id': 'filterSearchDropdownBorderResponsive',
        'selector': `.${elementId}.guten-gallery .search-filters-wrap .filter-wrap ul.search-filter-controls`,
    });

    isNotEmpty(attributes['filterSearchDropdownPadding']) && data.push({
        'type': 'dimension',
        'id': 'filterSearchDropdownPadding',
        'responsive' : true,
        'selector': `.${elementId}.guten-gallery .search-filters-wrap .filter-wrap ul.search-filter-controls`,
        'properties': [
            {
                'name' : 'padding',
                'valueType' : 'direct'
            }
        ]
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
        'selector': `.editor-styles-wrapper .is-root-container .${elementId}`,
    });

    //Positioning Panel
    isNotEmpty(attributes['positioningType']) && data.push(
        {
            'type': 'positioning',
            'id': 'positioningType',
            'selector': `.wp-block-gutenverse-heading.${elementId}`,
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
            'selector': `.wp-block-gutenverse-heading.${elementId}`,
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
        'selector': `.wp-block-gutenverse-heading.${elementId}`,
        'skipDeviceType': 'first',
        'attributeType': 'width',
        'multiAttr': {
            'positioningWidth': attributes['positioningWidth'],
            'positioningType': attributes['positioningType'],
            'inBlock': attributes['inBlock']
        }
    });
    isNotEmpty(attributes['positioningAlign']) && data.push({
        'type': 'plain',
        'id': 'positioningAlign',
        'responsive': true,
        'properties': [
            {
                'name' : 'align-self',
                'valueType' : 'direct'
            }
        ],
        'selector': `.wp-block-gutenverse-heading.${elementId}`,
    },
    {
        'type': 'positioning',
        'id': 'positioningAlign',
        'property': ['vertical-align'],
        'attributeType': 'align',
        'selector': `.wp-block-gutenverse-heading.${elementId}`,
    });
    isNotEmpty(attributes['positioningLocation']) && attributes['positioningLocation'] !== 'default' && data.push({
        'type': 'plain',
        'id': 'positioningLocation',
        'properties': [
            {
                'name' : 'position',
                'valueType' : 'direct'
            }
        ],
        'selector': `.wp-block-gutenverse-heading.${elementId}`,
    });
    isNotEmpty(attributes['positioningLeft']) && isNotEmpty(attributes['positioningLocation']) && attributes['positioningLocation'] !== 'default' && data.push({
        'type': 'positioning',
        'id': 'positioningLeft',
        'property': ['left'],
        'responsive': true,
        'selector': `.wp-block-gutenverse-heading.${elementId}`,
        'attributeType': 'custom',
    });
    isNotEmpty(attributes['positioningRight']) && isNotEmpty(attributes['positioningLocation']) && attributes['positioningLocation'] !== 'default' && data.push({
        'type': 'positioning',
        'id': 'positioningRight',
        'property': ['right'],
        'responsive': true,
        'selector': `.wp-block-gutenverse-heading.${elementId}`,
        'attributeType': 'custom',
    });
    isNotEmpty(attributes['positioningTop']) && isNotEmpty(attributes['positioningLocation']) && attributes['positioningLocation'] !== 'default' && data.push({
        'type': 'positioning',
        'id': 'positioningTop',
        'property': ['top'],
        'responsive': true,
        'selector': `.wp-block-gutenverse-heading.${elementId}`,
        'attributeType': 'custom',
    });
    isNotEmpty(attributes['positioningBottom']) && isNotEmpty(attributes['positioningLocation']) && attributes['positioningLocation'] !== 'default' && data.push({
        'type': 'positioning',
        'id': 'positioningBottom',
        'property': ['bottom'],
        'responsive': true,
        'selector': `.wp-block-gutenverse-heading.${elementId}`,
        'attributeType': 'custom',
    });

    return data;
};

export default getBlockStyle;