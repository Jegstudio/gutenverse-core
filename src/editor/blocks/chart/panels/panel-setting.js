import { __ } from '@wordpress/i18n';
import { IconRadioControl, SelectControl, TextControl, CheckboxControl } from 'gutenverse-core/controls';

export const settingPanel = (props) => {
    const {
        elementId,
    } = props;
    // style: [
    //     {
    //         selector: `.${elementId}`,
    //         render: value => `align-items: ${value};`
    //     },
    // ],
    
    return [
        {
            id: 'chartType',
            label: __('Chart type', 'gutenverse'),
            component: SelectControl,
            options: [
                {
                    label: __('Pie'),
                    value: 'doughnut'
                },
            ],
        },
        {
            id: 'legendDisplay',
            label: __('Show Legend', 'gutenverse'),
            component: CheckboxControl
        },
        {
            id: 'tooltipDisplay',
            label: __('Show tooltip', 'gutenverse'),
            component: CheckboxControl
        },
    ];
};