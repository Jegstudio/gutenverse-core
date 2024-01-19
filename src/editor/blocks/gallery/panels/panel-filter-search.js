import { __ } from '@wordpress/i18n';
import { BackgroundControl, BorderControl, BorderResponsiveControl, BoxShadowControl, ColorControl, DimensionControl, HeadingControl, IconControl, RangeControl, SelectControl, SizeControl, TextControl, TypographyControl } from 'gutenverse-core/controls';
import { getDeviceType } from 'gutenverse-core/editor-helper';
import { allowRenderBoxShadow, handleBackground, handleBorder, handleBorderResponsive, handleColor, handleDimension, handleTypography, handleUnitPoint } from 'gutenverse-core/styling';
import { handleBoxShadow } from 'gutenverse-core/styling';

export const filterSearchPanel = (props) => {
    const {
        elementId
    } = props;

    const device = getDeviceType();

    return [
        {
            id: 'submenuSplitter1',
            first: true,
            component: HeadingControl,
            label: __('Control Tab')
        },
        {
            id: 'filterSearchTypography',
            label: __('Typography', 'gutenverse'),
            component: TypographyControl,
            style: [
                {
                    selector: `.${elementId} .search-filters-wrap .filter-wrap span, .${elementId} .search-filters-wrap .filter-wrap ul.search-filter-controls li, .${elementId} .search-filters-wrap form.guten-gallery-search-box input[type=text]`,
                    hasChild: true,
                    render: (value, id) => handleTypography(value, props, id)
                }
            ],
        },
        {
            id: 'filterSearchIcon',
            label: __('Icon', 'gutenverse'),
            component: IconControl,
        },
        {
            id: 'filterSearchIconPosition',
            label: __('Icon Position', 'gutenverse'),
            component: SelectControl,
            options: [
                {
                    label: __('After'),
                    value: 'after'
                },
                {
                    label: __('Before'),
                    value: 'before'
                },
            ]
        },
        {
            id: 'fitlerSearchIconSpacing',
            label: __('Icon Spacing', 'gutenverse'),
            component: SizeControl,
            allowDeviceControl: true,
            units: {
                px: {
                    text: 'px',
                    min: 1,
                    max: 100,
                    step: 1
                },
                em: {
                    text: 'em',
                    min: 0,
                    max: 10,
                    step: 0.1
                },
            },
            style: [
                {
                    selector: `.${elementId} .search-filter-trigger.icon-position-after i`,
                    render: value => handleUnitPoint(value, 'margin-left')
                },
                {
                    selector: `.${elementId} .search-filter-trigger.icon-position-before i`,
                    render: value => handleUnitPoint(value, 'margin-right')
                }
            ]
        },
        {
            id: 'fitlerSearchIconSize',
            label: __('Icon Size', 'gutenverse'),
            component: SizeControl,
            allowDeviceControl: true,
            units: {
                px: {
                    text: 'px',
                    min: 1,
                    max: 100,
                    step: 1
                },
                em: {
                    text: 'em',
                    min: 0,
                    max: 10,
                    step: 0.1
                },
            },
            style: [
                {
                    selector: `.${elementId} .search-filter-trigger i`,
                    render: value => handleUnitPoint(value, 'font-size')
                }
            ]
        },
        {
            id: 'fitlerSearchControlWidth',
            label: __('Width', 'gutenverse'),
            component: SizeControl,
            allowDeviceControl: true,
            units: {
                px: {
                    text: 'px',
                    min: 1,
                    max: 500,
                    step: 1
                },
                ['%']: {
                    text: '%',
                    min: 0,
                    max: 100,
                    step: 1
                },
            },
            style: [
                {
                    selector: `.${elementId} .search-filters-wrap .filter-wrap`,
                    render: value => handleUnitPoint(value, 'flex-basis')
                }
            ]
        },
        {
            id: 'filterSearchTextBackground',
            label: __('Background', 'gutenverse'),
            component: ColorControl,
            allowDeviceControl: true,
            style: [
                {
                    selector: `.${elementId} .search-filters-wrap .filter-wrap button.search-filter-trigger`,
                    render: value => handleColor(value, 'background-color')
                }
            ]
        },
        {
            id: 'filterSearchTextColor',
            label: __('Color', 'gutenverse'),
            component: ColorControl,
            allowDeviceControl: true,
            style: [
                {
                    selector: `.${elementId} .search-filters-wrap .filter-wrap button.search-filter-trigger`,
                    render: value => handleColor(value, 'color')
                }
            ]
        },
        {
            id: 'filterSearchBorder',
            show: device === 'Desktop',
            label: __('Border', 'gutenverse'),
            component: BorderControl,
            style: [
                {
                    selector: `.${elementId} .search-filters-wrap .filter-wrap button.search-filter-trigger`,
                    hasChild: true,
                    render: value => handleBorder(value)
                }
            ]
        },
        {
            id: 'filterSearchBorderResponsive',
            show: device !== 'Desktop',
            label: __('Border', 'gutenverse'),
            component: BorderResponsiveControl,
            allowDeviceControl: true,
            style: [
                {
                    selector: `.${elementId} .search-filters-wrap .filter-wrap button.search-filter-trigger`,
                    allowRender: () => device !== 'Desktop',
                    render: value => handleBorderResponsive(value)
                }
            ]
        },
        {
            id: 'filterSearchMargin',
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
                ['%']: {
                    text: '%',
                    unit: '%'
                },
            },
            style: [
                {
                    selector: `.${elementId} .search-filters-wrap .filter-wrap`,
                    render: value => handleDimension(value, 'margin')
                }
            ]
        },
        {
            id: 'filterSearchBoxShadow',
            label: __('Box Shadow', 'gutenverse'),
            component: BoxShadowControl,
            style: [
                {
                    selector: `.${elementId} .search-filters-wrap .filter-wrap`,
                    allowRender: (value) => allowRenderBoxShadow(value),
                    render: value => handleBoxShadow(value)
                }
            ]
        },
        {
            id: 'submenuSplitter',
            component: HeadingControl,
            label: __('Separator')
        },
        {
            id: 'filterSearchSeparatorSize',
            label: __('Separator Size', 'gutenverse'),
            component: RangeControl,
            allowDeviceControl: true,
            min: 1,
            max: 100,
            step: 1,
            style: [
                {
                    selector: `.${elementId} .search-filters-wrap .filter-wrap button.search-filter-trigger`,
                    render: value => `border-right-width: ${value}px;`
                }
            ]
        },
        {
            id: 'filterSearchSeparatorColor',
            label: __('SeparatorColor', 'gutenverse'),
            component: ColorControl,
            allowDeviceControl: true,
            style: [
                {
                    selector: `.${elementId} .search-filters-wrap .filter-wrap button.search-filter-trigger`,
                    render: value => handleColor(value, 'border-right-color')
                }
            ]
        },
        {
            id: 'submenuSplitter2',
            component: HeadingControl,
            label: __('Form')
        },
        {
            id: 'filterSearchFormText',
            label: __('Text Placeholder', 'gutenverse'),
            component: TextControl,
        },
        {
            id: 'filterSearchFormBackground',
            label: __('Background', 'gutenverse'),
            component: ColorControl,
            allowDeviceControl: true,
            style: [
                {
                    selector: `.${elementId} .search-filters-wrap .guten-gallery-search-box`,
                    render: value => handleColor(value, 'background-color')
                }
            ]
        },
        {
            id: 'filterSearchFormTextColor',
            label: __('Color', 'gutenverse'),
            component: ColorControl,
            allowDeviceControl: true,
            style: [
                {
                    selector: `.${elementId} .search-filters-wrap form.guten-gallery-search-box input[type=text], .${elementId} .search-filters-wrap form.guten-gallery-search-box input[type=text]::placeholder`,
                    render: value => handleColor(value, 'color')
                }
            ]
        },
        {
            id: 'fitlerSearchFormWidth',
            label: __('Width', 'gutenverse'),
            component: SizeControl,
            allowDeviceControl: true,
            units: {
                px: {
                    text: 'px',
                    min: 1,
                    max: 500,
                    step: 1
                },
                ['%']: {
                    text: '%',
                    min: 0,
                    max: 100,
                    step: 1
                },
            },
            style: [
                {
                    selector: `.${elementId} .search-filters-wrap .guten-gallery-search-box`,
                    render: value => handleUnitPoint(value, 'flex-basis')
                }
            ]
        },
        {
            id: 'filterSearchFormBorder',
            show: device === 'Desktop',
            label: __('Border', 'gutenverse'),
            component: BorderControl,
            style: [
                {
                    selector: `.${elementId} .search-filters-wrap .guten-gallery-search-box`,
                    hasChild: true,
                    render: value => handleBorder(value)
                }
            ]
        },
        {
            id: 'filterSearchFormBorderResponsive',
            show: device !== 'Desktop',
            label: __('Border', 'gutenverse'),
            component: BorderResponsiveControl,
            allowDeviceControl: true,
            style: [
                {
                    selector: `.${elementId} .search-filters-wrap .guten-gallery-search-box`,
                    allowRender: () => device !== 'Desktop',
                    render: value => handleBorderResponsive(value)
                }
            ]
        },
        {
            id: 'filterSearchFormBoxShadow',
            label: __('Box Shadow', 'gutenverse'),
            component: BoxShadowControl,
            style: [
                {
                    selector: `.${elementId} .search-filters-wrap .guten-gallery-search-box`,
                    allowRender: (value) => allowRenderBoxShadow(value),
                    render: value => handleBoxShadow(value)
                }
            ]
        },
        {
            id: 'submenuSplitter3',
            component: HeadingControl,
            label: __('Dropdown')
        },
        {
            id: 'filterSearchDropdownTextColor',
            label: __('Color', 'gutenverse'),
            component: ColorControl,
            allowDeviceControl: true,
            style: [
                {
                    selector: `.${elementId} .search-filters-wrap .filter-wrap ul.search-filter-controls li`,
                    render: value => handleColor(value, 'color')
                }
            ]
        },
        {
            id: 'filterSearchDropdownTextColorHover',
            label: __('Hover Color', 'gutenverse'),
            component: ColorControl,
            allowDeviceControl: true,
            style: [
                {
                    selector: `.${elementId} .search-filters-wrap .filter-wrap ul.search-filter-controls li:hover`,
                    render: value => handleColor(value, 'color')
                }
            ]
        },
        {
            id: 'filterSearchDropdownBackground',
            label: __('Background', 'gutenverse'),
            component: BackgroundControl,
            allowDeviceControl: true,
            options: ['default', 'gradient'],
            style: [
                {
                    selector: `.${elementId} .search-filters-wrap .filter-wrap ul.search-filter-controls`,
                    hasChild: true,
                    render: value => handleBackground(value)
                }
            ]
        },
        {
            id: 'filterSearchDropdownBorder',
            show: device === 'Desktop',
            label: __('Border', 'gutenverse'),
            component: BorderControl,
            style: [
                {
                    selector: `.${elementId} .search-filters-wrap .filter-wrap ul.search-filter-controls`,
                    hasChild: true,
                    render: value => handleBorder(value)
                }
            ]
        },
        {
            id: 'filterSearchDropdownBorderResponsive',
            show: device !== 'Desktop',
            label: __('Border', 'gutenverse'),
            component: BorderResponsiveControl,
            allowDeviceControl: true,
            style: [
                {
                    selector: `.${elementId} .search-filters-wrap .filter-wrap ul.search-filter-controls`,
                    allowRender: () => device !== 'Desktop',
                    render: value => handleBorderResponsive(value)
                }
            ]
        },
        {
            id: 'filterSearchDropdownPadding',
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
                ['%']: {
                    text: '%',
                    unit: '%'
                },
            },
            style: [
                {
                    selector: `.${elementId} .search-filters-wrap .filter-wrap ul.search-filter-controls`,
                    render: value => handleDimension(value, 'padding')
                }
            ]
        },
    ];
};