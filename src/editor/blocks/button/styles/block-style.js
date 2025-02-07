import { isNotEmpty } from 'gutenverse-core/helper';

const getBlockStyle = (elementId, attributes) => {
    let data = [];

    //panel button
    isNotEmpty(attributes['alignButton']) && data.push({
        'type': 'plain',
        'id': 'alignButton',
        'selector': `.editor-styles-wrapper .${elementId}.guten-button-wrapper`,
        'properties': [
            {
                'name': 'justify-content',
                'valueType': 'direct'
            }
        ],
        'responsive': true,
    });
    isNotEmpty(attributes['buttonWidth']) && data.push({
        'type': 'plain',
        'id': 'buttonWidth',
        'selector': `.editor-styles-wrapper .${elementId}.guten-button-wrapper .guten-button`,
        'responsive': true,
        'properties': [
            {
                'name': 'width',
                'valueType': 'pattern',
                'pattern': '{value}%',
                'patternValues': {
                    'value': {
                        'type': 'direct',
                        'key': 'buttonWidth',
                    },

                }
            }
        ],
    });
    isNotEmpty(attributes['buttonHeight']) && data.push({
        'type': 'plain',
        'id': 'buttonHeight',
        'selector': `.editor-styles-wrapper .${elementId}.guten-button-wrapper .guten-button`,
        'responsive': true,
        'properties': [
            {
                'name': 'height',
                'valueType': 'pattern',
                'pattern': '{value}px!important',
                'patternValues': {
                    'value': {
                        'type': 'direct',
                        'key': 'buttonHeight',
                    },

                }
            }
        ],
    });

    isNotEmpty(attributes['iconPosition']) && isNotEmpty(attributes['iconSpacing']) && attributes['iconPosition'] === 'before' && isNotEmpty(attributes['showIcon']) && data.push({
        'type': 'plain',
        'id': 'iconPosition',
        'responsive': true,
        'selector': `.editor-styles-wrapper .${elementId}.guten-button-wrapper .guten-button i`,
        'properties': [
            {
                'name': 'margin-right',
                'valueType': 'pattern',
                'pattern': '{value}px',
                'patternValues': {
                    'value': {
                        'type': 'direct',
                        'key': 'iconSpacing',
                    },

                }
            }
        ],
        'multiAttr' : [attributes['iconSpacing']]
    });

    isNotEmpty(attributes['iconPosition']) && isNotEmpty(attributes['iconSpacing']) && attributes['iconPosition'] === 'after' && isNotEmpty(attributes['showIcon']) && data.push({
        'type': 'plain',
        'id': 'iconPosition',
        'responsive': true,
        'selector': `.editor-styles-wrapper .${elementId}.guten-button-wrapper .guten-button i`,
        'properties': [
            {
                'name': 'margin-left',
                'valueType': 'pattern',
                'pattern': '{value}px',
                'patternValues': {
                    'value': {
                        'type': 'direct',
                        'key': 'iconSpacing',
                    },

                }
            }
        ],
        'multiAttr' : [attributes['iconSpacing']]
    });

    isNotEmpty(attributes['iconSize']) && isNotEmpty(attributes['showIcon']) && data.push({
        'type': 'unitPoint',
        'id': 'iconSize',
        'properties': [
            {
                'name': 'font-size',
                'valueType': 'direct'
            }
        ],
        'selector': `.editor-styles-wrapper .${elementId}.guten-button-wrapper .guten-button i`,
        'responsive' : true
    });

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
        'selector': `.editor-styles-wrapper .${elementId}.guten-button-wrapper .guten-button`,
    });

    isNotEmpty(attributes['iconLineHeight']) && data.push({
        'type': 'plain',
        'id': 'iconLineHeight',
        'selector': `.editor-styles-wrapper .${elementId}.guten-button-wrapper .guten-button i`,
        'properties': [
            {
                'name': 'line-height',
                'valueType': 'pattern',
                'pattern': 'normal',
            }
        ],
    });

    return data;
};


export default getBlockStyle;