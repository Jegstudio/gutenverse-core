import { __ } from '@wordpress/i18n';
import { IconControl, SelectControl } from 'gutenverse-core/controls';

export const settingPanel = () => {
    return [
        {
            id: 'breadcrumbType',
            label: __('Type', 'gutenverse'),
            component: SelectControl,
            options: [
                {
                    label: __('Default', 'gutenverse'),
                    value: 'default'
                },
                {
                    label: __('Date', 'gutenverse'),
                    value: 'date',
                }
            ]
        },
        {
            id: 'separatorIcon',
            label: __('Separator Icon', 'gutenverse'),
            component: IconControl
        }
    ];
};