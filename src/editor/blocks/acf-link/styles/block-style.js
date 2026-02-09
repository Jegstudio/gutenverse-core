import { isNotEmpty } from 'gutenverse-core/helper';
import { applyFilters } from '@wordpress/hooks';
import { backgroundStyle } from 'gutenverse-core/controls';
import { getDeviceType } from 'gutenverse-core/editor-helper';

const getBlockStyle = (elementId, attributes) => {
    let data = [];
    data = backgroundStyle({ attributes, data, elementId });
    const device = getDeviceType();

    // Simplified replication of Button styles for ACF Link
    // Alignment
     isNotEmpty(attributes['alignButton']) && data.push({
        'type': 'plain',
        'id': 'alignButton',
        'selector': `.editor-styles-wrapper .${elementId} .guten-acf-link-wrapper`,
        'properties': [
            {
                'name': 'justify-content',
                'valueType': 'direct'
            }
        ],
        'responsive': true,
    });

    // Button Styling (Width, Height, Padding, etc.)
     isNotEmpty(attributes['paddingButton']) && data.push({
        'type': 'dimension',
        'id': 'paddingButton',
        'responsive': true,
        'properties': [
            {
                'name': 'padding',
                'valueType': 'direct'
            }
        ],
        'selector': `.editor-styles-wrapper .${elementId} .guten-button`,
    });

     // Colors
    isNotEmpty(attributes['color']) && data.push({
        'type': 'color',
        'id': 'color',
        'selector': `.editor-styles-wrapper .${elementId} .guten-button span`,
        'properties': [
            {
                'name': 'color',
                'valueType': 'direct'
            }
        ],
    });

    isNotEmpty(attributes['buttonBackground']) && data.push({
        'type': 'background',
        'id': 'buttonBackground',
        'selector': `.editor-styles-wrapper .${elementId} .guten-button`,
        'responsive': true
    });

    // Borders
     isNotEmpty(attributes['buttonBorder']) && data.push({
        'type': 'border',
        'id': 'buttonBorder',
        'selector': `.editor-styles-wrapper .${elementId} .guten-button`,
    });

    // Box Model (Wrapper)
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
        'selector': `.editor-styles-wrapper .is-root-container .${elementId}.guten-element`,
    });

    // ... (Add more as needed consistent with Button block)

    return [
        ...data,
        ...applyFilters(
            'gutenverse.acf-link.blockStyle',
            [],
            {
                elementId,
                attributes
            }
        )
    ];
};

export default getBlockStyle;
