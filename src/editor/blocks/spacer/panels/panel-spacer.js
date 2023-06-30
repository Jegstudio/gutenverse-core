import { __ } from '@wordpress/i18n';
import { SizeControl } from 'gutenverse-core/controls';
import { handleUnitPoint } from 'gutenverse-core/controls';

export const spacerPanel = ({elementId}) => {
    return [
        {
            id: 'space',
            label: __('Spacer Height', 'gutenverse'),
            component: SizeControl,
            allowDeviceControl: true,
            units: {
                px: {
                    text: 'px',
                    min: 0,
                    max: 2000,
                    step: 1
                },
                vh: {
                    text: 'vh',
                    min: 0,
                    max: 200,
                    step: 1
                },
                em: {
                    text: 'em',
                    min: 0,
                    max: 20,
                    step: 0.1
                },
            },
            style: [
                {
                    selector: `.${elementId}.guten-spacer`,
                    render: value => handleUnitPoint(value, 'padding-bottom')
                }
            ]
        },
    ];
};