import { __ } from '@wordpress/i18n';
import { Image, Grid, Video } from 'react-feather';

import {
    CheckboxControl,
    ColorControl,
    DimensionControl,
    FontControl,
    IconControl,
    IconRadioControl,
    ImageControl,
    NumberControl,
    RangeControl,
    RepeaterControl,
    SelectControl,
    SizeControl,
    TextControl,
    TextareaControl,
    TypographyControl,
    DateControl
} from 'gutenverse-core/controls';

export const contentPanel = () => {
    return [
        {
            id: 'date',
            label: __('Date Control', 'gutenverse'),
            description: __('Icon Radio Control', 'gutenverse'),
            component: DateControl,
        },
        {
            id: 'text',
            label: __('Text Control', 'gutenverse'),
            description: __('Icon Radio Control', 'gutenverse'),
            component: TextControl,
        },
        {
            id: 'textarea',
            label: __('Textarea Control', 'gutenverse'),
            description: __('Textarea Control', 'gutenverse'),
            component: TextareaControl,
        },
        {
            id: 'checkbox',
            label: __('Checkbox', 'gutenverse'),
            description: __('Icon Radio Control', 'gutenverse'),
            component: CheckboxControl,
        },
        {
            id: 'number',
            label: __('Number', 'gutenverse'),
            description: __('Number Control', 'gutenverse'),
            component: NumberControl,
            min: 1,
            max: 10,
            step: 0.1,
            allowDeviceControl: true,
        },
        {
            id: 'range',
            label: __('Range', 'gutenverse'),
            description: __('Icon Radio Control', 'gutenverse'),
            component: RangeControl,
            min: 1,
            max: 200,
            step: 1,
            allowDeviceControl: true,
        },
        {
            id: 'size',
            label: __('Size', 'gutenverse'),
            description: __('Icon Radio Control', 'gutenverse'),
            component: SizeControl,
            allowDeviceControl: true,
            units: {
                px: {
                    text: 'px',
                    min: 1,
                    max: 200,
                    step: 1,
                    unit: 'px',
                },
                em: {
                    text: 'em',
                    min: 0.1,
                    max: 10,
                    step: 0.1,
                    unit: 'em',
                },
                rem: {
                    text: 'rem',
                    min: 0.1,
                    max: 10,
                    step: 0.1,
                    unit: 'rem',
                },
                vh: {
                    text: 'vh',
                    min: 0.1,
                    max: 10,
                    step: 0.1,
                    unit: 'vh',
                },
            },
        },
        {
            id: 'select',
            label: __('Select Control', 'gutenverse'),
            description: __('Icon Radio Control', 'gutenverse'),
            component: SelectControl,
            isMulti: true,
            options: [
                {
                    label: __('Default'),
                    value: 'default'
                },
                {
                    label: __('No gap'),
                    value: 'no'
                },
                {
                    label: __('Narrow'),
                    value: 'narrow'
                },
                {
                    label: __('Extended'),
                    value: 'extended'
                },
                {
                    label: __('Wide'),
                    value: 'wide'
                },
                {
                    label: __('Wider'),
                    value: 'wider'
                }
            ],
        },
        {
            id: 'font',
            label: __('Font', 'gutenverse'),
            description: __('Description of Control', 'gutenverse'),
            component: FontControl,
        },
        {
            id: 'margin',
            label: __('Margin', 'gutenverse'),
            description: __('Icon Radio Control', 'gutenverse'),
            component: DimensionControl,
            position: ['top', 'right', 'bottom', 'left'],
            allowDeviceControl: true,
            units: {
                px: {
                    text: 'px',
                    unit: 'px'
                },
                em: {
                    text: 'em',
                    unit: 'em'
                },
                percent: {
                    text: '%',
                    unit: '%'
                },
                rem: {
                    text: 'rem',
                    unit: 'rem'
                },
            },
        },
        {
            id: 'iconRadio',
            label: __('Icon Radio', 'gutenverse'),
            description: __('Icon Radio Control', 'gutenverse'),
            component: IconRadioControl,
            options: [
                {
                    label: __('Default', 'gutenverse'),
                    value: 'default',
                    icon: <Image />,
                },
                {
                    label: __('Grid', 'gutenverse'),
                    value: 'grid',
                    icon: <Grid />,
                },
                {
                    label: __('Video', 'gutenverse'),
                    value: 'video',
                    icon: <Video />,
                },
            ],
        },
        {
            id: 'imageId',
            label: __('Image', 'gutenverse'),
            description: __('Description of Control', 'gutenverse'),
            component: ImageControl,
        },
        {
            id: 'color',
            label: __('Color Control', 'gutenverse'),
            description: __('Icon Radio Control', 'gutenverse'),
            component: ColorControl,
        },
        {
            id: 'typography',
            label: __('Typography', 'gutenverse'),
            description: __('Description of Control', 'gutenverse'),
            component: TypographyControl,
        },
        {
            id: 'icon',
            label: __('Icon Control', 'gutenverse'),
            description: __('Icon Control', 'gutenverse'),
            component: IconControl,
            allowDeviceControl: true,
        },
        {
            id: 'repeater',
            label: __('Repeater Control', 'gutenverse'),
            component: RepeaterControl,
            repeaterDefault: {
                text: 'Default Title'
            },
            default: [{
                text: 'Gold 1'
            }, {
                text: 'Gold 2'
            }, {
                text: 'Gold 3'
            }],
            titleFormat: '<strong><%= value.text%></strong>',
            description: __('Repeater Control', 'gutenverse'),
            options: [
                {
                    component: TextControl,
                    props: {
                        id: 'text',
                        label: __('Text Control', 'gutenverse'),
                        description: __('Icon Radio Control', 'gutenverse')
                    },
                },
                {
                    component: CheckboxControl,
                    props: {
                        id: 'checkbox',
                        label: __('Checkbox', 'gutenverse'),
                        description: __('Icon Radio Control', 'gutenverse')
                    },
                },
            ],
        },

    ];
};