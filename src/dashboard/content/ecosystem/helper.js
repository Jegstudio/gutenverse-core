import { __ } from '@wordpress/i18n';
import { applyFilters } from '@wordpress/hooks';
import { Crown } from './components/icons';
import { activeTheme, clientUrl, upgradeProUrl } from 'gutenverse-core/config';

const blockTier = ['basic', 'personal', 'professional', 'agency', 'enterprise'];

const getAvailableTier = (tier) => {
    const index = blockTier.indexOf(tier);
    return index >= 0 ? blockTier.slice(index) : ['basic'];
};

const PRO_PRICING_URL = `${upgradeProUrl}?utm_source=gutenverse&utm_medium=dashboard-ecosystem&utm_client_site=${clientUrl}&utm_client_theme=${activeTheme}`;

const pluginLists = window?.GutenverseDashboard?.plugins || [];

export const getPluginDeps = (installed, plugins) => {
    const requiresPlugins = installed?.requiresPlugins || [];

    // A dependency is "missing" if it doesn't exist in plugins OR exists but is not active
    const missingPlugins = requiresPlugins
        .filter(dep => !plugins?.[dep]?.active)
        .map(dep => pluginLists?.[dep]?.name || dep);

    const canInstall = missingPlugins.length === 0;
    let depsString = null;

    if (!canInstall) {
        if (missingPlugins.length === 1) {
            depsString = <>Please activate <b>{missingPlugins[0]}</b> before activating this plugin.</>;
        } else if (missingPlugins.length === 2) {
            depsString = <>Please activate <b>{missingPlugins[0]}</b> and <b>{missingPlugins[1]}</b> before activating this plugin.</>;
        } else {
            const last = missingPlugins[missingPlugins.length - 1];
            const rest = missingPlugins.slice(0, -1);
            depsString = <>Please activate {rest.map((plugin, index) => <span key={index}><b>{plugin}</b>, </span>)}and <b>{last}</b> before activating this plugin.</>;
        }
    }

    return { canInstall, missingPlugins, depsString };
};

/**
 * PluginAction renders the correct action button.
 * If it's a "server-pro" host AND the action is NOT an "installed" button,
 * it goes through applyFilters for pro license handling.
 * Otherwise, the action is returned directly.
 */
export const PluginAction = ({ action, plugin, skipFilter }) => {
    const { host } = plugin;
    // If already installed/activated, skip applyFilters and return directly
    if (skipFilter) {
        return <>{action}</>;
    }

    if (host === 'server-pro') {
        const availableLicenseTier = getAvailableTier(plugin.minTier || 'basic');
        return applyFilters(
            'gutenverse.button.pro.banner',
            <a href={PRO_PRICING_URL} className="install-action upgrade-button" target="_blank" rel="noreferrer">
                <Crown />
                <span>Upgrade To Pro</span>
            </a>,
            <a href={PRO_PRICING_URL} className="install-action upgrade-button expired" target="_blank" rel="noreferrer">
                <span>Renew License</span>
            </a>,
            <>{action}</>,
            <a href={PRO_PRICING_URL} className="install-action upgrade-button upgrade-plan" target="_blank" rel="noreferrer">
                <span>Upgrade Plan Now</span>
            </a>,
            availableLicenseTier
        );
    }

    return <>{action}</>;
};
