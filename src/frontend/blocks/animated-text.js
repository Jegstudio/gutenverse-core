import { Default, u } from 'gutenverse-core-frontend';
import { AnimationStyle } from '../components/animated-text/animation-style';
import { HighlightStyle } from '../components/animated-text/highlight-style';
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

        if (animationProps.textType !== 'highlighted') {
            const animation = new AnimationStyle(thisElement, animationProps);
            animation.run();
        } else {
            const highlight = new HighlightStyle(thisElement, animationProps);
            highlight.run();
        }
    }
}

export default GutenverseAnimatedText;