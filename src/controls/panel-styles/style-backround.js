import { isNotEmpty } from 'gutenverse-core/helper';

export const backgroundStyle = (props) => {

    const {
        attributes,
        data,
        elementId,
        backgroundSelector = `.editor-styles-wrapper .is-root-container .${elementId}.guten-element`,
        backgroundHoverSelector = `.editor-styles-wrapper .is-root-container .${elementId}.guten-element:hover`,
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
        'selector': backgroundSelector,
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