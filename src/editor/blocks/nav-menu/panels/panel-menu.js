import { __ } from '@wordpress/i18n';
import menuControl from '../control/menu-control';

export const menuPanel = () => {
    return [
        {
            id: 'menuId',
            label: __('Menu', 'gutenverse'),
            component: menuControl
        },
    ];
};