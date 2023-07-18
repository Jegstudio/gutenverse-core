import { __ } from '@wordpress/i18n';

import { AlignCenter, AlignLeft, AlignRight } from 'react-feather';
import { CheckboxControl, DimensionControl, IconRadioControl, RangeControl, SelectControl, SizeControl } from 'gutenverse-core/controls';
import { handleDimension, handleUnitPoint } from 'gutenverse-core/styling';

export const buttonPanel = (props) => {
    const {
        elementId,
        showIcon,
        iconPosition,
        iconSpacing,
    } = props;

    return [
        {
            id: 'alignButton',
            label: __('Button Alignment', 'gutenverse'),
            component: IconRadioControl,
            allowDeviceControl: true,
            options: [
                {
                    label: __('Align Left', 'gutenverse'),
                    value: 'left',
                    icon: <AlignLeft/>,
                },
                {
                    label: __('Align Center', 'gutenverse'),
                    value: 'center',
                    icon: <AlignCenter/>,
                },
                {
                    label: __('Align Right', 'gutenverse'),
                    value: 'right',
                    icon: <AlignRight/>,
                },
            ],
            style: [
                {
                    selector: `.editor-styles-wrapper .${elementId}.guten-button-wrapper`,
                    render: value => `justify-content: ${value};`
                }
            ]
        },
        {
            id: 'role',
            label: __('Button Role'),
            component: SelectControl,
            options: [
                {
                    label: __('Link (Default)', 'gutenverse'),
                    value: 'link'
                },
                {
                    label: __('Submit', 'gutenverse'),
                    value: 'submit'
                },
            ]
        },
        {
            id: 'buttonType',
            label: __('Button Type'),
            component: SelectControl,
            options: [
                {
                    label: __('Default', 'gutenverse'),
                    value: 'default'
                },
                {
                    label: __('Info', 'gutenverse'),
                    value: 'info'
                },
                {
                    label: __('Success', 'gutenverse'),
                    value: 'success'
                },
                {
                    label: __('Warning', 'gutenverse'),
                    value: 'warning'
                },
                {
                    label: __('Danger', 'gutenverse'),
                    value: 'danger'
                },
            ]
        },
        {
            id: 'buttonSize',
            label: __('Button Size'),
            component: SelectControl,
            options: [
                {
                    label: __('Extra Small', 'gutenverse'),
                    value: 'xs'
                },
                {
                    label: __('Small', 'gutenverse'),
                    value: 'sm'
                },
                {
                    label: __('Medium', 'gutenverse'),
                    value: 'md'
                },
                {
                    label: __('Large', 'gutenverse'),
                    value: 'lg'
                },
                {
                    label: __('Extra Large', 'gutenverse'),
                    value: 'xl'
                },
            ]
        },
        {
            id: 'buttonWidth',
            label: __('Set Width', 'gutenverse'),
            description: __('width calculated in %', 'gutenverse'),
            component: RangeControl,
            allowDeviceControl: true,
            min: 0,
            max: 100,
            step: 1,
            style: [
                {
                    selector: `.editor-styles-wrapper .${elementId}.guten-button-wrapper .guten-button`,
                    render: value => `width: ${value}%;`
                }
            ]
        },
        {
            id: 'showIcon',
            label: __('Show Icon', 'gutenverse'),
            component: CheckboxControl,
        },
        {
            id: 'iconPosition',
            label: __('Icon Position'),
            show: showIcon,
            component: SelectControl,
            options: [
                {
                    label: __('Before', 'gutenverse'),
                    value: 'before'
                },
                {
                    label: __('After', 'gutenverse'),
                    value: 'after'
                },
            ],
            style: [
                {
                    selector: `.editor-styles-wrapper .${elementId}.guten-button-wrapper .guten-button i`,
                    allowRender: () => showIcon,
                    render: value => value === 'after' ? `margin-left: ${iconSpacing}px;` : `margin-right: ${iconSpacing}px;`
                }
            ]
        },
        {
            id: 'iconSpacing',
            label: __('Icon Spacing', 'gutenverse'),
            show: showIcon,
            component: RangeControl,
            allowDeviceControl: true,
            min: 0,
            max: 50,
            step: 1,
            style: [
                {
                    selector: `.editor-styles-wrapper .${elementId}.guten-button-wrapper .guten-button i`,
                    allowRender: () => showIcon,
                    render: value => iconPosition === 'after' ? `margin-left: ${value}px;` : `margin-right: ${value}px;`
                }
            ]
        },
        {
            id: 'iconSize',
            label: __('Icon Size', 'gutenverse'),
            component: SizeControl,
            allowDeviceControl: true,
            show: showIcon,
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
                    selector: `.editor-styles-wrapper .${elementId}.guten-button-wrapper .guten-button i`,
                    allowRender: () => showIcon,
                    render: value => handleUnitPoint(value, 'font-size')
                }
            ]
        },
        {
            id: 'paddingButton',
            label: __('Button Padding', 'gutenverse'),
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
            style: [
                {
                    selector: `.editor-styles-wrapper .${elementId}.guten-button-wrapper .guten-button`,
                    render: value => handleDimension(value, 'padding')
                }
            ]
        },
    ];
};