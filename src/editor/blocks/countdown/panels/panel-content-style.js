
import { __ } from '@wordpress/i18n';
import { RangeControl, SelectControl } from 'gutenverse-core/controls';

export const contentStylePanel = (props) => {
    const {
        elementId,
    } = props;
    return [
        {
            id: 'column',
            label: __('Column', 'gutenverse'),
            component: RangeControl,
            min: 1,
            max: 4,
            allowDeviceControl: true,
            style: [
                {
                    selector: `.editor-styles-wrapper .${elementId}.guten-countdown .guten-countdown-wrapper .time-container`,
                    render: value => `flex : 0 0 calc( 100% / ${value} ); max-width: calc( (100% / ${value}) - 1%);`
                }
            ]
        },
        {
            id: 'rowGap',
            label: __('Row Gap', 'gutenverse'),
            component: RangeControl,
            min: 1,
            max: 100,
            unit: 'px',
            allowDeviceControl: true,
            style: [
                {
                    selector: `.editor-styles-wrapper .${elementId}.guten-countdown .guten-countdown-wrapper`,
                    render: value => `row-gap: ${value}px;`
                }
            ]
        },
        {
            id: 'labelPosition',
            label: __('Label Position', 'gutenverse'),
            component: SelectControl,
            options: [
                {
                    label: __('Top', 'gutenverse'),
                    value: 'top',
                },
                {
                    label: __('Bottom', 'gutenverse'),
                    value: 'bottom',
                },
                {
                    label: __('Left', 'gutenverse'),
                    value: 'left',
                },
                {
                    label: __('Right', 'gutenverse'),
                    value: 'right',
                },
            ],
            style: [
                {
                    selector: `.editor-styles-wrapper .${elementId}.guten-countdown .time-container`,
                    render: (value) => {
                        if( 'top' === value || 'bottom' === value){
                            return 'flex-direction: column;';
                        }else{
                            return 'flex-direction: row;';
                        }
                    }
                }
            ]
        },
        {
            id: 'labelSpacing',
            label: __('Label Spacing', 'gutenverse'),
            component: RangeControl,
            min: 1,
            max: 100,
            unit: 'px',
            allowDeviceControl: true,
            style: [
                {
                    selector: `.editor-styles-wrapper .${elementId}.guten-countdown .time-container`,
                    render: value => `gap: ${value}px;`
                }
            ]
        },
    ];
};