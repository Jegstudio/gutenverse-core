import { __ } from '@wordpress/i18n';
import {
    BorderControl,
    BorderResponsiveControl,
    ColorControl,
    DimensionControl,
    SwitchControl,
    TypographyControl
} from 'gutenverse-core/controls';
import { getDeviceType } from 'gutenverse-core/editor-helper';
import { handleBorder, handleBorderResponsive, handleColor, handleDimension, handleTypography } from 'gutenverse-core/styling';

export const panelBody = (props) => {
    const {
        elementId,
        switcher,
        setSwitcher
    } = props;

    const device = getDeviceType();

    return [
        {
            id: 'contentTypography',
            label: __('Typography', 'gutenverse'),
            component: TypographyControl,
            style: [
                {
                    selector: `.${elementId} .accordion-item .accordion-content`,
                    hasChild: true,
                    render: (value, id) => handleTypography(value, props, id)
                }
            ],
        },
        {
            id: 'contentPadding',
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
                    selector: `.${elementId} .accordion-item .accordion-content`,
                    render: value => handleDimension(value, 'padding')
                }
            ],
        },
        {
            id: '__accBodyActive',
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
            onChange: ({ __accBodyActive }) => setSwitcher({ ...switcher, accBody: __accBodyActive })
        },
        {
            id: 'contentTextColor',
            show: !switcher.accBody || switcher.accBody === 'normal',
            label: __('Text Color', 'gutenverse'),
            component: ColorControl,
            style: [
                {
                    selector: `.${elementId} .accordion-item .accordion-content`,
                    render: value => handleColor(value, 'color')
                }
            ],
        },
        {
            id: 'contentBackgroundColor',
            show: !switcher.accBody || switcher.accBody === 'normal',
            label: __('Background Color', 'gutenverse'),
            component: ColorControl,
            style: [
                {
                    selector: `.${elementId} .accordion-item .accordion-content`,
                    render: value => handleColor(value, 'background-color')
                }
            ],
        },
        {
            id: 'contentBorder',
            show: (!switcher.accBody || switcher.accBody === 'normal') && device === 'Desktop',
            label: __('Border', 'gutenverse'),
            component: BorderControl,
            style: [
                {
                    selector: `.${elementId} .accordion-item .accordion-content`,
                    hasChild: true,
                    render: value => handleBorder(value)
                }
            ]
        },
        {
            id: 'contentBorderResponsive',
            show: (!switcher.accBody || switcher.accBody === 'normal') && device !== 'Desktop',
            label: __('Border', 'gutenverse'),
            component: BorderResponsiveControl,
            allowDeviceControl: true,
            style: [
                {
                    selector: `.${elementId} .accordion-item .accordion-content`,
                    allowRender: () => device !== 'Desktop',
                    render: value => handleBorderResponsive(value)
                }
            ]
        },
        {
            id: 'contentBackgroundColorActive',
            show: switcher.accBody === 'active',
            label: __('Background Color', 'gutenverse'),
            component: ColorControl,
            style: [
                {
                    selector: `.${elementId} .accordion-item.active .accordion-content`,
                    render: value => handleColor(value, 'background-color')
                }
            ],
        },
        {
            id: 'contentTextColorActive',
            show: switcher.accBody === 'active',
            label: __('Text Color', 'gutenverse'),
            component: ColorControl,
            style: [
                {
                    selector: `.${elementId} .accordion-item.active .accordion-content`,
                    render: value => handleColor(value, 'color')
                }
            ],
        },
        {
            id: 'contentBorderActive',
            show: switcher.accBody === 'active' && device === 'Desktop',
            label: __('Border', 'gutenverse'),
            component: BorderControl,
            style: [
                {
                    selector: `.${elementId} .accordion-item.active .accordion-content`,
                    hasChild: true,
                    render: value => handleBorder(value)
                }
            ]
        },
        {
            id: 'contentBorderActiveResponsive',
            show: switcher.accBody === 'active' && device !== 'Desktop',
            label: __('Border', 'gutenverse'),
            component: BorderResponsiveControl,
            allowDeviceControl: true,
            style: [
                {
                    selector: `.${elementId} .accordion-item.active .accordion-content`,
                    allowRender: () => device !== 'Desktop',
                    render: value => handleBorderResponsive(value)
                }
            ]
        },
    ];
};
