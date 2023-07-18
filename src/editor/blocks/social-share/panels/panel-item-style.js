import { __ } from '@wordpress/i18n';
import {
    BorderControl,
    ColorControl,
    SizeControl,
    SwitchControl,
    TypographyControl
} from 'gutenverse-core/controls';
import { handleColor, handleUnitPoint, handleTypography, handleBorder } from 'gutenverse-core/styling';

export const panelItemStyle = props => {
    const {
        elementId,
        switcher,
        setSwitcher
    } = props;

    return [
        {
            id: 'typography',
            label: __('Typography', 'gutenverse'),
            component: TypographyControl,
            style: [
                {
                    selector: `.editor-styles-wrapper .${elementId} .gutenverse-share-item .gutenverse-share-text`,
                    hasChild: true,
                    render: (value,id) => handleTypography(value, props, id)
                }
            ],
        },
        {
            id: 'iconSize',
            label: __('Icon Size', 'gutenverse'),
            component: SizeControl,
            allowDeviceControl: true,
            units: {
                px: {
                    text: 'px',
                    min: 1,
                    max: 100,
                    step: 1
                },
                em: {
                    text: 'em',
                    min: 0.1,
                    max: 3,
                    step: 0.1
                },
            },
            style: [
                {
                    selector: `.editor-styles-wrapper .${elementId} .gutenverse-share-item i`,
                    render: value => `${handleUnitPoint(value, 'font-size')}; ${handleUnitPoint(value, 'width')};`
                }
            ]
        },
        {
            id: '__socialHover',
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
            onChange: ({__socialHover}) => setSwitcher({...switcher, socialHover: __socialHover})
        },
        {
            id: 'iconColor',
            show: !switcher.socialHover || switcher.socialHover === 'normal',
            label: __('Icon Color', 'gutenverse'),
            component: ColorControl,
            style: [
                {
                    selector: `.editor-styles-wrapper .${elementId} .gutenverse-share-item .gutenverse-share-icon i`,
                    render: value => handleColor(value, 'color')
                }
            ]
        },
        {
            id: 'iconBackgroundColor',
            show: !switcher.socialHover || switcher.socialHover === 'normal',
            label: __('Icon Background Color', 'gutenverse'),
            component: ColorControl,
            style: [
                {
                    selector: `.editor-styles-wrapper .${elementId} .gutenverse-share-item .gutenverse-share-icon`,
                    render: value => handleColor(value, 'background-color')
                }
            ]
        },
        {
            id: 'backgroundColor',
            show: !switcher.socialHover || switcher.socialHover === 'normal',
            label: __('Text Background Color', 'gutenverse'),
            component: ColorControl,
            style: [
                {
                    selector: `.editor-styles-wrapper .${elementId} .gutenverse-share-item .gutenverse-share-text`,
                    render: value => handleColor(value, 'background-color')
                }
            ]
        },
        {
            id: 'textColor',
            show: !switcher.socialHover || switcher.socialHover === 'normal',
            label: __('Text Color', 'gutenverse'),
            component: ColorControl,
            style: [
                {
                    selector: `.editor-styles-wrapper .${elementId} .gutenverse-share-item .gutenverse-share-text`,
                    render: value => handleColor(value, 'color')
                }
            ]
        },
        {
            id: 'borderType',
            show: !switcher.socialHover || switcher.socialHover === 'normal',
            label: __('Border Type', 'gutenverse'),
            component: BorderControl,
            style: [
                {
                    selector: `.editor-styles-wrapper .${elementId} .gutenverse-share-item`,
                    hasChild: true,
                    render: value => handleBorder(value)
                }
            ]
        },
        {
            id: 'iconColorHover',
            show: switcher.socialHover === 'hover',
            label: __('Icon Color', 'gutenverse'),
            component: ColorControl,
            style: [
                {
                    selector: `.editor-styles-wrapper .${elementId} .gutenverse-share-item:hover .gutenverse-share-icon i`,
                    render: value => handleColor(value, 'color')
                }
            ]
        },
        {
            id: 'iconBackgroundColorHover',
            show: switcher.socialHover === 'hover',
            label: __('Icon Background Color', 'gutenverse'),
            component: ColorControl,
            style: [
                {
                    selector: `.editor-styles-wrapper .${elementId} .gutenverse-share-item:hover .gutenverse-share-icon`,
                    render: value => handleColor(value, 'background-color')
                }
            ]
        },
        {
            id: 'backgroundColorHover',
            show: switcher.socialHover === 'hover',
            label: __('Text Background Color', 'gutenverse'),
            component: ColorControl,
            style: [
                {
                    selector: `.editor-styles-wrapper .${elementId} .gutenverse-share-item:hover .gutenverse-share-text`,
                    render: value => handleColor(value, 'background-color')
                }
            ]
        },
        {
            id: 'textColorHover',
            show: switcher.socialHover === 'hover',
            label: __('Text Color', 'gutenverse'),
            component: ColorControl,
            style: [
                {
                    selector: `.editor-styles-wrapper .${elementId} .gutenverse-share-item:hover .gutenverse-share-text`,
                    render: value => handleColor(value, 'color')
                }
            ]
        },
        {
            id: 'borderTypeHover',
            show: switcher.socialHover === 'hover',
            label: __('Border Type', 'gutenverse'),
            component: BorderControl,
            style: [
                {
                    selector: `.editor-styles-wrapper .${elementId} .gutenverse-share-item:hover`,
                    hasChild: true,
                    render: value => handleBorder(value)
                }
            ]
        },
    ];
};