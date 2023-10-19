import { __ } from '@wordpress/i18n';
import { advancePanel, animationPanel, backgroundPanel, borderPanel, positioningPanel, responsivePanel } from 'gutenverse-core/controls';
import { advanceAnimationPanel } from 'gutenverse-core/controls';
import { contentPanel } from './panel-content';
import { contentStylePanel } from './panel-content-style';
import { generalPanel } from './panel-general';
import { iconPanel } from './panel-icon';
import { iconStylePanel } from './panel-icon-style';
import { superPanel } from './panel-super';
import { TabSetting, TabStyle } from 'gutenverse-core/controls';

export const panelList = () => {
    return [
        {
            title: __('General', 'gutenverse'),
            panelArray: generalPanel,
            tabRole: TabSetting
        },
        {
            title: __('Icon', 'gutenverse'),
            initialOpen: false,
            panelArray: iconPanel,
            tabRole: TabSetting
        },
        {
            title: __('Content', 'gutenverse'),
            initialOpen: false,
            panelArray: contentPanel,
            tabRole: TabSetting
        },
        {
            title: __('Icon Styling', 'gutenverse'),
            initialOpen: false,
            panelArray: iconStylePanel,
            tabRole: TabStyle
        },
        {
            title: __('Content Styling', 'gutenverse'),
            initialOpen: false,
            panelArray: contentStylePanel,
            tabRole: TabStyle
        },
        {
            title: __('Super', 'gutenverse'),
            initialOpen: false,
            panelArray: superPanel,
            tabRole: TabStyle
        },
        {
            title: __('Background', 'gutenverse'),
            initialOpen: false,
            panelArray: (props) => backgroundPanel({
                ...props,
                styleId: 'fun-fact-background',
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
                styleId: 'fun-fact-border',
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
                styleId: 'fun-fact-animation'
            }),
            tabRole: TabSetting
        },
        {
            title: __('Advanced Animation', 'gutenverse'),
            initialOpen: false,
            panelAdvance: true,
            panelArray: (props) => advanceAnimationPanel({
                ...props,
                blockType: 'fun-fact'
            }),
            pro: true
        },
        {
            title: __('Spacing', 'gutenverse'),
            initialOpen: false,
            panelArray: (props) => advancePanel({
                ...props,
                styleId: 'fun-fact-advance',
            }),
            tabRole: TabSetting
        }
    ];
};