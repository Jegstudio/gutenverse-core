
import { __ } from '@wordpress/i18n';
import { SelectControl, TextControl } from 'gutenverse-core/controls';

export const expiredPanel = (props) => {
    const {expiredAction} = props;
    return [
        {
            id: 'expiredAction',
            label: __('Expired Action', 'gutenverse'),
            component: SelectControl,
            options: [
                {
                    label: __('None', 'gutenverse'),
                    value: 'none',
                },
                {
                    label: __('Redirect to URL', 'gutenverse'),
                    value: 'redirect',
                },
                {
                    label: __('Custom Section', 'gutenverse'),
                    value: 'section',
                },
            ],
        },
        {
            id: 'expiredUrl',
            show: expiredAction === 'redirect',
            label: __('Redirect Url', 'gutenverse'),
            component: TextControl
        }
    ];
};