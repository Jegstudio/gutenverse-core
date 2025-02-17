
import { __ } from '@wordpress/i18n';
import { BackgroundControl, BorderResponsiveControl, BoxShadowControl, CheckboxControl, ColorControl, DimensionControl, HeadingControl, RangeControl, SelectControl, SizeControl, SwitchControl, TypographyControl } from 'gutenverse-core/controls';

export const timeStylePanel = (props) => {
    const {
        elementId,
        oneForAll,
        switcher,
        setSwitcher,
    } = props;

    return [
        {
            id: 'oneForAll',
            label: __('One For All', 'gutenverse'),
            component: CheckboxControl
        },
        {
            id: '__tabTime',
            component: SwitchControl,
            show: !oneForAll,
            options: [
                {
                    value: 'days',
                    label: 'Days'
                },
                {
                    value: 'hours',
                    label: 'Hours'
                },
                {
                    value: 'minutes',
                    label: 'Minutes'
                },
                {
                    value: 'seconds',
                    label: 'Seconds'
                }
            ],
            onChange: ({ __tabTime }) => setSwitcher({ ...switcher, tabTime: __tabTime })
        },
        {
            id: 'digitlabelOptions',
            component: HeadingControl,
            label: __('Digit & Label Style', 'gutenverse'),
        },
        {
            id: 'oneForAllDigitColor',
            label: __('Digit color', 'gutenverse'),
            show: oneForAll,
            component: ColorControl,
            liveStyle: [
                {
                    'type': 'color',
                    'id': 'oneForAllDigitColor',
                    'selector': `.guten-element.guten-countdown.${elementId} .time-container .countdown-value`,
                    'properties': [
                        {
                            'name': 'color',
                            'valueType': 'direct'
                        }
                    ]
                }
            ]
        },
        {
            id: 'oneForAllDigitTypography',
            label: __('Digit Typography', 'gutenverse'),
            component: TypographyControl,
            show: oneForAll,

        },
        {
            id: 'oneForAllLabelColor',
            label: __('Label color', 'gutenverse'),
            show: oneForAll,
            component: ColorControl,
            liveStyle: [
                {
                    'type': 'color',
                    'id': 'oneForAllLabelColor',
                    'selector': `.guten-element.guten-countdown.${elementId} .time-container .countdown-label`,
                    'properties': [
                        {
                            'name': 'color',
                            'valueType': 'direct'
                        }
                    ]
                }
            ]
        },
        {
            id: 'oneForAllLabelTypography',
            label: __('Label Typography', 'gutenverse'),
            component: TypographyControl,
            show: oneForAll,
        },
        {
            id: 'daysDigitColor',
            label: __('Digit color', 'gutenverse'),
            show: !oneForAll && (switcher.tabTime === 'days' || !switcher.tabTime),
            component: ColorControl,
            liveStyle: [
                {
                    'type': 'color',
                    'id': 'daysDigitColor',
                    'selector': `.guten-element.guten-countdown.${elementId} .days-wrapper .countdown-value`,
                    'properties': [
                        {
                            'name': 'color',
                            'valueType': 'direct'
                        }
                    ]
                }
            ]
        },
        {
            id: 'daysDigitTypography',
            label: __('Digit Typography', 'gutenverse'),
            component: TypographyControl,
            show: !oneForAll && (switcher.tabTime === 'days' || !switcher.tabTime),
        },
        {
            id: 'daysLabelColor',
            label: __('Label color', 'gutenverse'),
            show: !oneForAll && (switcher.tabTime === 'days' || !switcher.tabTime),
            component: ColorControl,
            liveStyle: [
                {
                    'type': 'color',
                    'id': 'daysLabelColor',
                    'selector': `.guten-element.guten-countdown.${elementId} .days-wrapper .countdown-label`,
                    'properties': [
                        {
                            'name': 'color',
                            'valueType': 'direct'
                        }
                    ]
                }
            ]

        },
        {
            id: 'daysLabelTypography',
            label: __('Label Typography', 'gutenverse'),
            component: TypographyControl,
            show: !oneForAll && (switcher.tabTime === 'days' || !switcher.tabTime),
        },
        {
            id: 'hoursDigitColor',
            label: __('Digit color', 'gutenverse'),
            show: !oneForAll && switcher.tabTime === 'hours',
            component: ColorControl,
            liveStyle: [
                {
                    'type': 'color',
                    'id': 'hoursDigitColor',
                    'selector': `.guten-element.guten-countdown.${elementId} .hours-wrapper .countdown-value`,
                    'properties': [
                        {
                            'name': 'color',
                            'valueType': 'direct'
                        }
                    ]
                }
            ]
        },
        {
            id: 'hoursDigitTypography',
            label: __('Digit Typography', 'gutenverse'),
            component: TypographyControl,
            show: !oneForAll && switcher.tabTime === 'hours',
        },
        {
            id: 'hoursLabelColor',
            label: __('Label color', 'gutenverse'),
            show: !oneForAll && switcher.tabTime === 'hours',
            component: ColorControl,
            liveStyle: [
                {
                    'type': 'color',
                    'id': 'hoursLabelColor',
                    'selector': `.guten-element.guten-countdown.${elementId} .hours-wrapper .countdown-label`,
                    'properties': [
                        {
                            'name': 'color',
                            'valueType': 'direct'
                        }
                    ]
                }
            ]
        },
        {
            id: 'hoursLabelTypography',
            label: __('Label Typography', 'gutenverse'),
            component: TypographyControl,
            show: !oneForAll && switcher.tabTime === 'hours',
        },
        {
            id: 'minutesDigitColor',
            label: __('Digit color', 'gutenverse'),
            show: !oneForAll && switcher.tabTime === 'minutes',
            component: ColorControl,
            liveStyle: [
                {
                    'type': 'color',
                    'id': 'minutesDigitColor',
                    'selector': `.guten-element.guten-countdown.${elementId} .minutes-wrapper .countdown-value`,
                    'properties': [
                        {
                            'name': 'color',
                            'valueType': 'direct'
                        }
                    ]
                }
            ]
        },
        {
            id: 'minutesDigitTypography',
            label: __('Digit Typography', 'gutenverse'),
            component: TypographyControl,
            show: !oneForAll && switcher.tabTime === 'minutes',
        },
        {
            id: 'minutesLabelColor',
            label: __('Label color', 'gutenverse'),
            show: !oneForAll && switcher.tabTime === 'minutes',
            component: ColorControl,
            liveStyle: [
                {
                    'type': 'color',
                    'id': 'minutesLabelColor',
                    'selector': `.guten-element.guten-countdown.${elementId} .minutes-wrapper .countdown-label`,
                    'properties': [
                        {
                            'name': 'color',
                            'valueType': 'direct'
                        }
                    ]
                }
            ]
        },
        {
            id: 'minutesLabelTypography',
            label: __('Label Typography', 'gutenverse'),
            component: TypographyControl,
            show: !oneForAll && switcher.tabTime === 'minutes',
        },
        {
            id: 'secondsDigitColor',
            label: __('Digit color', 'gutenverse'),
            show: !oneForAll && switcher.tabTime === 'seconds',
            component: ColorControl,
            liveStyle: [
                {
                    'type': 'color',
                    'id': 'secondsDigitColor',
                    'selector': `.guten-element.guten-countdown.${elementId} .seconds-wrapper .countdown-value`,
                    'properties': [
                        {
                            'name': 'color',
                            'valueType': 'direct'
                        }
                    ]
                }
            ]
        },
        {
            id: 'secondsDigitTypography',
            label: __('Digit Typography', 'gutenverse'),
            component: TypographyControl,
            show: !oneForAll && switcher.tabTime === 'seconds',
        },
        {
            id: 'secondsLabelColor',
            label: __('Label color', 'gutenverse'),
            show: !oneForAll && switcher.tabTime === 'seconds',
            component: ColorControl,
            liveStyle: [
                {
                    'type': 'color',
                    'id': 'secondsLabelColor',
                    'selector': `.guten-element.guten-countdown.${elementId} .seconds-wrapper .countdown-label`,
                    'properties': [
                        {
                            'name': 'color',
                            'valueType': 'direct'
                        }
                    ]
                }
            ]
        },
        {
            id: 'secondsLabelTypography',
            label: __('Label Typography', 'gutenverse'),
            component: TypographyControl,
            show: !oneForAll && switcher.tabTime === 'seconds',
        },
        {
            id: 'backgroundOptions',
            component: HeadingControl,
            label: __('Background', 'gutenverse'),
        },
        {
            id: '__oneForAllBackgroundTab',
            component: SwitchControl,
            show: oneForAll,
            options: [
                {
                    value: 'normal',
                    label: 'Normal'
                },
                {
                    value: 'hover',
                    label: 'Hover'
                },
            ],
            onChange: ({ __oneForAllBackgroundTab }) => setSwitcher({ ...switcher, oneForAllBackgroundTab: __oneForAllBackgroundTab })
        },
        {
            id: 'oneForAllBackground',
            show: oneForAll && (switcher.oneForAllBackgroundTab === 'normal' || !switcher.oneForAllBackgroundTab),
            component: BackgroundControl,
            label: __('Background', 'gutenverse'),
            allowDeviceControl: true,
            options: ['default', 'gradient'],
            liveStyle: [
                {
                    'type': 'background',
                    'id': 'oneForAllBackground',
                    'selector': `.guten-element.guten-countdown.${elementId} .time-container`,
                }
            ]
        },
        {
            id: 'oneForAllBackgroundHover',
            show: oneForAll && switcher.oneForAllBackgroundTab === 'hover',
            label: __('Background Hover', 'gutenverse'),
            component: BackgroundControl,
            allowDeviceControl: true,
            options: ['default', 'gradient'],
            liveStyle: [
                {
                    'type': 'background',
                    'id': 'oneForAllBackgroundHover',
                    'selector': `.guten-element.guten-countdown.${elementId} .time-container:hover`,
                }
            ]
        },
        {
            id: '__daysBackgroundTab',
            component: SwitchControl,
            show: !oneForAll && (switcher.tabTime === 'days' || !switcher.tabTime),
            options: [
                {
                    value: 'normal',
                    label: 'Normal'
                },
                {
                    value: 'hover',
                    label: 'Hover'
                },
            ],
            onChange: ({ __daysBackgroundTab }) => setSwitcher({ ...switcher, daysBackgroundTab: __daysBackgroundTab })
        },
        {
            id: 'daysBackground',
            show: !oneForAll && (switcher.tabTime === 'days' || !switcher.tabTime) && ('normal' === switcher.daysBackgroundTab || !switcher.daysBackgroundTab),
            component: BackgroundControl,
            label: __('Background', 'gutenverse'),
            allowDeviceControl: true,
            options: ['default', 'gradient'],
            liveStyle: [
                {
                    'type': 'background',
                    'id': 'daysBackground',
                    'selector': `.guten-element.guten-countdown.${elementId} .days-wrapper`,
                }
            ]
        },
        {
            id: 'daysBackgroundHover',
            show: !oneForAll && (switcher.tabTime === 'days' || !switcher.tabTime) && 'hover' === switcher.daysBackgroundTab,
            label: __('Background Hover', 'gutenverse'),
            component: BackgroundControl,
            allowDeviceControl: true,
            options: ['default', 'gradient'],
            liveStyle: [
                {
                    'type': 'background',
                    'id': 'daysBackgroundHover',
                    'selector': `.guten-element.guten-countdown.${elementId} .days-wrapper:hover`,
                }
            ]
        },
        {
            id: '__hoursBackgroundTab',
            component: SwitchControl,
            show: !oneForAll && switcher.tabTime === 'hours',
            options: [
                {
                    value: 'normal',
                    label: 'Normal'
                },
                {
                    value: 'hover',
                    label: 'Hover'
                },
            ],
            onChange: ({ __hoursBackgroundTab }) => setSwitcher({ ...switcher, hoursBackgroundTab: __hoursBackgroundTab })
        },
        {
            id: 'hoursBackground',
            show: !oneForAll && switcher.tabTime === 'hours' && (switcher.hoursBackgroundTab === 'normal' || !switcher.hoursBackgroundTab),
            component: BackgroundControl,
            label: __('Background', 'gutenverse'),
            allowDeviceControl: true,
            options: ['default', 'gradient'],
            liveStyle: [
                {
                    'type': 'background',
                    'id': 'hoursBackground',
                    'selector': `.guten-element.guten-countdown.${elementId} .hours-wrapper`,
                }
            ]
        },
        {
            id: 'hoursBackgroundHover',
            show: !oneForAll && switcher.tabTime === 'hours' && switcher.hoursBackgroundTab === 'hover',
            label: __('Background Hover', 'gutenverse'),
            component: BackgroundControl,
            allowDeviceControl: true,
            options: ['default', 'gradient'],
            liveStyle: [
                {
                    'type': 'background',
                    'id': 'hoursBackgroundHover',
                    'selector': `.guten-element.guten-countdown.${elementId} .hours-wrapper:hover`
                }
            ]
        },
        {
            id: '__minutesBackgroundTab',
            component: SwitchControl,
            show: !oneForAll && switcher.tabTime === 'minutes',
            options: [
                {
                    value: 'normal',
                    label: 'Normal'
                },
                {
                    value: 'hover',
                    label: 'Hover'
                },
            ],
            onChange: ({ __minutesBackgroundTab }) => setSwitcher({ ...switcher, minutesBackgroundTab: __minutesBackgroundTab })
        },
        {
            id: 'minutesBackground',
            show: !oneForAll && switcher.tabTime === 'minutes' && (switcher.minutesBackgroundTab === 'normal' || !switcher.minutesBackgroundTab),
            component: BackgroundControl,
            label: __('Background', 'gutenverse'),
            allowDeviceControl: true,
            options: ['default', 'gradient'],
            liveStyle: [
                {
                    'type': 'background',
                    'id': 'minutesBackground',
                    'selector': `.guten-element.guten-countdown.${elementId} .minutes-wrapper`,
                }
            ]
        },
        {
            id: 'minutesBackgroundHover',
            show: !oneForAll && switcher.tabTime === 'minutes' && switcher.minutesBackgroundTab === 'hover',
            label: __('Background Hover', 'gutenverse'),
            component: BackgroundControl,
            allowDeviceControl: true,
            options: ['default', 'gradient'],
            liveStyle: [
                {
                    'type': 'background',
                    'id': 'minutesBackgroundHover',
                    'selector': `.guten-element.guten-countdown.${elementId} .minutes-wrapper:hover`,
                }
            ]
        },
        {
            id: '__secondsBackgroundTab',
            component: SwitchControl,
            show: !oneForAll && switcher.tabTime === 'seconds',
            options: [
                {
                    value: 'normal',
                    label: 'Normal'
                },
                {
                    value: 'hover',
                    label: 'Hover'
                },
            ],
            onChange: ({ __secondsBackgroundTab }) => setSwitcher({ ...switcher, secondsBackgroundTab: __secondsBackgroundTab })
        },
        {
            id: 'secondsBackground',
            show: !oneForAll && switcher.tabTime === 'seconds' && (switcher.secondsBackgroundTab === 'normal' || !switcher.secondsBackgroundTab),
            component: BackgroundControl,
            label: __('Background', 'gutenverse'),
            allowDeviceControl: true,
            options: ['default', 'gradient'],
            liveStyle: [
                {
                    'type': 'background',
                    'id': 'secondsBackground',
                    'selector': `.guten-element.guten-countdown.${elementId} .seconds-wrapper`,
                }
            ]
        },
        {
            id: 'secondsBackgroundHover',
            show: !oneForAll && switcher.tabTime === 'seconds' && switcher.minutesBackgroundTab === 'hover',
            label: __('Background Hover', 'gutenverse'),
            component: BackgroundControl,
            allowDeviceControl: true,
            options: ['default', 'gradient'],
            liveStyle: [
                {
                    'type': 'background',
                    'id': 'secondsBackgroundHover',
                    'selector': `.guten-element.guten-countdown.${elementId} .seconds-wrapper:hover`,
                }
            ]
        },
        {
            id: 'borderOptions',
            component: HeadingControl,
            label: __('Border', 'gutenverse'),
        },
        {
            id: '__oneForAllBorderTab',
            component: SwitchControl,
            show: oneForAll,
            options: [
                {
                    value: 'normal',
                    label: 'Normal'
                },
                {
                    value: 'hover',
                    label: 'Hover'
                },
            ],
            onChange: ({ __oneForAllBorderTab }) => setSwitcher({ ...switcher, oneForAllBorderTab: __oneForAllBorderTab })
        },
        {
            id: 'oneForAllBorder',
            show: oneForAll && (switcher.oneForAllBorderTab === 'normal' || !switcher.oneForAllBorderTab),
            component: BorderResponsiveControl,
            label: __('Border', 'gutenverse'),
            allowDeviceControl: true,
            liveStyle: [
                {
                    'type': 'borderResponsive',
                    'id': 'oneForAllBorder',
                    'selector': `.guten-element.guten-countdown.${elementId} .time-container`,
                }
            ]
        },
        {
            id: 'oneForAllBorderHover',
            show: oneForAll && switcher.oneForAllBorderTab === 'hover',
            label: __('Border Hover', 'gutenverse'),
            component: BorderResponsiveControl,
            allowDeviceControl: true,
            liveStyle: [
                {
                    'type': 'borderResponsive',
                    'id': 'oneForAllBorderHover',
                    'selector': `.guten-element.guten-countdown.${elementId} .time-container`,
                }
            ]
        },
        {
            id: '__daysBorderTab',
            component: SwitchControl,
            show: !oneForAll && (switcher.tabTime === 'days' || !switcher.tabTime),
            options: [
                {
                    value: 'normal',
                    label: 'Normal'
                },
                {
                    value: 'hover',
                    label: 'Hover'
                },
            ],
            onChange: ({ __daysBorderTab }) => setSwitcher({ ...switcher, daysBorderTab: __daysBorderTab })
        },
        {
            id: 'daysBorder',
            show: !oneForAll && (switcher.tabTime === 'days' || !switcher.tabTime) && (switcher.daysBorderTab === 'normal' || !switcher.daysBorderTab),
            component: BorderResponsiveControl,
            label: __('Border', 'gutenverse'),
            allowDeviceControl: true,
            liveStyle: [
                {
                    'type': 'borderResponsive',
                    'id': 'daysBorder',
                    'selector': `.guten-element.guten-countdown.${elementId} .days-wrapper`,
                }
            ]
        },
        {
            id: 'daysBorderHover',
            show: !oneForAll && (switcher.tabTime === 'days' || !switcher.tabTime) && switcher.daysBorderTab === 'hover',
            label: __('Border Hover', 'gutenverse'),
            component: BorderResponsiveControl,
            allowDeviceControl: true,
            liveStyle: [
                {
                    'type': 'borderResponsive',
                    'id': 'daysBorderHover',
                    'selector': `.guten-element.guten-countdown.${elementId} .days-wrapper`,
                }
            ]
        },
        {
            id: '__hoursBorderTab',
            component: SwitchControl,
            show: !oneForAll && switcher.tabTime === 'hours',
            options: [
                {
                    value: 'normal',
                    label: 'Normal'
                },
                {
                    value: 'hover',
                    label: 'Hover'
                },
            ],
            onChange: ({ __hoursBorderTab }) => setSwitcher({ ...switcher, hoursBorderTab: __hoursBorderTab })
        },
        {
            id: 'hoursBorder',
            show: !oneForAll && switcher.tabTime === 'hours' && (switcher.hoursBorderTab === 'normal' || !switcher.hoursBorderTab),
            component: BorderResponsiveControl,
            label: __('Border', 'gutenverse'),
            allowDeviceControl: true,
            liveStyle: [
                {
                    'type': 'borderResponsive',
                    'id': 'hoursBorder',
                    'selector': `.guten-element.guten-countdown.${elementId} .hours-wrapper`,
                }
            ]
        },
        {
            id: 'hoursBorderHover',
            show: !oneForAll && switcher.tabTime === 'hours' && switcher.hoursBorderTab === 'hover',
            label: __('Border Hover', 'gutenverse'),
            component: BorderResponsiveControl,
            allowDeviceControl: true,
            liveStyle: [
                {
                    'type': 'borderResponsive',
                    'id': 'hoursBorderHover',
                    'selector': `.guten-element.guten-countdown.${elementId} .hours-wrapper`,
                }
            ]
        },
        {
            id: '__minutesBorderTab',
            component: SwitchControl,
            show: !oneForAll && switcher.tabTime === 'minutes',
            options: [
                {
                    value: 'normal',
                    label: 'Normal'
                },
                {
                    value: 'hover',
                    label: 'Hover'
                },
            ],
            onChange: ({ __minutesBorderTab }) => setSwitcher({ ...switcher, minutesBorderTab: __minutesBorderTab })
        },
        {
            id: 'minutesBorder',
            show: !oneForAll && switcher.tabTime === 'minutes' && (switcher.minutesBorderTab === 'normal' || !switcher.minutesBorderTab),
            component: BorderResponsiveControl,
            label: __('Border', 'gutenverse'),
            allowDeviceControl: true,
            liveStyle: [
                {
                    'type': 'borderResponsive',
                    'id': 'minutesBorder',
                    'selector': `.guten-element.guten-countdown.${elementId} .minutes-wrapper`,
                }
            ]
        },
        {
            id: 'minutesBorderHover',
            show: !oneForAll && switcher.tabTime === 'minutes' && switcher.minutesBorderTab === 'hover',
            label: __('Border Hover', 'gutenverse'),
            component: BorderResponsiveControl,
            allowDeviceControl: true,
            liveStyle: [
                {
                    'type': 'borderResponsive',
                    'id': 'minutesBorderHover',
                    'selector': `.guten-element.guten-countdown.${elementId} .minutes-wrapper`,
                }
            ]
        },
        {
            id: '__secondsBorderTab',
            component: SwitchControl,
            show: !oneForAll && switcher.tabTime === 'seconds',
            options: [
                {
                    value: 'normal',
                    label: 'Normal'
                },
                {
                    value: 'hover',
                    label: 'Hover'
                },
            ],
            onChange: ({ __secondsBorderTab }) => setSwitcher({ ...switcher, secondsBorderTab: __secondsBorderTab })
        },
        {
            id: 'secondsBorder',
            show: !oneForAll && switcher.tabTime === 'seconds' && (switcher.secondsBorderTab === 'normal' || !switcher.secondsBorderTab),
            component: BorderResponsiveControl,
            label: __('Border', 'gutenverse'),
            allowDeviceControl: true,
            liveStyle: [
                {
                    'type': 'borderResponsive',
                    'id': 'secondsBorder',
                    'selector': `.guten-element.guten-countdown.${elementId} .seconds-wrapper`,
                }
            ]
        },
        {
            id: 'secondsBorderHover',
            show: !oneForAll && switcher.tabTime === 'seconds' && switcher.secondsBorderTab === 'hover',
            label: __('Border Hover', 'gutenverse'),
            component: BorderResponsiveControl,
            allowDeviceControl: true,
            liveStyle: [
                {
                    'type': 'borderResponsive',
                    'id': 'secondsBorderHover',
                    'selector': `.guten-element.guten-countdown.${elementId} .seconds-wrapper`,
                }
            ]
        },
        {
            id: 'boxShadowOptions',
            component: HeadingControl,
            label: __('Box Shadow', 'gutenverse'),
        },
        {
            id: '__oneForAllBoxShadowTab',
            component: SwitchControl,
            show: oneForAll,
            options: [
                {
                    value: 'normal',
                    label: 'Normal'
                },
                {
                    value: 'hover',
                    label: 'Hover'
                },
            ],
            onChange: ({ __oneForAllBoxShadowTab }) => setSwitcher({ ...switcher, oneForAllBoxShadowTab: __oneForAllBoxShadowTab })
        },
        {
            id: 'oneForAllBoxShadow',
            show: oneForAll && (switcher.oneForAllBoxShadowTab === 'normal' || !switcher.oneForAllBoxShadowTab),
            component: BoxShadowControl,
            label: __('Box Shadow', 'gutenverse'),
            liveStyle: [
                {
                    'type': 'boxShadow',
                    'id': 'oneForAllBoxShadow',
                    'properties': [
                        {
                            'name': 'box-shadow',
                            'valueType': 'direct'
                        }
                    ],
                    'selector': `.editor-styles-wrapper .${elementId}.guten-countdown .time-container`,
                }
            ]
        },
        {
            id: 'oneForAllBoxShadowHover',
            show: oneForAll && switcher.oneForAllBoxShadowTab === 'hover',
            label: __('Box Shadow Hover', 'gutenverse'),
            component: BoxShadowControl,
            liveStyle: [
                {
                    'type': 'boxShadow',
                    'id': 'oneForAllBoxShadowHover',
                    'properties': [
                        {
                            'name': 'box-shadow',
                            'valueType': 'direct'
                        }
                    ],
                    'selector': `.guten-element.guten-countdown.${elementId} .time-container:hover`,
                }
            ]
        },
        {
            id: '__daysBoxShadowTab',
            component: SwitchControl,
            show: !oneForAll && (switcher.tabTime === 'days' || !switcher.tabTime),
            options: [
                {
                    value: 'normal',
                    label: 'Normal'
                },
                {
                    value: 'hover',
                    label: 'Hover'
                },
            ],
            onChange: ({ __daysBoxShadowTab }) => setSwitcher({ ...switcher, daysBoxShadowTab: __daysBoxShadowTab })
        },
        {
            id: 'daysBoxShadow',
            show: !oneForAll && (switcher.tabTime === 'days' || !switcher.tabTime) && (switcher.daysBoxShadowTab === 'normal' || !switcher.daysBoxShadowTab),
            component: BoxShadowControl,
            label: __('Box Shadow', 'gutenverse'),
            liveStyle: [
                {
                    'type': 'boxShadow',
                    'id': 'daysBoxShadow',
                    'properties': [
                        {
                            'name': 'box-shadow',
                            'valueType': 'direct'
                        }
                    ],
                    'selector': `.editor-styles-wrapper .${elementId}.guten-countdown .days-wrapper`,
                }
            ]
        },
        {
            id: 'daysBoxShadowHover',
            show: !oneForAll && (switcher.tabTime === 'days' || !switcher.tabTime) && switcher.daysBoxShadowTab === 'hover',
            label: __('Box Shadow Hover', 'gutenverse'),
            component: BoxShadowControl,
            liveStyle: [
                {
                    'type': 'boxShadow',
                    'id': 'daysBoxShadowHover',
                    'properties': [
                        {
                            'name': 'box-shadow',
                            'valueType': 'direct'
                        }
                    ],
                    'selector': `.guten-element.guten-countdown.${elementId} .days-wrapper:hover`,
                }
            ]
        },
        {
            id: '__hoursBoxShadowTab',
            component: SwitchControl,
            show: !oneForAll && switcher.tabTime === 'hours',
            options: [
                {
                    value: 'normal',
                    label: 'Normal'
                },
                {
                    value: 'hover',
                    label: 'Hover'
                },
            ],
            onChange: ({ __hoursBoxShadowTab }) => setSwitcher({ ...switcher, hoursBoxShadowTab: __hoursBoxShadowTab })
        },
        {
            id: 'hoursBoxShadow',
            show: !oneForAll && switcher.tabTime === 'hours' && (switcher.hoursBoxShadowTab === 'normal' || !switcher.hoursBoxShadowTab),
            component: BoxShadowControl,
            label: __('Box Shadow', 'gutenverse'),
            liveStyle: [
                {
                    'type': 'boxShadow',
                    'id': 'hoursBoxShadow',
                    'properties': [
                        {
                            'name': 'box-shadow',
                            'valueType': 'direct'
                        }
                    ],
                    'selector': `.editor-styles-wrapper .${elementId}.guten-countdown .hours-wrapper`,
                }
            ]
        },
        {
            id: 'hoursBoxShadowHover',
            show: !oneForAll && switcher.tabTime === 'hours' && switcher.hoursBoxShadowTab === 'hover',
            label: __('Box Shadow Hover', 'gutenverse'),
            component: BoxShadowControl,
            liveStyle: [
                {
                    'type': 'boxShadow',
                    'id': 'hoursBoxShadowHover',
                    'properties': [
                        {
                            'name': 'box-shadow',
                            'valueType': 'direct'
                        }
                    ],
                    'selector': `.guten-element.guten-countdown.${elementId} .hours-wrapper:hover`,
                }
            ]
        },
        {
            id: '__minutesBoxShadowTab',
            component: SwitchControl,
            show: !oneForAll && switcher.tabTime === 'minutes',
            options: [
                {
                    value: 'normal',
                    label: 'Normal'
                },
                {
                    value: 'hover',
                    label: 'Hover'
                },
            ],
            onChange: ({ __minutesBoxShadowTab }) => setSwitcher({ ...switcher, minutesBoxShadowTab: __minutesBoxShadowTab })
        },
        {
            id: 'minutesBoxShadow',
            show: !oneForAll && switcher.tabTime === 'minutes' && (switcher.minutesBoxShadowTab === 'normal' || !switcher.minutesBoxShadowTab),
            component: BoxShadowControl,
            label: __('Box Shadow', 'gutenverse'),
            liveStyle: [
                {
                    'type': 'boxShadow',
                    'id': 'minutesBoxShadow',
                    'properties': [
                        {
                            'name': 'box-shadow',
                            'valueType': 'direct'
                        }
                    ],
                    'selector': `.editor-styles-wrapper .${elementId}.guten-countdown .minutes-wrapper`,
                }
            ]
        },
        {
            id: 'minutesBoxShadowHover',
            show: !oneForAll && switcher.tabTime === 'minutes' && switcher.minutesBoxShadowTab === 'hover',
            label: __('Box Shadow Hover', 'gutenverse'),
            component: BoxShadowControl,
            liveStyle: [
                {
                    'type': 'boxShadow',
                    'id': 'minutesBoxShadowHover',
                    'properties': [
                        {
                            'name': 'box-shadow',
                            'valueType': 'direct'
                        }
                    ],
                    'selector': `.guten-element.guten-countdown.${elementId} .minutes-wrapper:hover`,
                }
            ]
        },
        {
            id: '__secondsBoxShadowTab',
            component: SwitchControl,
            show: !oneForAll && switcher.tabTime === 'seconds',
            options: [
                {
                    value: 'normal',
                    label: 'Normal'
                },
                {
                    value: 'hover',
                    label: 'Hover'
                },
            ],
            onChange: ({ __secondsBoxShadowTab }) => setSwitcher({ ...switcher, secondsBoxShadowTab: __secondsBoxShadowTab })
        },
        {
            id: 'secondsBoxShadow',
            show: !oneForAll && switcher.tabTime === 'seconds' && (switcher.secondsBoxShadowTab === 'normal' || !switcher.secondsBoxShadowTab),
            component: BoxShadowControl,
            label: __('Box Shadow', 'gutenverse'),
            liveStyle: [
                {
                    'type': 'boxShadow',
                    'id': 'secondsBoxShadow',
                    'properties': [
                        {
                            'name': 'box-shadow',
                            'valueType': 'direct'
                        }
                    ],
                    'selector': `.editor-styles-wrapper .${elementId}.guten-countdown .seconds-wrapper`,
                }
            ]
        },
        {
            id: 'secondsBoxShadowHover',
            show: !oneForAll && switcher.tabTime === 'seconds' && switcher.secondsBoxShadowTab === 'hover',
            label: __('Box Shadow Hover', 'gutenverse'),
            component: BoxShadowControl,
            liveStyle: [
                {
                    'type': 'boxShadow',
                    'id': 'secondsBoxShadowHover',
                    'properties': [
                        {
                            'name': 'box-shadow',
                            'valueType': 'direct'
                        }
                    ],
                    'selector': `.guten-element.guten-countdown.${elementId} .seconds-wrapper:hover`,
                }
            ]
        },
        {
            id: 'marginPaddingOptions',
            component: HeadingControl,
            label: __('Margin & Padding Options', 'gutenverse'),
        },
        {
            id: 'oneForAllPadding',
            show: oneForAll,
            component: DimensionControl,
            label: __('Padding', 'gutenverse'),
            allowDeviceControl: true,
            position: ['top', 'right', 'bottom', 'left'],
            units: {
                px: {
                    text: 'px',
                    unit: 'px'
                },
                em: {
                    text: 'em',
                    unit: 'em'
                },
                ['%']: {
                    text: '%',
                    unit: '%'
                },
                rem: {
                    text: 'rem',
                    unit: 'rem'
                },
            },

        },
        {
            id: 'oneForAllMargin',
            show: oneForAll,
            component: DimensionControl,
            label: __('Margin', 'gutenverse'),
            allowDeviceControl: true,
            position: ['top', 'right', 'bottom', 'left'],
            units: {
                px: {
                    text: 'px',
                    unit: 'px'
                },
                em: {
                    text: 'em',
                    unit: 'em'
                },
                ['%']: {
                    text: '%',
                    unit: '%'
                },
                rem: {
                    text: 'rem',
                    unit: 'rem'
                },
            },

        },
        {
            id: 'daysPadding',
            show: !oneForAll && (switcher.tabTime === 'days' || !switcher.tabTime),
            component: DimensionControl,
            label: __('Padding', 'gutenverse'),
            allowDeviceControl: true,
            position: ['top', 'right', 'bottom', 'left'],
            units: {
                px: {
                    text: 'px',
                    unit: 'px'
                },
                em: {
                    text: 'em',
                    unit: 'em'
                },
                ['%']: {
                    text: '%',
                    unit: '%'
                },
                rem: {
                    text: 'rem',
                    unit: 'rem'
                },
            },

        },
        {
            id: 'daysMargin',
            show: !oneForAll && (switcher.tabTime === 'days' || !switcher.tabTime),
            component: DimensionControl,
            label: __('Margin', 'gutenverse'),
            allowDeviceControl: true,
            position: ['top', 'right', 'bottom', 'left'],
            units: {
                px: {
                    text: 'px',
                    unit: 'px'
                },
                em: {
                    text: 'em',
                    unit: 'em'
                },
                ['%']: {
                    text: '%',
                    unit: '%'
                },
                rem: {
                    text: 'rem',
                    unit: 'rem'
                },
            },

        },
        {
            id: 'hoursPadding',
            show: !oneForAll && switcher.tabTime === 'hours',
            component: DimensionControl,
            label: __('Padding', 'gutenverse'),
            allowDeviceControl: true,
            position: ['top', 'right', 'bottom', 'left'],
            units: {
                px: {
                    text: 'px',
                    unit: 'px'
                },
                em: {
                    text: 'em',
                    unit: 'em'
                },
                ['%']: {
                    text: '%',
                    unit: '%'
                },
                rem: {
                    text: 'rem',
                    unit: 'rem'
                },
            },

        },
        {
            id: 'hoursMargin',
            show: !oneForAll && switcher.tabTime === 'hours',
            component: DimensionControl,
            label: __('Margin', 'gutenverse'),
            allowDeviceControl: true,
            position: ['top', 'right', 'bottom', 'left'],
            units: {
                px: {
                    text: 'px',
                    unit: 'px'
                },
                em: {
                    text: 'em',
                    unit: 'em'
                },
                ['%']: {
                    text: '%',
                    unit: '%'
                },
                rem: {
                    text: 'rem',
                    unit: 'rem'
                },
            },

        },
        {
            id: 'minutesPadding',
            show: !oneForAll && switcher.tabTime === 'minutes',
            component: DimensionControl,
            label: __('Padding', 'gutenverse'),
            allowDeviceControl: true,
            position: ['top', 'right', 'bottom', 'left'],
            units: {
                px: {
                    text: 'px',
                    unit: 'px'
                },
                em: {
                    text: 'em',
                    unit: 'em'
                },
                ['%']: {
                    text: '%',
                    unit: '%'
                },
                rem: {
                    text: 'rem',
                    unit: 'rem'
                },
            },

        },
        {
            id: 'minutesMargin',
            show: !oneForAll && switcher.tabTime === 'minutes',
            component: DimensionControl,
            label: __('Margin', 'gutenverse'),
            allowDeviceControl: true,
            position: ['top', 'right', 'bottom', 'left'],
            units: {
                px: {
                    text: 'px',
                    unit: 'px'
                },
                em: {
                    text: 'em',
                    unit: 'em'
                },
                ['%']: {
                    text: '%',
                    unit: '%'
                },
                rem: {
                    text: 'rem',
                    unit: 'rem'
                },
            },

        },
        {
            id: 'secondsPadding',
            show: !oneForAll && switcher.tabTime === 'seconds',
            component: DimensionControl,
            label: __('Padding', 'gutenverse'),
            allowDeviceControl: true,
            position: ['top', 'right', 'bottom', 'left'],
            units: {
                px: {
                    text: 'px',
                    unit: 'px'
                },
                em: {
                    text: 'em',
                    unit: 'em'
                },
                ['%']: {
                    text: '%',
                    unit: '%'
                },
                rem: {
                    text: 'rem',
                    unit: 'rem'
                },
            },

        },
        {
            id: 'secondsMargin',
            show: !oneForAll && switcher.tabTime === 'seconds',
            component: DimensionControl,
            label: __('Margin', 'gutenverse'),
            allowDeviceControl: true,
            position: ['top', 'right', 'bottom', 'left'],
            units: {
                px: {
                    text: 'px',
                    unit: 'px'
                },
                em: {
                    text: 'em',
                    unit: 'em'
                },
                ['%']: {
                    text: '%',
                    unit: '%'
                },
                rem: {
                    text: 'rem',
                    unit: 'rem'
                },
            },

        },
        {
            id: 'widthHeightOptions',
            component: HeadingControl,
            label: __('Width & Height Options', 'gutenverse'),
        },
        {
            id: 'oneForAllWidth',
            label: __('Set Width', 'gutenverse'),
            component: SizeControl,
            allowDeviceControl: true,
            show: oneForAll,
            units: {
                px: {
                    text: 'px',
                    unit: 'px',
                    min: 0,
                    max: 1000,
                    step: 1,
                },
                em: {
                    text: 'em',
                    unit: 'em',
                },
                ['%']: {
                    text: '%',
                    unit: '%'
                },
                rem: {
                    text: 'rem',
                    unit: 'rem'
                },
            },
            liveStyle: [
                {
                    'type': 'unitPoint',
                    'id': 'oneForAllWidth',
                    'responsive': true,
                    'properties': [
                        {
                            'name': 'width',
                            'valueType': 'direct'
                        }
                    ],
                    'selector': `.guten-element.guten-countdown.${elementId} .time-container`,
                }
            ]
        },
        {
            id: 'oneForAllHeight',
            label: __('Set Height', 'gutenverse'),
            component: RangeControl,
            allowDeviceControl: true,
            show: oneForAll,
            unit: 'px',
            min: 1,
            max: 1000,
            step: 1,
            liveStyle: [
                {
                    'type': 'plain',
                    'id': 'oneForAllHeight',
                    'responsive': true,
                    'properties': [
                        {
                            'name': 'height',
                            'valueType': 'pattern',
                            'pattern': '{value}px',
                            'patternValues': {
                                'value': {
                                    'type': 'direct'
                                }
                            }
                        }
                    ],
                    'selector': `.guten-element.guten-countdown.${elementId} .time-container`,
                }
            ]
        },
        {
            id: 'daysWidth',
            label: __('Set Width', 'gutenverse'),
            component: SizeControl,
            allowDeviceControl: true,
            show: !oneForAll && (switcher.tabTime === 'days' || !switcher.tabTime),
            units: {
                px: {
                    text: 'px',
                    unit: 'px',
                    min: 0,
                    max: 1000,
                    step: 1,
                },
                em: {
                    text: 'em',
                    unit: 'em',
                },
                ['%']: {
                    text: '%',
                    unit: '%'
                },
                rem: {
                    text: 'rem',
                    unit: 'rem'
                },
            },
            liveStyle: [
                {
                    'type': 'unitPoint',
                    'id': 'daysWidth',
                    'responsive': true,
                    'properties': [
                        {
                            'name': 'width',
                            'valueType': 'direct'
                        }
                    ],
                    'selector': `.guten-element.guten-countdown.${elementId} .days-wrapper`,
                }
            ]
        },
        {
            id: 'daysHeight',
            label: __('Set Height', 'gutenverse'),
            component: RangeControl,
            allowDeviceControl: true,
            show: !oneForAll && (switcher.tabTime === 'days' || !switcher.tabTime),
            unit: 'px',
            min: 1,
            max: 1000,
            step: 1,
            liveStyle: [
                {
                    'type': 'plain',
                    'id': 'daysHeight',
                    'responsive': true,
                    'properties': [
                        {
                            'name': 'height',
                            'valueType': 'pattern',
                            'pattern': '{value}px',
                            'patternValues': {
                                'value': {
                                    'type': 'direct'
                                }
                            }
                        }
                    ],
                    'selector': `.guten-element.guten-countdown.${elementId} .days-wrapper`,
                }
            ]
        },
        {
            id: 'hoursWidth',
            label: __('Set Width', 'gutenverse'),
            component: SizeControl,
            allowDeviceControl: true,
            show: !oneForAll && switcher.tabTime === 'hours',
            units: {
                px: {
                    text: 'px',
                    unit: 'px',
                    min: 0,
                    max: 1000,
                    step: 1,
                },
                em: {
                    text: 'em',
                    unit: 'em',
                },
                ['%']: {
                    text: '%',
                    unit: '%'
                },
                rem: {
                    text: 'rem',
                    unit: 'rem'
                },
            },
            liveStyle: [
                {
                    'type': 'unitPoint',
                    'id': 'hoursWidth',
                    'responsive': true,
                    'properties': [
                        {
                            'name': 'width',
                            'valueType': 'direct'
                        }
                    ],
                    'selector': `.guten-element.guten-countdown.${elementId} .hours-wrapper`,
                }
            ]
        },
        {
            id: 'hoursHeight',
            label: __('Set Height', 'gutenverse'),
            component: RangeControl,
            allowDeviceControl: true,
            show: !oneForAll && switcher.tabTime === 'hours',
            unit: 'px',
            min: 1,
            max: 1000,
            step: 1,
            liveStyle: [
                {
                    'type': 'plain',
                    'id': 'hoursHeight',
                    'responsive': true,
                    'properties': [
                        {
                            'name': 'height',
                            'valueType': 'pattern',
                            'pattern': '{value}px',
                            'patternValues': {
                                'value': {
                                    'type': 'direct'
                                }
                            }
                        }
                    ],
                    'selector': `.guten-element.guten-countdown.${elementId} .hours-wrapper`,
                }
            ]
        },
        {
            id: 'minutesWidth',
            label: __('Set Width', 'gutenverse'),
            component: SizeControl,
            allowDeviceControl: true,
            show: !oneForAll && switcher.tabTime === 'minutes',
            units: {
                px: {
                    text: 'px',
                    unit: 'px',
                    min: 0,
                    max: 1000,
                    step: 1,
                },
                em: {
                    text: 'em',
                    unit: 'em',
                },
                ['%']: {
                    text: '%',
                    unit: '%'
                },
                rem: {
                    text: 'rem',
                    unit: 'rem'
                },
            },
            liveStyle: [
                {
                    'type': 'unitPoint',
                    'id': 'minutesWidth',
                    'responsive': true,
                    'properties': [
                        {
                            'name': 'width',
                            'valueType': 'direct'
                        }
                    ],
                    'selector': `.guten-element.guten-countdown.${elementId} .minutes-wrapper`,
                }
            ]
        },
        {
            id: 'minutesHeight',
            label: __('Set Height', 'gutenverse'),
            component: RangeControl,
            allowDeviceControl: true,
            show: !oneForAll && switcher.tabTime === 'minutes',
            unit: 'px',
            min: 1,
            max: 1000,
            step: 1,
            liveStyle: [
                {
                    'type': 'plain',
                    'id': 'minutesHeight',
                    'responsive': true,
                    'properties': [
                        {
                            'name': 'height',
                            'valueType': 'pattern',
                            'pattern': '{value}px',
                            'patternValues': {
                                'value': {
                                    'type': 'direct'
                                }
                            }
                        }
                    ],
                    'selector': `.guten-element.guten-countdown.${elementId} .minutes-wrapper`,
                }
            ]
        },
        {
            id: 'secondsWidth',
            label: __('Set Width', 'gutenverse'),
            component: SizeControl,
            allowDeviceControl: true,
            show: !oneForAll && switcher.tabTime === 'seconds',
            units: {
                px: {
                    text: 'px',
                    unit: 'px',
                    min: 0,
                    max: 1000,
                    step: 1,
                },
                em: {
                    text: 'em',
                    unit: 'em',
                },
                ['%']: {
                    text: '%',
                    unit: '%'
                },
                rem: {
                    text: 'rem',
                    unit: 'rem'
                },
            },
            liveStyle: [
                {
                    'type': 'unitPoint',
                    'id': 'secondsWidth',
                    'responsive': true,
                    'properties': [
                        {
                            'name': 'width',
                            'valueType': 'direct'
                        }
                    ],
                    'selector': `.guten-element.guten-countdown.${elementId} .seconds-wrapper`,
                }
            ]
        },
        {
            id: 'secondsHeight',
            label: __('Set Height', 'gutenverse'),
            component: RangeControl,
            allowDeviceControl: true,
            show: !oneForAll && switcher.tabTime === 'seconds',
            unit: 'px',
            min: 1,
            max: 1000,
            step: 1,
            liveStyle: [
                {
                    'type': 'plain',
                    'id': 'secondsHeight',
                    'responsive': true,
                    'properties': [
                        {
                            'name': 'height',
                            'valueType': 'pattern',
                            'pattern': '{value}px',
                            'patternValues': {
                                'value': {
                                    'type': 'direct'
                                }
                            }
                        }
                    ],
                    'selector': `.guten-element.guten-countdown.${elementId} .seconds-wrapper`,
                }
            ]
        },
        {
            id: 'oneForAllVerticalAlign',
            label: __('Vertical Align', 'gutenverse'),
            component: SelectControl,
            options: [
                {
                    label: __('Top', 'gutenverse'),
                    value: 'start',
                },
                {
                    label: __('Middle', 'gutenverse'),
                    value: 'center',
                },
                {
                    label: __('Bottom', 'gutenverse'),
                    value: 'end',
                }
            ],
            show: oneForAll,

        },
        {
            id: 'oneForAllHorizontalAlign',
            label: __('Horizontal Align', 'gutenverse'),
            component: SelectControl,
            options: [
                {
                    label: __('Left', 'gutenverse'),
                    value: 'start',
                },
                {
                    label: __('Middle', 'gutenverse'),
                    value: 'center',
                },
                {
                    label: __('Right', 'gutenverse'),
                    value: 'end',
                }
            ],
            show: oneForAll,

        },
        {
            id: 'daysVerticalAlign',
            label: __('Vertical Align', 'gutenverse'),
            component: SelectControl,
            options: [
                {
                    label: __('Top', 'gutenverse'),
                    value: 'start',
                },
                {
                    label: __('Middle', 'gutenverse'),
                    value: 'center',
                },
                {
                    label: __('Bottom', 'gutenverse'),
                    value: 'end',
                }
            ],
            show: !oneForAll && (switcher.tabTime === 'days' || !switcher.tabTime),

        },
        {
            id: 'daysHorizontalAlign',
            label: __('Horizontal Align', 'gutenverse'),
            component: SelectControl,
            options: [
                {
                    label: __('Left', 'gutenverse'),
                    value: 'start',
                },
                {
                    label: __('Middle', 'gutenverse'),
                    value: 'center',
                },
                {
                    label: __('Right', 'gutenverse'),
                    value: 'end',
                }
            ],
            show: !oneForAll && (switcher.tabTime === 'days' || !switcher.tabTime),

        },
        {
            id: 'hoursVerticalAlign',
            label: __('Vertical Align', 'gutenverse'),
            component: SelectControl,
            options: [
                {
                    label: __('Top', 'gutenverse'),
                    value: 'start',
                },
                {
                    label: __('Middle', 'gutenverse'),
                    value: 'center',
                },
                {
                    label: __('Bottom', 'gutenverse'),
                    value: 'end',
                }
            ],
            show: !oneForAll && switcher.tabTime === 'hours',

        },
        {
            id: 'hoursHorizontalAlign',
            label: __('Horizontal Align', 'gutenverse'),
            component: SelectControl,
            options: [
                {
                    label: __('Left', 'gutenverse'),
                    value: 'start',
                },
                {
                    label: __('Middle', 'gutenverse'),
                    value: 'center',
                },
                {
                    label: __('Right', 'gutenverse'),
                    value: 'end',
                }
            ],
            show: !oneForAll && switcher.tabTime === 'hours',

        },
        {
            id: 'minutesVerticalAlign',
            label: __('Vertical Align', 'gutenverse'),
            component: SelectControl,
            options: [
                {
                    label: __('Top', 'gutenverse'),
                    value: 'start',
                },
                {
                    label: __('Middle', 'gutenverse'),
                    value: 'center',
                },
                {
                    label: __('Bottom', 'gutenverse'),
                    value: 'end',
                }
            ],
            show: !oneForAll && switcher.tabTime === 'minutes',

        },
        {
            id: 'minutesHorizontalAlign',
            label: __('Horizontal Align', 'gutenverse'),
            component: SelectControl,
            options: [
                {
                    label: __('Left', 'gutenverse'),
                    value: 'start',
                },
                {
                    label: __('Middle', 'gutenverse'),
                    value: 'center',
                },
                {
                    label: __('Right', 'gutenverse'),
                    value: 'end',
                }
            ],
            show: !oneForAll && switcher.tabTime === 'minutes',

        },
        {
            id: 'secondsVerticalAlign',
            label: __('Vertical Align', 'gutenverse'),
            component: SelectControl,
            options: [
                {
                    label: __('Top', 'gutenverse'),
                    value: 'start',
                },
                {
                    label: __('Middle', 'gutenverse'),
                    value: 'center',
                },
                {
                    label: __('Bottom', 'gutenverse'),
                    value: 'end',
                }
            ],
            show: !oneForAll && switcher.tabTime === 'seconds',

        },
        {
            id: 'secondsHorizontalAlign',
            label: __('Horizontal Align', 'gutenverse'),
            component: SelectControl,
            options: [
                {
                    label: __('Left', 'gutenverse'),
                    value: 'start',
                },
                {
                    label: __('Middle', 'gutenverse'),
                    value: 'center',
                },
                {
                    label: __('Right', 'gutenverse'),
                    value: 'end',
                }
            ],
            show: !oneForAll && switcher.tabTime === 'seconds',

        },
    ];
};