import { __ } from '@wordpress/i18n';
import { allowRenderBoxShadow, handleBorderV2, handleBoxShadow, handleColor } from 'gutenverse-core/styling';
import { BorderControl, BoxShadowControl, ColorControl, SwitchControl } from 'gutenverse-core/controls';

export const inputPanel = (props) => {
    const {
        elementId,
        setSwitcher,
        switcher
    } = props;

    return [
        {
            id: 'inputBorderResponsive',
            label: __('Input Border', 'gutenverse'),
            component: BorderControl,
            allowDeviceControl: true,
            style: [
                {
                    selector: `.${elementId} .comment-form form input:not([type=submit]), .${elementId} .comment-form form textarea`,
                    render: value => handleBorderV2(value)
                }
            ]
        },
        {
            id: '__itemState',
            component: SwitchControl,
            options: [
                {
                    value: 'normal',
                    label: 'Normal'
                },
                {
                    value: 'hover',
                    label: 'Hover'
                },
                {
                    value: 'focus',
                    label: 'Focus'
                }
            ],
            onChange: ({ __itemState }) => setSwitcher({ ...switcher, inputState: __itemState })
        },
        {
            id: 'inputColorNormal',
            show: !switcher.inputState || switcher.inputState === 'normal',
            label: __('Input Color Normal', 'gutenverse'),
            component: ColorControl,
            allowDeviceControl: true,
            style: [
                {
                    selector: `.${elementId} .comment-form input:not([type=submit]), .${elementId} .comment-form textarea`,
                    render: value => handleColor(value, 'color')
                }
            ]
        },
        {
            id: 'inputBgColorNormal',
            show: !switcher.inputState || switcher.inputState === 'normal',
            label: __('Input Background Color Normal', 'gutenverse'),
            component: ColorControl,
            allowDeviceControl: true,
            style: [
                {
                    selector: `.${elementId} .comment-form input:not([type=submit]), .${elementId} .comment-form textarea`,
                    render: value => handleColor(value, 'background-color')
                }
            ]
        },
        {
            id: 'inputColorHover',
            show: switcher.inputState === 'hover',
            label: __('Input Color Hover', 'gutenverse'),
            component: ColorControl,
            allowDeviceControl: true,
            style: [
                {
                    selector: `.${elementId} .comment-form input:not([type=submit]):hover, .${elementId} .comment-form textarea:hover`,
                    render: value => handleColor(value, 'color')
                }
            ]
        },
        {
            id: 'inputBgColorHover',
            show: switcher.inputState === 'hover',
            label: __('Input Background Color Hover', 'gutenverse'),
            component: ColorControl,
            allowDeviceControl: true,
            style: [
                {
                    selector: `.${elementId} .comment-form input:not([type=submit]):hover, .${elementId} .comment-form textarea:hover`,
                    render: value => handleColor(value, 'background-color')
                }
            ]
        },
        {
            id: 'inputColorFocus',
            show: switcher.inputState === 'focus',
            label: __('Input Color Focus', 'gutenverse'),
            component: ColorControl,
            allowDeviceControl: true,
            style: [
                {
                    selector: `.${elementId} .comment-form input:not([type=submit]):focus, .${elementId} .comment-form textarea:focus, .${elementId} .comment-form input:not([type=submit]):focus-visible, .${elementId} .comment-form textarea:focus-visible`,
                    render: value => handleColor(value, 'color')
                },
            ]
        },
        {
            id: 'inputBgColorFocus',
            show: switcher.inputState === 'focus',
            label: __('Input Background Color Focus', 'gutenverse'),
            component: ColorControl,
            allowDeviceControl: true,
            style: [
                {
                    selector: `.${elementId} .comment-form input:not([type=submit]):focus, .${elementId} .comment-form textarea:focus, .${elementId} .comment-form input:not([type=submit]):focus-visible, .${elementId} .comment-form textarea:focus-visible`,
                    render: value => handleColor(value, 'background-color')
                }
            ]
        },
        {
            id: '__inputAreaHover',
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
            onChange: ({ __inputAreaHover }) => setSwitcher({ ...switcher, inputAreaHover: __inputAreaHover })
        },
        {
            id: 'inputAreaBoxShadow',
            show: !switcher.inputAreaHover || switcher.inputAreaHover === 'normal',
            label: __('Box Shadow', 'gutenverse'),
            component: BoxShadowControl,
            style: [
                {
                    selector: `.${elementId} .comment-form input:not([type=submit],[type=checkbox]), .${elementId} .comment-form textarea`,
                    allowRender: (value) => allowRenderBoxShadow(value),
                    render: value => handleBoxShadow(value)
                }
            ]
        },
        {
            id: 'inputAreaBoxShadowHover',
            show: switcher.inputAreaHover === 'hover',
            label: __('Hover Box Shadow', 'gutenverse'),
            component: BoxShadowControl,
            style: [
                {
                    selector: `.${elementId} .comment-form input:not([type=submit],[type=checkbox]):hover, .${elementId} .comment-form textarea:hover`,
                    allowRender: (value) => allowRenderBoxShadow(value),
                    render: value => handleBoxShadow(value)
                }
            ]
        }
    ];
};

