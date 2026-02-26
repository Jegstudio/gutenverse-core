import { EscListener } from 'gutenverse-core/components';
import { useRef, useEffect, useState } from '@wordpress/element';
import apiFetch from '@wordpress/api-fetch';
import { Loader } from 'react-feather';
import { __ } from '@wordpress/i18n';

const PopupInstallPlugin = ({
    installPopup,
    setInstallPopup,
}) => {
    const { imgDir } = window['GutenverseDashboard'];
    const { url = '' } = installPopup;
    const popupRef = useRef(null);
    const [loading, setLoading] = useState(false);
    const [buttonText, setButtonText] = useState('Install & Activate Plugin');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    const installPlugin = () => {
        if (success) {
            window.location.reload();
        }
        setLoading(true);
        apiFetch({
            path: 'gvnews-client/v1/installAdditionalPlugin',
            method: 'POST',
            data: {
                url: url,
            },
        })
            .then((response) => {
                setSuccess(true);
                setTimeout(() => {
                    window.location.reload();
                }, 1000);
            })
            .catch((error) => {
                setButtonText('Try Again')
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
            <div className="popup-pro install-plugin">
                <div className="popup-content" ref={popupRef}>
                    <div className="close" onClick={() => setInactive()}>
                        <CloseIcon />
                    </div>
                    <div className="content">
                        <img className="image-banner" src={`${imgDir}/pro/news/install-gvnews-essential-banner.png`} />
                        <h3 className="heading">{__('Install Gutenverse News Essentials', '--gctd--')}</h3>
                        <p className="desc">{__('You need to Install and Activate plugin Gutenverse News Essentials to unlock this feature.', '--gctd--')}</p>
                        <button className={`install-plguin${loading ? ' loading' : ''}`} onClick={() => installPlugin()}>
                            {loading && <Loader size={15} />}
                            {!loading && !success && buttonText}
                            {success && <SuccessIcon />}
                        </button>
                        {error.length > 0 && <p className="erorr-message">{error}</p>}
                    </div>
                </div>
            </div>
        </>
    );
};

const CloseIcon = () => {
    return <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 10 10" fill="none">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M4.99943 5.8119L9.18686 10L10 9.1881L5.81142 5L10 0.813046L9.18801 0L4.99943 4.1881L0.81199 0L0 0.813046L4.18744 5L0 9.18695L0.81199 10L4.99943 5.8119Z" fill="#99A2A9" />
    </svg>
}

const SuccessIcon = () => {
    return <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
        <g clip-path="url(#clip0_23648_18309)">
            <path d="M5.40439 13.2311L0.0539856 7.37931L1.58236 5.70772L5.40547 9.88552L5.40439 9.8867L14.5757 -0.144043L16.1041 1.52755L6.93277 11.5595L5.40547 13.2299L5.40439 13.2311Z" fill="white" />
        </g>
        <defs>
            <clipPath id="clip0_23648_18309">
                <rect width="16" height="16" rx="8" fill="white" />
            </clipPath>
        </defs>
    </svg>
}
export default PopupInstallPlugin;