import { __ } from '@wordpress/i18n';
import { advancePanel, animationPanel, backgroundPanel, borderPanel, childStylePanel, conditionPanel, dynamicContentPanel, maskPanel, mouseMoveEffectPanel, positioningPanel, responsivePanel, transformPanel } from 'gutenverse-core/controls';
import { advanceAnimationPanel } from 'gutenverse-core/controls';
import { panelBadgeStyle } from './panel-badge-style';
import { panelContentStyle } from './panel-content-style';
import { panelGeneral } from './panel-general';
import { panelIcon } from './panel-icon';
import { panelIconBoxContainer } from './panel-icon-box';
import { panelIconStyle } from './panel-icon-style';
import { panelOverlay } from './panel-overlay';
import { TabSetting, TabStyle } from 'gutenverse-core/controls';
import { globalDynamicPanel } from './panel-dynamic-content';

export const panelList = () => {
    return [
        //tab setting
        {
            title: __('General', 'gutenverse'),
            panelArray: panelGeneral,
            tabRole: TabSetting
        },
        {
            title: __('Icon', 'gutenverse'),
            initialOpen: false,
            panelArray: panelIcon,
            tabRole: TabSetting
        },
        // {
        //     title: __('Dynamic Global Url', 'gutenverse'),
        //     panelArray: globalDynamicPanel,
        //     initialOpen: false,
        //     tabRole: TabSetting,
        //     pro: true,
        // },
        // {
        //     title: __('Dynamic Data', 'gutenverse'),
        //     panelArray: (props) => {
        //         return dynamicContentPanel({
        //             ...props,
        //             blockType: 'text',
        //             multiText : true,
        //             arrOfTextChilds : ['titleDynamicList', 'descriptionDynamicList', 'badgeDynamicList']
        //         });
        //     },
        //     initialOpen: false,
        //     tabRole: TabSetting,
        //     pro: true,
        // },
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
                styleId: 'icon-box-animation'
            }),
            tabRole: TabSetting
        },
        {
            title: __('Transform', 'gutenverse'),
            initialOpen: false,
            panelArray: transformPanel,
            pro: true
        },
        // {
        //     title: __('Mouse Move Effect', 'gutenverse'),
        //     initialOpen: false,
        //     panelArray: mouseMoveEffectPanel,
        //     tabRole: TabSetting,
        //     pro: true,
        // },
        {
            title: __('Advanced Animation', 'gutenverse'),
            initialOpen: false,
            panelAdvance: true,
            panelArray: (props) => advanceAnimationPanel({
                ...props,
                blockType: 'icon-box'
            }),
            pro: true
        },
        {
            title: __('Spacing', 'gutenverse'),
            initialOpen: false,
            panelArray: (props) => advancePanel({
                ...props,
                styleId: 'icon-box-advance',
            }),
            tabRole: TabSetting
        },
        // {
        //     title: __('Condition', 'gutenverse'),
        //     panelArray: conditionPanel,
        //     initialOpen: false,
        //     pro: true
        // },

        //tab style
        {
            title: __('Container Style', 'gutenverse'),
            initialOpen: false,
            panelArray: panelIconBoxContainer,
            tabRole: TabStyle
        },
        // {
        //     title: __('Highlight Style', 'gutenverse'),
        //     panelArray: (props) => childStylePanel({
        //         ...props,
        //         arrOfTextChilds : ['titleChilds','descriptionChilds','badgeChilds']
        //     }),
        //     tabRole: TabStyle,
        //     pro: true
        // },
        {
            title: __('Icon Style', 'gutenverse'),
            initialOpen: false,
            panelArray: panelIconStyle,
            tabRole: TabStyle
        },
        {
            title: __('Content Style', 'gutenverse'),
            initialOpen: false,
            panelArray: panelContentStyle,
            tabRole: TabStyle
        },
        {
            title: __('Badge Style', 'gutenverse'),
            initialOpen: false,
            panelArray: panelBadgeStyle,
            tabRole: TabStyle
        },
        {
            title: __('Background Overlay', 'gutenverse'),
            initialOpen: false,
            panelArray: panelOverlay,
            tabRole: TabStyle
        },
        {
            title: __('Background', 'gutenverse'),
            initialOpen: false,
            panelArray: (props) => backgroundPanel({
                ...props,
                styleId: 'icon-box-background',
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
                styleId: 'icon-box-border',
            }),
            tabRole: TabStyle
        },
        {
            title: __('Masking', 'gutenverse'),
            initialOpen: false,
            panelArray: maskPanel,
            tabRole: TabStyle
        },
    ];
};