
import { __ } from '@wordpress/i18n';
import { BackgroundControl, BorderResponsiveControl, BoxShadowControl, CheckboxControl, ColorControl, DimensionControl, HeadingControl, RangeControl, SelectControl, SizeControl, SwitchControl, TypographyControl } from 'gutenverse-core/controls';
import { allowRenderBoxShadow, handleBackground, handleBorderResponsive, handleBoxShadow, handleColor, handleDimension, handleTypography, handleUnitPoint } from 'gutenverse-core/styling';

export const timeStylePanel = (props) => {
    const {
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
            show: ! oneForAll && (switcher.tabTime === 'days' || !switcher.tabTime),
            component: ColorControl,
        },
        {
            id: 'daysDigitTypography',
            label: __('Digit Typography', 'gutenverse'),
            component: TypographyControl,
            show: ! oneForAll && (switcher.tabTime === 'days' || !switcher.tabTime),
        },
        {
            id: 'daysLabelColor',
            label: __('Label color', 'gutenverse'),
            show: ! oneForAll && (switcher.tabTime === 'days' || !switcher.tabTime),
            component: ColorControl,
        },
        {
            id: 'daysLabelTypography',
            label: __('Label Typography', 'gutenverse'),
            component: TypographyControl,
            show: ! oneForAll && (switcher.tabTime === 'days' || !switcher.tabTime),
        },
        {
            id: 'hoursDigitColor',
            label: __('Digit color', 'gutenverse'),
            show: ! oneForAll && switcher.tabTime === 'hours',
            component: ColorControl,
        },
        {
            id: 'hoursDigitTypography',
            label: __('Digit Typography', 'gutenverse'),
            component: TypographyControl,
            show: ! oneForAll && switcher.tabTime === 'hours',
        },
        {
            id: 'hoursLabelColor',
            label: __('Label color', 'gutenverse'),
            show: ! oneForAll && switcher.tabTime === 'hours',
            component: ColorControl,
        },
        {
            id: 'hoursLabelTypography',
            label: __('Label Typography', 'gutenverse'),
            component: TypographyControl,
            show: ! oneForAll && switcher.tabTime === 'hours',
        },
        {
            id: 'minutesDigitColor',
            label: __('Digit color', 'gutenverse'),
            show: ! oneForAll && switcher.tabTime === 'minutes',
            component: ColorControl,
        },
        {
            id: 'minutesDigitTypography',
            label: __('Digit Typography', 'gutenverse'),
            component: TypographyControl,
            show: ! oneForAll && switcher.tabTime === 'minutes',
        },
        {
            id: 'minutesLabelColor',
            label: __('Label color', 'gutenverse'),
            show: ! oneForAll && switcher.tabTime === 'minutes',
            component: ColorControl,
        },
        {
            id: 'minutesLabelTypography',
            label: __('Label Typography', 'gutenverse'),
            component: TypographyControl,
            show: ! oneForAll && switcher.tabTime === 'minutes',
        },
        {
            id: 'secondsDigitColor',
            label: __('Digit color', 'gutenverse'),
            show: ! oneForAll && switcher.tabTime === 'seconds',
            component: ColorControl,
        },
        {
            id: 'secondsDigitTypography',
            label: __('Digit Typography', 'gutenverse'),
            component: TypographyControl,
            show: ! oneForAll && switcher.tabTime === 'seconds',
        },
        {
            id: 'secondsLabelColor',
            label: __('Label color', 'gutenverse'),
            show: ! oneForAll && switcher.tabTime === 'seconds',
            component: ColorControl,
        },
        {
            id: 'secondsLabelTypography',
            label: __('Label Typography', 'gutenverse'),
            component: TypographyControl,
            show: ! oneForAll && switcher.tabTime === 'seconds',
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
        },
        {
            id: 'oneForAllBackgroundHover',
            show: oneForAll && switcher.oneForAllBackgroundTab === 'hover',
            label: __('Background Hover', 'gutenverse'),
            component: BackgroundControl,
            allowDeviceControl: true,
            options: ['default', 'gradient'],
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
        },
        {
            id: 'daysBackgroundHover',
            show: ! oneForAll && (switcher.tabTime === 'days' || !switcher.tabTime) && 'hover' === switcher.daysBackgroundTab,
            label: __('Background Hover', 'gutenverse'),
            component: BackgroundControl,
            allowDeviceControl: true,
            options: ['default', 'gradient'],
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
        },
        {
            id: 'hoursBackgroundHover',
            show: ! oneForAll && switcher.tabTime === 'hours' && switcher.hoursBackgroundTab === 'hover',
            label: __('Background Hover', 'gutenverse'),
            component: BackgroundControl,
            allowDeviceControl: true,
            options: ['default', 'gradient'],
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
        },
        {
            id: 'minutesBackgroundHover',
            show: ! oneForAll && switcher.tabTime === 'minutes' && switcher.minutesBackgroundTab === 'hover',
            label: __('Background Hover', 'gutenverse'),
            component: BackgroundControl,
            allowDeviceControl: true,
            options: ['default', 'gradient'],
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
        },
        {
            id: 'secondsBackgroundHover',
            show: ! oneForAll && switcher.tabTime === 'seconds' && switcher.minutesBackgroundTab === 'hover',
            label: __('Background Hover', 'gutenverse'),
            component: BackgroundControl,
            allowDeviceControl: true,
            options: ['default', 'gradient'],
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
        },
        {
            id: 'oneForAllBorderHover',
            show: oneForAll && switcher.oneForAllBorderTab === 'hover',
            label: __('Border Hover', 'gutenverse'),
            component: BorderResponsiveControl,
            allowDeviceControl: true,
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
        },
        {
            id: 'daysBorderHover',
            show: ! oneForAll && (switcher.tabTime === 'days' || !switcher.tabTime) && switcher.daysBorderTab === 'hover',
            label: __('Border Hover', 'gutenverse'),
            component: BorderResponsiveControl,
            allowDeviceControl: true,
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
        },
        {
            id: 'hoursBorderHover',
            show: ! oneForAll && switcher.tabTime === 'hours' && switcher.hoursBorderTab === 'hover',
            label: __('Border Hover', 'gutenverse'),
            component: BorderResponsiveControl,
            allowDeviceControl: true,
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
        },
        {
            id: 'minutesBorderHover',
            show: ! oneForAll && switcher.tabTime === 'minutes' && switcher.minutesBorderTab === 'hover',
            label: __('Border Hover', 'gutenverse'),
            component: BorderResponsiveControl,
            allowDeviceControl: true,
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
        },
        {
            id: 'secondsBorderHover',
            show: ! oneForAll && switcher.tabTime === 'seconds' && switcher.secondsBorderTab === 'hover',
            label: __('Border Hover', 'gutenverse'),
            component: BorderResponsiveControl,
            allowDeviceControl: true,
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
        },
        {
            id: 'oneForAllBoxShadowHover',
            show: oneForAll && switcher.oneForAllBoxShadowTab === 'hover',
            label: __('Box Shadow Hover', 'gutenverse'),
            component: BoxShadowControl,
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
        },
        {
            id: 'daysBoxShadowHover',
            show: ! oneForAll && (switcher.tabTime === 'days' || !switcher.tabTime) && switcher.daysBoxShadowTab === 'hover',
            label: __('Box Shadow Hover', 'gutenverse'),
            component: BoxShadowControl,
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
        },
        {
            id: 'hoursBoxShadowHover',
            show: ! oneForAll && switcher.tabTime === 'hours' && switcher.hoursBoxShadowTab === 'hover',
            label: __('Box Shadow Hover', 'gutenverse'),
            component: BoxShadowControl,
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
        },
        {
            id: 'minutesBoxShadowHover',
            show: ! oneForAll && switcher.tabTime === 'minutes' && switcher.minutesBoxShadowTab === 'hover',
            label: __('Box Shadow Hover', 'gutenverse'),
            component: BoxShadowControl,
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
        },
        {
            id: 'secondsBoxShadowHover',
            show: ! oneForAll && switcher.tabTime === 'seconds' && switcher.secondsBoxShadowTab === 'hover',
            label: __('Box Shadow Hover', 'gutenverse'),
            component: BoxShadowControl,
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
            show: ! oneForAll && (switcher.tabTime === 'days' || !switcher.tabTime),
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
        },
    ];
};