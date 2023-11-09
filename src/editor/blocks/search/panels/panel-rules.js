import { __ } from '@wordpress/i18n';
import { CheckboxControl, NumberControl, SelectControl, TextControl } from 'gutenverse-core/controls';

export const panelRules = props => {
    const {
        validationType
    } = props;

    return [
        {
            id: 'required',
            label: __('Required', 'gutenverse'),
            component: CheckboxControl,
            description: __('Check this option to make user required to fill this input', 'gutenverse'),
        },
        {
            id: 'validationType',
            label: __('Validation Type', 'gutenverse'),
            component: SelectControl,
            options: [
                {
                    label: __('None'),
                    value: 'none'
                },
                {
                    label: __('By Word Length'),
                    value: 'word'
                },
                {
                    label: __('By Character Length'),
                    value: 'character'
                },
            ],
        },
        {
            id: 'validationMin',
            show: validationType !== 'none',
            label: __('Minimum Length', 'gutenverse'),
            component: NumberControl,
            min: 1,
            max: 1000,
            step: 1,
        },
        {
            id: 'validationMax',
            show: validationType !== 'none',
            label: __('Maximum Length', 'gutenverse'),
            component: NumberControl,
            min: 1,
            max: 1000,
            step: 1,
        },
        {
            id: 'validationWarning',
            show: validationType !== 'none',
            label: __('Warning Message', 'gutenverse'),
            description: __('Validation message if the required input is incorrect', 'gutenverse'),
            component: TextControl,
        },
    ];
};