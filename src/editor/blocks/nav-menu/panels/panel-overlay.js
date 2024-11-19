import { __ } from '@wordpress/i18n';
import { RangeControl, SelectControl, BackgroundControl, AlertControl, SwitchControl } from 'gutenverse-core/controls';
import { handleColor, handleBackground } from 'gutenverse-core/styling';

export const overlayPanel = (props) => {
    const {
        elementId,
        switcher,
        setSwitcher,
    } = props;

    return [
        {
            id: 'overlayBackground',
            component: BackgroundControl,
            label: __('Overlay Background', 'gutenverse'),
            allowDeviceControl: true,
            options: ['default', 'gradient'],
            style: [
                {
                    selector: `.${elementId}.mobile.tablet-breakpoint .guten-nav-menu .guten-nav-overlay.active, 
                    .${elementId}.tablet.tablet-breakpoint .guten-nav-menu .guten-nav-overlay.active`,
                    hasChild: true,
                    render: value => handleBackground(value)
                }
            ]
        },
        {
            id: 'overlayOpacity',
            label: __('Overlay Opacity', 'gutenverse'),
            component: RangeControl,
            min: 0,
            max: 100,
            step: 1,
            allowDeviceControl: true,
            style: [
                {
                    selector: `.${elementId}.mobile.tablet-breakpoint .guten-nav-menu .guten-nav-overlay.active, 
                    .${elementId}.tablet.tablet-breakpoint .guten-nav-menu .guten-nav-overlay.active`,
                    render: value => `opacity: calc(${value}/100);`
                }
            ]
        },
        {
            id: 'overlayPointer',
            label: __('Overlay Pointer Event', 'gutenverse'),
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
                    selector: `.${elementId}.mobile.tablet-breakpoint .guten-nav-menu .guten-nav-overlay.active, 
                    .${elementId}.tablet.tablet-breakpoint .guten-nav-menu .guten-nav-overlay.active`,
                    render: value => `pointer-events: ${value} !important;`
                }
            ]
        },
        {
            id: 'blur-notice',
            component: AlertControl,
            children: <>
                <span>{__('This option will blur background and anything behind this element', 'gutenverse')}</span>
            </>
        },
        {
            id: '__blurHover',
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
            onChange: ({ __blurHover }) => setSwitcher({ ...switcher, state: __blurHover })
        },
        {
            id: 'overlayBlur',
            label: __('Overlay Blur', 'gutenverse'),
            show: !switcher.state || switcher.state === 'normal',
            component: RangeControl,
            min: 0,
            max: 100,
            allowDeviceControl: true,
            style: [
                {
                    selector: `.${elementId}.mobile.tablet-breakpoint .guten-nav-menu .guten-nav-overlay.active, 
                    .${elementId}.tablet.tablet-breakpoint .guten-nav-menu .guten-nav-overlay.active`,
                    render: value => `-webkit-backdrop-filter: blur(${value}px); backdrop-filter: blur(${value}px);`
                }
            ]
        }
    ];
};