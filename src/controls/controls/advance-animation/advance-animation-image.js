import { __ } from '@wordpress/i18n';
import { DimensionControl, ImageFilterControl } from 'gutenverse-core/controls';
import { handleAdanimImageFilter, handleAdanimImageRadius } from 'gutenverse-core/styling';

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
            render: handleAdanimImageRadius
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
            render: handleAdanimImageFilter
        }
    ];
};