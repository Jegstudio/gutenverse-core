
import { __ } from '@wordpress/i18n';
import { CheckboxControl, DateTimeControl, IconRadioControl, SelectControl, TextControl } from 'gutenverse-core/controls';
import { handleAlign } from 'gutenverse-core/styling';

export const settingPanel = ({elementId, showSub}) => {
    return [
        {
            id: 'dueDate',
            label: __('Due Date', 'gutenverse'),
            component: DateTimeControl,
            minDate: 'today',
            dateFormat: 'j/M/y H:i:s',
            enableTime: true,
            show: value => ['date_range'].includes(value.rule),
            description: __('This date range using your current time zone', 'gutenverse-pro'),
        },
        {
            id: 'showLabelDays',
            label: __('Show Days', 'gutenverse'),
            component: CheckboxControl
        },
        {
            id: 'labelDays',
            label: __('Label for Days', 'gutenverse'),
            component: TextControl
        },
        {
            id: 'showLabelHours',
            label: __('Show Hours', 'gutenverse'),
            component: CheckboxControl
        },
        {
            id: 'labelHours',
            label: __('Label for Hours', 'gutenverse'),
            component: TextControl
        },
        {
            id: 'showLabelMinutes',
            label: __('Show Minutes', 'gutenverse'),
            component: CheckboxControl
        },
        {
            id: 'labelMinutes',
            label: __('Label for Minutes', 'gutenverse'),
            component: TextControl
        },
        {
            id: 'showLabelSeconds',
            label: __('Show Seconds', 'gutenverse'),
            component: CheckboxControl
        },
        {
            id: 'labelSeconds',
            label: __('Label for Seconds', 'gutenverse'),
            component: TextControl
        },
        {
            id: 'showDivider',
            label: __('Show Separator', 'gutenverse'),
            component: CheckboxControl
        },
        {
            id: 'dividerType',
            label: __('Separator Type', 'gutenverse'),
            component: SelectControl,
            options: [
                {
                    label: __('None', 'gutenverse'),
                    value: '',
                },
                {
                    label: __('Solid', 'gutenverse'),
                    value: '|',
                },
                {
                    label: __('Colon', 'gutenverse'),
                    value: ':',
                },
            ],
        }
    ];
};