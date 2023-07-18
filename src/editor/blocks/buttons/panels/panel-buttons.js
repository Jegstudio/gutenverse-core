
import { __ } from '@wordpress/i18n';
import { AlignCenter, AlignLeft, AlignRight } from 'react-feather';
import { IconRadioControl } from 'gutenverse-core/controls';

export const buttonsPanel = ({elementId}) => {
    return [
        {
            id: 'alignButtons',
            label: __('Alignment', 'gutenverse'),
            component: IconRadioControl,
            allowDeviceControl: true,
            options: [
                {
                    label: __('Align Left', 'gutenverse'),
                    value: 'flex-start',
                    icon: <AlignLeft/>,
                },
                {
                    label: __('Align Center', 'gutenverse'),
                    value: 'center',
                    icon: <AlignCenter/>,
                },
                {
                    label: __('Align Right', 'gutenverse'),
                    value: 'flex-end',
                    icon: <AlignRight/>,
                },
            ],
            style: [
                {
                    selector: `.${elementId}, .${elementId} .guten-button-wrapper`,
                    render: value => `justify-content: ${value};`
                },
            ]
        }
    ];
};