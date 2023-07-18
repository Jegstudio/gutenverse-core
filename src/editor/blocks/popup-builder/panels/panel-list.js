import { __ } from '@wordpress/i18n';
import { animationPanel } from 'gutenverse-core/controls';
import { popupPanel } from './panel-popup';
import { overlayPanel } from './panel-overlay';
import { closePanel } from './panel-close';
import { containerPanel } from './panel-container';
import { TabSetting, TabStyle } from 'gutenverse-core/controls';

export const panelList = () => {
    return [
        {
            title: __('Popup', 'gutenverse'),
            panelArray: popupPanel,
            tabRole: TabSetting
        },{
            title: __('Container', 'gutenverse'),
            panelArray: containerPanel,
            tabRole: TabStyle
        },
        {
            title: __('Overlay', 'gutenverse'),
            panelArray: overlayPanel,
            tabRole: TabStyle
        },
        {
            title: __('Close', 'gutenverse'),
            panelArray: closePanel,
            tabRole: TabSetting
        },
        {
            title: __('Animation Effects', 'gutenverse'),
            initialOpen: false,
            panelArray: (props) => animationPanel({
                ...props,
                styleId: 'popup-builder-animation'
            }),
            tabRole: TabSetting
        },
    ];
};