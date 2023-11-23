import { __ } from '@wordpress/i18n';
import { BackgroundControl, BorderControl, BoxShadowControl, ColorControl, DimensionControl, RangeControl, SwitchControl, TypographyControl } from 'gutenverse-core/controls';
import { allowRenderBoxShadow, handleBackground, handleBorderV2, handleColor, handleDimension, handleTypography } from 'gutenverse-core/styling';
import { handleBoxShadow } from 'gutenverse-core/styling';

export const loadMoreStylePanel = (props) => {
    const {
        elementId,
        switcher,
        setSwitcher
    } = props;

    return [
        {
            id: 'loadMoreMarginTop',
            label: __('Margin Top', 'gutenverse'),
            component: RangeControl,
            min: 0,
            max: 100,
            step: 1,
            allowDeviceControl: true,
            style: [
                {
                    selector: `.${elementId} .load-more-items`,
                    render: value => `margin-top: ${value}px;`
                }
            ]
        },
        {
            id: 'loadMoreIconSize',
            label: __('Icon Size', 'gutenverse'),
            component: RangeControl,
            min: 0,
            max: 100,
            step: 1,
            allowDeviceControl: true,
            style: [
                {
                    selector: `.${elementId} .load-more-items .load-more-icon`,
                    render: value => `font-size: ${value}px;`
                }
            ]
        },
        {
            id: 'loadMoreIconSpacing',
            label: __('Icon Spacing', 'gutenverse'),
            component: RangeControl,
            min: 0,
            max: 100,
            step: 1,
            allowDeviceControl: true,
            style: [
                {
                    selector: `.${elementId} .load-more-items .load-more-icon.icon-position-before`,
                    render: value => `margin-right: ${value}px;`
                },
                {
                    selector: `.${elementId} .load-more-items .load-more-icon.icon-position-after`,
                    render: value => `margin-left: ${value}px;`
                },
            ]
        },
        {
            id: 'loadMoreTypography',
            label: __('Typography', 'gutenverse'),
            component: TypographyControl,
            style: [
                {
                    selector: `.${elementId} .load-more-items .guten-gallery-load-more`,
                    hasChild: true,
                    render: (value, id) => handleTypography(value, props, id)
                }
            ],
        },
        {
            id: 'loadMorePadding',
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
            style: [
                {
                    selector: `.${elementId} .load-more-items .guten-gallery-load-more`,
                    render: value => handleDimension(value, 'padding')
                }
            ]
        },
        {
            id: 'loadMoreBoxShadow',
            label: __('Box Shadow', 'gutenverse'),
            component: BoxShadowControl,
            style: [
                {
                    selector: `.${elementId} .load-more-items .guten-gallery-load-more`,
                    allowRender: (value) => allowRenderBoxShadow(value),
                    render: value => handleBoxShadow(value)
                }
            ]
        },
        {
            id: '__loadHover',
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
            onChange: ({ __loadHover }) => setSwitcher({ ...switcher, loadHover: __loadHover })
        },
        {
            id: 'loadMoreTextColor',
            show: !switcher.loadHover || switcher.loadHover === 'normal',
            label: __('Normal Color', 'gutenverse'),
            component: ColorControl,
            allowDeviceControl: true,
            style: [
                {
                    selector: `.${elementId} .load-more-items .guten-gallery-load-more`,
                    render: value => handleColor(value, 'color')
                }
            ]
        },
        {
            id: 'loadMoreTextColorHover',
            show: switcher.loadHover === 'hover',
            label: __('Hover Color', 'gutenverse'),
            component: ColorControl,
            allowDeviceControl: true,
            style: [
                {
                    selector: `.${elementId} .load-more-items .guten-gallery-load-more:hover`,
                    render: value => handleColor(value, 'color')
                }
            ]
        },
        {
            id: 'loadMoreBackground',
            show: !switcher.loadHover || switcher.loadHover === 'normal',
            label: __('Normal Background', 'gutenverse'),
            component: BackgroundControl,
            allowDeviceControl: true,
            options: ['default', 'gradient'],
            style: [
                {
                    selector: `.${elementId} .load-more-items .guten-gallery-load-more`,
                    hasChild: true,
                    render: value => handleBackground(value)
                }
            ]
        },
        {
            id: 'loadMoreBackgroundHover',
            show: switcher.loadHover === 'hover',
            label: __('Hover Background', 'gutenverse'),
            component: BackgroundControl,
            allowDeviceControl: true,
            options: ['default', 'gradient'],
            style: [
                {
                    selector: `.${elementId} .load-more-items .guten-gallery-load-more:hover`,
                    hasChild: true,
                    render: value => handleBackground(value)
                }
            ]
        },
        {
            id: 'loadMoreBorderResponsive',
            show: !switcher.loadHover || switcher.loadHover === 'normal',
            label: __('Border Type', 'gutenverse'),
            component: BorderControl,
            allowDeviceControl: true,
            style: [
                {
                    selector: `.${elementId} .load-more-items .guten-gallery-load-more`,
                    render: value => handleBorderV2(value)
                }
            ]
        },
        {
            id: 'loadMoreBorderResponsiveHover',
            show: switcher.loadHover === 'hover',
            label: __('Border Type', 'gutenverse'),
            component: BorderControl,
            allowDeviceControl: true,
            style: [
                {
                    selector: `.${elementId} .load-more-items .guten-gallery-load-more:hover`,
                    render: value => handleBorderV2(value)
                }
            ]
        },
    ];
};