import { __ } from '@wordpress/i18n';
import { BorderControl, BorderResponsiveControl, BoxShadowControl, SwitchControl } from 'gutenverse-core/controls';
import { getDeviceType } from 'gutenverse-core/editor-helper';
import { allowRenderBoxShadow, handleBorder, handleBorderResponsive, handleBoxShadow } from 'gutenverse-core/styling';

export const borderPanel = (props) => {
    const {
        elementId,
        switcher,
        setSwitcher,
        selector,
        selectorHover,
    } = props;

    const device = getDeviceType();

    return [
        {
            id: '__borderHover',
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
            onChange: ({ __borderHover }) => setSwitcher({ ...switcher, border: __borderHover })
        },
        {
            id: 'border',
            show: (!switcher.border || switcher.border === 'normal') && device === 'Desktop',
            label: __('Border Type', '--gctd--'),
            component: BorderControl,
            liveStyle: [
                {
                    'type': 'border',
                    'id': 'border',
                    'selector': selector ? selector : `.editor-styles-wrapper .is-root-container .${elementId}.guten-element`,
                }
            ],
            style: [
                {
                    selector: selector ? selector : `.${elementId}`,
                    hasChild: true,
                    render: value => handleBorder(value)
                }
            ]
        },
        {
            id: 'borderResponsive',
            show: (!switcher.border || switcher.border === 'normal') && device !== 'Desktop',
            label: __('Border Type', '--gctd--'),
            component: BorderResponsiveControl,
            allowDeviceControl: true,
            liveStyle: [
                {
                    'type': 'borderResponsive',
                    'id': 'borderResponsive',
                    'selector': selector ? selector : `.editor-styles-wrapper .is-root-container .${elementId}.guten-element`,
                }
            ],
            style: [
                {
                    selector: selector ? selector : `.${elementId}`,
                    allowRender: () => device !== 'Desktop',
                    render: value => handleBorderResponsive(value)
                }
            ]
        },
        {
            id: 'borderHover',
            show: switcher.border === 'hover' && device === 'Desktop',
            label: __('Border Type', '--gctd--'),
            component: BorderControl,
            liveStyle: [
                {
                    'type': 'border',
                    'id': 'borderHover',
                    'selector': selectorHover ? selectorHover : `.editor-styles-wrapper .is-root-container .${elementId}.guten-element`,
                }
            ],
            style: [
                {
                    selector: selector ? `${selector}:hover` : `.${elementId}:hover`,
                    hasChild: true,
                    render: value => handleBorder(value)
                }
            ]
        },
        {
            id: 'borderHoverResponsive',
            show: switcher.border === 'hover' && device !== 'Desktop',
            label: __('Border Type', '--gctd--'),
            component: BorderResponsiveControl,
            allowDeviceControl: true,
            liveStyle: [
                {
                    'type': 'borderResponsive',
                    'id': 'borderHoverResponsive',
                    'selector': selectorHover ? selectorHover : `.editor-styles-wrapper .is-root-container .${elementId}.guten-element`,
                }
            ],
            style: [
                {
                    selector: selector ? `${selector}:hover` : `.${elementId}:hover`,
                    render: value => handleBorderResponsive(value)
                }
            ]
        },
        {
            id: 'boxShadow',
            show: !switcher.border || switcher.border === 'normal',
            label: __('Box Shadow', '--gctd--'),
            component: BoxShadowControl,
            liveStyle: [
                {
                    'type': 'boxShadow',
                    'id': 'boxShadow',
                    'properties': [
                        {
                            'name': 'box-shadow',
                            'valueType': 'direct'
                        }
                    ],
                    'selector': selector ? selector : `.editor-styles-wrapper .is-root-container .${elementId}.guten-element`,
                }
            ],
            style: [
                {
                    selector: selector ? selector : `.${elementId}`,
                    allowRender: (value) => allowRenderBoxShadow(value),
                    render: value => handleBoxShadow(value)
                }
            ],
        },
        {
            id: 'boxShadowHover',
            show: switcher.border === 'hover',
            label: __('Box Shadow', '--gctd--'),
            component: BoxShadowControl,
            liveStyle: [
                {
                    'type': 'boxShadow',
                    'id': 'boxShadowHover',
                    'properties': [
                        {
                            'name': 'box-shadow',
                            'valueType': 'direct'
                        }
                    ],
                    'selector': selectorHover ? selectorHover : `.editor-styles-wrapper .is-root-container .${elementId}.guten-element`,
                }
            ],
            style: [
                {
                    selector: selector ? `${selector}:hover` : `.${elementId}:hover`,
                    allowRender: (value) => allowRenderBoxShadow(value),
                    render: value => handleBoxShadow(value)
                }
            ]
        }
    ];
};