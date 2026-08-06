import { __ } from '@wordpress/i18n';
import { AlertControl, CheckboxControl } from 'gutenverse-core/controls';

export const responsivePanel = () => {
    return [
        {
            id: 'responsive-breakpoint-notice',
            component: AlertControl,
            children: <>
                <span>{__('These display options follow the Responsive Breakpoints configured in the Gutenverse settings dashboard.', '--gctd--')}</span>
            </>
        },
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
