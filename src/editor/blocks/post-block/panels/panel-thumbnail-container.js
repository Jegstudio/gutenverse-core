import { __ } from '@wordpress/i18n';
import { BackgroundControl, BoxShadowControl, DimensionControl, RangeControl } from 'gutenverse-core/controls';

export const thumbnailContainerPanel = ({ elementId }) => {
    return [
        {
            id: 'thumbnailHeight',
            label: __('Height', 'gutenverse'),
            component: RangeControl,
            min: 0,
            max: 1000,
            step: 1,
            allowDeviceControl: true,
            unit: 'px',
            liveStyle: [
                {
                    'type': 'plain',
                    'id': 'thumbnailHeight',
                    'responsive': true,
                    'selector': `.${elementId} .guten-postblock .guten-thumb .thumbnail-container`,
                    'properties': [
                        {
                            'name': 'height',
                            'valueType': 'pattern',
                            'pattern': '{value}px; padding-bottom: 0',
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
            id: 'thumbnailContainerBackground',
            label: __('Background', 'gutenverse'),
            component: BackgroundControl,
            allowDeviceControl: true,
            options: ['default', 'gradient'],
            liveStyle: [
                {
                    'type': 'background',
                    'id': 'thumbnailContainerBackground',
                    'selector': `.${elementId} .guten-postblock .guten-thumb .thumbnail-container`,
                }
            ]
        },
        {
            id: 'thumbnailRadius',
            label: __('Border Radius', 'gutenverse'),
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
            id: 'thumbnailContainerShadow',
            label: __('Box Shadow', 'gutenverse'),
            component: BoxShadowControl,
            liveStyle: [
                {
                    'type': 'boxShadow',
                    'id': 'thumbnailContainerShadow',
                    'properties': [
                        {
                            'name': 'box-shadow',
                            'valueType': 'direct'
                        }
                    ],
                    'selector': `.${elementId} .guten-postblock .guten-thumb .thumbnail-container`,
                }
            ]
        },
    ];
};