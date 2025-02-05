import { __ } from '@wordpress/i18n';
import { SelectControl, SizeControl } from 'gutenverse-core/controls';
import { getDeviceType } from 'gutenverse-core/editor-helper';

export const positioningPanel = (props) => {
    const {
        positioningType,
        positioningLocation,
        options= [
            {
                value: 'default',
                label: 'Default'
            },
            {
                value: 'full',
                label: 'Full Width (100%)'
            },
            {
                value: 'inline',
                label: 'Inline (auto)'
            },
            {
                value: 'custom',
                label: 'Custom'
            }
        ],
    } = props;

    const deviceType = getDeviceType();

    return [
        {
            id: 'positioningType',
            label: __('Width', '--gctd--'),
            component: SelectControl,
            allowDeviceControl: true,
            options: options,
        },
        {
            id: 'positioningWidth',
            label: __('Custom Width', '--gctd--'),
            show: !!positioningType && positioningType[deviceType] === 'custom',
            component: SizeControl,
            allowDeviceControl: true,
            units: {
                px: {
                    text: 'px',
                    min: 1,
                    max: 1000,
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
                vw: {
                    text: 'vw',
                    min: 1,
                    max: 100,
                    step: 1,
                    unit: 'vw',
                },
            },
        },
        {
            id: 'positioningAlign',
            label: __('Align', '--gctd--'),
            show: !['fixed', 'absolute'].includes(positioningLocation),
            component: SelectControl,
            allowDeviceControl: true,
            options: [
                {
                    value: 'flex-start',
                    label: 'Top'
                },
                {
                    value: 'center',
                    label: 'Center'
                },
                {
                    value: 'flex-end',
                    label: 'Bottom'
                },
            ],
        },
        {
            id: 'positioningLocation',
            label: __('Location', '--gctd--'),
            component: SelectControl,
            options: [
                {
                    value: 'default',
                    label: 'Default'
                },
                {
                    value: 'fixed',
                    label: 'Fixed'
                },
                {
                    value: 'absolute',
                    label: 'Absolute'
                },
            ],
        },
        {
            id: 'positioningLeft',
            label: __('Left Orientation', '--gctd--'),
            show: ['fixed', 'absolute'].includes(positioningLocation),
            component: SizeControl,
            allowDeviceControl: true,
            units: {
                px: {
                    text: 'px',
                    min: -1000,
                    max: 1000,
                    step: 1,
                    unit: 'px',
                },
                ['%']: {
                    text: '%',
                    min: -200,
                    max: 200,
                    step: 1,
                    unit: '%',
                },
                vw: {
                    text: 'vw',
                    min: -200,
                    max: 200,
                    step: 1,
                    unit: 'vw',
                },
                vh: {
                    text: 'vw',
                    min: -200,
                    max: 200,
                    step: 1,
                    unit: 'vw',
                },
            },
        },
        {
            id: 'positioningRight',
            label: __('Right Orientation', '--gctd--'),
            show: ['fixed', 'absolute'].includes(positioningLocation),
            component: SizeControl,
            allowDeviceControl: true,
            units: {
                px: {
                    text: 'px',
                    min: -1000,
                    max: 1000,
                    step: 1,
                    unit: 'px',
                },
                ['%']: {
                    text: '%',
                    min: -200,
                    max: 200,
                    step: 1,
                    unit: '%',
                },
                vw: {
                    text: 'vw',
                    min: -200,
                    max: 200,
                    step: 1,
                    unit: 'vw',
                },
                vh: {
                    text: 'vw',
                    min: -200,
                    max: 200,
                    step: 1,
                    unit: 'vw',
                },
            },
        },
        {
            id: 'positioningTop',
            label: __('Top Orientation', '--gctd--'),
            show: ['fixed', 'absolute'].includes(positioningLocation),
            component: SizeControl,
            allowDeviceControl: true,
            units: {
                px: {
                    text: 'px',
                    min: -1000,
                    max: 1000,
                    step: 1,
                    unit: 'px',
                },
                ['%']: {
                    text: '%',
                    min: -200,
                    max: 200,
                    step: 1,
                    unit: '%',
                },
                vw: {
                    text: 'vw',
                    min: -200,
                    max: 200,
                    step: 1,
                    unit: 'vw',
                },
                vh: {
                    text: 'vw',
                    min: -200,
                    max: 200,
                    step: 1,
                    unit: 'vw',
                },
            },
        },
        {
            id: 'positioningBottom',
            label: __('Bottom Orientation', '--gctd--'),
            show: ['fixed', 'absolute'].includes(positioningLocation),
            component: SizeControl,
            allowDeviceControl: true,
            units: {
                px: {
                    text: 'px',
                    min: -1000,
                    max: 1000,
                    step: 1,
                    unit: 'px',
                },
                ['%']: {
                    text: '%',
                    min: -200,
                    max: 200,
                    step: 1,
                    unit: '%',
                },
                vw: {
                    text: 'vw',
                    min: -200,
                    max: 200,
                    step: 1,
                    unit: 'vw',
                },
                vh: {
                    text: 'vw',
                    min: -200,
                    max: 200,
                    step: 1,
                    unit: 'vw',
                },
            },
        }
    ];
};