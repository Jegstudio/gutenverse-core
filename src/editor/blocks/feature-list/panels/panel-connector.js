import { __ } from '@wordpress/i18n';
import { AlertControl, ColorControl, RangeControl, SelectControl, SizeControl } from 'gutenverse-core/controls';
import { handleColor } from 'gutenverse-core/styling';

export const connectorPanel = (props) => {
    const {
        elementId,
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
            style: [
                {
                    selector: `.${elementId}.guten-feature-list .feature-list-wrapper .feature-list-item .connector`,
                    render: value => `border-style: ${value};`
                }
            ]
        },
        {
            id: 'connectorColor',
            label: __('Connector Color', 'gutenverse'),
            component: ColorControl,
            show: showConnector,
            style: [
                {
                    selector: `.${elementId}.guten-feature-list .feature-list-wrapper .feature-list-item .connector`,
                    render: value => handleColor(value, 'border-color')
                }
            ]
        },
        {
            id: 'connectorWidth',
            label: __('Connector Width', 'gutenverse'),
            component: RangeControl,
            show: showConnector,
            allowDeviceControl: true,
            style: [
                {
                    selector: `.${elementId}.guten-feature-list .feature-list-wrapper .feature-list-item .connector`,
                    render: value => `border-width : ${value}px;`
                },
                {
                    selector: `.${elementId}.guten-feature-list`,
                    render: value => `--connector-width: ${value}px;`
                },
            ]
        }
    ];
};