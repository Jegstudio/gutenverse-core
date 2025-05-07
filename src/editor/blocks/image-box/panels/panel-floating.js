import { __ } from '@wordpress/i18n';
import { RangeControl, SwitchControl } from 'gutenverse-core/controls';

export const panelFloating = props => {
    const {
        elementId,
        switcher,
        setSwitcher,
    } = props;

    return [
        {
            id: 'floatMarginTop',
            label: __('Margin Top', 'gutenverse'),
            component: RangeControl,
            min: -100,
            max: 100,
            step: 1,
            allowDeviceControl: true,
            unit: 'px',
            liveStyle: [
                {
                    'type': 'plain',
                    'id': 'floatMarginTop',
                    'responsive': true,
                    'selector': `.${elementId}.gutenverse-image-box.style-floating .inner-container .image-box-body .body-inner`,
                    'properties': [
                        {
                            'name': 'margin-top',
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
            id: 'floatWidth',
            label: __('Width', 'gutenverse'),
            component: RangeControl,
            min: 1,
            max: 100,
            step: 1,
            allowDeviceControl: true,
            unit: '%',
            liveStyle: [
                {
                    'type': 'plain',
                    'id': 'floatWidth',
                    'responsive': true,
                    'selector': `.${elementId}.gutenverse-image-box.style-floating .inner-container .image-box-body`,
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
                    ]
                }
            ]
        },
        {
            id: '__imageBoxFloat',
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
            onChange: ({ __imageBoxFloat }) => setSwitcher({ ...switcher, imageBoxFloat: __imageBoxFloat })
        },
        {
            id: 'floatHeight',
            show: !switcher.imageBoxFloat || switcher.imageBoxFloat === 'normal',
            label: __('Normal Height', 'gutenverse'),
            component: RangeControl,
            min: 1,
            max: 500,
            step: 1,
            allowDeviceControl: true,
            unit: 'px',
            liveStyle: [
                {
                    'type': 'plain',
                    'id': 'floatHeight',
                    'responsive': true,
                    'selector': `.${elementId}.gutenverse-image-box.style-floating .inner-container .image-box-body .body-inner`,
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
            ]
        },
        {
            id: 'floatHeightHover',
            show: switcher.imageBoxFloat === 'hover',
            label: __('Hover Height', 'gutenverse'),
            component: RangeControl,
            min: 1,
            max: 500,
            step: 1,
            allowDeviceControl: true,
            unit: 'px',
            liveStyle: [
                {
                    'type': 'plain',
                    'id': 'floatHeightHover',
                    'responsive': true,
                    'selector': `.${elementId}.gutenverse-image-box.style-floating:hover .inner-container .image-box-body .body-inner`,
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
            ]
        },
    ];
};