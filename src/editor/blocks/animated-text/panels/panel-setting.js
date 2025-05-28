import { __ } from '@wordpress/i18n';

import { AlignCenter, AlignLeft, AlignRight } from 'gutenverse-core/components';
import { CheckboxControl, IconRadioControl, RangeControl, RepeaterControl, SelectControl, SizeControl, TextControl } from 'gutenverse-core/controls';

export const settingPanel = (props) => {
    const {
        elementId,
        textType,
        style,
    } = props;

    const animationStyles = () => {
        const styles = [
            {
                value: 'zoom',
                label: __('Zoom')
            },
            {
                value: 'fade',
                label: __('Fade')
            },
            {
                value: 'jump',
                label: __('Jump')
            },
            {
                value: 'bend',
                label: __('Bend')
            },
            {
                value: 'drop',
                label: __('Drop')
            },
            {
                value: 'flip',
                label: __('Flip')
            },
            {
                value: 'pop',
                label: __('Pop')
            },
            {
                value: 'slide',
                label: __('Slide')
            },
            {
                value: 'rising',
                label: __('Rising')
            },
            {
                value: 'fall',
                label: __('Fall')
            },
        ];
        if (textType == 'default') {
            styles.unshift({
                value: 'none',
                label: __('None')
            });
        }
        return styles;
    };

    return [
        {
            id: 'textType',
            label: __('Text Type', 'gutenverse'),
            component: SelectControl,
            options: [
                {
                    label: __('Default', 'none'),
                    value: 'default',
                },
                {
                    label: __('Rotation'),
                    value: 'rotation',
                },
                {
                    label: __('Highlighted'),
                    value: 'highlighted',
                },
            ]
        },
        {
            id: 'titleTag',
            label: __('Title Tag', 'gutenverse'),
            component: SelectControl,
            options: [
                {
                    label: __('H1'),
                    value: 'h1'
                },
                {
                    label: __('H2'),
                    value: 'h2'
                },
                {
                    label: __('H3'),
                    value: 'h3'
                },
                {
                    label: __('H4'),
                    value: 'h4'
                },
                {
                    label: __('H5'),
                    value: 'h5'
                },
                {
                    label: __('H6'),
                    value: 'h6'
                },
                {
                    label: __('SPAN'),
                    value: 'span'
                },
            ],
        },
        {
            id: 'style',
            show: textType !== 'highlighted',
            label: __('Animation Style', 'gutenverse'),
            component: SelectControl,
            options: animationStyles()
        },
        {
            id: 'highlightedStyle',
            show: textType === 'highlighted',
            label: __('Highlighted Style', 'gutenverse'),
            component: SelectControl,
            options: [
                { label: __('Circle', 'gutenverse'), value: 'circle' },
                { label: __('Curly', 'gutenverse'), value: 'curly' },
                { label: __('Underline', 'gutenverse'), value: 'underline' },
                { label: __('Double', 'gutenverse'), value: 'double' },
                { label: __('Double Underline', 'gutenverse'), value: 'double-underline' },
                { label: __('Underline Zigzag', 'gutenverse'), value: 'underline-zigzag' },
                { label: __('Diagonal', 'gutenverse'), value: 'diagonal' },
                { label: __('Strikethrough', 'gutenverse'), value: 'strikethrough' },
                { label: __('X', 'gutenverse'), value: 'x' },
            ]

        },
        {
            id: 'text',
            show: (textType === 'default') || textType === 'highlighted',
            label: __('Animated Text', 'gutenverse'),
            component: TextControl
        },
        {
            id: 'displayDuration',
            show: style !== 'none',
            label: __('Display Duration', 'gutenverse'),
            component: RangeControl,
            min: 0,
            max: 10000,
            step: 100,
            unit: 'ms',
        },
        {
            id: 'animationDuration',
            show: style !== 'none',
            label: __('Animation Duration', 'gutenverse'),
            component: RangeControl,
            min: 0,
            max: 10000,
            step: 100,
            unit: 'ms',
        },
        {
            id: 'transitionDuration',
            show: style !== 'none',
            label: __('Transition Duration', 'gutenverse'),
            component: RangeControl,
            min: 0,
            max: 10000,
            step: 100,
            unit: 'ms',
        },
        {
            id: 'rotationTexts',
            show: textType === 'rotation',
            label: __('Text Rotation', 'gutenverse'),
            component: RepeaterControl,
            titleFormat: '<strong><%= value.rotationText%></strong>',
            options: [
                {
                    id: 'rotationText',
                    label: __('Title', 'gutenverse'),
                    component: TextControl,
                }
            ]
        },
        {
            id: 'beforeTextAnimated',
            label: __('Before Text Animated', 'gutenverse'),
            component: TextControl,
        },
        {
            id: 'afterTextAnimated',
            label: __('After Text Animated', 'gutenverse'),
            component: TextControl,
        },
        {
            id: 'splitByWord',
            label: __('Split By Word', 'gutenverse'),
            component: CheckboxControl
        },
        {
            id: 'alignText',
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
        },
        {
            id: 'loop',
            label: __('Loop', 'gutenverse'),
            component: CheckboxControl
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
            liveStyle: [
                {
                    'type': 'unitPoint',
                    'id': 'height',
                    'properties': [
                        {
                            'name': 'min-height',
                            'valueType': 'direct'
                        }
                    ],
                    'selector': `.${elementId}`,
                    'responsive': true
                }
            ]
        },
        {
            id: 'verticalAlign',
            label: __('Vertical Align', 'gutenverse'),
            component: SelectControl,
            allowDeviceControl: true,
            options: [
                {
                    label: __('Top'),
                    value: 'flex-start'
                },
                {
                    label: __('Middle'),
                    value: 'center'
                },
                {
                    label: __('Bottom'),
                    value: 'flex-end'
                },
            ],
        },
    ];
};