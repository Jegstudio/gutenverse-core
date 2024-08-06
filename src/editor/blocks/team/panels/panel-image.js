import { __ } from '@wordpress/i18n';
import { RangeControl, SizeControl } from 'gutenverse-core/controls';
import { handleUnitPoint } from 'gutenverse-core/styling';

export const imagePanel = ({elementId}) => {
    return [
        {
            id: 'imgWidth',
            label: __('Image Width', 'gutenverse'),
            component: SizeControl,
            allowDeviceControl: true,
            units: {
                px: {
                    text: 'px',
                    min: 1,
                    max: 1000,
                    step: 1,
                    unit: 'px',
                },
                em: {
                    text: 'em',
                    min: 1,
                    max: 100,
                    step: 1,
                    unit: 'em',
                },
                ['%']: {
                    text: '%',
                    min: 1,
                    max: 100,
                    step: 1,
                    unit: '%',
                }
            },
            style: [
                {
                    selector: `.${elementId} .profile-box .profile-card.card-default img,
                            .${elementId} .profile-box .profile-card.card-overlay img,
                            .${elementId} .profile-box .profile-card.card-hover img,
                            .${elementId} .profile-box .profile-card.card-default .profile-header img,
                            .${elementId} .profile-box .profile-card.card-overlay .profile-header img,
                            .${elementId} .profile-box .profile-card.card-hover .profile-header img,
                            .${elementId} .profile-box .profile-card.card-overlay`,
                    render: value => handleUnitPoint(value, 'width')
                },
            ]
        },
        {
            id: 'imgHeight',
            label: __('Image Height', 'gutenverse'),
            component: SizeControl,
            allowDeviceControl: true,
            units: {
                px: {
                    text: 'px',
                    min: 1,
                    max: 1000,
                    step: 1,
                    unit: 'px',
                },
                em: {
                    text: 'em',
                    min: 1,
                    max: 100,
                    step: 1,
                    unit: 'em',
                },
                ['%']: {
                    text: '%',
                    min: 1,
                    max: 100,
                    step: 1,
                    unit: '%',
                }
            },
            style: [
                {
                    selector: `.${elementId} .profile-box .profile-card.card-default img,
                            .${elementId} .profile-box .profile-card.card-overlay img,
                            .${elementId} .profile-box .profile-card.card-hover img,
                            .${elementId} .profile-box .profile-card.card-default .profile-header img,
                            .${elementId} .profile-box .profile-card.card-overlay .profile-header img,
                            .${elementId} .profile-box .profile-card.card-hover .profile-header img`,
                    render: value => handleUnitPoint(value, 'height')
                },
            ]
        },
        {
            id: 'imgRotate',
            label: __('Image Rotate', 'gutenverse'),
            component: RangeControl,
            allowDeviceControl: true,
            unit: 'deg',
            min: 1,
            max: 360,
            step: 1,
            style: [
                {
                    selector: `.${elementId} .profile-box .profile-card.card-default img,
                            .${elementId} .profile-box .profile-card.card-overlay img,
                            .${elementId} .profile-box .profile-card.card-hover img,
                            .${elementId} .profile-box .profile-card.card-default .profile-header img,
                            .${elementId} .profile-box .profile-card.card-overlay .profile-header img,
                            .${elementId} .profile-box .profile-card.card-hover .profile-header img`,
                    render: value => `transform: rotate(${value}deg);`
                },
            ]
        },
        {
            id: 'imgSpacing',
            label: __('Image Spacing', 'gutenverse'),
            component: RangeControl,
            allowDeviceControl: true,
            unit: 'px',
            min: 0,
            max: 500,
            step: 1,
            style: [
                {
                    selector: `.${elementId} .profile-box .profile-card.card-default .profile-header,
                            .${elementId} .profile-box .profile-card.card-hover .profile-header`,
                    render: value => `margin-bottom: ${value}px;`
                },
            ]
        },
    ];
};