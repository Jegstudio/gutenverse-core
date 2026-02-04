import { __ } from '@wordpress/i18n';
import { RangeControl, SizeControl } from 'gutenverse-core/controls';

export const layoutPanel = () => {
    return [
        {
            id: 'column',
            label: __('Columns', 'gutenverse'),
            component: RangeControl,
            min: 1,
            max: 6,
            step: 1,
            allowDeviceControl: true,
        },
        {
            id: 'columnGap',
            label: __('Column Gap', 'gutenverse'),
            component: SizeControl,
            allowDeviceControl: true,
            units: {
                px: {
                    text: 'px',
                    min: 0,
                    max: 200,
                    step: 1,
                },
                em: {
                    text: 'em',
                    min: 0,
                    max: 20,
                    step: 0.1,
                },
                rem: {
                    text: 'rem',
                    min: 0,
                    max: 20,
                    step: 0.1,
                },
            },
        },
        {
            id: 'rowGap',
            label: __('Row Gap', 'gutenverse'),
            component: SizeControl,
            allowDeviceControl: true,
            units: {
                px: {
                    text: 'px',
                    min: 0,
                    max: 200,
                    step: 1,
                },
                em: {
                    text: 'em',
                    min: 0,
                    max: 20,
                    step: 0.1,
                },
                rem: {
                    text: 'rem',
                    min: 0,
                    max: 20,
                    step: 0.1,
                },
            },
        },
    ];
};
