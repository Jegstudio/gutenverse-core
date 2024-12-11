import { __ } from '@wordpress/i18n';
import { CheckboxControl, IconControl, ImageControl, RepeaterControl, SelectControl, SizeControl, TextareaControl, TextControl } from 'gutenverse-core/controls';

export const settingsPanel = (props) => {
    const {
        elementId,
    } = props;
    return [
        {
            id: 'featureList',
            component: RepeaterControl,
            titleFormat: '<strong><%= value.title ? value.title : "Feature List" %></strong>',
            repeaterDefault: {
                type: 'icon',
            },
            options: [
                {
                    id: 'title',
                    label: __('Title', 'gutenverse'),
                    component: TextControl,
                },
                {
                    id: 'content',
                    label: __('Content', 'gutenverse'),
                    component: TextareaControl,
                },
                {
                    id: 'link',
                    label: __('Link', 'gutenverse'),
                    component: TextControl
                },
                {
                    id: 'type',
                    label: __('Icon Type', 'gutenverse'),
                    component: SelectControl,
                    options: [
                        {
                            value: 'icon',
                            label: 'Icon'
                        },
                        {
                            value: 'image',
                            label: 'Image'
                        },
                    ],
                },
                {
                    id: 'image',
                    label: __('Image', 'gutenverse'),
                    show: value => value.type === 'image',
                    component: ImageControl,
                },
                {
                    id: 'lazyLoad',
                    label: __('Set Lazy Load', 'gutenverse'),
                    show: value => value.type === 'image',
                    component: CheckboxControl,
                },
                {
                    id: 'icon',
                    label: __('Icon', 'gutenverse'),
                    show: value => value.type === 'icon',
                    component: IconControl,
                },
            ],
        },
        {
            id: 'iconWrapperShape',
            label: __('Icon Wrapper Shape', 'gutenverse'),
            component: SelectControl,
            options: [
                {
                    value: 'square',
                    label: 'Square'
                },
                {
                    value: 'rhombus',
                    label: 'Rhombus'
                },
            ],
            style: [
                {
                    selector: `.${elementId}.guten-feature-list .feature-list-wrapper .icon-wrapper .icon`,
                    render: (value) => {
                        switch (value) {
                            case 'rhombus':
                                return 'transform: rotate(45deg);';
                            case 'square':
                            default:
                                return 'transform: rotate(0deg);';
                        }
                    },
                },
                {
                    selector: `.${elementId}.guten-feature-list .feature-list-wrapper .icon-wrapper .icon > *`,
                    render: (value) => {
                        switch (value) {
                            case 'rhombus':
                                return 'transform: rotate(-45deg);';
                            case 'square':
                            default:
                                return 'transform: rotate(0deg);';
                        }
                    },
                },
            ],
        },
        {
            id: 'iconPosition',
            label: __('Icon Wrapper Shape', 'gutenverse'),
            component: SelectControl,
            options: [
                {
                    value: 'left',
                    label: 'Left'
                },
                {
                    value: 'right',
                    label: 'Right'
                },
            ],
        },
        {
            id: 'showConnector',
            label: __('Show Connector', 'gutenverse'),
            component: CheckboxControl,
        },
        {
            id: 'listSpace',
            component: SizeControl,
            label: __('List Space', 'gutenverse'),
            allowDeviceControl: true,
            units: {
                px: {
                    text: 'px',
                    min: 1,
                    max: 1000,
                    step: 1,
                    unit: 'px',
                },
                ['%']: {
                    text: '%',
                    min: 1,
                    max: 100,
                    step: 1,
                    unit: '%',
                },
                vh: {
                    text: 'vh',
                    min: 1,
                    max: 100,
                    step: 1,
                    unit: 'vh',
                },
            },
            style: [
                {
                    selector: `.${elementId}.guten-feature-list .feature-list-wrapper`,
                    render: value => `gap:${value['point']}${value['unit']};`
                },
                {
                    selector: `.${elementId}.guten-feature-list`,
                    render: value => `--space-between: ${value['point']}${value['unit']};`
                },
            ]
        },
    ];
};