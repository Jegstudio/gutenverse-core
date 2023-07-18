import { __ } from '@wordpress/i18n';
import { SelectControl, TextControl } from 'gutenverse-core/controls';

export const settingPanel = (props) => {
    const {
        linkTo,
        dateFormat
    } = props;

    return [
        {
            id: 'dateFormat',
            label: __('Date Format', 'gutenverse'),
            component: SelectControl,
            options: [
                {
                    label: __('Relative Date/Time Format (ago)', 'gutenverse'),
                    value: 'ago'
                },
                {
                    label: __('Default Format From Setting', 'gutenverse'),
                    value: 'default'
                },
                {
                    label: __('December 31, 2022', 'gutenverse'),
                    value: 'F j, Y'
                },
                {
                    label: __('2022-12-31', 'gutenverse'),
                    value: 'Y-m-d'
                },
                {
                    label: __('12/31/2022', 'gutenverse'),
                    value: 'm/d/Y'
                },
                {
                    label: __('31/12/2022', 'gutenverse'),
                    value: 'd/m/Y'
                },
                {
                    label: __('December 31, 2022 4:00 AM', 'gutenverse'),
                    value: 'F j, Y g:i A'
                },
                {
                    label: __('12/31/2022 4:00 AM', 'gutenverse'),
                    value: 'm/d/Y g:i A'
                },
                {
                    label: __('Custom Format', 'gutenverse'),
                    value: 'custom'
                },
            ],
        },
        {
            id: 'customFormat',
            show: dateFormat === 'custom',
            label: __('Custom Format', 'gutenverse'),
            component: TextControl,
        },
        {
            id: 'dateType',
            label: __('Date Type', 'gutenverse'),
            component: SelectControl,
            options: [
                {
                    label: __('Published Date', 'gutenverse'),
                    value: 'published'
                },
                {
                    label: __('Modified Date', 'gutenverse'),
                    value: 'modified'
                },
                {
                    label: __('Both Dates', 'gutenverse'),
                    value: 'both'
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
                    label: __('P'),
                    value: 'p'
                },
                {
                    label: __('SPAN'),
                    value: 'span'
                },
            ],
        },
        {
            id: 'linkTo',
            label: __('Link To', 'gutenverse'),
            component: SelectControl,
            options: [
                {
                    label: __('None'),
                    value: 'none'
                },
                {
                    label: __('Home URL'),
                    value: 'home'
                },
                {
                    label: __('Post URL'),
                    value: 'post'
                },
                {
                    label: __('Custom URL'),
                    value: 'custom'
                }
            ],
        },
        {
            id: 'customURL',
            show: linkTo === 'custom',
            label: __('Custom URL', 'gutenverse'),
            component: TextControl,
        },
    ];
};