import { SelectControl } from 'gutenverse-core/controls';
import { __ } from '@wordpress/i18n';
import { ColorControl, IconControl, RangeControl, SwitchControl } from 'gutenverse-core/controls';
import { handleColor } from 'gutenverse-core/controls';
import { getDeviceType } from 'gutenverse-core/editor-helper';

export const panelIcon = (props) => {
    const {
        iconPosition,
        elementId,
        iconSpacing,
        switcher,
        setSwitcher
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
        {
            id: 'iconSize',
            label: __('Icon Size', 'gutenverse'),
            component: RangeControl,
            min: 1,
            max: 200,
            step: 1,
            allowDeviceControl: true,
            style: [
                {
                    selector: `.${elementId} .accordion-item .accordion-icon`,
                    render: value => `font-size: ${value}px;`
                }
            ],
        },
        {
            id: '__accIconActive',
            component: SwitchControl,
            options: [
                {
                    value: 'normal',
                    label: 'Normal'
                },
                {
                    value: 'active',
                    label: 'Active'
                }
            ],
            onChange: ({__accIconActive}) => setSwitcher({...switcher, accIcon: __accIconActive})
        },
        {
            id: 'iconClosed',
            show: !switcher.accIcon || switcher.accIcon === 'normal',
            label: __('Normal Icon', 'gutenverse'),
            component: IconControl,
        },
        {
            id: 'iconOpen',
            show: switcher.accIcon === 'active',
            label: __('Active Icon', 'gutenverse'),
            component: IconControl,
        },
        {
            id: 'iconColor',
            show: !switcher.accIcon || switcher.accIcon === 'normal',
            label: __('Normal Icon Color', 'gutenverse'),
            component: ColorControl,
            style: [
                {
                    selector: `.${elementId} .accordion-item .accordion-icon i`,
                    render: value => handleColor(value, 'color')
                }
            ],
        },
        {
            id: 'iconActiveColor',
            show: switcher.accIcon === 'active',
            label: __('Active Icon Color', 'gutenverse'),
            component: ColorControl,
            style: [
                {
                    selector: `.${elementId} .accordion-item.active .accordion-icon i`,
                    render: value => handleColor(value, 'color')
                }
            ],
        },
    ];
};
