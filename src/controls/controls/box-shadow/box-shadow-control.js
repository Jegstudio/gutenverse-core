import { useEffect, useRef, useState } from '@wordpress/element';
import { useInstanceId } from '@wordpress/compose';
import classnames from 'classnames';
import { withParentControl } from 'gutenverse-core/hoc';
import { RefreshCw } from 'react-feather';
import { __ } from '@wordpress/i18n';
import ControlHeadingSimple from '../part/control-heading-simple';
import { Tooltip } from '@wordpress/components';
import { ColorControl, RangeControl, SelectControl } from 'gutenverse-core/controls';
import { isEmptyValue } from 'gutenverse-core/editor-helper';
import { IconTypographySVG } from 'gutenverse-core/icons';

const BoxShadowControl = ({
    label,
    allowDeviceControl,
    value = {},
    onValueChange,
    onStyleChange,
    description = '',
}) => {
    const [show, setShow] = useState(false);
    const id = useInstanceId(BoxShadowControl, 'inspector-box-shadow-control');
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

    const toggleClass = classnames('box-shadow-icon', {
        'active': show,
        'not-empty': !isEmptyValue(value)
    });

    const BoxShadowToggle = () => {
        return <div className={toggleClass} onClick={() => toggleShow()}>
            <IconTypographySVG/>
        </div>;
    };

    return <div id={id} className={'gutenverse-control-wrapper gutenverse-control-box-shadow'}>
        <ControlHeadingSimple
            label={label}
            description={description}
            allowDeviceControl={allowDeviceControl}
            outLabel={<BoxShadowToggle/>}
        />
        <div className={bodyClass} ref={wrapperRef}>
            <div className={'gutenverse-control-heading'}>
                <h2>
                    {__('Box Shadow', '--gctd--')}
                </h2>
                <Tooltip text={__('Refresh', '--gctd--')} key={'reset'}>
                    <span>
                        <RefreshCw onClick={() => {
                            onValueChange(undefined);
                            onStyleChange(undefined);
                        }}/>
                    </span>
                </Tooltip>
            </div>
            <ColorControl
                label={__('Color', '--gctd--')}
                value={value.color}
                onValueChange={color => onValueChange({ ...value, color })}
                onStyleChange={color => onStyleChange({ ...value, color })}
            />
            <RangeControl
                label={__('Horizontal', '--gctd--')}
                min={-100}
                max={100}
                step={1}
                value={value.horizontal}
                onValueChange={horizontal => onValueChange({ ...value, horizontal })}
                onStyleChange={horizontal => onStyleChange({ ...value, horizontal })}
            />
            <RangeControl
                label={__('Vertical', '--gctd--')}
                min={-100}
                max={100}
                step={1}
                value={value.vertical}
                onValueChange={vertical => onValueChange({ ...value, vertical })}
                onStyleChange={vertical => onStyleChange({ ...value, vertical })}
            />
            <RangeControl
                label={__('Blur', '--gctd--')}
                min={0}
                max={100}
                step={1}
                value={value.blur}
                onValueChange={blur => onValueChange({ ...value, blur })}
                onStyleChange={blur => onStyleChange({ ...value, blur })}
            />
            <RangeControl
                label={__('Spread', '--gctd--')}
                min={-100}
                max={100}
                step={1}
                value={value.spread}
                onValueChange={spread => onValueChange({ ...value, spread })}
                onStyleChange={spread => onStyleChange({ ...value, spread })}
            />
            <SelectControl
                label={__('Position', '--gctd--')}
                value={value.position}
                onValueChange={position => onValueChange({ ...value, position })}
                onStyleChange={position => onStyleChange({ ...value, position })}
                options={[
                    {
                        label: __('Outset', '--gctd--'),
                        value: 'outline'
                    },
                    {
                        label: __('Inset', '--gctd--'),
                        value: 'inset'
                    }
                ]}
            />
        </div>
    </div>;
};

export default withParentControl(BoxShadowControl);