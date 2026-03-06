import { ColorPicker, ColorService } from 'react-color-palette';
import isEmpty from 'lodash/isEmpty';

const safeToIColor = (val) => {
    if (!val || isEmpty(val)) {
        return ColorService.convert('hex', '#000000');
    }

    if (val.r !== undefined) {
        return ColorService.convert('rgb', { ...val, a: val.a ?? 1 });
    }

    if (typeof val === 'string') {
        return ColorService.convert('hex', val);
    }

    return ColorService.convert('hex', '#000000');
};

import { useState, useEffect } from '@wordpress/element';

const isSameColor = (a, b) => {
    if (!a || !b) return false;
    return a.rgb.r === b.rgb.r &&
           a.rgb.g === b.rgb.g &&
           a.rgb.b === b.rgb.b &&
           a.rgb.a === b.rgb.a;
};

const GutenverseColorPicker = ({ color, onChange, onChangeComplete, disableAlpha }) => {
    const [internalColor, setInternalColor] = useState(safeToIColor(color));

    useEffect(() => {
        const incoming = safeToIColor(color);
        setInternalColor(prev => isSameColor(incoming, prev) ? prev : incoming);
    }, [color]);

    const normalizeColor = (color) => {
        return {
            ...color,
            rgb: {
                r: Math.round(color.rgb.r),
                g: Math.round(color.rgb.g),
                b: Math.round(color.rgb.b),
                a: color.rgb.a
            }
        };
    };

    return (
        <ColorPicker
            hideAlpha={disableAlpha}
            color={internalColor}
            onChange={(newColor) => {
                setInternalColor(newColor);
                if (onChange) {
                    onChange(normalizeColor(newColor));
                }
            }}
            onChangeComplete={(newColor) => {
                if (onChangeComplete) {
                    onChangeComplete(normalizeColor(newColor));
                }
            }}
        />
    );
};

export default GutenverseColorPicker;
