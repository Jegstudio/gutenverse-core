import { render } from '@wordpress/element';
import PopupPricingPlan from '../components/pro/popup-pricing-plan';

const MODAL_ID = 'gutenverse-freemius-modal';
const CONTENT_ID = 'gutenverse-freemius-modal-content';
const BODY_CLASS = 'gutenverse-freemius-modal-open';
const UPGRADE_ROUTE_PATH = 'upgrade-pro';
const FREEMIUS_MENU_SELECTOR = [
    'a[href*="page=gutenverse&path=upgrade-pro"]',
    'a[href*="page=gutenverse-dashboard&path=upgrade-pro"]',
    '#wp-admin-bar-gutenverse-pro > .ab-item',
].join(', ');

const getGutenverseRuntime = () => window['GutenverseConfig'] || window['GutenverseDashboard'] || window['GutenverseData'] || {};

const getFreemiusSettings = () => {
    const { freemius = {}, upgradeProUrl } = getGutenverseRuntime();

    return {
        ...freemius,
        pricingUrl: freemius?.pricingUrl || upgradeProUrl,
    };
};

const closeFreemiusPopup = () => {
    const modal = document.getElementById(MODAL_ID);
    const content = document.getElementById(CONTENT_ID);

    if (content) {
        render(null, content);
    }

    if (modal) {
        modal.classList.remove('active');
        modal.setAttribute('aria-hidden', 'true');
    }

    document.body.classList.remove(BODY_CLASS);
};

const ensureFreemiusPopup = () => {
    let modal = document.getElementById(MODAL_ID);

    if (modal) {
        return modal;
    }

    modal = document.createElement('div');
    modal.id = MODAL_ID;
    modal.className = 'gutenverse-freemius-modal';
    modal.setAttribute('aria-hidden', 'true');

    modal.innerHTML = `
        <div class="gutenverse-freemius-modal__backdrop"></div>
        <div class="gutenverse-freemius-modal__dialog" role="dialog" aria-modal="true" aria-label="Gutenverse plans and pricing">
            <div id="${CONTENT_ID}" class="gutenverse-freemius-modal__content"></div>
        </div>
    `;

    modal.querySelector('.gutenverse-freemius-modal__backdrop').addEventListener('click', closeFreemiusPopup);

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            closeFreemiusPopup();
        }
    });

    document.body.appendChild(modal);

    return modal;
};

const openFreemiusPopup = (event = null, url = null) => {
    if (event?.preventDefault) {
        event.preventDefault();
    }

    const { enabled, pricingUrl } = getFreemiusSettings();
    const targetUrl = url || pricingUrl;

    if (!targetUrl) {
        return false;
    }

    if (!enabled) {
        window.open(targetUrl, '_blank', 'noopener,noreferrer');
        return true;
    }

    const modal = ensureFreemiusPopup();
    const content = modal.querySelector(`#${CONTENT_ID}`);

    render(
        <PopupPricingPlan
            pricingUrl={targetUrl}
            onClose={closeFreemiusPopup}
        />,
        content
    );
    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
    document.body.classList.add(BODY_CLASS);

    return true;
};

const getUpgradeProps = (url = null) => {
    const { enabled, pricingUrl } = getFreemiusSettings();
    const targetUrl = url || pricingUrl || '#';

    if (enabled) {
        return {
            href: targetUrl,
            onClick: (event) => openFreemiusPopup(event, targetUrl),
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

    return path === UPGRADE_ROUTE_PATH && ['gutenverse', 'gutenverse-dashboard'].includes(page);
};

const bindFreemiusUpgradeLink = (element) => {
    if (!element || element.dataset.gutenverseFreemiusBound === 'true') {
        return;
    }

    element.dataset.gutenverseFreemiusBound = 'true';
    element.addEventListener('click', (event) => {
        const { pricingUrl } = getFreemiusSettings();
        const targetUrl = pricingUrl || element.href;

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

    root.querySelectorAll(FREEMIUS_MENU_SELECTOR).forEach(bindFreemiusUpgradeLink);
};

const initializeFreemiusPopup = () => {
    if (typeof window === 'undefined' || typeof document === 'undefined' || window.gutenverseFreemiusInitialized) {
        return;
    }

    window.gutenverseFreemiusInitialized = true;

    const setup = () => {
        bindFreemiusUpgradeLinks();

        if (shouldHandleUpgradeRoute()) {
            openFreemiusPopup(null);
        }

        const observer = new MutationObserver(() => {
            bindFreemiusUpgradeLinks();
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true,
        });
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
    getFreemiusSettings,
    getUpgradeProps,
    initializeFreemiusPopup,
    openFreemiusPopup,
};
