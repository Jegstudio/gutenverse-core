import { __ } from '@wordpress/i18n';
import { RangeControl, SelectControl, BackgroundControl, AlertControl, ColorControl } from 'gutenverse-core/controls';
import { handleBackground, handleColor } from 'gutenverse-core/styling';

export const overlayPanel = (props) => {
    const {
        elementId,
        mobileEnableOverlay,
    } = props;

    return [
        {
            id: 'activate-notice',
            component: AlertControl,
            show: !mobileEnableOverlay,
            children: <>
                <span>{__('You need to enable the overlay first in the "Mobile Menu" panel to use this setting!', 'gutenverse')}</span>
            </>
        },
        {
            id: 'overlayBackground',
            component: BackgroundControl,
            label: __('Overlay Background', 'gutenverse'),
            show: mobileEnableOverlay,
            allowDeviceControl: true,
            options: ['default', 'gradient'],
            style: [
                {
                    selector: `.${elementId}.mobile.tablet-breakpoint .guten-nav-menu .guten-nav-overlay, 
                    .${elementId}.tablet.tablet-breakpoint .guten-nav-menu .guten-nav-overlay`,
                    hasChild: true,
                    render: value => handleBackground(value)
                }
            ]
        },
        {
            id: 'overlayOpacity',
            label: __('Overlay Opacity', 'gutenverse'),
            show: mobileEnableOverlay,
            component: RangeControl,
            min: 0,
            max: 100,
            step: 1,
            allowDeviceControl: true,
            style: [
                {
                    selector: `.${elementId}.mobile.tablet-breakpoint .guten-nav-menu .guten-nav-overlay, 
                    .${elementId}.tablet.tablet-breakpoint .guten-nav-menu .guten-nav-overlay`,
                    render: value => `opacity: calc(${value}/100);`
                }
            ]
        },
        {
            id: 'overlayPointer',
            label: __('Overlay Pointer Event', 'gutenverse'),
            show: mobileEnableOverlay,
            component: SelectControl,
            options: [
                {
                    label: __('None'),
                    value: 'none'
                },
                {
                    label: __('Auto'),
                    value: 'auto'
                },
            ],
            style: [
                {
                    selector: `.${elementId}.mobile.tablet-breakpoint .guten-nav-menu .guten-nav-overlay, 
                    .${elementId}.tablet.tablet-breakpoint .guten-nav-menu .guten-nav-overlay`,
                    render: value => `pointer-events: ${value} !important;`
                }
            ]
        },
        {
            id: 'blur-notice',
            component: AlertControl,
            show: mobileEnableOverlay,
            children: <>
                <span>{__('This option will blur background and anything behind this element', 'gutenverse')}</span>
            </>
        },
        {
            id: 'overlayBlur',
            label: __('Overlay Blur', 'gutenverse'),
            show: mobileEnableOverlay,
            component: RangeControl,
            min: 0,
            max: 100,
            allowDeviceControl: true,
            style: [
                {
                    selector: `.${elementId}.mobile.tablet-breakpoint .guten-nav-menu .guten-nav-overlay, 
                    .${elementId}.tablet.tablet-breakpoint .guten-nav-menu .guten-nav-overlay`,
                    render: value => `-webkit-backdrop-filter: blur(${value}px); backdrop-filter: blur(${value}px);`
                }
            ]
        }
    ];
};