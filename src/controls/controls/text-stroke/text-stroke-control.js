
import { useEffect, useRef, useState } from '@wordpress/element';
import { useInstanceId } from '@wordpress/compose';
import classnames from 'classnames';
import { withParentControl } from 'gutenverse-core/hoc';
import { RefreshCw } from 'react-feather';
import { __ } from '@wordpress/i18n';
import ControlHeadingSimple from '../part/control-heading-simple';
import { Tooltip } from '@wordpress/components';
import { ColorControl, SizeControl } from 'gutenverse-core/controls';
import { isEmptyValue } from 'gutenverse-core/editor-helper';
import { IconTypographySVG } from 'gutenverse-core/icons';

const TextStrokeControl = ({
    label,
    allowDeviceControl,
    value = {},
    onValueChange,
    onStyleChange,
    description = '',
}) => {
    const [show, setShow] = useState(false);
    const id = useInstanceId(TextStrokeControl, 'inspector-text-stroke-control');
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

    const bodyClass = classnames('control-body', 'control-toggle-body', 'guten-triangle', {
        'hide': !show
    });

    const toggleClass = classnames('text-stroke-icon', {
        'active': show,
        'not-empty': !isEmptyValue(value)
    });

    const TextShadowToggle = () => {
        return <div className={toggleClass} onClick={() => toggleShow()}>
            <IconTypographySVG/>
        </div>;
    };

    return <div id={id} className={'gutenverse-control-wrapper gutenverse-control-text-stroke'}>
        <ControlHeadingSimple
            label={label}
            description={description}
            allowDeviceControl={allowDeviceControl}
            outLabel={<TextShadowToggle/>}
        />
        <div className={bodyClass} ref={wrapperRef}>
            <div className={'gutenverse-control-heading'}>
                <h2>
                    {__('Text Stroke', '--gctd--')}
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
            <ColorControl
                label={__('Stroke Color', '--gctd--')}
                value={value.color}
                onValueChange={color => onValueChange({ ...value, color })}
                onStyleChange={color => onStyleChange({ ...value, color })}
            />
            <SizeControl
                label={__('Stroke Width', '--gctd--')}
                value={value.width}
                onValueChange={width => onValueChange({ ...value, width })}
                onStyleChange={width => onStyleChange({ ...value, width })}
                units={{
                    px: {
                        text: 'px',
                        min: 1,
                        max: 10,
                        step: 1,
                        unit: 'px',
                    },
                    em: {
                        text: 'em',
                        min: 0.1,
                        max: 10,
                        step: 0.1,
                        unit: 'em',
                    },
                    ['%']: {
                        text: '%',
                        min: 1,
                        max: 100,
                        step: 1,
                        unit: '%',
                    }
                }}
            />
        </div>
    </div>;
};

export default withParentControl(TextStrokeControl);