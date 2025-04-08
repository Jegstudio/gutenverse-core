import { __ } from '@wordpress/i18n';
import { BorderResponsiveControl, SelectControl } from 'gutenverse-core/controls';
import { BorderControl, ColorControl, DimensionControl, SwitchControl, TypographyControl, BackgroundControl } from 'gutenverse-core/controls';
import { getDeviceType } from 'gutenverse-core/editor-helper';
import { handleBorder, handleBorderResponsive, handleColor, handleDimension, handleTypography, handleBackground } from 'gutenverse-core/styling';
import isEmpty from 'lodash/isEmpty';

export const panelTitle = (props) => {
    const {
        elementId,
        switcher,
        setSwitcher,
        setAttributes,
        titleBackgroundActiveColor,
        titleBackgroundColor,
        titleBackground,
        titleActiveBackground,
    } = props;

    if(!isEmpty(titleBackgroundColor) && isEmpty(titleBackground)) {
        setAttributes({titleBackground: {color: titleBackgroundColor, type: 'default'}})
    }
    if(!isEmpty(titleBackgroundActiveColor) && isEmpty(titleActiveBackground)) {
        setAttributes({titleActiveBackground: {color: titleBackgroundActiveColor, type: 'default'}})
    }

    const device = getDeviceType();

    return [

        {
            id: 'titleTag',
            label: __('Title Tag', 'gutenverse'),
            component: SelectControl,
            options: [
                {
                    label: __('H1'),
                    value: 'h1'
                },
                {
                    label: __('H2'),
                    value: 'h2'
                },
                {
                    label: __('H3'),
                    value: 'h3'
                },
                {
                    label: __('H4'),
                    value: 'h4'
                },
                {
                    label: __('H5'),
                    value: 'h5'
                },
                {
                    label: __('H6'),
                    value: 'h6'
                },
                {
                    label: __('SPAN'),
                    value: 'span'
                },
            ],
        },
        {
            id: 'titleTypography',
            label: __('Typography', 'gutenverse'),
            component: TypographyControl,
            style: [
                {
                    selector: `.${elementId} .accordion-item .accordion-text`,
                    hasChild: true,
                    render: (value, id) => handleTypography(value, props, id)
                }
            ],
        },
        {
            id: 'titlePadding',
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
                    selector: `.${elementId} .accordion-item .accordion-heading`,
                    render: value => handleDimension(value, 'padding')
                }
            ],
        },
        {
            id: '__accTitleActive',
            component: SwitchControl,
            options: [
                {
                    value: 'normal',
                    label: 'Normal'
                },
                {
                    value: 'active',
                    label: 'Active'
                }
            ],
            onChange: ({ __accTitleActive }) => setSwitcher({ ...switcher, accTitle: __accTitleActive })
        },
        {
            id: 'titleTextColor',
            show: !switcher.accTitle || switcher.accTitle === 'normal',
            label: __('Text Color', 'gutenverse'),
            component: ColorControl,
            style: [
                {
                    selector: `.${elementId} .accordion-item .accordion-text`,
                    render: value => handleColor(value, 'color')
                }
            ],
        },
        {
            id: 'titleBackgroundColor',
            show: false,
            label: __('Background Color', 'gutenverse'),
            component: ColorControl,
            style: [
                {
                    selector: `.${elementId} .accordion-item .accordion-heading`,
                    render: value => handleColor(value, 'background-color')
                }
            ],
        },
        {
            id: 'titleBackground',
            show: !switcher.accTitle || switcher.accTitle === 'normal',
            label: __('Background', 'gutenverse'),
            component: BackgroundControl,
            options: ['default', 'gradient'],
            style: [
                {
                    selector: `.${elementId} .accordion-item .accordion-heading`,
                    hasChild: true,
                    render: value => handleBackground(value)
                }
            ]
        },
        {
            id: 'titleBorder',
            show: (!switcher.accTitle || switcher.accTitle === 'normal') && device === 'Desktop',
            label: __('Border', 'gutenverse'),
            component: BorderControl,
            style: [
                {
                    selector: `.${elementId} .accordion-item .accordion-heading`,
                    hasChild: true,
                    render: value => handleBorder(value)
                }
            ]
        },
        {
            id: 'titleBorderResponsive',
            show: (!switcher.accTitle || switcher.accTitle === 'normal') && device !== 'Desktop',
            label: __('Border', 'gutenverse'),
            component: BorderResponsiveControl,
            allowDeviceControl: true,
            style: [
                {
                    selector: `.${elementId} .accordion-item .accordion-heading`,
                    allowRender: () => device !== 'Desktop',
                    render: value => handleBorderResponsive(value)
                }
            ]
        },
        {
            id: 'titleActiveColor',
            show: switcher.accTitle === 'active',
            label: __('Text Color', 'gutenverse'),
            component: ColorControl,
            style: [
                {
                    selector: `.${elementId} .accordion-item.active .accordion-text`,
                    render: value => handleColor(value, 'color')
                }
            ],
        },
        {
            id: 'titleBackgroundActiveColor',
            show: false,
            label: __('Background Color', 'gutenverse'),
            component: ColorControl,
            style: [
                {
                    selector: `.${elementId} .accordion-item.active .accordion-heading`,
                    render: value => handleColor(value, 'background-color')
                }
            ],
        },
        {
            id: 'titleActiveBackground',
            show: switcher.accTitle === 'active',
            label: __('Active Background', 'gutenverse'),
            component: BackgroundControl,
            options: ['default', 'gradient'],
            style: [
                {
                    selector: `.${elementId} .accordion-item.active .accordion-heading`,
                    hasChild: true,
                    render: value => handleBackground(value)
                }
            ]
        },
        {
            id: 'titleBorderActive',
            show: switcher.accTitle === 'active' && device === 'Desktop',
            label: __('Border', 'gutenverse'),
            component: BorderControl,
            style: [
                {
                    selector: `.${elementId} .accordion-item.active .accordion-heading`,
                    hasChild: true,
                    render: value => handleBorder(value)
                }
            ]
        },
        {
            id: 'titleBorderActiveResponsive',
            show: switcher.accTitle === 'active' && device !== 'Desktop',
            label: __('Border', 'gutenverse'),
            component: BorderResponsiveControl,
            allowDeviceControl: true,
            style: [
                {
                    selector: `.${elementId} .accordion-item.active .accordion-heading`,
                    allowRender: () => device !== 'Desktop',
                    render: value => handleBorderResponsive(value)
                }
            ]
        },
    ];
};
