import { useEffect, useRef, useState } from '@wordpress/element';
import { createPortal } from '@wordpress/element';
import { Link } from 'gutenverse-core/router';
import { __ } from '@wordpress/i18n';
import { IconCrownBannerSVG, IconNoticeBellSVG, LogoFullColor31SVG } from 'gutenverse-core/icons';
import { applyFilters } from '@wordpress/hooks';
import isEmpty from 'lodash/isEmpty';
import { ButtonUpgradePro, CheckSquare } from 'gutenverse-core/components';

// @since v3.2.0
const NotificationList = ({ readNotifications, setReadNotifications, notifTotal, setNotifTotal, notificationList }) => {
    let content = [];

    if (!isEmpty(notificationList)) {
        const uniqueNotifications = [
            ...new Map(
                notificationList
                    .filter(notification => notification.show)
                    .map(n => [n.id, n]) // key = id, value = notification
            ).values()
        ];
        content = uniqueNotifications
            .map(notification => {
                const { id, content } = notification;

                const isNew = !readNotifications.includes(id);

                const markAsRead = () => {
                    if (isNew) {
                        setReadNotifications([
                            ...readNotifications,
                            id
                        ]);
                        setNotifTotal(notifTotal - 1);
                    }
                };

                return <div key={id} className="gutenverse-notification-wrapper" onMouseEnter={markAsRead}>
                    {isNew && <span className="notification-new"></span>}
                    {content}
                </div>;
            });
    }

    const markAllRead = () => {
        const ids = [];
        notificationList.map(({ id, show }) => {
            if (show && !readNotifications.includes(id)) ids.push(id);
        });
        setReadNotifications([
            ...readNotifications,
            ...ids
        ]);
        setNotifTotal(0);
    };

    return <>
        <div className="notification-title">
            <h3>{__('Notification Center', '--gctd--')}</h3>
            <div className="mark-read" onClick={markAllRead}>
                <CheckSquare size={16} />
            </div>
        </div>
        <div className="notification-list">
            {!isEmpty(content) ? content : <p className="notification-empty">{__('There is no Notifications', '--gctd--')}</p>}
        </div>
    </>;
};

const Navigation = ({ location }) => {
    const {
        homeSlug,
        pluginVersions,
        upgradeProUrl,
        activeTheme,
        url,
        showThemeList
    } = window['GutenverseDashboard'];

    const localStorageKey = 'gutenverse_read_notifications';
    const [readNotifications, setReadNotifications] = useState(JSON.parse(localStorage.getItem(localStorageKey)) || []);
    const [injectLocation, setInjectLocation] = useState(null);
    const [showNotifications, setShowNotification] = useState(false);
    const [notifTotal, setNotifTotal] = useState(0);
    const notificationRef = useRef();
    const { pathname, search } = location;
    const query = new URLSearchParams(search);
    const path = query.get('path') ? query.get('path') : '';

    useEffect(() => {
        localStorage.setItem(localStorageKey, JSON.stringify(readNotifications));
    }, [readNotifications]);

    const notificationList = applyFilters(
        'gutenverse.notification.list',
        [],
        null
    );

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
            // !isEmpty(showThemeList) && {
            //     name: __('Theme List', '--gctd--'),
            //     slug: homeSlug,
            //     path: 'theme-list',
            //     priority: 2
            // },
            {
                name: __('Blocks', '--gctd--'),
                slug: homeSlug,
                path: 'block-list',
                priority: 2
            },
            activeTheme !== 'unibiz' && {
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
                link: `https://gutenverse.com/pro?utm_source=gutenverse&utm_medium=adminmenu&utm_client_site=${url}&utm_client_theme=${activeTheme}`,
                priority: 9999,
                external: true,
            },
        ],
        homeSlug
    );

    menus.sort((a, b) => a.priority - b.priority);

    useEffect(() => {
        const submenu = document.querySelector('#toplevel_page_gutenverse > ul');
        const list = submenu.getElementsByTagName('li');
        Array.from(list).forEach(item => {
            item.remove();
        });

        let total = notifTotal;
        notificationList.map(({ id, show }) => {
            if (show && !readNotifications.includes(id)) total++;
        });
        setNotifTotal(total);
    }, []);

    useEffect(() => {
        function handleClickOutside(event) {
            if (notificationRef.current && !notificationRef.current.contains(event.target)) {
                setShowNotification(false);
            }
        }

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [notificationRef]);

    setTimeout(() => {
        let injectLocation = document.querySelector('#toplevel_page_gutenverse .wp-submenu');
        setInjectLocation(injectLocation);
    }, 1);

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
                    <IconNoticeBellSVG />
                    {notifTotal > 0 && <div className="notification-total">{notifTotal}</div>}
                </div>
                {showNotifications && <div className="dashboard-notifications" ref={notificationRef}>
                    <NotificationList
                        readNotifications={readNotifications}
                        setReadNotifications={setReadNotifications}
                        notifTotal={notifTotal}
                        setNotifTotal={setNotifTotal}
                        notificationList={notificationList} />
                </div>}
                <ButtonUpgradePro location="dashboard-navigation" isBanner={true} link={`${upgradeProUrl}?utm_source=gutenverse&utm_medium=dashboardnav&utm_client_site=${url}&utm_client_theme=${activeTheme}`} />
            </div>
        </div>
        {injectLocation && createPortal(navigationButton, injectLocation)}
    </>;
};

export default Navigation;
