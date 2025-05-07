import { isNotEmpty } from 'gutenverse-core/helper';

const progressStyle = (elementId, attributes, data) => {
    if(attributes['colorMode'] === 'gradient'){
        isNotEmpty(attributes['barGradient']) && data.push({
            'type': 'plain',
            'id': 'barGradient',
            'properties': [
                {
                    'name': 'background',
                    'valueType': 'function',
                    'functionName' : 'customHandleBackground',
                }
            ],
            'selector': `.${elementId} .progress-group .progress-skill-bar .skill-bar`,
        });

        isNotEmpty(attributes['trackGradient']) && data.push({
            'type': 'plain',
            'id': 'trackGradient',
            'properties': [
                {
                    'name': 'background',
                    'valueType': 'function',
                    'functionName' : 'customHandleBackground',
                }
            ],
            'selector': `.${elementId} .progress-group .progress-skill-bar .skill-bar .skill-track`
        });
    }else{
        isNotEmpty(attributes['barColor']) && data.push({
            'type': 'color',
            'id': 'barColor',
            'properties': [
                {
                    'name': 'background-color',
                    'valueType': 'direct'
                }
            ],
            'selector': `.${elementId} .progress-group .progress-skill-bar .skill-bar`
        });

        isNotEmpty(attributes['trackColor']) && data.push({
            'type': 'color',
            'id': 'trackColor',
            'properties': [
                {
                    'name': 'background-color',
                    'valueType': 'direct'
                }
            ],
            'selector': `.${elementId} .progress-group .progress-skill-bar .skill-bar .skill-track`
        });
    }
    isNotEmpty(attributes['trackHeight']) && data.push({
        'type': 'plain',
        'id': 'trackHeight',
        'responsive': true,
        'properties': [
            {
                'name': 'height',
                'valueType': 'pattern',
                'pattern' : '{value}px',
                'patternValues' : {
                    'value' : {
                        'type' : 'direct'
                    }
                }
            }
        ],
        'selector': `.${elementId} .progress-group .progress-skill-bar .skill-bar`
    });

    isNotEmpty(attributes['barRadius']) && data.push({
        'type': 'dimension',
        'id': 'barRadius',
        'responsive': true,
        'properties': [
            {
                'name': 'border-radius',
                'valueType': 'direct',
                'multiDimension': false
            }
        ],
        'selector': `.${elementId} .progress-group .progress-skill-bar .skill-bar`
    });

    isNotEmpty(attributes['trackRadius']) && data.push({
        'type': 'dimension',
        'id': 'trackRadius',
        'responsive': true,
        'properties': [
            {
                'name': 'border-radius',
                'valueType': 'direct',
                'multiDimension': false
            }
        ],
        'selector': `.${elementId} .progress-group .progress-skill-bar .skill-bar .skill-track`
    });

    isNotEmpty(attributes['barPadding']) && data.push({
        'type': 'dimension',
        'id': 'barPadding',
        'responsive': true,
        'properties': [
            {
                'name': 'padding',
                'valueType': 'direct'
            }
        ],
        'selector': `.${elementId} .progress-group .progress-skill-bar .skill-bar`,
    });

    isNotEmpty(attributes['barMargin']) && data.push({
        'type': 'dimension',
        'id': 'barMargin',
        'responsive': true,
        'properties': [
            {
                'name': 'margin',
                'valueType': 'direct'
            }
        ],
        'selector': `.${elementId} .progress-group .progress-skill-bar .skill-bar`,
    });

    isNotEmpty(attributes['barBoxShadow']) && data.push({
        'type': 'boxShadow',
        'id': 'barBoxShadow',
        'properties': [
            {
                'name': 'box-shadow',
                'valueType': 'direct'
            }
        ],
        'selector': `.${elementId} .progress-group .progress-skill-bar .skill-bar`,
    });
    return data;
};

export default progressStyle;