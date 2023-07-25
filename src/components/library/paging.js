import { useEffect } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import classNames from 'classnames';
import throttle from 'lodash/throttle';
import { dispatch } from '@wordpress/data';

const Paging = (props) => {
    const { current, total, scroller } = props;
    const scrollListener = event => {
        let totalHeight = 20;

        Array.prototype.slice.call(event.target.children).map(child => {
            totalHeight += child.offsetHeight;
        });

        let scrollTop = event.target.scrollTop;
        let wrapperHeight = event.target.offsetHeight;
        let totalScroll = scrollTop + wrapperHeight;

        if (current < total && totalScroll + 500 > totalHeight) {
            dispatch( 'gutenverse/library' ).setPaging(current + 1);
        }
    };

    useEffect(() => {
        if (scroller) {
            const debounceOperation = throttle(scrollListener, 100);

            scroller?.current?.addEventListener('scroll', debounceOperation);

            return () => {
                scroller?.current?.removeEventListener('scroll', debounceOperation);
            };
        }
    });

    return current < total ? <div className="gutenverse-paging">
        <div className={classNames('gutenverse-paging-button')} onClick={() => {
            dispatch( 'gutenverse/library' ).setPaging(current + 1);
        }}>
            {__('Load More', '--gctd--')}
        </div>
    </div> : null;
};

export default Paging;