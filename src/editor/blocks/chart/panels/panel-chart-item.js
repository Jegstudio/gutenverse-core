import { __ } from '@wordpress/i18n';
import { AlertControl, SelectControl, RangeControl, RepeaterControl, TextControl, ColorControl } from 'gutenverse-core/controls';

export const chartItemPanel = (props) => {
    const {
        chartContent,
        chartItems,
    } = props;

    let multiValue = false;
    if (chartItems.length > 1) {
        multiValue = true;
    } else {
        multiValue = false;
    }

    return [
        {
            id: 'activate-notice',
            component: AlertControl,
            show: !multiValue && 'number' !== chartContent,
            children: <>
                <span>{__('If Chart has more than 1 item, Max Value will be used instead of the percentage.', 'gutenverse')}</span>
            </>
        },
        {
            id: 'chartItems',
            component: RepeaterControl,
            titleFormat: '<strong><%= value.label ? value.label : "Chart Item" %></strong>',
            repeaterDefault: {
                label: 'Chart Item',
                value: '20',
                backgroundColor: {
                    r: Math.floor(Math.random() * 256),
                    g: Math.floor(Math.random() * 256),
                    b: Math.floor(Math.random() * 256),
                    a: 1
                },
                colorGradientOne: {
                    r: Math.floor(Math.random() * 256),
                    g: Math.floor(Math.random() * 256),
                    b: Math.floor(Math.random() * 256),
                    a: 1
                },
                colorGradientTwo: {
                    r: Math.floor(Math.random() * 256),
                    g: Math.floor(Math.random() * 256),
                    b: Math.floor(Math.random() * 256),
                    a: 1
                },
                gradientDirection: 'topBottom',
                barThickness: 20,
                borderColor: {
                    r: Math.floor(Math.random() * 256),
                    g: Math.floor(Math.random() * 256),
                    b: Math.floor(Math.random() * 256),
                    a: 1
                },
                borderWidth: 0
            },
            options: [
                {
                    id: 'label',
                    label: __('Label', 'gutenverse'),
                    component: TextControl,
                },
                {
                    id: 'value',
                    label: __('Value', 'gutenverse'),
                    component: RangeControl,
                    min: 0,
                    max: 500,
                    step: 1,
                },
                {
                    id: 'colorMode',
                    label: __('Color Mode', 'gutenverse'),
                    component: SelectControl,
                    options: [
                        {
                            label: __('Default', 'gutenverse'),
                            value: 'default'
                        },
                        {
                            label: __('Gradient', 'gutenverse'),
                            value: 'gradient'
                        }
                    ],
                },
                {
                    id: 'colorGradientOne',
                    show: value => value.colorMode === 'gradient',
                    label: __('Gradient Color 1', 'gutenverse'),
                    component: ColorControl,
                },
                {
                    id: 'colorGradientTwo',
                    show: value => value.colorMode === 'gradient',
                    label: __('Gradient Color 2', 'gutenverse'),
                    component: ColorControl,
                },
                {
                    id: 'gradientDirection',
                    label: __('Gradient Direction', 'gutenverse'),
                    show: value => value.colorMode === 'gradient',
                    component: SelectControl,
                    options: [
                        {
                            label: __('Top to Bottom', 'gutenverse'),
                            value: 'topBottom'
                        },
                        {
                            label: __('Left to Right', 'gutenverse'),
                            value: 'leftRight'
                        }
                    ],
                },
                {
                    id: 'gradientPosition',
                    label: __('Gradient Position', 'gutenverse'),
                    component: RangeControl,
                    min: 0,
                    max: 500,
                    step: 1,
                    unit: 'px'
                },
                {
                    id: 'backgroundColor',
                    show: value => value.colorMode === 'default' || value.colorMode === undefined,
                    label: __('Color', 'gutenverse'),
                    component: ColorControl,
                },
                {
                    id: 'borderColor',
                    label: __('Border Color', 'gutenverse'),
                    component: ColorControl,
                },
                {
                    id: 'borderWidth',
                    label: __('Border Width', 'gutenverse'),
                    component: RangeControl,
                    min: 0,
                    max: 10,
                    step: 1,
                },
            ],
        },
    ];
};