
import { __ } from '@wordpress/i18n';
import { BackgroundControl, BorderResponsiveControl, BoxShadowControl, CheckboxControl, ColorControl, HeadingControl, RangeControl, SelectControl, SwitchControl, TypographyControl } from 'gutenverse-core/controls';
import { allowRenderBoxShadow, handleBackground, handleBorderResponsive, handleBoxShadow, handleColor, handleTypography } from 'gutenverse-core/styling';

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
            id: 'oneForAllBackground',
            show: oneForAll,
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
            show: oneForAll,
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
            id: 'daysBackground',
            show: ! oneForAll && (switcher.tabTime === 'days' || !switcher.tabTime),
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
            show: ! oneForAll && (switcher.tabTime === 'days' || !switcher.tabTime),
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
            id: 'hoursBackground',
            show: ! oneForAll && switcher.tabTime === 'hours',
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
            show: ! oneForAll && switcher.tabTime === 'hours',
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
            id: 'minutesBackground',
            show: ! oneForAll && switcher.tabTime === 'minutes',
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
            show: ! oneForAll && switcher.tabTime === 'minutes',
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
            id: 'secondsBackground',
            show: ! oneForAll && switcher.tabTime === 'seconds',
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
            show: ! oneForAll && switcher.tabTime === 'seconds',
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
            id: 'oneForAllBorder',
            show: oneForAll,
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
            id: 'borderHoverOptions1',
            component: HeadingControl,
            show: oneForAll,
            label: __('Border Hover', 'gutenverse'),
        },
        {
            id: 'oneForAllBorderHover',
            show: oneForAll,
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
            id: 'daysBorder',
            show: ! oneForAll && (switcher.tabTime === 'days' || !switcher.tabTime),
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
            id: 'borderHoverOptions2',
            component: HeadingControl,
            show: ! oneForAll && (switcher.tabTime === 'days' || !switcher.tabTime),
            label: __('Border Hover', 'gutenverse'),
        },
        {
            id: 'daysBorderHover',
            show: ! oneForAll && (switcher.tabTime === 'days' || !switcher.tabTime),
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
            id: 'hoursBorder',
            show: ! oneForAll && switcher.tabTime === 'hours',
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
            id: 'borderHoverOptions3',
            component: HeadingControl,
            show: ! oneForAll && switcher.tabTime === 'hours',
            label: __('Border Hover', 'gutenverse'),
        },
        {
            id: 'hoursBorderHover',
            show: ! oneForAll && switcher.tabTime === 'hours',
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
            id: 'minutesBorder',
            show: ! oneForAll && switcher.tabTime === 'minutes',
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
            id: 'borderHoverOptions4',
            component: HeadingControl,
            show: ! oneForAll && switcher.tabTime === 'minutes',
            label: __('Border Hover', 'gutenverse'),
        },
        {
            id: 'minutesBorderHover',
            show: ! oneForAll && switcher.tabTime === 'minutes',
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
            id: 'secondsBorder',
            show: ! oneForAll && switcher.tabTime === 'seconds',
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
            id: 'borderHoverOptions5',
            component: HeadingControl,
            show: ! oneForAll && switcher.tabTime === 'seconds',
            label: __('Border Hover', 'gutenverse'),
        },
        {
            id: 'secondsBorderHover',
            show: ! oneForAll && switcher.tabTime === 'seconds',
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
            id: 'oneForAllBoxShadow',
            show: oneForAll,
            component: BoxShadowControl,
            label: __('BoxShadow', 'gutenverse'),
            allowDeviceControl: true,
            style: [
                {
                    selector: `.guten-element.guten-countdown.${elementId} .time-container`,
                    allowRender: (value) => oneForAll && allowRenderBoxShadow(value),
                    render: value => handleBoxShadow(value)
                }
            ]
        },
        {
            id: 'boxShadowHoverOptions1',
            component: HeadingControl,
            show: oneForAll,
            label: __('Box Shadow Hover', 'gutenverse'),
        },
        {
            id: 'oneForAllBoxShadowHover',
            show: oneForAll,
            label: __('Box Shadow Hover', 'gutenverse'),
            component: BoxShadowControl,
            allowDeviceControl: true,
            style: [
                {
                    selector: `.guten-element.guten-countdown.${elementId} .time-container:hover`,
                    allowRender: (value) => oneForAll && allowRenderBoxShadow(value),
                    render: value => handleBoxShadow(value)
                },
            ]
        },
        {
            id: 'daysBoxShadow',
            show: ! oneForAll && (switcher.tabTime === 'days' || !switcher.tabTime),
            component: BoxShadowControl,
            label: __('Box Shadow', 'gutenverse'),
            allowDeviceControl: true,
            style: [
                {
                    selector: `.guten-element.guten-countdown.${elementId} .days-wrapper`,
                    allowRender: (value) => (! oneForAll && (switcher.tabTime === 'days' || !switcher.tabTime)) && allowRenderBoxShadow(value),
                    render: value => handleBoxShadow(value)
                }
            ]
        },
        {
            id: 'boxShadowHoverOptions2',
            component: HeadingControl,
            show: ! oneForAll && (switcher.tabTime === 'days' || !switcher.tabTime),
            label: __('Box Shadow Hover', 'gutenverse'),
        },
        {
            id: 'daysBoxShadowHover',
            show: ! oneForAll && (switcher.tabTime === 'days' || !switcher.tabTime),
            label: __('Box Shadow Hover', 'gutenverse'),
            component: BoxShadowControl,
            allowDeviceControl: true,
            style: [
                {
                    selector: `.guten-element.guten-countdown.${elementId} .days-wrapper:hover`,
                    allowRender: (value) => (! oneForAll && (switcher.tabTime === 'days' || !switcher.tabTime)) && allowRenderBoxShadow(value),
                    render: value => handleBoxShadow(value)
                },
            ]
        },
        {
            id: 'hoursBoxShadow',
            show: ! oneForAll && switcher.tabTime === 'hours',
            component: BoxShadowControl,
            label: __('Box Shadow', 'gutenverse'),
            allowDeviceControl: true,
            style: [
                {
                    selector: `.guten-element.guten-countdown.${elementId} .hours-wrapper`,
                    allowRender: (value) => (! oneForAll && switcher.tabTime === 'hours') && allowRenderBoxShadow(value),
                    render: value => handleBoxShadow(value)
                }
            ]
        },
        {
            id: 'boxShadowHoverOptions3',
            component: HeadingControl,
            show: ! oneForAll && switcher.tabTime === 'hours',
            label: __('Box Shadow Hover', 'gutenverse'),
        },
        {
            id: 'hoursBoxShadowHover',
            show: ! oneForAll && switcher.tabTime === 'hours',
            label: __('Box Shadow Hover', 'gutenverse'),
            component: BoxShadowControl,
            allowDeviceControl: true,
            style: [
                {
                    selector: `.guten-element.guten-countdown.${elementId} .hours-wrapper:hover`,
                    allowRender: (value) => (! oneForAll && switcher.tabTime === 'hours') && allowRenderBoxShadow(value),
                    render: value => handleBoxShadow(value)
                },
            ]
        },
        {
            id: 'minutesBoxShadow',
            show: ! oneForAll && switcher.tabTime === 'minutes',
            component: BoxShadowControl,
            label: __('Box Shadow', 'gutenverse'),
            allowDeviceControl: true,
            style: [
                {
                    selector: `.guten-element.guten-countdown.${elementId} .minutes-wrapper`,
                    allowRender: (value) => (! oneForAll && switcher.tabTime === 'minutes') && allowRenderBoxShadow(value),
                    render: value => handleBoxShadow(value)
                }
            ]
        },
        {
            id: 'boxShadowHoverOptions4',
            component: HeadingControl,
            show: ! oneForAll && switcher.tabTime === 'minutes',
            label: __('Box Shadow Hover', 'gutenverse'),
        },
        {
            id: 'minutesBoxShadowHover',
            show: ! oneForAll && switcher.tabTime === 'minutes',
            label: __('Box Shadow Hover', 'gutenverse'),
            component: BoxShadowControl,
            allowDeviceControl: true,
            style: [
                {
                    selector: `.guten-element.guten-countdown.${elementId} .minutes-wrapper:hover`,
                    allowRender: (value) => (! oneForAll && switcher.tabTime === 'minutes') && allowRenderBoxShadow(value),
                    render: value => handleBoxShadow(value)
                },
            ]
        },
        {
            id: 'secondsBoxShadow',
            show: ! oneForAll && switcher.tabTime === 'seconds',
            component: BoxShadowControl,
            label: __('Box Shadow', 'gutenverse'),
            allowDeviceControl: true,
            style: [
                {
                    selector: `.guten-element.guten-countdown.${elementId} .seconds-wrapper`,
                    allowRender: (value) => (! oneForAll && switcher.tabTime === 'seconds') && allowRenderBoxShadow(value),
                    render: value => handleBoxShadow(value)
                }
            ]
        },
        {
            id: 'boxShadowHoverOptions5',
            component: HeadingControl,
            show: ! oneForAll && switcher.tabTime === 'seconds',
            label: __('Box Shadow Hover', 'gutenverse'),
        },
        {
            id: 'secondsBoxShadowHover',
            show: ! oneForAll && switcher.tabTime === 'seconds',
            label: __('Box Shadow Hover', 'gutenverse'),
            component: BoxShadowControl,
            allowDeviceControl: true,
            style: [
                {
                    selector: `.guten-element.guten-countdown.${elementId} .seconds-wrapper:hover`,
                    allowRender: (value) => (! oneForAll && switcher.tabTime === 'seconds') && allowRenderBoxShadow(value),
                    render: value => handleBoxShadow(value)
                },
            ]
        },
    ];
};