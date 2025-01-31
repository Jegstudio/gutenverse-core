import { useEffect, useRef, useState } from '@wordpress/element';
import { useInstanceId } from '@wordpress/compose';
import classnames from 'classnames';
import { withParentControl } from 'gutenverse-core/hoc';
import { RefreshCw } from 'react-feather';
import { __ } from '@wordpress/i18n';
import ControlHeadingSimple from '../part/control-heading-simple';
import { Tooltip } from '@wordpress/components';
import { ColorControl } from 'gutenverse-core/controls';
import { RangeControl } from 'gutenverse-core/controls';
import { isEmptyValue } from 'gutenverse-core/editor-helper';
import { IconTypographySVG } from 'gutenverse-core/icons';

const TextShadowControl = ({
    label,
    allowDeviceControl,
    value = {},
    onValueChange,
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
            label={label}
            description={description}
            allowDeviceControl={allowDeviceControl}
            outLabel={<TextShadowToggle/>}
        />
        <div className={bodyClass} ref={wrapperRef}>
            <div className={'gutenverse-control-heading'}>
                <h2>
                    {__('Text Shadow', '--gctd--')}
                </h2>
                <Tooltip text={__('Refresh', '--gctd--')} key={'reset'}>
                    <span>
                        <RefreshCw onClick={() => {
                            onValueChange({});
                        }}/>
                    </span>
                </Tooltip>
            </div>
            <ColorControl
                label={__('Color', '--gctd--')}
                value={value.color}
                onValueChange={color => onValueChange({ ...value, color })}
            />
            <RangeControl
                label={__('Horizontal', '--gctd--')}
                min={-100}
                max={100}
                step={1}
                value={value.horizontal}
                unit="px"
                onValueChange={horizontal => onValueChange({ ...value, horizontal })}
            />
            <RangeControl
                label={__('Vertical', '--gctd--')}
                min={-100}
                max={100}
                step={1}
                value={value.vertical}
                unit="px"
                onValueChange={vertical => onValueChange({ ...value, vertical })}
            />
            <RangeControl
                label={__('Blur', '--gctd--')}
                min={0}
                max={100}
                step={1}
                value={value.blur}
                unit="%"
                onValueChange={blur => onValueChange({ ...value, blur })}
            />
        </div>
    </div>;
};

export default withParentControl(TextShadowControl);