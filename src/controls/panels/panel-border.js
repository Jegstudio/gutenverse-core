import { __ } from '@wordpress/i18n';
import { BorderControl, BorderResponsiveControl, BoxShadowControl, SwitchControl } from 'gutenverse-core/controls';
import { getDeviceType } from 'gutenverse-core/editor-helper';

export const borderPanel = (props) => {
    const {
        switcher,
        setSwitcher,
    } = props;

    const device = getDeviceType();

    return [
        {
            id: '__borderHover',
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
            onChange: ({ __borderHover }) => setSwitcher({ ...switcher, border: __borderHover })
        },
        {
            id: 'border',
            show: (!switcher.border || switcher.border === 'normal') && device === 'Desktop',
            label: __('Border Type', '--gctd--'),
            component: BorderControl,
        },
        {
            id: 'borderResponsive',
            show: (!switcher.border || switcher.border === 'normal') && device !== 'Desktop',
            label: __('Border Type', '--gctd--'),
            component: BorderResponsiveControl,
            allowDeviceControl: true,
        },
        {
            id: 'borderHover',
            show: switcher.border === 'hover' && device === 'Desktop',
            label: __('Border Type', '--gctd--'),
            component: BorderControl,
        },
        {
            id: 'borderHoverResponsive',
            show: switcher.border === 'hover' && device !== 'Desktop',
            label: __('Border Type', '--gctd--'),
            component: BorderResponsiveControl,
            allowDeviceControl: true,
        },
        {
            id: 'boxShadow',
            show: !switcher.border || switcher.border === 'normal',
            label: __('Box Shadow', '--gctd--'),
            component: BoxShadowControl,
        },
        {
            id: 'boxShadowHover',
            show: switcher.border === 'hover',
            label: __('Box Shadow', '--gctd--'),
            component: BoxShadowControl,
        }
    ];
};