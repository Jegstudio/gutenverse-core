import anime from 'animejs';
import { Default, u } from 'gutenverse-core-frontend';

class GutenverseFunFact extends Default {
    /* public */
    init() {
        this._elements.map(element => {
            this._addAnimation(element);
        });
    }

    /* private */
    _addAnimation(element) {
        const targetElement = u(element).find('.number');
        const number = targetElement.data('number');
        const duration = targetElement.data('duration');

        const isValidNumber = /^-?\d+(\.\d+)?$/.test(number);
        if (!isValidNumber) {
            targetElement.first().textContent = 'Invalid number';
            return;
        }

        const parsedNumber = parseFloat(number);

        const numberAnimation = anime({
            targets: targetElement.first(),
            innerHTML: parsedNumber,
            easing: 'easeInOutQuart',
            round: 1,
            duration,
            autoplay: false
        });

        this.playOnScreen(element, [numberAnimation]);
    }
}
export default GutenverseFunFact;