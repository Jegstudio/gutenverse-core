import { __ } from '@wordpress/i18n';
import { SelectControl } from 'gutenverse-core/controls';
import { BorderControl, ColorControl, DimensionControl, SwitchControl, TypographyControl } from 'gutenverse-core/controls';
import { handleBorder, handleColor, handleDimension, handleTypography } from 'gutenverse-core/controls';

export const panelTitle = (props) => {
    const {
        elementId,
        switcher,
        setSwitcher
    } = props;

    return [

        {
            id: 'titleTag',
            label: __('Title Tag', 'gutenverse'),
            component: SelectControl,
            options: [
                {
                    label: __('H1'),
                    value: 'h1'
                },
                {
                    label: __('H2'),
                    value: 'h2'
                },
                {
                    label: __('H3'),
                    value: 'h3'
                },
                {
                    label: __('H4'),
                    value: 'h4'
                },
                {
                    label: __('H5'),
                    value: 'h5'
                },
                {
                    label: __('H6'),
                    value: 'h6'
                },
                {
                    label: __('SPAN'),
                    value: 'span'
                },
            ],
        },
        {
            id: 'titleTypography',
            label: __('Typography', 'gutenverse'),
            component: TypographyControl,
            style: [
                {
                    selector: `.${elementId} .accordion-item .accordion-text`,
                    hasChild: true,
                    render: (value,id) => handleTypography(value, props, id)
                }
            ],
        },
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
                    selector: `.${elementId} .accordion-item .accordion-heading`,
                    render: value => handleDimension(value, 'padding')
                }
            ],
        },
        {
            id: '__accTitleActive',
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
            onChange: ({__accTitleActive}) => setSwitcher({...switcher, accTitle: __accTitleActive})
        },
        {
            id: 'titleBackgroundColor',
            show: !switcher.accTitle || switcher.accTitle === 'normal',
            label: __('Background Color', 'gutenverse'),
            component: ColorControl,
            style: [
                {
                    selector: `.${elementId} .accordion-item .accordion-heading`,
                    render: value => handleColor(value, 'background-color')
                }
            ],
        },
        {
            id: 'titleTextColor',
            show: !switcher.accTitle || switcher.accTitle === 'normal',
            label: __('Text Color', 'gutenverse'),
            component: ColorControl,
            style: [
                {
                    selector: `.${elementId} .accordion-item .accordion-text`,
                    render: value => handleColor(value, 'color')
                }
            ],
        },
        {
            id: 'titleBorder',
            show: !switcher.accTitle || switcher.accTitle === 'normal',
            label: __('Border', 'gutenverse'),
            component: BorderControl,
            style: [
                {
                    selector: `.${elementId} .accordion-item .accordion-heading`,
                    hasChild: true,
                    render: value => handleBorder(value)
                }
            ]
        },
        {
            id: 'titleBackgroundActiveColor',
            show: switcher.accTitle === 'active',
            label: __('Background Color', 'gutenverse'),
            component: ColorControl,
            style: [
                {
                    selector: `.${elementId} .accordion-item.active .accordion-heading`,
                    render: value => handleColor(value, 'background-color')
                }
            ],
        },
        {
            id: 'titleActiveColor',
            show: switcher.accTitle === 'active',
            label: __('Text Color', 'gutenverse'),
            component: ColorControl,
            style: [
                {
                    selector: `.${elementId} .accordion-item.active .accordion-text`,
                    render: value => handleColor(value, 'color')
                }
            ],
        },
        {
            id: 'titleBorderActive',
            show: switcher.accTitle === 'active',
            label: __('Border', 'gutenverse'),
            component: BorderControl,
            style: [
                {
                    selector: `.${elementId} .accordion-item.active .accordion-heading`,
                    hasChild: true,
                    render: value => handleBorder(value)
                }
            ]
        },
    ];
};
