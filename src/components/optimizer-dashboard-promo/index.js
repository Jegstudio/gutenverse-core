import { __ } from '@wordpress/i18n';
import { applyFilters } from '@wordpress/hooks';
import { DashboardContent } from '../../dashboard/components';
import { getUpgradeProps } from '../../helper/freemius';
import {
    getOptimizerRouteState,
    OPTIMIZER_PLUGIN_SLUG,
    PRO_PLUGIN_SLUG,
} from '../../dashboard/content/optimizer/state';

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

const OptimizerDashboardPromo = ({
    action = 'auto',
    title = __('Optimizer dashboard is a Pro Feature', '--gctd--'),
    description = __('Activate Gutenverse Pro to scan, configure, and review optimizer issues from the dashboard', '--gctd--'),
}) => {
    const {
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
                    <h2>{title}</h2>
                    <p>{description}</p>
                    <OptimizerPromoFeatures />
                    <div className="gutenverse-core-optimizer-promo__actions">
                        {applyFilters('gutenverse.optimizer.promo.action',
                            <UpgradeToProAction upgradeProUrl={upgradeProUrl} />,
                            { context: 'dashboard', action })}
                    </div>
                </div>
                <OptimizerPromoPreview imgDir={imgDir} />
            </div>
        </section>
    </DashboardContent>;
};

export default OptimizerDashboardPromo;
