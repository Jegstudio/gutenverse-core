import { __ } from '@wordpress/i18n';
import { handleAlignV, handleUnitPoint, deviceStyleValue } from 'gutenverse-core/styling';
import { SelectControl, SizeControl } from 'gutenverse-core/controls';
import { getDeviceType } from 'gutenverse-core/editor-helper';
import { select } from '@wordpress/data';
import isEmpty from 'lodash/isEmpty';

export const positioningPanel = (props) => {
    const {
        clientId,
        elementId,
        positioningType,
        positioningWidth,
        positioningLocation,
        selector,
    } = props;

    const setPositioning = (value, width = false) => {
        switch (value) {
            case 'full':
                return 'width: 100%!important;';
            case 'inline':
                return 'width: auto!important; display: inline-block!important;';
            case 'custom':
                return `${handleUnitPoint(width, 'width', true)} display: inline-block!important;`;
        }
    };

    const blockName = select('core/block-editor').getBlockName(clientId);
    const deviceType = getDeviceType();
    const checkSelector = !isEmpty(selector) ? selector : `.${elementId}.guten-element`;
    const customSelector = blockName !== 'gutenverse/section' ? checkSelector : `.section-wrapper[data-id="${elementId?.split('-')[1]}"]`;

    return [
        {
            id: 'positioningType',
            label: __('Width', '--gctd--'),
            component: SelectControl,
            allowDeviceControl: true,
            options: [
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
            style: [
                {
                    selector: customSelector,
                    allowRender: value => value && ['full', 'inline'].includes(deviceStyleValue(deviceType, value)),
                    render: value => setPositioning(value)
                },
                {
                    selector: customSelector,
                    updateID: 'positioningWidth-style-0',
                    allowRender: value => value && !isEmpty( positioningWidth ) && deviceStyleValue(deviceType, positioningWidth) && deviceStyleValue(deviceType, value) === 'custom',
                    render: value => setPositioning(value, deviceStyleValue(deviceType, positioningWidth))
                }
            ]
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
            style: [
                {
                    selector: customSelector,
                    allowRender: () => positioningType && deviceStyleValue(deviceType, positioningType) === 'custom',
                    render: value => setPositioning(deviceStyleValue(deviceType, positioningType), value)
                }
            ]
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
            style: [
                {
                    selector: customSelector,
                    render: value => `align-self: ${value};`
                },
                {
                    selector: customSelector,
                    render: value => `vertical-align: ${handleAlignV(value)};`
                }
            ]
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
            style: [
                {
                    selector: customSelector,
                    allowRender: value => value && value !== 'default',
                    render: value => `position: ${value};`
                }
            ]
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
            style: [
                {
                    selector: customSelector,
                    allowRender: () => positioningLocation && positioningLocation !== 'default',
                    render: value => handleUnitPoint(value, 'left')
                },
            ]
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
            style: [
                {
                    selector: customSelector,
                    allowRender: () => positioningLocation && positioningLocation !== 'default',
                    render: value => handleUnitPoint(value, 'right')
                },
            ]
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
            style: [
                {
                    selector: customSelector,
                    allowRender: () => positioningLocation && positioningLocation !== 'default',
                    render: value => handleUnitPoint(value, 'top')
                },
            ]
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
            style: [
                {
                    selector: customSelector,
                    allowRender: () => positioningLocation && positioningLocation !== 'default',
                    render: value => handleUnitPoint(value, 'bottom')
                },
            ]
        }
    ];
};