import { Default, u } from 'gutenverse-core-frontend';

class GutenFluidBackground extends Default {
    /* public */
    init() {
        const elements = this._elements;
        if (elements.length > 0) {
            const promiseFluidBackground = import(/* webpackChunkName: "chunk-fluid" */'gutenverse-fluid-background');
            Promise.all([promiseFluidBackground])
                .then((result) => {
                    const { default: Gradient } = result[0];
                    elements.map(element => {
                        this._fluidBackground(element, Gradient);
                    });
                });
        }
    }

    /* private */
    _fluidBackground(element, Gradient) {
        const data = u(element).data('color');
        const gradientData = data ? JSON.parse(data) : null;

        new Gradient({
            canvas: element,
            colors: gradientData
        });
    }
}

export default GutenFluidBackground;