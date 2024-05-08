import { __ } from '@wordpress/i18n';
import { handleUnitPoint, DeviceLoop } from 'gutenverse-core/styling';
import { SelectControl, SizeControl } from 'gutenverse-core/controls';
import isEmpty from 'lodash/isEmpty';
import { getDeviceType } from 'gutenverse-core/editor-helper';

export const displayPanel = (props) => {
    const {
        elementId,
        selector,
        displayType
    } = props;

    const deviceType = getDeviceType();
    const customSelector = !isEmpty(selector) ? selector : `.${elementId}.guten-element`;

    return [
        {
            id: 'displayType',
            label: __('Display Type', '--gctd--'),
            component: SelectControl,
            options: [
                {
                    value: 'block',
                    label: 'Block'
                },
                {
                    value: 'flex',
                    label: 'Flex'
                },
                {
                    value: 'inline',
                    label: 'Inline'
                },
                {
                    value: 'inline-block',
                    label: 'Inline Block'
                },
                {
                    value: 'grid',
                    label: 'Grid'
                },
                {
                    value: 'none',
                    label: 'None'
                },
            ],
            style: [
                {
                    selector: customSelector,
                    render: value => {
                        return `display: ${value};`;
                    }
                },
                {
                    selector: `${customSelector} .block-editor-inner-blocks, ${customSelector} .block-editor-block-list__layout`,
                    allowRender: value => value && value === 'inline',
                    render: value => `display: ${value};`
                },
            ]
        },
        {
            id: 'displayWidth',
            label: __('Custom Width', '--gctd--'),
            show: !!displayType && ['block', 'flex', 'grid'].includes(displayType),
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
                    allowRender: () => displayType && ['block', 'flex', 'grid'].includes(displayType),
                    render: value => handleUnitPoint(value, 'width', true)
                }
            ]
        },
        {
            id: 'displayHeight',
            label: __('Custom Height', '--gctd--'),
            show: !!displayType && ['block', 'flex', 'inline-block', 'grid'].includes(displayType),
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
                vh: {
                    text: 'vh',
                    min: 1,
                    max: 100,
                    step: 1,
                    unit: 'vh',
                },
            },
            style: [
                {
                    selector: customSelector,
                    allowRender: () => displayType && ['block', 'flex', 'inline-block', 'grid'].includes(displayType),
                    render: value => handleUnitPoint(value, 'height')
                }
            ]
        },
        {
            id: 'innerWrapWidth',
            label: __('Inner Wrap Width', '--gctd--'),
            component: SelectControl,
            allowDeviceControl: true,
            options: [
                {
                    label: 'Default',
                    value: 'auto'
                },
                {
                    label: 'Inherit',
                    value: 'inherit'
                },
                {
                    label: 'Full-Width',
                    value: '100%'
                },
            ],
            style: [
                {
                    selector: `.${elementId}.guten-element .guten-inner-wrap`,
                    render: value => `width: ${value}`
                }
            ]
        },
        {
            id: 'horizontalAlign',
            label: __('Horizontal Align', '--gctd--'),
            component: SelectControl,
            show: !!displayType && ['flex', 'grid'].includes(displayType),
            allowDeviceControl: true,
            options: [
                {
                    label: 'Default',
                    value: 'default'
                },
                {
                    label: 'Start',
                    value: 'flex-start'
                },
                {
                    label: 'Center',
                    value: 'center'
                },
                {
                    label: 'End',
                    value: 'flex-end'
                },
                {
                    label: 'Space Between',
                    value: 'space-between'
                },
                {
                    label: 'Space Around',
                    value: 'space-around'
                },
                {
                    label: 'Space Evenly',
                    value: 'space-evenly'
                },
            ],
            style: [
                {
                    selector: customSelector,
                    allowRender: value => value[deviceType] && value[deviceType] !== 'default' && ['flex', 'grid'].includes(displayType),
                    render: value => {
                        if (value === 'default') {
                            return null;
                        } else {
                            return `justify-content: ${value};`;
                        }
                    }
                }
            ]
        },
        {
            id: 'verticalAlign',
            label: __('Vertical Align', '--gctd--'),
            component: SelectControl,
            show: !!displayType && ['flex', 'grid'].includes(displayType),
            allowDeviceControl: true,
            options: [
                {
                    label: __('Default', '--gctd--'),
                    value: 'default'
                },
                {
                    label: __('Top', '--gctd--'),
                    value: 'flex-start'
                },
                {
                    label: __('Middle', '--gctd--'),
                    value: 'center'
                },
                {
                    label: __('Bottom', '--gctd--'),
                    value: 'flex-end'
                },
                {
                    label: __('Space Between', '--gctd--'),
                    value: 'space-between'
                },
                {
                    label: __('Space Around', '--gctd--'),
                    value: 'space-around'
                },
                {
                    label: __('Space Evenly', '--gctd--'),
                    value: 'space-evenly'
                },
            ],
            style: [
                {
                    selector: customSelector,
                    allowRender: value => value[deviceType] && value[deviceType] !== 'default' && ['flex', 'grid'].includes(displayType),
                    render: value => {
                        if (value === 'default') {
                            return null;
                        } else {
                            return `align-content: ${value}; align-items: ${value};`;
                        }
                    }
                }
            ]
        },
        {
            id: 'displayOverflow',
            label: __('Display Overflow', '--gctd--'),
            component: SelectControl,
            options: [
                {
                    value: 'inherit',
                    label: 'Default'
                },
                {
                    value: 'hidden',
                    label: 'Hidden'
                },
                {
                    value: 'visible',
                    label: 'Visible'
                },
                {
                    value: 'scroll',
                    label: 'Scroll'
                },
                {
                    value: 'auto',
                    label: 'Auto'
                },
            ],
            style: [
                {
                    selector: customSelector,
                    render: value => {
                        return `overflow: ${value};`;
                    }
                },
            ]
        },
    ];
};