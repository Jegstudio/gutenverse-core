import { __ } from '@wordpress/i18n';
import { SelectControl, SizeControl, NumberControl, SVGRadioControl, HeadingControl } from 'gutenverse-core/controls';
import { getDeviceType } from 'gutenverse-core/editor-helper';
import { deviceStyleValue, handleAlignV, handleUnitPoint } from 'gutenverse-core/styling';
import { select } from '@wordpress/data';
import isEmpty from 'lodash/isEmpty';
import { checkIsParent } from 'gutenverse-core/helper';

const IconAlignSelfStart = () => {
    return <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M11.25 6.75L6.75 6.75L6.75 15L11.25 15L11.25 6.75ZM3 3L3 4.125L15 4.125L15 3L3 3Z" fill="currentColor" />
    </svg>;
};

const IconAlignSelfCenter = () => {
    return <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M9.375 11.25V15H8.25V11.25H3V6.75H8.25V3H9.375V6.75H14.625V11.25H9.375Z" fill="currentColor" />
    </svg>;
};

const IconAlignSelfEnd = () => {
    return <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M11.25 11.25L6.75 11.25L6.75 3L11.25 3L11.25 11.25ZM3 15L3 13.875L15 13.875L15 15L3 15Z" fill="currentColor" />
    </svg>;
};

const IconAlignSelfStretch = () => {
    return <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M3 15L3 13.875L15 13.875L15 15L3 15ZM7.5 12.75L7.5 5.25L10.5 5.25L10.5 12.75L7.5 12.75ZM3 3L3 4.125L15 4.125L15 3L3 3Z" fill="currentColor" />
    </svg>;
};

const IconOrderStart = () => {
    return <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M13.0926 9.55833L13.6926 9.55833L13.6926 8.35833L13.0926 8.35833L13.0926 8.95833L13.0926 9.55833ZM2.5 8.95833L2.06781 8.54215L1.66704 8.95833L2.06781 9.37452L2.5 8.95833ZM6.90441 5.24952L7.3206 4.81733L6.45622 3.98496L6.04003 4.41715L6.47222 4.83333L6.90441 5.24952ZM6.04003 13.4995L6.45622 13.9317L7.3206 13.0993L6.90442 12.6671L6.47222 13.0833L6.04003 13.4995ZM13.0926 8.95833L13.0926 8.35833L2.5 8.35833L2.5 8.95833L2.5 9.55833L13.0926 9.55833L13.0926 8.95833ZM2.5 8.95833L2.93219 9.37452L6.90441 5.24952L6.47222 4.83333L6.04003 4.41715L2.06781 8.54215L2.5 8.95833ZM2.5 8.95833L2.06781 9.37452L6.04003 13.4995L6.47222 13.0833L6.90442 12.6671L2.93219 8.54215L2.5 8.95833ZM15.5 14L16.1 14L16.1 3L15.5 3L14.9 3L14.9 14L15.5 14Z" fill="currentColor" />
    </svg>;
};

const IconOrderEnd = () => {
    return <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M4.90741 8.44167H4.30741L4.30741 9.64167H4.90741V9.04167V8.44167ZM15.5 9.04167L15.9322 9.45785L16.333 9.04167L15.9322 8.62548L15.5 9.04167ZM11.0956 12.7505L10.6794 13.1827L11.5438 14.015L11.96 13.5829L11.5278 13.1667L11.0956 12.7505ZM11.96 4.50048L11.5438 4.06829L10.6794 4.90066L11.0956 5.33285L11.5278 4.91667L11.96 4.50048ZM4.90741 9.04167V9.64167L15.5 9.64167V9.04167V8.44167L4.90741 8.44167V9.04167ZM15.5 9.04167L15.0678 8.62548L11.0956 12.7505L11.5278 13.1667L11.96 13.5829L15.9322 9.45785L15.5 9.04167ZM15.5 9.04167L15.9322 8.62548L11.96 4.50048L11.5278 4.91667L11.0956 5.33285L15.0678 9.45785L15.5 9.04167ZM2.5 4L1.9 4L1.9 15H2.5H3.1L3.1 4L2.5 4Z" fill="currentColor" />
    </svg>;
};

const IconOrderDot = () => {
    return <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M9 3C8.80109 3 8.61032 3.07902 8.46967 3.21967C8.32902 3.36032 8.25 3.55109 8.25 3.75C8.25 3.94891 8.32902 4.13968 8.46967 4.28033C8.61032 4.42098 8.80109 4.5 9 4.5C9.19891 4.5 9.38968 4.42098 9.53033 4.28033C9.67098 4.13968 9.75 3.94891 9.75 3.75C9.75 3.55109 9.67098 3.36032 9.53033 3.21967C9.38968 3.07902 9.19891 3 9 3ZM9 8.25C8.80109 8.25 8.61032 8.32902 8.46967 8.46967C8.32902 8.61032 8.25 8.80109 8.25 9C8.25 9.19891 8.32902 9.38968 8.46967 9.53033C8.61032 9.67098 8.80109 9.75 9 9.75C9.19891 9.75 9.38968 9.67098 9.53033 9.53033C9.67098 9.38968 9.75 9.19891 9.75 9C9.75 8.80109 9.67098 8.61032 9.53033 8.46967C9.38968 8.32902 9.19891 8.25 9 8.25ZM9 13.5C8.80109 13.5 8.61032 13.579 8.46967 13.7197C8.32902 13.8603 8.25 14.0511 8.25 14.25C8.25 14.4489 8.32902 14.6397 8.46967 14.7803C8.61032 14.921 8.80109 15 9 15C9.19891 15 9.38968 14.921 9.53033 14.7803C9.67098 14.6397 9.75 14.4489 9.75 14.25C9.75 14.0511 9.67098 13.8603 9.53033 13.7197C9.38968 13.579 9.19891 13.5 9 13.5Z" fill="#011627" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
    </svg>;
};

const IconSizeInitial = () => {
    return <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M8.75 3C5.43661 3 2.75 5.68661 2.75 9C2.75 12.3134 5.43661 15 8.75 15C12.0634 15 14.75 12.3134 14.75 9C14.75 5.68661 12.0634 3 8.75 3ZM8.75 13.9821C5.99911 13.9821 3.76786 11.7509 3.76786 9C3.76786 7.80804 4.18705 6.7125 4.88616 5.85536L11.8946 12.8638C11.0375 13.5629 9.94196 13.9821 8.75 13.9821ZM12.6138 12.1446L5.60536 5.13616C6.4625 4.43705 7.55804 4.01786 8.75 4.01786C11.5009 4.01786 13.7321 6.24911 13.7321 9C13.7321 10.192 13.3129 11.2875 12.6138 12.1446Z" fill="black" />
    </svg>;
};

const IconSizeGrow = () => {
    return <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clipPath="url(#clip0_273_2771)">
            <path d="M9.5 9.5H10V8.5H9.5V9V9.5ZM2.5 9L2.12371 8.67075L1.83562 9L2.12371 9.32925L2.5 9ZM4.74871 12.3293L5.07796 12.7055L5.83054 12.047L5.50129 11.6707L5.125 12L4.74871 12.3293ZM5.50129 6.32925L5.83054 5.95296L5.07796 5.29446L4.74871 5.67075L5.125 6L5.50129 6.32925ZM8.5 8.5H8V9.5H8.5V9V8.5ZM15.5 9L15.8763 9.32925L16.1644 9L15.8763 8.67075L15.5 9ZM12.4987 11.6707L12.1695 12.047L12.922 12.7055L13.2513 12.3293L12.875 12L12.4987 11.6707ZM13.2513 5.67075L12.922 5.29446L12.1695 5.95296L12.4987 6.32925L12.875 6L13.2513 5.67075ZM9.5 9V8.5L2.5 8.5V9V9.5L9.5 9.5V9ZM2.5 9L2.12371 9.32925L4.74871 12.3293L5.125 12L5.50129 11.6707L2.87629 8.67075L2.5 9ZM2.5 9L2.87629 9.32925L5.50129 6.32925L5.125 6L4.74871 5.67075L2.12371 8.67075L2.5 9ZM8.5 9V9.5L15.5 9.5V9V8.5L8.5 8.5V9ZM15.5 9L15.1237 8.67075L12.4987 11.6707L12.875 12L13.2513 12.3293L15.8763 9.32925L15.5 9ZM15.5 9L15.8763 8.67075L13.2513 5.67075L12.875 6L12.4987 6.32925L15.1237 9.32925L15.5 9ZM1 3L0.5 3L0.500001 15H1H1.5L1.5 3L1 3ZM17 3H16.5V15H17H17.5V3H17Z" fill="currentColor" />
        </g>
        <defs>
            <clipPath id="clip0_273_2771">
                <rect width="18" height="18" fill="white" />
            </clipPath>
        </defs>
    </svg>;
};

const IconSizeShrink = () => {
    return <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clipPath="url(#clip0_273_2774)">
            <path d="M-0.25 8.5H-0.75L-0.75 9.5H-0.25L-0.25 9L-0.25 8.5ZM6.38158 9L6.73606 9.35262L7.08683 9L6.73606 8.64738L6.38158 9ZM3.54025 11.1474L3.18763 11.5019L3.8966 12.2071L4.24922 11.8526L3.89474 11.5L3.54025 11.1474ZM4.24922 6.14738L3.8966 5.7929L3.18763 6.49813L3.54025 6.85262L3.89474 6.5L4.24922 6.14738ZM17.75 9.5H18.25V8.5H17.75V9V9.5ZM11.1184 9L10.7639 8.64738L10.4132 9L10.7639 9.35262L11.1184 9ZM13.2508 11.8526L13.6034 12.2071L14.3124 11.5019L13.9597 11.1474L13.6053 11.5L13.2508 11.8526ZM13.9597 6.85262L14.3124 6.49813L13.6034 5.7929L13.2508 6.14738L13.6053 6.5L13.9597 6.85262ZM-0.25 9L-0.25 9.5L6.38158 9.5V9V8.5L-0.25 8.5L-0.25 9ZM6.38158 9L6.02709 8.64738L3.54025 11.1474L3.89474 11.5L4.24922 11.8526L6.73606 9.35262L6.38158 9ZM6.38158 9L6.73606 8.64738L4.24922 6.14738L3.89474 6.5L3.54025 6.85262L6.02709 9.35262L6.38158 9ZM17.75 9V8.5L11.1184 8.5V9V9.5L17.75 9.5V9ZM11.1184 9L10.7639 9.35262L13.2508 11.8526L13.6053 11.5L13.9597 11.1474L11.4729 8.64738L11.1184 9ZM11.1184 9L11.4729 9.35262L13.9597 6.85262L13.6053 6.5L13.2508 6.14738L10.7639 8.64738L11.1184 9ZM8.75 4L8.25 4L8.25 14H8.75H9.25L9.25 4L8.75 4Z" fill="currentColor" />
        </g>
        <defs>
            <clipPath id="clip0_273_2774">
                <rect width="18" height="18" fill="white" />
            </clipPath>
        </defs>
    </svg>;
};

const IconSizeDot = () => {
    return <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M9 3C8.80109 3 8.61032 3.07902 8.46967 3.21967C8.32902 3.36032 8.25 3.55109 8.25 3.75C8.25 3.94891 8.32902 4.13968 8.46967 4.28033C8.61032 4.42098 8.80109 4.5 9 4.5C9.19891 4.5 9.38968 4.42098 9.53033 4.28033C9.67098 4.13968 9.75 3.94891 9.75 3.75C9.75 3.55109 9.67098 3.36032 9.53033 3.21967C9.38968 3.07902 9.19891 3 9 3ZM9 8.25C8.80109 8.25 8.61032 8.32902 8.46967 8.46967C8.32902 8.61032 8.25 8.80109 8.25 9C8.25 9.19891 8.32902 9.38968 8.46967 9.53033C8.61032 9.67098 8.80109 9.75 9 9.75C9.19891 9.75 9.38968 9.67098 9.53033 9.53033C9.67098 9.38968 9.75 9.19891 9.75 9C9.75 8.80109 9.67098 8.61032 9.53033 8.46967C9.38968 8.32902 9.19891 8.25 9 8.25ZM9 13.5C8.80109 13.5 8.61032 13.579 8.46967 13.7197C8.32902 13.8603 8.25 14.0511 8.25 14.25C8.25 14.4489 8.32902 14.6397 8.46967 14.7803C8.61032 14.921 8.80109 15 9 15C9.19891 15 9.38968 14.921 9.53033 14.7803C9.67098 14.6397 9.75 14.4489 9.75 14.25C9.75 14.0511 9.67098 13.8603 9.53033 13.7197C9.38968 13.579 9.19891 13.5 9 13.5Z" fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
    </svg>;
};

export const positioningPanel = (props) => {
    const {
        clientId,
        elementId,
        positioningType,
        positioningWidth,
        positioningLocation,
        selector,
        options = [
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
        inBlock = true,
        flexOrder = {},
        flexSize = {},
    } = props;

    const setPositioning = (value, width = false) => {
        switch (value) {
            case 'full':
                return 'width: 100%!important;';
            case 'inline':
                return `width: auto!important; display: ${inBlock ? 'inline-block' : 'inline-flex'}!important;`;
            case 'custom':
                return `${handleUnitPoint(width, 'width', true)} display: ${inBlock ? 'inline-block' : 'inline-flex'}!important;`;
        }
    };

    const blockName = select('core/block-editor').getBlockName(clientId);
    const deviceType = getDeviceType();
    const checkSelector = !isEmpty(selector) ? selector : `.${elementId}.guten-element`;
    const customSelector = blockName !== 'gutenverse/section' ? checkSelector : `.section-wrapper[data-id="${elementId?.split('-')[1]}"]`;

    // Flex Item Logic
    const isOrderCustom = flexOrder[deviceType] === 'custom';
    const isSizeCustom = flexSize[deviceType] === 'custom';

    // Parent Check
    const isParentContainer = checkIsParent(clientId, 'gutenverse/container');

    return [
        {
            id: 'positioningType',
            label: __('Width', '--gctd--'),
            component: SelectControl,
            allowDeviceControl: true,
            options: options,
            style: [
                {
                    selector: customSelector,
                    allowRender: value => value && ['full', 'inline'].includes(deviceStyleValue(deviceType, value)),
                    render: value => setPositioning(value)
                },
                {
                    selector: customSelector,
                    updateID: 'positioningWidth-style-0',
                    allowRender: value => value && !isEmpty(positioningWidth) && deviceStyleValue(deviceType, positioningWidth) && deviceStyleValue(deviceType, value) === 'custom',
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
            ],
            liveStyle: [
                {
                    'type': 'positioning',
                    'id': 'positioningWidth',
                    'selector': `.${elementId}.guten-element`,
                    'skipDeviceType': 'first',
                    'attributeType': 'width',
                    'multiAttr': {
                        'positioningWidth': positioningWidth,
                        'positioningType': positioningType,
                        'inBlock': inBlock
                    }
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
                    allowRender: value => value && positioningLocation !== 'default',
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
            ],
            liveStyle: [
                {
                    'type': 'positioning',
                    'id': 'positioningLeft',
                    'properties': [
                        {
                            'name': 'left',
                            'valueType': 'direct'
                        }
                    ],
                    'responsive': true,
                    'selector': `.${elementId}.guten-element`,
                    'attributeType': 'custom',
                }
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
            ],
            liveStyle: [
                {
                    'type': 'positioning',
                    'id': 'positioningRight',
                    'properties': [
                        {
                            'name': 'right',
                            'valueType': 'direct'
                        }
                    ],
                    'responsive': true,
                    'selector': `.${elementId}.guten-element`,
                    'attributeType': 'custom',
                }
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
                    render: value => handleUnitPoint(value, 'top'),
                },
            ],
            liveStyle: [
                {
                    'type': 'positioning',
                    'id': 'positioningTop',
                    'properties': [
                        {
                            'name': 'top',
                            'valueType': 'direct'
                        }
                    ],
                    'responsive': true,
                    'selector': `.${elementId}.guten-element`,
                    'attributeType': 'custom',
                }
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
                    render: value => handleUnitPoint(value, 'bottom'),
                },
            ],
            liveStyle: [
                {
                    'type': 'positioning',
                    'id': 'positioningBottom',
                    'properties': [
                        {
                            'name': 'bottom',
                            'valueType': 'direct'
                        }
                    ],
                    'responsive': true,
                    'selector': `.${elementId}.guten-element`,
                    'attributeType': 'custom',
                }
            ]
        },
        {
            id: 'itemsHeading',
            component: HeadingControl,
            label: __('Flex Item', 'gutenverse'),
            show: isParentContainer,
        },
        {
            id: 'flexAlignSelf',
            label: __('Align Self', '--gctd--'),
            component: SVGRadioControl,
            allowDeviceControl: true,
            options: [
                {
                    tooltips: __('Start', '--gctd--'),
                    value: 'flex-start',
                    svg: <IconAlignSelfStart />
                },
                {
                    tooltips: __('Center', '--gctd--'),
                    value: 'center',
                    svg: <IconAlignSelfCenter />
                },
                {
                    tooltips: __('End', '--gctd--'),
                    value: 'flex-end',
                    svg: <IconAlignSelfEnd />
                },
                {
                    tooltips: __('Stretch', '--gctd--'),
                    value: 'stretch',
                    svg: <IconAlignSelfStretch />
                },
            ]
        },
        {
            id: 'flexOrder',
            label: __('Order', '--gctd--'),
            component: SVGRadioControl,
            allowDeviceControl: true,
            options: [
                {
                    tooltips: __('Start', '--gctd--'),
                    value: 'start',
                    svg: <IconOrderStart />
                },
                {
                    tooltips: __('End', '--gctd--'),
                    value: 'end',
                    svg: <IconOrderEnd />
                },
                {
                    tooltips: __('Custom', '--gctd--'),
                    value: 'custom',
                    svg: <IconOrderDot />
                },
            ]
        },
        {
            id: 'flexCustomOrder',
            label: __('Custom Order', '--gctd--'),
            allowDeviceControl: true,
            component: NumberControl,
            show: isOrderCustom,
            step: 1
        },
        {
            id: 'flexSize',
            label: __('Size', '--gctd--'),
            component: SVGRadioControl,
            allowDeviceControl: true,
            options: [
                {
                    tooltips: __('None', '--gctd--'),
                    value: 'none',
                    svg: <IconSizeInitial />
                },
                {
                    tooltips: __('Grow', '--gctd--'),
                    value: 'grow',
                    svg: <IconSizeGrow />
                },
                {
                    tooltips: __('Shrink', '--gctd--'),
                    value: 'shirnk',
                    svg: <IconSizeShrink />
                },
                {
                    tooltips: __('Custom', '--gctd--'),
                    value: 'custom',
                    svg: <IconSizeDot />
                },
            ]
        },
        {
            id: 'flexSizeGrow',
            label: __('Flex Grow', '--gctd--'),
            allowDeviceControl: true,
            component: NumberControl,
            show: isSizeCustom,
            min: 0,
            step: 1
        },
        {
            id: 'flexSizeShrink',
            label: __('Flex Shrink', '--gctd--'),
            allowDeviceControl: true,
            component: NumberControl,
            show: isSizeCustom,
            min: 0,
            step: 1
        },
    ];
};