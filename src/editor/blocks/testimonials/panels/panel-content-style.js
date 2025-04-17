import { __ } from '@wordpress/i18n';

import { AlignCenter, AlignLeft, AlignRight } from 'gutenverse-core/components';
import { BackgroundControl, BorderControl, BorderResponsiveControl, BoxShadowControl, DimensionControl, IconRadioControl, SwitchControl } from 'gutenverse-core/controls';
import { getDeviceType } from 'gutenverse-core/editor-helper';

export const panelContentStyle = ({ elementId, switcher, setSwitcher }) => {
    const device = getDeviceType();

    return [
        {
            id: 'alignText',
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
            id: 'containerMargin',
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
            id: 'containerPadding',
            label: __('Padding', 'gutenverse'),
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
            id: '__containerStyleHover',
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
            onChange: ({ __containerStyleHover }) => setSwitcher({ ...switcher, containerStyle: __containerStyleHover })
        },
        {
            id: 'containerBackground',
            show: !switcher.containerStyle || switcher.containerStyle === 'normal',
            component: BackgroundControl,
            allowDeviceControl: true,
            options: ['default', 'gradient'],
            liveStyle: [
                {
                    'type': 'background',
                    'id': 'containerBackground',
                    'selector': `.${elementId} .guten-testimonial-item .testimonial-box`,
                }
            ]
        },
        {
            id: 'containerBackgroundHover',
            show: switcher.containerStyle === 'hover',
            component: BackgroundControl,
            allowDeviceControl: true,
            options: ['default', 'gradient'],
        },
        {
            id: 'containerBorder',
            show: (!switcher.containerStyle || switcher.containerStyle === 'normal') && device === 'Desktop',
            label: __('Border', 'gutenverse'),
            component: BorderControl,
            liveStyle: [
                {
                    'type': 'border',
                    'id': 'containerBorder',
                    'selector': `.guten-testimonials.${elementId} .swiper-container .guten-testimonial-item .testimonial-box`,
                }
            ]
        },
        {
            id: 'containerBorderResponsive',
            show: (!switcher.containerStyle || switcher.containerStyle === 'normal') && device !== 'Desktop',
            label: __('Border', 'gutenverse'),
            component: BorderResponsiveControl,
            allowDeviceControl: true,
            liveStyle: [
                {
                    'type': 'borderResponsive',
                    'id': 'containerBorderResponsive',
                    'selector': `.guten-testimonials.${elementId} .swiper-container .guten-testimonial-item .testimonial-box`,
                }
            ]
        },
        {
            id: 'containerBoxShadow',
            show: !switcher.containerStyle || switcher.containerStyle === 'normal',
            label: __('Box Shadow', 'gutenverse'),
            component: BoxShadowControl,
            liveStyle: [
                {
                    'type': 'boxShadow',
                    'id': 'containerBoxShadow',
                    'properties': [
                        {
                            'name': 'box-shadow',
                            'valueType': 'direct'
                        }
                    ],
                    'selector': `.guten-testimonials.${elementId} .swiper-container .guten-testimonial-item .testimonial-box`,
                }
            ]
        },
        {
            id: 'containerBorderHover',
            show: switcher.containerStyle === 'hover' && device === 'Desktop',
            label: __('Border', 'gutenverse'),
            component: BorderControl,
        },
        {
            id: 'containerBorderHoverResponsive',
            show: switcher.containerStyle === 'hover' && device !== 'Desktop',
            label: __('Border', 'gutenverse'),
            component: BorderResponsiveControl,
            allowDeviceControl: true,
        },
        {
            id: 'containerBoxShadowHover',
            show: switcher.containerStyle === 'hover',
            label: __('Box Shadow', 'gutenverse'),
            component: BoxShadowControl,
        }
    ];
};