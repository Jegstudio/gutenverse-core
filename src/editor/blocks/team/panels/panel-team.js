import { __ } from '@wordpress/i18n';
import { CheckboxControl, ColorControl, ImageControl, SelectControl, TextareaControl, TextControl } from 'gutenverse-core/controls';
import { handleColor } from 'gutenverse-core/styling';

export const teamPanel = (props) => {
    const {
        showDesc,
        elementId,
        hoverBottom,
        profileType
    } = props;

    return [
        {
            id: 'src',
            label: __('Profile Picture', 'gutenverse'),
            component: ImageControl
        },
        {
            id: 'nameTag',
            label: __('Name HTML tag', 'gutenverse'),
            component: SelectControl,
            options: [
                {
                    value: 'h1',
                    label: 'H1'
                },
                {
                    value: 'h2',
                    label: 'H2'
                },
                {
                    value: 'h3',
                    label: 'H3'
                },
                {
                    value: 'h4',
                    label: 'H4'
                },
                {
                    value: 'h5',
                    label: 'H5'
                },
                {
                    value: 'h6',
                    label: 'H6'
                },
                {
                    value: 'div',
                    label: 'Div'
                },
                {
                    value: 'span',
                    label: 'Span'
                },
                {
                    value: 'p',
                    label: 'P'
                },
            ],
        },
        {
            id: 'profileType',
            label: __('Style', 'gutenverse'),
            component: SelectControl,
            options: [
                {
                    value: 'default',
                    label: 'Default'
                },
                {
                    value: 'overlay',
                    label: 'Overlay Profile'
                },
                {
                    value: 'hover',
                    label: 'Social Hover'
                },
            ],
        },
        {
            id: 'overlayType',
            show: profileType === 'overlay',
            label: __('Overlay Style', 'gutenverse'),
            component: SelectControl,
            options: [
                {
                    value: 'default',
                    label: 'Default'
                },
                {
                    value: 'scale',
                    label: 'Scale'
                },
            ],
        },
        {
            id: 'overlayPosition',
            show: profileType === 'overlay',
            label: __('Overlay Content Position', 'gutenverse'),
            component: SelectControl,
            options:[
                {
                    value: 'center',
                    label: 'Center'
                },
                {
                    value: 'bottom',
                    label: 'Bottom'
                }
            ],
        },
        {
            id: 'name',
            label: __('Name', 'gutenverse'),
            component: TextControl
        },
        {
            id: 'job',
            label: __('Job', 'gutenverse'),
            component: TextControl
        },
        {
            id: 'showDesc',
            label: __('Show Description', 'gutenverse'),
            component: CheckboxControl
        },
        {
            id: 'description',
            show: showDesc,
            label: __('Description', 'gutenverse'),
            component: TextareaControl
        },
        {
            id: 'hoverBottom',
            show: ['default', 'hover'].includes(profileType),
            label: __('Enable Hover Border Bottom', 'gutenverse'),
            component: CheckboxControl
        },
        {
            id: 'hoverBottomColor',
            show: hoverBottom && ['default', 'hover'].includes(profileType),
            label: __('Border Bottom Color', 'gutenverse'),
            component: ColorControl,
            style: [
                {
                    selector: `.${elementId} .border-bottom .animated`,
                    render: value => handleColor(value, 'background-color')
                }
            ]
        },
        {
            id: 'hoverBottomDirection',
            show: hoverBottom && ['default', 'hover'].includes(profileType),
            label: __('Hover Direction', 'gutenverse'),
            component: SelectControl,
            options: [
                {
                    value: 'left',
                    label: 'From Left'
                },
                {
                    value: 'right',
                    label: 'From Right'
                },
            ]
        },
        {
            id: 'showSocial',
            label: __('Show Social Icons', 'gutenverse'),
            component: CheckboxControl
        },
    ];
};