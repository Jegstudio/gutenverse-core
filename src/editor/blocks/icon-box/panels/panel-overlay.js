import { __ } from '@wordpress/i18n';
import { BackgroundControl, SelectControl, SwitchControl } from 'gutenverse-core/controls';
import { handleBackground } from 'gutenverse-core/controls';

export const panelOverlay = (props) => {
    const {
        elementId,
        switcher,
        setSwitcher
    } = props;

    return [
        {
            id: '__iconBoxOverlay',
            component: SwitchControl,
            options: [
                {
                    value: 'normal',
                    label: 'Normal'
                },
                {
                    value: 'hover',
                    label: 'Hover'
                }
            ],
            onChange: ({__iconBoxOverlay}) => setSwitcher({...switcher, iconBoxOverlay: __iconBoxOverlay})
        },
        {
            id: 'iconBoxOverlay',
            show: !switcher.iconBoxOverlay || switcher.iconBoxOverlay === 'normal',
            component: BackgroundControl,
            allowDeviceControl: true,
            options: ['default', 'gradient'],
            style: [
                {
                    selector: `.${elementId} .guten-icon-box-wrapper:before`,
                    hasChild: true,
                    render: value => handleBackground(value)
                }
            ]
        },
        {
            id: 'iconBoxHoverOverlay',
            show: switcher.iconBoxOverlay === 'hover',
            component: BackgroundControl,
            allowDeviceControl: true,
            options: ['default', 'gradient'],
            style: [
                {
                    selector: `.${elementId} .guten-icon-box-wrapper:hover:before`,
                    hasChild: true,
                    render: value => handleBackground(value)
                }
            ]
        },
        {
            id: 'iconBoxOverlayDirection',
            label: __('Overlay Direction', 'gutenverse'),
            component: SelectControl,
            options: [
                {
                    label: 'Left',
                    value: 'left'
                },
                {
                    label: 'Right',
                    value: 'right'
                },
                {
                    label: 'Top',
                    value: 'top'
                },
                {
                    label: 'Bottom',
                    value: 'bottom'
                },
                {
                    label: 'Arise',
                    value: 'arise'
                },
            ]
        }
    ];
};

