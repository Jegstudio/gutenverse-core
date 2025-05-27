import { isNotEmpty } from 'gutenverse-core/helper';

const textAnimatedStyle = (props) => {
    const {
        elementId,
        data,
        attributes,
    } = props;

    /**Panel Style */
    isNotEmpty(attributes['textAnimatedColor']) && data.push({
        'type': 'color',
        'id': 'textAnimatedColor',
        'selector': `.editor-styles-wrapper .${elementId} .text-content *`,
        'properties': [
            {
                'name': 'color',
                'valueType': 'direct'
            }
        ],
    });

    isNotEmpty(attributes['textAnimatedTypography']) && data.push({
        'type': 'typography',
        'id': 'textAnimatedTypography',
        'selector': `.editor-styles-wrapper .${elementId} .text-content *`,
    });

    isNotEmpty(attributes['textAnimatedShadow']) && data.push({
        'type': 'textShadow',
        'id': 'textAnimatedShadow',
        'properties': [
            {
                'name': 'text-shadow',
                'valueType': 'direct'
            }
        ],
        'selector': `.editor-styles-wrapper .${elementId} .text-content *`,
    });

    isNotEmpty(attributes['textAnimatedStroke']) && data.push({
        'type': 'textStroke',
        'id': 'textAnimatedStroke',
        'selector': `.editor-styles-wrapper .${elementId} .text-content *`,
    });

    return data;
};

export default textAnimatedStyle;