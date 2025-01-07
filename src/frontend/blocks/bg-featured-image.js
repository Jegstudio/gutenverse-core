import { Default, u } from 'gutenverse-core-frontend';

class GutenverseFeaturedBg extends Default {
    /* public */
    init() {
        const elements = this._elements;
        if (elements.length > 0) {
            this.useFeaturedImage(elements);

            let currentBreakpoint = null;

            const handleResize = () => {
                const width = window.innerWidth;
                const newBreakpoint = this.determineBreakpoint(width, tablet_breakpoint, mobile_breakpoint);

                if (newBreakpoint !== currentBreakpoint) {
                    currentBreakpoint = newBreakpoint;
                    this.useFeaturedImage(elements);
                }
            };

            const { settingsData } = window['GutenverseConfig'] || window['GutenverseData'] || {};
            const { editor_settings } = settingsData || {};
            const { tablet_breakpoint = 1024, mobile_breakpoint = 767 } = editor_settings || {};

            currentBreakpoint = this.determineBreakpoint(window.innerWidth, tablet_breakpoint, mobile_breakpoint);
            window.addEventListener('resize', handleResize, true);

        }
    }

    determineBreakpoint(width, tabletBreakpoint, mobileBreakpoint) {
        if (width <= mobileBreakpoint) {
            return 'mobile';
        } else if (width <= tabletBreakpoint) {
            return 'tablet';
        } else {
            return 'desktop';
        }
    }

    useFeaturedImage(elements) {
        elements.map(element => {

            const isBgAnimated = u(element).hasClass('background-animated');
            let dataId;
            let wrapper;
            let newElement = element;

            if (element.parentNode.classList.contains('section-wrapper')){
                dataId = u(element).closest('.section-wrapper').data('id');
                wrapper = 'section';
                if (isBgAnimated) {
                    newElement = u(element).find('.animated-layer').first();
                }
            } else if (element.classList.contains('guten-column')) {
                dataId = u(element).find('.guten-column-wrapper').data('id');
                wrapper = 'column';
                if (isBgAnimated) {
                    newElement = u(element).find('.animated-layer').first();
                } else {
                    newElement = u(element).find('.guten-column-wrapper').first();
                }
            } else {
                dataId = u(element).find('.guten-inner-wrap').data('id');
                wrapper = 'flexible';
                if (isBgAnimated) {
                    newElement = u(element).find('.animated-layer').first();
                }
            }
            const styleId = `custom-featured-image-style-${dataId}`;
            const elementClasses = u(element).attr('class');
            const existingStyleElement = document.getElementById(styleId);

            if (existingStyleElement) {
                existingStyleElement.remove();
            }

            const backgroundImage = window.getComputedStyle(newElement).getPropertyValue('background-image');
            const regex = /#gutenFeaturedImage/;
            const hasFeaturedImage = regex.test(backgroundImage);
            const {featuredImage} = window['GutenverseData'];
            let cssSelectors;
            let newSelector;

            if (elementClasses) {
                cssSelectors = elementClasses
                    .split(' ')
                    .filter(cls => cls.trim() !== '')
                    .map(cls => `.${cls}`)
                    .join('');
            }

            switch(wrapper) {
                case 'section':
                    newSelector = `
                        ${cssSelectors}:not(.background-animated),
                        ${cssSelectors}.background-animated > .guten-background-animated .animated-layer`;
                    break;
                case 'column':
                    newSelector = `
                        ${cssSelectors}:not(.background-animated) > .sticky-wrapper > .guten-column-wrapper,
                        ${cssSelectors}.background-animated > .sticky-wrapper > .guten-column-wrapper > .guten-background-animated .animated-layer,
                        ${cssSelectors}:not(.background-animated) > .guten-column-wrapper,
                        ${cssSelectors}.background-animated > .guten-column-wrapper > .guten-background-animated .animated-layer`;
                    break;
                case 'flexible':
                    newSelector = `
                        ${cssSelectors}:not(.background-animated),
                        ${cssSelectors}.background-animated > .guten-inner-wrap > .guten-background-animated .animated-layer`;
                    break;
            }

            if (hasFeaturedImage) {
                let styleElement = document.createElement('style');
                styleElement.id = styleId;
                document.head.appendChild(styleElement);

                const customStyles = `
                    ${newSelector} {
                        background-image: url('${featuredImage}');
                    }
                `;
                styleElement.textContent = customStyles;
            } else if (existingStyleElement) {
                existingStyleElement.remove();
            }
        });
    }
}

export default GutenverseFeaturedBg;