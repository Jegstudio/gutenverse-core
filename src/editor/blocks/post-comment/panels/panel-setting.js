import { __ } from '@wordpress/i18n';
import { CheckboxControl, TextControl } from 'gutenverse-core/controls';

export const settingPanel = ({enableSuffix, enableCommentTitle}) => {
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
        {
            id: 'enableCommentTitle',
            label: __('Enable Comment Title', 'gutenverse'),
            component: CheckboxControl,
        },
        {
            id: 'titleText',
            show: enableCommentTitle,
            label: __('Title Text', 'gutenverse'),
            component: TextControl,
        },
        {
            id: 'enablePostTitle',
            show: enableCommentTitle,
            label: __('Show Post Title ', 'gutenverse'),
            component: CheckboxControl,
        },
        {
            id: 'enableCommentCount',
            show: enableCommentTitle,
            label: __('Show Comments Count', 'gutenverse'),
            component: CheckboxControl,
        },
    ];
};