import { BackgroundControl, RangeControl, SwitchControl } from 'gutenverse-core/controls';
import { __ } from '@wordpress/i18n';

export const backgroundOverlayPanel = (props) => {
    const {
        elementId,
        normalOptions,
        hoverOptions,
        switcher,
        setSwitcher,
        hoverSelector,
        normalSelector
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
            liveStyle: [
                {
                    'type': 'background',
                    'id': 'backgroundOverlay',
                    'selector': normalSelector ? normalSelector :`.${elementId} > .guten-background-overlay`,
                }
            ]
        },
        {
            id: 'opacity',
            show: !switcher.bgOverlay || switcher.bgOverlay === 'normal',
            label: __('Opacity Normal', '--gctd--'),
            component: RangeControl,
            min: 0.1,
            max: 1,
            step: 0.1,
            liveStyle: [
                {
                    'type': 'plain',
                    'id': 'opacity',
                    'selector': normalSelector ? normalSelector :`.${elementId} > .guten-background-overlay`,
                    'properties': [
                        {
                            'name': 'opacity',
                            'valueType': 'direct',
                        }
                    ],
                }
            ]
        },
        {
            id: 'backgroundOverlayHover',
            show: switcher.bgOverlay === 'hover',
            component: BackgroundControl,
            allowDeviceControl: true,
            options: hoverOptions,
            liveStyle: [
                {
                    'type': 'background',
                    'id': 'backgroundOverlayHover',
                    'selector': hoverSelector ? hoverSelector :`.${elementId}:hover > .guten-background-overlay`,
                }
            ]
        },
        {
            id: 'opacityHover',
            show: switcher.bgOverlay === 'hover',
            label: __('Opacity Hover', '--gctd--'),
            component: RangeControl,
            min: 0.1,
            max: 1,
            step: 0.1,
            liveStyle: [
                {
                    'type': 'plain',
                    'id': 'opacityHover',
                    'selector': hoverSelector ? hoverSelector :`.${elementId}:hover > .guten-background-overlay`,
                    'properties': [
                        {
                            'name': 'opacity',
                            'valueType': 'direct',
                        }
                    ],
                }
            ]
        },
    ];
};