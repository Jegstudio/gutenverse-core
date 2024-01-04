
import { __ } from '@wordpress/i18n';
import { AlignLeft, AlignRight, AlignCenter } from 'gutenverse-core/components';
import { DimensionControl, IconRadioControl, RangeControl, SelectControl, SizeControl, TextControl } from 'gutenverse-core/controls';
import { handleDimension, handleUnitPoint } from 'gutenverse-core/styling';

export const iconPanel = ({ elementId, iconView, iconBorderWidth, iconBorderRadius, iconShape, removeStyle }) => {
    return [
        {
            id: 'iconAlign',
            label: __('Icon Alignment', 'gutenverse'),
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
                }
            ],
            style: [
                {
                    selector: `.${elementId}`,
                    render: value => `text-align: ${value};`
                }
            ],
        },
        {
            id: 'iconSize',
            label: __('Size', 'gutenverse'),
            component: SizeControl,
            allowDeviceControl: true,
            units: {
                px: {
                    text: 'px',
                    min: 10,
                    max: 100,
                    step: 1
                },
                em: {
                    text: 'em',
                    min: 0.6,
                    max: 6,
                    step: 0.1
                },
            },
            style: [
                {
                    selector: `.${elementId} i`,
                    render: value => handleUnitPoint(value, 'font-size')
                }
            ],
        },
        {
            id: 'iconPadding',
            label: __('Padding', 'gutenverse'),
            component: RangeControl,
            allowDeviceControl: true,
            min: 0,
            max: 100,
            step: 1,
            style: [
                {
                    selector: `.${elementId} .guten-icon-wrapper`,
                    render: value => `padding: ${value}px;`
                }
            ],
        },
        {
            id: 'iconRotate',
            label: __('Rotate', 'gutenverse'),
            component: RangeControl,
            allowDeviceControl: true,
            min: 0,
            max: 360,
            step: 1,
            style: [
                {
                    selector: `.${elementId} .guten-icon-wrapper i`,
                    render: value => `transform: rotate(${value}deg);`
                }
            ],
        },
        {
            id: 'iconView',
            label: __('Icon View', 'gutenverse'),
            component: SelectControl,
            options: [
                {
                    label: 'Framed',
                    value: 'framed'
                },
                {
                    label: 'Stacked',
                    value: 'stacked'
                }
            ]
        },
        {
            id: 'iconShape',
            label: __('Icon Shape', 'gutenverse'),
            component: SelectControl,
            onChange: ({ iconShape }) => {
                if ('custom' !== iconShape) {
                    removeStyle('iconBorderWidth-style-0');
                    removeStyle('iconBorderRadius-style-0');
                }
            },
            options: [
                {
                    label: 'Square',
                    value: 'square'
                },
                {
                    label: 'Rounded',
                    value: 'rounded'
                },
                {
                    label: 'Circle',
                    value: 'circle'
                },
                {
                    label: 'Custom',
                    value: 'custom'
                },
            ],
            style: [
                {
                    selector: `.${elementId} .guten-icon-wrapper`,
                    allowRender: value => value === 'custom' && iconView === 'framed' && iconBorderWidth,
                    render: () => handleDimension(iconBorderWidth, 'border-width', false, 2)
                },
                {
                    selector: `.${elementId} .guten-icon-wrapper`,
                    allowRender: value => value === 'custom' && iconBorderRadius,
                    render: () => handleDimension(iconBorderRadius, 'border-radius', false)
                }
            ]
        },
        {
            id: 'iconBorderWidth',
            label: __('Border Width', 'gutenverse'),
            component: DimensionControl,
            show: iconShape === 'custom' && iconView === 'framed',
            position: ['top', 'right', 'bottom', 'left'],
            units: {
                px: {
                    text: 'px',
                    unit: 'px'
                },
                ['%']: {
                    text: '%',
                    unit: '%'
                },
            },
            style: [
                {
                    selector: `.${elementId} .guten-icon-wrapper`,
                    allowRender: () => iconShape === 'custom' && iconView === 'framed',
                    render: value => handleDimension(value, 'border-width', false, 2)
                }
            ],
        },
        {
            id: 'iconBorderRadius',
            label: __('Border Radius', 'gutenverse'),
            component: DimensionControl,
            show: iconShape === 'custom',
            position: ['top', 'right', 'bottom', 'left'],
            units: {
                px: {
                    text: 'px',
                    unit: 'px'
                },
                ['%']: {
                    text: '%',
                    unit: '%'
                },
            },
            style: [
                {
                    selector: `.${elementId} .guten-icon-wrapper`,
                    allowRender: () => iconShape === 'custom',
                    render: value => handleDimension(value, 'border-radius', false)
                }
            ],
        },
        {
            id: 'ariaLabel',
            label: __('Aria Label', 'gutenverse'),
            component: TextControl
        }
    ];
};