import { __ } from '@wordpress/i18n';
import { ColorControl, SwitchControl } from 'gutenverse-core/controls';
import { handleColor } from 'gutenverse-core/styling';

export const contentColor = (props) => {
    const {
        elementId,
        switcher,
        setSwitcher
    } = props;

    return [
        {
            id: '__socialIconHover',
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
            onChange: ({__socialIconHover}) => setSwitcher({...switcher, socialIconHover: __socialIconHover})
        },
        {
            id: 'iconColor',
            show: !switcher.socialIconHover || switcher.socialIconHover === 'normal',
            label: __('Icon Color', 'gutenverse'),
            component: ColorControl,
            style: [
                {
                    selector: `.guten-social-icons.fill .guten-social-icon #${elementId} i, .guten-social-icons.border .guten-social-icon #${elementId} i, .guten-social-icons.custom .guten-social-icon #${elementId} i`,
                    render: value => handleColor(value, 'color')
                },
                {
                    selector: `.guten-social-icons.border .guten-social-icon #${elementId}`,
                    render: value => handleColor(value, 'border-color')
                }
            ]
        },
        {
            id: 'bgColor',
            show: !switcher.socialIconHover || switcher.socialIconHover === 'normal',
            label: __('Background Color', 'gutenverse'),
            component: ColorControl,
            style: [
                {
                    selector: `.guten-social-icons.fill .guten-social-icon #${elementId}, .guten-social-icons.border .guten-social-icon #${elementId}, .guten-social-icons.custom .guten-social-icon #${elementId}`,
                    render: value => handleColor(value, 'background-color')
                }
            ]
        },
        {
            id: 'textColor',
            show: !switcher.socialIconHover || switcher.socialIconHover === 'normal',
            label: __('Text Color', 'gutenverse'),
            component: ColorControl,
            style: [
                {
                    selector: `.guten-social-icons .guten-social-icon #${elementId} span`,
                    render: value => handleColor(value, 'color')
                }
            ]
        },
        {
            id: 'hoverIconColor',
            show: switcher.socialIconHover === 'hover',
            label: __('Hover Icon Color', 'gutenverse'),
            component: ColorControl,
            style: [
                {
                    selector: `.guten-social-icons.fill .guten-social-icon #${elementId}:hover i, .guten-social-icons.border .guten-social-icon #${elementId}:hover i, .guten-social-icons.custom .guten-social-icon #${elementId}:hover i`,
                    render: value => handleColor(value, 'color')
                },
                {
                    selector: `.guten-social-icons.border .guten-social-icon #${elementId}:hover`,
                    render: value => handleColor(value, 'border-color')
                }
            ]
        },
        {
            id: 'hoverBgColor',
            show: switcher.socialIconHover === 'hover',
            label: __('Hover Background Color', 'gutenverse'),
            component: ColorControl,
            style: [
                {
                    selector: `.guten-social-icons.fill .guten-social-icon #${elementId}:hover, .guten-social-icons.border .guten-social-icon #${elementId}:hover, .guten-social-icons.custom .guten-social-icon #${elementId}:hover`,
                    render: value => handleColor(value, 'background-color')
                }
            ]
        },
        {
            id: 'hoverTextColor',
            show: switcher.socialIconHover === 'hover',
            label: __('Hover Text Color', 'gutenverse'),
            component: ColorControl,
            style: [
                {
                    selector: `.guten-social-icons .guten-social-icon #${elementId}:hover span`,
                    render: value => handleColor(value, 'color')
                }
            ]
        },
    ];
};