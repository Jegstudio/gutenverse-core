import { __ } from '@wordpress/i18n';
import { RangeControl } from 'gutenverse-core/controls';
import { ColorControl } from 'gutenverse-core/controls';
import { TypographyControl } from 'gutenverse-core/controls';
import { handleColor, handleTypography } from 'gutenverse-core/controls';

export const contentStyle = (props) => {
    const {
        elementId
    } = props;

    return [
        {
            id: 'borderWidth',
            label: __('Border Width', 'gutenverse'),
            component: RangeControl,
            min: 0,
            max: 100,
            style: [
                {
                    selector: `.guten-tabs.${elementId} .tab-heading-item, 
                                .guten-tabs.${elementId} .tab-heading-item:after,
                                .guten-tabs.${elementId} .tab-heading-item:before,
                                .guten-tabs.${elementId} .tab-body,
                                .guten-tabs.${elementId} .tab-heading-mobile,
                                .guten-tabs.${elementId} .tab-heading-mobile .tab-option`,
                    render: value => `border-width: ${value}px;`
                }
            ]
        },
        {
            id: 'borderColor',
            label: __('Border Color', 'gutenverse'),
            component: ColorControl,
            style: [
                {
                    selector: `.guten-tabs.${elementId} .tab-heading-item.active,
                                .guten-tabs.${elementId}.vertical .tab-heading-item.active, 
                                .guten-tabs.${elementId} .tab-heading-item.active:after,
                                .guten-tabs.${elementId} .tab-heading-item.active:before,
                                .guten-tabs.${elementId} .tab-body, 
                                .guten-tabs.${elementId} .tab-heading-mobile,
                                .guten-tabs.${elementId} .tab-heading-mobile .tab-option`,
                    render: value => handleColor(value, 'border-color')
                }
            ]
        },
        {
            id: 'backgroundColor',
            label: __('Background Color', 'gutenverse'),
            component: ColorControl,
            style: [
                {
                    selector: `.guten-tabs.${elementId} .tab-heading-item.active,
                                .guten-tabs.${elementId} .tab-body, 
                                .guten-tabs.${elementId} .tab-heading-mobile, 
                                .guten-tabs.${elementId} .tab-heading-mobile .tab-option`,
                    render: value => handleColor(value, 'background-color')
                }
            ]
        },
        {
            id: 'titleColor',
            label: __('Title Text Color', 'gutenverse'),
            component: ColorControl,
            style: [
                {
                    selector: `.guten-tabs.${elementId} .tab-heading-item, 
                                .guten-tabs.${elementId} .tab-heading-item svg`,
                    render: value => `${handleColor(value, 'color')}`
                }
            ]
        },
        {
            id: 'titleActiveColor',
            label: __('Title Active Text Color', 'gutenverse'),
            component: ColorControl,
            style: [
                {
                    selector: `.guten-tabs.${elementId} .tab-heading-item.active, 
                                .guten-tabs.${elementId} .tab-heading-item.active svg,
                                .guten-tabs.${elementId} .tab-heading-mobile .tab-title,
                                .guten-tabs.${elementId} .tab-heading-mobile .tab-option .tab-option-item`,
                    frontendSelector: `.guten-tabs.${elementId} .tab-heading-item.active,
                                .guten-tabs.${elementId} .tab-heading-mobile .tab-title,
                                .guten-tabs.${elementId} .tab-heading-mobile .tab-option .tab-option-item`,
                    render: value => `${handleColor(value, 'color')}`
                }
            ]
        },
        {
            id: 'titleTypography',
            label: __('Title Typography', 'gutenverse'),
            component: TypographyControl,
            style: [
                {
                    selector: `.guten-tabs.${elementId} .tab-heading-item, .guten-tabs.${elementId} .tab-heading-mobile`,
                    hasChild: true,
                    render: (value, id) => handleTypography(value, props, id)
                }
            ],
        },
        {
            id: 'contentColor',
            label: __('Content Text Color', 'gutenverse'),
            component: ColorControl,
            style: [
                {
                    selector: `.guten-tabs.${elementId} .tab-body`,
                    render: value => handleColor(value, 'color')
                }
            ]
        },
        {
            id: 'contentTypography',
            label: __('Content Typography', 'gutenverse'),
            component: TypographyControl,
            style: [
                {
                    selector: `.guten-tabs.${elementId} .tab-body, 
                        .guten-tabs.${elementId} .tab-body p, 
                        .guten-tabs.${elementId} .tab-body a`,
                    hasChild: true,
                    render: (value, id) => handleTypography(value, props, id)
                }
            ],
        },
    ];
};
