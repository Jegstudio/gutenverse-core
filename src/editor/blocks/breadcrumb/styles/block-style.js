import { backgroundStyle } from 'gutenverse-core/controls';
import { isNotEmpty } from 'gutenverse-core/helper';
import layoutStye from './panelStyle/layoutStyle';
import stylingStyle from './panelStyle/stylingStyle';

const getBlockStyle = (elementId, attributes) => {
    let data = [];

    data = layoutStye({attributes, elementId, data, selector: `.guten-element.${elementId}.guten-breadcrumb`});
    data = stylingStyle({attributes, elementId, data});
    data = backgroundStyle({
        elementId,
        attributes,
        data,
        backgroundSelector: `.guten-element.${elementId}.guten-breadcrumb`,
        backgroundHoverSelector: `.guten-element.${elementId}.guten-breadcrumb:hover`,
    });


    /**
     * Panel Border
     */
    isNotEmpty(attributes['border']) && data.push({
        'type': 'border',
        'id': 'border',
        'selector': `.guten-element.${elementId}.guten-breadcrumb`,
    });

    isNotEmpty(attributes['borderResponsive']) && data.push({
        'type': 'borderResponsive',
        'id': 'borderResponsive',
        'selector': `.guten-element.${elementId}.guten-breadcrumb`,
    });

    isNotEmpty(attributes['borderHover']) && data.push({
        'type': 'border',
        'id': 'borderHover',
        'selector': `.guten-element.${elementId}.guten-breadcrumb:hover`,
    });

    isNotEmpty(attributes['borderHoverResponsive']) && data.push({
        'type': 'borderResponsive',
        'id': 'borderHoverResponsive',
        'selector': `.guten-element.${elementId}.guten-breadcrumb:hover`,
    });

    isNotEmpty(attributes['boxShadow']) && data.push({
        'type': 'boxShadow',
        'id': 'boxShadow',
        'selector': `.guten-element.${elementId}.guten-breadcrumb`,
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
        'selector': `.guten-element.${elementId}.guten-breadcrumb:hover`,
        'properties': [
            {
                'name': 'box-shadow',
                'valueType': 'direct'
            }
        ],
    });

    return data;
};

export default getBlockStyle;