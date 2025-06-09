import { Default, u } from 'gutenverse-core-frontend';

class GutenversePostComment extends Default {
    /* public */
    init() {
        this._elements.map(element => {
            this._postComment(element);
        });
    }

    _postComment(element) {
        const commentList = u(element).find('.commentlist').data('settings');
        const settings = commentList && JSON.parse(commentList);
        const {enableSuffix, suffixMain, suffixReply} = settings;

        if(!enableSuffix) this._removeSuffix(element);

        const mainSuffix = u(element).find('.says:not(.children .says)');
        mainSuffix.each(function(el, index) {
            el.textContent = suffixMain;
        });

        const replySuffix = u(element).find('.children .says');
        replySuffix.each(function(el, index) {
            el.textContent = suffixReply;
        });
    }

    _removeSuffix(element) {
        u(element).find('.says').remove();
    }
}

export default GutenversePostComment;