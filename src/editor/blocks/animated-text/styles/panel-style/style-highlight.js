import { isNotEmpty } from 'gutenverse-core/helper';

const highlightStyle = (props) => {
    const {
        elementId,
        data,
        attributes,
    } = props;

    isNotEmpty(attributes['highlightColor']) && data.push({
        'type': 'color',
        'id': 'highlightColor',
        'selector': `.editor-styles-wrapper .${elementId} .text-content svg path`,
        'properties': [
            {
                'name': 'stroke',
                'valueType': 'direct'
            }
        ],
    });

    isNotEmpty(attributes['highlightThickness']) && data.push({
        'type': 'plain',
        'id': 'highlightThickness',
        'selector': `.editor-styles-wrapper .${elementId} .text-content svg path`,
        'properties': [
            {
                'name': 'stroke-width',
                'valueType': 'direct'
            }
        ],
    });

    return data;
};

export default highlightStyle;
