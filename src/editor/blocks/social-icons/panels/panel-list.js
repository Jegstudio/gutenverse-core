import { __ } from '@wordpress/i18n';
import { contentPanel } from './panel-content';
import { contentColor } from './panel-color';
import { contentSpace } from './panel-space';
import { advanceAnimationPanel, advancePanel, animationPanel, backgroundPanel, borderPanel, maskPanel, mouseMoveEffectPanel, positioningPanel, responsivePanel, transformPanel } from 'gutenverse-core/controls';
import { iconBorderPanel } from './panel-icon-border';
import { TabSetting, TabStyle } from 'gutenverse-core/controls';

export const panelList = () => {
    return [
        {
            title: __('Style', 'gutenverse'),
            panelArray: contentPanel,
            initialOpen: true,
            tabRole: TabStyle
        },
        {
            title: __('Color', 'gutenverse'),
            panelArray: contentColor,
            initialOpen: false,
            tabRole: TabStyle
        },
        {
            title: __('Icon Spacing', 'gutenverse'),
            panelArray: contentSpace,
            initialOpen: false,
            tabRole: TabStyle
        },
        {
            title: __('Icon Border', 'gutenverse'),
            initialOpen: false,
            panelArray: iconBorderPanel,
            tabRole: TabStyle
        },
        {
            title: __('Background', 'gutenverse'),
            initialOpen: false,
            panelArray: (props) => backgroundPanel({
                ...props,
                styleId: 'social-icons',
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
                styleId: 'social-icons-border'
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
                selector: `.${props.elementId}.guten-element, .${props.elementId}.guten-element.horizontal > div`
            }),
            tabRole: TabSetting
        },
        {
            title: __('Animation Effects', 'gutenverse'),
            initialOpen: false,
            panelArray: (props) => animationPanel({
                ...props,
                styleId: 'social-icons-animation'
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
                blockType: 'social-icons'
            }),
            pro: true
        },
        {
            title: __('Spacing', 'gutenverse'),
            initialOpen: false,
            panelArray: (props) => advancePanel({
                ...props,
                styleId: 'social-icons-advance',
            }),
            tabRole: TabSetting
        }
    ];
};