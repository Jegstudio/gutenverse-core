import { isNotEmpty } from 'gutenverse-core/helper';

export const backgroundStyle = (props) => {

    const {
        attributes,
        data,
        backgroundSelector,
        backgroundHoverSelector
    } = props;

    isNotEmpty(attributes['background']) && data.push({
        'type': 'background',
        'id': 'background',
        'selector': backgroundSelector,
    });

    isNotEmpty(attributes['backgroundHover']) && data.push({
        'type': 'background',
        'id': 'backgroundHover',
        'selector': backgroundHoverSelector,
    });

    isNotEmpty(attributes['backgroundTransition']) && data.push({
        'type': 'unitPoint',
        'id': 'backgroundTransition',
        'responsive': true,
        'selector': backgroundHoverSelector,
        'properties': [
            {
                'name': 'transition',
                'valueType': 'pattern',
                'pattern': '{value}',
                'patternValues': {
                    'value': {
                        'type': 'direct',
                    },
                }
            },
        ],
    });

    return data;
};