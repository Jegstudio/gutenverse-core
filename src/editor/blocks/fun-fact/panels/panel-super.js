import { __ } from '@wordpress/i18n';
import { ColorControl, RangeControl, SelectControl, TypographyControl } from 'gutenverse-core/controls';
import { handleColor, handleTypography } from 'gutenverse-core/styling';

export const superPanel = ({elementId, ...props}) => {
    return [
        {
            id: 'superColor',
            label: __('Color', 'gutenverse'),
            component: ColorControl,
            style: [
                {
                    selector: `.${elementId} .fun-fact-inner .content .number-wrapper .super`,
                    render: value => handleColor(value, 'color')
                }
            ]
        },
        {
            id: 'superTypography',
            label: __('Typography', 'gutenverse'),
            component: TypographyControl,
            style: [
                {
                    selector: `.${elementId} .fun-fact-inner .content .number-wrapper .super`,
                    hasChild: true,
                    render: (value,id) => handleTypography(value, props, id)
                }
            ],
        },
        {
            id: 'superTop',
            label: __('Top', 'gutenverse'),
            component: RangeControl,
            allowDeviceControl: true,
            min: -100,
            max: 100,
            step: 1,
            style: [
                {
                    selector: `.${elementId} .fun-fact-inner .content .number-wrapper .super`,
                    render: value => `top: ${value}px;`
                }
            ]
        },
        {
            id: 'superSpace',
            label: __('Horizontal Space', 'gutenverse'),
            component: RangeControl,
            allowDeviceControl: true,
            min: -5,
            max: 20,
            step: 1,
            style: [
                {
                    selector: `.${elementId} .fun-fact-inner .content .number-wrapper .super`,
                    render: value => `left: ${value}px;`
                }
            ]
        },
        {
            id: 'superAlign',
            label: __('Vertical Position', 'gutenverse'),
            component: SelectControl,
            allowDeviceControl: true,
            options: [
                {
                    value: 'super',
                    label: 'Top'
                },
                {
                    value: 'baseline',
                    label: 'Middle'
                },
                {
                    value: 'sub',
                    label: 'Bottom'
                },
            ],
            style: [
                {
                    selector: `.${elementId} .fun-fact-inner .content .number-wrapper .super`,
                    render: value => `vertical-align: ${value};`
                }
            ]
        },
    ];
};