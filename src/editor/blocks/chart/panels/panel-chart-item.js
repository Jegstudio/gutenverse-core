import { __ } from '@wordpress/i18n';
import { CheckboxControl, ImageControl, RangeControl, RepeaterControl, AlertControl, TextControl, ColorControl } from 'gutenverse-core/controls';

export const chartItemPanel = (props) => {
        const {chartItems, chartContent} = props;
        
        let multiValue = false;
        if (chartItems.length > 1) {
            multiValue = true;
        } else {
            multiValue = false;
        }
    return [
        {
            id: 'totalValue',
            label: __('Total Value', 'gutenverse'),
            show: multiValue,
            component: RangeControl,
            min: 0,
            max: 5000,
            step: 10,
        },
        {
            id: 'activate-notice',
            component: AlertControl,
            show: !multiValue && 'number' !== chartContent,
            children: <>
                <span>{__('If Chart has more than 1 item, Total Value will be used instead of the percentage.', 'gutenverse')}</span>
            </>
        },
        {
            id: 'chartItems',
            component: RepeaterControl,
            titleFormat: '<strong><%= value.label ? value.label : "Chart Item" %></strong>',
            repeaterDefault: {
                label: 'Chart Item',
                value: "20",
                backgroundColor: {
                    "r": 1,
                    "g": 134,
                    "b": 255,
                    "a": 1
                }
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
                    max: 100,
                    step: 1,
                },
                {
                    id: 'backgroundColor',
                    label: __('Color', 'gutenverse'),
                    component: ColorControl,
                },
            ],
        },
    ];
};