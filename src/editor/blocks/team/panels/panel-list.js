import { __ } from '@wordpress/i18n';
import { advanceAnimationPanel, advancePanel, animationPanel, backgroundPanel, borderPanel, childStylePanel, conditionPanel, dynamicContentPanel, maskPanel, mouseMoveEffectPanel, positioningPanel, responsivePanel, transformPanel } from 'gutenverse-core/controls';
import { teamPanel } from './panel-team';
import { namePanel } from './panel-name';
import { jobPanel } from './panel-job';
import { descPanel } from './panel-desc';
import { contentPanel } from './panel-content';
import { imagePanel } from './panel-image';
import { hoverPanel } from './panel-content-hover';
import { TabSetting, TabStyle } from 'gutenverse-core/controls';

export const panelList = () => {
    return [
        {
            title: __('Team Details', 'gutenverse'),
            panelArray: teamPanel,
            tabRole: TabSetting
        },
        {
            title: __('Dynamic Data', 'gutenverse'),
            panelArray: (props) => {
                return dynamicContentPanel({
                    ...props,
                    blockType: 'text',
                    arrOfTextChilds : ['nameDynamicList','jobDynamicList','descriptionDynamicList']
                });
            },
            initialOpen: false,
            tabRole: TabSetting,
            pro: true,
        },
        {
            title: __('Content', 'gutenverse'),
            initialOpen: false,
            panelArray: contentPanel,
            tabRole: TabStyle
        },
        {
            title: __('Highlight Style', 'gutenverse'),
            panelArray: (props) => childStylePanel({
                ...props,
                arrOfTextChilds : ['nameChilds','jobChilds','descriptionChilds']
            }),
            tabRole: TabStyle,
            pro: true
        },
        {
            title: __('Image', 'gutenverse'),
            initialOpen: false,
            panelArray: imagePanel,
            tabRole: TabStyle
        },
        {
            title: __('Name Typography', 'gutenverse'),
            initialOpen: false,
            panelArray: namePanel,
            tabRole: TabStyle
        },
        {
            title: __('Job Typography', 'gutenverse'),
            initialOpen: false,
            panelArray: jobPanel,
            tabRole: TabStyle
        },
        {
            title: __('Description Typography', 'gutenverse'),
            initialOpen: false,
            panelArray: descPanel,
            tabRole: TabStyle
        },
        {
            title: __('Social Hover', 'gutenverse'),
            initialOpen: false,
            panelArray: hoverPanel,
            tabRole: TabStyle
        },
        {
            title: __('Background', 'gutenverse'),
            initialOpen: false,
            panelArray: (props) => backgroundPanel({
                ...props,
                styleId: 'team-background',
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
                styleId: 'team-border',
            }),
            tabRole: TabStyle
        },
        {
            title: __('Masking', 'gutenverse'),
            initialOpen: false,
            panelArray: maskPanel,
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
                styleId: 'team-animation'
            }),
            tabRole: TabSetting
        },
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
            title: __('Advanced Animation', 'gutenverse'),
            initialOpen: false,
            panelAdvance: true,
            panelArray: (props) => advanceAnimationPanel({
                ...props,
                blockType: 'team'
            }),
            pro: true
        },
        {
            title: __('Spacing', 'gutenverse'),
            initialOpen: false,
            panelArray: (props) => advancePanel({
                ...props,
                styleId: 'team-advance',
            }),
            tabRole: TabSetting
        },
        {
            title: __('Condition', 'gutenverse'),
            panelArray: conditionPanel,
            initialOpen: false,
            pro: true
        },
    ];
};