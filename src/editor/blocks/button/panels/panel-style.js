import { __ } from '@wordpress/i18n';
import { handleColor, handleTypography } from 'gutenverse-core/styling';
import { ColorControl, SwitchControl, TypographyControl } from 'gutenverse-core/controls';

export const stylePanel = (props) => {
    const {
        elementId,
        switcher,
        setSwitcher,
        hoverWithParent,
        parentSelector
    } = props;

    return [
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
            label: __('Text Color', 'gutenverse'),
            component: ColorControl,
        },
        {
            id: 'iconColor',
            show: !switcher.styleHover || switcher.styleHover === 'normal',
            label: __('Icon Color', 'gutenverse'),
            component: ColorControl,
        },
        {
            id: 'hoverTextColor',
            show: switcher.styleHover === 'hover',
            label: __('Hover Text Color', 'gutenverse'),
            component: ColorControl,
        },
        {
            id: 'hoverIconColor',
            show: switcher.styleHover === 'hover',
            label: __('Hover Icon Color', 'gutenverse'),
            component: ColorControl,
        },
        {
            id: 'typography',
            label: __('Typography', 'gutenverse'),
            component: TypographyControl,
        },
    ];
};

