import { __ } from '@wordpress/i18n';
import { advancePanel, animationPanel, backgroundPanel, borderPanel, conditionPanel, maskPanel, mouseMoveEffectPanel, positioningPanel, responsivePanel, transformPanel } from 'gutenverse-core/controls';
import { inputPanel } from './panel-input';
import { TabSetting, TabStyle } from 'gutenverse-core/controls';
import { contentPanel } from './panel-content';
import { closeIconPanel } from './panel-close-icon';
import { closeIconStylePanel } from './panel-close-icon-style';

export const panelList = () => {
    return [
        {
            title: __('Input Style', 'gutenverse'),
            panelArray: inputPanel,
            initialOpen: false,
            tabRole: TabStyle
        },
        {
            title: __('Search Setting', 'gutenverse'),
            panelArray: contentPanel,
            initialOpen: false,
            tabRole: TabSetting
        },
        /* TabStyle */
        {
            title: __('Close Icon Styling', 'gutenverse'),
            initialOpen: false,
            panelArray: closeIconStylePanel,
            tabRole: TabStyle
        },
        {
            title: __('Background', 'gutenverse'),
            initialOpen: false,
            panelArray: (props) => backgroundPanel({
                ...props,
                styleId: 'form-input-text-background',
                normalOptions: ['default', 'gradient'],
                hoverOptions: ['default', 'gradient'],
            }),
            tabRole: TabStyle
        },
        {
            title: __('Border', 'gutenverse'),
            initialOpen: false,
            panelArray: (props) => borderPanel({
                ...props,
                styleId: 'form-input-text-border',
            }),
            tabRole: TabStyle
        },
        {
            title: __('Masking', 'gutenverse'),
            initialOpen: false,
            panelArray: maskPanel,
            tabRole: TabStyle
        },
        /* TabSetting */
        {
            title: __('Close Icon', 'gutenverse'),
            initialOpen: false,
            panelArray: closeIconPanel,
            tabRole: TabSetting
        },
        {
            title: __('Display', 'gutenverse'),
            initialOpen: false,
            panelArray: responsivePanel,
            tabRole: TabSetting
        },
        {
            title: __('Positioning', 'gutenverse'),
            initialOpen: false,
            panelArray: positioningPanel,
            tabRole: TabSetting
        },
        {
            title: __('Animation Effects', 'gutenverse'),
            initialOpen: false,
            panelArray: (props) => animationPanel({
                ...props,
                styleId: 'form-input-text-animation'
            }),
            tabRole: TabSetting
        },
        {
            title: __('Spacing', 'gutenverse'),
            initialOpen: false,
            panelArray: (props) => advancePanel({
                ...props,
                styleId: 'form-input-text-advance',
            }),
            tabRole: TabSetting
        },
        /* Pro */
        {
            title: __('Transform', 'gutenverse'),
            initialOpen: false,
            panelArray: transformPanel,
            pro: true
        },
        {
            title: __('Mouse Move Effect', 'gutenverse'),
            initialOpen: false,
            panelArray: mouseMoveEffectPanel,
            tabRole: TabSetting,
            pro: true,
        },
        {
            title: __('Condition', 'gutenverse'),
            panelArray: conditionPanel,
            initialOpen: false,
            pro: true
        },
    ];
};