import { EscListener } from 'gutenverse-core/components';
import { IconCloseSVG } from 'gutenverse-core/icons';
import { useRef, useEffect, useState } from '@wordpress/element';
import apiFetch from '@wordpress/api-fetch';
import { Loader } from 'react-feather';

const PopupInstallPlugin = ({
    installPopup,
    setInstallPopup,
    description
}) => {
    const { imgDir } = window['GutenverseDashboard'];
    const { url = '' } = installPopup;
    const popupRef = useRef(null);
    const [loading, setLoading] = useState(false);
    const [buttonText, setButtonText] = useState('Activate Plugin');
    const [error, setError] = useState('');

    const installPlugin = () => {
        apiFetch({
            path: 'gvnews-client/v1/installAdditionalPlugin',
            method: 'POST',
            data: {
                url: url,
            },
        })
            .then((response) => {
                setButtonText('Plugin Activated')
                setTimeout(() => {
                    window.location.reload();
                }, 1000);
            })
            .catch((error) => {
                setError(error.message || 'Activate plugin failed');
            })
            .finally(() => {
                setLoading(false)
            });
    };



    const { active } = installPopup;

    const setInactive = () => {
        setInstallPopup({ active: false, url: '' })
    }

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (popupRef.current && !popupRef.current.contains(event.target)) {
                setInactive();
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [popupRef]);
    return active && (
        <>
            <EscListener execute={() => setInactive()} />
            <div className="popup-pro">
                <div className="popup-content" ref={popupRef}>
                    <img className="image popup-image-background" src={`${imgDir}/pop-up-bg-popup-banner.png`} />
                    <img className="image popup-image-mockup" src={`${imgDir}/pop-up-mockup-pro.png`} />
                    <img className="image popup-image-cube" src={`${imgDir}/pop-up-3d-cube-2.png`} />
                    <img className="image popup-image-element1" src={`${imgDir}/pop-up-icon-element.png`} />
                    <img className="image popup-image-element2" src={`${imgDir}/pop-up-icon-element-2.png`} />
                    <img className="image popup-image-element3" src={`${imgDir}/pop-up-icon-element-3.png`} />
                    <img className="image popup-image-arrow" src={`${imgDir}/banner-arrow-blue.png`} />
                    <div className="close" onClick={() => setInactive()}>
                        <IconCloseSVG size={20} />
                    </div>
                    <div className="content">
                        <h3 className="details">{description}</h3>
                        <button className="install-plguin" onClick={() => installPlugin()}>
                            {loading && <Loader size={15} />}
                            {!loading && buttonText}
                        </button>
                        {error.length > 0 && <p className="erorr-message">{error}</p>}
                    </div>
                </div>
            </div>
        </>
    );
};
export default PopupInstallPlugin;