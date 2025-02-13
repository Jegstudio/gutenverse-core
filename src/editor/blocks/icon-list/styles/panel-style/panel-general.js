import { isNotEmpty } from 'gutenverse-core/helper';

const panelGeneralStyle = (elementId, attributes, data) => {
    isNotEmpty(attributes['isDivider']) && data.push({
        'type': 'plain',
        'id': 'isDivider',
        'properties': [
            {
                'name': 'border-top-style',
                'valueType': 'pattern',
                'pattern': 'solid'
            }
        ],
        'selector': `.${elementId}:not(.inline-icon-list) .guten-icon-list-item:not(:nth-child(1))`,
    });

    isNotEmpty(attributes['isDivider']) && data.push({
        'type': 'plain',
        'id': 'isDivider',
        'properties': [
            {
                'name': 'border-left-style',
                'valueType': 'pattern',
                'pattern': 'solid'
            }
        ],
        'selector': `.${elementId}.inline-icon-list .guten-icon-list-item:not(:nth-child(1))`,
    });

    isNotEmpty(attributes['colorDivider']) && data.push({
        'type': 'color',
        'id': 'colorDivider',
        'selector': `.${elementId}:not(.inline-icon-list) .guten-icon-list-item:not(:nth-child(1))`,
        'properties': [
            {
                'name': 'color',
                'valueType': 'direct'
            }
        ]
    });

    isNotEmpty(attributes['colorDivider']) && data.push({
        'type': 'color',
        'id': 'colorDivider',
        'selector': `.${elementId}.inline-icon-list .guten-icon-list-item:not(:nth-child(1))`,
        'properties': [
            {
                'name': 'color',
                'valueType': 'direct'
            }
        ]
    });

    isNotEmpty(attributes['typeDivider']) && data.push({
        'type': 'plain',
        'id': 'typeDivider',
        'selector': `.${elementId}:not(.inline-icon-list) .guten-icon-list-item:not(:nth-child(1))`,
        'properties': [
            {
                'name': 'border-top-style',
                'valueType': 'direct'
            }
        ]
    });

    isNotEmpty(attributes['typeDivider']) && data.push({
        'type': 'plain',
        'id': 'typeDivider',
        'selector': `.${elementId}.inline-icon-list .guten-icon-list-item:not(:nth-child(1))`,
        'properties': [
            {
                'name': 'border-left-style',
                'valueType': 'direct'
            }
        ]
    });

    isNotEmpty(attributes['widthDivider']) && data.push({
        'type': 'unitPoint',
        'id': 'widthDivider',
        'selector': `.${elementId}:not(.inline-icon-list) .guten-icon-list-item`,
        'properties': [
            {
                'name': 'width',
                'valueType': 'direct'
            }
        ]
    });

    isNotEmpty(attributes['widthDivider']) && data.push({
        'type': 'unitPoint',
        'id': 'widthDivider',
        'selector': `.${elementId}.inline-icon-list .guten-icon-list-item`,
        'properties': [
            {
                'name': 'height',
                'valueType': 'direct'
            }
        ]
    });

    isNotEmpty(attributes['sizeDivider']) && data.push({
        'type': 'unitPoint',
        'id': 'sizeDivider',
        'selector': `.${elementId}:not(.inline-icon-list) .guten-icon-list-item:not(:nth-child(1))`,
        'properties': [
            {
                'name': 'border-top-width',
                'valueType': 'direct'
            }
        ]
    });

    isNotEmpty(attributes['sizeDivider']) && data.push({
        'type': 'unitPoint',
        'id': 'sizeDivider',
        'selector': `.${elementId}.inline-icon-list .guten-icon-list-item:not(:nth-child(1))`,
        'properties': [
            {
                'name': 'border-left-width',
                'valueType': 'direct'
            }
        ]
    });

    isNotEmpty(attributes['spaceBetween']) && data.push({
        'type': 'plain',
        'id': 'spaceBetween',
        'responsive': true,
        'properties': [
            {
                'name': 'margin-top',
                'valueType': 'pattern',
                'pattern': 'calc({value}px/2)',
                'patternValues': {
                    'value': {
                        'type': 'direct'
                    }
                }
            }
        ],
        'selector': `.${elementId}:not(.inline-icon-list) li.guten-icon-list-item:not(:first-of-type) > a, .block-editor-block-list__layout .wp-block.${elementId}:not(.inline-icon-list) li.guten-icon-list-item:not(:first-of-type) > a`,
    });

    isNotEmpty(attributes['spaceBetween']) && data.push({
        'type': 'plain',
        'id': 'spaceBetween',
        'responsive': true,
        'properties': [
            {
                'name': 'padding-bottom',
                'valueType': 'pattern',
                'pattern': 'calc({value}px/2)',
                'patternValues': {
                    'value': {
                        'type': 'direct'
                    }
                }
            }
        ],
        'selector': `.${elementId}:not(.inline-icon-list) .guten-icon-list-item:not(:last-child), .block-editor-block-list__layout .wp-block.${elementId}:not(.inline-icon-list) .guten-icon-list-item:not(:last-child)`,
    });

    isNotEmpty(attributes['spaceBetween']) && data.push({
        'type': 'plain',
        'id': 'spaceBetween',
        'responsive': true,
        'properties': [
            {
                'name': 'margin-right',
                'valueType': 'pattern',
                'pattern': 'calc({value}px/2)',
                'patternValues': {
                    'value': {
                        'type': 'direct'
                    }
                }
            }
        ],
        'selector': `.${elementId}.inline-icon-list .guten-icon-list-item:not(:last-child), .block-editor-block-list__layout .wp-block.${elementId}.inline-icon-list .guten-icon-list-item:not(:last-child)`,
    });
    isNotEmpty(attributes['spaceBetween']) && data.push({
        'type': 'plain',
        'id': 'spaceBetween',
        'responsive': true,
        'properties': [
            {
                'name': 'margin-left',
                'valueType': 'pattern',
                'pattern': 'calc({value}px/2)',
                'patternValues': {
                    'value': {
                        'type': 'direct'
                    }
                }
            }
        ],
        'selector': `.${elementId}.inline-icon-list li.guten-icon-list-item:not(li:first-of-type) > a, .block-editor-block-list__layout .wp-block.${elementId}.inline-icon-list li.guten-icon-list-item:not(li:first-of-type) > a`,
    });

    isNotEmpty(attributes['alignList']) && data.push({
        'type': 'plain',
        'id': 'alignList',
        'responsive': true,
        'properties': [
            {
                'name': 'text-align',
                'valueType': 'function',
                'functionName': 'handleAlign'
            }
        ],
        'selector': `.${elementId}:not(.inline-icon-list)`,
    });
    isNotEmpty(attributes['alignList']) && data.push({
        'type': 'plain',
        'id': 'alignList',
        'responsive': true,
        'properties': [
            {
                'name': 'justify-content',
                'valueType': 'direct',
            }
        ],
        'selector': `.${elementId}.inline-icon-list, .${elementId}:not(.inline-icon-list) .guten-icon-list-item a`,
    });

    if (attributes['displayInline']) {
        isNotEmpty(attributes['verticalAlign']) && data.push({
            'type': 'plain',
            'id': 'verticalAlign',
            'responsive': true,
            'properties': [
                {
                    'name': 'align-items',
                    'valueType': 'direct'
                }
            ],
            'selector': `.${elementId} li`,
        });
    } else {
        isNotEmpty(attributes['verticalAlign']) && data.push({
            'type': 'plain',
            'id': 'verticalAlign',
            'responsive': true,
            'properties': [
                {
                    'name': 'align-items',
                    'valueType': 'direct'
                }
            ],
            'selector': `.${elementId} li a`,
        });
    }
    return data;
};

export default panelGeneralStyle;