import { applyFilters } from '@wordpress/hooks';
import { rgbToHex } from 'gutenverse-core/helper';

export const FluidCanvasEdit = ({ attributes }) => {
    return applyFilters(
        'gutenverse.fluid.canvas.edit',
        null,
        attributes
    );
};

export const getCanvasColor = (attributes) => {
    const { background } = attributes;
    const { animateColor1, animateColor2, animateColor3, animateColor4 } = background;

    let normalizeAnimateColor1 = '#a960ee';
    let normalizeAnimateColor2 = '#ff333d';
    let normalizeAnimateColor3 = '#90e0ff';
    let normalizeAnimateColor4 = '#ffcb57';

    if (undefined !== animateColor1 && '' !== animateColor1) normalizeAnimateColor1 = rgbToHex(animateColor1);
    if (undefined !== animateColor2 && '' !== animateColor2) normalizeAnimateColor2 = rgbToHex(animateColor2);
    if (undefined !== animateColor3 && '' !== animateColor3) normalizeAnimateColor3 = rgbToHex(animateColor3);
    if (undefined !== animateColor4 && '' !== animateColor4) normalizeAnimateColor4 = rgbToHex(animateColor4);

    return [
        normalizeAnimateColor1,
        normalizeAnimateColor2,
        normalizeAnimateColor3,
        normalizeAnimateColor4
    ];
};

export const FluidCanvasSave = ({ attributes }) => {
    const { background } = attributes;
    const { type: backgroundType } = background;
    const canvasColor = JSON.stringify(getCanvasColor(attributes));

    return backgroundType !== undefined && backgroundType === 'fluid' && <canvas className={'guten-fluid-background'} data-color={canvasColor} />;
};

