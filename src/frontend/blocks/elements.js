import u from 'umbrellajs';
import { Default } from 'gutenverse-core-frontend';

class GutenverseElements extends Default {
    init() {
        this._elements.map(element => {
            this.playAnimationOnView(element);
        });
    }

    playAnimationOnView(element) {
        /**
         * Don't use IntersectionObserver class to load animation, because the threshold can cause bug.
         * Threshold only count the % of element's height that currently visible on the viewport.
         */
        let elementObj = u(element);

        if (elementObj.hasClass('guten-button-wrapper')) {
            elementObj = u(element).find('.guten-button');
        }

        const { animationClass, animationClasses } = this.getAnimationClass(elementObj);

        // Load the animation
        if (animationClass) {
            const playAnimation = () => {
                /**
                 * VAR
                 * reachTrigger : when element's top touch the 75% mark of window's height
                 * atTheBottom : when element is at the bottom and cannot reach 75% mark, trigger it anyway
                 */
                const reachTrigger = element.getBoundingClientRect().top > 0 && element.getBoundingClientRect().top <= (window.innerHeight * 0.75);
                const atTheBottom = element.getBoundingClientRect().top > 0 && (window.innerHeight + Math.ceil(window.pageYOffset)) >= (document.body.offsetHeight - (window.innerHeight * 0.25));

                if (reachTrigger || atTheBottom) {
                    animationClasses.map(name => elementObj.removeClass(name));
                    elementObj.addClass(`__${animationClass}`);

                    // because "animation-fill-mode:both" css is removed, we need to show the element after delay is expired
                    elementObj.first().addEventListener('animationstart', (e) => {
                        e.stopPropagation();
                        elementObj.removeClass('guten-element-hide');
                    });

                    elementObj.first().addEventListener('animationend', (e) => {
                        e.stopPropagation();
                        elementObj.removeClass('animated');
                    });
                }
            };

            window.addEventListener('load', playAnimation);
            window.addEventListener('scroll', playAnimation);
        }
    }
}

export default GutenverseElements;