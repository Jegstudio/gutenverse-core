import { __ } from '@wordpress/i18n';
import { handleBorderResponsive, handleColor, handleDimension } from 'gutenverse-core/styling';
import { BorderResponsiveControl, ColorControl, DimensionControl } from 'gutenverse-core/controls';

export const replyPanel = (props) => {
    const {
        elementId
    } = props;

    return [
        {
            id: 'replyBgColor',
            label: __('Reply Background Color', 'gutenverse'),
            component: ColorControl,
            allowDeviceControl: true,
            style: [
                {
                    selector: `.${elementId} .commentlist .comment .children`,
                    render: value => handleColor(value, 'background-color')
                }
            ]
        },
        {
            id: 'replyMargin',
            label: __('Reply Margin', 'gutenverse'),
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
                rem: {
                    text: 'rem',
                    unit: 'rem'
                },
            },
            style: [
                {
                    selector: `.${elementId} .commentlist .comment .children`,
                    render: value => handleDimension(value, 'margin')
                }
            ]
        },
        {
            id: 'replyPadding',
            label: __('Reply Padding', 'gutenverse'),
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
                rem: {
                    text: 'rem',
                    unit: 'rem'
                },
            },
            style: [
                {
                    selector: `.${elementId} .commentlist .comment .children`,
                    render: value => handleDimension(value, 'padding')
                }
            ]
        },
        {
            id: 'replyBorder',
            label: __('Reply Border', '--gctd--'),
            component: BorderResponsiveControl,
            allowDeviceControl: true,
            style: [
                {
                    selector: `.${elementId} .commentlist .comment .children`,
                    render: value => handleBorderResponsive(value)
                }
            ]
        },
    ];
};

