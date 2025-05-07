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
        },
        {
            id: 'colorText',
            label: __('Text Color', 'gutenverse'),
            show: !switcher.commentType || switcher.commentType === 'formComment',
            component: ColorControl,
            liveStyle: {
                'type': 'color',
                'id': 'colorText',
                'selector': `.${elementId} .comment-form p`,
                'properties': [
                    {
                        'name': 'color',
                        'valueType': 'direct'
                    }
                ]
            }
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
        },
        //list comment
        {
            id: 'splitSubmenu1',
            component: HeadingControl,
            show: switcher.commentType === 'listComment',
            label: __('Comment Text')
        },
        {
            id: 'typographyTextList',
            label: __('Text Typography', 'gutenverse'),
            show: switcher.commentType === 'listComment',
            component: TypographyControl,
        },
        {
            id: 'colorTextList',
            label: __('Text Color', 'gutenverse'),
            show: switcher.commentType === 'listComment',
            component: ColorControl,
            liveStyle: {
                'type': 'color',
                'id': 'colorTextList',
                'selector': `.${elementId} .commentlist p`,
                'properties': [
                    {
                        'name': 'color',
                        'valueType': 'direct'
                    }
                ]
            }
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
        },
        //suffix text
        {
            id: 'splitSubmenu2',
            component: HeadingControl,
            show: switcher.commentType === 'listComment',
            label: __('Username Suffix')
        },
        {
            id: 'suffixTypography',
            label: __('Suffix Typography', 'gutenverse'),
            show: switcher.commentType === 'listComment',
            component: TypographyControl,
        },
        {
            id: 'suffixColor',
            label: __('Suffix Color', 'gutenverse'),
            show: switcher.commentType === 'listComment',
            component: ColorControl,
            liveStyle: {
                'type': 'color',
                'id': 'suffixColor',
                'selector': `.${elementId} span.says`,
                'properties': [
                    {
                        'name': 'color',
                        'valueType': 'direct'
                    }
                ]
            }
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
        },
    ];
};

