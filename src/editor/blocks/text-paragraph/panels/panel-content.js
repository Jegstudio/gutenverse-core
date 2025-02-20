import { __ } from '@wordpress/i18n';

import { ColorControl, IconRadioControl, RangeControl, SizeControl, TypographyControl } from 'gutenverse-core/controls';
import { AlignLeft, AlignCenter, AlignRight, AlignJustify } from 'gutenverse-core/components';

export const panelContent = (props) => {
    const {
        elementId,
    } = props;

    return [
        {
            id: 'columns',
            label: __('Columns', 'gutenverse'),
            component: RangeControl,
            min: 1,
            max: 10,
            step: 1,
            allowDeviceControl: true,
            liveStyle: [
                {
                    'type': 'plain',
                    'id': 'columns',
                    'selector': `.${elementId}`,
                    'responsive': true,
                    'properties': [
                        {
                            'name': 'columns',
                            'valueType': 'direct'
                        }
                    ]
                }
            ]
        },
        {
            id: 'gap',
            label: __('Column Gap', 'gutenverse'),
            component: SizeControl,
            allowDeviceControl: true,
            position: ['top', 'right', 'bottom', 'left'],
            units: {
                px: {
                    text: 'px',
                    min: 1,
                    max: 200,
                    step: 1
                },
                em: {
                    text: 'em',
                    min: 0.1,
                    max: 3,
                    step: 0.1
                },
            },
            liveStyle: [
                {
                    'type': 'unitPoint',
                    'id': 'gap',
                    'selector': `.${elementId}`,
                    'responsive': true,
                    'properties': [
                        {
                            'name': 'column-gap',
                            'valueType': 'direct'
                        }
                    ]
                }
            ]
        },
        {
            id: 'alignment',
            label: __('Alignment', 'gutenverse'),
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
        },
        {
            id: 'textColor',
            label: __('Text Color', 'gutenverse'),
            component: ColorControl,
            liveStyle: [
                {
                    'type': 'color',
                    'id': 'textColor',
                    'selector': `.${elementId}`,
                    'properties': [
                        {
                            'name': 'color',
                            'valueType': 'direct'
                        }
                    ]
                }
            ]
        },
        {
            id: 'typography',
            label: __('Typography', 'gutenverse'),
            component: TypographyControl,
        },
    ];
};