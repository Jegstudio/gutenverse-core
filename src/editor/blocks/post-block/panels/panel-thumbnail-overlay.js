import { __ } from '@wordpress/i18n';
import { BackgroundControl, RangeControl } from 'gutenverse-core/controls';

export const thumbnailPanelOverlay = ({ elementId }) => {
    return [
        {
            id: 'thumbnailBackground',
            label: __('Overlay Background', 'gutenverse'),
            component: BackgroundControl,
            allowDeviceControl: true,
            options: ['default', 'gradient'],
            liveStyle: [
                {
                    'type': 'background',
                    'id': 'thumbnailBackground',
                    'selector': `.${elementId} .guten-postblock .guten-overlay`,
                }
            ]
        },
        {
            id: 'thumbnailOverlayOpacity',
            label: __('Overlay Opacity', 'gutenverse'),
            component: RangeControl,
            min: 0,
            max: 1,
            step: 0.01,
            allowDeviceControl: true,
            liveStyle: [
                {
                    'type': 'plain',
                    'id': 'thumbnailOverlayOpacity',
                    'responsive': true,
                    'selector': `.${elementId} .guten-postblock .guten-overlay`,
                    'properties': [
                        {
                            'name': 'opacity',
                            'valueType': 'direct'
                        }
                    ]
                }
            ]
        },
    ];
};