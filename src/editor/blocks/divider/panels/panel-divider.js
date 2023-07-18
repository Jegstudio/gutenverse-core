import { __ } from '@wordpress/i18n';

import { AlignCenter, AlignLeft, AlignRight } from 'react-feather';
import { ColorControl, IconRadioControl, RangeControl, SelectControl } from 'gutenverse-core/controls';
import { handleColor } from 'gutenverse-core/styling';

export const dividerPanel = ({ elementId }) => {
    return [
        {
            id: 'type',
            label: __('Type', 'gutenverse'),
            component: SelectControl,
            options: [
                {
                    label: __('Default'),
                    value: 'default'
                },
                {
                    label: __('Double'),
                    value: 'double'
                },
                {
                    label: __('Dotted'),
                    value: 'dotted'
                },
                {
                    label: __('Dashed'),
                    value: 'dashed'
                },
                {
                    label: __('Curly'),
                    value: 'curly'
                },
                {
                    label: __('Curved'),
                    value: 'curved'
                },
                {
                    label: __('Slashed'),
                    value: 'slashed'
                },
                {
                    label: __('Squared'),
                    value: 'squared'
                },
                {
                    label: __('Wavy'),
                    value: 'wavy'
                },
                {
                    label: __('Zigzag'),
                    value: 'zigzag'
                },
                {
                    label: __('Multiple'),
                    value: 'multiple'
                },
                {
                    label: __('Arrows'),
                    value: 'arrows'
                },
                {
                    label: __('Pluses'),
                    value: 'pluses'
                },
                {
                    label: __('Rhombus'),
                    value: 'rhombus'
                },
                {
                    label: __('Parallelogram'),
                    value: 'parallelogram'
                },
                {
                    label: __('Rectangles'),
                    value: 'rectangles'
                },
                {
                    label: __('Fir Trees'),
                    value: 'fir'
                },
                {
                    label: __('Half Round'),
                    value: 'halfrounds'
                },
                {
                    label: __('Leaves'),
                    value: 'leaves'
                },
                {
                    label: __('Stripes'),
                    value: 'stripes'
                },
                {
                    label: __('Squares'),
                    value: 'squares'
                },
                {
                    label: __('Trees'),
                    value: 'trees'
                },
                {
                    label: __('Tribal'),
                    value: 'tribal'
                },
                {
                    label: __('X'),
                    value: 'x'
                },
            ]
        },
        {
            id: 'width',
            label: __('Width', 'gutenverse'),
            component: RangeControl,
            allowDeviceControl: true,
            min: 10,
            max: 100,
            step: 1,
            style: [
                {
                    selector: `.${elementId} .guten-divider-wrapper`,
                    render: value => `width: ${value}%;`
                }
            ],
        },
        {
            id: 'size',
            label: __('Size', 'gutenverse'),
            component: RangeControl,
            allowDeviceControl: true,
            min: 1,
            max: 100,
            step: 0.1,
            style: [
                {
                    selector: `.${elementId} .guten-divider-style`,
                    render: value => `--divider-pattern-height: ${value}px;`
                },
                {
                    selector: `.${elementId} .guten-divider-line`,
                    render: value => `border-width: ${value}px;`
                },
            ]
        },
        {
            id: 'gap',
            label: __('Gap', 'gutenverse'),
            component: RangeControl,
            allowDeviceControl: true,
            min: 1,
            max: 50,
            step: 1,
            style: [
                {
                    selector: `.${elementId} .guten-divider-wrapper`,
                    render: value => `padding: ${value}px 0;`
                }
            ]
        },
        {
            id: 'dividerColor',
            label: __('Color', 'gutenverse'),
            component: ColorControl,
            style: [
                {
                    selector: `.${elementId} .guten-divider-line`,
                    render: value => handleColor(value, 'border-color')
                },
                {
                    selector: `.${elementId} .guten-divider-style`,
                    render: value => handleColor(value, 'background-color')
                }
            ]
        },
        {
            id: 'dividerAlign',
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
            ],
            style: [
                {
                    selector: `.${elementId}`,
                    render: value => `justify-content: ${value};`,
                },
            ]
        },
    ];
};