import { __ } from '@wordpress/i18n';
import { layoutPanel } from './panel-layout';
import { advancePanel, animationPanel, backgroundPanel, backgroundOverlayPanel, borderPanel, responsivePanel, typographyPanel } from 'gutenverse-core/controls';
import { stickyPanel } from './panel-sticky';
import { TabSetting, TabStyle } from 'gutenverse-core/controls';

export const panelList = () => {
    return [
        {
            title: __('Layouts', '--gctd--'),
            panelArray: layoutPanel,
            tabRole: TabSetting
        },
        {
            title: __('Sticky', '--gctd--'),
            panelArray: stickyPanel,
            pro: true
        },
        {
            title: __('Background', '--gctd--'),
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
            title: __('Background Overlay', '--gctd--'),
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
            title: __('Border', '--gctd--'),
            initialOpen: false,
            panelArray: (props) => borderPanel({
                ...props,
                styleId: 'column-border',
                selector: `.editor-styles-wrapper .is-root-container .${props.elementId} > .guten-column-resizeable > .sticky-wrapper > .guten-column-wrapper`,
            }),
            tabRole: TabStyle
        },
        {
            title: __('Typography', '--gctd--'),
            initialOpen: false,
            panelArray: (props) => typographyPanel({
                ...props,
                styleId: 'column-typography'
            }),
            tabRole: TabStyle
        },
        {
            title: __('Display', '--gctd--'),
            initialOpen: false,
            panelArray: responsivePanel,
            tabRole: TabSetting
        },
        {
            title: __('Animation Effects', '--gctd--'),
            initialOpen: false,
            panelArray: (props) => animationPanel({
                ...props,
                styleId: 'column-animation'
            }),
            tabRole: TabSetting
        },
        {
            title: __('Spacing', '--gctd--'),
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