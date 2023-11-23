import { __ } from '@wordpress/i18n';
import { BackgroundControl, BorderControl, BoxShadowControl, DimensionControl, SwitchControl } from 'gutenverse-core/controls';
import { handleDimension, handleBackground, handleBorderV2, allowRenderBoxShadow } from 'gutenverse-core/styling';
import { handleBoxShadow } from 'gutenverse-core/styling';

export const panelIconBoxContainer = (props) => {
    const {
        elementId,
        switcher,
        setSwitcher
    } = props;

    return [
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
            id: 'containerPadding',
            show: !switcher.containerStyle || switcher.containerStyle === 'normal',
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
                    selector: `.${elementId} .guten-icon-box-wrapper`,
                    render: value => handleDimension(value, 'padding')
                }
            ],
        },
        {
            id: 'containerPaddingHover',
            show: switcher.containerStyle === 'hover',
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
                    selector: `.${elementId}:hover .guten-icon-box-wrapper`,
                    render: value => handleDimension(value, 'padding')
                }
            ],
        },
        {
            id: 'containerBackground',
            show: !switcher.containerStyle || switcher.containerStyle === 'normal',
            component: BackgroundControl,
            allowDeviceControl: true,
            options: ['default', 'gradient'],
            style: [
                {
                    selector: `.${elementId} .guten-icon-box-wrapper`,
                    hasChild: true,
                    render: value => handleBackground(value)
                }
            ]
        },
        {
            id: 'containerBackgroundHover',
            show: switcher.containerStyle === 'hover',
            component: BackgroundControl,
            allowDeviceControl: true,
            options: ['default', 'gradient'],
            style: [
                {
                    selector: `.${elementId}:hover .guten-icon-box-wrapper`,
                    hasChild: true,
                    render: value => handleBackground(value)
                }
            ]
        },
        {
            id: 'containerBorderResponsive',
            show: !switcher.containerStyle || switcher.containerStyle === 'normal',
            label: __('Border Type', 'gutenverse'),
            component: BorderControl,
            allowDeviceControl: true,
            style: [
                {
                    selector: `.${elementId} .guten-icon-box-wrapper`,
                    render: value => handleBorderV2(value)
                }
            ]
        },
        {
            id: 'containerBoxShadow',
            show: !switcher.containerStyle || switcher.containerStyle === 'normal',
            label: __('Box Shadow', 'gutenverse'),
            component: BoxShadowControl,
            style: [
                {
                    selector: `.${elementId} .guten-icon-box-wrapper`,
                    allowRender: (value) => allowRenderBoxShadow(value),
                    render: value => handleBoxShadow(value)
                }
            ]
        },
        {
            id: 'containerBorderResponsiveHover',
            show: switcher.containerStyle === 'hover',
            label: __('Border Type', 'gutenverse'),
            component: BorderControl,
            allowDeviceControl: true,
            style: [
                {
                    selector: `.${elementId}:hover .guten-icon-box-wrapper`,
                    render: value => handleBorderV2(value)
                }
            ]
        },
        {
            id: 'containerBoxShadowHover',
            show: switcher.containerStyle === 'hover',
            label: __('Box Shadow', 'gutenverse'),
            component: BoxShadowControl,
            style: [
                {
                    selector: `.${elementId}:hover .guten-icon-box-wrapper`,
                    allowRender: (value) => allowRenderBoxShadow(value),
                    render: value => handleBoxShadow(value)
                }
            ]
        }
    ];
};

