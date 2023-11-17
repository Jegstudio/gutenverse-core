import { __ } from '@wordpress/i18n';
import { TypographyControl } from 'gutenverse-core/controls';
import { handleTypography } from 'gutenverse-core/styling';

const getListOfChildTag = content => {
    const divElement = document.createElement('div');
    divElement.innerHTML = content;
    if (!divElement.element) {
        const childElements = divElement.children;
        return Array.from(childElements);
    } else {
        return [];
    }
};

export const panelChildStyle = (props) => {
    const {
        elementId,
        content
    } = props;

    const child = getListOfChildTag(content);

    return [
        {
            id: 'typography',
            label: __('Typography', 'gutenverse'),
            component: TypographyControl,
            style: [
                {
                    selector: `.${elementId}`,
                    hasChild: true,
                    render: (value, id) => handleTypography(value, props, id)
                }
            ],
        },
    ];
};