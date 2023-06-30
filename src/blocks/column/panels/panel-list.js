import { __ } from '@wordpress/i18n';
import { layoutPanel } from './panel-layout';
import { advancePanel, animationPanel, backgroundPanel, backgroundOverlayPanel, borderPanel, responsivePanel, typographyPanel } from 'gutenverse-core/controls';
import { stickyPanel } from './panel-sticky';
import { TabSetting, TabStyle } from 'gutenverse-core/controls';

export const panelList = () => {
    return [
        {
            title: __('Layouts', 'gutenverse'),
            panelArray: layoutPanel,
            tabRole: TabSetting
        },
        {
            title: __('Sticky', 'gutenverse'),
            panelArray: stickyPanel,
            pro: true
        },
        {
            title: __('Background', 'gutenverse'),
            initialOpen: false,
            panelArray: (props) => backgroundPanel({
                ...props,
                blockType: 'column',
                styleId: 'column-background',
                normalOptions: [ 'default', 'gradient' ],
                hoverOptions: [ 'default', 'gradient' ],
                normalSelector: `.editor-styles-wrapper .is-root-container .${props.elementId} > .guten-column-resizeable > .sticky-wrapper > .guten-column-wrapper`,
                hoverSelector: `.editor-styles-wrapper .is-root-container .${props.elementId} > .guten-column-resizeable > .sticky-wrapper > .guten-column-wrapper:hover`
            }),
            tabRole: TabStyle
        },
        {
            title: __('Background Overlay', 'gutenverse'),
            initialOpen: false,
            panelArray: (props) => backgroundOverlayPanel({
                ...props,
                styleId: 'column-background-overlay',
                normalOptions: [ 'default', 'gradient' ],
                hoverOptions: [ 'default', 'gradient' ],
                normalSelector: `.editor-styles-wrapper .is-root-container .${props.elementId} > .guten-column-resizeable > .sticky-wrapper > .guten-column-wrapper:before`,
                hoverSelector: `.editor-styles-wrapper .is-root-container .${props.elementId}:hover > .guten-column-resizeable > .sticky-wrapper > .guten-column-wrapper:before`
            }),
            tabRole: TabStyle
        },
        {
            title: __('Border', 'gutenverse'),
            initialOpen: false,
            panelArray: (props) => borderPanel({
                ...props,
                styleId: 'column-border',
                selector: `.editor-styles-wrapper .is-root-container .${props.elementId} > .guten-column-resizeable > .sticky-wrapper > .guten-column-wrapper`,
            }),
            tabRole: TabStyle
        },
        {
            title: __('Typography', 'gutenverse'),
            initialOpen: false,
            panelArray: (props) => typographyPanel({
                ...props,
                styleId: 'column-typography'
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
            title: __('Animation Effects', 'gutenverse'),
            initialOpen: false,
            panelArray: (props) => animationPanel({
                ...props,
                styleId: 'column-animation'
            }),
            tabRole: TabSetting
        },
        {
            title: __('Spacing', 'gutenverse'),
            initialOpen: false,
            panelArray: (props) => advancePanel({
                ...props,
                styleId: 'column-advance',
                selector: `.editor-styles-wrapper .is-root-container .${props.elementId} > .guten-column-resizeable > .sticky-wrapper > .guten-column-wrapper`
            }),
            tabRole: TabSetting
        }
    ];
};