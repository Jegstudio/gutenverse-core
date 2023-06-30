/* External dependencies */

import { AlignLeft, AlignRight, AlignCenter, AlignJustify } from 'react-feather';

/* WordPress dependencies */
import { __ } from '@wordpress/i18n';

/* Gutenverse dependencies */
import { IconRadioControl, SelectControl } from 'gutenverse-core/controls';

export const contentPanel = ({ elementId }) => {
    return [
        {
            id: 'type',
            label: __('Heading Type', 'gutenverse'),
            component: SelectControl,
            options: [
                {
                    label: __('H1'),
                    value: 1
                },
                {
                    label: __('H2'),
                    value: 2
                },
                {
                    label: __('H3'),
                    value: 3
                },
                {
                    label: __('H4'),
                    value: 4
                },
                {
                    label: __('H5'),
                    value: 5
                },
                {
                    label: __('H6'),
                    value: 6
                },
            ],
        },
        {
            id: 'textAlign',
            label: __('Text Alignment', 'gutenverse'),
            component: IconRadioControl,
            allowDeviceControl: true,
            options: [
                {
                    label: __('Align Left', 'gutenverse'),
                    value: 'left',
                    icon: <AlignLeft />,
                },
                {
                    label: __('Align Center', 'gutenverse'),
                    value: 'center',
                    icon: <AlignCenter />,
                },
                {
                    label: __('Align Right', 'gutenverse'),
                    value: 'right',
                    icon: <AlignRight />,
                },
                {
                    label: __('Align Justify', 'gutenverse'),
                    value: 'justify',
                    icon: <AlignJustify />,
                },
            ],
            style: [
                {
                    selector: `.${elementId}`,
                    render: value => `text-align: ${value};`
                }
            ]
        },
    ];
};