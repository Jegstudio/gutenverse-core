import { useEffect, useState } from '@wordpress/element';
import { createPortal } from '@wordpress/element';
import { Link } from 'gutenverse-core/router';
import { __ } from '@wordpress/i18n';
import { LogoFullColor31SVG } from 'gutenverse-core/icons';
import { applyFilters } from '@wordpress/hooks';
import isEmpty from 'lodash/isEmpty';

const Navigation = ({ location }) => {
    const {
        homeSlug,
        pluginVersions,
    } = window['GutenverseDashboard'];

    const [injectLocation, setInjectLocation] = useState(null);
    const { pathname, search } = location;
    const query = new URLSearchParams(search);
    const path = query.get('path') ? query.get('path') : '';

    const menus = applyFilters(
        'gutenverse.dashboard.route.navigation',
        [
            {
                name: __('Dashboard', 'gutenverse'),
                slug: homeSlug,
                path: '',
                priority: 0
            },
            {
                name: __('Ecosystem', 'gutenverse'),
                slug: homeSlug,
                path: 'ecosystem',
                priority: 1
            },
            {
                name: __('Theme List', 'gutenverse'),
                slug: homeSlug,
                path: 'theme-list',
                priority: 2
            },
            {
                name: __('Blocks', 'gutenverse'),
                slug: homeSlug,
                path: 'block-list',
                priority: 3
            },
            {
                name: __('Settings', 'gutenverse'),
                slug: homeSlug,
                path: 'settings',
                priority: 4
            },
            {
                name: __('System Status', 'gutenverse'),
                slug: homeSlug,
                path: 'system',
                priority: 5
            },
            !isEmpty(pluginVersions) && {
                name: __('Update Notice', 'gutenverse'),
                slug: homeSlug,
                path: 'update-notice',
                priority: 100
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
    }, []);

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
                    <Link
                        index={`${menu.path}`}
                        to={{
                            pathname: pathname,
                            search: param,
                        }}
                    >
                        {menu.name}
                    </Link>
                </li>;
            } else {
                return null;
            }
        })}
    </>;

    return <>
        <div className="navigation-wrapper">
            <div className="plugin-logo">
                <LogoFullColor31SVG />
            </div>
            <div className="navigation-items">
                {menus.map((menu) => {
                    if (menu) {
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
                    } else {
                        return null;
                    }
                })}
            </div>
            <div className="whats-new"></div>
        </div>
        {injectLocation && createPortal(navigationButton, injectLocation)}
    </>;
};

export default Navigation;
