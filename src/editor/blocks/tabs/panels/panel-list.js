import { __ } from '@wordpress/i18n';
import { contentPanel } from './panel-content';
import { contentStyle } from './panel-style';
import { advancePanel, animationPanel, borderPanel, positioningPanel, responsivePanel } from 'gutenverse-core-editor/controls';
import { TabSetting, TabStyle } from 'gutenverse-core-editor/controls';

export const panelList = () => {
    return [
        {
            title: __('Content', 'gutenverse'),
            panelArray: contentPanel,
            initialOpen: true,
            tabRole: TabSetting
        },
        {
            title: __('Style', 'gutenverse'),
            panelArray: contentStyle,
            initialOpen: false,
            tabRole: TabStyle
        },
        {
            title: __('Border', 'gutenverse'),
            initialOpen: false,
            panelArray: (props) => borderPanel({
                ...props,
                styleId: 'tab-border'
            }),
            tabRole: TabStyle
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
                styleId: 'tab-animation'
            }),
            tabRole: TabSetting
        },
        {
            title: __('Spacing', 'gutenverse'),
            initialOpen: false,
            panelArray: (props) => advancePanel({
                ...props,
                styleId: 'tab-advance',
            }),
            tabRole: TabSetting
        }
    ];
};
