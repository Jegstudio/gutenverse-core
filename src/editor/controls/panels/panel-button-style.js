import { __ } from '@wordpress/i18n';
import { handleColor, handleTypography } from 'gutenverse-core/styling';
import { ColorControl, SwitchControl, TypographyControl } from 'gutenverse-core-editor/controls';

export const buttonStylePanel = (props) => {
    const {
        elementId,
        switcher,
        setSwitcher
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
            style: [
                {
                    selector: `.editor-styles-wrapper .${elementId}.guten-button-wrapper .guten-button span`,
                    render: value => handleColor(value, 'color')
                }
            ]
        },
        {
            id: 'iconColor',
            show: !switcher.styleHover || switcher.styleHover === 'normal',
            label: __('Icon Color', 'gutenverse'),
            component: ColorControl,
            style: [
                {
                    selector: `.editor-styles-wrapper .${elementId}.guten-button-wrapper .guten-button i`,
                    render: value => handleColor(value, 'color')
                }
            ]
        },
        {
            id: 'hoverTextColor',
            show: switcher.styleHover === 'hover',
            label: __('Hover Text Color', 'gutenverse'),
            component: ColorControl,
            style: [
                {
                    selector: `.editor-styles-wrapper .${elementId}.guten-button-wrapper .guten-button:hover span`,
                    render: value => handleColor(value, 'color')
                }
            ]
        },
        {
            id: 'hoverIconColor',
            show: switcher.styleHover === 'hover',
            label: __('Hover Icon Color', 'gutenverse'),
            component: ColorControl,
            style: [
                {
                    selector: `.editor-styles-wrapper .${elementId}.guten-button-wrapper .guten-button:hover i`,
                    render: value => handleColor(value, 'color')
                }
            ]
        },
        {
            id: 'typography',
            label: __('Typography', 'gutenverse'),
            component: TypographyControl,
            style: [
                {
                    selector: `.editor-styles-wrapper .${elementId}.guten-button-wrapper .guten-button span`,
                    hasChild: true,
                    render: (value,id) => handleTypography(value, props, id)
                }
            ],
        },
    ];
};

