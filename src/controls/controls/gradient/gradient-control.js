import { useState, useEffect, useRef } from '@wordpress/element';
import { ChromePicker } from 'react-color';
import { GradientPicker } from 'react-linear-gradient-picker';
import ControlHeadingSimple from '../part/control-heading-simple';
import { useInstanceId } from '@wordpress/compose';
import u from 'umbrellajs';
import { compose } from '@wordpress/compose';
import { withParentControl } from 'gutenverse-core-editor/hoc';
import { withDeviceControl } from 'gutenverse-core-editor/hoc';

const ColorPicker = ({ onSelect, ...rest }) => {
    return <ChromePicker
        disableAlpha={false}
        color={rest.color}
        onChange={color => {
            const { r, g, b, a } = color.rgb;
            onSelect(`rgba(${r}, ${g}, ${b}, ${a})`, a);
        }}
        onChangeComplete={(color) => {
            const { r, g, b, a } = color.rgb;
            onSelect(`rgba(${r}, ${g}, ${b}, ${a})`, a);
        }}
    />;
};

const GradientControl = (props) => {
    const {
        label,
        allowDeviceControl,
        value = [
            { offset: '0.00', color: 'rgb(49, 207, 180)' },
            { offset: '1.00', color: 'rgb(126, 32, 207)' }
        ],
        onValueChange,
        onStyleChange,
        description = '',
        proLabel
    } = props;

    const wrapperRef = useRef();
    const [controlOpen, setControlOpen] = useState(false);

    const onChange = value => {
        onValueChange(value);
        onStyleChange(value);
    };

    useEffect(() => {
        u(`#${id} .csh .cs`).on('click', () => setControlOpen(true));
    }, [value]);

    useEffect(() => {
        function handleClickOutside(event) {
            if ((wrapperRef.current && !wrapperRef.current.contains(event.target))) {
                setControlOpen(false);
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [wrapperRef]);

    const id = useInstanceId(GradientControl, 'inspector-color-control');

    return <div id={id} className={'gutenverse-control-wrapper gutenverse-control-gradient'}>
        <ControlHeadingSimple
            id={`${id}-color`}
            label={label}
            allowDeviceControl={allowDeviceControl}
            description={description}
            proLabel={proLabel}
        />
        <div className={'control-body'} ref={wrapperRef}>
            <GradientPicker
                {...{
                    width: 205,
                    paletteHeight: 40,
                    palette: value,
                    onPaletteChange: onChange,
                    maxStops: 18,
                    stopRemovalDrop: 25
                }}
            >
                {controlOpen && <ColorPicker/>}
            </GradientPicker>
        </div>
    </div>;
};

export default compose(withParentControl, withDeviceControl)(GradientControl);