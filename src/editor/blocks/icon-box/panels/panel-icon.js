import { __ } from '@wordpress/i18n';
import { getDeviceType } from 'gutenverse-core/editor-helper';
import { CheckboxControl, ImageControl, RangeControl, SelectControl, TextControl, IconSVGControl } from 'gutenverse-core/controls';

export const panelIcon = (props) => {
    const {
        elementId,
        iconType,
    } = props;

    const deviceType = getDeviceType();

    return [
        {
            id: 'iconType',
            label: __('Icon Type', 'gutenverse'),
            component: SelectControl,
            options: [
                {
                    value: 'none',
                    label: 'None'
                },
                {
                    value: 'icon',
                    label: 'Icon'
                },
                {
                    value: 'image',
                    label: 'Image'
                },
                {
                    value: 'svg',
                    label: 'SVG'
                },
            ],
        },
        {
            id: 'icon',
            label: __('Icon', 'gutenverse'),
            component: IconSVGControl,
            show: iconType && (iconType === 'icon' || iconType === 'svg'),
        },
        {
            id: 'iconSize',
            show: iconType && (iconType === 'icon' || iconType === 'svg'),
            label: __('Icon Size', 'gutenverse'),
            component: RangeControl,
            allowDeviceControl: true,
            unit: 'px',
            min: 1,
            max: 200,
            step: 1,
            liveStyle: [
                {
                    'type': 'plain',
                    'id': 'iconSize',
                    'responsive': true,
                    'selector': `.${elementId} .guten-icon-box-wrapper .icon-box-header.icon-box .icon i`,
                    'properties': [
                        {
                            'name': 'font-size',
                            'valueType': 'pattern',
                            'pattern': '{value}px',
                            'patternValues': {
                                'value': {
                                    'type': 'direct',
                                },

                            }
                        }
                    ],
                },
                {
                    'type': 'plain',
                    'id': 'iconSize',
                    'responsive': true,
                    'selector': `.${elementId} .guten-icon-box-wrapper .icon-box-header.icon-box .icon svg`,
                    'properties': [
                        {
                            'name': 'width',
                            'valueType': 'pattern',
                            'pattern': '{value}px',
                            'patternValues': {
                                'value': {
                                    'type': 'direct',
                                },

                            }
                        }
                    ],
                }
            ],
        },
        {
            id: 'image',
            show: iconType && iconType === 'image',
            label: __('Icon Type', 'gutenverse'),
            component: ImageControl,
        },
        {
            id: 'lazyLoad',
            show: iconType && iconType === 'image',
            label: __('Set Lazy Load', 'gutenverse'),
            component: CheckboxControl,
        },
        {
            id: 'imageAlt',
            show: iconType && iconType === 'image',
            label: __('Image Alt', 'gutenverse'),
            component: TextControl,
        },
        {
            id: 'imageFit',
            show: iconType && iconType === 'image',
            label: __('Image Fit Content', 'gutenverse'),
            component: SelectControl,
            options: [
                {
                    value: 'fill',
                    label: 'Default'
                },
                {
                    value: 'contain',
                    label: 'Contain'
                },
                {
                    value: 'cover',
                    label: 'Cover'
                },
                {
                    value: 'none',
                    label: 'None'
                },
                {
                    value: 'scale-down',
                    label: 'Scale Down'
                },
            ],
        },
        {
            id: 'imageWidthResponsive',
            show: iconType && iconType === 'image' && deviceType !== 'Desktop',
            label: __('Image Width', 'gutenverse'),
            component: RangeControl,
            allowDeviceControl: true,
            unit: 'px',
            min: 1,
            max: 400,
            step: 1,
            isParseFloat: true,
            liveStyle: [
                {
                    'type': 'plain',
                    'id': 'imageWidthResponsive',
                    'selector': `.${elementId} .guten-icon-box-wrapper .icon-box .icon`,
                    'responsive': true,
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
                    ]
                }
            ],
        },
        {
            id: 'imageHeightResponsive',
            show: iconType && iconType === 'image' && deviceType !== 'Desktop',
            label: __('Image Height', 'gutenverse'),
            component: RangeControl,
            allowDeviceControl: true,
            unit: 'px',
            min: 1,
            max: 400,
            step: 1,
            isParseFloat: true,
            liveStyle: [
                {
                    'type': 'plain',
                    'id': 'imageHeightResponsive',
                    'selector': `.${elementId} .guten-icon-box-wrapper .icon-box .icon`,
                    'responsive': true,
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
                    ]
                }
            ],
        },
        {
            id: 'imageWidth',
            show: iconType && iconType === 'image' && deviceType === 'Desktop',
            label: __('Image Width', 'gutenverse'),
            showDeviceControl: true,
            component: RangeControl,
            unit: 'px',
            min: 1,
            max: 400,
            step: 1,
            isParseFloat: true,
            liveStyle: [
                {
                    'type': 'plain',
                    'id': 'imageWidth',
                    'selector': `.${elementId} .guten-icon-box-wrapper .icon-box .icon`,
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
                    ]
                }
            ],
        },
        {
            id: 'imageHeight',
            show: iconType && iconType === 'image' && deviceType === 'Desktop',
            label: __('Image Height', 'gutenverse'),
            showDeviceControl: true,
            component: RangeControl,
            unit: 'px',
            min: 1,
            max: 400,
            step: 1,
            isParseFloat: true,
            liveStyle: [
                {
                    'type': 'plain',
                    'id': 'imageHeight',
                    'selector': `.${elementId} .guten-icon-box-wrapper .icon-box .icon`,
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
                    ]
                }
            ],
        },
    ];
};

