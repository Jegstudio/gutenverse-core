import { u } from '../index';
import { ReplaceCSS } from './replace-css';
import GutenverseElements from './elements';
import GutenverseVideo from './video';
import GutenStripeGradient from './fluid-background';

const gutenClasses = {
    ['element']: GutenverseElements,
    ['video-background']: GutenverseVideo,
    ['fluid-background']: GutenStripeGradient,
};

Object.keys(gutenClasses).map((index) => {
    const selected = u(`.guten-${index}`);
    const ClassItem = gutenClasses[index];

    if (selected) {
        new ClassItem(selected);
    }
});

export default (new ReplaceCSS()).init();