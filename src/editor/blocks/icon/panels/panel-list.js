import { __ } from '@wordpress/i18n';
import { advancePanel, animationPanel, backgroundPanel, borderPanel, positioningPanel, responsivePanel } from 'gutenverse-core/controls';
// import { advanceAnimationPanel } from 'gutenverse-core/controls';
import { contentColor } from './panel-color';
import { iconPanel } from './panel-icon';
import { TabSetting, TabStyle } from 'gutenverse-core/controls';

export const panelList = () => {
    return [
        {
            title: __('Icon', 'gutenverse'),
            panelArray: iconPanel,
            tabRole: TabStyle
        },
        {
            title: __('Icon Color', 'gutenverse'),
            initialOpen: false,
            panelArray: contentColor,
            tabRole: TabStyle
        },
        {
            title: __('Background', 'gutenverse'),
            initialOpen: false,
            panelArray: (props) => backgroundPanel({
                ...props,
                styleId: 'heading-background',
                normalOptions: [ 'default', 'gradient' ],
                hoverOptions: [ 'default', 'gradient' ]
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
            title: __('Animation Effects', 'gutenverse'),
            initialOpen: false,
            panelArray: (props) => animationPanel({
                ...props,
                styleId: 'heading-animation'
            }),
            tabRole: TabSetting
        },
        // {
        //     title: __('Advance Animation', 'gutenverse'),
        //     initialOpen: false,
        //     panelAdvance: true,
        //     panelArray: (props) => advanceAnimationPanel({
        //         ...props,
        //         blockType: 'icon'
        //     }),
        //     pro: true
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
            title: __('Spacing', 'gutenverse'),
            initialOpen: false,
            panelArray: advancePanel,
            tabRole: TabSetting
        }
    ];
};