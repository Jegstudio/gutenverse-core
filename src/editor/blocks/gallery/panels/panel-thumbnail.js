import { __ } from '@wordpress/i18n';
import { BorderControl, BorderResponsiveControl } from 'gutenverse-core/controls';
import { getDeviceType } from 'gutenverse-core/editor-helper';

export const thumbnailPanel = ({ elementId }) => {
    const device = getDeviceType();

    return [
        {
            id: 'thumbnailBorder',
            show: device === 'Desktop',
            label: __('Border', 'gutenverse'),
            component: BorderControl,
            liveStyle: [
                {
                    'type': 'border',
                    'id': 'thumbnailBorder',
                    'selector': `.${elementId} .gallery-items .gallery-item-wrap .thumbnail-wrap`,
                }
            ]
        },
        {
            id: 'thumbnailBorderResponsive',
            show: device !== 'Desktop',
            label: __('Border', 'gutenverse'),
            component: BorderResponsiveControl,
            allowDeviceControl: true,
            liveStyle: [
                {
                    'type': 'borderResponsive',
                    'id': 'thumbnailBorderResponsive',
                    'selector': `.${elementId} .gallery-items .gallery-item-wrap .thumbnail-wrap`,
                }
            ]
        },
    ];
};