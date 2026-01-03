import { getDeviceType } from 'gutenverse-core/editor-helper';
import { isNotEmpty } from 'gutenverse-core/helper';
import { applyFilters } from '@wordpress/hooks';
import { backgroundStyle } from 'gutenverse-core/controls';

const getBlockStyle = (elementId, attributes) => {
    let data = [];
    data = backgroundStyle({
        attributes,
        data,
        backgroundSelector: `.${elementId}:not(.background-animated), .${elementId}.background-animated > .guten-background-animated .animated-layer`,
        backgroundHoverSelector: `.${elementId}:not(.background-animated):hover, .${elementId}.background-animated:hover > .guten-background-animated .animated-layer`,
    });
    const device = getDeviceType();
    const selector = `.guten-flex-container.${elementId}`;

    // Container Width (when boxed)
    isNotEmpty(attributes['contentWidth']) && attributes['contentWidth'] === 'boxed' && isNotEmpty(attributes['containerWidth']) && data.push({
        'type': 'unitPoint',
        'id': 'containerWidth',
        'responsive': true,
        'selector': selector,
        'properties': [
            {
                'name': 'width',
                'valueType': 'direct'
            }
        ],
    });

    // Full Width
    isNotEmpty(attributes['contentWidth']) && attributes['contentWidth'] === 'full-width' && data.push({
        'type': 'plain',
        'id': 'contentWidth',
        'selector': selector,
        'properties': [
            {
                'name': 'width',
                'valueType': 'pattern',
                'pattern': '100%',
            },
            {
                'name': 'max-width',
                'valueType': 'pattern',
                'pattern': '100%',
            }
        ],
    });

    // Min Height
    isNotEmpty(attributes['minHeight']) && data.push({
        'type': 'unitPoint',
        'id': 'minHeight',
        'responsive': true,
        'selector': selector,
        'properties': [
            {
                'name': 'min-height',
                'valueType': 'direct'
            }
        ],
    });

    // Flex Direction
    isNotEmpty(attributes['flexDirection']) && data.push({
        'type': 'plain',
        'id': 'flexDirection',
        'responsive': true,
        'selector': `${selector}`,
        'properties': [
            {
                'name': 'flex-direction',
                'valueType': 'direct'
            }
        ],
    });

    // Justify Content
    isNotEmpty(attributes['justifyContent']) && data.push({
        'type': 'plain',
        'id': 'justifyContent',
        'responsive': true,
        'selector': `${selector}`,
        'properties': [
            {
                'name': 'justify-content',
                'valueType': 'direct'
            }
        ],
    });

    // Align Items
    isNotEmpty(attributes['alignItems']) && data.push({
        'type': 'plain',
        'id': 'alignItems',
        'responsive': true,
        'selector': `${selector}`,
        'properties': [
            {
                'name': 'align-items',
                'valueType': 'direct'
            }
        ],
    });

    // Column Gap
    isNotEmpty(attributes['columnGap']) && data.push({
        'type': 'unitPoint',
        'id': 'columnGap',
        'responsive': true,
        'selector': `${selector}`,
        'properties': [
            {
                'name': 'column-gap',
                'valueType': 'direct'
            }
        ],
    });

    // Row Gap
    isNotEmpty(attributes['rowGap']) && data.push({
        'type': 'unitPoint',
        'id': 'rowGap',
        'responsive': true,
        'selector': `${selector}`,
        'properties': [
            {
                'name': 'row-gap',
                'valueType': 'direct'
            }
        ],
    });

    // Flex Wrap
    isNotEmpty(attributes['flexWrap']) && data.push({
        'type': 'plain',
        'id': 'flexWrap',
        'responsive': true,
        'selector': `${selector}`,
        'properties': [
            {
                'name': 'flex-wrap',
                'valueType': 'direct'
            }
        ],
    });

    // Align Content (only when wrap is enabled)
    isNotEmpty(attributes['alignContent']) && isNotEmpty(attributes['flexWrap']) && attributes['flexWrap'][device] === 'wrap' && data.push({
        'type': 'plain',
        'id': 'alignContent',
        'responsive': true,
        'selector': `${selector}`,
        'properties': [
            {
                'name': 'align-content',
                'valueType': 'direct'
            }
        ],
    });

    // Overflow
    isNotEmpty(attributes['overflow']) && data.push({
        'type': 'plain',
        'id': 'overflow',
        'selector': selector,
        'properties': [
            {
                'name': 'overflow',
                'valueType': 'direct'
            }
        ],
    });

    return [
        ...data,
        ...applyFilters(
            'gutenverse.container.blockStyle',
            [],
            {
                elementId,
                attributes
            }
        )
    ];
};

export default getBlockStyle;
