
import { __ } from '@wordpress/i18n';
import { AlertControl, ColorControl, SelectControl, SizeControl } from 'gutenverse-core/controls';

export const dividerPanel = (props) => {
    const {
        elementId,
        showDivider,
        layout
    } = props;

    return [
        {
            id: 'divider-notice',
            component: AlertControl,
            children: <>
                <span>{__('This Panel Option Only Show If You Turn On "Show Divider" Option')}</span>
            </>
        },
        {
            id: 'colorDivider',
            label: __('Color Divider', 'gutenverse'),
            show: showDivider,
            component: ColorControl,
            liveStyle: [
                {
                    'type': 'color',
                    'id': 'colorDivider',
                    'selector': `.${elementId} .taxonomy-list-item:not(:first-child))`,
                    'properties': [
                        {
                            'name': 'border-color',
                            'valueType': 'direct'
                        }
                    ]
                }
            ]
        },
        {
            id: 'typeDivider',
            label: __('Type Divider', 'gutenverse'),
            show: showDivider,
            component: SelectControl,
            options: [
                {
                    label: __('Solid', 'gutenverse'),
                    value: 'solid'
                },
                {
                    label: __('Double', 'gutenverse'),
                    value: 'double'
                },
                {
                    label: __('Dotted', 'gutenverse'),
                    value: 'dotted'
                },
                {
                    label: __('Dashed', 'gutenverse'),
                    value: 'dashed'
                },
            ],
        },
        {
            id: 'widthDivider',
            label: __('Width Divider', 'gutenverse'),
            show: showDivider,
            component: SizeControl,
            liveStyle: [
                {
                    'type': 'unitPoint',
                    'id': 'widthDivider',
                    'selector': `.${elementId} .taxonomy-list-item`,
                    'properties': [
                        {
                            'name': layout === 'column' ? 'width' : 'height',
                            'valueType': 'direct'
                        }
                    ]
                }
            ]
        },
        {
            id: 'sizeDivider',
            label: __('Size Divider', 'gutenverse'),
            show: showDivider,
            component: SizeControl,
            liveStyle: [
                {
                    'type': 'unitPoint',
                    'id': 'sizeDivider',
                    'selector': `.${elementId} .taxonomy-list-item`,
                    'properties': [
                        {
                            'name': 'border-width',
                            'valueType': 'direct'
                        }
                    ]
                }
            ]
        },
    ];
};
