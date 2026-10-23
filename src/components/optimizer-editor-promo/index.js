import { ActivateOptimizerAction, InstallOptimizerAction } from '../optimizer-plugin-action';
import { applyFilters } from '@wordpress/hooks';
import { __ } from '@wordpress/i18n';

const OPTIMIZER_REQUIRED_LICENSES = ['professional', 'agency', 'enterprise', 'ultimate'];

const getOptimizerEditorConfig = () => {
    if (typeof window === 'undefined') {
        return {};
    }

    return window.GutenverseConfig || window.GutenverseDashboard || {};
};

const addQueryArgs = (url, args) => {
    if (!url) {
        return '';
    }

    const query = Object.entries(args)
        .filter(([, value]) => value)
        .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
        .join('&');

    if (!query) {
        return url;
    }

    return `${url}${url.includes('?') ? '&' : '?'}${query}`;
};

const getUpgradeUrl = () => {
    const {
        activeTheme,
        clientUrl,
        upgradeProUrl,
    } = getOptimizerEditorConfig();

    return addQueryArgs(upgradeProUrl || 'https://gutenverse.com/pricing', {
        utm_source: 'gutenverse',
        utm_medium: 'blockeditor',
        utm_client_site: clientUrl,
        utm_client_theme: activeTheme,
    });
};

const bringFreemiusModalToFront = () => {
    if (typeof window === 'undefined' || typeof document === 'undefined') {
        return;
    }

    const setModalIndex = () => {
        const modal = document.querySelector('.gutenverse-freemius-modal');

        if (modal) {
            modal.style.zIndex = '2147483647';
        }
    };

    setModalIndex();
    window.setTimeout(setModalIndex, 0);
    window.setTimeout(setModalIndex, 100);
};

const getUpgradeButtonProps = () => {
    if (typeof window === 'undefined') {
        return {
            href: getUpgradeUrl(),
            target: '_blank',
            rel: 'noreferrer',
        };
    }

    const helper = window?.gutenverseCore?.helper;

    if (helper?.getUpgradeProps) {
        const props = helper.getUpgradeProps(getUpgradeUrl(), { medium: 'blockeditor' });

        return {
            ...props,
            onClick: (event) => {
                props?.onClick?.(event);
                bringFreemiusModalToFront();
            },
        };
    }

    return {
        href: getUpgradeUrl(),
        target: '_blank',
        rel: 'noreferrer',
    };
};

const getLicenseUrl = () => {
    const {
        adminUrl = '',
        licenseUrl,
    } = getOptimizerEditorConfig();

    return licenseUrl || `${adminUrl}admin.php?page=gutenverse&path=license`;
};

const hasProData = () => {
    if (typeof window === 'undefined') {
        return false;
    }

    const proData = window?.gprodata;

    if (!proData) {
        return false;
    }

    if (Array.isArray(proData)) {
        return proData.length > 0;
    }

    if (typeof proData === 'object') {
        return Object.keys(proData).length > 0;
    }

    return true;
};

const isProPluginActive = () => Boolean(getOptimizerEditorConfig()?.plugins?.['gutenverse-pro']?.active) || hasProData();

const CrownIcon = () => (
    <svg width="16" height="16" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
        <path d="M3.25 9.5L2 2.625L5.4375 5.75L7.625 2L9.8125 5.75L13.25 2.625L12 9.5H3.25ZM12 11.375C12 11.75 11.75 12 11.375 12H3.875C3.5 12 3.25 11.75 3.25 11.375V10.75H12V11.375Z" fill="currentColor" />
    </svg>
);

const UpgradeProButton = () => (
    <a
        className="gutenverse-optimizer-panel__pro-action gutenverse-optimizer-panel__pro-action--compact-upgrade"
        {...getUpgradeButtonProps()}
    >
        <span className="gutenverse-optimizer-panel__pro-action-text">{__('Upgrade To Pro', '--gctd--')}</span>
        <span className="gutenverse-optimizer-panel__pro-action-icon">
            <CrownIcon />
        </span>
    </a>
);

const UpgradePlanButton = () => (
    <a
        className="gutenverse-optimizer-panel__tier-upgrade-button"
        {...getUpgradeButtonProps()}
    >
        Upgrade Plan Now
    </a>
);

const ActivateLicenseButton = () => (
    <a
        className="gutenverse-optimizer-panel__pro-action gutenverse-optimizer-panel__pro-action--activate"
        href={getLicenseUrl()}
        target="_blank"
        rel="noreferrer"
    >
        Activate License
    </a>
);

const getFilteredProButton = (licenseActiveButton = null) => {
    const button = applyFilters(
        'gutenverse.button.pro.banner',
        <ActivateLicenseButton />,
        <ActivateLicenseButton />,
        licenseActiveButton,
        <UpgradePlanButton />,
        OPTIMIZER_REQUIRED_LICENSES
    );

    if ('function' === typeof button) {
        const ButtonComponent = button;
        return <ButtonComponent />;
    }

    return button || <ActivateLicenseButton />;
};

const LockedPanelAction = ({ action = 'auto' }) => {
    if ('upgrade' === action || (!isProPluginActive() && 'activate' !== action)) {
        return (
            <div className="gutenverse-optimizer-panel__pro-action-wrapper">
                <UpgradeProButton />
            </div>
        );
    }

    const config = getOptimizerEditorConfig();
    const optimizerPlugin = config.plugins?.['gutenverse-optimizer'];
    const actionClass = 'gutenverse-optimizer-panel__pro-action gutenverse-optimizer-panel__pro-action--activate';
    const readyAction = optimizerPlugin && !optimizerPlugin.active
        ? <ActivateOptimizerAction
            canActivatePlugins={config.canActivatePlugins}
            optimizerPlugin={optimizerPlugin}
            className={actionClass}
        />
        : !optimizerPlugin
            ? <InstallOptimizerAction
                ecosystemUrl={config.ecosystemUrl || `${config.adminUrl || ''}admin.php?page=gutenverse&path=ecosystem`}
                className={actionClass}
            />
            : null;

    return (
        <div className="gutenverse-optimizer-panel__pro-action-wrapper">
            {getFilteredProButton('tier' === action ? <UpgradePlanButton /> : readyAction)}
        </div>
    );
};

const OptimizerEditorPromo = ({
    action = 'auto',
    title = __('Don\'t Let a Slow Website Drive Visitors Away', '--gctd--'),
    description = __('Upgrade to Gutenverse Pro to identify and fix optimization issues that could affect your website\'s speed, performance, and user experience.', '--gctd--'),
}) => (
    <div className="gutenverse-core-optimizer-editor-promo gutenverse-optimizer-panel__content gutenverse-optimizer-panel__content--locked">
        <div className="gutenverse-optimizer-panel__pro-card">
            <div className="gutenverse-optimizer-panel__pro-visual" aria-hidden="true" />
            <h3>{title}</h3>
            <p>{description}</p>
            <LockedPanelAction action={action} />
        </div>
    </div>
);

export default OptimizerEditorPromo;
