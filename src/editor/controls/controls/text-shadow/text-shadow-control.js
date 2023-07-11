import { useEffect, useRef, useState } from '@wordpress/element';
import { useInstanceId } from '@wordpress/compose';
import classnames from 'classnames';
import { withParentControl } from 'gutenverse-core-editor/hoc';
import { RefreshCw } from 'react-feather';
import { __ } from '@wordpress/i18n';
import ControlHeadingSimple from '../part/control-heading-simple';
import { Tooltip } from '@wordpress/components';
import { ColorControl } from 'gutenverse-core-editor/controls';
import { RangeControl } from 'gutenverse-core-editor/controls';
import { isEmptyValue } from 'gutenverse-core-editor/helper';
import { IconTypographySVG } from 'gutenverse-core-editor/icons';

const TextShadowControl = ({
    label,
    allowDeviceControl,
    value = {},
    onValueChange,
    onStyleChange,
    description = '',
}) => {
    const [show, setShow] = useState(false);
    const id = useInstanceId(TextShadowControl, 'inspector-text-shadow-control');
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

    const toggleClass = classnames('text-shadow-icon', {
        'active': show,
        'not-empty': !isEmptyValue(value)
    });

    const TextShadowToggle = () => {
        return <div className={toggleClass} onClick={() => toggleShow()}>
            <IconTypographySVG/>
        </div>;
    };

    return <div id={id} className={'gutenverse-control-wrapper gutenverse-control-text-shadow'}>
        <ControlHeadingSimple
            id={`${id}-text-shadow`}
            label={label}
            description={description}
            allowDeviceControl={allowDeviceControl}
            outLabel={<TextShadowToggle/>}
        />
        <div className={bodyClass} ref={wrapperRef}>
            <div className={'gutenverse-control-heading'}>
                <h2>
                    {__('Text Shadow', 'gutenverse')}
                </h2>
                <Tooltip text={__('Refresh', 'gutenverse')} key={'reset'}>
                    <span>
                        <RefreshCw onClick={() => {
                            onValueChange({});
                            onStyleChange({});
                        }}/>
                    </span>
                </Tooltip>
            </div>
            <ColorControl
                label={__('Color', 'gutenverse')}
                value={value.color}
                onValueChange={color => onValueChange({ ...value, color })}
                onStyleChange={color => onStyleChange({ ...value, color })}
            />
            <RangeControl
                label={__('Horizontal', 'gutenverse')}
                min={-100}
                max={100}
                step={1}
                value={value.horizontal}
                onValueChange={horizontal => onValueChange({ ...value, horizontal })}
                onStyleChange={horizontal => onStyleChange({ ...value, horizontal })}
            />
            <RangeControl
                label={__('Vertical', 'gutenverse')}
                min={-100}
                max={100}
                step={1}
                value={value.vertical}
                onValueChange={vertical => onValueChange({ ...value, vertical })}
                onStyleChange={vertical => onStyleChange({ ...value, vertical })}
            />
            <RangeControl
                label={__('Blur', 'gutenverse')}
                min={0}
                max={100}
                step={1}
                value={value.blur}
                onValueChange={blur => onValueChange({ ...value, blur })}
                onStyleChange={blur => onStyleChange({ ...value, blur })}
            />
            <RangeControl
                label={__('Spread', 'gutenverse')}
                min={-100}
                max={100}
                step={1}
                value={value.spread}
                onValueChange={spread => onValueChange({ ...value, spread })}
                onStyleChange={spread => onStyleChange({ ...value, spread })}
            />
        </div>
    </div>;
};

export default withParentControl(TextShadowControl);