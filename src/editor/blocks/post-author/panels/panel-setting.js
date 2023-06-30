import { __ } from '@wordpress/i18n';
import { CheckboxControl, SelectControl, TextControl } from 'gutenverse-core/controls';

export const settingPanel = (props) => {
    const {
        authorLink
    } = props;

    return [
        {
            id: 'authorType',
            label: __('Author Type', 'gutenverse'),
            component: SelectControl,
            options: [
                {
                    label: __('First Name'),
                    value: 'first_name'
                },
                {
                    label: __('Last Name'),
                    value: 'last_name'
                },
                {
                    label: __('First + Last Name'),
                    value: 'first_last'
                },
                {
                    label: __('Last + First Name'),
                    value: 'last_first'
                },
                {
                    label: __('Nick Name'),
                    value: 'nick_name'
                },
                {
                    label: __('Display Name'),
                    value: 'display_name'
                },
                {
                    label: __('User Name'),
                    value: 'user_name'
                },
            ],
        },
        {
            id: 'htmlTag',
            label: __('HTML Tag', 'gutenverse'),
            component: SelectControl,
            options: [
                {
                    label: __('H1'),
                    value: 'h1'
                },
                {
                    label: __('H2'),
                    value: 'h2'
                },
                {
                    label: __('H3'),
                    value: 'h3'
                },
                {
                    label: __('H4'),
                    value: 'h4'
                },
                {
                    label: __('H5'),
                    value: 'h5'
                },
                {
                    label: __('H6'),
                    value: 'h6'
                },
                {
                    label: __('SPAN'),
                    value: 'span'
                },
            ],
        },
        {
            id: 'authorAvatar',
            label: __('Show Avatar', 'gutenverse'),
            component: CheckboxControl,
        },
        {
            id: 'authorLink',
            label: __('Make Author a Link', 'gutenverse'),
            component: CheckboxControl,
        },
        {
            id: 'authorLinkTarget',
            show: !!authorLink,
            label: __('Open in A New Tab', 'gutenverse'),
            component: CheckboxControl,
        },
        {
            id: 'authorLinkRel',
            show: !!authorLink,
            label: __('Link Rel', 'gutenverse'),
            component: TextControl,
        },
    ];
};