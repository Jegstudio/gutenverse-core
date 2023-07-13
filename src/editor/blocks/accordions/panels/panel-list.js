import { __ } from '@wordpress/i18n';
import { panelIcon } from './panel-icon';
import { panelTitle } from './panel-title';
import { panelAccordion } from './panel-accordion';
import { panelBody } from './panel-body';
import { advancePanel, animationPanel, backgroundPanel, borderPanel, positioningPanel, responsivePanel } from 'gutenverse-core-editor/controls';
import { TabSetting, TabStyle } from 'gutenverse-core-editor/controls';

export const panelList = () => {
    return [
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
            tabRole: TabStyle
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
                normalOptions: [ 'default', 'gradient' ],
                hoverOptions: [ 'default', 'gradient' ]
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
            panelArray: animationPanel,
            tabRole: TabSetting
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
    ];
};
