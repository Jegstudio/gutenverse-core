import { isNotEmpty } from 'gutenverse-core/helper';
import { getDeviceType } from 'gutenverse-core/editor-helper';

const contentStyle = (elementId, attributes, data) => {

    const deviceType = getDeviceType();

    isNotEmpty(attributes['contentAlignment']) && data.push({
        'type': 'plain',
        'id': 'contentAlignment',
        'responsive': true,
        'selector': `.${elementId} .taxonomy-list-item`,
        'properties': [
            {
                'name': 'justify-content',
                'valueType': 'direct',
            }
        ],
    });

    // Vertical
    isNotEmpty(attributes['contentSpacing']) && data.push({
        'type': 'unitPoint',
        'id': 'contentSpacing',
        'responsive': true,
        'selector': `.${elementId} .taxonomy-list-wrapper`,
        'properties': [
            {
                'name': 'row-gap',
                'valueType': 'pattern',
                'pattern': '{value}',
                'patternValues': {
                    'value': {
                        'type': 'direct'
                    }
                }
            }
        ],
    });

    // Horizontal
    isNotEmpty(attributes['contentSpacingHorizontal']) && attributes['layout'] !== 'column' && data.push({
        'type': 'unitPoint',
        'id': 'contentSpacingHorizontal',
        'responsive': true,
        'selector': `.${elementId} .taxonomy-list-wrapper`,
        'properties': [
            {
                'name': 'column-gap',
                'valueType': 'pattern',
                'pattern': '{value}',
                'patternValues': {
                    'value': {
                        'type': 'direct'
                    }
                }
            }
        ],
    });

    isNotEmpty(attributes['itemWidth']) && isNotEmpty(attributes['itemWidth'][deviceType]) && attributes['itemWidth'][deviceType] !== 'custom' && attributes['layout'] === 'row' && data.push({
        'type': 'plain',
        'id': 'itemWidth',
        'responsive': true,
        'properties': [
            {
                'name': 'width',
                'valueType': 'direct',
            }
        ],
        'selector': `.${elementId} .taxonomy-list-wrapper .taxonomy-list-item`,
    });

    isNotEmpty(attributes['customItemWidth']) && isNotEmpty(attributes['itemWidth']) && isNotEmpty(attributes['itemWidth'][deviceType]) && attributes['itemWidth'][deviceType] === 'custom' && attributes['layout'] === 'row' && data.push({
        'type': 'unitPoint',
        'id': 'customItemWidth',
        'responsive': true,
        'properties': [
            {
                'name': 'width',
                'valueType': 'direct'
            }
        ],
        'selector': `.${elementId} .taxonomy-list-wrapper .taxonomy-list-item`,
    });

    isNotEmpty(attributes['contentTypography']) && data.push({
        'type': 'typography',
        'id': 'contentTypography',
        'selector': `.${elementId} .taxonomy-list-wrapper .taxonomy-list-item a .taxonomy-list-content`,
    });

    isNotEmpty(attributes['contentColor']) && data.push({
        'type': 'color',
        'id': 'contentColor',
        'selector': `.${elementId} .taxonomy-list-wrapper .taxonomy-list-item a`,
        'properties': [
            {
                'name': 'color',
                'valueType': 'direct'
            }
        ]
    });

    isNotEmpty(attributes['contentColorHover']) && data.push({
        'type': 'color',
        'id': 'contentColorHover',
        'selector': `.${elementId} .taxonomy-list-wrapper .taxonomy-list-item a:hover`,
        'properties': [
            {
                'name': 'color',
                'valueType': 'direct'
            }
        ]
    });
    return data;
};

export default contentStyle;