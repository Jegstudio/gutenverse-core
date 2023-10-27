import { __ } from '@wordpress/i18n';
import { advancePanel, animationPanel, backgroundPanel, borderPanel, positioningPanel, responsivePanel, transformPanel } from 'gutenverse-core/controls';
import { buttonsPanel } from './panel-buttons';
import { TabSetting, TabStyle } from 'gutenverse-core/controls';

export const panelList = () => {
    return [
        {
            title: __('Buttons', 'gutenverse'),
            panelArray: buttonsPanel,
            tabRole: TabSetting
        },
        {
            title: __('Background', 'gutenverse'),
            initialOpen: false,
            panelArray: (props) => backgroundPanel({
                ...props,
                styleId: 'buttons-background',
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
                styleId: 'buttons-border',
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
            title: __('Transform', 'gutenverse'),
            initialOpen: false,
            panelArray: transformPanel,
            pro: true
        },
        {
            title: __('Animation Effects', 'gutenverse'),
            initialOpen: false,
            panelArray: (props) => animationPanel({
                ...props,
                styleId: 'buttons-animation'
            }),
            tabRole: TabSetting
        },
        {
            title: __('Spacing', 'gutenverse'),
            initialOpen: false,
            panelArray: (props) => advancePanel({
                ...props,
                styleId: 'buttons-advance',
            }),
            tabRole: TabSetting
        }
    ];
};