import { __ } from '@wordpress/i18n';
import { ColorControl, DimensionControl, RangeControl, SwitchControl, TypographyControl } from 'gutenverse-core/controls';
import { handleColor, handleDimension, handleTypography } from 'gutenverse-core/styling';

export const panelTitleStyle = props => {
    const {
        elementId,
        __titleHover,
    } = props;

    return [
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
                    selector: `.${elementId} .inner-container .image-box-body .body-title`,
                    render: value => handleDimension(value, 'margin')
                }
            ],
        },
        {
            id: 'titleTypography',
            label: __('Title Typography', 'gutenverse'),
            component: TypographyControl,
            style: [
                {
                    selector: `.${elementId} .inner-container .image-box-body .body-title`,
                    hasChild: true,
                    render: (value,id) => handleTypography(value, props, id)
                }
            ],
        },
        {
            id: 'titleIconSize',
            label: __('Icon Font Size', 'gutenverse'),
            component: RangeControl,
            min: 0,
            max: 200,
            step: 1,
            allowDeviceControl: true,
            unit: 'px',
            style: [
                {
                    selector: `.${elementId} .inner-container .image-box-body .body-title i`,
                    render: value => `font-size: ${value}px;`
                }
            ],
        },
        {
            id: 'titleIconSpacing',
            label: __('Icon Spacing', 'gutenverse'),
            component: RangeControl,
            min: 0,
            max: 200,
            step: 1,
            allowDeviceControl: true,
            unit: 'px',
            style: [
                {
                    selector: `.${elementId} .inner-container .image-box-body .body-title.icon-position-before i`,
                    render: value => `margin-right: ${value}px;`
                },
                {
                    selector: `.${elementId} .inner-container .image-box-body .body-title.icon-position-after i`,
                    render: value => `margin-left: ${value}px;`
                }
            ],
        },
        {
            id: '__titleHover',
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
            id: 'titleNormalColor',
            show: !__titleHover || __titleHover === 'normal',
            label: __('Title Color', 'gutenverse'),
            component: ColorControl,
            style: [
                {
                    selector: `.${elementId} .inner-container .image-box-body .body-title, .${elementId} .image-box-body .body-title a`,
                    render: value => handleColor(value, 'color')
                }
            ],
        },
        {
            id: 'titleNormalIconColor',
            show: !__titleHover || __titleHover === 'normal',
            label: __('Icon Color', 'gutenverse'),
            component: ColorControl,
            style: [
                {
                    selector: `.${elementId} .inner-container .image-box-body .body-title i`,
                    render: value => handleColor(value, 'color')
                }
            ],
        },
        {
            id: 'titleHoverColor',
            show: __titleHover === 'hover',
            label: __('Title Hover Color', 'gutenverse'),
            component: ColorControl,
            style: [
                {
                    selector: `.${elementId}:hover .inner-container .image-box-body .body-title, .${elementId}:hover .image-box-body .body-title a`,
                    render: value => handleColor(value, 'color')
                }
            ],
        },
        {
            id: 'titleHoverIconColor',
            show: __titleHover === 'hover',
            label: __('Icon Hover Color', 'gutenverse'),
            component: ColorControl,
            style: [
                {
                    selector: `.${elementId}:hover .inner-container .image-box-body .body-title i`,
                    render: value => handleColor(value, 'color')
                }
            ],
        },
    ];
};