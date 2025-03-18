import { __ } from '@wordpress/i18n';
import { ColorControl, DimensionControl, RangeControl, SwitchControl } from 'gutenverse-core/controls';

export const iconStylePanel = (props) => {
    const {
        elementId,
        switcher,
        setSwitcher
    } = props;

    return [
        {
            id: 'iconSize',
            label: __('Icon Size', 'gutenverse'),
            component: RangeControl,
            min: 10,
            max: 300,
            step: 1,
            allowDeviceControl: true,
            unit: 'px',
            liveStyle: [
                {
                    'type': 'plain',
                    'id': 'iconSize',
                    'responsive': true,
                    'selector': `.${elementId}.guten-fun-fact .fun-fact-inner .icon `,
                    'properties': [
                        {
                            'name': 'font-size',
                            'valueType': 'pattern',
                            'pattern': '{value}px',
                            'patternValues': {
                                'value': {
                                    'type': 'direct'
                                }
                            }
                        }
                    ]
                }
            ]
        },
        {
            id: 'iconRotate',
            label: __('Icon Rotate', 'gutenverse'),
            component: RangeControl,
            min: 1,
            max: 360,
            step: 1,
            allowDeviceControl: true,
            unit: 'deg',
            liveStyle: [
                {
                    'type': 'plain',
                    'id': 'iconRotate',
                    'responsive': true,
                    'selector': `.${elementId}.guten-fun-fact .fun-fact-inner .icon `,
                    'properties': [
                        {
                            'name': 'transform',
                            'valueType': 'pattern',
                            'pattern': 'rotate({value}deg)',
                            'patternValues': {
                                'value': {
                                    'type': 'direct'
                                }
                            }
                        }
                    ]
                }
            ]
        },
        {
            id: 'iconPadding',
            label: __('Padding', 'gutenverse'),
            component: DimensionControl,
            position: ['top', 'right', 'bottom', 'left'],
            allowDeviceControl: true,
            units: {
                px: {
                    text: 'px',
                    unit: 'px'
                },
                em: {
                    text: 'em',
                    unit: 'em'
                },
                percent: {
                    text: '%',
                    unit: '%'
                },
            },
        },
        {
            id: 'iconMargin',
            label: __('Margin', 'gutenverse'),
            component: DimensionControl,
            position: ['top', 'right', 'bottom', 'left'],
            allowDeviceControl: true,
            units: {
                px: {
                    text: 'px',
                    unit: 'px'
                },
                em: {
                    text: 'em',
                    unit: 'em'
                },
                percent: {
                    text: '%',
                    unit: '%'
                },
            },
        },
        {
            id: '__iconHover',
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
            onChange: ({ __iconHover }) => setSwitcher({ ...switcher, iconStyle: __iconHover })
        },
        {
            id: 'iconColor',
            show: !switcher.iconStyle || switcher.iconStyle === 'normal',
            label: __('Normal Color', 'gutenverse'),
            component: ColorControl,
            allowDeviceControl: true,
            liveStyle: [
                {
                    'type': 'color',
                    'id': 'iconColor',
                    'responsive': true,
                    'selector': `.${elementId}.guten-fun-fact .fun-fact-inner .icon`,
                    'properties': [
                        {
                            'name': 'color',
                            'valueType': 'direct',
                        }
                    ]
                }
            ]
        },
        {
            id: 'iconColorHover',
            show: switcher.iconStyle === 'hover',
            label: __('Hover Color', 'gutenverse'),
            component: ColorControl,
            allowDeviceControl: true,
            liveStyle: [
                {
                    'type': 'color',
                    'id': 'iconColorHover',
                    'responsive': true,
                    'selector': `.${elementId}.guten-fun-fact .fun-fact-inner:hover .icon`,
                    'properties': [
                        {
                            'name': 'color',
                            'valueType': 'direct',
                        }
                    ]
                }
            ]
        }
    ];
};