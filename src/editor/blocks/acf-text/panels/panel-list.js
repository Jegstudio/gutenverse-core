/* WordPress dependencies */
import { __ } from '@wordpress/i18n';
import { advancePanel, animationPanel, backgroundPanel, borderPanel, conditionPanel, maskPanel, positioningPanel, responsivePanel, transformPanel, typographyPanel } from 'gutenverse-core/controls';
import { CheckboxControl, SelectControl, TextControl, ColorControl } from 'gutenverse-core/controls';
import { TabSetting, TabStyle } from 'gutenverse-core/controls';

export const settingPanel = (props) => {
    const { link } = props;

    return [
        {
            id: 'fieldKey',
            label: __('Field Key', 'gutenverse'),
            component: TextControl,
            description: __('Enter the ACF Field Name/Key here.', 'gutenverse'),
        },
        {
            id: 'htmlTag',
            label: __('HTML Tag', 'gutenverse'),
            component: SelectControl,
            options: [
                { label: __('P'), value: 'p' },
                { label: __('Span'), value: 'span' },
                { label: __('Div'), value: 'div' },
                { label: __('H1'), value: 'h1' },
                { label: __('H2'), value: 'h2' },
                { label: __('H3'), value: 'h3' },
                { label: __('H4'), value: 'h4' },
                { label: __('H5'), value: 'h5' },
                { label: __('H6'), value: 'h6' },
            ],
        },
        {
            id: 'placeholder',
            label: __('Placeholder', 'gutenverse'),
            component: TextControl,
            description: __('Shown in editor only for preview.', 'gutenverse'),
        },
        {
            id: 'link',
            label: __('Link to Field Value?', 'gutenverse'),
            component: CheckboxControl,
        },
        {
            id: 'linkTarget',
            show: !!link,
            label: __('Open in New Tab', 'gutenverse'),
            component: CheckboxControl,
        },
    ];
};

export const stylePanel = (props) => {
    return [
        {
            id: 'alignment',
            label: __('Alignment', 'gutenverse'),
            component: SelectControl,
            allowDeviceControl: true,
            options: [
                { label: __('Left'), value: 'left' },
                { label: __('Center'), value: 'center' },
                { label: __('Right'), value: 'right' },
            ],
        },
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
                styleId: 'acf-text-typography',
            }),
            tabRole: TabStyle,
        },
        {
            title: __('Background', 'gutenverse'),
            initialOpen: false,
            panelArray: (props) => backgroundPanel({
                ...props,
                styleId: 'acf-text-background',
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
                styleId: 'acf-text-border',
            }),
            tabRole: TabStyle,
        },
        {
            title: __('Masking', 'gutenverse'),
            initialOpen: false,
            panelArray: maskPanel,
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
                styleId: 'acf-text-animation',
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
                styleId: 'acf-text-advance',
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
