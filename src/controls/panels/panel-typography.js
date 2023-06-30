
import { __ } from '@wordpress/i18n';
import { AlignCenter, AlignJustify, AlignLeft, AlignRight } from 'react-feather';
import { ColorControl, IconRadioControl } from 'gutenverse-core/controls';
import { handleColor } from 'gutenverse-core/controls';

export const typographyPanel = ({elementId}) => {
    return [
        {
            id: 'typographyHeadingColor',
            label: __('Heading Color', 'gutenverse'),
            component: ColorControl,
            style: [
                {
                    selector: `.${elementId} .wp-block-gutenverse-heading`,
                    render: value => handleColor(value, 'color')
                }
            ]
        },
        {
            id: 'typographyTextColor',
            label: __('Text Color', 'gutenverse'),
            component: ColorControl,
            style: [
                {
                    selector: `.${elementId}`,
                    render: value => handleColor(value, 'color')
                }
            ]
        },
        {
            id: 'typographyLinkColor',
            label: __('Link Color', 'gutenverse'),
            component: ColorControl,
            style: [
                {
                    selector: `.${elementId} a`,
                    render: value => handleColor(value, 'color')
                }
            ]
        },
        {
            id: 'typographyLinkHoverColor',
            label: __('Link Hover Color', 'gutenverse'),
            component: ColorControl,
            style: [
                {
                    selector: `.${elementId} a:hover`,
                    render: value => handleColor(value, 'color')
                }
            ]
        },
        {
            id: 'typographyTextAlign',
            label: __('Text Alignment', 'gutenverse'),
            allowDeviceControl: true,
            component: IconRadioControl,
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
                    selector: `.${elementId}`,
                    render: value => `text-align: ${value};`
                }
            ]
        },
    ];
};