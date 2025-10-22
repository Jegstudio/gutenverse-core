import { isNotEmpty } from 'gutenverse-core/helper';

const stylingStyle = (props) => {

    const {
        elementId,
        attributes,
        data,
    } = props;

    isNotEmpty(attributes['typography']) && data.push({
        'id': 'typography',
        'type': 'typography',
        'selector': `
                    .guten-element.${elementId}.guten-breadcrumb .breadcrumb-nav li span,
                    .guten-element.${elementId}.guten-breadcrumb .breadcrumb-nav li i
                    `,
    });

    isNotEmpty(attributes['gap']) && data.push({
        'id': 'gap',
        'type': 'plain',
        'properties': [
            {
                'name': 'margin-right',
                'valueType': 'pattern',
                'pattern': '{value}px',
                'patternValues': {
                    'value': {
                        'type': 'direct',
                    }
                }
            },
            {
                'name': 'margin-left',
                'valueType': 'pattern',
                'pattern': '{value}px',
                'patternValues': {
                    'value': {
                        'type': 'direct',
                    }
                }
            }
        ],
        'selector': `.guten-element.${elementId}.guten-breadcrumb .breadcrumb-nav li.separator`,
    });

    isNotEmpty(attributes['linkColor']) && data.push({
        'type': 'color',
        'id': 'linkColor',
        'selector': `.guten-element.${elementId}.guten-breadcrumb .breadcrumb-nav a span.breadcrumb-link`,
        'properties': [
            {
                'name': 'color',
                'valueType': 'direct'
            }
        ],
    });

    isNotEmpty(attributes['linkColorHover']) && data.push({
        'type': 'color',
        'id': 'linkColorHover',
        'selector': `.guten-element.${elementId}.guten-breadcrumb .breadcrumb-nav a span.breadcrumb-link:hover`,
        'properties': [
            {
                'name': 'color',
                'valueType': 'direct'
            }
        ],
    });

    isNotEmpty(attributes['lastTextColor']) && data.push({
        'type': 'color',
        'id': 'lastTextColor',
        'selector': `.guten-element.${elementId}.guten-breadcrumb .breadcrumb-nav span span.breadcrumb-text`,
        'properties': [
            {
                'name': 'color',
                'valueType': 'direct'
            }
        ],
    });

    isNotEmpty(attributes['arrowColor']) && data.push({
        'type': 'color',
        'id': 'arrowColor',
        'selector': `.guten-element.${elementId}.guten-breadcrumb .breadcrumb-nav li.separator`,
        'properties': [
            {
                'name': 'color',
                'valueType': 'direct'
            }
        ],
    });

    return data;
};

export default stylingStyle;