import { __ } from '@wordpress/i18n';
import { handleUnitPoint } from 'gutenverse-core/styling';
import { SelectControl, SizeControl } from 'gutenverse-core/controls';
import isEmpty from 'lodash/isEmpty';
import { getDeviceType } from 'gutenverse-core/editor-helper';

export const positionPanel = (props) => {
    const {
        elementId,
        selector,
        positionType
    } = props;

    const deviceType = getDeviceType();
    const customSelector = !isEmpty(selector) ? selector : `.${elementId}.guten-element`;

    return [
        {
            id: 'positionType',
            label: __('Position Type', '--gctd--'),
            component: SelectControl,
            allowDeviceControl: true,
            options: [
                {
                    value: 'static',
                    label: 'Static'
                },
                {
                    value: 'relative',
                    label: 'Relative'
                },
                {
                    value: 'absolute',
                    label: 'Absolute'
                },
                {
                    value: 'fixed',
                    label: 'Fixed'
                },
                {
                    value: 'sticky',
                    label: 'Sticky'
                },
            ],
            style: [
                {
                    selector: customSelector,
                    render: value => {
                        return `position: ${value};`;
                    }
                },
            ]
        },
        {
            id: 'positionLeft',
            label: __('Left Orientation', '--gctd--'),
            show: ['fixed', 'absolute', 'relative'].includes(positionType[deviceType]),
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
            },
            style: [
                {
                    selector: customSelector,
                    allowRender: () => positionType && positionType[deviceType] !== 'default',
                    render: value => handleUnitPoint(value, 'left')
                },
            ]
        },
        {
            id: 'positionRight',
            label: __('Right Orientation', '--gctd--'),
            show: ['fixed', 'absolute', 'relative'].includes(positionType[deviceType]),
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
                vh: {
                    text: 'vh',
                    min: -200,
                    max: 200,
                    step: 1,
                    unit: 'vh',
                },
            },
            style: [
                {
                    selector: customSelector,
                    allowRender: () => positionType && positionType[deviceType] !== 'default',
                    render: value => handleUnitPoint(value, 'right')
                },
            ]
        },
        {
            id: 'positionTop',
            label: __('Top Orientation', '--gctd--'),
            show: ['fixed', 'absolute', 'relative'].includes(positionType[deviceType]),
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
                vh: {
                    text: 'vh',
                    min: -200,
                    max: 200,
                    step: 1,
                    unit: 'vh',
                },
            },
            style: [
                {
                    selector: customSelector,
                    allowRender: () => positionType && positionType[deviceType] !== 'default',
                    render: value => handleUnitPoint(value, 'top'),
                },
            ]
        },
        {
            id: 'positionBottom',
            label: __('Bottom Orientation', '--gctd--'),
            show: ['fixed', 'absolute', 'relative'].includes(positionType[deviceType]),
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
                vh: {
                    text: 'vh',
                    min: -200,
                    max: 200,
                    step: 1,
                    unit: 'vh',
                },
            },
            style: [
                {
                    selector: customSelector,
                    allowRender: () => positionType && positionType[deviceType] !== 'default',
                    render: value => handleUnitPoint(value, 'bottom'),
                },
            ]
        }
    ];
};