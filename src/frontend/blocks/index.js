import { u } from '../index';
import { ReplaceCSS } from './replace-css';
import GutenverseElements from './elements';
import GutenverseVideo from './video';
<<<<<<< HEAD
import GutenverseSlideshow from './slideshow';
=======
import GutenverseFeaturedBg from './bg-featured-image';
>>>>>>> main

const gutenClasses = {
    ['element']: GutenverseElements,
    ['video-background']: GutenverseVideo,
<<<<<<< HEAD
    ['background-slideshow']: GutenverseSlideshow,
=======
    ['using-featured-image']: GutenverseFeaturedBg,
>>>>>>> main
};

Object.keys(gutenClasses).map((index) => {
    const selected = u(`.guten-${index}`);
    const ClassItem = gutenClasses[index];

    if (selected) {
        new ClassItem(selected);
    }
});

export default (new ReplaceCSS()).init();