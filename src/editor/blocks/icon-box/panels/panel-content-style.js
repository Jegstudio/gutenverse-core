import { __ } from '@wordpress/i18n';
import { ColorControl, DimensionControl, RangeControl, TypographyControl } from 'gutenverse-core-editor/controls';
import { handleColor, handleDimension, handleTypography } from 'gutenverse-core/styling';

export const panelContentStyle = (props) => {
    const {
        elementId,
    } = props;

    return [
        {
            id: 'titlePadding',
            label: __('Title Padding', 'gutenverse'),
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
                    selector: `.${elementId} .icon-box.icon-box-body .title`,
                    render: value => handleDimension(value, 'padding')
                }
            ],
        },
        {
            id: 'titleMargin',
            label: __('Title Margin', 'gutenverse'),
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
                    selector: `.${elementId} .icon-box.icon-box-body .title`,
                    render: value => handleDimension(value, 'margin')
                }
            ],
        },
        {
            id: 'titleColor',
            label: __('Title Color', 'gutenverse'),
            component: ColorControl,
            style: [
                {
                    selector: `.${elementId} .icon-box.icon-box-body .title`,
                    render: value => handleColor(value, 'color')
                }
            ]
        },
        {
            id: 'titleHoverColor',
            label: __('Title Hover Color', 'gutenverse'),
            component: ColorControl,
            style: [
                {
                    selector: `.${elementId}:hover .icon-box.icon-box-body .title`,
                    render: value => handleColor(value, 'color')
                }
            ]
        },
        {
            id: 'titleTypography',
            label: __('Title Typography', 'gutenverse'),
            component: TypographyControl,
            style: [
                {
                    selector: `.${elementId} .icon-box.icon-box-body .title`,
                    hasChild: true,
                    render: (value,id) => handleTypography(value, props, id)
                }
            ],
        },
        {
            id: 'descMargin',
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
                    selector: `.${elementId} .icon-box.icon-box-body .icon-box-description`,
                    render: value => handleDimension(value, 'margin')
                }
            ],
        },
        {
            id: 'descColor',
            label: __('Description Color', 'gutenverse'),
            component: ColorControl,
            style: [
                {
                    selector: `.${elementId} .icon-box.icon-box-body .icon-box-description`,
                    render: value => handleColor(value, 'color')
                }
            ]
        },
        {
            id: 'descHoverColor',
            label: __('Description Hover Color', 'gutenverse'),
            component: ColorControl,
            style: [
                {
                    selector: `.${elementId}:hover .icon-box.icon-box-body .icon-box-description`,
                    render: value => handleColor(value, 'color')
                }
            ]
        },
        {
            id: 'descTypography',
            label: __('Description Typography', 'gutenverse'),
            component: TypographyControl,
            style: [
                {
                    selector: `.${elementId} .icon-box.icon-box-body .icon-box-description`,
                    hasChild: true,
                    render: (value,id) => handleTypography(value, props, id)
                }
            ],
        },
        {
            id: 'watermarkColor',
            label: __('Watermark Color', 'gutenverse'),
            component: ColorControl,
            style: [
                {
                    selector: `.${elementId} .hover-watermark i`,
                    render: value => handleColor(value, 'color')
                }
            ]
        },
        {
            id: 'watermarkSize',
            label: __('Watermark Font Size', 'gutenverse'),
            component: RangeControl,
            allowDeviceControl: true,
            min: 1,
            max: 1000,
            step: 1,
            style: [
                {
                    selector: `.${elementId} .hover-watermark i`,
                    render: value => `font-size: ${value}px;`
                }
            ]
        },
    ];
};

