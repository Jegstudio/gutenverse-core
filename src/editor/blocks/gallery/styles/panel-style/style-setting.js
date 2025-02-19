import { isNotEmpty } from 'gutenverse-core/helper';

const panelSettingStyle = (elementId, attributes, data) => {
    isNotEmpty(attributes['animationDuration']) && data.push({
        'type': 'plain',
        'id': 'animationDuration',
        'selector': `.${elementId} .gallery-items .gallery-item-wrap .thumbnail-wrap .caption-wrap`,
        'properties': [
            {
                'name': 'animation-duration',
                'valueType': 'pattern',
                'pattern': 'calc({value}s/1000)!important',
                'patternValues' : {
                    'value': {
                        'type' : 'direct'
                    }
                }
            }
        ]
    });

    isNotEmpty(attributes['height']) && attributes['grid'] === 'grid' && data.push({
        'type': 'plain',
        'id': 'height',
        'responsive': true,
        'selector': `.${elementId}:not([data-grid="masonry"]) .gallery-items .gallery-item-wrap .thumbnail-wrap`,
        'properties': [
            {
                'name': 'height',
                'valueType': 'pattern',
                'pattern': '{value}px',
                'patternValues' : {
                    'value': {
                        'type' : 'direct'
                    }
                }
            }
        ]
    });

    return data;
};

export default panelSettingStyle;