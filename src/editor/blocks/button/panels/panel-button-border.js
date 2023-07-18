import { __ } from '@wordpress/i18n';
import { allowRenderBoxShadow, handleBorder } from 'gutenverse-core/styling';
import { BorderControl, BoxShadowControl, SwitchControl } from 'gutenverse-core/controls';
import { handleBoxShadow } from 'gutenverse-core/styling';

export const buttonBorderPanel = (props) => {
    const {
        elementId,
        switcher,
        setSwitcher,
    } = props;

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
            onChange: ({__buttonBorderHover}) => setSwitcher({...switcher, buttonBorder: __buttonBorderHover})
        },
        {
            id: 'buttonBorder',
            show: !switcher.buttonBorder || switcher.buttonBorder === 'normal',
            label: __('Border Type', 'gutenverse'),
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
            id: 'buttonBorderHover',
            show: switcher.buttonBorder === 'hover',
            label: __('Border Type', 'gutenverse'),
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