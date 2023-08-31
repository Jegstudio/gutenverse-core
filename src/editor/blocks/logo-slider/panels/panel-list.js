import { __ } from '@wordpress/i18n';
import { advancePanel, animationPanel, backgroundPanel, borderPanel, positioningPanel, responsivePanel } from 'gutenverse-core/controls';
import { dotsPanel } from './panel-dots';
import { arrowPanel } from './panel-arrow';
import { logosPanel } from './panel-logos';
import { logosStylePanel } from './panel-logos-style';
import { sliderPanel } from 'gutenverse-core/controls';
import { TabSetting, TabStyle } from 'gutenverse-core/controls';

export const panelList = () => {
    return [
        {
            title: __('Slider Setting', 'gutenverse'),
            panelArray: sliderPanel,
            tabRole: TabSetting
        },
        {
            title: __('Logo List', 'gutenverse'),
            initialOpen: false,
            panelArray: logosPanel,
            tabRole: TabSetting
        },
        {
            title: __('Logo Style', 'gutenverse'),
            initialOpen: false,
            panelArray: logosStylePanel,
            tabRole: TabStyle
        },
        {
            title: __('Navigation Arrow', 'gutenverse'),
            initialOpen: false,
            panelArray: arrowPanel,
            tabRole: TabStyle
        },
        {
            title: __('Navigation Dots', 'gutenverse'),
            initialOpen: false,
            panelArray: dotsPanel,
            tabRole: TabStyle
        },
        {
            title: __('Background', 'gutenverse'),
            initialOpen: false,
            panelArray: (props) => backgroundPanel({
                ...props,
                styleId: 'client-logo-background',
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
                styleId: 'client-logo-border',
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
                styleId: 'client-logo-animation'
            }),
            tabRole: TabSetting
        },
        {
            title: __('Spacing', 'gutenverse'),
            initialOpen: false,
            panelArray: (props) => advancePanel({
                ...props,
                styleId: 'client-logo-advance',
            }),
            tabRole: TabSetting
        }
    ];
};