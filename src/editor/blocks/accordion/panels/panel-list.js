import { TabSetting, dynamicContentPanel } from 'gutenverse-core/controls';
import { __ } from '@wordpress/i18n';


export const panelList = () => {
    return [
        {
            title: __('Dynamic Data', 'gutenverse'),
            panelArray: (props) => {
                return dynamicContentPanel({
                    ...props,
                    blockType: 'text'
                });
            },
            initialOpen: false,
            tabRole: TabSetting,
            pro: true,
        }
    ];
};
