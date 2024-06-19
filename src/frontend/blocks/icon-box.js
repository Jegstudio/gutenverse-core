import { Default, u } from 'gutenverse-core-frontend';

class GutenverseIconBox extends Default {
    /* public */
    init() {
        this._elements.map(element => {
            this._urlItems(element);
        });
    }

    /* private */
    _urlItems(element) {
        const blockElement = u(element);
        const boxWrapper = blockElement.find('.guten-icon-box-wrapper');
        const url = boxWrapper.data('url');
        const linkTarget = boxWrapper.data('link-target') || '_self';
        const rel = boxWrapper.data('rel');

        if (url) {
            blockElement.on('click', (event) => {
                if (!u(event.target).closest('.guten-button').length) {
                    event.preventDefault();
                    window.open(url, linkTarget, rel || '');
                }
            });
        }
    }

}

export default GutenverseIconBox;
