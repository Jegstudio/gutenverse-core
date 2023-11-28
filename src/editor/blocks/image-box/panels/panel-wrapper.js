import { __ } from '@wordpress/i18n';
import { SelectControl } from 'gutenverse-core/controls';

export const panelWrapper = props => {
    const {
        elementId,
    } = props;

    return [
        {
            id: 'imagePosition',
            label: __('Image Position', 'gutenverse'),
            component: SelectControl,
            allowDeviceControl: true,
            options: [
                {
                    label: 'Top',
                    value: 'column'
                },
                {
                    label: 'Bottom',
                    value: 'column-reverse'
                },
                {
                    label: 'Left',
                    value: 'row'
                },
                {
                    label: 'Right',
                    value: 'row-reverse'
                },
            ],
            style: [
                {
                    selector: `.${elementId}`,
                    render: value => `flex-direction: ${value}`
                }
            ]
        },
    ];
};