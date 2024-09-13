
import { __ } from '@wordpress/i18n';
import { CheckboxControl, RangeControl, SelectControl, SwitchControl } from 'gutenverse-core/controls';

export const contentStylePanel = (props) => {
    const {
        elementId,
        oneForAll,
        switcher,
        setSwitcher,
    } = props;
    return [
        {
            id: 'oneForAll',
            label: __('One For All', 'gutenverse'),
            component: CheckboxControl
        },
        {
            id: '__tabTime',
            component: SwitchControl,
            show: ! oneForAll,
            options: [
                {
                    value: 'days',
                    label: 'Days'
                },
                {
                    value: 'hours',
                    label: 'Hours'
                },
                {
                    value: 'minutes',
                    label: 'Minutes'
                },
                {
                    value: 'seconds',
                    label: 'Seconds'
                }
            ],
            onChange: ({ __tabTime }) => setSwitcher({ ...switcher, tabTime: __tabTime })
        },
    ];
};