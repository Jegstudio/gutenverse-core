import { __ } from '@wordpress/i18n';
import { DimensionControl, RangeControl } from 'gutenverse-core/controls';
import { handleDimension } from 'gutenverse-core/controls';

export const contentSpace = ({elementId}) => {
    return [
        {
            id: 'gap',
            label: __('Social Icon Gap', 'gutenverse'),
            component: RangeControl,
            default: 10,
            min: 1,
            max: 100,
            allowDeviceControl: true,
            style: [
                {
                    selector: `.${elementId}.horizontal > div:not(:first-child)`,
                    render: value => `margin-left: ${value}px;`
                },
                {
                    selector: `.${elementId}.vertical > div:not(:first-child)`,
                    render: value => `margin-top: ${value}px;`
                }
            ]
        },
        {
            id: 'itemPadding',
            label: __('Padding', 'gutenverse'),
            component: DimensionControl,
            allowDeviceControl: true,
            position: ['top', 'right', 'bottom', 'left'],
            units: {
                px: {
                    text: 'px',
                    unit: 'px'
                },
                '%': {
                    text: '%',
                    unit: '%'
                },
            },
            style: [
                {
                    selector: `.guten-social-icons.${elementId} .guten-social-icon a`,
                    render: value => handleDimension(value, 'padding')
                }
            ]
        },
    ];
};