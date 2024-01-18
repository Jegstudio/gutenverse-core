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
                <img className="image popup-image-background" src={`${imgDir}/banner/pop-up/bg-popup-banner.png`} />
                <img className="image popup-image-mockup" src={`${imgDir}/banner/pop-up/mockup-pro.png`} />
                <img className="image popup-image-cube" src={`${imgDir}/banner/pop-up/3d-cube-2.png`} />
                <img className="image popup-image-element1" src={`${imgDir}/banner/pop-up/icon-element.png`} />
                <img className="image popup-image-element2" src={`${imgDir}/banner/pop-up/icon-element-2.png`} />
                <img className="image popup-image-element3" src={`${imgDir}/banner/pop-up/icon-element-3.png`} />
                <img className="image popup-image-arrow" src={`${imgDir}/banner/arrow-blue.png`} />
                <div className="close" onClick={() => setActive(false)}>
                    <IconCloseSVG size={20}/>
                </div>
                <div className="content">
                    <h3 className="details">{description}</h3>
                    <ButtonUpgradePro isBanner={true} customStyles={{height: '16px', padding: '12px 25px 12px 30px'}}/>
                </div>
            </div>
        </div>
    );
};

export default PopupPro;