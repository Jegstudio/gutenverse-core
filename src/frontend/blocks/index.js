import { u } from 'gutenverse-core-frontend';
import { ReplaceCSS } from './replace-css';
import GutenverseElements from './elements';

const gutenClasses = {
    ['element']: GutenverseElements,
};

Object.keys(gutenClasses).map((index) => {
    const selected = u(`.guten-${index}`);
    const ClassItem = gutenClasses[index];

    if (selected) {
        new ClassItem(selected);
    }
});

( new ReplaceCSS() ).init();