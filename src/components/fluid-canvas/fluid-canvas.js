import { applyFilters } from '@wordpress/hooks';

export const FluidCanvasEdit = ({ attributes }) => {
    return applyFilters(
        'gutenverse.fluid.canvas.edit',
        null,
        attributes
    );
};

export const FluidCanvasSave = ({ attributes }) => {
    return applyFilters(
        'gutenverse.fluid.canvas.save',
        null,
        attributes
    );
};

