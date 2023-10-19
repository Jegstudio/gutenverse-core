import { __ } from '@wordpress/i18n';
import { advancePanel, animationPanel, borderPanel, positioningPanel, responsivePanel } from 'gutenverse-core/controls';
import { advanceAnimationPanel } from 'gutenverse-core/controls';
import { altPanel } from './panel-alt';
import { captionPanel } from './panel-caption';
import { imagePanel } from './panel-image';
import { TabSetting, TabStyle } from 'gutenverse-core/controls';

export const panelList = () => {
    return [
        {
            title: __('Image', 'gutenverse'),
            panelArray: imagePanel,
            tabRole: TabStyle
        },
        {
            title: __('Alt', 'gutenverse'),
            initialOpen: false,
            panelArray: altPanel,
            tabRole: TabSetting
        },
        {
            title: __('Caption', 'gutenverse'),
            initialOpen: false,
            panelArray: captionPanel,
            tabRole: TabSetting
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
            title: __('Animation Effects', 'gutenverse'),
            initialOpen: false,
            panelArray: (props) => animationPanel({
                ...props,
                styleId: 'heading-animation'
            }),
            tabRole: TabSetting
        },
        {
            title: __('Advanced Animation', 'gutenverse'),
            initialOpen: false,
            panelAdvance: true,
            panelArray: (props) => advanceAnimationPanel({
                ...props,
                blockType: 'image'
            }),
            pro: true
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
            title: __('Spacing', 'gutenverse'),
            initialOpen: false,
            panelArray: advancePanel,
            tabRole: TabSetting
        }
    ];
};