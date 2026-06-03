import { EscListener } from 'gutenverse-core/components';
import { useRef, useEffect, useState } from '@wordpress/element';
import apiFetch from '@wordpress/api-fetch';
import { compose } from '@wordpress/compose';
import { withSelect } from '@wordpress/data';
import { applyFilters } from '@wordpress/hooks';
import { InstallContent, LicenseExpired, UpgradePro, UpgradeTier } from './essential-install/popup-content';

const PopupInstallPlugin = ({
    installPopup,
    setInstallPopup,
    plugins,
}) => {
    const { url = '', active } = installPopup;
    const popupRef = useRef(null);
    const [loading, setLoading] = useState(false);
    const isInstalled = plugins?.installedPlugin?.['gutenverse-news-essential'] || false;
    const [buttonText, setButtonText] = useState(isInstalled ? 'Activate Plugin' : 'Get Plugin');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        setButtonText(isInstalled ? 'Activate Plugin' : 'Get Plugin');
    }, [isInstalled]);

    const setInactive = () => setInstallPopup({ active: false, url: '' });

    const actionButton = () => {
        if (!isInstalled) {
            window.open(url, '_blank');
            return;
        }

        setLoading(true);

        apiFetch({
            path: `wp/v2/plugins/plugin?plugin=${isInstalled?.path}`,
            method: 'POST',
            data: { status: 'active' },
        }).then(() => {
            setSuccess(true);
            setTimeout(() => window.location.reload(), 1000);
        }).catch((err) => {
            setButtonText('Try Again');
            setError(err.message || 'Activate plugin failed');
        }).finally(() => {
            setLoading(false);
        });
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (popupRef.current && !popupRef.current.contains(event.target)) {
                setInactive();
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return active && (
        <>
            <EscListener execute={setInactive} />
            <div className="popup-pro install-plugin">
                <PopupContent
                    loading={loading}
                    actionButton={actionButton}
                    success={success}
                    buttonText={buttonText}
                    error={error}
                    popupRef={popupRef}
                    setInactive={setInactive}
                />
            </div>
        </>
    );
};

export const PopupContent = ({ loading, actionButton, success, buttonText, error, setInactive, popupRef }) => {
    return applyFilters(
        'gvnews.banner.installEssential',
        <UpgradePro setInactive={setInactive} popupRef={popupRef} />,
        <LicenseExpired setInactive={setInactive} popupRef={popupRef} />,
        <InstallContent
            loading={loading}
            actionButton={actionButton}
            success={success}
            buttonText={buttonText}
            error={error}
            popupRef={popupRef}
            setInactive={setInactive}
        />,
        <UpgradeTier setInactive={setInactive} popupRef={popupRef} />,
        ['professional', 'agency', 'enterprise'],
        { setInactive, popupRef }
    );
};

export default compose(
    withSelect(select => ({
        plugins: select('gutenverse/library').getPluginData(),
    })),
)(PopupInstallPlugin);
