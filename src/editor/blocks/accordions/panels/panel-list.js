import { __ } from '@wordpress/i18n';
import { panelIcon } from './panel-icon';
import { panelTitle } from './panel-title';
import { panelAccordion } from './panel-accordion';
import { panelBody } from './panel-body';
import { advanceAnimationPanel, advancePanel, animationPanel, backgroundPanel, borderPanel, conditionPanel, maskPanel, mouseMoveEffectPanel, positioningPanel, responsivePanel, transformPanel } from 'gutenverse-core/controls';
import { TabSetting, TabStyle } from 'gutenverse-core/controls';
import { panelIconStyle } from './panel-icon-style';

export const panelList = () => {
    return [
        {
            title: __('Icon Style', 'gutenverse'),
            panelArray: panelIconStyle,
            initialOpen: false,
            tabRole: TabStyle
        },
        {
            title: __('Accordion Item', 'gutenverse'),
            panelArray: panelAccordion,
            initialOpen: false,
            tabRole: TabStyle
        },
        {
            title: __('Icon', 'gutenverse'),
            panelArray: panelIcon,
            initialOpen: false,
        },
        {
            title: __('Title', 'gutenverse'),
            panelArray: panelTitle,
            initialOpen: false,
            tabRole: TabStyle
        },
        {
            title: __('Body', 'gutenverse'),
            panelArray: panelBody,
            initialOpen: false,
            tabRole: TabStyle
        },
        {
            title: __('Background', 'gutenverse'),
            initialOpen: false,
            panelArray: (props) => backgroundPanel({
                ...props,
                styleId: 'accordions-background',
                normalOptions: ['default', 'gradient'],
                hoverOptions: ['default', 'gradient']
            }),
            tabRole: TabStyle
        },
        {
            title: __('Border', 'gutenverse'),
            initialOpen: false,
            panelArray: borderPanel,
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
                selector: `.guten-accordions.${props.elementId}`
            }),
            tabRole: TabSetting
        },
        {
            title: __('Animation Effects', 'gutenverse'),
            initialOpen: false,
            panelArray: animationPanel,
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
                blockType: 'column'
            }),
            pro: true,
        },
        {
            title: __('Spacing', 'gutenverse'),
            initialOpen: false,
            panelArray: (props) => advancePanel({
                ...props,
                styleId: 'accordion-advance',
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
