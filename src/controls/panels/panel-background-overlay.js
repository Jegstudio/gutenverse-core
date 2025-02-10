import { BackgroundControl, RangeControl, SwitchControl } from 'gutenverse-core/controls';
import { __ } from '@wordpress/i18n';

export const backgroundOverlayPanel = (props) => {
    const {
        normalOptions,
        hoverOptions,
        switcher,
        setSwitcher
    } = props;

    return [
        {
            id: '__bgOverlayHover',
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
            onChange: ({ __bgOverlayHover }) => setSwitcher({ ...switcher, bgOverlay: __bgOverlayHover })
        },
        {
            id: 'backgroundOverlay',
            show: !switcher.bgOverlay || switcher.bgOverlay === 'normal',
            component: BackgroundControl,
            allowDeviceControl: true,
            options: normalOptions,
        },
        {
            id: 'opacity',
            show: !switcher.bgOverlay || switcher.bgOverlay === 'normal',
            label: __('Opacity Normal', '--gctd--'),
            component: RangeControl,
            min: 0.1,
            max: 1,
            step: 0.1,
        },
        {
            id: 'backgroundOverlayHover',
            show: switcher.bgOverlay === 'hover',
            component: BackgroundControl,
            allowDeviceControl: true,
            options: hoverOptions,
        },
        {
            id: 'opacityHover',
            show: switcher.bgOverlay === 'hover',
            label: __('Opacity Hover', '--gctd--'),
            component: RangeControl,
            min: 0.1,
            max: 1,
            step: 0.1,
        },
    ];
};