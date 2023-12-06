import { __ } from '@wordpress/i18n';
import { allowRenderBoxShadow, handleBorder, handleBorderResponsive } from 'gutenverse-core/styling';
import { BorderControl, BorderResponsiveControl, BoxShadowControl, SwitchControl } from 'gutenverse-core/controls';
import { handleBoxShadow } from 'gutenverse-core/styling';
import { getDeviceType } from 'gutenverse-core/editor-helper';

export const iconBorderPanel = (props) => {
    const {
        elementId,
        switcher,
        setSwitcher,
    } = props;

    const device = getDeviceType();

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
            id: 'iconBorder',
            show: (!switcher.iconBorder || switcher.iconBorder === 'normal') && device === 'Desktop',
            label: __('Border', 'gutenverse'),
            component: BorderControl,
            style: [
                {
                    selector: `.${elementId} .guten-social-icon a`,
                    hasChild: true,
                    render: value => handleBorder(value)
                }
            ]
        },
        {
            id: 'iconBorderResponsive',
            show: (!switcher.iconBorder || switcher.iconBorder === 'normal') && device !== 'Desktop',
            label: __('Border', 'gutenverse'),
            component: BorderResponsiveControl,
            allowDeviceControl: true,
            style: [
                {
                    selector: `.${elementId} .guten-social-icon a`,
                    allowRender: () => device !== 'Desktop',
                    render: value => handleBorderResponsive(value)
                }
            ]
        },
        {
            id: 'iconBorderHover',
            show: switcher.iconBorder === 'hover' && device === 'Desktop',
            label: __('Border', 'gutenverse'),
            component: BorderControl,
            style: [
                {
                    selector: `.${elementId} .guten-social-icon:hover a`,
                    hasChild: true,
                    render: value => handleBorder(value)
                }
            ]
        },
        {
            id: 'iconBorderHoverResponsive',
            show: switcher.iconBorder === 'hover' && device !== 'Desktop',
            label: __('Border', 'gutenverse'),
            component: BorderResponsiveControl,
            allowDeviceControl: true,
            style: [
                {
                    selector: `.${elementId} .guten-social-icon:hover a`,
                    allowRender: () => device !== 'Desktop',
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