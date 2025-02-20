import { __ } from '@wordpress/i18n';
import { DimensionControl, RangeControl } from 'gutenverse-core/controls';
import { ColorControl } from 'gutenverse-core/controls';
import { TypographyControl } from 'gutenverse-core/controls';

export const contentStyle = (props) => {
    const {
        elementId
    } = props;

    return [
        {
            id: 'borderWidth',
            label: __('Border Width', 'gutenverse'),
            component: RangeControl,
            unit: 'px',
            min: 0,
            max: 100,
            liveStyle: [
                {
                    'type': 'plain',
                    'id': 'borderWidth',
                    'selector': `.guten-tabs.${elementId} .tab-heading-item, 
                    .guten-tabs.${elementId} .tab-heading-item:after,
                    .guten-tabs.${elementId} .tab-heading-item:before,
                    .guten-tabs.${elementId} .tab-body,
                    .guten-tabs.${elementId} .tab-heading-mobile,
                    .guten-tabs.${elementId} .tab-heading-mobile .tab-option`,
                    'properties': [
                        {
                            'name': 'border-width',
                            'valueType': 'pattern',
                            'pattern': '{value}px',
                            'patternValues': {
                                'value': {
                                    'type': 'direct'
                                }
                            }
                        }
                    ]
                }
            ]
        },
        {
            id: 'borderColor',
            label: __('Border Color', 'gutenverse'),
            component: ColorControl,
            liveStyle: [
                {
                    'type': 'color',
                    'id': 'borderColor',
                    'selector': `.guten-tabs.${elementId} .tab-heading-item.active,
                    .guten-tabs.${elementId}.vertical .tab-heading-item.active, 
                    .guten-tabs.${elementId} .tab-heading-item.active:after,
                    .guten-tabs.${elementId} .tab-heading-item.active:before,
                    .guten-tabs.${elementId} .tab-body, 
                    .guten-tabs.${elementId} .tab-heading-mobile,
                    .guten-tabs.${elementId} .tab-heading-mobile .tab-option`,
                    'properties': [
                        {
                            'name': 'border-color',
                            'valueType': 'direct',
                        }
                    ]
                }
            ]
        },
        {
            id: 'backgroundColor',
            label: __('Background Color', 'gutenverse'),
            component: ColorControl,
            liveStyle: [
                {
                    'type': 'color',
                    'id': 'backgroundColor',
                    'selector': `.guten-tabs.${elementId} .tab-heading-item.active,
                    .guten-tabs.${elementId} .tab-body, 
                    .guten-tabs.${elementId} .tab-heading-mobile, 
                    .guten-tabs.${elementId} .tab-heading-mobile .tab-option`,
                    'properties': [
                        {
                            'name': 'background-color',
                            'valueType': 'direct',
                        }
                    ]
                }
            ]
        },
        {
            id: 'titleColor',
            label: __('Title Text Color', 'gutenverse'),
            component: ColorControl,
            liveStyle: [
                {
                    'type': 'color',
                    'id': 'titleColor',
                    'selector': `.guten-tabs.${elementId} .tab-heading-item, 
                    .guten-tabs.${elementId} .tab-heading-item svg`,
                    'properties': [
                        {
                            'name': 'color',
                            'valueType': 'direct',
                        }
                    ]
                }
            ]
        },
        {
            id: 'titleActiveColor',
            label: __('Title Active Text Color', 'gutenverse'),
            component: ColorControl,
            liveStyle: [
                {
                    'type': 'color',
                    'id': 'titleActiveColor',
                    'selector': `.guten-tabs.${elementId} .tab-heading-item.active, 
                    .guten-tabs.${elementId} .tab-heading-item.active svg,
                    .guten-tabs.${elementId} .tab-heading-mobile .tab-title,
                    .guten-tabs.${elementId} .tab-heading-mobile .tab-option .tab-option-item`,
                    'properties': [
                        {
                            'name': 'color',
                            'valueType': 'direct',
                        }
                    ]
                }
            ]
        },
        {
            id: 'titleTypography',
            label: __('Title Typography', 'gutenverse'),
            component: TypographyControl,
        },
        {
            id: 'contentColor',
            label: __('Content Text Color', 'gutenverse'),
            component: ColorControl,
            liveStyle: [
                {
                    'type': 'color',
                    'id': 'contentColor',
                    'selector': `.guten-tabs.${elementId} .tab-body`,
                    'properties': [
                        {
                            'name': 'color',
                            'valueType': 'direct',
                        }
                    ]
                }
            ]
        },
        {
            id: 'contentTypography',
            label: __('Content Typography', 'gutenverse'),
            component: TypographyControl,
        },
        {
            id: 'contentPadding',
            label: __('Content Padding', 'gutenverse'),
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
        },
    ];
};
