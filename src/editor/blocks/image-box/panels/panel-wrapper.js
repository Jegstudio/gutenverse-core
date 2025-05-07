import { __ } from '@wordpress/i18n';
import { SelectControl, AlertControl, CheckboxControl } from 'gutenverse-core/controls';

export const panelWrapper = () => {

    return [
        {
            id: 'childNotice',
            component: AlertControl,
            children: <>
                <span>{__('If you include a button within this block, the body link feature will be disabled. This is because you cannot have a link inside another link.')}</span>
            </>
        },
        {
            id: 'includeButton',
            label: __('Enable button', 'gutenverse'),
            description: __('Add button on the image body, the body link feature will be disabled.'),
            component: CheckboxControl
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
        },
    ];
};