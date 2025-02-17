import { __ } from '@wordpress/i18n';

import { AlignCenter, AlignLeft, AlignRight } from 'gutenverse-core/components';
import { AlertControl, BackgroundControl, BorderControl, BorderResponsiveControl, ColorControl, DimensionControl, HeadingControl, IconRadioControl, TypographyControl } from 'gutenverse-core/controls';
import { getDeviceType } from 'gutenverse-core/editor-helper';

export const itemCardPanel = (props) => {
    const {
        elementId,
        layout
    } = props;

    const device = getDeviceType();
    if (layout !== 'card') return [
        {
            id: 'divider-notice',
            component: AlertControl,
            children: <>
                <span>{__('This Panel Option Only Show If You Choose "Card" for Layout Option')}</span>
            </>
        },
    ];

    return [
        {
            id: 'itemCardBackground',
            component: BackgroundControl,
            allowDeviceControl: true,
            options: ['default', 'gradient'],
            liveStyle: [
                {
                    'type': 'background',
                    'id': 'itemCardBackground',
                    'selector': `.${elementId}.guten-gallery .gallery-items .gallery-item-wrap .grid-item .caption-wrap.style-card`,
                }
            ]
        },
        {
            id: 'itemCardPadding',
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
                ['%']: {
                    text: '%',
                    unit: '%'
                },
            },
        },
        {
            id: 'itemCardBorder',
            show: device === 'Desktop',
            label: __('Border', 'gutenverse'),
            component: BorderControl,
            liveStyle: [
                {
                    'type': 'border',
                    'id': 'itemCardBorder',
                    'selector': `.${elementId}.guten-gallery .gallery-items .gallery-item-wrap .grid-item .caption-wrap.style-card`,
                }
            ]
        },
        {
            id: 'itemCardBorderResponsive',
            show: device !== 'Desktop',
            label: __('Border', 'gutenverse'),
            component: BorderResponsiveControl,
            allowDeviceControl: true,
            liveStyle: [
                {
                    'type': 'borderResponsive',
                    'id': 'itemCardBorderResponsive',
                    'selector': `.${elementId}.guten-gallery .gallery-items .gallery-item-wrap .grid-item .caption-wrap.style-card`,
                }
            ]
        },
        {
            id: 'itemCardAlign',
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
            ]
        },
        {
            id: 'submenuSplitter2',
            component: HeadingControl,
            label: __('Title Style')
        },
        {
            id: 'itemCardTitleColor',
            label: __('Color', 'gutenverse'),
            component: ColorControl,
            liveStyle: [
                {
                    'type': 'color',
                    'id': 'itemCardTitleColor',
                    'selector': `.${elementId}.guten-gallery .gallery-items .gallery-item-wrap .grid-item .caption-wrap.style-card .item-caption-over .item-title`,
                    'properties': [
                        {
                            'name': 'color',
                            'valueType': 'direct'
                        }
                    ]
                }
            ]
        },
        {
            id: 'itemCardTitleColorHover',
            label: __('Hover Color', 'gutenverse'),
            component: ColorControl,
            liveStyle: [
                {
                    'type': 'color',
                    'id': 'itemCardTitleColorHover',
                    'selector': `.${elementId}.guten-gallery .gallery-items .gallery-item-wrap .grid-item .caption-wrap.style-card:hover .item-caption-over .item-title`,
                    'properties': [
                        {
                            'name': 'color',
                            'valueType': 'direct'
                        }
                    ]
                }
            ]
        },
        {
            id: 'itemCardTitleTypography',
            label: __('Typography', 'gutenverse'),
            component: TypographyControl,
        },
        {
            id: 'itemCardTitleMargin',
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
                ['%']: {
                    text: '%',
                    unit: '%'
                },
            },
        },
        {
            id: 'itemCardTitlePadding',
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
                ['%']: {
                    text: '%',
                    unit: '%'
                },
            },
        },
        {
            id: 'submenuSplitter3',
            component: HeadingControl,
            label: __('Content Style')
        },
        {
            id: 'itemCardContentColor',
            label: __('Color', 'gutenverse'),
            component: ColorControl,
            liveStyle: [
                {
                    'type': 'color',
                    'id': 'itemCardContentColor',
                    'selector': `.${elementId}.guten-gallery .gallery-items .gallery-item-wrap .grid-item .caption-wrap.style-card .item-caption-over .item-content`,
                    'properties': [
                        {
                            'name': 'color',
                            'valueType': 'direct'
                        }
                    ]
                }
            ]
        },
        {
            id: 'itemCardContentColorHover',
            label: __('Hover Color', 'gutenverse'),
            component: ColorControl,
            liveStyle: [
                {
                    'type': 'color',
                    'id': 'itemCardContentColorHover',
                    'selector': `.${elementId}.guten-gallery .gallery-items .gallery-item-wrap .grid-item .caption-wrap.style-card:hover .item-caption-over .item-content`,
                    'properties': [
                        {
                            'name': 'color',
                            'valueType': 'direct'
                        }
                    ]
                }
            ]
        },
        {
            id: 'itemCardContentTypography',
            label: __('Typography', 'gutenverse'),
            component: TypographyControl,
        },
        {
            id: 'itemCardContentMargin',
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
                ['%']: {
                    text: '%',
                    unit: '%'
                },
            }
        },
        {
            id: 'itemCardContentPadding',
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
                ['%']: {
                    text: '%',
                    unit: '%'
                },
            }
        },
    ];
};