import { __ } from '@wordpress/i18n';
import { handleBorderResponsive, handleColor, handleDimension } from 'gutenverse-core/styling';
import { BorderResponsiveControl, ColorControl, DimensionControl } from 'gutenverse-core/controls';

export const mainCommentPanel = (props) => {
    const {
        elementId
    } = props;

    return [
        {
            id: 'mainBgColor',
            label: __('Comment Background Color', 'gutenverse'),
            component: ColorControl,
            allowDeviceControl: true,
            style: [
                {
                    selector: `.${elementId} .commentlist .comment.depth-1 > .comment-body`,
                    render: value => handleColor(value, 'background-color')
                }
            ]
        },
        {
            id: 'mainMargin',
            label: __('Comment Margin', 'gutenverse'),
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
                    selector: `.${elementId} .commentlist .comment.depth-1 > .comment-body`,
                    render: value => handleDimension(value, 'margin')
                }
            ]
        },
        {
            id: 'mainPadding',
            label: __('Comment Padding', 'gutenverse'),
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
                    selector: `.${elementId} .commentlist .comment.depth-1 > .comment-body`,
                    render: value => handleDimension(value, 'padding')
                }
            ]
        },
        {
            id: 'mainBorder',
            label: __('Comment Border', '--gctd--'),
            component: BorderResponsiveControl,
            allowDeviceControl: true,
            style: [
                {
                    selector: `.${elementId} .commentlist .comment.depth-1 > .comment-body`,
                    render: value => handleBorderResponsive(value)
                }
            ]
        },
    ];
};

