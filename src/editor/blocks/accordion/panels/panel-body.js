import { __ } from '@wordpress/i18n';
import {
    ColorControl,
    SwitchControl,
} from 'gutenverse-core/controls';
import { getDeviceType } from 'gutenverse-core/editor-helper';

export const panelBody = (props) => {
    const {
        elementId,
        switcher,
        setSwitcher,
    } = props;

    return [
        {
            id: '__accordionItemBodyColor',
            component: SwitchControl,
            options: [
                {
                    value: 'open',
                    label: 'Open'
                },
                {
                    value: 'closed',
                    label: 'Closed'
                },
                {
                    value: 'hover',
                    label: 'Hover'
                }
            ],
            onChange: ({ __accordionItemBodyColor }) => setSwitcher({ ...switcher, accordionItemBodyColor: __accordionItemBodyColor })
        },
        {
            id: 'contentTextColor',
            label: __('Text Color', 'gutenverse'),
            component: ColorControl,
            show: !switcher.accordionItemBodyColor || switcher.accordionItemBodyColor === 'open',
            liveStyle: [
                {
                    'id': 'contentTextColor',
                    'type': 'color',
                    'selector': `.${elementId} .accordion-item .accordion-content`,
                    'properties': [
                        {
                            'name': 'color',
                            'valueType': 'direct'
                        }
                    ],
                }
            ]
        },
        {
            id: 'contentBackgroundColor',
            label: __('Background Color', 'gutenverse'),
            component: ColorControl,
            show: !switcher.accordionItemBodyColor || switcher.accordionItemBodyColor === 'open',
            liveStyle: [
                {
                    'type': 'color',
                    'selector': `.${elementId} .accordion-item .accordion-content`,
                    'properties': [
                        {
                            'name': 'background-color',
                            'valueType': 'direct'
                        }
                    ],
                }
            ]
        },
        {
            id: 'contentTextColorClosed',
            label: __('Text Color', 'gutenverse'),
            component: ColorControl,
            show: switcher.accordionItemBodyColor === 'closed',
        },
        {
            id: 'contentBackgroundColorClosed',
            label: __('Background Color', 'gutenverse'),
            component: ColorControl,
            show: switcher.accordionItemBodyColor === 'closed',
        },
        {
            id: 'contentTextColorHover',
            label: __('Text Color', 'gutenverse'),
            component: ColorControl,
            show: switcher.accordionItemBodyColor === 'hover',
        },
        {
            id: 'contentBackgroundColorHover',
            label: __('Background Color', 'gutenverse'),
            component: ColorControl,
            show: switcher.accordionItemBodyColor === 'hover',
        },
    ];
};
