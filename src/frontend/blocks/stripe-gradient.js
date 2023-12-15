import { Default, u, Gradient } from 'gutenverse-core-frontend';

class GutenStripeGradient extends Default {
    /* public */
    init() {
        const elements = this._elements;
        if (elements.length > 0) {
            elements.map(element => {
                this._stripeGradient(element);
            });
        }
    }

    /* private */
    _stripeGradient(element) {
        const data = u(element).data('color');
        const gradientData = data ? JSON.parse(data) : null;

        new Gradient({
            canvas: element,
            colors: gradientData
        });
    }
}

export default GutenStripeGradient;