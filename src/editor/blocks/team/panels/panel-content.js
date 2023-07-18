
import { __ } from '@wordpress/i18n';
import { AlignCenter, AlignLeft, AlignRight } from 'react-feather';
import { DimensionControl, IconRadioControl } from 'gutenverse-core/controls';
import { handleDimension } from 'gutenverse-core/styling';

export const contentPanel = ({elementId}) => {
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
                    icon: <AlignLeft/>,
                },
                {
                    label: __('Align Center', 'gutenverse'),
                    value: 'center',
                    icon: <AlignCenter/>,
                },
                {
                    label: __('Align Right', 'gutenverse'),
                    value: 'right',
                    icon: <AlignRight/>,
                },
            ],
            style: [
                {
                    selector: `.${elementId} .profile-box .profile-card`,
                    render: value => `text-align: ${value}`
                },
            ]
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
            style: [
                {
                    selector: `.${elementId} .profile-box .profile-card.card-default,
                            .${elementId} .profile-box .profile-card.card-overlay,
                            .${elementId} .profile-box .profile-card.card-hover`,
                    render: value => handleDimension(value, 'padding')
                }
            ]
        },
        {
            id: 'detailsPadding',
            label: __('Details Padding', 'gutenverse'),
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
            style: [
                {
                    selector: `.${elementId} .profile-box .profile-card.card-default .profile-body,
                            .${elementId} .profile-box .profile-card.card-overlay .profile-body,
                            .${elementId} .profile-box .profile-card.card-hover .profile-body`,
                    render: value => handleDimension(value, 'padding')
                }
            ]
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
            style: [
                {
                    selector: `.${elementId} .profile-box .profile-card.card-default,
                            .${elementId} .profile-box .profile-card.card-overlay,
                            .${elementId} .profile-box .profile-card.card-hover,
                            .${elementId} .profile-box .profile-card.card-overlay.scale:hover:before`,
                    render: value => handleDimension(value, 'border-radius', false)
                }
            ]
        },
    ];
};