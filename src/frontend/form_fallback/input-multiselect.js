import { Default } from 'gutenverse-core-frontend';
import { u } from 'gutenverse-core-frontend';
import { Choices } from 'gutenverse-core-frontend';

class GutenverseMultiInputSelect extends Default {
    /* public */
    init() {
        this.choiceInstance = null;
        this._elements.map(element => {
            this._selectItems(element);
        });
        this.placeholder = '';
    }

    _selectItems(element) {
        const selects = u(element).find('.gutenverse-input-multiselect');
        selects.map(select => {
            this.choiceInstance = new Choices(select, {
                removeItemButton: true,
                shouldSort: false,
                placeholder: false
            });
            select.addEventListener(
                'change',
                function(event) {
                    if( event.target.length > 0 ){
                        let placeholderInput = u(element).find('.choices__input.choices__input--cloned');
                        this.placeholder = placeholderInput.nodes[0].placeholder;
                        placeholderInput.nodes[0].placeholder = '';
                    }
                }
            );
        });
    }

    destroy() {
        this.choiceInstance.destroy();
    }
}

export default GutenverseMultiInputSelect;

let { activePlugins } = window['GutenverseData'];

if( !activePlugins.includes('gutenverse-form/gutenverse-form.php' )){
    const selected = u('.guten-form-input-multiselect');

    if (selected) {
        new GutenverseMultiInputSelect(selected);
    }
}
