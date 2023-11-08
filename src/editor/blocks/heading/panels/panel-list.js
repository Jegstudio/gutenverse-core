/* WordPress dependencies */
import { __ } from '@wordpress/i18n';

/* Gutenverse dependencies */
import { advancePanel, animationPanel, backgroundPanel, borderPanel, positioningPanel, responsivePanel, advanceAnimationPanel, transformPanel, maskPanel, textClipPanel } from 'gutenverse-core/controls';

/* Local dependencies */
import { contentPanel } from './panel-content';
import { stylePanel } from './panel-style';
import { TabSetting, TabStyle } from 'gutenverse-core/controls';

export const panelList = () => {
    return [
        {
            title: __('Content', 'gutenverse'),
            panelArray: contentPanel,
            tabRole: TabSetting
        },
        {
            title: __('Style', 'gutenverse'),
            panelArray: stylePanel,
            initialOpen: false,
            tabRole: TabStyle
        },
        {
            title: __('Text Clip', 'gutenverse'),
            initialOpen: false,
            panelAdvance: true,
            panelArray: (props) => {
                const { elementId } = props;
                return textClipPanel({
                    ...props,
                    textClipSelector: `.${elementId}`,
                    textClipId: 'textClip'
                });
            },
            pro: true,
            tabRole: TabStyle
        },
        {
            title: __('Background', 'gutenverse'),
            initialOpen: false,
            panelArray: (props) => backgroundPanel({
                ...props,
                styleId: 'heading-background',
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
                styleId: 'heading-border'
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
                styleId: 'heading-animation'
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
            title: __('Advance Animation', 'gutenverse'),
            initialOpen: false,
            panelAdvance: true,
            panelArray: (props) => advanceAnimationPanel({
                ...props,
                blockType: 'heading'
            }),
            pro: true
        },
        {
            title: __('Spacing', 'gutenverse'),
            initialOpen: false,
            panelArray: (props) => advancePanel({
                ...props,
                styleId: 'heading-advance',
            }),
            tabRole: TabSetting
        }
    ];
};