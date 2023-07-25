import { __ } from '@wordpress/i18n';
import { CheckboxControl } from 'gutenverse-core/controls';

export const responsivePanel = () => {
    return [
        {
            id: 'hideDesktop',
            label: __('Hide on Desktop', '--gctd--'),
            component: CheckboxControl,
        },
        {
            id: 'hideTablet',
            label: __('Hide on Tablet', '--gctd--'),
            component: CheckboxControl,
        },
        {
            id: 'hideMobile',
            label: __('Hide on Mobile', '--gctd--'),
            component: CheckboxControl,
        },
    ];
};