import { __ } from '@wordpress/i18n';
import { TabSetting, advancePanel, responsivePanel } from 'gutenverse-core/controls';
import { panelGeneral } from './panel-general';

export const panelList = () => {
    return [
        {
            title: __('General', 'gutenverse'),
            panelArray: panelGeneral,
            tabRole: TabSetting
        },
        {
            title: __('Display', 'gutenverse'),
            initialOpen: false,
            panelArray: responsivePanel,
            tabRole: TabSetting
        },
        {
            title: __('Spacing', 'gutenverse'),
            initialOpen: false,
            panelArray: (props) => advancePanel({
                ...props,
                styleId: 'icon-list-item-advance',
            }),
            tabRole: TabSetting
        }
    ];
};