import { __ } from '@wordpress/i18n';

import { IconRadioControl, SelectControl } from 'gutenverse-core/controls';
import { AlignCenter, AlignJustify, AlignLeft, AlignRight } from 'react-feather';

export const contentPanel = (props) => {
    const {
        elementId,
    } = props;

    return [
        {
            id: 'alignment',
            label: __('Alignment', 'gutenverse'),
            component: IconRadioControl,
            allowDeviceControl: true,
            options: [
                {
                    label: __('Align Left', 'gutenverse'),
                    value: 'flex-start',
                    icon: <AlignLeft />,
                },
                {
                    label: __('Align Center', 'gutenverse'),
                    value: 'center',
                    icon: <AlignCenter />,
                },
                {
                    label: __('Align Right', 'gutenverse'),
                    value: 'flex-end',
                    icon: <AlignRight />,
                },
                {
                    label: __('Align Right', 'gutenverse'),
                    value: 'space-between',
                    icon: <AlignJustify />,
                },
            ],
            style: [
                {
                    selector: `.${elementId} .gutenverse-menu-wrapper .gutenverse-menu`,
                    render: value => `justify-content: ${value};`,
                },
            ]
        },
        {
            id: 'breakpoint',
            label: __('Responsive Breakpoint', 'gutenverse'),
            component: SelectControl,
            options: [
                {
                    label: __('Tablet', 'gutenverse'),
                    value: 'tablet',
                },
                {
                    label: __('Mobile', 'gutenverse'),
                    value: 'mobile',
                },
            ]
        },
    ];
};