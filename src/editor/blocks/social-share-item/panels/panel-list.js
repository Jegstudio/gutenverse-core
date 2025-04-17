import { __ } from '@wordpress/i18n';
import { panelContent } from './panel-content';
import { panelStyle } from './panel-style';
import { panelSpacing } from './panel-spacing';
import { TabSetting, TabStyle, conditionPanel, maskPanel } from 'gutenverse-core/controls';

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
            title: __('Style', 'gutenverse'),
            panelArray: panelStyle,
            initialOpen: false,
            tabRole: TabStyle
        },
        {
            title: __('Masking', 'gutenverse'),
            initialOpen: false,
            panelArray: maskPanel,
            tabRole: TabStyle
        },
        {
            title: __('Condition', 'gutenverse'),
            panelArray: conditionPanel,
            initialOpen: false,
            pro: true
        },
    ];
};