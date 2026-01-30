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

const GutenverseColorPicker = ({ color, onChange, onChangeComplete, disableAlpha }) => {
    return (
        <ColorPicker
            hideAlpha={disableAlpha}
            color={safeToIColor(color)}
            onChange={(newColor) => {
                if (onChange) {
                    onChange(newColor);
                }
            }}
            onChangeComplete={(newColor) => {
                if (onChangeComplete) {
                    onChangeComplete(newColor);
                }
            }}
        />
    );
};

export default GutenverseColorPicker;
