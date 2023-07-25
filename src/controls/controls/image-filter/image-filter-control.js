import { useEffect, useRef, useState } from '@wordpress/element';
import { useInstanceId } from '@wordpress/compose';
import classnames from 'classnames';
import { withParentControl } from 'gutenverse-core/hoc';
import { RefreshCw } from 'react-feather';
import { __ } from '@wordpress/i18n';
import ControlHeadingSimple from '../part/control-heading-simple';
import { Tooltip } from '@wordpress/components';
import {RangeControl} from 'gutenverse-core/controls';
import { isEmptyValue } from 'gutenverse-core/editor-helper';
import { IconTypographySVG } from 'gutenverse-core/icons';

const ImageFilterControl = ({
    label,
    allowDeviceControl,
    value = {},
    onValueChange,
    onStyleChange,
    description = '',
}) => {
    const [show, setShow] = useState(false);
    const id = useInstanceId(ImageFilterControl, 'inspector-image-filter-control');
    const wrapperRef = useRef(null);

    useEffect(() => {
        function handleClickOutside(event) {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
                setShow(false);
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [wrapperRef]);

    const toggleShow = () => {
        setShow(display => !display);
    };

    const bodyClass = classnames('control-body', 'control-toggle-body', 'triangle', {
        'hide': !show
    });

    const toggleClass = classnames('image-filter-icon', {
        'active': show,
        'not-empty': !isEmptyValue(value)
    });

    const ImageFilterToggle = () => {
        return <div className={toggleClass} onClick={() => toggleShow()}>
            <IconTypographySVG />
        </div>;
    };

    return <div id={id} className={'gutenverse-control-wrapper gutenverse-control-image-filter'}>
        <ControlHeadingSimple
            id={`${id}-image-filter`}
            label={label}
            description={description}
            allowDeviceControl={allowDeviceControl}
            outLabel={<ImageFilterToggle/>}
        />
        <div className={bodyClass} ref={wrapperRef}>
            <div className={'gutenverse-control-heading'}>
                <h2>
                    {__('Image Filter', '--gctd--')}
                </h2>
                <Tooltip text={__('Refresh', '--gctd--')} key={'reset'}>
                    <span>
                        <RefreshCw onClick={() => {
                            onValueChange({});
                            onStyleChange({});
                        }}/>
                    </span>
                </Tooltip>
            </div>
            <RangeControl
                label={__('Blur', '--gctd--')}
                min={0}
                max={10}
                step={0.1}
                value={value.blur}
                onValueChange={blur => onValueChange({ ...value, blur })}
                onStyleChange={blur => onStyleChange({ ...value, blur })}
            />
            <RangeControl
                label={__('Brightness', '--gctd--')}
                min={0}
                max={200}
                step={1}
                value={value.brightness}
                onValueChange={brightness => onValueChange({ ...value, brightness })}
                onStyleChange={brightness => onStyleChange({ ...value, brightness })}
            />
            <RangeControl
                label={__('Contrast', '--gctd--')}
                min={0}
                max={200}
                step={1}
                value={value.contrast}
                onValueChange={contrast => onValueChange({ ...value, contrast })}
                onStyleChange={contrast => onStyleChange({ ...value, contrast })}
            />
            <RangeControl
                label={__('Saturation', '--gctd--')}
                min={0}
                max={200}
                step={1}
                value={value.saturation}
                onValueChange={saturation => onValueChange({ ...value, saturation })}
                onStyleChange={saturation => onStyleChange({ ...value, saturation })}
            />
            <RangeControl
                label={__('Hue', '--gctd--')}
                min={0}
                max={360}
                step={1}
                value={value.hue}
                onValueChange={hue => onValueChange({ ...value, hue })}
                onStyleChange={hue => onStyleChange({ ...value, hue })}
            />
        </div>
    </div>;
};

export default withParentControl(ImageFilterControl);