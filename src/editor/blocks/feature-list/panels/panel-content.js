import { __ } from '@wordpress/i18n';
import { ColorControl, SelectControl, SwitchControl, TypographyControl } from 'gutenverse-core/controls';

export const contentPanel = (props) => {
    const {
        switcher,
        setSwitcher,
        elementId
    } = props;
    return [
        {
            id: 'contentPosition',
            label: __('Content Position', 'gutenverse'),
            component: SelectControl,
            options: [
                {
                    label: __('Top'),
                    value: 'start'
                },
                {
                    label: __('Middle'),
                    value: 'center'
                },
                {
                    label: __('Bottom'),
                    value: 'end'
                },
            ],
        },
        {
            id: 'titleTypography',
            label: __('Title Typography', 'gutenverse'),
            component: TypographyControl,
        },
        {
            id: 'descTypography',
            label: __('Description Typography', 'gutenverse'),
            component: TypographyControl,
        },
        {
            id: '__colorSwitch',
            component: SwitchControl,
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
            onChange: ({ __colorSwitch }) => setSwitcher({ ...switcher, colorSwitch: __colorSwitch })
        },
        {
            id: 'titleColor',
            label: __('Title Color', 'gutenverse'),
            component: ColorControl,
            show: switcher.colorSwitch === 'normal' || !switcher.colorSwitch,
            liveStyle: [
                {
                    'type': 'color',
                    'id': 'titleColor',
                    'selector': `.${elementId}.guten-feature-list .feature-list-wrapper .feature-list-item .feature-list-content .feature-list-title`,
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
            id: 'descColor',
            label: __('Description Color', 'gutenverse'),
            component: ColorControl,
            show: switcher.colorSwitch === 'normal' || !switcher.colorSwitch,
            liveStyle: [
                {
                    'type': 'color',
                    'id': 'descColor',
                    'selector': `.${elementId}.guten-feature-list .feature-list-wrapper .feature-list-item .feature-list-content .feature-list-desc`,
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
            id: 'titleColorHover',
            label: __('Title Color', 'gutenverse'),
            component: ColorControl,
            show: switcher.colorSwitch === 'hover',
            liveStyle: [
                {
                    'type': 'color',
                    'id': 'titleColorHover',
                    'selector': `.${elementId}.guten-feature-list .feature-list-wrapper .feature-list-item:hover .feature-list-content .feature-list-title`,
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
            id: 'descColorHover',
            label: __('Description Color', 'gutenverse'),
            component: ColorControl,
            show: switcher.colorSwitch === 'hover',
            liveStyle: [
                {
                    'type': 'color',
                    'id': 'descColorHover',
                    'selector': `.${elementId}.guten-feature-list .feature-list-wrapper .feature-list-item:hover .feature-list-content .feature-list-desc`,
                    'properties': [
                        {
                            'name': 'color',
                            'valueType': 'direct'
                        }
                    ]
                },
            ]
        },
    ];
};