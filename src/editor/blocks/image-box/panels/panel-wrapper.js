import { __ } from '@wordpress/i18n';
import { SelectControl, AlertControl } from 'gutenverse-core/controls';

export const panelWrapper = props => {
    const {
        elementId,
    } = props;

    return [
        {
            id: 'childNotice',
            component: AlertControl,
            children: <>
                <span>{__('If you include a button within this block, the body link feature will be disabled. This is because you cannot have a link inside another link.')}</span>
            </>
        },
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
                    selector: `.${elementId} .inner-container`,
                    render: value => `flex-direction: ${value}`
                }
            ]
        },
    ];
};