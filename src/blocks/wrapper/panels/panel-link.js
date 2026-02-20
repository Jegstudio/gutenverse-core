import { __ } from '@wordpress/i18n';
import { TextControl, SelectControl, AlertControl } from 'gutenverse-core/controls';

export const panelLink = () => {
    return [
        {
            id: 'sticky-notice',
            component: AlertControl,
            children: <>
                <span>{__('This option uses JavaScript instead of an anchor tag. Suitable for clickable sections, not SEO links.', '--gctd--')}</span>
            </>
        },
        {
            id: 'url',
            label: __('Link URL', '--gctd--'),
            component: TextControl,
        },
        {
            id: 'linkTarget',
            label: __('Link Target', '--gctd--'),
            component: SelectControl,
            options: [
                {
                    label: 'Open in new tab',
                    value: '_blank'
                },
                {
                    label: 'Open in this tab',
                    value: '_self'
                },
            ]
        },
    ];
};
