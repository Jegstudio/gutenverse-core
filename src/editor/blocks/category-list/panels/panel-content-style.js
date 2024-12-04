
import { __ } from '@wordpress/i18n';
import { CheckboxControl, ColorControl, DimensionControl, IconControl, IconRadioControl, RangeControl, SelectControl, SelectSearchControl, SwitchControl, TextControl, TypographyControl } from 'gutenverse-core/controls';
import { addQueryArgs } from '@wordpress/url';
import apiFetch from '@wordpress/api-fetch';
import { isOnEditor } from 'gutenverse-core/helper';
import { AlignCenter, AlignJustify, AlignLeft, AlignRight } from 'gutenverse-core/components';
import { handleColor, handleDimension, handleTypography } from 'gutenverse-core/styling';

export const contentStylePanel = (props) => {
    const {
        elementId,
        layout,
        switcher,
        setSwitcher,
        contentAlignment
    } = props;

    const optionAlign = () => {
        if( layout === 'column' ){
            return [
                {
                    label: __('Align Left', 'gutenverse'),
                    value: 'flex-start',
                    icon: <AlignLeft />,
                },
                {
                    label: __('Align Center', 'gutenverse'),
                    value: 'center',
                    icon: <AlignCenter />,
                },
                {
                    label: __('Align Right', 'gutenverse'),
                    value: 'flex-end',
                    icon: <AlignRight />,
                },
            ]
        }else{
            return [
                {
                    label: __('Align Left', 'gutenverse'),
                    value: 'flex-start',
                    icon: <AlignLeft />,
                },
                {
                    label: __('Align Center', 'gutenverse'),
                    value: 'center',
                    icon: <AlignCenter />,
                },
                {
                    label: __('Align Right', 'gutenverse'),
                    value: 'flex-end',
                    icon: <AlignRight />,
                },
                {
                    label: __('Space Between', 'gutenverse'),
                    value: 'space-between',
                    icon: <AlignJustify />,
                },
            ]
        }
    }
    return [
        {
            id: 'contentAlignment',
            label: __('Content Alignment', 'gutenverse'),
            allowDeviceControl: true,
            component: IconRadioControl,
            options: optionAlign(),
            style: [
                {
                    selector: `.${elementId} .category-list-wrapper`,
                    allowRender: () => layout === 'column' && contentAlignment !== 'space-between',
                    render: value => `align-items: ${value}; `
                },
                {
                    selector: `.${elementId} .category-list-wrapper`,
                    allowRender: () => layout === 'row',
                    render: value => `justify-content: ${value}; `
                },
            ]
        },
        {
            id: 'contentMargin',
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
                    selector: `.${elementId} .category-list-wrapper .category-list-item`,
                    render: value => handleDimension(value, 'margin')
                }
            ]
        },
        {
            id: 'contentPadding',
            label: __('Padding', 'gutenverse'),
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
                    selector: `.${elementId} .category-list-wrapper .category-list-item`,
                    render: value => handleDimension(value, 'padding')
                }
            ]
        },
        {
            id: 'contentTypography',
            label: __('Content Typography', 'gutenverse'),
            component: TypographyControl,
            style: [
                {
                    selector: `.${elementId} .category-list-wrapper .category-list-item a .category-list-content`,
                    hasChild: true,
                    render: (value,id) => handleTypography(value, props, id)
                }
            ],
        },
        {
            id: '__contentSwitch',
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
            onChange: ({ __contentSwitch }) => setSwitcher({ ...switcher, contentSwitch: __contentSwitch })
        },
        {
            id: 'contentColor',
            label: __('Content Color', 'gutenverse'),
            component: ColorControl,
            show: !switcher.contentSwitch || switcher.contentSwitch === 'normal',
            style: [
                {
                    selector: `.${elementId} .category-list-wrapper .category-list-item a`,
                    render: value => handleColor(value, 'color')
                }
            ]
        },
        {
            id: 'contentColorHover',
            label: __('Content Color', 'gutenverse'),
            component: ColorControl,
            show: switcher.contentSwitch === 'hover',
            style: [
                {
                    selector: `.${elementId} .category-list-wrapper .category-list-item a:hover`,
                    render: value => handleColor(value, 'color')
                }
            ]
        },
    ];
};
