import { __ } from '@wordpress/i18n';
import { DimensionControl, ImageFilterControl } from 'gutenverse-core/controls';
import { renderBorderRadius, renderFilter } from './render';

export const customAdanimImage = () => {
    return [
        {
            value: 'imageBorderRadius',
            label: __('Image Border Radius', 'gutenverse'),
            controls: [
                {
                    id: 'imageBorderRadius',
                    label: __('Image Border Radius', 'gutenverse'),
                    component: DimensionControl,
                    allowDeviceControl: true,
                    position: ['top', 'right', 'bottom', 'left'],
                    units: {
                        px: {
                            text: 'px',
                            unit: 'px'
                        },
                        em: {
                            text: 'em',
                            unit: 'em'
                        },
                        ['%']: {
                            text: '%',
                            unit: '%'
                        },
                    },
                }
            ],
            render: renderBorderRadius
        },
        {
            value: 'imageFilter',
            label: __('Image Filter', 'gutenverse'),
            controls: [
                {
                    id: 'imageFilter',
                    label: __('Image Filter', 'gutenverse'),
                    component: ImageFilterControl,
                }
            ],
            render: renderFilter
        }
    ];
};