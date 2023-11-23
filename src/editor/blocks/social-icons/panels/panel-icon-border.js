import { __ } from '@wordpress/i18n';
import { allowRenderBoxShadow, handleBorderV2 } from 'gutenverse-core/styling';
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
            id: 'iconBorderResponsive',
            show: !switcher.iconBorder || switcher.iconBorder === 'normal',
            label: __('Border Type', 'gutenverse'),
            component: BorderControl,
            allowDeviceControl: true,
            style: [
                {
                    selector: `.${elementId} .guten-social-icon a`,
                    render: value => handleBorderV2(value)
                }
            ]
        },
        {
            id: 'iconBorderResponsiveHover',
            show: switcher.iconBorder === 'hover',
            label: __('Border Type', 'gutenverse'),
            component: BorderControl,
            allowDeviceControl: true,
            style: [
                {
                    selector: `.${elementId} .guten-social-icon:hover a`,
                    render: value => handleBorderV2(value)
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