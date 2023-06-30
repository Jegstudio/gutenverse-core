import { __ } from '@wordpress/i18n';
import { SelectControl, TextControl } from 'gutenverse-core/controls';

export const altPanel = (props) => {
    const {
        altType
    } = props;

    return [
        {
            id: 'altType',
            label: __('Alt Type', 'gutenverse'),
            component: SelectControl,
            options: [
                {
                    label: 'None',
                    value: 'none'
                },
                {
                    label: 'Alt from Image',
                    value: 'original'
                },
                {
                    label: 'Custom Alt',
                    value: 'custom'
                },
            ]
        },
        {
            id: 'altCustom',
            show: altType === 'custom',
            label: __('Custom Caption', 'gutenverse'),
            component: TextControl,
        },
    ];
};

