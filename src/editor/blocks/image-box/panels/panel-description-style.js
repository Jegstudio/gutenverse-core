import { __ } from '@wordpress/i18n';
import { ColorControl, DimensionControl, SwitchControl, TypographyControl } from 'gutenverse-core-editor/controls';
import { handleColor, handleDimension, handleTypography } from 'gutenverse-core/styling';

export const panelDescriptionStyle = props => {
    const {
        elementId,
        __descriptionHover,
    } = props;

    return [
        {
            id: 'descriptionMargin',
            label: __('Description Margin', 'gutenverse'),
            component: DimensionControl,
            position: ['top', 'right', 'bottom', 'left'],
            allowDeviceControl: true,
            units: {
                px: {
                    text: 'px',
                    unit: 'px'
                },
                em: {
                    text: 'em',
                    unit: 'em'
                },
                percent: {
                    text: '%',
                    unit: '%'
                },
            },
            style: [
                {
                    selector: `.${elementId} .image-box-body .body-inner .body-description`,
                    render: value => handleDimension(value, 'margin')
                }
            ],
        },
        {
            id: 'descriptionTypography',
            label: __('Description Typography', 'gutenverse'),
            component: TypographyControl,
            style: [
                {
                    selector: `.${elementId} .image-box-body .body-inner .body-description`,
                    hasChild: true,
                    render: (value,id) => handleTypography(value, props, id)
                }
            ],
        },
        {
            id: '__descriptionHover',
            component: SwitchControl,
            options: [
                {
                    value: 'normal',
                    label: 'Normal'
                },
                {
                    value: 'hover',
                    label: 'Hover'
                }
            ],
        },
        {
            id: 'descriptionNormalColor',
            show: !__descriptionHover || __descriptionHover === 'normal',
            label: __('Description Color', 'gutenverse'),
            component: ColorControl,
            style: [
                {
                    selector: `.${elementId} .image-box-body .body-inner .body-description`,
                    render: value => handleColor(value, 'color')
                }
            ],
        },
        {
            id: 'descriptionHoverColor',
            show: __descriptionHover === 'hover',
            label: __('Description Hover Color', 'gutenverse'),
            component: ColorControl,
            style: [
                {
                    selector: `.${elementId}:hover .image-box-body .body-inner .body-description`,
                    render: value => handleColor(value, 'color')
                }
            ],
        },
    ];
};