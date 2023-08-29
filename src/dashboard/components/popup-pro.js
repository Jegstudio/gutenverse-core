import { ButtonUpgradePro } from 'gutenverse-core/components';
import { IconCloseSVG } from 'gutenverse-core/icons';
import { useRef, useEffect } from '@wordpress/element';

const PopupPro = ({
    active = false,
    setActive,
    description
}) => {
    const { imgDir } = window['GutenverseDashboard'];
    const popupRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (popupRef.current && !popupRef.current.contains(event.target)) {
                setActive(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [popupRef]);

    return active && (
        <div className="popup-pro">
            <div className="popup-content" ref={popupRef}>
                <div className="close" onClick={() => setActive(false)}>
                    <IconCloseSVG/>
                </div>
                <img className="grid" src={`${imgDir}/pro/popup-grid.png`} />
                <img className="graphic" src={`${imgDir}/pro/popup-graphic-pro.png`} />
                <div className="content">
                    <h3 className="details">{description}</h3>
                    <ButtonUpgradePro />
                </div>
            </div>
        </div>
    );
};

export default PopupPro;