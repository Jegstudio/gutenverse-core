import { __ } from '@wordpress/i18n';

import { AlignCenter, AlignLeft, AlignRight } from 'react-feather';
import { BorderControl, BoxShadowControl, IconRadioControl, ImageFilterControl, RangeControl, SelectControl, SizeControl } from 'gutenverse-core/controls';
import { isEmptyString } from 'gutenverse-core/helper';
import { allowRenderBoxShadow, handleAlignReverse, handleBorderV2, handleUnitPoint } from 'gutenverse-core/styling';
import { handleBoxShadow } from 'gutenverse-core/styling';

export const imagePanel = ({ elementId }) => {
    return [
        {
            id: 'align',
            label: __('Alignment', 'gutenverse'),
            component: IconRadioControl,
            allowDeviceControl: true,
            options: [
                {
                    label: __('Align Left', 'gutenverse'),
                    value: 'left',
                    icon: <AlignLeft />,
                },
                {
                    label: __('Align Center', 'gutenverse'),
                    value: 'center',
                    icon: <AlignCenter />,
                },
                {
                    label: __('Align Right', 'gutenverse'),
                    value: 'right',
                    icon: <AlignRight />,
                },
            ],
            style: [
                {
                    selector: `.${elementId} .guten-image-wrapper`,
                    render: value => `justify-content: ${handleAlignReverse(value)};`
                }
            ]
        },
        {
            id: 'width',
            label: __('Width', 'gutenverse'),
            component: SizeControl,
            allowDeviceControl: true,
            units: {
                px: {
                    text: 'px',
                    min: 1,
                    max: 1000,
                    step: 1
                },
                ['%']: {
                    text: '%',
                    min: 1,
                    max: 100,
                    step: 1
                },
                vw: {
                    text: 'vw',
                    min: 1,
                    max: 100,
                    step: 1
                },
            },
            style: [
                {
                    selector: `.${elementId} img`,
                    render: value => handleUnitPoint(value, 'width')
                },
            ],
        },
        {
            id: 'height',
            label: __('Height', 'gutenverse'),
            component: SizeControl,
            allowDeviceControl: true,
            units: {
                px: {
                    text: 'px',
                    min: 1,
                    max: 500,
                    step: 1
                },
                vh: {
                    text: 'vh',
                    min: 1,
                    max: 100,
                    step: 1
                },
            },
            style: [
                {
                    selector: `.editor-styles-wrapper .${elementId} img`,
                    render: value => handleUnitPoint(value, 'height')
                },
            ],
        },
        {
            id: 'opacity',
            label: __('Opacity', 'gutenverse'),
            component: RangeControl,
            min: 0.1,
            max: 1,
            step: 0.1,
            style: [
                {
                    selector: `.${elementId} img`,
                    render: value => `opacity: ${value};`
                },
            ],
        },
        {
            id: 'imgFilter',
            label: __('Image Filter', 'gutenverse'),
            component: ImageFilterControl,
            style: [
                {
                    selector: `.${elementId} img`,
                    allowRender: props => props !== undefined,
                    render: ({ brightness, contrast, blur, saturation, hue }) => {
                        return `filter: 
                            brightness( ${!isEmptyString(brightness) ? brightness : 100}% )
                            contrast( ${!isEmptyString(contrast) ? contrast : 100}% )
                            saturate( ${!isEmptyString(saturation) ? saturation : 100}% )
                            blur( ${!isEmptyString(blur) ? blur : 0}px )
                            hue-rotate( ${!isEmptyString(hue) ? hue : 0}deg );`;
                    }
                }
            ]
        },
        {
            id: 'imageFit',
            label: __('Image Fit', 'gutenverse'),
            component: SelectControl,
            allowDeviceControl: true,
            options: [
                {
                    label: 'Default',
                    value: 'default'
                },
                {
                    label: 'Fill',
                    value: 'fill'
                },
                {
                    label: 'Cover',
                    value: 'cover'
                },
                {
                    label: 'Contain',
                    value: 'contain'
                },
            ],
            style: [
                {
                    selector: `.${elementId} img`,
                    render: value => value !== 'default' ? `object-fit: ${value};` : ''
                }
            ]
        },
        {
            id: 'imgBorder_v2',
            label: __('Border Type', 'gutenverse'),
            component: BorderControl,
            allowDeviceControl: true,
            style: [
                {
                    selector: `.${elementId} img`,
                    render: value => handleBorderV2(value)
                }
            ]
        },
        {
            id: 'imgShadow',
            label: __('Box Shadow', 'gutenverse'),
            component: BoxShadowControl,
            style: [
                {
                    selector: `.${elementId} img`,
                    allowRender: (value) => allowRenderBoxShadow(value),
                    render: value => handleBoxShadow(value)
                }
            ]
        }
    ];
};