import { __ } from '@wordpress/i18n';
import { allowRenderBoxShadow, handleBorderResponsive } from 'gutenverse-core/styling';
import { BorderControl, BoxShadowControl, SwitchControl } from 'gutenverse-core/controls';
import { handleBoxShadow } from 'gutenverse-core/styling';

export const iconBorderPanel = (props) => {
    const {
        elementId,
        switcher,
        setSwitcher,
    } = props;

    return [
        {
            id: '__iconBorderHover',
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
            onChange: ({ __iconBorderHover }) => setSwitcher({ ...switcher, iconBorder: __iconBorderHover })
        },
        {
            id: 'iconBorder_v2',
            show: !switcher.iconBorder || switcher.iconBorder === 'normal',
            label: __('Border Type', 'gutenverse'),
            component: BorderControl,
            allowDeviceControl: true,
            style: [
                {
                    selector: `.${elementId} .guten-social-icon a`,
                    render: value => handleBorderResponsive(value)
                }
            ]
        },
        {
            id: 'iconBorderHover_v2',
            show: switcher.iconBorder === 'hover',
            label: __('Border Type', 'gutenverse'),
            component: BorderControl,
            allowDeviceControl: true,
            style: [
                {
                    selector: `.${elementId} .guten-social-icon:hover a`,
                    render: value => handleBorderResponsive(value)
                }
            ]
        },
        {
            id: 'iconBoxShadow',
            show: !switcher.iconBorder || switcher.iconBorder === 'normal',
            label: __('Box Shadow', 'gutenverse'),
            component: BoxShadowControl,
            style: [
                {
                    selector: `.${elementId} .guten-social-icon a`,
                    allowRender: (value) => allowRenderBoxShadow(value),
                    render: value => handleBoxShadow(value)
                }
            ]
        },
        {
            id: 'iconBoxShadowHover',
            show: switcher.iconBorder === 'hover',
            label: __('Box Shadow', 'gutenverse'),
            component: BoxShadowControl,
            style: [
                {
                    selector: `.${elementId} .guten-social-icon:hover a`,
                    allowRender: (value) => allowRenderBoxShadow(value),
                    render: value => handleBoxShadow(value)
                }
            ]
        }
    ];
};