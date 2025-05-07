import { isNotEmpty } from 'gutenverse-core/helper';

const postItemStyle = (elementId, attributes, data) => {
    isNotEmpty(attributes['postItemGap']) && data.push({
        'type': 'plain',
        'id': 'postItemGap',
        'responsive' : true,
        'selector': `.${elementId} .guten-postblock .guten-posts`,
        'properties': [
            {
                'name': 'grid-column-gap',
                'valueType': 'pattern',
                'pattern': '{value}px',
                'patternValues': {
                    'value': {
                        'type': 'direct'
                    }
                }
            }
        ]
    });

    isNotEmpty(attributes['postItemBackground']) && data.push({
        'type': 'background',
        'id': 'postItemBackground',
        'selector': `.${elementId} .guten-postblock .guten-post`,
    });

    isNotEmpty(attributes['postItemMargin']) && data.push({
        'type': 'dimension',
        'id': 'postItemMargin',
        'responsive': true,
        'properties': [
            {
                'name': 'margin',
                'valueType': 'direct'
            }
        ],
        'selector': `.${elementId} .guten-postblock .guten-post`,
    });

    isNotEmpty(attributes['postItemPadding']) && data.push({
        'type': 'dimension',
        'id': 'postItemPadding',
        'responsive': true,
        'properties': [
            {
                'name': 'padding',
                'valueType': 'direct'
            }
        ],
        'selector': `.${elementId} .guten-postblock .guten-post`,
    });

    isNotEmpty(attributes['postItemBorder']) && data.push({
        'type': 'border',
        'id': 'postItemBorder',
        'selector': `.${elementId} .guten-postblock .guten-post`,
    });

    isNotEmpty(attributes['postItemBorderResponsive']) && data.push({
        'type': 'borderResponsive',
        'id': 'postItemBorderResponsive',
        'selector': `.${elementId} .guten-postblock .guten-post`,
    });

    isNotEmpty(attributes['postItemBoxShadow']) && data.push({
        'type': 'boxShadow',
        'id': 'postItemBoxShadow',
        'properties': [
            {
                'name': 'box-shadow',
                'valueType': 'direct'
            }
        ],
        'selector': `.${elementId} .guten-postblock .guten-post`,
    });
    return data;
};

export default postItemStyle;