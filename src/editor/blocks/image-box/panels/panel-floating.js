import { __ } from '@wordpress/i18n';
import { RangeControl, SwitchControl } from 'gutenverse-core-editor/controls';

export const panelFloating = props => {
    const {
        elementId,
        switcher,
        setSwitcher,
    } = props;

    return [
        {
            id: 'floatMarginTop',
            label: __('Margin Top', 'gutenverse'),
            component: RangeControl,
            min: -100,
            max: 100,
            step: 1,
            allowDeviceControl: true,
            style: [
                {
                    selector: `.${elementId}.style-floating .image-box-body .body-inner`,
                    render: value => `margin-top: ${value}px;`
                }
            ]
        },
        {
            id: 'floatWidth',
            label: __('Width', 'gutenverse'),
            component: RangeControl,
            min: 1,
            max: 100,
            step: 1,
            allowDeviceControl: true,
            style: [
                {
                    selector: `.${elementId}.style-floating .image-box-body`,
                    render: value => `width: ${value}%;`
                }
            ]
        },
        {
            id: '__imageBoxFloat',
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
            onChange: ({__imageBoxFloat}) => setSwitcher({...switcher, imageBoxFloat: __imageBoxFloat})
        },
        {
            id: 'floatHeight',
            show: !switcher.imageBoxFloat || switcher.imageBoxFloat === 'normal',
            label: __('Normal Height', 'gutenverse'),
            component: RangeControl,
            min: 1,
            max: 500,
            step: 1,
            allowDeviceControl: true,
            style: [
                {
                    selector: `.${elementId}.style-floating .image-box-body .body-inner`,
                    render: value => `height: ${value}px;`
                }
            ]
        },
        {
            id: 'floatHeightHover',
            show: switcher.imageBoxFloat === 'hover',
            label: __('Hover Height', 'gutenverse'),
            component: RangeControl,
            min: 1,
            max: 500,
            step: 1,
            allowDeviceControl: true,
            style: [
                {
                    selector: `.${elementId}.style-floating:hover .image-box-body .body-inner`,
                    render: value => `height: ${value}px;`
                }
            ]
        },
    ];
};