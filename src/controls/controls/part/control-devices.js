import { useEffect, useRef, useState } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { useDispatch } from '@wordpress/data';
import { isFSE, setDeviceType } from 'gutenverse-core/helper';
import { getDeviceType } from 'gutenverse-core/editor-helper';
import { IconDeviceDesktopSVG, IconDeviceTabletSVG, IconDeviceMobileSVG } from 'gutenverse-core/icons';

const ControlDevices = () => {
    const wrapperRef = useRef(null);
    const deviceType = getDeviceType();
    const editorDispatch = isFSE() ? useDispatch('core/edit-site') : useDispatch('core/edit-post');

    const changeDevice = (device) => {
        setDeviceType(device, editorDispatch);
        setOpen(false);
    };

    const toggleOpen = () => {
        setOpen(open => !open);
    };

    useEffect(() => {
        function handleClickOutside(event) {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
                setOpen(false);
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [wrapperRef]);

    const [open, setOpen] = useState(false);

    return <div className={'control-heading-devices'} ref={wrapperRef}>
        <div className={'active-device'} onClick={() => toggleOpen()}>
            {deviceType === 'Desktop' && <IconDeviceDesktopSVG />}
            {deviceType === 'Tablet' && <IconDeviceTabletSVG />}
            {deviceType === 'Mobile' && <IconDeviceMobileSVG />}
        </div>
        {open && <ul className={'triangle'}>
            <li className={deviceType === 'Desktop' ? 'active' : ''} onClick={() => changeDevice('Desktop')}>
                <span><IconDeviceDesktopSVG /></span>
                <span>{__('Desktop', 'gutenverse')}</span>
            </li>
            <li className={deviceType === 'Tablet' ? 'active' : ''} onClick={() => changeDevice('Tablet')}>
                <span><IconDeviceTabletSVG /></span>
                <span>{__('Tablet', 'gutenverse')}</span>
            </li>
            <li className={deviceType === 'Mobile' ? 'active' : ''} onClick={() => changeDevice('Mobile')}>
                <span><IconDeviceMobileSVG /></span>
                <span>{__('Phone', 'gutenverse')}</span>
            </li>
        </ul>}
    </div>;
};

export default ControlDevices;