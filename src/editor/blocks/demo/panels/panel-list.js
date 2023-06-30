import { contentPanel } from './panel-content';
import { __ } from '@wordpress/i18n';
import { backgroundPanel } from 'gutenverse-core/controls';
import { TabSetting, TabStyle } from 'gutenverse-core/controls';

export const panelList = () => {
    return [
        {
            title: __('Style', 'gutenverse'),
            panelArray: contentPanel,
            tabRole: TabSetting
        },
        {
            title: __('Background', 'gutenverse'),
            initialOpen: false,
            panelArray: (props) => backgroundPanel({
                ...props,
                styleId: 'heading-background',
                normalOptions: [ 'default', 'gradient' ],
                hoverOptions: [ 'default', 'gradient' ]
            }),
            tabRole: TabStyle
        }
    ];
};