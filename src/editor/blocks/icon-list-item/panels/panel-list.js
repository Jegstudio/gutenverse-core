import { __ } from '@wordpress/i18n';
import { TabSetting, TabStyle, advancePanel, conditionPanel, maskPanel, responsivePanel, transformPanel } from 'gutenverse-core/controls';
import { panelGeneral } from './panel-general';
import { panelIcon } from './panel-icon';

export const panelList = () => {
    return [
        {
            title: __('Icon', 'gutenverse'),
            panelArray: panelIcon
        },
        {
            title: __('General', 'gutenverse'),
            panelArray: panelGeneral
        },
        {
            title: __('Display', 'gutenverse'),
            initialOpen: false,
            panelArray: responsivePanel
        },
        {
            title: __('Transform', 'gutenverse'),
            initialOpen: false,
            panelArray: transformPanel,
            pro: true
        },
        {
            title: __('Masking', 'gutenverse'),
            initialOpen: false,
            panelArray: maskPanel,
            tabRole: TabStyle
        },
        {
            title: __('Spacing', 'gutenverse'),
            initialOpen: false,
            panelArray: (props) => advancePanel({
                ...props,
                styleId: 'icon-list-item-advance',
            })
        },
        {
            title: __('Condition', 'gutenverse'),
            panelArray: conditionPanel,
            initialOpen: false,
            pro: true
        }
    ];
};