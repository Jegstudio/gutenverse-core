import { __ } from '@wordpress/i18n';
import { ColorControl, RangeControl, TypographyControl } from 'gutenverse-core-editor/controls';
import { handleColor, handleTypography } from 'gutenverse-core/styling';

export const panelStyle = ({elementId, ...props}) => {
    return [
        {
            id: 'titleColor',
            label: __('Title Color', 'gutenverse'),
            component: ColorControl,
            style: [
                {
                    selector: `.${elementId} .rating-title`,
                    render: value => handleColor(value, 'color')
                }
            ]
        },
        {
            id: 'titleTypography',
            label: __('Title Typography', 'gutenverse'),
            component: TypographyControl,
            style: [
                {
                    selector: `.${elementId} .rating-title`,
                    hasChild: true,
                    render: (value,id) => handleTypography(value, props, id)
                }
            ],
        },
        {
            id: 'gap',
            label: __('Content Gap', 'gutenverse'),
            component: RangeControl,
            allowDeviceControl: true,
            min: 1,
            max: 50,
            step: 1,
            style: [
                {
                    selector: `.${elementId} .rating-title`,
                    render: value => `margin-right: ${value}px;`
                }
            ]
        },
        {
            id: 'iconSize',
            label: __('Icon Size', 'gutenverse'),
            component: RangeControl,
            allowDeviceControl: true,
            min: 1,
            max: 100,
            step: 1,
            style: [
                {
                    selector: `.${elementId} .rating-icons i`,
                    render: value => `font-size: ${value}px;`
                }
            ]
        },
        {
            id: 'iconGap',
            label: __('Icon Gap', 'gutenverse'),
            component: RangeControl,
            allowDeviceControl: true,
            min: 1,
            max: 50,
            step: 1,
            style: [
                {
                    selector: `.${elementId} .rating-icons i`,
                    render: value => `margin-right: ${value}px;`
                }
            ]
        },
        {
            id: 'iconColorMarked',
            label: __('Icon Color (Marked)', 'gutenverse'),
            component: ColorControl,
            style: [
                {
                    selector: `.${elementId} .rating-icons i.full`,
                    render: value => handleColor(value, 'color')
                }
            ]
        },
        {
            id: 'iconColorUnmarked',
            label: __('Icon Color (Unmarked)', 'gutenverse'),
            component: ColorControl,
            style: [
                {
                    selector: `.${elementId} .rating-icons i.empty`,
                    render: value => handleColor(value, 'color')
                }
            ]
        },
    ];
};