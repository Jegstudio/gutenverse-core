import { isNotEmpty } from 'gutenverse-core/helper';

const panelSettingStyle = (elementId, attributes, data) => {
    isNotEmpty(attributes['column']) && data.push({
        'type': 'plain',
        'id': 'column',
        'responsive' : true,
        'selector': `.${elementId}.guten-portfolio-gallery .portfolio-gallery-container .content-items .row-item`,
        'properties': [
            {
                'name': 'flex',
                'valueType': 'pattern',
                'pattern' : 'calc(100% / {value}); max-width: calc(100% / {value})',
                'patternValues' : {
                    'value' : {
                        'type' : 'direct'
                    }
                }
            }
        ],
    });

    isNotEmpty(attributes['rowHeight']) && data.push({
        'type': 'unitPoint',
        'id': 'rowHeight',
        'responsive' : true,
        'properties': [
            {
                'name': 'height',
                'valueType': 'direct',
            }
        ],
        'selector': `.${elementId}.guten-portfolio-gallery .portfolio-gallery-container .content-items .row-item`,
    });

    isNotEmpty(attributes['reversePosition']) && data.push({
        'type': 'plain',
        'id': 'reversePosition',
        'properties': [
            {
                'name': 'flex-direction',
                'valueType': 'pattern',
                'pattern': 'column-reverse'
            }
        ],
        'selector': `.${elementId}.guten-portfolio-gallery .portfolio-gallery-container .content-items .row-item`,
    });

    isNotEmpty(attributes['reversePosition']) && data.push({
        'type': 'plain',
        'id': 'reversePosition',
        'properties': [
            {
                'name': 'transform',
                'valueType': 'pattern',
                'pattern': 'translateY(-100%)'
            }
        ],
        'selector': `.${elementId}.guten-portfolio-gallery .portfolio-gallery-container .content-items .row-item .row-link-wrapper`,
    });

    isNotEmpty(attributes['reversePosition']) && data.push({
        'type': 'plain',
        'id': 'reversePosition',
        'properties': [
            {
                'name': 'transform',
                'valueType': 'pattern',
                'pattern': 'translateY(0)'
            }
        ],
        'selector': `.${elementId}.guten-portfolio-gallery .portfolio-gallery-container .content-items .row-item:hover .row-link-wrapper`,
    });

    isNotEmpty(attributes['reversePosition']) && data.push({
        'type': 'plain',
        'id': 'reversePosition',
        'properties': [
            {
                'name': 'transform-origin',
                'valueType': 'pattern',
                'pattern': '0 100%'
            }
        ],
        'selector': `.${elementId}.guten-portfolio-gallery .portfolio-gallery-container .content-items .row-item .row-item-info::after`,
    });

    isNotEmpty(attributes['linkIconPosition']) && data.push({
        'type': 'plain',
        'id': 'linkIconPosition',
        'properties': [
            {
                'name': 'flex-direction',
                'valueType': 'direct',
            }
        ],
        'selector': `.${elementId}.guten-portfolio-gallery .portfolio-gallery-container .content-items .row-item .row-link-wrapper a`,
    });
    return data;
};

export default panelSettingStyle;