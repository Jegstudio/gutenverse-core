import { __ } from '@wordpress/i18n';
import { ColorControl, DimensionControl, RangeControl, TypographyControl } from 'gutenverse-core/controls';
import { handleColor, handleDimension, handleTypography } from 'gutenverse-core/styling';

export const contentStylePanel = ({elementId, ...props}) => {
    return [
        {
            id: 'numberColor',
            label: __('Number Color', 'gutenverse'),
            component: ColorControl,
            allowDeviceControl: true,
            style: [
                {
                    selector: `.${elementId} .fun-fact-inner .content .number-wrapper`,
                    render: value => handleColor(value, 'color')
                }
            ]
        },
        {
            id: 'titleColor',
            label: __('Title Color', 'gutenverse'),
            component: ColorControl,
            allowDeviceControl: true,
            style: [
                {
                    selector: `.${elementId} .fun-fact-inner .content .title`,
                    render: value => handleColor(value, 'color')
                }
            ]
        },
        {
            id: 'numberTypography',
            label: __('Number Typography', 'gutenverse'),
            component: TypographyControl,
            style: [
                {
                    selector: `.${elementId} .fun-fact-inner .content .number-wrapper`,
                    hasChild: true,
                    render: (value,id) => handleTypography(value, props, id)
                }
            ],
        },
        {
            id: 'titleTypography',
            label: __('Title Typography', 'gutenverse'),
            component: TypographyControl,
            style: [
                {
                    selector: `.${elementId} .fun-fact-inner .content .title`,
                    hasChild: true,
                    render: (value,id) => handleTypography(value, props, id)
                }
            ],
        },
        {
            id: 'numberBottomSpace',
            label: __('Number Bottom Space', 'gutenverse'),
            component: RangeControl,
            allowDeviceControl: true,
            min: 0,
            max: 300,
            step: 1,
            style: [
                {
                    selector: `.${elementId} .fun-fact-inner .content .number-wrapper `,
                    render: value => `margin-bottom: ${value}px;`
                }
            ]
        },
        {
            id: 'titleBottomSpace',
            label: __('Title Bottom Space', 'gutenverse'),
            component: RangeControl,
            allowDeviceControl: true,
            min: 0,
            max: 300,
            step: 1,
            style: [
                {
                    selector: `.${elementId} .fun-fact-inner .content .title `,
                    render: value => `margin-bottom: ${value}px;`
                }
            ]
        },
        {
            id: 'numberRightSpace',
            label: __('Number Right Space', 'gutenverse'),
            component: RangeControl,
            allowDeviceControl: true,
            min: 0,
            max: 300,
            step: 1,
            style: [
                {
                    selector: `.${elementId} .fun-fact-inner .content .number-wrapper .number.loaded`,
                    render: value => `margin-right: ${value}px;`
                }
            ]
        },
        {
            id: 'contentPadding',
            label: __('Content Padding', 'gutenverse'),
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
                    selector: `.${elementId} .fun-fact-inner .content`,
                    render: value => handleDimension(value, 'padding')
                }
            ]
        },
    ];
};