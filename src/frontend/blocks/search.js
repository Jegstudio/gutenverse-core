import { Default, u } from 'gutenverse-core-frontend';

class GutenverseSearch extends Default {
    /* public */
    init() {
        this._elements.map(element => {
            this.__addActionToForm(element);
        });
    }

    /* private */
    __addActionToForm(element){
        const form = u(element).find('.gutenverse-search-form');
        form.attr('action', window.location.origin);
    }
}
export default GutenverseSearch;