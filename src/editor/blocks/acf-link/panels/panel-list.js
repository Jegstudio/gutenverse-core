/* WordPress dependencies */
import { __ } from '@wordpress/i18n';
import { advancePanel, animationPanel, backgroundPanel, borderPanel, conditionPanel, maskPanel, positioningPanel, responsivePanel, transformPanel, typographyPanel } from 'gutenverse-core/controls';
import { TextControl, ColorControl, CheckboxControl } from 'gutenverse-core/controls';
import { TabSetting, TabStyle } from 'gutenverse-core/controls';

export const settingPanel = () => {
    return [
        {
            id: 'fieldKey',
            label: __('Field Key', 'gutenverse'),
            component: TextControl,
            description: __('Enter the ACF Link/URL Field Name/Key here.', 'gutenverse'),
        },
        {
            id: 'label',
            label: __('Label', 'gutenverse'),
            component: TextControl,
            description: __('Button text if ACF field is just a URL.', 'gutenverse'),
        },
        {
            id: 'linkTarget',
            label: __('Open in New Tab', 'gutenverse'),
            component: CheckboxControl,
        },
    ];
};

export const stylePanel = () => {
    return [
        {
            id: 'color',
            label: __('Text Color', 'gutenverse'),
            component: ColorControl,
        },
        {
            id: 'colorHover',
            label: __('Text Color Hover', 'gutenverse'),
            component: ColorControl,
        },
    ];
};

export const panelList = () => {
    return [
        {
            title: __('Setting', 'gutenverse'),
            panelArray: settingPanel,
            tabRole: TabSetting,
            initialOpen: true,
        },
        {
            title: __('Style', 'gutenverse'),
            panelArray: stylePanel,
            tabRole: TabStyle,
        },
        {
            title: __('Typography', 'gutenverse'),
            initialOpen: false,
            panelArray: (props) => typographyPanel({
                ...props,
                styleId: 'acf-link-typography',
            }),
            tabRole: TabStyle,
        },
        {
            title: __('Background', 'gutenverse'),
            initialOpen: false,
            panelArray: (props) => backgroundPanel({
                ...props,
                styleId: 'acf-link-background',
                normalOptions: ['default', 'gradient'],
                hoverOptions: ['default', 'gradient'],
            }),
            tabRole: TabStyle,
        },
        {
            title: __('Border', 'gutenverse'),
            initialOpen: false,
            panelArray: (props) => borderPanel({
                ...props,
                styleId: 'acf-link-border',
            }),
            tabRole: TabStyle,
        },
        {
            title: __('Display', 'gutenverse'),
            initialOpen: false,
            panelArray: responsivePanel,
            tabRole: TabSetting,
        },
        {
            title: __('Positioning', 'gutenverse'),
            initialOpen: false,
            panelArray: positioningPanel,
            tabRole: TabSetting,
        },
        {
            title: __('Animation Effects', 'gutenverse'),
            initialOpen: false,
            panelArray: (props) => animationPanel({
                ...props,
                styleId: 'acf-link-animation',
            }),
            tabRole: TabSetting,
        },
        {
            title: __('Transform', 'gutenverse'),
            initialOpen: false,
            panelArray: transformPanel,
            pro: true,
        },
        {
            title: __('Spacing', 'gutenverse'),
            initialOpen: false,
            panelArray: (props) => advancePanel({
                ...props,
                styleId: 'acf-link-advance',
            }),
            tabRole: TabSetting,
        },
        {
            title: __('Condition', 'gutenverse'),
            panelArray: conditionPanel,
            initialOpen: false,
            pro: true,
        },
    ];
};
