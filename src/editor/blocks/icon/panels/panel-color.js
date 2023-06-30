import { __ } from '@wordpress/i18n';
import { ColorControl, SwitchControl } from 'gutenverse-core/controls';
import { handleColor } from 'gutenverse-core/controls';

export const contentColor = (props) => {
    const {
        elementId,
        switcher,
        setSwitcher,
    } = props;

    return [
        {
            id: '__iconClr',
            component: SwitchControl,
            options: [
                {
                    value: 'normal',
                    label: 'Normal'
                },
                {
                    value: 'hover',
                    label: 'Hover'
                }
            ],
            onChange: ({__iconClr}) => setSwitcher({...switcher, iconClr: __iconClr})
        },
        {
            id: 'iconColorOne',
            show: !switcher.iconClr || switcher.iconClr === 'normal',
            label: __('Primary Color', 'gutenverse'),
            component: ColorControl,
            style: [
                {
                    selector: `.${elementId} .guten-icon-wrapper.framed i`,
                    render: value => handleColor(value, 'color')
                },
                {
                    selector: `.${elementId} .guten-icon-wrapper.framed`,
                    render: value => handleColor(value, 'border-color')
                },
                {
                    selector: `.${elementId} .guten-icon-wrapper.stacked`,
                    render: value => handleColor(value, 'background-color')
                }
            ],
        },
        {
            id: 'iconColorTwo',
            show: !switcher.iconClr || switcher.iconClr === 'normal',
            label: __('Secondary Color', 'gutenverse'),
            component: ColorControl,
            style: [
                {
                    selector: `.${elementId} .guten-icon-wrapper.stacked i`,
                    render: value => handleColor(value, 'color')
                },
                {
                    selector: `.${elementId} .guten-icon-wrapper.framed`,
                    render: value => handleColor(value, 'background-color')
                },
            ],
        },
        {
            id: 'iconColorHoverOne',
            show: switcher.iconClr === 'hover',
            label: __('Primary Hover Color', 'gutenverse'),
            component: ColorControl,
            style: [
                {
                    selector: `.${elementId} .guten-icon-wrapper.framed:hover i`,
                    render: value => handleColor(value, 'color')
                },
                {
                    selector: `.${elementId} .guten-icon-wrapper.framed:hover`,
                    render: value => handleColor(value, 'border-color')
                },
                {
                    selector: `.${elementId} .guten-icon-wrapper.stacked:hover`,
                    render: value => handleColor(value, 'background-color')
                }
            ]
        },
        {
            id: 'iconColorHoverTwo',
            show: switcher.iconClr === 'hover',
            label: __('Secondary Hover Color', 'gutenverse'),
            component: ColorControl,
            style: [
                {
                    selector: `.${elementId} .guten-icon-wrapper.stacked:hover i`,
                    render: value => handleColor(value, 'color')
                },
                {
                    selector: `.${elementId} .guten-icon-wrapper.framed:hover`,
                    render: value => handleColor(value, 'background-color')
                },
            ]
        },
    ];
};