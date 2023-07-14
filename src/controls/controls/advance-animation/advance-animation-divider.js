import { __ } from '@wordpress/i18n';
import { ColorControl, RangeControl } from 'gutenverse-core-editor/controls';
import { handleAdanimDividerColor, handleAdanimDividerSize, handleAdanimDividerWidth } from 'gutenverse-core/styling';

export const customAdanimDivider = () => {
    return [
        {
            value: 'dividerWidth',
            label: __('Divider Width', 'gutenverse'),
            controls: [
                {
                    id: 'dividerWidth',
                    label: __('Divider Width', 'gutenverse'),
                    component: RangeControl,
                    allowDeviceControl: true,
                    min: 0,
                    max: 100,
                    step: 1,
                }
            ],
            render: handleAdanimDividerWidth
        },
        {
            value: 'dividerSize',
            label: __('Divider Size', 'gutenverse'),
            controls: [
                {
                    id: 'dividerSize',
                    label: __('Divider Size', 'gutenverse'),
                    component: RangeControl,
                    allowDeviceControl: true,
                    min: 0,
                    max: 100,
                    step: 0.1,
                }
            ],
            render: handleAdanimDividerSize
        },
        {
            value: 'dividerColor',
            label: __('Divider Color', 'gutenverse'),
            controls: [
                {
                    id: 'dividerColor',
                    label: __('Divider Color', 'gutenverse'),
                    component: ColorControl,
                }
            ],
            render: handleAdanimDividerColor
        },
    ];
};