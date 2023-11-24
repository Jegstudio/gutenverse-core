import { __ } from '@wordpress/i18n';
import { BorderControl, BoxShadowControl, SwitchControl } from 'gutenverse-core/controls';
import { allowRenderBoxShadow, handleBorderV2 } from 'gutenverse-core/styling';
import { handleBoxShadow } from 'gutenverse-core/styling';

export const profileBorderPanel = (props) => {
    const {
        elementId,
        switcher,
        setSwitcher,
    } = props;

    return [
        {
            id: '__profileBorderHover',
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
            onChange: ({ __profileBorderHover }) => setSwitcher({ ...switcher, profileBorder: __profileBorderHover })
        },
        {
            id: 'profileBorder_v2',
            show: !switcher.profileBorder || switcher.profileBorder === 'normal',
            label: __('Border Type', 'gutenverse'),
            component: BorderControl,
            allowDeviceControl: true,
            style: [
                {
                    selector: `.${elementId} .profile-box .profile-card`,
                    render: value => handleBorderV2(value)
                }
            ]
        },
        {
            id: 'profileBoxShadow',
            show: !switcher.profileBorder || switcher.profileBorder === 'normal',
            label: __('Box Shadow', 'gutenverse'),
            component: BoxShadowControl,
            style: [
                {
                    selector: `.${elementId} .profile-box .profile-card`,
                    allowRender: (value) => allowRenderBoxShadow(value),
                    render: value => handleBoxShadow(value)
                }
            ]
        },
        {
            id: 'profileBorderHover_v2',
            show: switcher.profileBorder === 'hover',
            label: __('Border Type', 'gutenverse'),
            component: BorderControl,
            allowDeviceControl: true,
            style: [
                {
                    selector: `.${elementId} .profile-box .profile-card:hover`,
                    render: value => handleBorderV2(value)
                }
            ]
        },
        {
            id: 'profileBoxShadowHover',
            show: switcher.profileBorder === 'hover',
            label: __('Box Shadow', 'gutenverse'),
            component: BoxShadowControl,
            style: [
                {
                    selector: `.${elementId} .profile-box .profile-card:hover`,
                    allowRender: (value) => allowRenderBoxShadow(value),
                    render: value => handleBoxShadow(value)
                }
            ]
        }
    ];
};