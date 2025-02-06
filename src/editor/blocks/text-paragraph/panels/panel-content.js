import { __ } from '@wordpress/i18n';

import { ColorControl, IconRadioControl, RangeControl, SizeControl, TypographyControl, CheckboxControl } from 'gutenverse-core/controls';
import { handleColor, handleUnitPoint, handleTypography } from 'gutenverse-core/styling';
import {AlignLeft, AlignCenter, AlignRight, AlignJustify} from 'gutenverse-core/components';

export const panelContent = (props) => {
    const {
        elementId,
        useStyleInLink = false,
    } = props;

    const linkStyle = useStyleInLink ? `
        , .guten-element.${elementId} a:not(.guten-text-highlight a), 
        .guten-element.${elementId} a:not(.guten-text-highlight a) *, 
        .guten-element.${elementId} a:hover:not(.guten-text-highlight a), 
        .guten-element.${elementId} a:hover:not(.guten-text-highlight a) *` : '';

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
                    selector: `.${elementId}${linkStyle}`,
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
                    selector: `.${elementId}${linkStyle}`,
                    hasChild: true,
                    render: (value,id) => handleTypography(value, props, id)
                }
            ],
        },
        {
            id: 'useStyleInLink',
            label: __('Use Style in Link', 'gutenverse'),
            description: __('Applies Text Paragraph styling to links within text, overriding the default core link style.', 'gutenverse'),
            component: CheckboxControl,
        },
    ];
};