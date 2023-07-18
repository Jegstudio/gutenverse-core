import { __ } from '@wordpress/i18n';

import { ColorControl, IconRadioControl, RangeControl, SizeControl, TypographyControl } from 'gutenverse-core/controls';
import { handleColor, handleUnitPoint, handleTypography } from 'gutenverse-core/styling';
import {AlignLeft, AlignCenter, AlignRight, AlignJustify} from 'react-feather';

export const panelContent = (props) => {
    const {
        elementId,
    } = props;

    return [
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
    ];
};