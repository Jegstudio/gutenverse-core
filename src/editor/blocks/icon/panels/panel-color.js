import { __ } from '@wordpress/i18n';
import { ColorControl, SwitchControl } from 'gutenverse-core/controls';
import { handleColor } from 'gutenverse-core/styling';

export const contentColor = (props) => {
    const {
        elementId,
        switcher,
        setSwitcher,
    } = props;

    return [
        {
            id: '__iconClr',
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
            onChange: ({__iconClr}) => setSwitcher({...switcher, iconClr: __iconClr})
        },
        /* color icon */
        {
            id: 'iconColorTwo',
            show: !switcher.iconClr || switcher.iconClr === 'normal',
            label: __('Normal Color', 'gutenverse'),
            component: ColorControl,
            liveStyle: [
                {
                    'id': 'iconColorTwo',
                    'type': 'color',
                    'selector': `.${elementId} .guten-icon-wrapper.stacked i`,
                    'properties': [
                        {
                            'name': 'color',
                            'valueType': 'direct'
                        }
                    ],
                },
                {
                    'id': 'iconColorTwo',
                    'type': 'color',
                    'selector': `.${elementId} .guten-icon-wrapper.framed`,
                    'properties': [
                        {
                            'name': 'background-color',
                            'valueType': 'direct'
                        }
                    ],
                }
            ],
        },
        /* color icon background */
        {
            id: 'iconColorOne',
            show: !switcher.iconClr || switcher.iconClr === 'normal',
            label: __('Normal Background Color', 'gutenverse'),
            component: ColorControl,
            liveStyle: [
                {
                    'id': 'iconColorOne',
                    'type': 'color',
                    'selector': `.${elementId} .guten-icon-wrapper.framed i`,
                    'properties': [
                        {
                            'name': 'color',
                            'valueType': 'direct'
                        }
                    ],
                },
                {
                    'id': 'iconColorOne',
                    'type': 'color',
                    'selector': `.${elementId} .guten-icon-wrapper.framed`,
                    'properties': [
                        {
                            'name': 'border-color',
                            'valueType': 'direct'
                        }
                    ],
                },
                {
                    'id': 'iconColorOne',
                    'type': 'color',
                    'selector': `.${elementId} .guten-icon-wrapper.stacked`,
                    'properties': [
                        {
                            'name': 'background-color',
                            'valueType': 'direct'
                        }
                    ],
                }
            ],
        },
        /* color icon hover*/
        {
            id: 'iconColorHoverTwo',
            show: switcher.iconClr === 'hover',
            label: __('Hover Color', 'gutenverse'),
            component: ColorControl,
            liveStyle: [
                {
                    'id': 'iconColorHoverTwo',
                    'type': 'color',
                    'selector': `.${elementId} .guten-icon-wrapper.stacked:hover i`,
                    'properties': [
                        {
                            'name': 'color',
                            'valueType': 'direct'
                        }
                    ],
                },
                {
                    'id': 'iconColorHoverTwo',
                    'type': 'color',
                    'selector': `.${elementId} .guten-icon-wrapper.framed:hover`,
                    'properties': [
                        {
                            'name': 'background-color',
                            'valueType': 'direct'
                        }
                    ],
                }
            ],
        },
        /* color icon background hover */
        {
            id: 'iconColorHoverOne',
            show: switcher.iconClr === 'hover',
            label: __('Hover Background Color', 'gutenverse'),
            component: ColorControl,
            liveStyle: [
                {
                    'id': 'iconColorHoverOne',
                    'type': 'color',
                    'selector': `.${elementId} .guten-icon-wrapper.framed:hover i`,
                    'properties': [
                        {
                            'name': 'color',
                            'valueType': 'direct'
                        }
                    ],
                },
                {
                    'id': 'iconColorHoverOne',
                    'type': 'color',
                    'selector': `.${elementId} .guten-icon-wrapper.framed:hover`,
                    'properties': [
                        {
                            'name': 'border-color',
                            'valueType': 'direct'
                        }
                    ],
                },
                {
                    'id': 'iconColorHoverOne',
                    'type': 'color',
                    'selector': `.${elementId} .guten-icon-wrapper.stacked:hover`,
                    'properties': [
                        {
                            'name': 'background-color',
                            'valueType': 'direct'
                        }
                    ],
                }
            ],
        },
    ];
};