import { useEffect, useRef } from '@wordpress/element';
import { getDeviceType } from 'gutenverse-core/editor-helper';
import { rgbToHex } from 'gutenverse-core/helper';
import Gradient from 'gutenverse-fluid-background';

export const FluidCanvasEdit = ({ attributes }) => {
    const { background } = attributes;
    const { type: backgroundType, animateColor1, animateColor2, animateColor3, animateColor4 } = background;
    const canvasRef = useRef();
    const deviceType = getDeviceType();

    useEffect(() => {
        if (backgroundType !== undefined && backgroundType === 'fluid') {
            const { current } = canvasRef;

            if (current !== undefined) {
                let normalizeAnimateColor1 = '#a960ee';
                let normalizeAnimateColor2 = '#ff333d';
                let normalizeAnimateColor3 = '#90e0ff';
                let normalizeAnimateColor4 = '#ffcb57';

                if (undefined !== animateColor1 && '' !== animateColor1) normalizeAnimateColor1 = rgbToHex(animateColor1);
                if (undefined !== animateColor2 && '' !== animateColor2) normalizeAnimateColor2 = rgbToHex(animateColor2);
                if (undefined !== animateColor3 && '' !== animateColor3) normalizeAnimateColor3 = rgbToHex(animateColor3);
                if (undefined !== animateColor4 && '' !== animateColor4) normalizeAnimateColor4 = rgbToHex(animateColor4);

                new Gradient({
                    canvas: current,
                    colors: [
                        normalizeAnimateColor1,
                        normalizeAnimateColor2,
                        normalizeAnimateColor3,
                        normalizeAnimateColor4
                    ]
                });
            }
        }
    }, [canvasRef, deviceType, backgroundType, animateColor1, animateColor2, animateColor3, animateColor4]);

    return backgroundType !== undefined && backgroundType === 'fluid' && <canvas className={'guten-fluid-background'} ref={canvasRef} />;
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

