import { __ } from '@wordpress/i18n';

import { AlignCenter, AlignLeft, AlignRight } from 'react-feather';
import { CheckboxControl, IconRadioControl, SelectControl, SizeControl, TextControl } from 'gutenverse-core-editor/controls';
import { handleUnitPoint } from 'gutenverse-core/styling';

export const settingPanel = ({elementId}) => {
    return [
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
            label: __('Animation Style', 'gutenverse'),
            component: SelectControl,
            options: [
                {
                    value: 'none',
                    label: __('None')
                },
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
            ]
        },
        {
            id: 'text',
            label: __('Animated Text'),
            component: TextControl
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
                    icon: <AlignLeft/>,
                },
                {
                    label: __('Align Center', 'gutenverse'),
                    value: 'center',
                    icon: <AlignCenter/>,
                },
                {
                    label: __('Align Right', 'gutenverse'),
                    value: 'flex-end',
                    icon: <AlignRight/>,
                },
            ],
            style: [
                {
                    selector: `.${elementId}`,
                    render: value => `justify-content: ${value};`
                }
            ]
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
            style: [
                {
                    selector: `.${elementId}`,
                    render: value => handleUnitPoint(value, 'min-height')
                },
            ],
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
            style: [
                {
                    selector: `.${elementId}`,
                    render: value => `align-items: ${value};`
                },
            ],
        },
    ];
};