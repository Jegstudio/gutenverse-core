import { __ } from '@wordpress/i18n';
import { panelContent } from './panel-content';
import { panelStyle } from './panel-style';
import { panelSpacing } from './panel-spacing';
import { TabSetting, TabStyle, maskPanel } from 'gutenverse-core/controls';

export const panelList = () => {
    return [
        {
            title: __('Content', 'gutenverse'),
            panelArray: panelContent,
            initialOpen: true,
            tabRole: TabSetting
        },
        {
            title: __('Spacing', 'gutenverse'),
            panelArray: panelSpacing,
            initialOpen: false,
            tabRole: TabSetting
        },
        {
            title: __('Masking', 'gutenverse'),
            initialOpen: false,
            panelArray: maskPanel,
            tabRole: TabStyle
        },
        {
            title: __('Style', 'gutenverse'),
            panelArray: panelStyle,
            initialOpen: false,
            tabRole: TabStyle
        }
    ];
};