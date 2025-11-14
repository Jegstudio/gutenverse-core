import { Default } from 'gutenverse-core-frontend';
import flatpickr from 'flatpickr';
import { u } from 'gutenverse-core-frontend';

class GutenverseInputDate extends Default {
    /* public */
    init() {
        this._elements.map(element => {
            this._dateItems(element);
        });
    }

    _dateItems(element) {
        u(element).find('.gutenverse-input').map(element => {
            this.__createDate(element);
        });
    }

    __createDate(element) {
        const setting = JSON.parse(u(element).data('date'));
        setting.disableMobile = 'true';
        flatpickr(element, setting);
    }
}

export default GutenverseInputDate;

let { activePlugins } = window['GutenverseData'];

if( !activePlugins.includes('gutenverse-form/gutenverse-form.php' )){
    const selected = u('.guten-form-input-date');

    if (selected) {
        new GutenverseInputDate(selected);
    }
}
