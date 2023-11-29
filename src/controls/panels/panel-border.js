import { __ } from '@wordpress/i18n';
import { BorderControl, BoxShadowControl, SwitchControl } from 'gutenverse-core/controls';
import { allowRenderBoxShadow, handleBorderV2, handleBoxShadow } from 'gutenverse-core/styling';

export const borderPanel = (props) => {
    const {
        elementId,
        _boxShadowId,
        switcher,
        setSwitcher,
        selector
    } = props;

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
            id: 'border_v2',
            show: !switcher.border || switcher.border === 'normal',
            label: __('Border Type', '--gctd--'),
            component: BorderControl,
            allowDeviceControl: true,
            style: [
                {
                    selector: selector ? selector : `.${elementId}`,
                    render: value => handleBorderV2(value)
                }
            ]
        },
        {
            id: 'borderHover_v2',
            show: switcher.border === 'hover',
            label: __('Border Type', '--gctd--'),
            component: BorderControl,
            allowDeviceControl: true,
            style: [
                {
                    selector: selector ? `${selector}:hover` : `.${elementId}:hover`,
                    render: value => handleBorderV2(value)
                }
            ]
        },
        {
            id: _boxShadowId ? _boxShadowId : 'boxShadow',
            show: !switcher.border || switcher.border === 'normal',
            label: __('Box Shadow', '--gctd--'),
            component: BoxShadowControl,
            style: [
                {
                    selector: selector ? selector : `.${elementId}`,
                    allowRender: (value) => allowRenderBoxShadow(value),
                    render: value => handleBoxShadow(value)
                }
            ]
        },
        {
            id: 'boxShadowHover',
            show: switcher.border === 'hover',
            label: __('Box Shadow', '--gctd--'),
            component: BoxShadowControl,
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