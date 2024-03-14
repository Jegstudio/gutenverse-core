import { __ } from '@wordpress/i18n';
import { advancePanel, animationPanel, backgroundPanel, borderPanel, conditionPanel, maskPanel, mouseMoveEffectPanel, positioningPanel, responsivePanel, transformPanel } from 'gutenverse-core/controls';
import { arrowPanel } from './panel-arrow';
import { panelContent } from './panel-content';
import { itemPanel } from './panel-item';
import { dotsPanel } from './panel-dots';
import { panelContentStyle } from './panel-content-style';
import { panelContentTypography } from './panel-content-typography';
import { panelImage } from './panel-image';
import { sliderPanel } from 'gutenverse-core/controls';
import { TabSetting, TabStyle } from 'gutenverse-core/controls';
import { panelRatingStyle } from './panel-rating-style';

export const panelList = () => {
    return [
        {
            title: __('Content Setting', 'gutenverse'),
            panelArray: panelContent,
            tabRole: TabSetting
        },
        {
            title: __('Slider Setting', 'gutenverse'),
            panelArray: sliderPanel,
            tabRole: TabSetting
        },
        {
            title: __('Testimonial Item', 'gutenverse'),
            initialOpen: false,
            panelArray: itemPanel,
            tabRole: TabSetting
        },
        {
            title: __('Content Style', 'gutenverse'),
            initialOpen: false,
            panelArray: panelContentStyle,
            tabRole: TabStyle
        },
        {
            title: __('Content Typography', 'gutenverse'),
            initialOpen: false,
            panelArray: panelContentTypography,
            tabRole: TabStyle
        },
        {
            title: __('Client Image', 'gutenverse'),
            initialOpen: false,
            panelArray: panelImage,
            tabRole: TabStyle
        },
        {
            title: __('Rating Style', 'gutenverse'),
            initialOpen: false,
            panelArray: panelRatingStyle,
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
                styleId: 'testimonials-background',
                normalOptions: ['default', 'gradient'],
                hoverOptions: ['default', 'gradient'],
            }),
            tabRole: TabStyle
        },
        {
            title: __('Border', 'gutenverse'),
            initialOpen: false,
            panelArray: (props) => borderPanel({
                ...props,
                styleId: 'testimonials-border',
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
                styleId: 'testimonials-animation'
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
            title: __('Spacing', 'gutenverse'),
            initialOpen: false,
            panelArray: (props) => advancePanel({
                ...props,
                styleId: 'testimonials-advance',
            }),
            tabRole: TabSetting
        },
        {
            title: __('Condition', 'gutenverse'),
            panelArray: conditionPanel,
            initialOpen: false,
            pro: true
        },
    ];
};