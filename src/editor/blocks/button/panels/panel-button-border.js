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
        hoverWithParent,
        parentSelector,
        buttonBorder,
        buttonBorderResponsive,
    } = props;

    const device = getDeviceType();

    const customHandleHoverBorder = (value, normal) =>{
        //make button border use the normal value if hover value is empty
        const newValue = {
            ...value,
            all : {
                ...value?.all,
                type: value?.all?.type ? value.all.type : normal?.all?.type,
                width: value?.all?.width ? value.all.width : normal?.all?.width,
                color: value?.all?.color ? value.all.color : normal?.all?.color,
            }
        };
        return handleBorder(newValue);
    };

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
        },
        {
            id: 'buttonBorderResponsive',
            show: (!switcher.buttonBorder || switcher.buttonBorder === 'normal') && device !== 'Desktop',
            label: __('Border', 'gutenverse'),
            component: BorderResponsiveControl,
            allowDeviceControl: true,
        },
        {
            id: 'buttonBorderHover',
            show: switcher.buttonBorder === 'hover' && device === 'Desktop',
            label: __('Border', 'gutenverse'),
            component: BorderControl,
        },
        {
            id: 'buttonBorderHoverResponsive',
            show: switcher.buttonBorder === 'hover' && device !== 'Desktop',
            label: __('Border', 'gutenverse'),
            component: BorderResponsiveControl,
            allowDeviceControl: true,
        },
        {
            id: 'buttonBoxShadow',
            show: !switcher.buttonBorder || switcher.buttonBorder === 'normal',
            label: __('Box Shadow', 'gutenverse'),
            component: BoxShadowControl,
        },
        {
            id: 'buttonBoxShadowHover',
            show: switcher.buttonBorder === 'hover',
            label: __('Box Shadow', 'gutenverse'),
            component: BoxShadowControl,
        }
    ];
};