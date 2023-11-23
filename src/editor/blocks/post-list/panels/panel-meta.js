import { __ } from '@wordpress/i18n';

import { AlignCenter, AlignLeft, AlignRight } from 'react-feather';
import { BackgroundControl, BorderControl, ColorControl, DimensionControl, IconRadioControl, RangeControl, SwitchControl, TypographyControl } from 'gutenverse-core/controls';
import { handleBackground, handleBorderV2, handleColor, handleDimension, handleTypography } from 'gutenverse-core/styling';

export const metaPanel = (props) => {
    const {
        elementId,
        switcher,
        setSwitcher
    } = props;

    return [
        {
            id: 'metaAlign',
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
            style: [
                {
                    selector: `.${elementId} .guten-postlist .guten-post a .meta-lists`,
                    render: value => `text-align: ${value};`
                },
            ]
        },
        {
            id: 'metaTypography',
            label: __('Typography', 'gutenverse'),
            component: TypographyControl,
            style: [
                {
                    selector: `.${elementId} .guten-postlist .guten-post a .meta-lists`,
                    hasChild: true,
                    render: (value, id) => handleTypography(value, props, id)
                }
            ]
        },
        {
            id: 'metaIconSize',
            label: __('Icon Size', 'gutenverse'),
            component: RangeControl,
            allowDeviceControl: true,
            min: 1,
            max: 100,
            step: 1,
            style: [
                {
                    selector: `.${elementId} .guten-postlist .guten-post a .meta-lists i`,
                    render: value => `font-size: ${value}px;`
                }
            ]
        },
        {
            id: 'metaIconSpacing',
            label: __('Icon Spacing', 'gutenverse'),
            component: RangeControl,
            allowDeviceControl: true,
            min: 1,
            max: 100,
            step: 1,
            style: [
                {
                    selector: `.${elementId} .guten-postlist .guten-post a .meta-lists i`,
                    render: value => `margin-right: ${value}px;`
                }
            ]
        },
        {
            id: 'metaMargin',
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
            style: [
                {
                    selector: `.${elementId} .guten-postlist .guten-post a .meta-lists span`,
                    render: value => handleDimension(value, 'margin')
                }
            ]
        },
        {
            id: 'metaPadding',
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
            style: [
                {
                    selector: `.${elementId} .guten-postlist .guten-post a .meta-lists span`,
                    render: value => handleDimension(value, 'padding')
                }
            ]
        },
        {
            id: '__metaHover',
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
            onChange: ({ __metaHover }) => setSwitcher({ ...switcher, metaHover: __metaHover })
        },
        {
            id: 'metaColor',
            show: !switcher.metaHover || switcher.metaHover === 'normal',
            label: __('Color', 'gutenverse'),
            component: ColorControl,
            style: [
                {
                    selector: `.${elementId} .guten-postlist .guten-post a .meta-lists span`,
                    render: value => handleColor(value, 'color')
                }
            ]
        },
        {
            id: 'metaColorHover',
            show: switcher.metaHover === 'hover',
            label: __('Hover Color', 'gutenverse'),
            component: ColorControl,
            style: [
                {
                    selector: `.${elementId} .guten-postlist .guten-post:hover a .meta-lists span`,
                    render: value => handleColor(value, 'color')
                }
            ]
        },
        {
            id: 'metaBackground',
            show: !switcher.metaHover || switcher.metaHover === 'normal',
            label: __('Background', 'gutenverse'),
            component: BackgroundControl,
            allowDeviceControl: true,
            options: ['default', 'gradient'],
            style: [
                {
                    selector: `.${elementId} .guten-postlist .guten-post a .meta-lists span`,
                    hasChild: true,
                    render: value => handleBackground(value)
                }
            ]
        },
        {
            id: 'metaHoverBackground',
            show: switcher.metaHover === 'hover',
            label: __('Hover Background', 'gutenverse'),
            component: BackgroundControl,
            allowDeviceControl: true,
            options: ['default', 'gradient'],
            style: [
                {
                    selector: `.${elementId} .guten-postlist .guten-post:hover a .meta-lists span`,
                    hasChild: true,
                    render: value => handleBackground(value)
                }
            ]
        },
        {
            id: 'metaBorderResponsive',
            show: !switcher.metaHover || switcher.metaHover === 'normal',
            label: __('Border Type', 'gutenverse'),
            component: BorderControl,
            allowDeviceControl: true,
            style: [
                {
                    selector: `.${elementId} .guten-postlist .guten-post a .meta-lists span`,
                    render: value => handleBorderV2(value)
                }
            ]
        },
        {
            id: 'metaHoverBorderResponsive',
            show: switcher.metaHover === 'hover',
            label: __('Border Type', 'gutenverse'),
            component: BorderControl,
            allowDeviceControl: true,
            style: [
                {
                    selector: `.${elementId} .guten-postlist .guten-post:hover a .meta-lists span`,
                    render: value => handleBorderV2(value)
                }
            ]
        },
    ];
};