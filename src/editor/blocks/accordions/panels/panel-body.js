import { __ } from '@wordpress/i18n';
import {
    BorderControl,
    ColorControl,
    DimensionControl,
    SwitchControl,
    TypographyControl
} from 'gutenverse-core/controls';
import { handleBorderResponsive, handleColor, handleDimension, handleTypography } from 'gutenverse-core/styling';

export const panelBody = (props) => {
    const {
        elementId,
        switcher,
        setSwitcher
    } = props;

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
            id: 'contentBorder_v2',
            show: !switcher.accBody || switcher.accBody === 'normal',
            label: __('Border', 'gutenverse'),
            component: BorderControl,
            allowDeviceControl: true,
            style: [
                {
                    selector: `.${elementId} .accordion-item .accordion-content`,
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
            id: 'contentBorderActive_v2',
            show: switcher.accBody === 'active',
            label: __('Border', 'gutenverse'),
            component: BorderControl,
            allowDeviceControl: true,
            style: [
                {
                    selector: `.${elementId} .accordion-item.active .accordion-content`,
                    render: value => handleBorderResponsive(value)
                }
            ]
        },
    ];
};
