import { __ } from '@wordpress/i18n';
import { IconRadioControl, SelectControl, TextControl } from 'gutenverse-core/controls';

export const contentPanel = (props) => {
    const {
        elementId,
    } = props;
    // style: [
    //     {
    //         selector: `.${elementId}`,
    //         render: value => `align-items: ${value};`
    //     },
    // ],
    
    return [
        {
            id: 'chartContent',
            label: __('Chart Content', 'gutenverse'),
            component: SelectControl,
            options: [
                {
                    label: __('None'),
                    value: 'none'
                },
                {
                    label: __('Percentage'),
                    value: 'percentage'
                },
                {
                    label: __('Icon'),
                    value: 'icon'
                },
                {
                    label: __('Number'),
                    value: 'number'
                },
            ],
        },
        {
            id: 'titleTag',
            label: __('Title Tag', 'gutenverse'),
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
    ];
};