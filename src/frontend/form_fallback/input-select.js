import { Default, u } from 'gutenverse-core-frontend';
import { Choices } from 'gutenverse-core-frontend';

class GutenverseInputSelect extends Default {
    /* public */
    init() {
        this.choiceInstance = null;
        this._elements.map(element => {
            this._selectItems(element);
        });
    }

    _selectItems(element) {
        const selects = u(element).find('.gutenverse-input-select');
        selects.map(select => {
            this.choiceInstance = new Choices(select, {
                removeItemButton: true,
                shouldSort: false,
            });
        });
    }

    destroy() {
        this.choiceInstance.destroy();
    }
}

export default GutenverseInputSelect;

let { activePlugins } = window['GutenverseData'];

if( !activePlugins.includes('gutenverse-form/gutenverse-form.php' )){
    const selected = u('.guten-form-input-select');

    if (selected) {
        new GutenverseInputSelect(selected);
    }
}
