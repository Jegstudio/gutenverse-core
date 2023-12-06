import { __ } from '@wordpress/i18n';
import { allowRenderBoxShadow, handleBorder, handleBorderResponsive } from 'gutenverse-core/styling';
import { BorderControl, BorderResponsiveControl, BoxShadowControl, SwitchControl } from 'gutenverse-core/controls';
import { handleBoxShadow } from 'gutenverse-core/styling';
import { getDeviceType } from 'gutenverse-core/editor-helper';

export const buttonBorderPanel = (props) => {
    const {
        elementId,
        switcher,
        setSwitcher,
    } = props;

    const device = getDeviceType();

    return [
        {
            id: '__buttonBorderHover',
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
            onChange: ({ __buttonBorderHover }) => setSwitcher({ ...switcher, buttonBorder: __buttonBorderHover })
        },
        {
            id: 'buttonBorder',
            show: (!switcher.buttonBorder || switcher.buttonBorder === 'normal') && device === 'Desktop',
            label: __('Border', 'gutenverse'),
            component: BorderControl,
            style: [
                {
                    selector: `.editor-styles-wrapper .${elementId}.guten-button-wrapper .guten-button`,
                    hasChild: true,
                    render: value => handleBorder(value)
                }
            ]
        },
        {
            id: 'buttonBorderResponsive',
            show: (!switcher.buttonBorder || switcher.buttonBorder === 'normal') && device !== 'Desktop',
            label: __('Border', 'gutenverse'),
            component: BorderResponsiveControl,
            allowDeviceControl: true,
            style: [
                {
                    selector: `.editor-styles-wrapper .${elementId}.guten-button-wrapper .guten-button`,
                    allowRender: () => device !== 'Desktop',
                    render: value => handleBorderResponsive(value)
                }
            ]
        },
        {
            id: 'buttonBorderHover',
            show: switcher.buttonBorder === 'hover' && device === 'Desktop',
            label: __('Border', 'gutenverse'),
            component: BorderControl,
            style: [
                {
                    selector: `.editor-styles-wrapper .${elementId}.guten-button-wrapper .guten-button:hover`,
                    hasChild: true,
                    render: value => handleBorder(value)
                }
            ]
        },
        {
            id: 'buttonBorderHoverResponsive',
            show: switcher.buttonBorder === 'hover' && device !== 'Desktop',
            label: __('Border', 'gutenverse'),
            component: BorderResponsiveControl,
            allowDeviceControl: true,
            style: [
                {
                    selector: `.editor-styles-wrapper .${elementId}.guten-button-wrapper .guten-button:hover`,
                    allowRender: () => device !== 'Desktop',
                    render: value => handleBorderResponsive(value)
                }
            ]
        },
        {
            id: 'buttonBoxShadow',
            show: !switcher.buttonBorder || switcher.buttonBorder === 'normal',
            label: __('Box Shadow', 'gutenverse'),
            component: BoxShadowControl,
            style: [
                {
                    selector: `.editor-styles-wrapper .${elementId}.guten-button-wrapper .guten-button`,
                    allowRender: (value) => allowRenderBoxShadow(value),
                    render: value => handleBoxShadow(value)
                }
            ]
        },
        {
            id: 'buttonBoxShadowHover',
            show: switcher.buttonBorder === 'hover',
            label: __('Box Shadow', 'gutenverse'),
            component: BoxShadowControl,
            style: [
                {
                    selector: `.editor-styles-wrapper .${elementId}.guten-button-wrapper .guten-button:hover`,
                    allowRender: (value) => allowRenderBoxShadow(value),
                    render: value => handleBoxShadow(value)
                }
            ]
        }
    ];
};