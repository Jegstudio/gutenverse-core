import { __ } from '@wordpress/i18n';
import { ColorControl, DimensionControl, RangeControl, TypographyControl, CheckboxControl } from 'gutenverse-core/controls';
import { handleColor, handleDimension, handleTypography } from 'gutenverse-core/styling';

export const postmetaPanel = (props) => {
    const {
        elementId,
    } = props;

    return [
        {
            id: 'metaTypography',
            label: __('Typography', 'gutenverse'),
            component: TypographyControl,
            style: [
                {
                    selector: `.${elementId} .guten-postblock .guten-postblock-content .guten-post-meta`,
                    hasChild: true,
                    render: (value, id) => handleTypography(value, props, id)
                }
            ]
        },
        {
            id: 'metaColor',
            label: __('Text color', 'gutenverse'),
            component: ColorControl,
            style: [
                {
                    selector: `.${elementId} .guten-postblock .guten-postblock-content .guten-post-meta`,
                    render: value => handleColor(value, 'color')
                }
            ]
        },
        {
            id: 'metaAuthorTypography',
            label: __('Author Typography', 'gutenverse'),
            component: TypographyControl,
            style: [
                {
                    selector: `.${elementId} .guten-postblock .guten-postblock-content .guten-post-meta .guten-meta-author a`,
                    hasChild: true,
                    render: (value, id) => handleTypography(value, props, id)
                }
            ]
        },
        {
            id: 'metaAuthorColor',
            label: __('Author color', 'gutenverse'),
            component: ColorControl,
            style: [
                {
                    selector: `.${elementId} .guten-postblock .guten-postblock-content .guten-post-meta .guten-meta-author a`,
                    render: value => handleColor(value, 'color')
                }
            ]
        },
        {
            id: 'metaMargin',
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
                    selector: `.${elementId} .guten-postblock .guten-postblock-content .guten-post-meta`,
                    render: value => handleDimension(value, 'margin')
                }
            ]
        },
        {
            id: 'metaAuthorIconSpacing',
            label: __('Author Icon Spacing', 'gutenverse'),
            component: RangeControl,
            min: 1,
            max: 100,
            step: 1,
            allowDeviceControl: true,
            unit: 'px',
            style: [
                {
                    selector: `.${elementId} .guten-postblock .guten-postblock-content .guten-post-meta .guten-meta-author.icon-position-before i`,
                    render: value => `margin-right: ${value}px;`
                },
                {
                    selector: `.${elementId} .guten-postblock .guten-postblock-content .guten-post-meta .guten-meta-author.icon-position-after i`,
                    render: value => `margin-left: ${value}px;`
                },
            ],
        },
        {
            id: 'metaDateIconSpacing',
            label: __('Date Icon Spacing', 'gutenverse'),
            component: RangeControl,
            min: 1,
            max: 100,
            step: 1,
            allowDeviceControl: true,
            unit: 'px',
            style: [
                {
                    selector: `.${elementId} .guten-postblock .guten-postblock-content .guten-post-meta .guten-meta-date.icon-position-before i`,
                    render: value => `margin-right: ${value}px;`
                },
                {
                    selector: `.${elementId} .guten-postblock .guten-postblock-content .guten-post-meta .guten-meta-date.icon-position-after i`,
                    render: value => `margin-left: ${value}px;`
                },
            ],
        },
        {
            id: 'postMetaInline',
            label: __('Set Inline Post Meta', 'gutenverse'),
            component: CheckboxControl,
            allowDeviceControl: true,
            style: [
                {
                    selector: `.${elementId} .guten-postblock .guten-postblock-content .guten-post-meta`,
                    render: value => `display: ${value ? 'inline-flex' : 'flex'};`
                },
            ],
        },
    ];
};