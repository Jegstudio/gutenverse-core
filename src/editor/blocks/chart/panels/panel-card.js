import { __ } from '@wordpress/i18n';
import { getDeviceType } from 'gutenverse-core/editor-helper';
import { AlignCenter, AlignJustify, AlignLeft, AlignRight } from 'react-feather';
import { TypographyControl, BoxShadowControl, IconRadioControl, BackgroundControl, AlertControl, ColorControl, HeadingControl, DimensionControl, BorderResponsiveControl, TextShadowControl } from 'gutenverse-core/controls';
import { handleColor, handleTypography, handleBackground, handleBorderResponsive, handleDimension, handleTextShadow, allowRenderTextShadow, handleBoxShadow, allowRenderBoxShadow } from 'gutenverse-core/styling';

export const cardPanel = (props) => {
    const {
        elementId,
        enableContent
    } = props;

    const deviceType = getDeviceType();

    return [
        {
            id: 'activate-notice',
            component: AlertControl,
            show: !enableContent[deviceType] || enableContent[deviceType] === undefined,
            children: <>
                <span>{__('Enable content to use these options.', 'gutenverse')}</span>
            </>
        },
        {
            id: 'cardBackground',
            label: __('Card Background', 'gutenverse'),
            component: BackgroundControl,
            allowDeviceControl: true,
            options: ['default', 'gradient'],
            show: enableContent[deviceType],
            style: [
                {
                    selector: `.${elementId} .chart-content.content-card,
                        .${elementId}.Desktop-noFlip .chart-content.content-card,
                        .${elementId}.Tablet-noFlip .chart-content.content-card,
                        .${elementId}.Mobile-noFlip .chart-content.content-card`,
                    hasChild: true,
                    render: value => handleBackground(value)
                }
            ]
        },
        {
            id: 'paddingCard',
            label: __('Card Padding', 'gutenverse'),
            component: DimensionControl,
            position: ['top', 'right', 'bottom', 'left'],
            show: enableContent[deviceType],
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
                    selector: `.${elementId} .chart-content.content-card,
                        .${elementId}.Desktop-noFlip .chart-content.content-card,
                        .${elementId}.Tablet-noFlip .chart-content.content-card,
                        .${elementId}.Mobile-noFlip .chart-content.content-card`,
                    render: value => handleDimension(value, 'padding')
                }
            ],
        },
        {
            id: 'cardBorder',
            label: __('Card Border', 'gutenverse'),
            component: BorderResponsiveControl,
            show: enableContent[deviceType],
            allowDeviceControl: true,
            style: [
                {
                    selector: `.${elementId} .chart-content.content-card,
                        .${elementId}.Desktop-noFlip .chart-content.content-card,
                        .${elementId}.Tablet-noFlip .chart-content.content-card,
                        .${elementId}.Mobile-noFlip .chart-content.content-card`,
                    render: value => handleBorderResponsive(value)
                }
            ]
        },
        {
            id: 'cardBoxShadow',
            label: __('Card Box Shadow', 'gutenverse'),
            show: enableContent[deviceType],
            component: BoxShadowControl,
            style: [
                {
                    selector: `.${elementId} .chart-content.content-card,
                        .${elementId}.Desktop-noFlip .chart-content.content-card,
                        .${elementId}.Tablet-noFlip .chart-content.content-card,
                        .${elementId}.Mobile-noFlip .chart-content.content-card`,
                    allowRender: (value) => allowRenderBoxShadow(value),
                    render: value => handleBoxShadow(value)
                }
            ]
        },
        {
            id: 'chartCardHeadingTitle',
            component: HeadingControl,
            show: enableContent[deviceType],
            label: __('Title', 'gutenverse'),
        },
        {
            id: 'cardTitleAlign',
            label: __('Title Alignment', 'gutenverse'),
            allowDeviceControl: true,
            component: IconRadioControl,
            show: enableContent[deviceType],
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
                {
                    label: __('Align Justify', 'gutenverse'),
                    value: 'justify',
                    icon: <AlignJustify/>,
                },
            ],
            style: [
                {
                    selector: `.${elementId} .chart-content.content-card .chart-title,
                        .${elementId}.Desktop-noFlip .chart-content.content-card .chart-title,
                        .${elementId}.Tablet-noFlip .chart-content.content-card .chart-title,
                        .${elementId}.Mobile-noFlip .chart-content.content-card .chart-title`,
                    render: value => `text-align: ${value};`
                }
            ]
        },
        {
            id: 'cardTitleColor',
            label: __('title Color', 'gutenverse'),
            component: ColorControl,
            show: enableContent[deviceType],
            style: [
                {
                    selector: `.${elementId} .chart-content.content-card .chart-title,
                        .${elementId}.Desktop-noFlip .chart-content.content-card .chart-title,
                        .${elementId}.Tablet-noFlip .chart-content.content-card .chart-title,
                        .${elementId}.Mobile-noFlip .chart-content.content-card .chart-title`,
                    render: value => handleColor(value, 'color')
                }
            ],
        },
        {
            id: 'cardTitleTypography',
            label: __('title Typography', 'gutenverse'),
            component: TypographyControl,
            show: enableContent[deviceType],
            style: [
                {
                    selector: `.${elementId} .chart-content.content-card .chart-title,
                        .${elementId}.Desktop-noFlip .chart-content.content-card .chart-title,
                        .${elementId}.Tablet-noFlip .chart-content.content-card .chart-title,
                        .${elementId}.Mobile-noFlip .chart-content.content-card .chart-title`,
                    hasChild: true,
                    render: (value, id) => handleTypography(value, props, id)
                }
            ],
        },
        {
            id: 'cardTitleTextShadow',
            label: __('Title Text Shadow', 'gutenverse'),
            show: enableContent[deviceType],
            component: TextShadowControl,
            style: [
                {
                    selector: `.${elementId} .chart-content.content-card .chart-title,
                        .${elementId}.Desktop-noFlip .chart-content.content-card .chart-title,
                        .${elementId}.Tablet-noFlip .chart-content.content-card .chart-title,
                        .${elementId}.Mobile-noFlip .chart-content.content-card .chart-title`,
                    allowRender: (value) => allowRenderTextShadow(value),
                    render: value => handleTextShadow(value)
                }
            ]
        },
        {
            id: 'chartCardHeadingdescription',
            component: HeadingControl,
            show: enableContent[deviceType],
            label: __('Description', 'gutenverse'),
        },
        {
            id: 'cardDescriptionAlign',
            label: __('Description Alignment', 'gutenverse'),
            allowDeviceControl: true,
            component: IconRadioControl,
            show: enableContent[deviceType],
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
                {
                    label: __('Align Justify', 'gutenverse'),
                    value: 'justify',
                    icon: <AlignJustify/>,
                },
            ],
            style: [
                {
                    selector: `.${elementId} .chart-content.content-card .chart-description,
                        .${elementId}.Desktop-noFlip .chart-content.content-card .chart-description,
                        .${elementId}.Tablet-noFlip .chart-content.content-card .chart-description,
                        .${elementId}.Mobile-noFlip .chart-content.content-card .chart-description`,
                    render: value => `text-align: ${value};`
                }
            ]
        },
        {
            id: 'cardDescriptionColor',
            label: __('Description Color', 'gutenverse'),
            show: enableContent[deviceType],
            component: ColorControl,
            style: [
                {
                    selector: `.${elementId} .chart-content.content-card .chart-description,
                        .${elementId}.Desktop-noFlip .chart-content.content-card .chart-description,
                        .${elementId}.Tablet-noFlip .chart-content.content-card .chart-description,
                        .${elementId}.Mobile-noFlip .chart-content.content-card .chart-description`,
                    render: value => handleColor(value, 'color')
                }
            ],
        },
        {
            id: 'cardDescriptionTypography',
            label: __('Description Typography', 'gutenverse'),
            show: enableContent[deviceType],
            component: TypographyControl,
            style: [
                {
                    selector: `.${elementId} .chart-content.content-card .chart-description,
                        .${elementId}.Desktop-noFlip .chart-content.content-card .chart-description,
                        .${elementId}.Tablet-noFlip .chart-content.content-card .chart-description,
                        .${elementId}.Mobile-noFlip .chart-content.content-card .chart-description`,
                    hasChild: true,
                    render: (value, id) => handleTypography(value, props, id)
                }
            ],
        },
        {
            id: 'cardDescriptionTextShadow',
            label: __('Description Text Shadow', 'gutenverse'),
            show: enableContent[deviceType],
            component: TextShadowControl,
            style: [
                {
                    selector: `.${elementId} .chart-content.content-card .chart-description,
                        .${elementId}.Desktop-noFlip .chart-content.content-card .chart-description,
                        .${elementId}.Tablet-noFlip .chart-content.content-card .chart-description,
                        .${elementId}.Mobile-noFlip .chart-content.content-card .chart-description`,
                    allowRender: (value) => allowRenderTextShadow(value),
                    render: value => handleTextShadow(value)
                }
            ]
        },
    ];
};