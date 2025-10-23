import { isNotEmpty } from 'gutenverse-core/helper';
/**
 * 
 * @param {Array} attributes Panel attributes.
 * @param {Array} data Block Style data.
 * @param {String} elementId Block unique ID.
 * @param {Array} features Feature lists.
 * @param {String} selector Block selector.
 * @returns Array
 */
export const defaultStyle = (
    attributes,
    data,
    elementId,
    features = [],
    selector = `.editor-styles-wrapper .is-root-container .${elementId}.guten-element`) => {

    /**
    * Panel Spacing
    */
    if (features.includes('spacing')) {
        isNotEmpty(attributes['margin']) && data.push({
            'type': 'dimension',
            'id': 'margin',
            'responsive': true,
            'properties': [
                {
                    'name': 'margin',
                    'valueType': 'direct'
                }
            ],
            'selector': selector,
        });

        isNotEmpty(attributes['padding']) && data.push({
            'type': 'dimension',
            'id': 'padding',
            'responsive': true,
            'properties': [
                {
                    'name': 'padding',
                    'valueType': 'direct'
                }
            ],
            'selector': selector,
        });

        isNotEmpty(attributes['zIndex']) && data.push({
            'type': 'plain',
            'id': 'zIndex',
            'responsive': true,
            'properties': [
                {
                    'name': 'z-index',
                    'valueType': 'direct'
                }
            ],
            'selector': selector,
        });
    }

    /**
    * Panel Border
    */
    if (features.includes('border')) {
        isNotEmpty(attributes['border']) && data.push({
            'type': 'border',
            'id': 'border',
            'selector': selector,
        });

        isNotEmpty(attributes['borderResponsive']) && data.push({
            'type': 'borderResponsive',
            'id': 'borderResponsive',
            'selector': selector,
        });

        isNotEmpty(attributes['borderHover']) && data.push({
            'type': 'border',
            'id': 'borderHover',
            'selector': `${selector}:hover`,
        });

        isNotEmpty(attributes['borderHoverResponsive']) && data.push({
            'type': 'borderResponsive',
            'id': 'borderHoverResponsive',
            'selector': `${selector}:hover`,
        });

        isNotEmpty(attributes['boxShadow']) && data.push({
            'type': 'boxShadow',
            'id': 'boxShadow',
            'selector': selector,
            'properties': [
                {
                    'name': 'box-shadow',
                    'valueType': 'direct'
                }
            ],
        });
        isNotEmpty(attributes['boxShadowHover']) && data.push({
            'type': 'boxShadow',
            'id': 'boxShadowHover',
            'selector': `${selector}:hover`,
            'properties': [
                {
                    'name': 'box-shadow',
                    'valueType': 'direct'
                }
            ],
        });
    }

    /**
    * Panel Background
    */
    if (features.includes('background')) {
        isNotEmpty(attributes['background']) && data.push({
            'type': 'background',
            'id': 'background',
            'selector': selector,
        });

        isNotEmpty(attributes['backgroundHover']) && data.push({
            'type': 'background',
            'id': 'backgroundHover',
            'selector': `${selector}:hover`,
        });

        isNotEmpty(attributes['backgroundTransition']) && data.push({
            'type': 'unitPoint',
            'id': 'backgroundTransition',
            'selector': selector,
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
    }


    return data;
};