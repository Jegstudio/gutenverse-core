import { __ } from '@wordpress/i18n';
import { BorderControl, BorderResponsiveControl, BoxShadowControl, SwitchControl } from 'gutenverse-core/controls';
import { getDeviceType } from 'gutenverse-core/editor-helper';
import { allowRenderBoxShadow, handleBorder, handleBorderResponsive } from 'gutenverse-core/styling';
import { handleBoxShadow } from 'gutenverse-core/styling';

export const imageBorderPanel = (props) => {
    const {
        elementId,
        switcher,
        setSwitcher,
    } = props;

    const device = getDeviceType();

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
            id: 'imageBorder',
            show: (!switcher.imageBorder || switcher.imageBorder === 'normal') && device === 'Desktop',
            label: __('Border', 'gutenverse'),
            component: BorderControl,
            style: [
                {
                    selector: `.${elementId} .profile-box .profile-card img`,
                    hasChild: true,
                    render: value => handleBorder(value)
                }
            ]
        },
        {
            id: 'imageBorderResponsive',
            show: (!switcher.imageBorder || switcher.imageBorder === 'normal') && device !== 'Desktop',
            label: __('Border', 'gutenverse'),
            component: BorderResponsiveControl,
            allowDeviceControl: true,
            style: [
                {
                    selector: `.${elementId} .profile-box .profile-card img`,
                    allowRender: () => device !== 'Desktop',
                    render: value => handleBorderResponsive(value)
                }
            ]
        },
        {
            id: 'imageBoxShadow',
            show: !switcher.imageBorder || switcher.imageBorder === 'normal',
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
            id: 'imageBorderHover',
            show: switcher.imageBorder === 'hover' && device === 'Desktop',
            label: __('Border', 'gutenverse'),
            component: BorderControl,
            style: [
                {
                    selector: `.${elementId} .profile-box .profile-card img:hover`,
                    hasChild: true,
                    render: value => handleBorder(value)
                }
            ]
        },
        {
            id: 'imageBorderHoverResponsive',
            show: switcher.imageBorder === 'hover' && device !== 'Desktop',
            label: __('Border', 'gutenverse'),
            component: BorderResponsiveControl,
            allowDeviceControl: true,
            style: [
                {
                    selector: `.${elementId} .profile-box .profile-card img:hover`,
                    allowRender: () => device !== 'Desktop',
                    render: value => handleBorderResponsive(value)
                }
            ]
        },
        {
            id: 'imageBoxShadowHover',
            show: switcher.imageBorder === 'hover',
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