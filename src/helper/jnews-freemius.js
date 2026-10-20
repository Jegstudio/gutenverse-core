import { render } from '@wordpress/element';
import { JNewsPopupPricingPlan } from '../components';
import { ensurePricingPlanData } from './jnews-pricing-plan';

const JNEWS_MODAL_ID = 'jnews-blocks-freemius-modal';
const JNEWS_CONTENT_ID = 'jnews-blocks-freemius-modal-content';
const JNEWS_BODY_CLASS = 'jnews-blocks-freemius-modal-open';
const JNEWS_UPGRADE_ROUTE_PATH = 'upgrade-pro';
const JNEWS_CLOSE_REQUEST_EVENT = 'jnews-blocks:pricing-popup-close-request';
const JNEWS_FREEMIUS_MENU_SELECTOR = [
    'a[href*="page=jnews-blocks&path=upgrade-pro"]',
].join(', ');

const getGutenverseRuntime = () => window['GutenverseConfig'] || window['GutenverseDashboard'] || window['GutenverseData'] || {};

const getFreemiusSettings = () => {
    const { freemius = {}, upgradeProUrl } = getGutenverseRuntime();

    return {
        ...freemius,
        pricingUrl: freemius?.pricingUrl || upgradeProUrl,
    };
};

const getFreemiusCampaign = () => {
    const runtime = getGutenverseRuntime();
    const { jnewsBlocksPricingPlan: pricingPlan = {}, jnewsBlocksEventBanner: eventBanner = {} } = runtime;
    const activePromotion = pricingPlan?.active_promotion?.[0] || {};

    return pricingPlan?.event_name
        || pricingPlan?.event_title
        || pricingPlan?.eventTitle
        || pricingPlan?.campaign
        || activePromotion?.event_title
        || activePromotion?.campaign
        || activePromotion?.label
        || activePromotion?.name
        || eventBanner?.title
        || eventBanner?.event_title
        || 'freemius-checkout';
};

const getUpgradeUrlWithUtm = (url = null, options = {}) => {
    const { pricingUrl } = getFreemiusSettings();
    const targetUrl = url || pricingUrl;

    if (!targetUrl) {
        return null;
    }

    const runtime = getGutenverseRuntime();

    try {
        const parsedUrl = new URL(targetUrl);

        if (!parsedUrl.searchParams.get('utm_source')) {
            parsedUrl.searchParams.set('utm_source', options?.source || 'jnews-blocks');
        }

        if (!parsedUrl.searchParams.get('utm_medium') && options?.medium) {
            parsedUrl.searchParams.set('utm_medium', options.medium);
        }

        if (!parsedUrl.searchParams.get('utm_campaign')) {
            parsedUrl.searchParams.set('utm_campaign', options?.campaign || getFreemiusCampaign());
        }

        if (!parsedUrl.searchParams.get('utm_client_site')) {
            parsedUrl.searchParams.set(
                'utm_client_site',
                options?.clientSite || runtime?.clientUrl || runtime?.url || window?.location?.origin || ''
            );
        }

        if (!parsedUrl.searchParams.get('utm_client_theme')) {
            parsedUrl.searchParams.set(
                'utm_client_theme',
                options?.clientTheme || runtime?.activeTheme || ''
            );
        }

        return parsedUrl.toString();
    } catch (error) {
        return targetUrl;
    }
};

const closeFreemiusPopup = () => {
    const modal = document.getElementById(JNEWS_MODAL_ID);
    const content = document.getElementById(JNEWS_CONTENT_ID);

    if (content) {
        render(null, content);
    }

    if (modal) {
        modal.classList.remove('active');
        modal.setAttribute('aria-hidden', 'true');
    }

    document.body.classList.remove(JNEWS_BODY_CLASS);
};

const requestFreemiusPopupClose = () => {
    const content = document.getElementById(JNEWS_CONTENT_ID);

    if (content?.hasChildNodes()) {
        document.dispatchEvent(new CustomEvent(JNEWS_CLOSE_REQUEST_EVENT));
        return;
    }

    closeFreemiusPopup();
};

const ensureFreemiusPopup = () => {
    let modal = document.getElementById(JNEWS_MODAL_ID);

    if (modal) {
        return modal;
    }

    modal = document.createElement('div');
    modal.id = JNEWS_MODAL_ID;
    modal.className = 'jnews-blocks-freemius-modal';
    modal.setAttribute('aria-hidden', 'true');
    modal.innerHTML = `
        <div class="jnews-blocks-freemius-modal__backdrop"></div>
        <div class="jnews-blocks-freemius-modal__dialog" role="dialog" aria-modal="true" aria-label="JNews Blocks plans and pricing">
            <div id="${JNEWS_CONTENT_ID}" class="jnews-blocks-freemius-modal__content"></div>
        </div>
    `;

    modal.querySelector('.jnews-blocks-freemius-modal__backdrop').addEventListener('click', requestFreemiusPopupClose);

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            requestFreemiusPopupClose();
        }
    });

    document.body.appendChild(modal);

    return modal;
};

const openFreemiusPopup = (event = null, url = null, options = {}) => {
    if (event?.preventDefault) {
        event.preventDefault();
    }

    const { pricingUrl } = getFreemiusSettings();
    const targetUrl = getUpgradeUrlWithUtm(url || pricingUrl, options);

    if (!targetUrl) {
        return false;
    }

    const modal = ensureFreemiusPopup();
    const content = modal.querySelector(`#${JNEWS_CONTENT_ID}`);

    ensurePricingPlanData();

    render(
        <JNewsPopupPricingPlan
            onClose={closeFreemiusPopup}
            pricingUrl={targetUrl}
        />,
        content
    );
    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
    document.body.classList.add(JNEWS_BODY_CLASS);

    return true;
};

const getUpgradeProps = (url = null, options = {}) => {
    const { pricingUrl } = getFreemiusSettings();
    const targetUrl = getUpgradeUrlWithUtm(url || pricingUrl, options) || '#';

    if (targetUrl !== '#') {
        return {
            href: targetUrl,
            onClick: (event) => openFreemiusPopup(event, targetUrl, options),
        };
    }

    return {
        href: targetUrl,
        target: '_blank',
        rel: 'noreferrer',
    };
};

const shouldHandleUpgradeRoute = () => {
    if (typeof window === 'undefined') {
        return false;
    }

    const query = new URLSearchParams(window.location.search);
    const page = query.get('page');
    const path = query.get('path');

    return path === JNEWS_UPGRADE_ROUTE_PATH && ['jnews-blocks'].includes(page);
};

const bindFreemiusUpgradeLink = (element) => {
    if (!element || element.dataset.jnewsBlocksFreemiusBound === 'true') {
        return;
    }

    element.dataset.jnewsBlocksFreemiusBound = 'true';
    element.addEventListener('mouseenter', () => ensurePricingPlanData());
    element.addEventListener('focus', () => ensurePricingPlanData());
    element.addEventListener('click', (event) => {
        const { pricingUrl } = getFreemiusSettings();
        const targetUrl = getUpgradeUrlWithUtm(pricingUrl || element.href);

        if (!targetUrl) {
            return;
        }

        openFreemiusPopup(event, targetUrl);
    });
};

const bindFreemiusUpgradeLinks = (root = document) => {
    if (typeof document === 'undefined') {
        return;
    }

    root.querySelectorAll(JNEWS_FREEMIUS_MENU_SELECTOR).forEach(bindFreemiusUpgradeLink);
};

const initializeFreemiusPopup = () => {
    if (typeof window === 'undefined' || typeof document === 'undefined' || window.jnewsBlocksFreemiusInitialized) {
        return;
    }

    window.jnewsBlocksFreemiusInitialized = true;

    const setup = () => {
        bindFreemiusUpgradeLinks();

        if (shouldHandleUpgradeRoute()) {
            openFreemiusPopup(null, null, { medium: 'dashboardnav' });
        }

        const observer = new MutationObserver(() => bindFreemiusUpgradeLinks());
        observer.observe(document.body, { childList: true, subtree: true });
    };

    if (document.body) {
        setup();
        return;
    }

    document.addEventListener('DOMContentLoaded', setup, { once: true });
};

initializeFreemiusPopup();

export {
    closeFreemiusPopup,
    getFreemiusCampaign,
    getFreemiusSettings,
    getUpgradeUrlWithUtm,
    getUpgradeProps,
    initializeFreemiusPopup,
    openFreemiusPopup,
};
