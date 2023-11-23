import { __ } from '@wordpress/i18n';
import { BorderControl, BoxShadowControl, SwitchControl } from 'gutenverse-core/controls';
import { allowRenderBoxShadow, handleBorderV2 } from 'gutenverse-core/styling';
import { handleBoxShadow } from 'gutenverse-core/styling';

export const imageBorderPanel = (props) => {
    const {
        elementId,
        switcher,
        setSwitcher,
    } = props;

    return [
        {
            id: '__imageBorderHover',
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
            onChange: ({ __imageBorderHover }) => setSwitcher({ ...switcher, imageBorder: __imageBorderHover })
        },
        {
            id: 'imageBorderResponsive',
            show: !switcher.border || switcher.border === 'normal',
            label: __('Border Type', 'gutenverse'),
            component: BorderControl,
            allowDeviceControl: true,
            style: [
                {
                    selector: `.${elementId} .profile-box .profile-card img`,
                    render: value => handleBorderV2(value)
                }
            ]
        },
        {
            id: 'imageBoxShadow',
            show: !switcher.border || switcher.border === 'normal',
            label: __('Box Shadow', 'gutenverse'),
            component: BoxShadowControl,
            style: [
                {
                    selector: `.${elementId} .profile-box .profile-card img`,
                    allowRender: (value) => allowRenderBoxShadow(value),
                    render: value => handleBoxShadow(value)
                }
            ]
        },
        {
            id: 'imageBorderHoverResponsive',
            show: switcher.border === 'hover',
            label: __('Border Type', 'gutenverse'),
            component: BorderControl,
            allowDeviceControl: true,
            style: [
                {
                    selector: `.${elementId} .profile-box .profile-card img:hover`,
                    render: value => handleBorderV2(value)
                }
            ]
        },
        {
            id: 'imageBoxShadowHover',
            show: switcher.border === 'hover',
            label: __('Box Shadow', 'gutenverse'),
            component: BoxShadowControl,
            style: [
                {
                    selector: `.${elementId} .profile-box .profile-card img:hover`,
                    allowRender: (value) => allowRenderBoxShadow(value),
                    render: value => handleBoxShadow(value)
                }
            ]
        }
    ];
};