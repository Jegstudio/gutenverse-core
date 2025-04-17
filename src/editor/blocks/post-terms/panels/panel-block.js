import { __ } from '@wordpress/i18n';
import { AlignCenter, AlignLeft, AlignRight } from 'gutenverse-core/components';
import { AlertControl, BackgroundControl, BorderResponsiveControl, BoxShadowControl, DimensionControl, IconRadioControl, RangeControl, SelectControl, SwitchControl } from 'gutenverse-core/controls';

export const blockPanel = (props) => {
    const {
        elementId,
        contentType,
        inlineDisplay,
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
            show: !inlineDisplay && contentType === 'block',
            allowDeviceControl: true,
            description: __('This option only show if Content Type : "Block" with Display Content Inline "On"', 'gutenverse'),
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
        },
        {
            id: '__termHover',
            component: SwitchControl,
            show: contentType === 'block',
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
            onChange: ({ __termHover }) => setSwitcher({ ...switcher, termHover: __termHover })
        },
        {
            id: 'termBackground',
            component: BackgroundControl,
            allowDeviceControl: true,
            options: [ 'default', 'gradient' ],
            show: contentType === 'block' && ( !switcher.termHover || switcher.termHover === 'normal' ),
            liveStyle: [
                {
                    'type': 'background',
                    'id': 'termBackground',
                    'selector': `.${elementId} .post-term-block .term-item`,
                }
            ]
        },
        {
            id: 'termBackgroundHover',
            component: BackgroundControl,
            allowDeviceControl: true,
            options: [ 'default', 'gradient' ],
            show: contentType === 'block' && ( switcher.termHover === 'hover' ),
            liveStyle: [
                {
                    'type': 'background',
                    'id': 'termBackgroundHover',
                    'selector': `.${elementId} .post-term-block .term-item:hover`,
                }
            ]
        },
        {
            id: 'termBorder',
            show: contentType === 'block' && ( !switcher.termHover || switcher.termHover === 'normal' ),
            label: __('Border', 'gutenverse'),
            component: BorderResponsiveControl,
            allowDeviceControl: true,
            liveStyle: [
                {
                    'type': 'borderResponsive',
                    'id': 'termBorder',
                    'selector': `.${elementId} .post-term-block .term-item`,
                }
            ],
        },
        {
            id: 'termBorderHover',
            show: contentType === 'block' && ( switcher.termHover === 'hover' ),
            label: __('Border', 'gutenverse'),
            component: BorderResponsiveControl,
            allowDeviceControl: true,
            liveStyle: [
                {
                    'type': 'borderResponsive',
                    'id': 'termBorderHover',
                    'selector': `.${elementId} .post-term-block .term-item:hover`,
                }
            ],
        },
        {
            id: 'termBoxShadow',
            show: contentType === 'block' && ( !switcher.termHover || switcher.termHover === 'normal' ),
            label: __('Box Shadow', 'gutenverse'),
            component: BoxShadowControl,
            liveStyle: [
                {
                    'type': 'boxShadow',
                    'id': 'termBoxShadow',
                    'properties': [
                        {
                            'name': 'box-shadow',
                            'valueType': 'direct'
                        }
                    ],
                    'selector': `.${elementId} .post-term-block .term-item`,
                }
            ],
        },
        {
            id: 'termBoxShadowHover',
            show: contentType === 'block' && ( switcher.termHover === 'hover' ),
            label: __('Box Shadow', 'gutenverse'),
            component: BoxShadowControl,
            liveStyle: [
                {
                    'type': 'boxShadow',
                    'id': 'termBoxShadowHover',
                    'properties': [
                        {
                            'name': 'box-shadow',
                            'valueType': 'direct'
                        }
                    ],
                    'selector': `.${elementId} .post-term-block .term-item:hover`,
                }
            ],
        },
    ];
};