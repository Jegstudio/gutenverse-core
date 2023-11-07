import { __ } from '@wordpress/i18n';
import { TabStyle, advancePanel, maskPanel, responsivePanel, transformPanel } from 'gutenverse-core/controls';
import { panelGeneral } from './panel-general';

export const panelList = () => {
    return [
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
        }
    ];
};