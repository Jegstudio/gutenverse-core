import { __ } from '@wordpress/i18n';

import { BorderControl, BorderResponsiveControl, BoxShadowControl, IconRadioControl, RangeControl, SizeControl } from 'gutenverse-core/controls';
import { AlignCenter, AlignLeft, AlignRight } from 'react-feather';
import { allowRenderBoxShadow, handleBorder, handleBorderResponsive, handleUnitPoint } from 'gutenverse-core/styling';
import { handleBoxShadow } from 'gutenverse-core/styling';
import { getDeviceType } from 'gutenverse-core/editor-helper';

export const stylePanel = (props) => {
    const {
        elementId,
    } = props;

    const device = getDeviceType();

    return [
        {
            id: 'alignment',
            label: __('Alignment', 'gutenverse'),
            component: IconRadioControl,
            allowDeviceControl: true,
            options: [
                {
                    label: __('Align Left', 'gutenverse'),
                    value: 'flex-start',
                    icon: <AlignLeft />,
                },
                {
                    label: __('Align Center', 'gutenverse'),
                    value: 'center',
                    icon: <AlignCenter />,
                },
                {
                    label: __('Align Right', 'gutenverse'),
                    value: 'flex-end',
                    icon: <AlignRight />,
                },
            ],
            style: [
                {
                    selector: `.${elementId}`,
                    render: value => `justify-content: ${value};`
                },
            ]
        },
        {
            id: 'size',
            label: __('Size', 'gutenverse'),
            component: SizeControl,
            allowDeviceControl: true,
            units: {
                px: {
                    text: 'px',
                    min: 1,
                    max: 1000,
                    step: 1
                },
                em: {
                    text: 'em',
                    min: 1,
                    max: 100,
                    step: 0.1
                },
                ['%']: {
                    text: '%',
                    min: 1,
                    max: 100,
                    step: 1
                },
            },
            style: [
                {
                    selector: `.${elementId} img`,
                    render: value => handleUnitPoint(value, 'max-width')
                },
            ],
        },
        {
            id: 'opacity',
            label: __('Opacity', 'gutenverse'),
            component: RangeControl,
            allowDeviceControl: true,
            min: 1,
            max: 100,
            step: 1,
            style: [
                {
                    selector: `.${elementId} img`,
                    render: value => `opacity: calc(${value}/100);`
                },
            ],
        },
        {
            id: 'rotate',
            label: __('Rotate', 'gutenverse'),
            component: RangeControl,
            allowDeviceControl: true,
            unit: 'deg',
            min: 0,
            max: 360,
            step: 1,
            style: [
                {
                    selector: `.${elementId} img`,
                    render: value => `transform: rotate(${value}deg);`
                },
            ],
        },
        {
            id: 'imageBorder',
            show: device === 'Desktop',
            label: __('Border', 'gutenverse'),
            component: BorderControl,
            style: [
                {
                    selector: `.${elementId} img`,
                    hasChild: true,
                    render: value => handleBorder(value)
                }
            ]
        },
        {
            id: 'imageBorderResponsive',
            show: device !== 'Desktop',
            label: __('Border', 'gutenverse'),
            component: BorderResponsiveControl,
            allowDeviceControl: true,
            style: [
                {
                    selector: `.${elementId} img`,
                    allowRender: () => device !== 'Desktop',
                    render: value => handleBorderResponsive(value)
                }
            ]
        },
        {
            id: 'imageBoxShadow',
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

