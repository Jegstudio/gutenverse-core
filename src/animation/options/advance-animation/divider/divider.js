import { __ } from '@wordpress/i18n';
import { ColorControl, RangeControl } from 'gutenverse-core/controls';
import { renderColor, renderSize, renderWidth } from './render';

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
            render: renderWidth
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
            render: renderSize
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
            render: renderColor
        },
    ];
};