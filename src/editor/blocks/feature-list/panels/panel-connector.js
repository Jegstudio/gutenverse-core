import { __ } from '@wordpress/i18n';
import { AlertControl, ColorControl, RangeControl, SelectControl } from 'gutenverse-core/controls';

export const connectorPanel = (props) => {
    const {
        showConnector
    } = props;
    return [
        {
            id: 'connector-notice',
            component: AlertControl,
            children: <>
                <span>{__('This Panel Option Only Show If You Turn On "Show Connector" Option')}</span>
            </>
        },
        {
            id: 'connectorStyle',
            label: __('Connector Style', 'gutenverse'),
            show: showConnector,
            component: SelectControl,
            options: [
                {
                    label: __('Default/Solid'),
                    value: 'solid'
                },
                {
                    label: __('Dotted'),
                    value: 'dotted'
                },
                {
                    label: __('Dashed'),
                    value: 'dashed'
                },
                {
                    label: __('Double'),
                    value: 'double'
                },
            ],
        },
        {
            id: 'connectorColor',
            label: __('Connector Color', 'gutenverse'),
            component: ColorControl,
            show: showConnector,
        },
        {
            id: 'connectorWidth',
            label: __('Connector Width', 'gutenverse'),
            component: RangeControl,
            show: showConnector,
            allowDeviceControl: true,
        }
    ];
};