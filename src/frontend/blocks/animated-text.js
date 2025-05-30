import { Default, u } from 'gutenverse-core-frontend';
import { AnimationStyle } from '../components/animated-text/animation-style';
class GutenverseAnimatedText extends Default {
    /* public */
    init() {
        this._elements.map(element => {
            this._loadAnimation(element);
        });
    }

    /* private */
    _loadAnimation(element) {
        const thisElement = u(element);
        const animationProps = JSON.parse(thisElement.data('animation'));

        if (animationProps.textType !== 'highlight') {
            const animation = new AnimationStyle(thisElement, animationProps);
            animation.run();
        } else {
            console.log('test');
        }
    }
}

export default GutenverseAnimatedText;