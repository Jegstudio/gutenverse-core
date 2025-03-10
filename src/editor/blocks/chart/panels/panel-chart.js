import { __ } from '@wordpress/i18n';
import { AlignCenter, AlignLeft, AlignRight } from 'react-feather';
import { TypographyControl, IconRadioControl, RangeControl, ColorControl } from 'gutenverse-core/controls';
import { handleColor, handleTypography } from 'gutenverse-core/styling';

export const chartPanel = (props) => {
    const {
        elementId,
        chartType,
        chartContent
    } = props;
    
    return [
        {
            id: 'chartContentAlign',
            label: __('Chart Alignment', 'gutenverse'),
            allowDeviceControl: true,
            component: IconRadioControl,
            options: [
                {
                    label: __('Align Left', 'gutenverse'),
                    value: 'baseline',
                    icon: <AlignLeft/>,
                },
                {
                    label: __('Align Center', 'gutenverse'),
                    value: 'center',
                    icon: <AlignCenter/>,
                },
                {
                    label: __('Align Right', 'gutenverse'),
                    value: 'end',
                    icon: <AlignRight/>,
                },
            ],
            style: [
                {
                    selector: `.${elementId} .chart-content.content-chart`,
                    render: value => `align-items: ${value};`
                }
            ]
        },
        {
            id: 'chartContainerSize',
            label: __('Chart Container Size', 'gutenverse'),
            component: RangeControl,
            allowDeviceControl: true,
            isParseFloat: true,
            unit: '%',
            min: 0,
            max: 100,
            step: 1,
            style: [
                {
                    selector: `.${elementId} .chart-content.content-chart`,
                    render: value => `width: ${value}% !important;`
                },
            ],
        },
        {
            id: 'chartSize',
            label: __('Chart Size', 'gutenverse'),
            component: RangeControl,
            allowDeviceControl: true,
            isParseFloat: true,
            unit: 'px',
            min: 0,
            max: 250,
            step: 1,
            style: [
                {
                    selector: `.${elementId} canvas`,
                    render: value => `width: ${value}px !important; height: ${value}px !important;`
                },
                {
                    selector: `.${elementId} .chart-inside.type-doughnut`,
                    render: value => `width: ${value}px !important;`
                },
            ],
        },
        {
            id: 'cutout',
            label: __('Cutout Percentage', 'gutenverse'),
            component: RangeControl,
            show: 'doughnut' === chartType,
            unit: '%',
            min: 0,
            max: 100,
            step: 1,
        },
        {
            id: 'barThickness',
            label: __('Bar Thickness', 'gutenverse'),
            component: RangeControl,
            show: 'bar' === chartType,
            unit: 'px',
            min: 0,
            max: 250,
            step: 1,
        },
        {
            id: 'cutoutBackground',
            label: __('Cutout Background', 'gutenverse'),
            show: 'doughnut' === chartType,
            component: ColorControl,
        },
        {
            id: 'indicatorColor',
            label: __('Indicator Color', 'gutenverse'),
            show: chartContent !== 'none',
            component: ColorControl,
            style: [
                {
                    selector: `.${elementId} .chart-content .chart-inside > *`,
                    render: value => handleColor(value, 'color')
                }
            ],
        },
        {
            id: 'indicatorTypography',
            label: __('Indicator Typography', 'gutenverse'),
            show: chartContent !== 'none',
            component: TypographyControl,
            style: [
                {
                    selector: `.${elementId} .chart-content .chart-inside > *`,
                    hasChild: true,
                    render: (value, id) => handleTypography(value, props, id)
                }
            ],
        },
    ];
};