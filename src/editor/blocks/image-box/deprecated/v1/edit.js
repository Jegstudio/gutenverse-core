import { imagePlaceholder } from 'gutenverse-core/config';
import { isEmpty } from 'lodash';

export const ImageBoxFigure = attributes => {
    const { image, imageAlt } = attributes;
    const { media = {}, size } = image || {};
    const { imageId, sizes = {} } = media || {};

    const imageAltText = imageAlt || null;

    // Handle if empty, pick the 'full' size. If 'full' size also not exist, return placeholder image.

    if (isEmpty(sizes)) {
        return <img className="gutenverse-image-box-empty" src={imagePlaceholder} alt={imageAltText} />;
    }

    let imageSrc = sizes[size];

    if (isEmpty(imageSrc)) {
        if (isEmpty(sizes['full'])) {
            return <img className="gutenverse-image-box-empty" src={imagePlaceholder} alt={imageAltText} />;
        }

        imageSrc = sizes['full'];
    }

    if (imageId && imageSrc) {
        return <img className="gutenverse-image-box-filled" src={imageSrc.url} height={imageSrc.height} width={imageSrc.width} alt={imageAltText} />;
    }

    return <img className="gutenverse-image-box-empty" src={imagePlaceholder} alt={imageAltText} />;
};