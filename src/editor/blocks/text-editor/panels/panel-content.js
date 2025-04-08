import { __ } from '@wordpress/i18n';

import { ColorControl, IconRadioControl, RangeControl, SizeControl, TypographyControl, CheckboxControl, HeadingControl, SwitchControl } from 'gutenverse-core/controls';
import { handleColor, handleUnitPoint, handleTypography } from 'gutenverse-core/styling';
import {AlignLeft, AlignCenter, AlignRight, AlignJustify} from 'gutenverse-core/components';

export const panelContent = (props) => {
    const {
        elementId,
        containsAnchorTag,
        switcher,
        setSwitcher
    } = props;
    
    return [
        {
            id: 'enableHeading',
            label: __('Enable Heading Block', 'gutenverse'),
            component: CheckboxControl
        },
        {
            id: 'columns',
            label: __('Columns', 'gutenverse'),
            component: RangeControl,
            min: 1,
            max: 10,
            step: 1,
            allowDeviceControl: true,
            style: [
                {
                    selector: `.${elementId}`,
                    render: value => `columns: ${value};`
                },
            ],
        },
        {
            id: 'gap',
            label: __('Column Gap', 'gutenverse'),
            component: SizeControl,
            allowDeviceControl: true,
            position: ['top', 'right', 'bottom', 'left'],
            units: {
                px: {
                    text: 'px',
                    min: 1,
                    max: 200,
                    step: 1
                },
                em: {
                    text: 'em',
                    min: 0.1,
                    max: 3,
                    step: 0.1
                },
            },
            style: [
                {
                    selector: `.${elementId}`,
                    render: value => handleUnitPoint(value, 'column-gap')
                }
            ]
        },
        {
            id: 'alignment',
            label: __('Alignment', 'gutenverse'),
            component: IconRadioControl,
            allowDeviceControl: true,
            options: [
                {
                    label: __('Align Left', 'gutenverse'),
                    value: 'left',
                    icon: <AlignLeft/>,
                },
                {
                    label: __('Align Center', 'gutenverse'),
                    value: 'center',
                    icon: <AlignCenter/>,
                },
                {
                    label: __('Align Right', 'gutenverse'),
                    value: 'right',
                    icon: <AlignRight/>,
                },
                {
                    label: __('Align Justify', 'gutenverse'),
                    value: 'justify',
                    icon: <AlignJustify/>,
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
            id: 'textColor',
            label: __('Text Color', 'gutenverse'),
            component: ColorControl,
            style: [
                {
                    selector: `.${elementId}`,
                    render: value => handleColor(value, 'color')
                }
            ],
        },
        {
            id: 'typography',
            label: __('Typography', 'gutenverse'),
            component: TypographyControl,
            style: [
                {
                    selector: `.${elementId}`,
                    hasChild: true,
                    render: (value,id) => handleTypography(value, props, id)
                }
            ],
        },
        {
            id: 'linkHeader',
            component: HeadingControl,
            label: __('Link', 'gutenverse'),
            show: containsAnchorTag,
        },
        {
            id: '__linkHover',
            component: SwitchControl,
            show: containsAnchorTag,
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
            onChange: ({ __linkHover }) => setSwitcher({ ...switcher, state: __linkHover })
        },
        {
            id: 'linkColor',
            label: __('Link Color', 'gutenverse'),
            component: ColorControl,
            show: (!switcher.state || switcher.state === 'normal') && containsAnchorTag,
            style: [
                {
                    selector: `.${elementId} a`,
                    render: value => handleColor(value, 'color')
                }
            ],
        },
        {
            id: 'linkTypography',
            label: __('Link Typography', 'gutenverse'),
            component: TypographyControl,
            show: (!switcher.state || switcher.state === 'normal') && containsAnchorTag,
            style: [
                {
                    selector: `.${elementId} a`,
                    hasChild: true,
                    render: (value,id) => handleTypography(value, props, id)
                }
            ],
        },
        {
            id: 'linkColorHover',
            label: __('Link Color Hover', 'gutenverse'),
            component: ColorControl,
            show: (switcher.state === 'hover') && containsAnchorTag,
            style: [
                {
                    selector: `.${elementId} a:hover`,
                    render: value => handleColor(value, 'color')
                }
            ],
        },
        {
            id: 'linkTypographyHover',
            label: __('Link Typography Hover', 'gutenverse'),
            component: TypographyControl,
            show: (switcher.state === 'hover') && containsAnchorTag,
            style: [
                {
                    selector: `.${elementId} a:hover`,
                    hasChild: true,
                    render: (value,id) => handleTypography(value, props, id)
                }
            ],
        },
    ];
};