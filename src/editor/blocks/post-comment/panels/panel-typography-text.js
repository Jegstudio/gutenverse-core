import { __ } from '@wordpress/i18n';
import { handleColor, handleDimension, handleTypography } from 'gutenverse-core/styling';
import { ColorControl, DimensionControl, TypographyControl, SwitchControl, HeadingControl } from 'gutenverse-core/controls';

export const textTypographyPanel = (props) => {
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
                    label: 'Form Comment'
                },
                {
                    value: 'listComment',
                    label: 'List Comment'
                }
            ],
            onChange: ({ __commentType }) => setSwitcher({ ...switcher, commentType: __commentType })
        },
        //form comment
        {
            id: 'typographyText',
            label: __('Text Typography', 'gutenverse'),
            show: !switcher.commentType || switcher.commentType === 'formComment',
            component: TypographyControl,
            style: [
                {
                    selector: `.${elementId} .comment-form p`,
                    hasChild: true,
                    render: (value,id) => handleTypography(value, props, id)
                }
            ],
        },
        {
            id: 'colorText',
            label: __('Text Color', 'gutenverse'),
            show: !switcher.commentType || switcher.commentType === 'formComment',
            component: ColorControl,
            style: [
                {
                    selector: `.${elementId} .comment-form p`,
                    render: value => handleColor(value, 'color')
                }
            ]
        },
        {
            id: 'marginText',
            label: __('Margin', 'gutenverse'),
            show: !switcher.commentType || switcher.commentType === 'formComment',
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
                    selector: `.${elementId} .comment-form p`,
                    render: value => handleDimension(value, 'margin')
                }
            ]
        },
        //list comment
        {
            id: 'submenuSplitter1',
            component: HeadingControl,
            label: __('Comment Text')
        },
        {
            id: 'typographyTextList',
            label: __('Text Typography', 'gutenverse'),
            show: switcher.commentType === 'listComment',
            component: TypographyControl,
            style: [
                {
                    selector: `.${elementId} .commentlist p`,
                    hasChild: true,
                    render: (value,id) => handleTypography(value, props, id)
                }
            ],
        },
        {
            id: 'colorTextList',
            label: __('Text Color', 'gutenverse'),
            show: switcher.commentType === 'listComment',
            component: ColorControl,
            style: [
                {
                    selector: `.${elementId} .commentlist p`,
                    render: value => handleColor(value, 'color')
                }
            ]
        },
        {
            id: 'marginTextList',
            label: __('Text Margin', 'gutenverse'),
            show: switcher.commentType === 'listComment',
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
                    selector: `.${elementId} .commentlist .comment p`,
                    render: value => handleDimension(value, 'margin')
                }
            ]
        },
        //suffix text
        {
            id: 'submenuSplitter2',
            component: HeadingControl,
            label: __('Username Suffix')
        },
        {
            id: 'suffixTypography',
            label: __('Suffix Typography', 'gutenverse'),
            show: switcher.commentType === 'listComment',
            component: TypographyControl,
            style: [
                {
                    selector: `.${elementId} span.says`,
                    hasChild: true,
                    render: (value,id) => handleTypography(value, props, id)
                }
            ],
        },
        {
            id: 'suffixColor',
            label: __('Suffix Color', 'gutenverse'),
            show: switcher.commentType === 'listComment',
            component: ColorControl,
            style: [
                {
                    selector: `.${elementId} span.says`,
                    render: value => handleColor(value, 'color')
                }
            ]
        },
        {
            id: 'suffixMargin',
            label: __('Suffix Margin', 'gutenverse'),
            show: switcher.commentType === 'listComment',
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
                    selector: `.${elementId} span.says`,
                    render: value => handleDimension(value, 'margin')
                }
            ]
        },
    ];
};

