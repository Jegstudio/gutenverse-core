
import { __ } from '@wordpress/i18n';
import { CheckboxControl, ColorControl, IconRadioControl, SelectControl } from 'gutenverse-core/controls';
import { AlignCenter, AlignLeft, AlignRight } from 'gutenverse-core/components';
import { handleColor } from 'gutenverse-core/styling';

export const generalPanel = ({ elementId, hoverBottom }) => {
    return [
        {
            id: 'alignButtons',
            label: __('Alignment', 'gutenverse'),
            component: IconRadioControl,
            allowDeviceControl: true,
            options: [
                {
                    label: __('Align Left', 'gutenverse'),
                    value: 'left',
                    icon: <AlignLeft />,
                },
                {
                    label: __('Align Center', 'gutenverse'),
                    value: 'center',
                    icon: <AlignCenter />,
                },
                {
                    label: __('Align Right', 'gutenverse'),
                    value: 'right',
                    icon: <AlignRight />,
                },
            ],
            style: [
                {
                    selector: `.${elementId}`,
                    render: value => `text-align: ${value};`
                }
            ]
        },
        {
            id: 'titleTag',
            label: __('Title HTML Tag', 'gutenverse'),
            component: SelectControl,
            options: [
                {
                    value: 'h1',
                    label: 'H1'
                },
                {
                    value: 'h2',
                    label: 'H2'
                },
                {
                    value: 'h3',
                    label: 'H3'
                },
                {
                    value: 'h4',
                    label: 'H4'
                },
                {
                    value: 'h5',
                    label: 'H5'
                },
                {
                    value: 'h6',
                    label: 'H6'
                },
                {
                    value: 'div',
                    label: 'Div'
                },
                {
                    value: 'span',
                    label: 'Span'
                },
                {
                    value: 'p',
                    label: 'P'
                },
            ],
        },
        {
            id: 'hoverBottom',
            label: __('Enable Hover Border Bottom', 'gutenverse'),
            component: CheckboxControl
        },
        {
            id: 'hoverBottomColor',
            show: hoverBottom,
            label: __('Border Bottom Color', 'gutenverse'),
            component: ColorControl,
            style: [
                {
                    selector: `.${elementId} .border-bottom .animated`,
                    allowRender: () => hoverBottom,
                    render: value => handleColor(value, 'background-color')
                }
            ]
        },
        {
            id: 'hoverBottomDirection',
            show: hoverBottom,
            label: __('Hover Direction', 'gutenverse'),
            component: SelectControl,
            options: [
                {
                    value: 'left',
                    label: 'From Left'
                },
                {
                    value: 'right',
                    label: 'From Right'
                },
            ]
        },
    ];
};