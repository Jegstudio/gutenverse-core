import { __ } from '@wordpress/i18n';
import { DimensionControl, RangeControl, SelectControl, BorderResponsiveControl } from 'gutenverse-core/controls';

export const imagePanel = (props) => {
    const {
        elementId,
    } = props;

    return [
        {
            id: 'imageWidth',
            label: __('Width', 'gutenverse'),
            component: RangeControl,
            allowDeviceControl: true,
            unit: '%',
            min: 1,
            max: 100,
            step: 1,
            liveStyle: [
                {
                    'type': 'plain',
                    'id': 'imageWidth',
                    'responsive': true,
                    'selector': `.${elementId} .guten-postlist .guten-post a img`,
                    'properties': [
                        {
                            'name': 'width',
                            'valueType': 'pattern',
                            'pattern': '{value}%',
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
            id: 'imageHeight',
            label: __('Height', 'gutenverse'),
            component: RangeControl,
            allowDeviceControl: true,
            unit: 'px',
            min: 1,
            max: 1000,
            step: 1,
            liveStyle: [
                {
                    'type': 'plain',
                    'id': 'imageHeight',
                    'responsive': true,
                    'selector': `.${elementId} .guten-postlist .guten-post a img`,
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
            id: 'imageMargin',
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
            id: 'imageBorder',
            label: __('Border', 'gutenverse'),
            component: BorderResponsiveControl,
            allowDeviceControl: true,
            liveStyle: [
                {
                    'type': 'borderResponsive',
                    'id': 'imageBorder',
                    'selector': `.${elementId} .guten-postlist .guten-post a img`,
                }
            ]
        },
    ];
};