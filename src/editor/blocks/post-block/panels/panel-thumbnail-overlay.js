import { __ } from '@wordpress/i18n';
import { BackgroundControl, RangeControl } from 'gutenverse-core/controls';
import { handleBackground, } from 'gutenverse-core/styling';

export const thumbnailPanelOverlay = ({elementId}) => {
    return [
        {
            id: 'thumbnailBackground',
            label: __('Overlay Background', 'gutenverse'),
            component: BackgroundControl,
            allowDeviceControl: true,
            options: [ 'default', 'gradient' ],
            style: [
                {
                    selector: `.${elementId} .guten-postblock .guten-overlay`,
                    hasChild: true,
                    render: value => handleBackground(value)
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
            style: [
                {
                    selector: `.${elementId} .guten-postblock .guten-overlay`,
                    frontendSelector: 'img',
                    render: value => `opacity: ${value};`
                }
            ],
        },
    ];
};