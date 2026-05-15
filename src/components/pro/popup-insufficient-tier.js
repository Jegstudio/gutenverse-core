import { EscListener } from 'gutenverse-core/components';
import { IconCloseSVG } from 'gutenverse-core/icons';
import { useRef, useEffect } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { getUpgradeProps } from '../../helper/freemius';
import apiFetch from '@wordpress/api-fetch';

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

    const buildUpgradeLoginUrl = (licenseId) => {
        const {
            proSiteUrl = '',
        } = getUpgradeRuntime();
        const proBaseUrl = normalizeBaseUrl((() => {
            try {
                return new URL(proSiteUrl || '').origin;
            } catch (e) {
                return '';
            }
        })());

        if (!proBaseUrl || !licenseId) {
            return '';
        }

        const upgradeUrl = `${proBaseUrl}/account/license/upgrade/${licenseId}`;
        return `${proBaseUrl}/login?redirect_to=${encodeURIComponent(upgradeUrl)}`;
    };

    const getUpgradeRuntime = () => window['GutenverseConfig'] || window['GutenverseDashboard'] || {};

    const normalizeBaseUrl = (url = '') => `${url}`.replace(/\/+$/, '');

    const fetchUpgradeLicenseId = () => {
        const { licenseKey, domain } = getLicenseVerifyRequestData();

        if (!licenseKey) {
            throw new Error(__('Active license key is not available on this site.', 'gutenverse-pro'));
        }

        return apiFetch({
            path: 'gutenverse-client/v1/license/verify-key',
            method: 'GET',
        }).then((data) => {
            const licenseId = `${data?.license_id || ''}`.trim();

            if (!licenseId) {
                throw new Error(data?.message || __('Unable to find the upgrade license for this site.', 'gutenverse-pro'));
            }

            return licenseId;
        });
    };


    const getLicenseVerifyRequestData = () => {
        const {
            license = '',
            domainURL = '',
        } = getUpgradeRuntime();

        return {
            licenseKey: `${license}`.trim(),
            domain: `${domainURL}`.trim() || window.location.origin,
        };
    };

    const handleUpgradeLicenseClick = (event) => {
        event?.preventDefault?.();

        const popupWidth = 960;
        const popupHeight = 720;
        const popupLeft = 0;
        const popupTop = 0;
        const popupFeatures = [
            `width=${popupWidth}`,
            `height=${popupHeight}`,
            `left=${popupLeft}`,
            `top=${popupTop}`,
            'resizable=yes',
            'scrollbars=yes',
        ].join(',');
        const upgradeWindow = window.open('', 'gutenverse-upgrade-license', popupFeatures);

        fetchUpgradeLicenseId()
            .then((licenseId) => {
                const targetUrl = buildUpgradeLoginUrl(licenseId);

                if (!targetUrl) {
                    throw new Error(__('Upgrade server URL is not configured.', 'gutenverse-pro'));
                }

                if (upgradeWindow) {
                    upgradeWindow.location.href = targetUrl;
                    upgradeWindow.focus?.();
                    return;
                }

                window.open(targetUrl, 'gutenverse-upgrade-license', popupFeatures);
            })
            .catch((error) => {
                if (upgradeWindow && !upgradeWindow.closed) {
                    upgradeWindow.close();
                }

                window.alert(error?.message || __('Unable to open the upgrade page.', 'gutenverse-pro'));
            });
    };
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
                            onClick={handleUpgradeLicenseClick}
                            className="button-upgrade-plan left button-upgrade-plan-banner">
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
