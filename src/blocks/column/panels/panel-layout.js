import { __ } from '@wordpress/i18n';
import { RangeColumnControl, SelectControl } from 'gutenverse-core/controls';
import { getDeviceType } from 'gutenverse-core/editor-helper';

export const layoutPanel = (props) => {
    const {
        elementId,
        clientId,
        setAttributes,
        addStyle,
    } = props;
    const deviceType = getDeviceType();

    const allowRender = value => {
        return value[deviceType] && value[deviceType] !== 'default';
    };

    const minWidth = {
        Desktop: 5,
        Tablet: 10,
        Mobile: 15,
    };

    const additionalProps = {
        elementId,
        clientId,
        addStyle,
        setAttributes
    };

    return [
        {
            id: 'width',
            label: __('Column Width', '--gctd--'),
            component: RangeColumnControl,
            min: minWidth[deviceType],
            step: 0.1,
            allowDeviceControl: true,
            additionalProps,
            style: [
                {
                    selector: `.${elementId}`,
                    render: value => `width: ${value}%;`
                }
            ]
        },
        {
            id: 'verticalAlign',
            label: __('Vertical Align', '--gctd--'),
            component: SelectControl,
            allowDeviceControl: true,
            options: [
                {
                    label: 'Default',
                    value: 'default'
                },
                {
                    label: 'Top',
                    value: 'flex-start'
                },
                {
                    label: 'Middle',
                    value: 'center'
                },
                {
                    label: 'Bottom',
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
                    selector: `.guten-section > .guten-container > .${elementId}.guten-column > .guten-column-resizeable > .sticky-wrapper > .guten-column-wrapper > .block-editor-inner-blocks > .block-editor-block-list__layout`,
                    // allowRender: value => allowRender(value),
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
            id: 'horizontalAlign',
            label: __('Horizontal Align', '--gctd--'),
            component: SelectControl,
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
                    selector: `.guten-section > .guten-container > .${elementId}.guten-column > .guten-column-resizeable > .sticky-wrapper > .guten-column-wrapper > .block-editor-inner-blocks > .block-editor-block-list__layout`,
                    // allowRender: value => allowRender(value),
                    render: value => {
                        if (value === 'default') {
                            return null;
                        } else {
                            return `justify-content: ${value};`;
                        }
                    }
                },
                {
                    selector: `.guten-section > .guten-container > .${elementId}.guten-column > .guten-column-resizeable > .sticky-wrapper > .guten-column-wrapper > .block-editor-inner-blocks`,
                    allowRender: value => allowRender(value),
                    render: value => {
                        if (value === 'default') {
                            return null;
                        } else {
                            return 'width: 100%;';
                        }
                    }
                }
            ]
        },
        {
            id: 'order',
            label: __('Column Order', '--gctd--'),
            component: SelectControl,
            allowDeviceControl: true,
            options: [
                {
                    label: '1',
                    value: 1
                },
                {
                    label: '2',
                    value: 2
                },
                {
                    label: '3',
                    value: 3
                },
                {
                    label: '4',
                    value: 4
                },
                {
                    label: '5',
                    value: 5
                },
                {
                    label: '6',
                    value: 6
                },
                {
                    label: '7',
                    value: 7
                },
                {
                    label: '8',
                    value: 8
                },
                {
                    label: '9',
                    value: 9
                },
                {
                    label: '10',
                    value: 10
                },
            ],
            style: [
                {
                    selector: `.${elementId}`,
                    render: value => `order: ${value};`
                }
            ]
        }
    ];
};