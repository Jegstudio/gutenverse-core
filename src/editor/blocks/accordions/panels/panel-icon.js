import { SelectControl } from 'gutenverse-core/controls';
import { __ } from '@wordpress/i18n';
import { RangeControl } from 'gutenverse-core/controls';
import { getDeviceType } from 'gutenverse-core/editor-helper';

export const panelIcon = (props) => {
    const {
        iconPosition,
        elementId,
        iconSpacing
    } = props;

    const deviceType = getDeviceType();

    return [
        {
            id: 'iconPosition',
            label: __('Icon Position'),
            component: SelectControl,
            options: [
                {
                    label: __('Left', 'gutenverse'),
                    value: 'left'
                },
                {
                    label: __('Right', 'gutenverse'),
                    value: 'right'
                },
            ],
            style: [
                {
                    selector: `.${elementId} .accordion-item .accordion-icon`,
                    allowRender: value => value === 'left' && iconSpacing,
                    updateID: 'iconSpacing-style-0',
                    render: () => `margin-right: ${iconSpacing[deviceType]}px;`
                },
                {
                    selector: `.${elementId} .accordion-item .accordion-icon`,
                    allowRender: value => value === 'right' && iconSpacing,
                    updateID: 'iconSpacing-style-1',
                    render: () => `margin-left: ${iconSpacing[deviceType]}px;`
                }
            ],
        },
        {
            id: 'iconSpacing',
            label: __('Icon Spacing', 'gutenverse'),
            component: RangeControl,
            min: 1,
            max: 200,
            step: 1,
            allowDeviceControl: true,
            unit: 'px',
            style: [
                {
                    selector: `.${elementId} .accordion-item .accordion-icon`,
                    allowRender: value => value && iconPosition === 'left',
                    render: value => `margin-right: ${value}px;`
                },
                {
                    selector: `.${elementId} .accordion-item .accordion-icon`,
                    allowRender: value => value && iconPosition === 'right',
                    render: value => `margin-left: ${value}px;`
                }
            ],
        },
    ];
};
