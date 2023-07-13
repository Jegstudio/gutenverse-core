import { __ } from '@wordpress/i18n';
import { CheckboxControl, SelectControl, TextControl } from 'gutenverse-core-editor/controls';

export const settingPanel = (props) => {
    const {
        postLink
    } = props;

    return [
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
            id: 'postLink',
            label: __('Make Title a Link', 'gutenverse'),
            component: CheckboxControl,
        },
        {
            id: 'postLinkTarget',
            show: !!postLink,
            label: __('Open in A New Tab', 'gutenverse'),
            component: CheckboxControl,
        },
        {
            id: 'postLinkRel',
            show: !!postLink,
            label: __('Link Rel', 'gutenverse'),
            component: TextControl,
        },
    ];
};