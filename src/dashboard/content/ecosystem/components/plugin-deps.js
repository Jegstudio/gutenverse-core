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
