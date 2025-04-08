import { __ } from '@wordpress/i18n';
import { ColorControl, RangeControl } from 'gutenverse-core/controls';
import { handleColor } from 'gutenverse-core/styling';

export const panelIcon = (props) => {
    const {
        elementId
    } = props;

    return [
        {
            id: 'iconColor',
            label: __('Color', 'gutenverse'),
            component: ColorControl,
            style: [
                {
                    selector: `.${elementId} .guten-icon-list-item i`,
                    render: value => handleColor(value, 'color')
                }
            ]
        },
        {
            id: 'iconColorHover',
            label: __('Hover Color', 'gutenverse'),
            component: ColorControl,
            style: [
                {
                    selector: `.${elementId} .guten-icon-list-item:hover i`,
                    render: value => handleColor(value, 'color')
                }
            ]
        },
        {
            id: 'iconSize',
            label: __('Size', 'gutenverse'),
            component: RangeControl,
            allowDeviceControl: true,
            unit: 'px',
            min: 1,
            max : 100,
            step: 1,
            style: [
                {
                    selector: `.${elementId} .guten-icon-list-item i`,
                    render: value => `font-size: ${value}px;`
                }
            ]
        },
    ];
};

