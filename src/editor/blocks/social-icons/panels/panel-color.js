import { __ } from '@wordpress/i18n';
import { ColorControl, SelectControl, SwitchControl } from 'gutenverse-core/controls';
import { handleColor } from 'gutenverse-core/styling';

export const contentColor = (props) => {
    const {
        elementId,
        switcher,
        setSwitcher,
    } = props;

    return [

        {
            id: 'color',
            label: __('Social Icon Color', 'gutenverse'),
            component: SelectControl,
            options: [
                {
                    label: __('Fill'),
                    value: 'fill'
                },
                {
                    label: __('Border'),
                    value: 'border'
                },
                {
                    label: __('Custom'),
                    value: 'custom'
                },
            ],
        },
        {
            id: '__socialIconsHover',
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
            onChange: ({__socialIconsHover}) => setSwitcher({...switcher, socialIconsHover: __socialIconsHover})
        },
        {
            id: 'iconColor',
            label: __('Icon Color', 'gutenverse'),
            show: !switcher.socialIconsHover || switcher.socialIconsHover === 'normal',
            component: ColorControl,
            style: [
                {
                    selector: `.${elementId}.fill .guten-social-icon a i, .${elementId}.border .guten-social-icon a i, .${elementId}.custom .guten-social-icon a i`,
                    render: value => handleColor(value, 'color')
                },
                {
                    selector: `.${elementId}.border .guten-social-icon a`,
                    render: value => handleColor(value, 'border-color')
                }
            ]
        },
        {
            id: 'bgColor',
            label: __('Background Color', 'gutenverse'),
            show: !switcher.socialIconsHover || switcher.socialIconsHover === 'normal',
            component: ColorControl,
            style: [
                {
                    selector: `.${elementId}.fill .guten-social-icon a, .${elementId}.border .guten-social-icon a, .${elementId}.custom .guten-social-icon a`,
                    render: value => handleColor(value, 'background-color')
                }
            ]
        },
        {
            id: 'textColor',
            label: __('Text Color', 'gutenverse'),
            show: !switcher.socialIconsHover || switcher.socialIconsHover === 'normal',
            component: ColorControl,
            style: [
                {
                    selector: `.${elementId} .guten-social-icon a span`,
                    render: value => handleColor(value, 'color')
                }
            ]
        },
        {
            id: 'hoverIconColor',
            label: __('Icon Color', 'gutenverse'),
            show: switcher.socialIconsHover === 'hover',
            component: ColorControl,
            style: [
                {
                    selector: `.${elementId}.fill .guten-social-icon a:hover i, .${elementId}.border .guten-social-icon a:hover i, .${elementId}.custom .guten-social-icon a:hover i`,
                    render: value => handleColor(value, 'color')
                },
                {
                    selector: `.${elementId}.border .guten-social-icon a:hover`,
                    render: value => handleColor(value, 'border-color')
                }
            ]
        },
        {
            id: 'hoverBgColor',
            label: __('Background Color', 'gutenverse'),
            show: switcher.socialIconsHover === 'hover',
            component: ColorControl,
            style: [
                {
                    selector: `.${elementId}.fill .guten-social-icon a:hover, .${elementId}.border .guten-social-icon a:hover, .${elementId}.custom .guten-social-icon a:hover`,
                    render: value => handleColor(value, 'background-color')
                }
            ]
        },
        {
            id: 'hoverTextColor',
            label: __('Text Color', 'gutenverse'),
            show: switcher.socialIconsHover === 'hover',
            component: ColorControl,
            style: [
                {
                    selector: `.${elementId} .guten-social-icon a:hover span`,
                    render: value => handleColor(value, 'color')
                }
            ]
        },
    ];
};