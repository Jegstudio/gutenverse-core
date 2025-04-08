
import { __ } from '@wordpress/i18n';
import { BackgroundControl, BorderResponsiveControl, BoxShadowControl, CheckboxControl, ColorControl, DimensionControl, HeadingControl, RangeControl, SelectControl, SizeControl, SwitchControl, TypographyControl } from 'gutenverse-core/controls';
import { allowRenderBoxShadow, handleBackground, handleBorderResponsive, handleBoxShadow, handleColor, handleDimension, handleTypography, handleUnitPoint } from 'gutenverse-core/styling';

export const timeStylePanel = (props) => {
    const {
        elementId,
        oneForAll,
        switcher,
        setSwitcher,
        labelPosition
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
            show: ! oneForAll,
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
            style: [
                {
                    selector: `.guten-element.guten-countdown.${elementId} .time-container .countdown-value`,
                    allowRender: () => oneForAll,
                    render: value => handleColor(value, 'color')
                }
            ]
        },
        {
            id: 'oneForAllDigitTypography',
            label: __('Digit Typography', 'gutenverse'),
            component: TypographyControl,
            show: oneForAll,
            style: [
                {
                    selector: `.guten-element.guten-countdown.${elementId} .time-container .countdown-value`,
                    hasChild: true,
                    allowRender: () => oneForAll,
                    render: (value,id) => handleTypography(value, props, id)
                }
            ]
        },
        {
            id: 'oneForAllLabelColor',
            label: __('Label color', 'gutenverse'),
            show: oneForAll,
            component: ColorControl,
            style: [
                {
                    selector: `.guten-element.guten-countdown.${elementId} .time-container .countdown-label`,
                    allowRender: () => oneForAll,
                    render: value => handleColor(value, 'color')
                }
            ]
        },
        {
            id: 'oneForAllLabelTypography',
            label: __('Label Typography', 'gutenverse'),
            component: TypographyControl,
            show: oneForAll,
            style: [
                {
                    selector: `.guten-element.guten-countdown.${elementId} .time-container .countdown-label`,
                    hasChild: true,
                    allowRender: () => oneForAll,
                    render: (value,id) => handleTypography(value, props, id)
                }
            ]
        },
        {
            id: 'daysDigitColor',
            label: __('Digit color', 'gutenverse'),
            show: ! oneForAll && (switcher.tabTime === 'days' || !switcher.tabTime),
            component: ColorControl,
            style: [
                {
                    selector: `.guten-element.guten-countdown.${elementId} .days-wrapper .countdown-value`,
                    allowRender: () => ! oneForAll && (switcher.tabTime === 'days' || !switcher.tabTime),
                    render: value => handleColor(value, 'color')
                }
            ]
        },
        {
            id: 'daysDigitTypography',
            label: __('Digit Typography', 'gutenverse'),
            component: TypographyControl,
            show: ! oneForAll && (switcher.tabTime === 'days' || !switcher.tabTime),
            style: [
                {
                    selector: `.guten-element.guten-countdown.${elementId} .days-wrapper .countdown-value`,
                    hasChild: true,
                    allowRender: () => ! oneForAll && (switcher.tabTime === 'days' || !switcher.tabTime),
                    render: (value,id) => handleTypography(value, props, id)
                }
            ]
        },
        {
            id: 'daysLabelColor',
            label: __('Label color', 'gutenverse'),
            show: ! oneForAll && (switcher.tabTime === 'days' || !switcher.tabTime),
            component: ColorControl,
            style: [
                {
                    selector: `.guten-element.guten-countdown.${elementId} .days-wrapper .countdown-label`,
                    allowRender: () => ! oneForAll && (switcher.tabTime === 'days' || !switcher.tabTime),
                    render: value => handleColor(value, 'color')
                }
            ]
        },
        {
            id: 'daysLabelTypography',
            label: __('Label Typography', 'gutenverse'),
            component: TypographyControl,
            show: ! oneForAll && (switcher.tabTime === 'days' || !switcher.tabTime),
            style: [
                {
                    selector: `.guten-element.guten-countdown.${elementId} .days-wrapper .countdown-label`,
                    hasChild: true,
                    allowRender: () => ! oneForAll && (switcher.tabTime === 'days' || !switcher.tabTime),
                    render: (value,id) => handleTypography(value, props, id)
                }
            ]
        },
        {
            id: 'hoursDigitColor',
            label: __('Digit color', 'gutenverse'),
            show: ! oneForAll && switcher.tabTime === 'hours',
            component: ColorControl,
            style: [
                {
                    selector: `.guten-element.guten-countdown.${elementId} .hours-wrapper .countdown-value`,
                    allowRender: () => ! oneForAll && switcher.tabTime === 'hours',
                    render: value => handleColor(value, 'color')
                }
            ]
        },
        {
            id: 'hoursDigitTypography',
            label: __('Digit Typography', 'gutenverse'),
            component: TypographyControl,
            show: ! oneForAll && switcher.tabTime === 'hours',
            style: [
                {
                    selector: `.guten-element.guten-countdown.${elementId} .hours-wrapper .countdown-value`,
                    hasChild: true,
                    allowRender: () => ! oneForAll && switcher.tabTime === 'hours',
                    render: (value,id) => handleTypography(value, props, id)
                }
            ]
        },
        {
            id: 'hoursLabelColor',
            label: __('Label color', 'gutenverse'),
            show: ! oneForAll && switcher.tabTime === 'hours',
            component: ColorControl,
            style: [
                {
                    selector: `.guten-element.guten-countdown.${elementId} .hours-wrapper .countdown-label`,
                    allowRender: () => ! oneForAll && switcher.tabTime === 'hours',
                    render: value => handleColor(value, 'color')
                }
            ]
        },
        {
            id: 'hoursLabelTypography',
            label: __('Label Typography', 'gutenverse'),
            component: TypographyControl,
            show: ! oneForAll && switcher.tabTime === 'hours',
            style: [
                {
                    selector: `.guten-element.guten-countdown.${elementId} .hours-wrapper .countdown-label`,
                    hasChild: true,
                    allowRender: () => ! oneForAll && switcher.tabTime === 'hours',
                    render: (value,id) => handleTypography(value, props, id)
                }
            ]
        },
        {
            id: 'minutesDigitColor',
            label: __('Digit color', 'gutenverse'),
            show: ! oneForAll && switcher.tabTime === 'minutes',
            component: ColorControl,
            style: [
                {
                    selector: `.guten-element.guten-countdown.${elementId} .minutes-wrapper .countdown-value`,
                    allowRender: () => ! oneForAll && switcher.tabTime === 'minutes',
                    render: value => handleColor(value, 'color')
                }
            ]
        },
        {
            id: 'minutesDigitTypography',
            label: __('Digit Typography', 'gutenverse'),
            component: TypographyControl,
            show: ! oneForAll && switcher.tabTime === 'minutes',
            style: [
                {
                    selector: `.guten-element.guten-countdown.${elementId} .minutes-wrapper .countdown-value`,
                    hasChild: true,
                    allowRender: () => ! oneForAll && switcher.tabTime === 'minutes',
                    render: (value,id) => handleTypography(value, props, id)
                }
            ]
        },
        {
            id: 'minutesLabelColor',
            label: __('Label color', 'gutenverse'),
            show: ! oneForAll && switcher.tabTime === 'minutes',
            component: ColorControl,
            style: [
                {
                    selector: `.guten-element.guten-countdown.${elementId} .minutes-wrapper .countdown-label`,
                    allowRender: () => ! oneForAll && switcher.tabTime === 'minutes',
                    render: value => handleColor(value, 'color')
                }
            ]
        },
        {
            id: 'minutesLabelTypography',
            label: __('Label Typography', 'gutenverse'),
            component: TypographyControl,
            show: ! oneForAll && switcher.tabTime === 'minutes',
            style: [
                {
                    selector: `.guten-element.guten-countdown.${elementId} .minutes-wrapper .countdown-label`,
                    hasChild: true,
                    allowRender: () => ! oneForAll && switcher.tabTime === 'minutes',
                    render: (value,id) => handleTypography(value, props, id)
                }
            ]
        },
        {
            id: 'secondsDigitColor',
            label: __('Digit color', 'gutenverse'),
            show: ! oneForAll && switcher.tabTime === 'seconds',
            component: ColorControl,
            style: [
                {
                    selector: `.guten-element.guten-countdown.${elementId} .seconds-wrapper .countdown-value`,
                    allowRender: () => ! oneForAll && switcher.tabTime === 'seconds',
                    render: value => handleColor(value, 'color')
                }
            ]
        },
        {
            id: 'secondsDigitTypography',
            label: __('Digit Typography', 'gutenverse'),
            component: TypographyControl,
            show: ! oneForAll && switcher.tabTime === 'seconds',
            style: [
                {
                    selector: `.guten-element.guten-countdown.${elementId} .seconds-wrapper .countdown-value`,
                    hasChild: true,
                    allowRender: () => ! oneForAll && switcher.tabTime === 'seconds',
                    render: (value,id) => handleTypography(value, props, id)
                }
            ]
        },
        {
            id: 'secondsLabelColor',
            label: __('Label color', 'gutenverse'),
            show: ! oneForAll && switcher.tabTime === 'seconds',
            component: ColorControl,
            style: [
                {
                    selector: `.guten-element.guten-countdown.${elementId} .seconds-wrapper .countdown-label`,
                    allowRender: () => ! oneForAll && switcher.tabTime === 'seconds',
                    render: value => handleColor(value, 'color')
                }
            ]
        },
        {
            id: 'secondsLabelTypography',
            label: __('Label Typography', 'gutenverse'),
            component: TypographyControl,
            show: ! oneForAll && switcher.tabTime === 'seconds',
            style: [
                {
                    selector: `.guten-element.guten-countdown.${elementId} .seconds-wrapper .countdown-label`,
                    hasChild: true,
                    allowRender: () => ! oneForAll && switcher.tabTime === 'seconds',
                    render: (value,id) => handleTypography(value, props, id)
                }
            ]
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
            show: oneForAll && ( switcher.oneForAllBackgroundTab === 'normal' || !switcher.oneForAllBackgroundTab ),
            component: BackgroundControl,
            label: __('Background', 'gutenverse'),
            allowDeviceControl: true,
            options: ['default', 'gradient'],
            style: [
                {
                    selector: `.guten-element.guten-countdown.${elementId} .time-container`,
                    hasChild: true,
                    allowRender: () => oneForAll,
                    render: value => handleBackground(value)
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
            style: [
                {
                    selector: `.guten-element.guten-countdown.${elementId} .time-container:hover`,
                    hasChild: true,
                    allowRender: () => oneForAll,
                    render: value => handleBackground(value)
                },
            ]
        },
        {
            id: '__daysBackgroundTab',
            component: SwitchControl,
            show: ! oneForAll && (switcher.tabTime === 'days' || !switcher.tabTime),
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
            show: ! oneForAll && (switcher.tabTime === 'days' || !switcher.tabTime) && ( 'normal' === switcher.daysBackgroundTab || !switcher.daysBackgroundTab ),
            component: BackgroundControl,
            label: __('Background', 'gutenverse'),
            allowDeviceControl: true,
            options: ['default', 'gradient'],
            style: [
                {
                    selector: `.guten-element.guten-countdown.${elementId} .days-wrapper`,
                    hasChild: true,
                    allowRender: () => ! oneForAll && (switcher.tabTime === 'days' || !switcher.tabTime),
                    render: value => handleBackground(value)
                }
            ]
        },
        {
            id: 'daysBackgroundHover',
            show: ! oneForAll && (switcher.tabTime === 'days' || !switcher.tabTime) && 'hover' === switcher.daysBackgroundTab,
            label: __('Background Hover', 'gutenverse'),
            component: BackgroundControl,
            allowDeviceControl: true,
            options: ['default', 'gradient'],
            style: [
                {
                    selector: `.guten-element.guten-countdown.${elementId} .days-wrapper:hover`,
                    hasChild: true,
                    allowRender: () => ! oneForAll && (switcher.tabTime === 'days' || !switcher.tabTime),
                    render: value => handleBackground(value)
                },
            ]
        },
        {
            id: '__hoursBackgroundTab',
            component: SwitchControl,
            show: ! oneForAll && switcher.tabTime === 'hours',
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
            show: ! oneForAll && switcher.tabTime === 'hours' && ( switcher.hoursBackgroundTab === 'normal' || !switcher.hoursBackgroundTab ),
            component: BackgroundControl,
            label: __('Background', 'gutenverse'),
            allowDeviceControl: true,
            options: ['default', 'gradient'],
            style: [
                {
                    selector: `.guten-element.guten-countdown.${elementId} .hours-wrapper`,
                    hasChild: true,
                    allowRender: () => ! oneForAll && switcher.tabTime === 'hours',
                    render: value => handleBackground(value)
                }
            ]
        },
        {
            id: 'hoursBackgroundHover',
            show: ! oneForAll && switcher.tabTime === 'hours' && switcher.hoursBackgroundTab === 'hover',
            label: __('Background Hover', 'gutenverse'),
            component: BackgroundControl,
            allowDeviceControl: true,
            options: ['default', 'gradient'],
            style: [
                {
                    selector: `.guten-element.guten-countdown.${elementId} .hours-wrapper:hover`,
                    hasChild: true,
                    allowRender: () => ! oneForAll && switcher.tabTime === 'hours',
                    render: value => handleBackground(value)
                },
            ]
        },
        {
            id: '__minutesBackgroundTab',
            component: SwitchControl,
            show: ! oneForAll && switcher.tabTime === 'minutes',
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
            show: ! oneForAll && switcher.tabTime === 'minutes' && ( switcher.minutesBackgroundTab === 'normal' || !switcher.minutesBackgroundTab ),
            component: BackgroundControl,
            label: __('Background', 'gutenverse'),
            allowDeviceControl: true,
            options: ['default', 'gradient'],
            style: [
                {
                    selector: `.guten-element.guten-countdown.${elementId} .minutes-wrapper`,
                    hasChild: true,
                    allowRender: () => ! oneForAll && switcher.tabTime === 'minutes',
                    render: value => handleBackground(value)
                }
            ]
        },
        {
            id: 'minutesBackgroundHover',
            show: ! oneForAll && switcher.tabTime === 'minutes' && switcher.minutesBackgroundTab === 'hover',
            label: __('Background Hover', 'gutenverse'),
            component: BackgroundControl,
            allowDeviceControl: true,
            options: ['default', 'gradient'],
            style: [
                {
                    selector: `.guten-element.guten-countdown.${elementId} .minutes-wrapper:hover`,
                    hasChild: true,
                    allowRender: () => ! oneForAll && switcher.tabTime === 'minutes',
                    render: value => handleBackground(value)
                },
            ]
        },
        {
            id: '__secondsBackgroundTab',
            component: SwitchControl,
            show: ! oneForAll && switcher.tabTime === 'seconds',
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
            show: ! oneForAll && switcher.tabTime === 'seconds' && ( switcher.secondsBackgroundTab === 'normal' || !switcher.secondsBackgroundTab ),
            component: BackgroundControl,
            label: __('Background', 'gutenverse'),
            allowDeviceControl: true,
            options: ['default', 'gradient'],
            style: [
                {
                    selector: `.guten-element.guten-countdown.${elementId} .seconds-wrapper`,
                    hasChild: true,
                    allowRender: () => ! oneForAll && switcher.tabTime === 'seconds',
                    render: value => handleBackground(value)
                }
            ]
        },
        {
            id: 'secondsBackgroundHover',
            show: ! oneForAll && switcher.tabTime === 'seconds' && switcher.minutesBackgroundTab === 'hover',
            label: __('Background Hover', 'gutenverse'),
            component: BackgroundControl,
            allowDeviceControl: true,
            options: ['default', 'gradient'],
            style: [
                {
                    selector: `.guten-element.guten-countdown.${elementId} .seconds-wrapper:hover`,
                    hasChild: true,
                    allowRender: () => ! oneForAll && switcher.tabTime === 'seconds',
                    render: value => handleBackground(value)
                },
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
            show: oneForAll && ( switcher.oneForAllBorderTab === 'normal' || !switcher.oneForAllBorderTab ),
            component: BorderResponsiveControl,
            label: __('Border', 'gutenverse'),
            allowDeviceControl: true,
            style: [
                {
                    selector: `.guten-element.guten-countdown.${elementId} .time-container`,
                    allowRender: () => oneForAll,
                    render: value => handleBorderResponsive(value)
                }
            ]
        },
        {
            id: 'oneForAllBorderHover',
            show: oneForAll && switcher.oneForAllBorderTab === 'hover',
            label: __('Border Hover', 'gutenverse'),
            component: BorderResponsiveControl,
            allowDeviceControl: true,
            style: [
                {
                    selector: `.guten-element.guten-countdown.${elementId} .time-container:hover`,
                    allowRender: () => oneForAll,
                    render: value => handleBorderResponsive(value)
                },
            ]
        },
        {
            id: '__daysBorderTab',
            component: SwitchControl,
            show: ! oneForAll && (switcher.tabTime === 'days' || !switcher.tabTime),
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
            show: ! oneForAll && (switcher.tabTime === 'days' || !switcher.tabTime) && ( switcher.daysBorderTab === 'normal' || !switcher.daysBorderTab ),
            component: BorderResponsiveControl,
            label: __('Border', 'gutenverse'),
            allowDeviceControl: true,
            style: [
                {
                    selector: `.guten-element.guten-countdown.${elementId} .days-wrapper`,
                    allowRender: () => ! oneForAll && (switcher.tabTime === 'days' || !switcher.tabTime),
                    render: value => handleBorderResponsive(value)
                }
            ]
        },
        {
            id: 'daysBorderHover',
            show: ! oneForAll && (switcher.tabTime === 'days' || !switcher.tabTime) && switcher.daysBorderTab === 'hover',
            label: __('Border Hover', 'gutenverse'),
            component: BorderResponsiveControl,
            allowDeviceControl: true,
            style: [
                {
                    selector: `.guten-element.guten-countdown.${elementId} .days-wrapper:hover`,
                    allowRender: () => ! oneForAll && (switcher.tabTime === 'days' || !switcher.tabTime),
                    render: value => handleBorderResponsive(value)
                },
            ]
        },
        {
            id: '__hoursBorderTab',
            component: SwitchControl,
            show: ! oneForAll && switcher.tabTime === 'hours',
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
            show: ! oneForAll && switcher.tabTime === 'hours' && ( switcher.hoursBorderTab === 'normal' || !switcher.hoursBorderTab ),
            component: BorderResponsiveControl,
            label: __('Border', 'gutenverse'),
            allowDeviceControl: true,
            style: [
                {
                    selector: `.guten-element.guten-countdown.${elementId} .hours-wrapper`,
                    allowRender: () => ! oneForAll && switcher.tabTime === 'hours',
                    render: value => handleBorderResponsive(value)
                }
            ]
        },
        {
            id: 'hoursBorderHover',
            show: ! oneForAll && switcher.tabTime === 'hours' && switcher.hoursBorderTab === 'hover',
            label: __('Border Hover', 'gutenverse'),
            component: BorderResponsiveControl,
            allowDeviceControl: true,
            style: [
                {
                    selector: `.guten-element.guten-countdown.${elementId} .hours-wrapper:hover`,
                    allowRender: () => ! oneForAll && switcher.tabTime === 'hours',
                    render: value => handleBorderResponsive(value)
                },
            ]
        },
        {
            id: '__minutesBorderTab',
            component: SwitchControl,
            show: ! oneForAll && switcher.tabTime === 'minutes',
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
            show: ! oneForAll && switcher.tabTime === 'minutes' && ( switcher.minutesBorderTab === 'normal' || !switcher.minutesBorderTab ),
            component: BorderResponsiveControl,
            label: __('Border', 'gutenverse'),
            allowDeviceControl: true,
            style: [
                {
                    selector: `.guten-element.guten-countdown.${elementId} .minutes-wrapper`,
                    allowRender: () => ! oneForAll && switcher.tabTime === 'minutes',
                    render: value => handleBorderResponsive(value)
                }
            ]
        },
        {
            id: 'minutesBorderHover',
            show: ! oneForAll && switcher.tabTime === 'minutes' && switcher.minutesBorderTab === 'hover',
            label: __('Border Hover', 'gutenverse'),
            component: BorderResponsiveControl,
            allowDeviceControl: true,
            style: [
                {
                    selector: `.guten-element.guten-countdown.${elementId} .minutes-wrapper:hover`,
                    allowRender: () => ! oneForAll && switcher.tabTime === 'minutes',
                    render: value => handleBorderResponsive(value)
                },
            ]
        },
        {
            id: '__secondsBorderTab',
            component: SwitchControl,
            show: ! oneForAll && switcher.tabTime === 'seconds',
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
            show: ! oneForAll && switcher.tabTime === 'seconds' && ( switcher.secondsBorderTab === 'normal' || !switcher.secondsBorderTab ),
            component: BorderResponsiveControl,
            label: __('Border', 'gutenverse'),
            allowDeviceControl: true,
            style: [
                {
                    selector: `.guten-element.guten-countdown.${elementId} .seconds-wrapper`,
                    allowRender: () => ! oneForAll && switcher.tabTime === 'seconds',
                    render: value => handleBorderResponsive(value)
                }
            ]
        },
        {
            id: 'secondsBorderHover',
            show: ! oneForAll && switcher.tabTime === 'seconds' && switcher.secondsBorderTab === 'hover',
            label: __('Border Hover', 'gutenverse'),
            component: BorderResponsiveControl,
            allowDeviceControl: true,
            style: [
                {
                    selector: `.guten-element.guten-countdown.${elementId} .seconds-wrapper:hover`,
                    allowRender: () => ! oneForAll && switcher.tabTime === 'seconds',
                    render: value => handleBorderResponsive(value)
                },
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
            show: oneForAll && ( switcher.oneForAllBoxShadowTab === 'normal' || !switcher.oneForAllBoxShadowTab ),
            component: BoxShadowControl,
            label: __('Box Shadow', 'gutenverse'),
            style: [
                {
                    selector: `.editor-styles-wrapper .${elementId}.guten-countdown .time-container`,
                    allowRender: (value) => (oneForAll && allowRenderBoxShadow(value)),
                    render: value => handleBoxShadow(value)
                }
            ]
        },
        {
            id: 'oneForAllBoxShadowHover',
            show: oneForAll && switcher.oneForAllBoxShadowTab === 'hover',
            label: __('Box Shadow Hover', 'gutenverse'),
            component: BoxShadowControl,
            style: [
                {
                    selector: `.guten-element.guten-countdown.${elementId} .time-container:hover`,
                    allowRender: (value) => oneForAll && allowRenderBoxShadow(value),
                    render: value => handleBoxShadow(value)
                },
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
            show: ! oneForAll && (switcher.tabTime === 'days' || !switcher.tabTime) && ( switcher.daysBoxShadowTab === 'normal' || !switcher.daysBoxShadowTab ),
            component: BoxShadowControl,
            label: __('Box Shadow', 'gutenverse'),
            style: [
                {
                    selector: `.guten-element.guten-countdown.${elementId} .days-wrapper`,
                    allowRender: (value) => (! oneForAll && (switcher.tabTime === 'days' || !switcher.tabTime)) && allowRenderBoxShadow(value),
                    render: value => handleBoxShadow(value)
                }
            ]
        },
        {
            id: 'daysBoxShadowHover',
            show: ! oneForAll && (switcher.tabTime === 'days' || !switcher.tabTime) && switcher.daysBoxShadowTab === 'hover',
            label: __('Box Shadow Hover', 'gutenverse'),
            component: BoxShadowControl,
            style: [
                {
                    selector: `.guten-element.guten-countdown.${elementId} .days-wrapper:hover`,
                    allowRender: (value) => (! oneForAll && (switcher.tabTime === 'days' || !switcher.tabTime)) && allowRenderBoxShadow(value),
                    render: value => handleBoxShadow(value)
                },
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
            show: ! oneForAll && switcher.tabTime === 'hours' && ( switcher.hoursBoxShadowTab === 'normal' || !switcher.hoursBoxShadowTab ),
            component: BoxShadowControl,
            label: __('Box Shadow', 'gutenverse'),
            style: [
                {
                    selector: `.guten-element.guten-countdown.${elementId} .hours-wrapper`,
                    allowRender: (value) => (! oneForAll && switcher.tabTime === 'hours') && allowRenderBoxShadow(value),
                    render: value => handleBoxShadow(value)
                }
            ]
        },
        {
            id: 'hoursBoxShadowHover',
            show: ! oneForAll && switcher.tabTime === 'hours' && switcher.hoursBoxShadowTab === 'hover',
            label: __('Box Shadow Hover', 'gutenverse'),
            component: BoxShadowControl,
            style: [
                {
                    selector: `.guten-element.guten-countdown.${elementId} .hours-wrapper:hover`,
                    allowRender: (value) => (! oneForAll && switcher.tabTime === 'hours') && allowRenderBoxShadow(value),
                    render: value => handleBoxShadow(value)
                },
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
            show: ! oneForAll && switcher.tabTime === 'minutes' && ( switcher.minutesBoxShadowTab === 'normal' || !switcher.minutesBoxShadowTab ),
            component: BoxShadowControl,
            label: __('Box Shadow', 'gutenverse'),
            style: [
                {
                    selector: `.guten-element.guten-countdown.${elementId} .minutes-wrapper`,
                    allowRender: (value) => (! oneForAll && switcher.tabTime === 'minutes') && allowRenderBoxShadow(value),
                    render: value => handleBoxShadow(value)
                }
            ]
        },
        {
            id: 'minutesBoxShadowHover',
            show: ! oneForAll && switcher.tabTime === 'minutes' && switcher.minutesBoxShadowTab === 'hover',
            label: __('Box Shadow Hover', 'gutenverse'),
            component: BoxShadowControl,
            style: [
                {
                    selector: `.guten-element.guten-countdown.${elementId} .minutes-wrapper:hover`,
                    allowRender: (value) => (! oneForAll && switcher.tabTime === 'minutes') && allowRenderBoxShadow(value),
                    render: value => handleBoxShadow(value)
                },
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
            show: ! oneForAll && switcher.tabTime === 'seconds' && ( switcher.secondsBoxShadowTab === 'normal' || !switcher.secondsBoxShadowTab ),
            component: BoxShadowControl,
            label: __('Box Shadow', 'gutenverse'),
            style: [
                {
                    selector: `.guten-element.guten-countdown.${elementId} .seconds-wrapper`,
                    allowRender: (value) => (! oneForAll && switcher.tabTime === 'seconds') && allowRenderBoxShadow(value),
                    render: value => handleBoxShadow(value)
                }
            ]
        },
        {
            id: 'secondsBoxShadowHover',
            show: ! oneForAll && switcher.tabTime === 'seconds' && switcher.secondsBoxShadowTab === 'hover',
            label: __('Box Shadow Hover', 'gutenverse'),
            component: BoxShadowControl,
            style: [
                {
                    selector: `.guten-element.guten-countdown.${elementId} .seconds-wrapper:hover`,
                    allowRender: (value) => (! oneForAll && switcher.tabTime === 'seconds') && allowRenderBoxShadow(value),
                    render: value => handleBoxShadow(value)
                },
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
            style: [
                {
                    selector: `.guten-element.guten-countdown.${elementId} .time-container`,
                    allowRender: () => oneForAll,
                    render: value => handleDimension(value, 'padding')
                }
            ]
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
            style: [
                {
                    selector: `.guten-element.guten-countdown.${elementId} .time-container`,
                    allowRender: () => oneForAll,
                    render: value => handleDimension(value, 'margin')
                }
            ]
        },
        {
            id: 'daysPadding',
            show: ! oneForAll && (switcher.tabTime === 'days' || !switcher.tabTime),
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
            style: [
                {
                    selector: `.guten-element.guten-countdown.${elementId} .days-wrapper`,
                    allowRender: () => ! oneForAll && (switcher.tabTime === 'days' || !switcher.tabTime),
                    render: value => handleDimension(value, 'padding')
                }
            ]
        },
        {
            id: 'daysMargin',
            show: ! oneForAll && (switcher.tabTime === 'days' || !switcher.tabTime),
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
            style: [
                {
                    selector: `.guten-element.guten-countdown.${elementId} .days-wrapper`,
                    allowRender: () => ! oneForAll && (switcher.tabTime === 'days' || !switcher.tabTime),
                    render: value => handleDimension(value, 'margin')
                }
            ]
        },
        {
            id: 'hoursPadding',
            show: ! oneForAll && switcher.tabTime === 'hours',
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
            style: [
                {
                    selector: `.guten-element.guten-countdown.${elementId} .hours-wrapper`,
                    allowRender: () => ! oneForAll && switcher.tabTime === 'hours',
                    render: value => handleDimension(value, 'padding')
                }
            ]
        },
        {
            id: 'hoursMargin',
            show: ! oneForAll && switcher.tabTime === 'hours',
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
            style: [
                {
                    selector: `.guten-element.guten-countdown.${elementId} .hours-wrapper`,
                    allowRender: () => ! oneForAll && switcher.tabTime === 'hours',
                    render: value => handleDimension(value, 'margin')
                }
            ]
        },
        {
            id: 'minutesPadding',
            show: ! oneForAll && switcher.tabTime === 'minutes',
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
            style: [
                {
                    selector: `.guten-element.guten-countdown.${elementId} .minutes-wrapper`,
                    allowRender: () => ! oneForAll && switcher.tabTime === 'minutes',
                    render: value => handleDimension(value, 'padding')
                }
            ]
        },
        {
            id: 'minutesMargin',
            show: ! oneForAll && switcher.tabTime === 'minutes',
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
            style: [
                {
                    selector: `.guten-element.guten-countdown.${elementId} .minutes-wrapper`,
                    allowRender: () => ! oneForAll && switcher.tabTime === 'minutes',
                    render: value => handleDimension(value, 'margin')
                }
            ]
        },
        {
            id: 'secondsPadding',
            show: ! oneForAll && switcher.tabTime === 'seconds',
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
            style: [
                {
                    selector: `.guten-element.guten-countdown.${elementId} .seconds-wrapper`,
                    allowRender: () => ! oneForAll && switcher.tabTime === 'seconds',
                    render: value => handleDimension(value, 'padding')
                }
            ]
        },
        {
            id: 'secondsMargin',
            show: ! oneForAll && switcher.tabTime === 'seconds',
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
            style: [
                {
                    selector: `.guten-element.guten-countdown.${elementId} .seconds-wrapper`,
                    allowRender: () => ! oneForAll && switcher.tabTime === 'seconds',
                    render: value => handleDimension(value, 'margin')
                }
            ]
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
            style: [
                {
                    selector: `.guten-element.guten-countdown.${elementId} .time-container`,
                    allowRender: () => oneForAll,
                    render: value => handleUnitPoint(value, 'width')
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
            style: [
                {
                    selector: `.guten-element.guten-countdown.${elementId} .time-container`,
                    allowRender: () => oneForAll,
                    render: value => `height: ${value}px;`
                }
            ]
        },
        {
            id: 'daysWidth',
            label: __('Set Width', 'gutenverse'),
            component: SizeControl,
            allowDeviceControl: true,
            show: ! oneForAll && (switcher.tabTime === 'days' || !switcher.tabTime),
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
            style: [
                {
                    selector: `.guten-element.guten-countdown.${elementId} .days-wrapper`,
                    allowRender: () => ! oneForAll && (switcher.tabTime === 'days' || !switcher.tabTime),
                    render: value => handleUnitPoint(value, 'width')
                }
            ]
        },
        {
            id: 'daysHeight',
            label: __('Set Height', 'gutenverse'),
            component: RangeControl,
            allowDeviceControl: true,
            show: ! oneForAll && (switcher.tabTime === 'days' || !switcher.tabTime),
            unit: 'px',
            min: 1,
            max: 1000,
            step: 1,
            style: [
                {
                    selector: `.guten-element.guten-countdown.${elementId} .days-wrapper`,
                    allowRender: () => ! oneForAll && (switcher.tabTime === 'days' || !switcher.tabTime),
                    render: value => `height: ${value}px;`
                }
            ]
        },
        {
            id: 'hoursWidth',
            label: __('Set Width', 'gutenverse'),
            component: SizeControl,
            allowDeviceControl: true,
            show: ! oneForAll && switcher.tabTime === 'hours',
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
            style: [
                {
                    selector: `.guten-element.guten-countdown.${elementId} .hours-wrapper`,
                    allowRender: () => ! oneForAll && switcher.tabTime === 'hours',
                    render: value => handleUnitPoint(value, 'width')
                }
            ]
        },
        {
            id: 'hoursHeight',
            label: __('Set Height', 'gutenverse'),
            component: RangeControl,
            allowDeviceControl: true,
            show: ! oneForAll && switcher.tabTime === 'hours',
            unit: 'px',
            min: 1,
            max: 1000,
            step: 1,
            style: [
                {
                    selector: `.guten-element.guten-countdown.${elementId} .hours-wrapper`,
                    allowRender: () => ! oneForAll && switcher.tabTime === 'hours',
                    render: value => `height: ${value}px;`
                }
            ]
        },
        {
            id: 'minutesWidth',
            label: __('Set Width', 'gutenverse'),
            component: SizeControl,
            allowDeviceControl: true,
            show: ! oneForAll && switcher.tabTime === 'minutes',
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
            style: [
                {
                    selector: `.guten-element.guten-countdown.${elementId} .minutes-wrapper`,
                    allowRender: () => ! oneForAll && switcher.tabTime === 'minutes',
                    render: value => handleUnitPoint(value, 'width')
                }
            ]
        },
        {
            id: 'minutesHeight',
            label: __('Set Height', 'gutenverse'),
            component: RangeControl,
            allowDeviceControl: true,
            show: ! oneForAll && switcher.tabTime === 'minutes',
            unit: 'px',
            min: 1,
            max: 1000,
            step: 1,
            style: [
                {
                    selector: `.guten-element.guten-countdown.${elementId} .minutes-wrapper`,
                    allowRender: () => ! oneForAll && switcher.tabTime === 'minutes',
                    render: value => `height: ${value}px;`
                }
            ]
        },
        {
            id: 'secondsWidth',
            label: __('Set Width', 'gutenverse'),
            component: SizeControl,
            allowDeviceControl: true,
            show: ! oneForAll && switcher.tabTime === 'seconds',
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
            style: [
                {
                    selector: `.guten-element.guten-countdown.${elementId} .seconds-wrapper`,
                    allowRender: () => ! oneForAll && switcher.tabTime === 'seconds',
                    render: value => handleUnitPoint(value, 'width')
                }
            ]
        },
        {
            id: 'secondsHeight',
            label: __('Set Height', 'gutenverse'),
            component: RangeControl,
            allowDeviceControl: true,
            show: ! oneForAll && switcher.tabTime === 'seconds',
            unit: 'px',
            min: 1,
            max: 1000,
            step: 1,
            style: [
                {
                    selector: `.guten-element.guten-countdown.${elementId} .seconds-wrapper`,
                    allowRender: () => ! oneForAll && switcher.tabTime === 'seconds',
                    render: value => `height: ${value}px;`
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
            style: [
                {
                    selector: `.editor-styles-wrapper .${elementId}.guten-countdown .time-container`,
                    allowRender: () => oneForAll,
                    render: (value) => {
                        if( labelPosition === 'top' || labelPosition === 'bottom' ){
                            return `justify-content: ${value};`;
                        }else{
                            return `align-items: ${value};`;
                        }
                    }
                }
            ]
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
            style: [
                {
                    selector: `.editor-styles-wrapper .${elementId}.guten-countdown .time-container`,
                    allowRender: () => oneForAll,
                    render: (value) => {
                        if( labelPosition === 'top' || labelPosition === 'bottom' ){
                            return `align-items: ${value};`;
                        }else{
                            return `justify-content: ${value};`;
                        }
                    }
                }
            ]
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
            show: ! oneForAll && (switcher.tabTime === 'days' || !switcher.tabTime),
            style: [
                {
                    selector: `.editor-styles-wrapper .${elementId}.guten-countdown .days-wrapper`,
                    allowRender: () => ! oneForAll && (switcher.tabTime === 'days' || !switcher.tabTime),
                    render: (value) => {
                        if( labelPosition === 'top' || labelPosition === 'bottom' ){
                            return `justify-content: ${value};`;
                        }else{
                            return `align-items: ${value};`;
                        }
                    }
                }
            ]
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
            show: ! oneForAll && (switcher.tabTime === 'days' || !switcher.tabTime),
            style: [
                {
                    selector: `.editor-styles-wrapper .${elementId}.guten-countdown .days-wrapper`,
                    allowRender: () => ! oneForAll && (switcher.tabTime === 'days' || !switcher.tabTime),
                    render: (value) => {
                        if( labelPosition === 'top' || labelPosition === 'bottom' ){
                            return `align-items: ${value};`;
                        }else{
                            return `justify-content: ${value};`;
                        }
                    }
                }
            ]
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
            show: ! oneForAll && switcher.tabTime === 'hours',
            style: [
                {
                    selector: `.editor-styles-wrapper .${elementId}.guten-countdown .hours-wrapper`,
                    allowRender: () => ! oneForAll && switcher.tabTime === 'hours',
                    render: (value) => {
                        if( labelPosition === 'top' || labelPosition === 'bottom' ){
                            return `justify-content: ${value};`;
                        }else{
                            return `align-items: ${value};`;
                        }
                    }
                }
            ]
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
            show: ! oneForAll && switcher.tabTime === 'hours',
            style: [
                {
                    selector: `.editor-styles-wrapper .${elementId}.guten-countdown .hours-wrapper`,
                    allowRender: () => ! oneForAll && switcher.tabTime === 'hours',
                    render: (value) => {
                        if( labelPosition === 'top' || labelPosition === 'bottom' ){
                            return `align-items: ${value};`;
                        }else{
                            return `justify-content: ${value};`;
                        }
                    }
                }
            ]
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
            show: ! oneForAll && switcher.tabTime === 'minutes',
            style: [
                {
                    selector: `.editor-styles-wrapper .${elementId}.guten-countdown .minutes-wrapper`,
                    allowRender: () => ! oneForAll && switcher.tabTime === 'minutes',
                    render: (value) => {
                        if( labelPosition === 'top' || labelPosition === 'bottom' ){
                            return `justify-content: ${value};`;
                        }else{
                            return `align-items: ${value};`;
                        }
                    }
                }
            ]
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
            show: ! oneForAll && switcher.tabTime === 'minutes',
            style: [
                {
                    selector: `.editor-styles-wrapper .${elementId}.guten-countdown .minutes-wrapper`,
                    allowRender: () => ! oneForAll && switcher.tabTime === 'minutes',
                    render: (value) => {
                        if( labelPosition === 'top' || labelPosition === 'bottom' ){
                            return `align-items: ${value};`;
                        }else{
                            return `justify-content: ${value};`;
                        }
                    }
                }
            ]
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
            show: ! oneForAll && switcher.tabTime === 'seconds',
            style: [
                {
                    selector: `.editor-styles-wrapper .${elementId}.guten-countdown .seconds-wrapper`,
                    allowRender: () => ! oneForAll && switcher.tabTime === 'seconds',
                    render: (value) => {
                        if( labelPosition === 'top' || labelPosition === 'bottom' ){
                            return `justify-content: ${value};`;
                        }else{
                            return `align-items: ${value};`;
                        }
                    }
                }
            ]
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
            show: ! oneForAll && switcher.tabTime === 'seconds',
            style: [
                {
                    selector: `.editor-styles-wrapper .${elementId}.guten-countdown .seconds-wrapper`,
                    allowRender: () => ! oneForAll && switcher.tabTime === 'seconds',
                    render: (value) => {
                        if( labelPosition === 'top' || labelPosition === 'bottom' ){
                            return `align-items: ${value};`;
                        }else{
                            return `justify-content: ${value};`;
                        }
                    }
                }
            ]
        },
    ];
};