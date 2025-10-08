import { Default, u } from 'gutenverse-core-frontend';

class GutenverseNavMenu extends Default {
    /* public */
    init() {
        this._elements.map(element => {
            this._init(element);
        });
    }

    /* private */
    _init(element) {
        const wrapper = u(element);
        const item = {
            wrapper: wrapper,
            openToggle: wrapper.find('.gutenverse-hamburger-menu'),
            closeToggle: wrapper.find('.gutenverse-close-menu'),
            container: wrapper.find('.gutenverse-menu-wrapper'),
            menuDropdown: wrapper.find('li.menu-item-has-children > a'),
            singleMenu: wrapper.find('li.menu-item:not(.menu-item-has-children)'),
            overlay: wrapper.find('.guten-nav-overlay'),
            hasChildren: wrapper.find('li.menu-item-has-children'),
        };
        this.__handleAnchor(element);
        this._firstLoad(item);
    }

    _firstLoad(item) {
        this._addBodyClass();
        this._addDropdownIcon(item);
        this._toggleMenu(item);
    }

    _addBodyClass() {
        u('html').addClass('gutenverse-nav-menu-loaded');
    }

    _addDropdownIcon(item) {
        const indicator = item.wrapper.data('item-indicator');
        item.menuDropdown.each(node => {
            u(node).find('i').remove();
            u(node).append(`<i class='${indicator}'></i>`);
        });
    }

    _handleSubMenuOverflow(element) {
        const item = element;
        const rect = item.getBoundingClientRect();
        const viewportWidth = window.innerWidth;
        const leftVal = window.getComputedStyle(item).left;

        if (rect.right > viewportWidth){
            if (leftVal === '0px') {
                u(item).attr('style', 'left: -120%;');
                return;
            }
            u(item).attr('style', 'left: auto; right: 100%;');
        }
    }

    _toggleMenu(item) {
        item.hasChildren.map((item) => {
            this._handleSubMenuOverflow(u(item).find('.sub-menu').first());
        });
        item.openToggle.off('click').on('click', function () {
            if (item.container.hasClass('active')) {
                item.container.removeClass('active');
            } else {
                item.container.addClass('active');
            }

            if (item.overlay.hasClass('active')) {
                item.overlay.removeClass('active');
                item.overlay.addClass('exiting');
            } else {
                item.overlay.addClass('active');
                item.overlay.removeClass('exiting');
            }
        });

        item.closeToggle.on('click', function () {
            item.container.removeClass('active');

            if (item.overlay.hasClass('active')) {
                item.overlay.addClass('exiting');
            }
            item.overlay.removeClass('active');

        });

        if (item.wrapper.hasClass('submenu-click-title')) {
            item.menuDropdown.on('click', function (e) {
                const screenWidth = window.innerWidth;
                if (item.wrapper.hasClass('break-point-mobile') && screenWidth <= 425) {
                    e.preventDefault();
                } else if (item.wrapper.hasClass('break-point-tablet') && screenWidth <= 780) {
                    e.preventDefault();
                }
                toggleSubmenu(u(this).siblings('.sub-menu'));
            });
        }

        const dropdownToggle = item.wrapper.find('li.menu-item-has-children > a i');
        dropdownToggle.on('click', function (e) {
            e.preventDefault();
            e.stopPropagation();
            toggleSubmenu(u(this).parent('a').siblings('.sub-menu'));
        });

        function toggleSubmenu(submenu) {
            submenu.toggleClass('dropdown-open');
        }

        if ( parseInt( item.wrapper.data('close-on-click') ) === 1 ) {
            item.singleMenu.on('click', function () {
                item.container.removeClass('active');
                item.overlay.removeClass('active');
            });
        }
    }
    __normalizeUrl(url){
        return url.endsWith('/') ? url.slice(0, -1) : url;
    }
    __removingClass(element, currentUrl){
        let menuLinks = u(element).find('.gutenverse-menu a');
        menuLinks.each(link => {
            const parentLi = u(link).closest('li');
            if (this.__normalizeUrl(link.href) !== currentUrl) {
                parentLi.removeClass('current-menu-item');
            }else{
                parentLi.addClass('current-menu-item');
            }
        });
    }
    __handleAnchor(element){
        let currentUrl = this.__normalizeUrl(window.location.href);
        this.__removingClass(element, currentUrl);
        window.addEventListener('popstate', () => {
            currentUrl = this.__normalizeUrl(window.location.href);
            this.__removingClass(element, currentUrl);
        });
    }
}
export default GutenverseNavMenu;