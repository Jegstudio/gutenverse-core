import u from 'umbrellajs';
import GutenverseElements from './elements';
import { ReplaceCSS } from './replace-css';

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