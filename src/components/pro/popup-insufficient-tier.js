import { EscListener } from 'gutenverse-core/components';
import { IconCloseSVG } from 'gutenverse-core/icons';
import { useRef, useEffect } from '@wordpress/element';
import { __ } from '@wordpress/i18n';

const PopupInsufficientTier = ({
    active = false,
    setActive,
    description
}) => {
    const { imgDir, upgradeProUrl } = window['GutenverseDashboard'];
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
        <>
            <EscListener execute={() => setActive(false)} />
            <div className="popup-pro">
                <div className="popup-content" ref={popupRef}>
                    <img className="image popup-image-background" src={`${imgDir}/pop-up-bg-popup-banner.png`} />
                    <img className="image popup-image-mockup" src={`${imgDir}/pop-up-mockup-pro.png`} />
                    <img className="image popup-image-cube" src={`${imgDir}/pop-up-3d-cube-2.png`} />
                    <img className="image popup-image-element1" src={`${imgDir}/pop-up-icon-element.png`} />
                    <img className="image popup-image-element2" src={`${imgDir}/pop-up-icon-element-2.png`} />
                    <img className="image popup-image-element3" src={`${imgDir}/pop-up-icon-element-3.png`} />
                    <img className="image popup-image-arrow" src={`${imgDir}/banner-arrow-blue.png`} />
                    <div className="close" onClick={() => setActive(false)}>
                        <IconCloseSVG size={20} />
                    </div>
                    <div className="content">
                        <p className="sub-title">{__('UPGRADE REQUIRED', 'gutenverse')}</p>
                        <h3 className="details">{description}</h3>
                        <a
                            href={upgradeProUrl}
                            className="button-upgrade-plan left button-upgrade-plan-banner"
                            target="_blank"
                            rel="noreferrer">
                            <>
                                {__('Upgrade Plan Now', '--gctd--')}
                            </>
                        </a>
                    </div>
                </div>
            </div>
        </>
    );
};

export default PopupInsufficientTier;