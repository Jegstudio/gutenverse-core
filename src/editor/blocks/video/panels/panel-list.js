import { __ } from '@wordpress/i18n';
import { advancePanel, animationPanel, backgroundPanel, borderPanel, positioningPanel, responsivePanel } from 'gutenverse-core-editor/controls';
// import { advanceAnimationPanel } from 'gutenverse-core-editor/controls';
import { videoPanel } from './panel-video';
import { TabSetting, TabStyle } from 'gutenverse-core-editor/controls';

export const panelList = () => {
    return [
        {
            title: __('Video', 'gutenverse'),
            panelArray: videoPanel,
            tabRole: TabSetting
        },
        {
            title: __('Background', 'gutenverse'),
            initialOpen: false,
            panelArray: (props) => backgroundPanel({
                ...props,
                styleId: 'video-background',
                normalOptions: [ 'default', 'gradient' ],
                hoverOptions: [ 'default', 'gradient' ],
            }),
            tabRole: TabStyle
        },
        {
            title: __('Border', 'gutenverse'),
            initialOpen: false,
            panelArray: (props) => borderPanel({
                ...props,
                styleId: 'video-border',
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
                styleId: 'video-animation'
            }),
            tabRole: TabSetting
        },
        // {
        //     title: __('Advance Animation', 'gutenverse'),
        //     initialOpen: false,
        //     panelAdvance: true,
        //     panelArray: (props) => advanceAnimationPanel({
        //         ...props,
        //         blockType: 'video'
        //     }),
        //     pro: true
        // },
        {
            title: __('Spacing', 'gutenverse'),
            initialOpen: false,
            panelArray: (props) => advancePanel({
                ...props,
                styleId: 'video-advance',
            }),
            tabRole: TabSetting
        }
    ];
};