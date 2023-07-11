import { __ } from '@wordpress/i18n';
import { CheckboxControl } from 'gutenverse-core-editor/controls';

export const responsivePanel = () => {
    return [
        {
            id: 'hideDesktop',
            label: __('Hide on Desktop', 'gutenverse'),
            component: CheckboxControl,
        },
        {
            id: 'hideTablet',
            label: __('Hide on Tablet', 'gutenverse'),
            component: CheckboxControl,
        },
        {
            id: 'hideMobile',
            label: __('Hide on Mobile', 'gutenverse'),
            component: CheckboxControl,
        },
    ];
};