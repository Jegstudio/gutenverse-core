import { __ } from '@wordpress/i18n';
import { AlertControl, BackgroundControl, ColorControl, DimensionControl, RangeControl, SelectControl } from 'gutenverse-core/controls';

export const iconPanel = (props) => {
    const {
        elementId,
        iconEnabled
    } = props;

    return [
        {
            id: 'icon-notice',
            component: AlertControl,
            children: <>
                <span>{__('This Panel Option Only Show If You Turn On "Show Icon" Option')}</span>
            </>
        },
        {
            id: 'iconAlign',
            label: __('Icon Alignment', 'gutenverse'),
            show: iconEnabled,
            component: SelectControl,
            allowDeviceControl: true,
            options: [
                {
                    label: __('Align Top', 'gutenverse'),
                    value: 'flex-start',
                },
                {
                    label: __('Align Center', 'gutenverse'),
                    value: 'center',
                },
                {
                    label: __('Align Bottom', 'gutenverse'),
                    value: 'flex-end',
                },
            ],
        },
        {
            id: 'iconWidth',
            label: __('Width', 'gutenverse'),
            component: RangeControl,
            allowDeviceControl: true,
            show: iconEnabled,
            unit: 'px',
            min: 1,
            max: 200,
            step: 1,
            liveStyle: [
                {
                    'type': 'plain',
                    'id': 'iconWidth',
                    'responsive': true,
                    'selector': `.${elementId} .guten-postlist .guten-post a .icon-list`,
                    'properties': [
                        {
                            'name': 'width',
                            'valueType': 'pattern',
                            'pattern': '{value}px',
                            'patternValues': {
                                'value': {
                                    'type': 'direct'
                                }
                            }
                        }
                    ],
                }
            ]
        },
        {
            id: 'iconHeight',
            label: __('Height', 'gutenverse'),
            component: RangeControl,
            allowDeviceControl: true,
            show: iconEnabled,
            unit: 'px',
            min: 1,
            max: 200,
            step: 1,
            liveStyle: [
                {
                    'type': 'plain',
                    'id': 'iconHeight',
                    'responsive': true,
                    'selector': `.${elementId} .guten-postlist .guten-post a .icon-list`,
                    'properties': [
                        {
                            'name': 'height',
                            'valueType': 'pattern',
                            'pattern': '{value}px',
                            'patternValues': {
                                'value': {
                                    'type': 'direct'
                                }
                            }
                        }
                    ],
                }
            ]
        },
        {
            id: 'iconLineHeight',
            label: __('Line Height', 'gutenverse'),
            component: RangeControl,
            allowDeviceControl: true,
            show: iconEnabled,
            unit: 'px',
            min: 1,
            max: 100,
            step: 1,
            liveStyle: [
                {
                    'type': 'plain',
                    'id': 'iconLineHeight',
                    'responsive': true,
                    'selector': `.${elementId} .guten-postlist .guten-post a .icon-list`,
                    'properties': [
                        {
                            'name': 'line-height',
                            'valueType': 'pattern',
                            'pattern': '{value}px',
                            'patternValues': {
                                'value': {
                                    'type': 'direct'
                                }
                            }
                        }
                    ],
                }
            ]
        },
        {
            id: 'iconSize',
            label: __('Size', 'gutenverse'),
            component: RangeControl,
            allowDeviceControl: true,
            show: iconEnabled,
            unit: 'px',
            min: 1,
            max: 100,
            step: 1,
            liveStyle: [
                {
                    'type': 'plain',
                    'id': 'iconSize',
                    'responsive': true,
                    'selector': `.${elementId} .guten-postlist .guten-post a .icon-list i`,
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
                    ],
                }
            ]
        },
        {
            id: 'iconMargin',
            label: __('Margin', 'gutenverse'),
            component: DimensionControl,
            position: ['top', 'right', 'bottom', 'left'],
            allowDeviceControl: true,
            show: iconEnabled,
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
            id: 'iconRadius',
            label: __('Border Radius', 'gutenverse'),
            component: DimensionControl,
            position: ['top', 'right', 'bottom', 'left'],
            allowDeviceControl: true,
            show: iconEnabled,
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
            id: 'iconColor',
            label: __('Icon Color', 'gutenverse'),
            component: ColorControl,
            show: iconEnabled,
            liveStyle: [
                {
                    'type': 'color',
                    'id': 'iconColor',
                    'properties': [
                        {
                            'name': 'color',
                            'valueType': 'direct',
                        }
                    ],
                    'selector': `.${elementId} .guten-postlist .guten-post a .icon-list i`,
                }
            ]
        },
        {
            id: 'iconHoverColor',
            label: __('Icon Hover Color', 'gutenverse'),
            component: ColorControl,
            show: iconEnabled,
            liveStyle: [
                {
                    'type': 'color',
                    'id': 'iconHoverColor',
                    'properties': [
                        {
                            'name': 'color',
                            'valueType': 'direct',
                        }
                    ],
                    'selector': `.${elementId} .guten-postlist .guten-post:hover a .icon-list i`,
                }
            ]
        },
        {
            id: 'iconBackground',
            label: __('Background', 'gutenverse'),
            component: BackgroundControl,
            allowDeviceControl: true,
            options: ['default', 'gradient'],
            show: iconEnabled,
            liveStyle: [
                {
                    'type': 'background',
                    'id': 'iconBackground',
                    'selector': `.${elementId} .guten-postlist .guten-post a .icon-list`,
                }
            ]
        },
    ];
};