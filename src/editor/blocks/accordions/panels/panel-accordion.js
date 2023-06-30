import { __ } from '@wordpress/i18n';
import { BorderControl, BoxShadowControl, DimensionControl, SwitchControl } from 'gutenverse-core/controls';
import { handleBorder, handleDimension } from 'gutenverse-core/controls';
import { allowRenderBoxShadow, handleBoxShadow } from 'gutenverse-core/controls';

export const panelAccordion = (props) => {
    const {
        elementId,
        switcher,
        setSwitcher
    } = props;

    return [
        {
            id: 'accordionMargin',
            label: __('Margin', 'gutenverse'),
            component: DimensionControl,
            position: ['top', 'right', 'bottom', 'left'],
            allowDeviceControl: true,
            units: {
                px: {
                    text: 'px',
                    unit: 'px'
                },
                em: {
                    text: 'em',
                    unit: 'em'
                },
                percent: {
                    text: '%',
                    unit: '%'
                },
            },
            style: [
                {
                    selector: `.${elementId} .accordion-item`,
                    render: value => handleDimension(value, 'margin')
                }
            ],
        },
        {
            id: '__accBorderHover',
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
            onChange: ({__accBorderHover}) => setSwitcher({...switcher, accBorder: __accBorderHover})
        },
        {
            id: 'accordionBorder',
            show: !switcher.accBorder || switcher.accBorder === 'normal',
            label: __('Border Type', 'gutenverse'),
            component: BorderControl,
            style: [
                {
                    selector: `.${elementId} .accordion-item`,
                    hasChild: true,
                    render: value => handleBorder(value)
                }
            ]
        },
        {
            id: 'accordionBorderActive',
            show: switcher.accBorder === 'active',
            label: __('Border Type', 'gutenverse'),
            component: BorderControl,
            style: [
                {
                    selector: `.${elementId} .accordion-item.active`,
                    hasChild: true,
                    render: value => handleBorder(value)
                }
            ]
        },
        {
            id: 'accordionBoxShadow',
            show: !switcher.accBorder || switcher.accBorder === 'normal',
            label: __('Box Shadow', 'gutenverse'),
            component: BoxShadowControl,
            style: [
                {
                    selector: `.${elementId} .accordion-item`,
                    allowRender: (value) => allowRenderBoxShadow(value),
                    render: value => handleBoxShadow(value)
                }
            ]
        },
        {
            id: 'accordionBoxShadowActive',
            show: switcher.accBorder === 'active',
            label: __('Box Shadow', 'gutenverse'),
            component: BoxShadowControl,
            style: [
                {
                    selector: `.${elementId} .accordion-item.active`,
                    allowRender: (value) => allowRenderBoxShadow(value),
                    render: value => handleBoxShadow(value)
                }
            ]
        },
    ];
};
