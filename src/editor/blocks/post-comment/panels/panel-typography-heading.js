import { __ } from '@wordpress/i18n';
import { handleColor, handleDimension, handleTypography } from 'gutenverse-core/styling';
import { ColorControl, DimensionControl, TypographyControl, SwitchControl, HeadingControl } from 'gutenverse-core/controls';

export const headingTypographyPanel = (props) => {
    const {
        elementId,
        switcher,
        setSwitcher
    } = props;

    return [
        {
            id: '__commentType',
            component: SwitchControl,
            options: [
                {
                    value: 'formComment',
                    label: 'Form Heading'
                },
                {
                    value: 'titleComment',
                    label: 'Comment Title'
                }
            ],
            onChange: ({ __commentType }) => setSwitcher({ ...switcher, commentType: __commentType })
        },
        {
            id: 'typographyHeading',
            show: !switcher.commentType || switcher.commentType === 'formComment',
            label: __('Heading Typography', 'gutenverse'),
            component: TypographyControl,
            style: [
                {
                    selector: `.${elementId} h1, .${elementId} h2, .${elementId} h3, .${elementId} h4, .${elementId} h5, .${elementId} h6`,
                    hasChild: true,
                    render: (value,id) => handleTypography(value, props, id)
                }
            ],
        },
        {
            id: 'colorHeading',
            show: !switcher.commentType || switcher.commentType === 'formComment',
            label: __('Heading Color', 'gutenverse'),
            component: ColorControl,
            style: [
                {
                    selector: `.${elementId} h1, .${elementId} h2, .${elementId} h3, .${elementId} h4, .${elementId} h5, .${elementId} h6`,
                    render: value => handleColor(value, 'color')
                }
            ]
        },
        {
            id: 'marginHeading',
            show: !switcher.commentType || switcher.commentType === 'formComment',
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
                rem: {
                    text: 'rem',
                    unit: 'rem'
                },
            },
            style: [
                {
                    selector: `.${elementId} h1, .${elementId} h2, .${elementId} h3, .${elementId} h4, .${elementId} h5, .${elementId} h6, .${elementId} .comment-reply-title`,
                    render: value => handleDimension(value, 'margin')
                }
            ]
        },
         //title comment
         {
            id: 'splitSubmenu3',
            component: HeadingControl,
            show: switcher.commentType === 'titleComment',
            label: __('Title Text')
        },
        {
            id: 'typographyCommentTitle',
            label: __('Text Typography', 'gutenverse'),
            show: switcher.commentType === 'titleComment',
            component: TypographyControl,
            style: [
                {
                    selector: `.${elementId} .guten-post-comment-title p`,
                    hasChild: true,
                    render: (value,id) => handleTypography(value, props, id)
                }
            ],
        },
        {
            id: 'colorCommentTitle',
            label: __('Text Color', 'gutenverse'),
            show: switcher.commentType === 'titleComment',
            component: ColorControl,
            style: [
                {
                    selector: `.${elementId} .guten-post-comment-title p`,
                    render: value => handleColor(value, 'color')
                }
            ]
        },
        {
            id: 'marginCommentTitle',
            label: __('Text Container Margin', 'gutenverse'),
            show: switcher.commentType === 'titleComment',
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
                    selector: `.${elementId} .guten-post-comment-title`,
                    render: value => handleDimension(value, 'margin')
                }
            ]
        },
        {
            id: 'splitSubmenu4',
            component: HeadingControl,
            show: switcher.commentType === 'titleComment',
            label: __('Comments Count')
        },
        {
            id: 'commentCountTypography',
            label: __('Comment Count Typography', 'gutenverse'),
            show: switcher.commentType === 'titleComment',
            component: TypographyControl,
            style: [
                {
                    selector: `.${elementId} .guten-post-comment-title p span.comment-count`,
                    hasChild: true,
                    render: (value,id) => handleTypography(value, props, id)
                }
            ],
        },
        {
            id: 'commentCountColor',
            label: __('Comment Count Color', 'gutenverse'),
            show: switcher.commentType === 'titleComment',
            component: ColorControl,
            style: [
                {
                    selector: `.${elementId} .guten-post-comment-title p span.comment-count`,
                    render: value => handleColor(value, 'color')
                }
            ]
        },
        {
            id: 'splitSubmenu5',
            component: HeadingControl,
            show: switcher.commentType === 'titleComment',
            label: __('Post Title')
        },
        {
            id: 'postTitleTypography',
            label: __('Post Title Typography', 'gutenverse'),
            show: switcher.commentType === 'titleComment',
            component: TypographyControl,
            style: [
                {
                    selector: `.${elementId} .guten-post-comment-title p span.comment-post-title`,
                    hasChild: true,
                    render: (value,id) => handleTypography(value, props, id)
                }
            ],
        },
        {
            id: 'postTitleColor',
            label: __('Post Title Color', 'gutenverse'),
            show: switcher.commentType === 'titleComment',
            component: ColorControl,
            style: [
                {
                    selector: `.${elementId} .guten-post-comment-title p span.comment-post-title`,
                    render: value => handleColor(value, 'color')
                }
            ]
        }
    ];
};

