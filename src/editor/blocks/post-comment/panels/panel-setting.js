import { __ } from '@wordpress/i18n';
import { CheckboxControl, TextControl } from 'gutenverse-core/controls';

export const settingPanel = ({enableSuffix}) => {
    return [
        {
            id: 'showForm',
            label: __('Show Comment Form', 'gutenverse'),
            component: CheckboxControl,
        },
        {
            id: 'enableSuffix',
            label: __('Enable Suffix', 'gutenverse'),
            component: CheckboxControl,
        },
        {
            id: 'suffixMain',
            show: enableSuffix,
            label: __('Main Comment Suffix', 'gutenverse'),
            component: TextControl,
        },
        {
            id: 'suffixReply',
            show: enableSuffix,
            label: __('Reply Comment Suffix', 'gutenverse'),
            component: TextControl,
        },
    ];
};