import { isNotEmpty } from 'gutenverse-core/helper';

const panelThumbnailStyle = (elementId, attributes, data) => {
    isNotEmpty(attributes['thumbnailBorder']) && data.push({
        'type': 'border',
        'id': 'thumbnailBorder',
        'selector': `.${elementId} .gallery-items .gallery-item-wrap .thumbnail-wrap`,
    });

    isNotEmpty(attributes['thumbnailBorderResponsive']) && data.push({
        'type': 'borderResponsive',
        'id': 'thumbnailBorderResponsive',
        'selector': `.${elementId} .gallery-items .gallery-item-wrap .thumbnail-wrap`,
    });

    return data;
};

export default panelThumbnailStyle;