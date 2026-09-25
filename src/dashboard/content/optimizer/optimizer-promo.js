import { __ } from '@wordpress/i18n';
import { applyFilters } from '@wordpress/hooks';
import { useState } from '@wordpress/element';
import apiFetch from '@wordpress/api-fetch';
import { DashboardContent } from '../../components';
import { getUpgradeProps } from '../../../helper/freemius';
import {
    getOptimizerRouteState,
    OPTIMIZER_PLUGIN_SLUG,
    PRO_PLUGIN_SLUG,
    OPTIMIZER_REQUIRED_LICENSES,
    OPTIMIZER_ROUTE_STATE,
} from './state';

const getDashboardConfig = () => (
    window['GutenverseConfig'] || window['GutenverseDashboard'] || {}
);

const CrownIcon = () => (
    <svg width="16" height="16" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
        <path d="M3.25 9.5L2 2.625L5.4375 5.75L7.625 2L9.8125 5.75L13.25 2.625L12 9.5H3.25ZM12 11.375C12 11.75 11.75 12 11.375 12H3.875C3.5 12 3.25 11.75 3.25 11.375V10.75H12V11.375Z" fill="currentColor" />
    </svg>
);

const OptimizerPromoFeatures = () => (
    <ul className="gutenverse-core-optimizer-promo__features">
        <li>{__('Scan Pages, Posts, Templates, and Patterns', '--gctd--')}</li>
        <li>{__('Review Optimizer Issues and Recommended Fixes', '--gctd--')}</li>
        <li>{__('Tune Performance settings from one dashboard', '--gctd--')}</li>
        <li>{__('Unlock Advanced Optimization Tools', '--gctd--')}</li>
    </ul>
);

const OptimizerPromoPreview = ({ imgDir }) => (
    <div className="gutenverse-core-optimizer-promo__preview" aria-hidden="true">
        <img
            className="gutenverse-core-optimizer-promo__preview-image"
            src={imgDir ? `${imgDir}/optimizer-locked-banner-laptop.png` : undefined}
            alt=""
        />
    </div>
);

const UpgradeToProAction = ({ upgradeProUrl }) => (
    <a
        className="gutenverse-core-optimizer-promo__action gutenverse-core-optimizer-promo__action--upgrade"
        {...getUpgradeProps(upgradeProUrl, { medium: 'dashboard' })}
    >
        <span>{__('Upgrade To Pro', '--gctd--')}</span>
        <CrownIcon />
    </a>
);

const ActivateLicenseAction = ({ adminUrl = '' }) => (
    <a
        className="gutenverse-core-optimizer-promo__action gutenverse-core-optimizer-promo__action--activate-license"
        href={adminUrl ? `${adminUrl}admin.php?page=gutenverse&path=license` : '?page=gutenverse&path=license'}
    >
        {__('Activate License', '--gctd--')}
    </a>
);

const UpgradePlanAction = ({ upgradeProUrl }) => (
    <a
        className="gutenverse-core-optimizer-promo__action gutenverse-core-optimizer-promo__action--upgrade-plan"
        {...getUpgradeProps(upgradeProUrl, { medium: 'dashboard' })}
    >
        {__('Upgrade Plan Now', '--gctd--')}
    </a>
);

const InstallOptimizerAction = ({ ecosystemUrl }) => (
    <a
        className="gutenverse-core-optimizer-promo__action gutenverse-core-optimizer-promo__action--install"
        href={ecosystemUrl}
    >
        {__('Install Optimizer', '--gctd--')}
    </a>
);

const ActivateOptimizerAction = ({ canActivatePlugins, optimizerPlugin }) => {
    const [status, setStatus] = useState('idle');
    const canActivate = true === canActivatePlugins
        && false === optimizerPlugin?.active
        && Boolean(optimizerPlugin?.path);
    const isActivating = 'activating' === status;
    const hasFailed = 'failed' === status;

    const activateOptimizer = async () => {
        if (!canActivate || isActivating) {
            return;
        }

        setStatus('activating');

        try {
            await apiFetch({
                path: `wp/v2/plugins/plugin?plugin=${encodeURIComponent(optimizerPlugin.path)}`,
                method: 'POST',
                data: { status: 'active' },
            });

            window.location.reload();
        } catch (error) {
            // The REST response can include permission and server internals.
            // Keep the dashboard message generic and translatable.
            setStatus('failed');
        }
    };

    return <>
        <button
            className="gutenverse-core-optimizer-promo__action gutenverse-core-optimizer-promo__action--activate-optimizer"
            type="button"
            disabled={!canActivate || isActivating}
            onClick={activateOptimizer}
        >
            {isActivating
                ? __('Activating Optimizer', '--gctd--')
                : __('Activate Optimizer', '--gctd--')}
        </button>
        {hasFailed && <p className="gutenverse-core-optimizer-promo__action-error" role="status">
            {__('Unable to activate Optimizer. Please try again.', '--gctd--')}
        </p>}
    </>;
};

const getFilteredProAction = ({
    adminUrl,
    licenseActiveAction,
    upgradeProUrl,
}) => {
    const action = applyFilters(
        'gutenverse.button.pro.banner',
        <ActivateLicenseAction adminUrl={adminUrl} />,
        <ActivateLicenseAction adminUrl={adminUrl} />,
        licenseActiveAction,
        <UpgradePlanAction upgradeProUrl={upgradeProUrl} />,
        OPTIMIZER_REQUIRED_LICENSES
    );

    if ('function' === typeof action) {
        const ActionComponent = action;
        return <ActionComponent />;
    }

    return action || <ActivateLicenseAction adminUrl={adminUrl} />;
};

const OptimizerPromoAction = ({
    adminUrl,
    canActivatePlugins,
    ecosystemUrl,
    optimizerPlugin,
    routeState,
    upgradeProUrl,
}) => {
    if (OPTIMIZER_ROUTE_STATE.PRO_LICENSE_ACTION === routeState) {
        const licenseActiveAction = optimizerPlugin
            ? <ActivateOptimizerAction
                canActivatePlugins={canActivatePlugins}
                optimizerPlugin={optimizerPlugin}
            />
            : <InstallOptimizerAction ecosystemUrl={ecosystemUrl} />;

        return getFilteredProAction({
            adminUrl,
            licenseActiveAction,
            upgradeProUrl,
        });
    }

    return <UpgradeToProAction upgradeProUrl={upgradeProUrl} />;
};

/**
 * Core fallback for the Optimizer dashboard route.
 *
 * The active Optimizer plugin replaces this component through
 * `gutenverse.dashboard.route.content`. Phase 4 replaces the temporary
 * upgrade action with the state-aware action selector.
 */
const OptimizerPromo = () => {
    const {
        adminUrl,
        canActivatePlugins = false,
        ecosystemUrl,
        imgDir,
        plugins = {},
        upgradeProUrl,
    } = getDashboardConfig();
    const optimizerPlugin = plugins?.[OPTIMIZER_PLUGIN_SLUG];
    const routeState = getOptimizerRouteState({
        optimizerPlugin,
        proPlugin: plugins?.[PRO_PLUGIN_SLUG],
        proData: window?.gprodata,
    });

    return <DashboardContent>
        <section
            className="gutenverse-core-optimizer-promo"
            data-optimizer-route-state={routeState}
        >
            <div className="gutenverse-core-optimizer-promo__card">
                <div className="gutenverse-core-optimizer-promo__copy">
                    <h2>{__('Optimizer dashboard is a Pro Feature', '--gctd--')}</h2>
                    <p>{__('Activate Gutenverse Pro to scan, configure, and review optimizer issues from the dashboard', '--gctd--')}</p>
                    <OptimizerPromoFeatures />
                    <div className="gutenverse-core-optimizer-promo__actions">
                        <OptimizerPromoAction
                            adminUrl={adminUrl}
                            canActivatePlugins={canActivatePlugins}
                            ecosystemUrl={ecosystemUrl}
                            optimizerPlugin={optimizerPlugin}
                            routeState={routeState}
                            upgradeProUrl={upgradeProUrl}
                        />
                    </div>
                </div>
                <OptimizerPromoPreview imgDir={imgDir} />
            </div>
        </section>
    </DashboardContent>;
};

export default OptimizerPromo;
