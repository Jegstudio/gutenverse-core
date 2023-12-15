import { __ } from '@wordpress/i18n';
import { TypographyControl } from 'gutenverse-core/controls';
import { handleTypography } from 'gutenverse-core/styling';

export const panelChildStyle = (props) => {
    const {
        elementId,
    } = props;

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