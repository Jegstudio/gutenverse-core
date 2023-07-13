import { __ } from '@wordpress/i18n';
import { ColorControl, DimensionControl, SwitchControl, TypographyControl } from 'gutenverse-core-editor/controls';
import { handleColor, handleDimension, handleTypography } from 'gutenverse-core/styling';

export const titlePanel = (props) => {
    const {
        elementId,
        switcher,
        setSwitcher
    } = props;

    return [
        {
            id: 'titlePadding',
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
                    selector: `.${elementId} .guten-postlist .guten-post .guten-postlist-title`,
                    render: value => handleDimension(value, 'padding')
                }
            ]
        },
        {
            id: '__titleHover',
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
            onChange: ({__titleHover}) => setSwitcher({...switcher, titleHover: __titleHover})
        },
        {
            id: 'titleColor',
            show: !switcher.titleHover || switcher.titleHover === 'normal',
            label: __('Text color', 'gutenverse'),
            component: ColorControl,
            style: [
                {
                    selector: `.${elementId} .guten-postlist .guten-post .guten-postlist-title`,
                    render: value => handleColor(value, 'color')
                }
            ]
        },
        {
            id: 'titleTypography',
            show: !switcher.titleHover || switcher.titleHover === 'normal',
            label: __('Typography', 'gutenverse'),
            component: TypographyControl,
            style: [
                {
                    selector: `.${elementId} .guten-postlist .guten-post .guten-postlist-title`,
                    hasChild: true,
                    render: (value,id) => handleTypography(value, props, id)
                }
            ]
        },
        {
            id: 'titleColorHover',
            show: switcher.titleHover === 'hover',
            label: __('Hover Text color', 'gutenverse'),
            component: ColorControl,
            style: [
                {
                    selector: `.${elementId} .guten-postlist .guten-post:hover .guten-postlist-title`,
                    render: value => handleColor(value, 'color')
                }
            ]
        },
        {
            id: 'titleTypographyHover',
            show: switcher.titleHover === 'hover',
            label: __('Hover Typography', 'gutenverse'),
            component: TypographyControl,
            style: [
                {
                    selector: `.${elementId} .guten-postlist .guten-post:hover .guten-postlist-title`,
                    hasChild: true,
                    render: (value,id) => handleTypography(value, props, id)
                }
            ]
        },
    ];
};