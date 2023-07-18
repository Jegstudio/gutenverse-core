import { __ } from '@wordpress/i18n';
import { BackgroundControl, ColorControl, DimensionControl, RangeControl, SelectControl } from 'gutenverse-core/controls';
import { handleBackground, handleColor, handleDimension } from 'gutenverse-core/styling';

export const iconPanel = (props) => {
    const {
        elementId,
    } = props;

    return [
        {
            id: 'iconAlign',
            label: __('Icon Alignment', 'gutenverse'),
            component: SelectControl,
            allowDeviceControl: true,
            options: [
                {
                    label: __('Align Top', 'gutenverse'),
                    value: 'flex-start',
                },
                {
                    label: __('Align Center', 'gutenverse'),
                    value: 'center',
                },
                {
                    label: __('Align Bottom', 'gutenverse'),
                    value: 'flex-end',
                },
            ],
            style: [
                {
                    selector: `.${elementId} .guten-postlist .guten-post a .icon-list`,
                    render: value => `align-self: ${value};`
                }
            ]
        },
        {
            id: 'iconWidth',
            label: __('Width', 'gutenverse'),
            component: RangeControl,
            allowDeviceControl: true,
            min: 1,
            max: 200,
            step: 1,
            style: [
                {
                    selector: `.${elementId} .guten-postlist .guten-post a .icon-list`,
                    render: value => `width: ${value}px;`
                }
            ]
        },
        {
            id: 'iconHeight',
            label: __('Height', 'gutenverse'),
            component: RangeControl,
            allowDeviceControl: true,
            min: 1,
            max: 200,
            step: 1,
            style: [
                {
                    selector: `.${elementId} .guten-postlist .guten-post a .icon-list`,
                    render: value => `height: ${value}px;`
                }
            ]
        },
        {
            id: 'iconLineHeight',
            label: __('Line Height', 'gutenverse'),
            component: RangeControl,
            allowDeviceControl: true,
            min: 1,
            max: 100,
            step: 1,
            style: [
                {
                    selector: `.${elementId} .guten-postlist .guten-post a .icon-list`,
                    render: value => `line-height: ${value}px;`
                }
            ]
        },
        {
            id: 'iconSize',
            label: __('Size', 'gutenverse'),
            component: RangeControl,
            allowDeviceControl: true,
            min: 1,
            max: 100,
            step: 1,
            style: [
                {
                    selector: `.${elementId} .guten-postlist .guten-post a .icon-list i`,
                    render: value => `font-size: ${value}px;`
                }
            ]
        },
        {
            id: 'iconMargin',
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
                    selector: `.${elementId} .guten-postlist .guten-post a .icon-list`,
                    render: value => handleDimension(value, 'margin')
                }
            ]
        },
        {
            id: 'iconRadius',
            label: __('Border Radius', 'gutenverse'),
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
                    selector: `.${elementId} .guten-postlist .guten-post a .icon-list i`,
                    render: value => handleDimension(value, 'border-radius', false)
                }
            ]
        },
        {
            id: 'iconColor',
            label: __('Icon Color', 'gutenverse'),
            component: ColorControl,
            style: [
                {
                    selector: `.${elementId} .guten-postlist .guten-post a .icon-list i`,
                    render: value => handleColor(value, 'color')
                }
            ]
        },
        {
            id: 'iconHoverColor',
            label: __('Icon Hover Color', 'gutenverse'),
            component: ColorControl,
            style: [
                {
                    selector: `.${elementId} .guten-postlist .guten-post:hover a .icon-list i`,
                    render: value => handleColor(value, 'color')
                }
            ]
        },
        {
            id: 'iconBackground',
            label: __('Background', 'gutenverse'),
            component: BackgroundControl,
            allowDeviceControl: true,
            options: [ 'default', 'gradient' ],
            style: [
                {
                    selector: `.${elementId} .guten-postlist .guten-post a .icon-list`,
                    hasChild: true,
                    render: value => handleBackground(value)
                }
            ]
        },
    ];
};