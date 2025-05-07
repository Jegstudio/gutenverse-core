
import { __ } from '@wordpress/i18n';
import { AlignCenter, AlignLeft, AlignRight } from 'gutenverse-core/components';
import { BackgroundControl, BorderControl, BorderResponsiveControl, BoxShadowControl, DimensionControl, IconRadioControl, SwitchControl } from 'gutenverse-core/controls';
import { getDeviceType } from 'gutenverse-core/editor-helper';

export const contentPanel = (props) => {
    const {
        switcher,
        setSwitcher,
        elementId
    } = props;

    const device = getDeviceType();

    return [
        {
            id: 'alignment',
            label: __('Content Alignment', 'gutenverse'),
            component: IconRadioControl,
            allowDeviceControl: true,
            options: [
                {
                    label: __('Align Left', 'gutenverse'),
                    value: 'left',
                    icon: <AlignLeft />,
                },
                {
                    label: __('Align Center', 'gutenverse'),
                    value: 'center',
                    icon: <AlignCenter />,
                },
                {
                    label: __('Align Right', 'gutenverse'),
                    value: 'right',
                    icon: <AlignRight />,
                },
            ],
        },
        {
            id: 'profilePadding',
            label: __('Profile Padding', 'gutenverse'),
            component: DimensionControl,
            allowDeviceControl: true,
            position: ['top', 'right', 'bottom', 'left'],
            units: {
                px: {
                    text: 'px',
                    unit: 'px'
                },
                em: {
                    text: 'em',
                    unit: 'em'
                },
                ['%']: {
                    text: '%',
                    unit: '%'
                },
                rem: {
                    text: 'rem',
                    unit: 'rem'
                },
            },
        },
        {
            id: 'detailsPadding',
            label: __('Content Padding', 'gutenverse'),
            component: DimensionControl,
            allowDeviceControl: true,
            position: ['top', 'right', 'bottom', 'left'],
            units: {
                px: {
                    text: 'px',
                    unit: 'px'
                },
                em: {
                    text: 'em',
                    unit: 'em'
                },
                ['%']: {
                    text: '%',
                    unit: '%'
                },
                rem: {
                    text: 'rem',
                    unit: 'rem'
                },
            },
        },
        {
            id: 'profileBorderRadius',
            label: __('Profile Border Radius', 'gutenverse'),
            component: DimensionControl,
            allowDeviceControl: true,
            position: ['top', 'right', 'bottom', 'left'],
            units: {
                px: {
                    text: 'px',
                    unit: 'px'
                },
                em: {
                    text: 'em',
                    unit: 'em'
                },
                ['%']: {
                    text: '%',
                    unit: '%'
                },
                rem: {
                    text: 'rem',
                    unit: 'rem'
                },
            },
        },
        {
            id: 'hoverBgColor',
            label: __('Overlay Background', 'gutenverse'),
            component: BackgroundControl,
            options: ['default', 'gradient'],
            allowDeviceControl: true,
            liveStyle: [
                {
                    'type': 'background',
                    'id': 'hoverBgColor',
                    'selector': `.${elementId}.guten-team .profile-box .profile-card.card-overlay:before, .${elementId}.guten-team .profile-box .profile-card.card-title-social-horizontal:before`,
                }
            ]
        },
        {
            id: '__profileHover',
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
            onChange: ({ __profileHover }) => setSwitcher({ ...switcher, profileHover: __profileHover })
        },
        {
            id: 'profileBackground',
            show: !switcher.profileHover || switcher.profileHover === 'normal',
            component: BackgroundControl,
            allowDeviceControl: true,
            options: ['default', 'gradient'],
            liveStyle: [
                {
                    'type': 'background',
                    'id': 'profileBackground',
                    'selector': `.${elementId} .profile-box .profile-card`,
                }
            ]
        },
        {
            id: 'profileBackgroundHover',
            show: switcher.profileHover === 'hover',
            component: BackgroundControl,
            allowDeviceControl: true,
            options: ['default', 'gradient'],
        },
        {
            id: 'profileBorder',
            show: (!switcher.profileHover || switcher.profileHover === 'normal') && device === 'Desktop',
            label: __('Border', 'gutenverse'),
            component: BorderControl,
            liveStyle: [
                {
                    'type': 'border',
                    'id': 'profileBorder',
                    'selector': `.${elementId} .profile-box .profile-card`,
                }
            ]
        },
        {
            id: 'profileBorderResponsive',
            show: (!switcher.profileHover || switcher.profileHover === 'normal') && device !== 'Desktop',
            label: __('Border', 'gutenverse'),
            component: BorderResponsiveControl,
            allowDeviceControl: true,
            liveStyle: [
                {
                    'type': 'borderResponsive',
                    'id': 'profileBorderResponsive',
                    'selector': `.${elementId} .profile-box .profile-card`,
                }
            ]
        },
        {
            id: 'profileBoxShadow',
            show: !switcher.profileHover || switcher.profileHover === 'normal',
            label: __('Box Shadow', 'gutenverse'),
            component: BoxShadowControl,
            liveStyle: [
                {
                    'type': 'boxShadow',
                    'id': 'profileBoxShadow',
                    'properties': [
                        {
                            'name': 'box-shadow',
                            'valueType': 'direct'
                        }
                    ],
                    'selector': `.${elementId} .profile-box .profile-card`,
                }
            ]
        },
        {
            id: 'profileBorderHover',
            show: switcher.profileHover === 'hover' && device === 'Desktop',
            label: __('Border', 'gutenverse'),
            component: BorderControl,
        },
        {
            id: 'profileBorderHoverResponsive',
            show: switcher.profileHover === 'hover' && device !== 'Desktop',
            label: __('Border', 'gutenverse'),
            component: BorderResponsiveControl,
            allowDeviceControl: true,
        },
        {
            id: 'profileBoxShadowHover',
            show: switcher.profileHover === 'hover',
            label: __('Box Shadow', 'gutenverse'),
            component: BoxShadowControl,
        }
    ];
};