import { useEffect, useRef, useState, useMemo } from '@wordpress/element';
import { createPortal } from '@wordpress/element';
import { Link } from 'gutenverse-core/router';
import { __ } from '@wordpress/i18n';
import { IconCrownBannerSVG, IconNoticeBellSVG, LogoFullColor31SVG } from 'gutenverse-core/icons';
import { applyFilters } from '@wordpress/hooks';
import isEmpty from 'lodash/isEmpty';
import { ButtonUpgradePro, CheckSquare } from 'gutenverse-core/components';
import { versionCompare, useNotificationsState } from '../../helper';

// @since v3.2.0
const getRequiredPluginVersion = (history, currentFrameworkVersion) => {
    let requiredVersion = null;

    if (!history || !history.length) return null;

    for (const entry of history) {
        if (versionCompare(entry.framework_version, currentFrameworkVersion, '<=')) {
            requiredVersion = entry.plugin_version;
        } else {
            break;
        }
    }
    return requiredVersion;
};

const getPluginFrameworkVersion = (history, pluginVersion) => {
    if (!history || !history.length) return null;

    for (const entry of history) {
        if (entry.plugin_version === pluginVersion) {
            return entry.framework_version;
        }
    }
    return null;
};

const useVersionCompatibilityData = (readNotifications, markAsRead) => {
    const { adminUrl, pluginVersions } = window['GutenverseDashboard'];
    const { pluginCheck } = window['GutenversePluginList'];
    const { version } = window['gutenverseLoadedFramework'];

    const data = useMemo(() => {
        if (!version || !pluginCheck) {
            return { content: null, count: 0, newIds: [] };
        }

        let count = 0;
        let newIds = [];

        const content = Object.keys(pluginVersions)?.map((installedSlug) => {

            const compatibilitySlug = installedSlug;
            const history = pluginCheck[compatibilitySlug];

            if (!pluginVersions[installedSlug]) {
                return null;
            }

            const v1 = pluginVersions[installedSlug]['version'];

            let needsUpdate = false;
            let v_core_history = getPluginFrameworkVersion(history, v1) || 'N/A';
            let v2 = null;
            let message = '';

            if (history) {
                v2 = getRequiredPluginVersion(history, version);

                if (v2) {
                    needsUpdate = versionCompare(v1, v2, '<');
                } else {
                    needsUpdate = true;
                    v2 = 'Unknown';
                }

                message = needsUpdate
                    ? __('Hi! Currently you are using an older version of this plugin. Please update to the compatible version: ' + v2 + '.', '--gctd--')
                    : __('Your plugin version is compatible with the current Gutenverse Core.', '--gctd--');

            } else {
                needsUpdate = true;
                v2 = 'Required';
                message = __('Plugin compatibility data is missing. Please update the plugin to the latest version to ensure compatibility.', '--gctd--');
            }

            let button = null;
            let notificationId = null;
            let isNew = false;
            let mouseEnterAction = undefined;

            if (needsUpdate) {
                notificationId = `gutenverse-version-check-${installedSlug}-${v2}`;
                isNew = !readNotifications.includes(notificationId);

                if (isNew) {
                    count++;
                    newIds.push(notificationId);
                }

                mouseEnterAction = () => markAsRead(notificationId);

                button = <a
                    href={adminUrl + '/plugins.php'}
                    rel="noreferrer"
                    className="guten-version-button guten-primary"
                >
                    {__('Need Update', '--gctd--')}
                </a>;
            } else {
                button = <div className="guten-version-button guten-disable">
                    {__('Updated', '--gctd--')}
                </div>;
            }

            return <div
                key={installedSlug}
                className="gutenverse-version-wrapper"
                onMouseEnter={mouseEnterAction}
            >
                {isNew && <span className="notification-new"></span>}
                <div className="gutenverse-version-notice">
                    <h3>{`${pluginVersions[installedSlug]['name']} v${v1}`}</h3>
                    <h5>{__(`Gutenverse Core v${v_core_history}`, '--gctd--')}</h5>
                    <p>{message}</p>
                    <div className="gutenverse-version-action">
                        {button}
                    </div>
                </div>
            </div>;
        }).filter(item => item !== null);

        return { content, count, newIds };

    }, [version, pluginCheck, pluginVersions, adminUrl, readNotifications, markAsRead]);

    return data;
};

const NotificationList = ({ readNotifications, markAsRead, onUpdateTotal }) => {
    let content = [];
    const notificationList = applyFilters(
        'gutenverse.notification.list',
        [],
        null
    );

    const { total, newIds } = useMemo(() => {
        let currentTotal = 0;
        let ids = [];
        notificationList.map(({ id, show }) => {
            if (show) {
                ids.push(id);
                if (!readNotifications.includes(id)) {
                    currentTotal++;
                }
            }
        });
        return { total: currentTotal, newIds: ids };
    }, [notificationList, readNotifications]);

    useEffect(() => {
        if (onUpdateTotal) onUpdateTotal(total, newIds);
    }, [total, JSON.stringify(newIds)], readNotifications);

    if (!isEmpty(notificationList)) {
        content = notificationList
            .filter(notification => notification.show)
            .map(notification => {
                const { id, content } = notification;
                const isNew = !readNotifications.includes(id);

                return <div key={id} className="gutenverse-notification-wrapper" onMouseEnter={() => markAsRead(id)}>
                    {isNew && <span className="notification-new"></span>}
                    {content}
                </div>;
            });
    }

    return <>
        <div className="notification-list">
            {!isEmpty(content) ? content : <p className="notification-empty">{__('There is no Notifications', '--gctd--')}</p>}
        </div>
    </>;
};

const VersionCompatibility = ({ content }) => {
    return <div className="content-list">
        {!isEmpty(content) ? content : <p className="notification-empty">{__('All plugins are compatible.', '--gctd--')}</p>}
    </div>;
};

const TabContent = (props) => {
    const {element, showNotifications} = props;
    const [mode, setMode] = useState(null);
    const { readNotifications, markAsRead, markAllRead } = useNotificationsState();

    const [normalNotifTotal, setNormalNotifTotal] = useState(0);
    const [normalNotifIds, setNormalNotifIds] = useState([]);

    const { content: versionContent, count: versionNotifTotal, newIds: versionNotifIds } = useVersionCompatibilityData(readNotifications, markAsRead);

    const totalNotifs = normalNotifTotal + versionNotifTotal;

    const targetElement = element ? element : null;
    if (!targetElement) return;

    const handleNormalTotalUpdate = (total, ids) => {
        setNormalNotifTotal(total);
        setNormalNotifIds(ids);
    };

    const handleMarkAllRead = () => {
        markAllRead([...normalNotifIds, ...versionNotifIds]);
    };


    let content = '';

    switch (mode) {
        case 'version-check':
            content = <VersionCompatibility content={versionContent} updateCount={versionNotifTotal} />;
            break;
        default:
            content = <NotificationList
                readNotifications={readNotifications}
                markAsRead={markAsRead}
                onUpdateTotal={handleNormalTotalUpdate}
            />;
            break;
    }

    const NotifBadge = ({ total }) => {
        return total > 0 ? <span className="notification-total-tab">{total}</span> : null;
    };

    return <>
        <div className={`tab-content ${showNotifications ? 'show' : ''}`}>
            <div className="tab-header">
                <div className={`header-item ${!mode ? 'active' : ''}`} onClick={() => setMode(null)}>
                    <h3>{__('Notification Center', '--gctd--')}</h3>
                    <NotifBadge total={normalNotifTotal} />
                </div>
                <div className={`header-item ${mode === 'version-check' ? 'active' : ''}`} onClick={() => setMode('version-check')}>
                    <h3>{__('Version Compatibility', '--gctd--')}</h3>
                    <NotifBadge total={versionNotifTotal} />
                </div>
                <div className="mark-read" onClick={() => handleMarkAllRead()}>
                    <CheckSquare size={16} />
                </div>
            </div>
            {content}
        </div>
        {totalNotifs > 0 && targetElement && createPortal(<span className="notification-total">{totalNotifs}</span>, targetElement)}
    </>;
};

const Navigation = ({ location }) => {
    const {
        homeSlug,
        pluginVersions,
        upgradeProUrl,
        activeTheme,
        url,
        adminUrl,
        companionActive
    } = window['GutenverseDashboard'];

    const [injectLocation, setInjectLocation] = useState(null);
    const [showNotifications, setShowNotification] = useState(false);
    const { pathname, search } = location;
    const query = new URLSearchParams(search);
    const path = query.get('path') ? query.get('path') : '';

    const iconRef = useRef();

    const menus = applyFilters(
        'gutenverse.dashboard.route.navigation',
        [
            {
                name: __('Dashboard', '--gctd--'),
                slug: homeSlug,
                path: '',
                priority: 0
            },
            {
                name: __('Ecosystem', '--gctd--'),
                slug: homeSlug,
                path: 'ecosystem',
                priority: 1
            },
            {
                name: __('Blocks', '--gctd--'),
                slug: homeSlug,
                path: 'block-list',
                priority: 2
            },
            {
                name: __('Themes', '--gctd--'),
                slug: homeSlug,
                path: 'themes',
                priority: 3
            },
            {
                name: __('Settings', '--gctd--'),
                slug: homeSlug,
                path: 'settings',
                priority: 4
            },
            {
                name: __('System Status', '--gctd--'),
                slug: homeSlug,
                path: 'system',
                priority: 5
            },
            !isEmpty(pluginVersions) && {
                name: __('Update Notice', '--gctd--'),
                slug: homeSlug,
                path: 'update-notice',
                priority: 100
            },
            isEmpty(window?.gprodata) && {
                name: <span>{__('Upgrade to PRO', '--gctd--')}<IconCrownBannerSVG /></span>,
                slug: homeSlug,
                upgrade: true,
                link: `https://gutenverse.com/pricing?utm_source=gutenverse&utm_medium=adminmenu&utm_client_site=${url}&utm_client_theme=${activeTheme}`,
                priority: 9999,
                external: true,
            },
        ],
        homeSlug,
        companionActive
    );

    menus.sort((a, b) => a.priority - b.priority);

    useEffect(() => {
        const submenu = document.querySelector('#toplevel_page_gutenverse > ul');
        const list = submenu.getElementsByTagName('li');
        Array.from(list).forEach(item => {
            item.remove();
        });
    }, []);

    setTimeout(() => {
        let injectLocation = document.querySelector('#toplevel_page_gutenverse .wp-submenu');
        setInjectLocation(injectLocation);
    }, 1);

    let element = null;
    useEffect(()=>{
        element = iconRef.current;
    }, [iconRef.current]);

    const navigationButton = <>
        <li className="wp-submenu-head" aria-hidden="true">Gutenverse</li>
        {menus.map((menu) => {
            if (menu) {
                let param = `?page=${menu.slug}`;

                if ('' !== menu.path) {
                    param += `&path=${menu.path}`;
                }

                if (menu.pathDetail) {
                    param += menu.pathDetail;
                }

                if (menu?.path === 'themes' && activeTheme === 'unibiz' && companionActive !== 'false') {
                    return (<li key={menu.path}><a  className="navigation-item" href={`${adminUrl}admin.php?page=gutenverse-companion-dashboard&path=demo`}>
                        {menu.name}
                    </a></li>);
                }

                return <li key={menu.path} className={`${menu.path === path ? 'current' : ''}`}>
                    {
                        menu.external ? <a className="button-upgrade-pro-sidebar" href={menu.link} target="_blank" rel="noreferrer">{menu.name}</a> : <Link
                            index={`${menu.path}`}
                            to={{
                                pathname: pathname,
                                search: param,
                            }}
                        >
                            {menu.name}
                        </Link>
                    }
                </li>;
            }

            return null;
        })}
    </>;

    return <>
        <div className="navigation-wrapper">
            <div className="plugin-logo">
                <LogoFullColor31SVG />
            </div>
            <div className="navigation-items">
                {menus.map((menu) => {
                    if (menu && !menu?.upgrade) {
                        let param = `?page=${menu.slug}`;

                        if ('' !== menu.path) {
                            param += `&path=${menu.path}`;
                        }

                        if (menu.pathDetail) {
                            param += menu.pathDetail;
                        }
                        if (menu?.path === 'themes' && activeTheme === 'unibiz' && companionActive !== 'false') {
                            return (<a key={menu.path} className="navigation-item" href={`${adminUrl}admin.php?page=gutenverse-companion-dashboard&path=demo`}>
                                {menu.name}
                            </a>);
                        }

                        return <Link
                            index={menu.path}
                            key={menu.path}
                            to={{
                                pathname: pathname,
                                search: param,
                            }}
                            className={`navigation-item ${menu.path === path ? 'active' : ''}`}
                        >
                            {menu.name}
                        </Link>;
                    }

                    return null;
                })}
            </div>
            <div className="header-right">
                <div id="gutenverse-dashboard-notifications" onClick={() => setShowNotification(!showNotifications)}>
                    <div className="notifications-icon" ref={iconRef}>
                        <IconNoticeBellSVG />
                    </div>
                </div>
                {iconRef.current && <div className={`dashboard-notifications ${showNotifications ? 'show' : ''}`} >
                    <TabContent element={iconRef.current} showNotifications={showNotifications}/>
                </div>}
                <ButtonUpgradePro location="dashboard-navigation" isBanner={true} link={`${upgradeProUrl}?utm_source=gutenverse&utm_medium=dashboardnav&utm_client_site=${url}&utm_client_theme=${activeTheme}`} />
            </div>
        </div>
        {injectLocation && createPortal(navigationButton, injectLocation)}
    </>;
};

export default Navigation;
