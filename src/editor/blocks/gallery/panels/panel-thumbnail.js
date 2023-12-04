import { __ } from '@wordpress/i18n';
import { BorderControl } from 'gutenverse-core/controls';
import { handleBorderResponsive } from 'gutenverse-core/styling';

export const thumbnailPanel = ({ elementId }) => {
    return [
        {
            id: 'thumbnailBorder_v2',
            label: __('Border Type', 'gutenverse'),
            component: BorderControl,
            allowDeviceControl: true,
            style: [
                {
                    selector: `.${elementId} .gallery-items .gallery-item-wrap .thumbnail-wrap`,
                    render: value => handleBorderResponsive(value)
                }
            ]
        },
    ];
};