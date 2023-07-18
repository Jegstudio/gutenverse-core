import { __ } from '@wordpress/i18n';
import { advancePanel, animationPanel, backgroundPanel, borderPanel, positioningPanel, responsivePanel } from 'gutenverse-core/controls';
import { teamPanel } from './panel-team';
import { namePanel } from './panel-name';
import { jobPanel } from './panel-job';
import { descPanel } from './panel-desc';
import { contentPanel } from './panel-content';
import { imagePanel } from './panel-image';
import { profileBackgroundPanel } from './panel-profile-background';
import { profileBorderPanel } from './panel-profile-border';
import { imageBorderPanel } from './panel-image-border';
import { overlayPanel } from './panel-content-overlay';
import { hoverPanel } from './panel-content-hover';
import { TabSetting, TabStyle } from 'gutenverse-core/controls';

export const panelList = () => {
    return [
        {
            title: __('Team Details', 'gutenverse'),
            panelArray: teamPanel,
            tabRole: TabSetting
        },
        {
            title: __('Content', 'gutenverse'),
            initialOpen: false,
            panelArray: contentPanel,
            tabRole: TabStyle
        },
        {
            title: __('Image', 'gutenverse'),
            initialOpen: false,
            panelArray: imagePanel,
            tabRole: TabStyle
        },
        {
            title: __('Overlay Profile', 'gutenverse'),
            initialOpen: false,
            panelArray: overlayPanel,
            tabRole: TabStyle
        },
        {
            title: __('Name Typography', 'gutenverse'),
            initialOpen: false,
            panelArray: namePanel,
            tabRole: TabStyle
        },
        {
            title: __('Job Typography', 'gutenverse'),
            initialOpen: false,
            panelArray: jobPanel,
            tabRole: TabStyle
        },
        {
            title: __('Description Typography', 'gutenverse'),
            initialOpen: false,
            panelArray: descPanel,
            tabRole: TabStyle
        },
        {
            title: __('Social Hover', 'gutenverse'),
            initialOpen: false,
            panelArray: hoverPanel,
            tabRole: TabStyle
        },
        {
            title: __('Profile Background', 'gutenverse'),
            initialOpen: false,
            panelArray: (props) => profileBackgroundPanel({
                ...props,
                styleId: 'team-profile-background',
                normalOptions: [ 'default', 'gradient' ],
                hoverOptions: [ 'default', 'gradient' ],
            }),
            tabRole: TabStyle
        },
        {
            title: __('Profile Border', 'gutenverse'),
            initialOpen: false,
            panelArray: (props) => profileBorderPanel({
                ...props,
                styleId: 'team-profile-border',
            }),
            tabRole: TabStyle
        },
        {
            title: __('Image Border', 'gutenverse'),
            initialOpen: false,
            panelArray: (props) => imageBorderPanel({
                ...props,
                styleId: 'team-image-border',
            }),
            tabRole: TabStyle
        },
        {
            title: __('Background', 'gutenverse'),
            initialOpen: false,
            panelArray: (props) => backgroundPanel({
                ...props,
                styleId: 'team-background',
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
                styleId: 'team-border',
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
                styleId: 'team-animation'
            }),
            tabRole: TabSetting
        },
        // {
        //     title: __('Advance Animation', 'gutenverse'),
        //     initialOpen: false,
        //     panelAdvance: true,
        //     panelArray: (props) => advanceAnimationPanel({
        //         ...props,
        //         blockType: 'team'
        //     }),
        //     pro: true
        // },
        {
            title: __('Spacing', 'gutenverse'),
            initialOpen: false,
            panelArray: (props) => advancePanel({
                ...props,
                styleId: 'team-advance',
            }),
            tabRole: TabSetting
        }
    ];
};