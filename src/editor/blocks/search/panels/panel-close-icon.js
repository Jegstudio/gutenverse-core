import { __ } from '@wordpress/i18n';
import { IconControl} from 'gutenverse-core/controls';

export const iconPanel = () => {
    return [
        {
            id: 'icon',
            label: __('Select Close Icon', 'gutenverse'),
            component: IconControl,
        },
    ];
};