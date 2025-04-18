
import { __ } from '@wordpress/i18n';
import { AlignCenter, AlignJustify, AlignLeft, AlignRight } from 'react-feather';
import { ColorControl, IconRadioControl } from 'gutenverse-core/controls';
import { handleColor } from 'gutenverse-core/styling';

export const typographyPanel = ({elementId}) => {
    return [
        {
            id: 'typographyHeadingColor',
            label: __('Heading Color', '--gctd--'),
            component: ColorControl,
            liveStyle: [
                {
                    'type': 'color',
                    'id': 'typographyHeadingColor',
                    'selector': `.${elementId} .wp-block-gutenverse-heading`,
                    'properties': [
                        {
                            'name': 'color',
                            'valueType': 'direct'
                        }
                    ],
                }
            ],
            // style below is deprecated
            style: [
                {
                    selector: `.${elementId} .wp-block-gutenverse-heading`,
                    render: value => handleColor(value, 'color')
                }
            ]
        },
        {
            id: 'typographyTextColor',
            label: __('Text Color', '--gctd--'),
            component: ColorControl,
            liveStyle: [
                {
                    'type': 'color',
                    'id': 'typographyTextColor',
                    'selector': `.${elementId}`,
                    'properties': [
                        {
                            'name': 'color',
                            'valueType': 'direct'
                        }
                    ],
                }
            ],
            // style below is deprecated
            style: [
                {
                    selector: `.${elementId}`,
                    render: value => handleColor(value, 'color')
                }
            ]
        },
        {
            id: 'typographyLinkColor',
            label: __('Link Color', '--gctd--'),
            component: ColorControl,
            liveStyle: [
                {
                    'type': 'color',
                    'id': 'typographyLinkColor',
                    'selector': `.${elementId} a`,
                    'properties': [
                        {
                            'name': 'color',
                            'valueType': 'direct'
                        }
                    ],
                }
            ],
            // style below is deprecated
            style: [
                {
                    selector: `.${elementId} a`,
                    render: value => handleColor(value, 'color')
                }
            ]
        },
        {
            id: 'typographyLinkHoverColor',
            label: __('Link Hover Color', '--gctd--'),
            component: ColorControl,
            liveStyle: [
                {
                    'type': 'color',
                    'id': 'typographyLinkHoverColor',
                    'selector': `.${elementId} a:hover`,
                    'properties': [
                        {
                            'name': 'color',
                            'valueType': 'direct'
                        }
                    ],
                }
            ],
            // style below is deprecated
            style: [
                {
                    selector: `.${elementId} a:hover`,
                    render: value => handleColor(value, 'color')
                }
            ]
        },
        {
            id: 'typographyTextAlign',
            label: __('Text Alignment', '--gctd--'),
            allowDeviceControl: true,
            component: IconRadioControl,
            options: [
                {
                    label: __('Align Left', '--gctd--'),
                    value: 'left',
                    icon: <AlignLeft/>,
                },
                {
                    label: __('Align Center', '--gctd--'),
                    value: 'center',
                    icon: <AlignCenter/>,
                },
                {
                    label: __('Align Right', '--gctd--'),
                    value: 'right',
                    icon: <AlignRight/>,
                },
                {
                    label: __('Align Justify', '--gctd--'),
                    value: 'justify',
                    icon: <AlignJustify/>,
                },
            ],
            // style below is deprecated
            style: [
                {
                    selector: `.${elementId}`,
                    render: value => `text-align: ${value};`
                }
            ]
        },
    ];
};