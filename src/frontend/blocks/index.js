import { u } from '../index';
import { ReplaceCSS } from './replace-css';
import GutenverseElements from './elements';
import GutenverseVideo from './video';
import GutenverseFeaturedBg from './bg-featured-image';

const gutenClasses = {
    ['element']: GutenverseElements,
    ['video-background']: GutenverseVideo,
    ['using-featured-image']: GutenverseFeaturedBg,
};

Object.keys(gutenClasses).map((index) => {
    const selected = u(`.guten-${index}`);
    const ClassItem = gutenClasses[index];

    if (selected) {
        new ClassItem(selected);
    }
});

export default (new ReplaceCSS()).init();