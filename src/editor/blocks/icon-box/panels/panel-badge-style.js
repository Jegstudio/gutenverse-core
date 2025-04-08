import { __ } from '@wordpress/i18n';
import { BackgroundControl, BoxShadowControl, ColorControl, DimensionControl, TypographyControl } from 'gutenverse-core/controls';
import { handleColor, handleDimension, handleTypography, handleBackground, allowRenderBoxShadow } from 'gutenverse-core/styling';
import { handleBoxShadow } from 'gutenverse-core/styling';

export const panelBadgeStyle = (props) => {
    const {
        elementId
    } = props;

    return [
        {
            id: 'badgeTextColor',
            label: __('Text Color', 'gutenverse'),
            component: ColorControl,
            style: [
                {
                    selector: `.${elementId} .icon-box-badge .badge-text`,
                    render: value => handleColor(value, 'color')
                }
            ]
        },
        {
            id: 'badgePadding',
            label: __('Padding', 'gutenverse'),
            component: DimensionControl,
            position: ['top', 'right', 'bottom', 'left'],
            allowDeviceControl: true,
            units: {
                px: {
                    text: 'px',
                    unit: 'px'
                },
                em: {
                    text: 'em',
                    unit: 'em'
                },
                percent: {
                    text: '%',
                    unit: '%'
                },
            },
            style: [
                {
                    selector: `.${elementId} .icon-box-badge .badge-text`,
                    render: value => handleDimension(value, 'padding')
                }
            ],
        },
        {
            id: 'badgeMargin',
            label: __('Margin', 'gutenverse'),
            component: DimensionControl,
            position: ['top', 'right', 'bottom', 'left'],
            allowDeviceControl: true,
            units: {
                px: {
                    text: 'px',
                    unit: 'px'
                },
                em: {
                    text: 'em',
                    unit: 'em'
                },
                percent: {
                    text: '%',
                    unit: '%'
                },
            },
            style: [
                {
                    selector: `.${elementId} .icon-box-badge .badge-text`,
                    render: value => handleDimension(value, 'margin')
                }
            ],
        },
        {
            id: 'badgeRadius',
            label: __('Border Radius', 'gutenverse'),
            component: DimensionControl,
            position: ['top', 'right', 'bottom', 'left'],
            allowDeviceControl: true,
            units: {
                px: {
                    text: 'px',
                    unit: 'px'
                },
                em: {
                    text: 'em',
                    unit: 'em'
                },
                percent: {
                    text: '%',
                    unit: '%'
                },
            },
            style: [
                {
                    selector: `.${elementId} .icon-box-badge .badge-text`,
                    render: value => handleDimension(value, 'border-radius', false)
                }
            ],
        },
        {
            id: 'badgeBackground',
            component: BackgroundControl,
            options: ['default', 'gradient'],
            style: [
                {
                    selector: `.${elementId} .icon-box-badge .badge-text`,
                    hasChild: true,
                    render: value => handleBackground(value)
                }
            ]
        },
        {
            id: 'badgeTypography',
            label: __('Typography', 'gutenverse'),
            component: TypographyControl,
            style: [
                {
                    selector: `.${elementId} .icon-box-badge .badge-text`,
                    hasChild: true,
                    render: (value,id) => handleTypography(value, props, id)
                }
            ],
        },
        {
            id: 'badgeShadow',
            label: __('Box Shadow', 'gutenverse'),
            component: BoxShadowControl,
            style: [
                {
                    selector: `.${elementId} .icon-box-badge .badge-text`,
                    allowRender: (value) => allowRenderBoxShadow(value),
                    render: value => handleBoxShadow(value)
                }
            ]
        },
    ];
};

