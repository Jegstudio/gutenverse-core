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
        'selector': `.${elementId} .list-wrapper:not(.inline-icon-list) .guten-icon-list-item:not(:nth-child(1)) .list-divider`,
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
        'selector': `.${elementId} .list-wrapper.inline-icon-list .guten-icon-list-item:not(:nth-child(1)) .list-divider`,
    });

    isNotEmpty(attributes['colorDivider']) && data.push({
        'type': 'color',
        'id': 'colorDivider',
        'selector': `.${elementId} .list-wrapper:not(.inline-icon-list) .guten-icon-list-item:not(:nth-child(1)) .list-divider`,
        'properties': [
            {
                'name': 'border-color',
                'valueType': 'direct'
            }
        ]
    });

    isNotEmpty(attributes['spaceDivider']) && !attributes['displayInline'] && data.push({
        'type': 'plain',
        'id': 'spaceDivider',
        'responsive' : true,
        'selector': `.${elementId} .list-wrapper:not(.inline-icon-list) .guten-icon-list-item .list-divider`,
        'properties': [
            {
                'name': 'margin',
                'valueType': 'pattern',
                'pattern': '0 {value}px',
                'patternValues' : {
                    'value' : {
                        'type' : 'direct'
                    }
                }
            }
        ]
    });

    isNotEmpty(attributes['colorDivider']) && data.push({
        'type': 'color',
        'id': 'colorDivider',
        'selector': `.${elementId} .list-wrapper.inline-icon-list .guten-icon-list-item:not(:nth-child(1)) .list-divider`,
        'properties': [
            {
                'name': 'border-color',
                'valueType': 'direct'
            }
        ]
    });

    isNotEmpty(attributes['typeDivider']) && data.push({
        'type': 'plain',
        'id': 'typeDivider',
        'selector': `.${elementId} .list-wrapper:not(.inline-icon-list) .guten-icon-list-item:not(:nth-child(1)) .list-divider`,
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
        'selector': `.${elementId} .list-wrapper.inline-icon-list .guten-icon-list-item:not(:nth-child(1)) .list-divider`,
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
        'selector': `.${elementId} .list-wrapper:not(.inline-icon-list) .guten-icon-list-item .list-divider`,
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
        'selector': `.${elementId} .list-wrapper.inline-icon-list .guten-icon-list-item .list-divider`,
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
        'selector': `.${elementId} .list-wrapper:not(.inline-icon-list) .guten-icon-list-item:not(:nth-child(1)) .list-divider`,
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
        'selector': `.${elementId} .list-wrapper.inline-icon-list .guten-icon-list-item:not(:nth-child(1)) .list-divider`,
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
        'selector': `.${elementId} .list-wrapper:not(.inline-icon-list) li.guten-icon-list-item:not(:first-of-type) > a, .block-editor-block-list__layout .wp-block.${elementId} .list-wrapper:not(.inline-icon-list) li.guten-icon-list-item:not(:first-of-type) > a`,
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
        'selector': `.${elementId} .list-wrapper:not(.inline-icon-list) .guten-icon-list-item:not(:last-child), .block-editor-block-list__layout .wp-block.${elementId} .list-wrapper:not(.inline-icon-list) .guten-icon-list-item:not(:last-child)`,
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
        'selector': `.${elementId} .list-wrapper.inline-icon-list .guten-icon-list-item:not(:last-child), .block-editor-block-list__layout .wp-block.${elementId} .list-wrapper.inline-icon-list .guten-icon-list-item:not(:last-child)`,
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
        'selector': `.${elementId} .list-wrapper.inline-icon-list li.guten-icon-list-item:not(li:first-of-type) > a, .block-editor-block-list__layout .wp-block.${elementId} .list-wrapper.inline-icon-list li.guten-icon-list-item:not(li:first-of-type) > a`,
    });

    isNotEmpty(attributes['alignList']) && data.push({
        'type': 'plain',
        'id': 'alignList',
        'responsive': true,
        'properties': [
            {
                'name': 'align-items',
                'valueType': 'direct',
            },
        ],
        'selector': `.${elementId} .list-wrapper:not(.inline-icon-list)`,
    });

    isNotEmpty(attributes['alignList']) && data.push({
        'type': 'plain',
        'id': 'alignList',
        'responsive': true,
        'properties': [
            {
                'name': 'justify-content',
                'valueType': 'direct',
            },
            {
                'name': 'text-align',
                'valueType': 'direct',
            }
        ],
        'selector': `.${elementId} .list-wrapper.inline-icon-list, .${elementId} .list-wrapper:not(.inline-icon-list) .guten-icon-list-item a`,
    });

    if (attributes['displayInline']) {
        isNotEmpty(attributes['verticalAlign']) && data.push({
            'type': 'plain',
            'id': 'verticalAlign',
            'properties': [
                {
                    'name': 'align-items',
                    'valueType': 'direct'
                }
            ],
            'selector': `.${elementId} ul .guten-icon-list-item a`,
        });
    } else {
        isNotEmpty(attributes['verticalAlign']) && data.push({
            'type': 'plain',
            'id': 'verticalAlign',
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