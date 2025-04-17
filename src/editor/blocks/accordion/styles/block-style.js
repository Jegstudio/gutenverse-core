import { applyFilters } from '@wordpress/hooks';

const getBlockStyle = (elementId, attributes) => {
    let data = [];

    return [
        ...data,
        ...applyFilters(
            'gutenverse.accordion.blockStyle',
            [],
            {
                elementId,
                attributes
            }
        )
    ];
};


export default getBlockStyle;