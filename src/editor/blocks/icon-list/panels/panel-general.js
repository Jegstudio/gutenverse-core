
import { __ } from '@wordpress/i18n';
import { AlignCenter, AlignLeft, AlignRight } from 'react-feather';
import { CheckboxControl, IconRadioControl, RangeControl, SelectControl } from 'gutenverse-core-editor/controls';
import { handleAlign } from 'gutenverse-core/styling';

export const panelGeneral = (props) => {
    const {
        elementId
    } = props;

    return [
        {
            id: 'displayInline',
            label: __('Display Inline', 'gutenverse'),
            component: CheckboxControl,
        },
        {
            id: 'spaceBetween',
            label: __('Space Between', 'gutenverse'),
            component: RangeControl,
            allowDeviceControl: true,
            min: 1,
            max : 100,
            step: 1,
            style: [
                {
                    selector: `.${elementId}:not(.inline-icon-list) .guten-icon-list-item:not(:first-child),
                    .block-editor-block-list__layout .wp-block.${elementId}:not(.inline-icon-list) .guten-icon-list-item:not(:first-child)`,
                    render: value => `margin-top: calc(${value}px/2);`
                },
                {
                    selector: `.${elementId}:not(.inline-icon-list) .guten-icon-list-item:not(:last-child),
                    .block-editor-block-list__layout .wp-block.${elementId}:not(.inline-icon-list) .guten-icon-list-item:not(:last-child)`,
                    render: value => `padding-bottom: calc(${value}px/2);`
                },
                {
                    selector: `.${elementId}.inline-icon-list .guten-icon-list-item:not(:last-child),
                    .block-editor-block-list__layout .wp-block.${elementId}.inline-icon-list .guten-icon-list-item:not(:last-child)`,
                    render: value => `margin-right: ${value}px;`
                }
            ]
        },
        {
            id: 'alignList',
            label: __('Text Alignment', 'gutenverse'),
            allowDeviceControl: true,
            component: IconRadioControl,
            options: [
                {
                    label: __('Align Left', 'gutenverse'),
                    value: 'flex-start',
                    icon: <AlignLeft/>,
                },
                {
                    label: __('Align Center', 'gutenverse'),
                    value: 'center',
                    icon: <AlignCenter/>,
                },
                {
                    label: __('Align Right', 'gutenverse'),
                    value: 'flex-end',
                    icon: <AlignRight/>,
                },
            ],
            style: [
                {
                    selector: `.${elementId}:not(.inline-icon-list)`,
                    render: value => `text-align: ${handleAlign(value)};`
                },
                {
                    selector: `.${elementId}.inline-icon-list, .${elementId}:not(.inline-icon-list) .guten-icon-list-item a`,
                    render: value => `justify-content: ${value};`
                },
            ]
        },
        {
            id: 'verticalAlign',
            label: __('Vertical Align'),
            component: SelectControl,
            options: [
                {
                    label: __('Top', 'gutenverse'),
                    value: 'flex-start'
                },
                {
                    label: __('Center', 'gutenverse'),
                    value: 'center'
                },
                {
                    label: __('Bottom', 'gutenverse'),
                    value: 'flex-end'
                },
            ],
            style: [
                {
                    selector: `.${elementId} a`,
                    render: (value) => `align-items: ${value};`
                },
            ],
        },
    ];
};

