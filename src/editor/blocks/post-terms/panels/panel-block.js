import { __ } from '@wordpress/i18n';
import { AlignCenter, AlignLeft, AlignRight } from 'gutenverse-core/components';
import { AlertControl, BackgroundControl, BorderResponsiveControl, BoxShadowControl, ColorControl, DimensionControl, IconRadioControl, RangeControl, SelectControl, SwitchControl } from 'gutenverse-core/controls';
import { allowRenderBoxShadow, handleBackground, handleBorderResponsive, handleBoxShadow, handleColor, handleDimension } from 'gutenverse-core/styling';

export const blockPanel = (props) => {
    const {
        elementId,
        contentType,
        switcher,
        setSwitcher
    } = props;

    return [
        {
            id: 'term-notice',
            component: AlertControl,
            children: <>
                <span>{__('This Panel Option Only Show If You Choose Content Type "Block"')}</span>
            </>
        },
        {
            id: 'termAlignment',
            label: __('Alignment', 'gutenverse'),
            component: IconRadioControl,
            allowDeviceControl: true,
            options: [
                {
                    label: __('Align Left', 'gutenverse'),
                    value: 'start',
                    icon: <AlignLeft />,
                },
                {
                    label: __('Align Center', 'gutenverse'),
                    value: 'center',
                    icon: <AlignCenter />,
                },
                {
                    label: __('Align Right', 'gutenverse'),
                    value: 'end',
                    icon: <AlignRight />,
                }
            ],
            style: [
                {
                    selector: `.${elementId} .post-term-block .term-item`,
                    render: value => `text-align: ${value};`
                },
            ]
        },
        {
            id: 'termPadding',
            show: contentType === 'block',
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
            style: [
                {
                    selector: `.${elementId} .post-term-block .term-item`,
                    render: value => handleDimension(value, 'padding')
                }
            ],
        },
        {
            id: '__termHover',
            component: SwitchControl,
            options: [
                {
                    value: 'normal',
                    label: 'Normal'
                },
                {
                    value: 'hover',
                    label: 'Hover'
                }
            ],
            onChange: ({ __termHover }) => setSwitcher({ ...switcher, term: __termHover })
        },
        {
            id: 'termBackground',
            label: __('Background', 'gutenverse'),
            component: BackgroundControl,
            allowDeviceControl: true,
            options: [ 'default', 'gradient' ],
            show: contentType === 'block' && ( !switcher.termHover || switcher.termHover === 'normal' ),
            style: [
                {
                    selector: `.${elementId} .post-term-block .term-item`,
                    hasChild: true,
                    render: value => handleBackground(value)
                }
            ]
        },
        {
            id: 'termBackgroundHover',
            label: __('Background', 'gutenverse'),
            component: BackgroundControl,
            allowDeviceControl: true,
            options: [ 'default', 'gradient' ],
            show: contentType === 'block' && ( switcher.termHover === 'hover' ),
            style: [
                {
                    selector: `.${elementId} .post-term-block .term-item:hover`,
                    hasChild: true,
                    render: value => handleBackground(value)
                }
            ]
        },
        {
            id: 'termBorder',
            show: contentType === 'block' && ( !switcher.termHover || switcher.termHover === 'normal' ),
            label: __('Border', 'gutenverse'),
            component: BorderResponsiveControl,
            allowDeviceControl: true,
            style: [
                {
                    selector: `.${elementId} .post-term-block .term-item`,
                    render: value => handleBorderResponsive(value)
                }
            ]
        },
        {
            id: 'termBorderHover',
            show: contentType === 'block' && ( switcher.termHover === 'hover' ),
            label: __('Border', 'gutenverse'),
            component: BorderResponsiveControl,
            allowDeviceControl: true,
            style: [
                {
                    selector: `.${elementId} .post-term-block .term-item:hover`,
                    render: value => handleBorderResponsive(value)
                }
            ]
        },
        {
            id: 'termBoxShadow',
            show: contentType === 'block' && ( !switcher.termHover || switcher.termHover === 'normal' ),
            label: __('Box Shadow', 'gutenverse'),
            component: BoxShadowControl,
            style: [
                {
                    selector: `.${elementId} .post-term-block .term-item`,
                    allowRender: (value) => allowRenderBoxShadow(value),
                    render: value => handleBoxShadow(value)
                }
            ]
        },
        {
            id: 'termBoxShadowHover',
            show: contentType === 'block' && ( switcher.termHover === 'hover' ),
            label: __('Box Shadow', 'gutenverse'),
            component: BoxShadowControl,
            style: [
                {
                    selector: `.${elementId} .post-term-block .term-item:hover`,
                    allowRender: (value) => allowRenderBoxShadow(value),
                    render: value => handleBoxShadow(value)
                }
            ]
        },
    ];
};