import { useState, useEffect, useRef } from '@wordpress/element';
import { ChromePicker } from 'react-color';
import { GradientPicker } from 'react-linear-gradient-picker';
import ControlHeadingSimple from '../part/control-heading-simple';
import { useInstanceId } from '@wordpress/compose';
import { compose } from '@wordpress/compose';
import { withParentControl } from 'gutenverse-core/hoc';
import { withDeviceControl } from 'gutenverse-core/hoc';
import { RangeControl } from 'gutenverse-core/controls';
import { __ } from '@wordpress/i18n';

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
        description = '',
        proLabel,
        useLocation = true,
    } = props;

    const wrapperRef = useRef();
    const [controlOpen, setControlOpen] = useState(false);
    const [location, setLocation] = useState(0);
    const [activeIndex, setActiveIndex] = useState(-1);
    let newValue = value;

    const onChange = value => {
        onValueChange(value);
    };

    useEffect(() => {
        wrapperRef?.current?.querySelector([ '.csh', '.cs']).addEventListener('click', () => {
            setControlOpen(true);
            const divs = document.querySelectorAll('.cs');
            divs.forEach((div, index) => {
                if (div.classList.contains('active')) {
                    setActiveIndex(index);
                    setLocation(value[index].offset * 100);
                }
            });
        });
    }, [value]);

    useEffect(() => {
        newValue[activeIndex] = {...newValue[activeIndex], offset: `${location/100}`};
        onChange(newValue);
    },[location, activeIndex]);

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
                    palette: newValue,
                    onPaletteChange: onChange,
                    maxStops: 18,
                    stopRemovalDrop: 25
                }}
            >
                {controlOpen && <ColorPicker/>}
            </GradientPicker>
            {controlOpen && useLocation && <RangeControl
                label={__('Location', '--gctd--')}
                min={0}
                max={100}
                step={0.1}
                unit="%"
                value={location}
                onValueChange={(value) => setLocation(parseFloat(value))}
                onStyleChange={() => { }}
            />}
        </div>
    </div>;
};

export default compose(withParentControl, withDeviceControl)(GradientControl);