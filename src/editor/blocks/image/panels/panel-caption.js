import { __ } from '@wordpress/i18n';
import { ColorControl, RangeControl, SelectControl, TextControl, TypographyControl } from 'gutenverse-core/controls';

export const captionPanel = (props) => {
    const {
        elementId,
        captionType
    } = props;

    return [
        {
            id: 'captionType',
            label: __('Show Caption', 'gutenverse'),
            component: SelectControl,
            options: [
                {
                    label: 'None',
                    value: 'none'
                },
                {
                    label: 'Caption from Image',
                    value: 'original'
                },
                {
                    label: 'Custom Caption',
                    value: 'custom'
                },
            ]
        },
        {
            id: 'captionCustom',
            show: captionType === 'custom',
            label: __('Custom Caption', 'gutenverse'),
            component: TextControl,
        },
        {
            id: 'captionSpace',
            label: __('Caption Space', 'gutenverse'),
            component: RangeControl,
            min: 0,
            max: 100,
            step: 1,
            allowDeviceControl: true,
            unit: 'px',
            liveStyle: [
                {
                    'type': 'plain',
                    'id': 'captionSpace',
                    'responsive': true,
                    'selector': `.${elementId} .guten-caption`,
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
            id: 'typography',
            label: __('Typography', 'gutenverse'),
            component: TypographyControl,
        },
        {
            id: 'captionColor',
            label: __('Caption Color', 'gutenverse'),
            component: ColorControl,
            liveStyle: [
                {
                    'type': 'color',
                    'id': 'captionColor',
                    'selector': `.${elementId} .guten-caption`,
                    'properties': [
                        {
                            'name': 'color',
                            'valueType': 'direct'
                        }
                    ]
                }
            ]
        },
    ];
};

