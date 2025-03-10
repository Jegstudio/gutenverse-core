import { __ } from '@wordpress/i18n';
import { dividerPanel } from './panel-divider';
import { contentPanel } from './panel-content';
import { advancePanel, animationPanel, backgroundPanel, borderPanel, responsivePanel, positioningPanel, transformPanel, maskPanel, mouseMoveEffectPanel, conditionPanel } from 'gutenverse-core/controls';
import { advanceAnimationPanel } from 'gutenverse-core/controls';
import { TabSetting, TabStyle } from 'gutenverse-core/controls';

export const panelList = () => {
    return [
        {
            title: __('Divider General', 'gutenverse'),
            panelArray: dividerPanel,
            tabRole: TabStyle
        },
        {
            title: __('Divider Content', 'gutenverse'),
            initialOpen: false,
            panelArray: contentPanel,
            tabRole: TabStyle
        },
        {
            title: __('Background', 'gutenverse'),
            initialOpen: false,
            panelArray: (props) => backgroundPanel({
                ...props,
                styleId: 'divider-background',
                normalOptions: ['default', 'gradient'],
                hoverOptions: ['default', 'gradient']
            }),
            tabRole: TabStyle
        },
        {
            title: __('Border', 'gutenverse'),
            initialOpen: false,
            panelArray: (props) => borderPanel({
                ...props,
                styleId: 'divider-border'
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
            panelArray: (props) => positioningPanel({
                ...props,
                options: [
                    {
                        value: 'default',
                        label: 'Default'
                    },
                    {
                        value: 'full',
                        label: 'Full Width (100%)'
                    },
                    {
                        value: 'custom',
                        label: 'Custom'
                    }
                ]
            }),
            tabRole: TabSetting
        },
        {
            title: __('Animation Effects', 'gutenverse'),
            initialOpen: false,
            panelArray: (props) => animationPanel({
                ...props,
                styleId: 'divider-animation'
            }),
            tabRole: TabSetting
        },
        // {
        //     title: __('Transform', 'gutenverse'),
        //     initialOpen: false,
        //     panelArray: transformPanel,
        //     pro: true
        // },
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
                blockType: 'divider'
            }),
            pro: true
        },
        {
            title: __('Spacing', 'gutenverse'),
            initialOpen: false,
            panelArray: (props) => advancePanel({
                ...props,
                styleId: 'divider-advance',
            }),
            tabRole: TabSetting
        },
        // {
        //     title: __('Condition', 'gutenverse'),
        //     panelArray: conditionPanel,
        //     initialOpen: false,
        //     pro: true
        // },
    ];
};