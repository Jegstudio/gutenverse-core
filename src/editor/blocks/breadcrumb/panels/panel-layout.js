import { __ } from '@wordpress/i18n';
import { AlignLeft, AlignCenter, AlignRight } from 'gutenverse-core/components';
import { DimensionControl, IconRadioControl, NumberControl, SelectControl, SizeControl } from 'gutenverse-core/controls';

export const layoutPanel = () => {

    return [
        {
            id: 'margin',
            label: __('Margin', 'gutenverse-news'),
            component: DimensionControl,
            allowDeviceControl: true,
            position: ['top', 'right', 'bottom', 'left'],
            units: {
                px: {
                    text: 'px',
                    unit: 'px'
                },
                em: {
                    text: 'em',
                    unit: 'em'
                },
                ['%']: {
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
            id: 'padding',
            label: __('Padding', 'gutenverse-news'),
            component: DimensionControl,
            allowDeviceControl: true,
            position: ['top', 'right', 'bottom', 'left'],
            units: {
                px: {
                    text: 'px',
                    unit: 'px'
                },
                em: {
                    text: 'em',
                    unit: 'em'
                },
                ['%']: {
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
            id: 'width',
            label: __('Width', 'gutenverse-news'),
            component: SizeControl,
            allowDeviceControl: true,
            units: {
                px: {
                    text: 'px',
                    min: 1,
                    max: 500,
                    step: 1,
                    unit: 'px',
                },
                ['%']: {
                    text: '%',
                    min: 1,
                    max: 100,
                    step: 1,
                    unit: '%',
                },
            },
        },
        {
            id: 'height',
            label: __('Height', 'gutenverse-news'),
            component: SizeControl,
            allowDeviceControl: true,
            units: {
                px: {
                    text: 'px',
                    min: 1,
                    max: 500,
                    step: 1,
                    unit: 'px',
                },
                ['%']: {
                    text: '%',
                    min: 1,
                    max: 100,
                    step: 1,
                    unit: '%',
                },
            },
        },
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
        },
        {
            id: 'verticalAlignment',
            label: __('Vertical Align', 'gutenverse'),
            component: SelectControl,
            allowDeviceControl: true,
            options: [
                {
                    label: __('Top'),
                    value: 'flex-start'
                },
                {
                    label: __('Middle'),
                    value: 'center'
                },
                {
                    label: __('Bottom'),
                    value: 'flex-end'
                },
            ],
        },
        {
            id: 'zIndex',
            label: __('Z Index', '--gctd--'),
            component: NumberControl,
            allowDeviceControl: true,
            min: 1,
            max: 9999,
            step: 1,
        },
    ];
};
