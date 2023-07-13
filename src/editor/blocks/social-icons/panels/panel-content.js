import { __ } from '@wordpress/i18n';

import { CheckboxControl, IconRadioControl, SelectControl, SizeControl, TypographyControl } from 'gutenverse-core-editor/controls';
import { AlignCenter, AlignLeft, AlignRight } from 'react-feather';
import { handleUnitPoint, handleTypography, handleAlign } from 'gutenverse-core/styling';

export const contentPanel = (props) => {
    const {
        setAttributes,
        elementId,
        showText,
        shape,
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
            ],
            style: [
                {
                    selector: `.${elementId}`,
                    render: value => `justify-content: ${value};`
                },
                {
                    selector: `.${elementId} .guten-social-icon`,
                    render: value => `text-align: ${handleAlign(value)}`
                },
            ]
        },
        {
            id: 'iconSize',
            label: __('Icon Size', 'gutenverse'),
            component: SizeControl,
            allowDeviceControl: true,
            units: {
                px: {
                    text: 'px',
                    min: 1,
                    max: 100,
                    step: 1
                },
                em: {
                    text: 'em',
                    min: 0.1,
                    max: 3,
                    step: 0.1
                },
            },
            style: [
                {
                    selector: `.${elementId} .guten-social-icon i`,
                    render: value => handleUnitPoint(value, 'font-size')
                }
            ]
        },
        {
            id: 'shape',
            label: __('Social Icon Shape', 'gutenverse'),
            component: SelectControl,
            options: [
                {
                    label: __('Square'),
                    value: 'square'
                },
                {
                    label: __('Rounded'),
                    value: 'rounded'
                },
                {
                    label: __('Circle'),
                    value: 'circle'
                },
            ],
            onChange: ({ shape }) => {
                if (shape === 'circle') {
                    setAttributes({
                        showText: false,
                    });
                }
            },
        },
        {
            id: 'showText',
            show: shape !== 'circle',
            label: __('Show Icon Text', 'gutenverse'),
            description: __('Display custom text beside icon', 'gutenverse'),
            component: CheckboxControl,
        },
        {
            id: 'typography',
            label: __('Typography', 'gutenverse'),
            show: shape !== 'circle' && showText,
            component: TypographyControl,
            style: [
                {
                    selector: `.${elementId} .guten-social-icon span`,
                    hasChild: true,
                    render: (value, id) => handleTypography(value, props, id)
                }
            ],
        },
    ];
};