import { __ } from '@wordpress/i18n';
import { advancePanel, animationPanel, backgroundAnimatedPanel, backgroundOverlayPanel, backgroundPanel, borderPanel, cursorEffectPanel, maskPanel, transformPanel } from 'gutenverse-core/controls';
import { advanceAnimationPanel } from 'gutenverse-core/controls';
import { TabSetting, TabStyle } from 'gutenverse-core/controls';
import { blurPanel } from './panel-blur';
import { displayPanel } from './panel-display';
import { positionPanel } from './panel-position';

export const panelList = () => {
    return [
        {
            title: __('Cursor Effect', '--gctd--'),
            initialOpen: false,
            panelArray: cursorEffectPanel,
            tabRole: TabSetting,
            pro: true,
        },
        {
            title: __('Display', '--gctd--'),
            initialOpen: false,
            panelArray: displayPanel,
            tabRole: TabSetting
        },
        {
            title: __('Position', '--gctd--'),
            initialOpen: false,
            panelArray: positionPanel,
            tabRole: TabSetting
        },
        {
            title: __('Background', '--gctd--'),
            initialOpen: false,
            panelArray: (props) => backgroundPanel({
                ...props,
                blockType: 'wrapper',
                styleId: 'wrapper-background',
                normalOptions: ['default', 'gradient', 'video'],
                hoverOptions: ['default', 'gradient'],
                normalSelector: `.${props.elementId}:not(.background-animated), .${props.elementId}.background-animated > .guten-inner-wrap > .guten-background-animated .animated-layer`,
                hoverSelector: `.${props.elementId}:not(.background-animated):hover, .${props.elementId}.background-animated:hover > .guten-inner-wrap > .guten-background-animated .animated-layer`
            }),
            tabRole: TabStyle
        },
        {
            title: __('Background Overlay', '--gctd--'),
            initialOpen: false,
            panelArray: (props) => backgroundOverlayPanel({
                ...props,
                styleId: 'wrapper-background-overlay',
                normalOptions: ['default', 'gradient'],
                hoverOptions: ['default', 'gradient']
            }),
            tabRole: TabStyle
        },
        {
            title: __('Blur', '--gctd--'),
            initialOpen: false,
            panelArray: blurPanel,
            tabRole: TabStyle
        },
        {
            title: __('Border', '--gctd--'),
            initialOpen: false,
            panelArray: (props) => borderPanel({
                ...props,
                styleId: 'wrapper-border'
            }),
            tabRole: TabStyle
        },
        {
            title: __('Masking', '--gctd--'),
            initialOpen: false,
            panelArray: maskPanel,
            tabRole: TabStyle
        },
        {
            title: __('Animation Effects', '--gctd--'),
            initialOpen: false,
            panelArray: (props) => animationPanel({
                ...props,
                styleId: 'wrapper'
            }),
            tabRole: TabSetting
        },
        {
            title: __('Transform', '--gctd--'),
            initialOpen: false,
            panelArray: transformPanel,
            tabRole: TabSetting,
            pro: true,
        },
        {
            title: __('Background Animation', '--gctd--'),
            initialOpen: false,
            panelArray: backgroundAnimatedPanel,
            pro: true,
        },
        {
            title: __('Advanced Animation', '--gctd--'),
            initialOpen: false,
            panelAdvance: true,
            panelArray: (props) => advanceAnimationPanel({
                ...props,
                blockType: 'wrapper'
            }),
            pro: true,
        },
        {
            title: __('Spacing', '--gctd--'),
            initialOpen: false,
            panelArray: (props) => advancePanel({
                ...props,
                styleId: 'wrapper-advance',
            }),
            tabRole: TabSetting
        }
    ];
};