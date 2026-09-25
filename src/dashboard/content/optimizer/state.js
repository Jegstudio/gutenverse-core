/**
 * Optimizer dashboard route state.
 *
 * This module deliberately does not inspect or decode license details. When
 * Gutenverse Pro is available, the registered Pro filter remains responsible
 * for selecting an activation, renewal, or tier-upgrade action.
 */

export const OPTIMIZER_PLUGIN_SLUG = 'gutenverse-optimizer';

export const PRO_PLUGIN_SLUG = 'gutenverse-pro';

export const OPTIMIZER_REQUIRED_LICENSES = Object.freeze([
    'professional',
    'agency',
    'enterprise',
    'ultimate',
]);

export const OPTIMIZER_ROUTE_STATE = Object.freeze({
    ACTIVE: 'active',
    UPGRADE_TO_PRO: 'upgrade-to-pro',
    PRO_LICENSE_ACTION: 'pro-license-action',
});

const hasProData = (proData) => {
    if (!proData) {
        return false;
    }

    if (Array.isArray(proData)) {
        return proData.length > 0;
    }

    if ('object' === typeof proData) {
        return Object.keys(proData).length > 0;
    }

    return true;
};

export const isPluginActive = (plugin) => Boolean(plugin?.active);

export const hasActiveProIntegration = ({ proPlugin, proData } = {}) => (
    isPluginActive(proPlugin) || hasProData(proData)
);

/**
 * Return the public ownership/action state for the Optimizer dashboard route.
 *
 * `PRO_LICENSE_ACTION` intentionally means that the caller must delegate to
 * `gutenverse.button.pro.banner`; Core must not make license or tier decisions.
 *
 * @param {Object} state Route plugin data.
 * @param {Object} state.optimizerPlugin Installed Optimizer plugin data.
 * @param {Object} state.proPlugin Installed Pro plugin data.
 * @param {*}      state.proData Existing protected Pro integration signal.
 * @return {string} Optimizer route state.
 */
export const getOptimizerRouteState = ({
    optimizerPlugin,
    proPlugin,
    proData,
} = {}) => {
    if (isPluginActive(optimizerPlugin)) {
        return OPTIMIZER_ROUTE_STATE.ACTIVE;
    }

    if (!hasActiveProIntegration({ proPlugin, proData })) {
        return OPTIMIZER_ROUTE_STATE.UPGRADE_TO_PRO;
    }

    return OPTIMIZER_ROUTE_STATE.PRO_LICENSE_ACTION;
};
