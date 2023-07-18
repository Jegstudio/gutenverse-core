import { __ } from '@wordpress/i18n';
import { CheckboxControl } from 'gutenverse-core/controls';

export const panelGeneral = () => {

    return [
        {
            id: 'hideIcon',
            label: __('Hide Icon', 'gutenverse'),
            component: CheckboxControl,
        },
    ];
};

