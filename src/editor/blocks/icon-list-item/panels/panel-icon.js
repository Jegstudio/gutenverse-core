import { __ } from '@wordpress/i18n';
import { RangeControl, TextControl } from 'gutenverse-core/controls';

export const panelIcon = (props) => {
    const {
        elementId
    } = props;

    return [
        {
            id: 'iconLineHeight',
            label: __('Icon line height', 'gutenverse'),
            component: RangeControl,
            allowDeviceControl: true,
            min: 1,
            max: 100,
            step: 1,
            style: [
                {
                    selector: `.${elementId} i`,
                    render: value => `line-height: ${value}px;`
                }
            ]
        },
        {
            id: 'ariaLabel',
            label: __('Aria Label', 'gutenverse'),
            component: TextControl
        }
    ];
};

