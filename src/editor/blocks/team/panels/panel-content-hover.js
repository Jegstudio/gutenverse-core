import { __ } from '@wordpress/i18n';
import { BackgroundControl, BorderControl, BoxShadowControl, DimensionControl } from 'gutenverse-core/controls';
import { allowRenderBoxShadow, handleBackground, handleBorder, handleDimension } from 'gutenverse-core/styling';
import { handleBoxShadow } from 'gutenverse-core/styling';

export const hoverPanel = (props) => {
    const {
        elementId,
    } = props;

    return [
        {
            id: 'hoverPadding',
            label: __('Hover Padding', 'gutenverse'),
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
                    selector: `.${elementId}.guten-team .profile-box .profile-card.card-hover:hover .profile-body`,
                    render: value => handleDimension(value, 'padding')
                }
            ]
        },
        {
            id: 'hoverContentBgColor',
            component: BackgroundControl,
            allowDeviceControl: true,
            options: [ 'default', 'gradient' ],
            style: [
                {
                    selector: `.${elementId}.guten-team .profile-box .profile-card.card-hover .profile-body:before`,
                    hasChild: true,
                    render: value => handleBackground(value)
                }
            ]
        },
        {
            id: 'hoverContentBorder',
            label: __('Border Type', 'gutenverse'),
            component: BorderControl,
            style: [
                {
                    selector: `.${elementId}.guten-team .profile-box .profile-card.card-hover .profile-body:before`,
                    hasChild: true,
                    render: value => handleBorder(value)
                }
            ]
        },
        {
            id: 'hoverContentShadow',
            label: __('Box Shadow', 'gutenverse'),
            component: BoxShadowControl,
            style: [
                {
                    selector: `.${elementId}.guten-team .profile-box .profile-card.card-hover .profile-body:before`,
                    allowRender: (value) => allowRenderBoxShadow(value),
                    render: value => handleBoxShadow(value)
                }
            ]
        },
    ];
};