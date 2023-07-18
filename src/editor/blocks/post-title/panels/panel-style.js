import { __ } from '@wordpress/i18n';

import { allowRenderTextShadow, handleAlign, handleColor, handleTypography } from 'gutenverse-core/styling';
import { ColorControl, IconRadioControl, SwitchControl, TextShadowControl, TypographyControl } from 'gutenverse-core/controls';
import { AlignCenter, AlignJustify, AlignLeft, AlignRight } from 'react-feather';
import { handleTextShadow } from 'gutenverse-core/styling';

export const stylePanel = (props) => {
    const {
        elementId,
        switcher,
        setSwitcher
    } = props;

    return [
        {
            id: 'alignment',
            label: __('Alignment', 'gutenverse'),
            component: IconRadioControl,
            allowDeviceControl: true,
            options: [
                {
                    label: __('Align Left', 'gutenverse'),
                    value: 'flex-start',
                    icon: <AlignLeft />,
                },
                {
                    label: __('Align Center', 'gutenverse'),
                    value: 'center',
                    icon: <AlignCenter />,
                },
                {
                    label: __('Align Right', 'gutenverse'),
                    value: 'flex-end',
                    icon: <AlignRight />,
                },
                {
                    label: __('Align Right', 'gutenverse'),
                    value: 'space-between',
                    icon: <AlignJustify />,
                },
            ],
            style: [
                {
                    selector: `.${elementId} h1, .${elementId} h2, .${elementId} h3, .${elementId} h4, .${elementId} h5, .${elementId} h6, .${elementId} span, .${elementId} a`,
                    render: value => `justify-content: ${value}; text-align: ${handleAlign(value)};`
                },
            ]
        },
        {
            id: 'typography',
            label: __('Typography', 'gutenverse'),
            component: TypographyControl,
            style: [
                {
                    selector: `.${elementId} h1, .${elementId} h2, .${elementId} h3, .${elementId} h4, .${elementId} h5, .${elementId} h6, .${elementId} span, .${elementId} a`,
                    hasChild: true,
                    render: (value,id) => handleTypography(value, props, id)
                }
            ]
        },
        {
            id: '__styleHover',
            component: SwitchControl,
            options: [
                {
                    value: 'normal',
                    label: 'Normal'
                },
                {
                    value: 'hover',
                    label: 'Hover'
                }
            ],
            onChange: ({__styleHover}) => setSwitcher({...switcher, styleHover: __styleHover})
        },
        {
            id: 'color',
            show: !switcher.styleHover || switcher.styleHover === 'normal',
            label: __('Text color', 'gutenverse'),
            component: ColorControl,
            style: [
                {
                    selector: `.${elementId} h1, .${elementId} h2, .${elementId} h3, .${elementId} h4, .${elementId} h5, .${elementId} h6, .${elementId} span, .${elementId} a`,
                    render: value => handleColor(value, 'color')
                }
            ]
        },
        {
            id: 'textShadow',
            show: !switcher.styleHover || switcher.styleHover === 'normal',
            label: __('Text Shadow', 'gutenverse'),
            component: TextShadowControl,
            style: [
                {
                    selector: `.${elementId} h1, .${elementId} h2, .${elementId} h3, .${elementId} h4, .${elementId} h5, .${elementId} h6, .${elementId} span, .${elementId} a`,
                    allowRender: (value) => allowRenderTextShadow(value),
                    render: value => handleTextShadow(value)
                }
            ]
        },
        {
            id: 'colorHover',
            show: switcher.styleHover === 'hover',
            label: __('Hover Text color', 'gutenverse'),
            component: ColorControl,
            style: [
                {
                    selector: `.${elementId}:hover h1, .${elementId}:hover h2, .${elementId}:hover h3, .${elementId}:hover h4, .${elementId}:hover h5, .${elementId}:hover h6, .${elementId}:hover span, .${elementId}:hover a`,
                    render: value => handleColor(value, 'color')
                }
            ]
        },
        {
            id: 'textShadowHover',
            show: switcher.styleHover === 'hover',
            label: __('Hover Text Shadow', 'gutenverse'),
            component: TextShadowControl,
            style: [
                {
                    selector: `.${elementId}:hover h1, .${elementId}:hover h2, .${elementId}:hover h3, .${elementId}:hover h4, .${elementId}:hover h5, .${elementId}:hover h6, .${elementId}:hover span, .${elementId}:hover a`,
                    allowRender: (value) => allowRenderTextShadow(value),
                    render: value => handleTextShadow(value)
                }
            ]
        }
    ];
};

