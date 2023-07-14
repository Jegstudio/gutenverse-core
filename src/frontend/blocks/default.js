import { animations } from '../data/animation';
import { devices } from '../data/devices';
import { responsiveBreakpoint } from 'gutenverse-core-frontend/helper';
import isEmpty from 'lodash/isEmpty';

export class Default {
    constructor(elements) {
        if (!elements) {
            return;
        }

        this._elements = elements;
        this.init();
    }

    getAnimationClass(elementObj) {
        let animationClass = null;

        const animationsData = [];
        const animationClasses = [];
        const { tabletBreakpoint, mobileBreakpoint } = responsiveBreakpoint();

        devices.map((device) => {
            const data = animations.map((animation) => {
                return `${device}-${animation}`;
            });

            animationsData.push(...data);
        });

        if (elementObj.hasClass('animated')) {
            animationsData.map((animation) => {
                if (elementObj.hasClass(animation)) {
                    animationClasses.push(animation);
                }
            });

            const check = (device) => animationClasses.filter((name) => name.includes(device));

            // Devices list for responsive animation
            const devices = [];
            if (window.innerWidth <= mobileBreakpoint) {
                devices.push('mobile', 'tablet', 'desktop');
            } else if (window.innerWidth > mobileBreakpoint && window.innerWidth <= tabletBreakpoint) {
                devices.push('tablet', 'desktop');
            } else if (window.innerWidth > mobileBreakpoint) {
                devices.push('desktop');
            }

            // Load animation based on priority (mobile -> tablet -> desktop)
            for (let i = 0; i < devices.length; i++) {
                const result = check(devices[i]);
                if (!isEmpty(result)) {
                    animationClass = result[0];
                    break;
                }
            }

            if (elementObj.hasClass('guten-element-hide') && isEmpty(animationClass)) {
                elementObj.removeClass('guten-element-hide');
            }
        }

        return { animationClass, animationClasses };
    }

    playAnimation(elementObj) {
        const { animationClass, animationClasses } = this.getAnimationClass(elementObj);

        // Load the animation
        if (animationClass) {
            animationClasses.map((name) => elementObj.removeClass(name));
            elementObj.addClass(`__${animationClass}`);
            elementObj.removeClass('guten-element-hide');
        }
    }

    playOnScreen(element, animations) {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting === true) {
                    animations.map((animation) => animation.play());
                }
            },
            { threshold: [0.5] }
        );

        observer.observe(element);
    }

    swiperBreakpoint(breakpoints) {
        const { tabletBreakpoint, mobileBreakpoint } = responsiveBreakpoint();

        const tabletData = { ...breakpoints[768] };
        const desktopData = { ...breakpoints[1024] };

        delete breakpoints[768];
        delete breakpoints[1024];

        breakpoints[parseInt(mobileBreakpoint) + 1] = tabletData;
        breakpoints[parseInt(tabletBreakpoint) + 1] = desktopData;

        return breakpoints;
    }
}
