import { useEffect, useState } from '@wordpress/element';
import { createPortal } from '@wordpress/element';
import { Link } from 'gutenverse-core/router';
import { __ } from '@wordpress/i18n';
import { IconCrownBannerSVG, LogoFullColor31SVG } from 'gutenverse-core/icons';
import { applyFilters } from '@wordpress/hooks';
import isEmpty from 'lodash/isEmpty';
import { ButtonUpgradePro } from 'gutenverse-core/components';

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
                name: __('Theme List', '--gctd--'),
                slug: homeSlug,
                path: 'theme-list',
                priority: 2
            },
            {
                name: __('Blocks', '--gctd--'),
                slug: homeSlug,
                path: 'block-list',
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
                path: 'upgrade-pro',
                priority: 9999
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
            <ButtonUpgradePro isBanner={true} />
        </div>
        {injectLocation && createPortal(navigationButton, injectLocation)}
    </>;
};

export default Navigation;
