import { __ } from '@wordpress/i18n';
import {
    BorderControl,
    BorderResponsiveControl,
    ColorControl,
    DimensionControl,
    TypographyControl
} from 'gutenverse-core/controls';
import { getDeviceType } from 'gutenverse-core/editor-helper';

export const panelBody = (props) => {
    const {
        elementId,
    } = props;

    const device = getDeviceType();

    return [
        {
            id: 'contentTypography',
            label: __('Typography', 'gutenverse'),
            component: TypographyControl,
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
        },
        {
            id: 'contentTextColor',
            label: __('Text Color', 'gutenverse'),
            component: ColorControl,
            liveStyle: [
                {
                    'type': 'color',
                    'selector': `.${elementId} .accordion-item .accordion-content`,
                    'properties': [
                        {
                            'name': 'color',
                            'valueType': 'direct'
                        }
                    ],
                }
            ]
        },
        {
            id: 'contentBackgroundColor',
            label: __('Background Color', 'gutenverse'),
            component: ColorControl,
            liveStyle: [
                {
                    'type': 'color',
                    'selector': `.${elementId} .accordion-item .accordion-content`,
                    'properties': [
                        {
                            'name': 'background-color',
                            'valueType': 'direct'
                        }
                    ],
                }
            ]
        },
        {
            id: 'contentBorder',
            show: device === 'Desktop',
            label: __('Border', 'gutenverse'),
            component: BorderControl,
            liveStyle: [
                {
                    'type': 'border',
                    'selector': `.${elementId} .accordion-item .accordion-content`,
                }
            ]
        },
        {
            id: 'contentBorderResponsive',
            show: device !== 'Desktop',
            label: __('Border', 'gutenverse'),
            component: BorderResponsiveControl,
            allowDeviceControl: true,
            liveStyle: [
                {
                    'type': 'borderResponsive',
                    'responsive': true,
                    'selector': `.${elementId} .accordion-item .accordion-content`,
                }
            ]
        },
    ];
};
