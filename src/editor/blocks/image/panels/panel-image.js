import { __ } from '@wordpress/i18n';
import { AlignCenter, AlignLeft, AlignRight } from 'gutenverse-core/components';
import { BorderControl, BorderResponsiveControl, BoxShadowControl, IconRadioControl, ImageFilterControl, RangeControl, SelectControl, SizeControl } from 'gutenverse-core/controls';
import { getDeviceType } from 'gutenverse-core/editor-helper';

export const imagePanel = ({ elementId }) => {
    const device = getDeviceType();

    return [
        {
            id: 'align',
            label: __('Alignment', 'gutenverse'),
            component: IconRadioControl,
            allowDeviceControl: true,
            options: [
                {
                    label: __('Align Left', 'gutenverse'),
                    value: 'left',
                    icon: <AlignLeft />,
                },
                {
                    label: __('Align Center', 'gutenverse'),
                    value: 'center',
                    icon: <AlignCenter />,
                },
                {
                    label: __('Align Right', 'gutenverse'),
                    value: 'right',
                    icon: <AlignRight />,
                },
            ],
        },
        {
            id: 'width',
            label: __('Width', 'gutenverse'),
            component: SizeControl,
            allowDeviceControl: true,
            units: {
                px: {
                    text: 'px',
                    min: 1,
                    max: 1000,
                    step: 1
                },
                ['%']: {
                    text: '%',
                    min: 1,
                    max: 100,
                    step: 1
                },
                vw: {
                    text: 'vw',
                    min: 1,
                    max: 100,
                    step: 1
                },
            },
            liveStyle: [
                {
                    'type': 'unitPoint',
                    'id': 'width',
                    'responsive': true,
                    'selector': `.${elementId}.guten-image img`,
                    'properties': [
                        {
                            'name': 'width',
                            'valueType': 'direct'
                        }
                    ]
                }
            ]
        },
        {
            id: 'height',
            label: __('Height', 'gutenverse'),
            component: SizeControl,
            allowDeviceControl: true,
            units: {
                px: {
                    text: 'px',
                    min: 1,
                    max: 500,
                    step: 1
                },
                vh: {
                    text: 'vh',
                    min: 1,
                    max: 100,
                    step: 1
                },
            },
            liveStyle: [
                {
                    'type': 'unitPoint',
                    'id': 'height',
                    'responsive': true,
                    'selector': `.${elementId}.guten-image img`,
                    'properties': [
                        {
                            'name': 'height',
                            'valueType': 'direct'
                        }
                    ]
                }
            ]
        },
        {
            id: 'opacity',
            label: __('Opacity', 'gutenverse'),
            component: RangeControl,
            min: 0.1,
            max: 1,
            step: 0.1,
            isParseFloat: false,
            liveStyle: [
                {
                    'type': 'plain',
                    'id': 'opacity',
                    'selector': `.${elementId}.guten-image img`,
                    'properties': [
                        {
                            'name': 'opacity',
                            'valueType': 'direct'
                        }
                    ]
                }
            ]
        },
        {
            id: 'imgFilter',
            label: __('Image Filter', 'gutenverse'),
            component: ImageFilterControl,
            liveStyle: [
                {
                    'type': 'plain',
                    'id': 'imgFilter',
                    'selector': `.${elementId}.guten-image img`,
                    'properties': [
                        {
                            'name': 'filter',
                            'valueType': 'function',
                            'functionName': 'handleFilterImage',
                        }
                    ],
                }
            ]
        },
        {
            id: 'imageFit',
            label: __('Image Fit', 'gutenverse'),
            component: SelectControl,
            allowDeviceControl: true,
            options: [
                {
                    label: 'Default',
                    value: 'default'
                },
                {
                    label: 'Fill',
                    value: 'fill'
                },
                {
                    label: 'Cover',
                    value: 'cover'
                },
                {
                    label: 'Contain',
                    value: 'contain'
                },
            ],
        },
        {
            id: 'imgBorder',
            show: device === 'Desktop',
            label: __('Border', 'gutenverse'),
            component: BorderControl,
            liveStyle: [
                {
                    'type': 'border',
                    'id': 'imgBorder',
                    'selector': `.${elementId}.guten-image img`,
                }
            ]
        },
        {
            id: 'imgBorderResponsive',
            show: device !== 'Desktop',
            label: __('Border', 'gutenverse'),
            component: BorderResponsiveControl,
            allowDeviceControl: true,
            liveStyle: [
                {
                    'type': 'borderResponsive',
                    'id': 'imgBorderResponsive',
                    'selector': `.${elementId}.guten-image img`,
                }
            ]
        },
        {
            id: 'imgShadow',
            label: __('Box Shadow', 'gutenverse'),
            component: BoxShadowControl,
            liveStyle: [
                {
                    'type': 'boxShadow',
                    'id': 'imgShadow',
                    'properties': [
                        {
                            'name': 'box-shadow',
                            'valueType': 'direct'
                        }
                    ],
                    'selector': `.${elementId}.guten-image img`,
                }
            ]
        }
    ];
};