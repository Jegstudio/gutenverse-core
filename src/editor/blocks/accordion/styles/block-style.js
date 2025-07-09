import { applyFilters } from '@wordpress/hooks';
import { isNotEmpty } from 'gutenverse-core/helper';

const getBlockStyle = (elementId, attributes) => {
    let data = [];
    isNotEmpty(attributes['contentBackgroundColor']) && data.push({
        'type': 'color',
        'id': 'contentBackgroundColor',
        'selector': `.${elementId}.accordion-item .accordion-content:first-child`,
        'properties': [
            {
                'name': 'background-color',
                'valueType': 'direct',
            }
        ],
    });

    isNotEmpty(attributes['contentBackgroundColorClosed']) && data.push({
        'type': 'color',
        'id': 'contentBackgroundColorClosed',
        'selector': `.${elementId}.accordion-item .accordion-body.closed .accordion-content:first-child`,
        'properties': [
            {
                'name': 'background-color',
                'valueType': 'direct',
                'important': true,
            }
        ],
    });

    isNotEmpty(attributes['contentBackgroundColorHover']) && data.push({
        'type': 'color',
        'id': 'contentBackgroundColorHover',
        'selector': `.${elementId}.accordion-item .accordion-body:not(.closed) .accordion-content:first-child:hover`,
        'properties': [
            {
                'name': 'background-color',
                'valueType': 'direct',
                'important': true,
            }
        ],
    });

    isNotEmpty(attributes['contentTextColor']) && data.push({
        'type': 'color',
        'id': 'contentTextColor',
        'selector': `.${elementId}.accordion-item .accordion-content:first-child`,
        'properties': [
            {
                'name': 'color',
                'valueType': 'direct',
                'important': true,
            }
        ],
    });

    isNotEmpty(attributes['contentTextColorClosed']) && data.push({
        'type': 'color',
        'id': 'contentTextColorClosed',
        'selector': `.${elementId}.accordion-item .accordion-body.closed .accordion-content:first-child`,
        'properties': [
            {
                'name': 'color',
                'valueType': 'direct',
                'important': true,
            }
        ],
    });

    isNotEmpty(attributes['contentTextColorHover']) && data.push({
        'type': 'color',
        'id': 'contentTextColor',
        'selector': `.${elementId}.accordion-item .accordion-body:not(.closed) .accordion-content:first-child:hover`,
        'properties': [
            {
                'name': 'color',
                'valueType': 'direct',
                'important': true,
            }
        ],
    });

    return [
        ...data,
        ...applyFilters(
            'gutenverse.accordion.blockStyle',
            [],
            {
                elementId,
                attributes
            }
        )
    ];
};


export default getBlockStyle;