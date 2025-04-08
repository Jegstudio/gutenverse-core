import { __ } from '@wordpress/i18n';
import { handleBorderResponsive, handleColor, handleDimension } from 'gutenverse-core/styling';
import { BorderResponsiveControl, ColorControl, DimensionControl, HeadingControl } from 'gutenverse-core/controls';

export const mainCommentPanel = (props) => {
    const {
        elementId
    } = props;

    return [
        {
            id: 'submenuSplitter1',
            component: HeadingControl,
            label: __('Comment Container')
        },
        {
            id: 'mainContainerBgColor',
            label: __('Container Background Color', 'gutenverse'),
            component: ColorControl,
            allowDeviceControl: true,
            style: [
                {
                    selector: `.${elementId} .commentlist .comment.depth-1`,
                    render: value => handleColor(value, 'background-color')
                }
            ]
        },
        {
            id: 'mainContainerMargin',
            label: __('Container Margin', 'gutenverse'),
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
                    selector: `.${elementId} .commentlist .comment.depth-1`,
                    render: value => handleDimension(value, 'margin')
                }
            ]
        },
        {
            id: 'mainContainerPadding',
            label: __('Container Padding', 'gutenverse'),
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
                    selector: `.${elementId} .commentlist .comment.depth-1`,
                    render: value => handleDimension(value, 'padding')
                }
            ]
        },
        {
            id: 'mainContainerBorder',
            label: __('Container Border', '--gctd--'),
            component: BorderResponsiveControl,
            allowDeviceControl: true,
            style: [
                {
                    selector: `.${elementId} .commentlist .comment.depth-1`,
                    render: value => handleBorderResponsive(value)
                }
            ]
        },
        {
            id: 'submenuSplitter2',
            component: HeadingControl,
            label: __('Comment Body')
        },
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

