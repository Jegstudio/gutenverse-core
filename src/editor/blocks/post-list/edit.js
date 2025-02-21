import { compose } from '@wordpress/compose';
import { useEffect, useState } from '@wordpress/element';
import { withMouseMoveEffect } from 'gutenverse-core/hoc';
import { useBlockProps } from '@wordpress/block-editor';
import { classnames } from 'gutenverse-core/components';
import { BlockPanelController } from 'gutenverse-core/controls';
import { panelList } from './panels/panel-list';
import apiFetch from '@wordpress/api-fetch';
import { addQueryArgs } from '@wordpress/url';
import { RawHTML } from '@wordpress/element';
import { PostListSkeleton, u } from 'gutenverse-core/components';
import { useRef } from '@wordpress/element';
import { withCopyElementToolbar } from 'gutenverse-core/hoc';
import { useAnimationEditor } from 'gutenverse-core/hooks';
import { useDisplayEditor } from 'gutenverse-core/hooks';
import { isOnEditor, dummyText } from 'gutenverse-core/helper';
import { useDynamicStyle, useGenerateElementId } from 'gutenverse-core/styling';
import getBlockStyle from './styles/block-style';

const PostListBlock = compose(
    withCopyElementToolbar(),
    withMouseMoveEffect
)((props) => {
    const {
        attributes,
        clientId
    } = props;

    const {
        elementId,
        inheritQuery,
        postType,
        postOffset,
        numberPost,
        includePost,
        excludePost,
        includeCategory,
        excludeCategory,
        includeAuthor,
        includeTag,
        excludeTag,
        sortBy,
        layout,
        imageEnabled,
        backgroundImageEnabled,
        iconEnabled,
        icon,
        metaEnabled,
        metaDateEnabled,
        metaDateType,
        metaDateFormat,
        metaDateFormatCustom,
        metaDateIcon,
        metaDateIconPosition,
        metaCategoryEnabled,
        metaCategoryIcon,
        metaPosition,
        paginationMode,
        paginationLoadmoreText,
        paginationLoadingText,
        paginationNumberPost,
        paginationScrollLimit,
        paginationIcon,
        paginationIconPosition,
        paginationPrevNextText,
        paginationPrevText,
        paginationNextText,
        paginationPrevIcon,
        paginationNextIcon,
    } = attributes;

    const animationClass = useAnimationEditor(attributes);
    const displayClass = useDisplayEditor(attributes);
    const [response, setResponse] = useState(null);
    const [loading, setLoading] = useState(true);
    const [postLoaded, setPostLoaded] = useState(0);
    const [page, setPage] = useState(1);
    const elementRef = useRef();

    useGenerateElementId(clientId, elementId, elementRef);
    useDynamicStyle(elementId, attributes, getBlockStyle, elementRef);

    useEffect(() => {
        setPostLoaded(parseInt(numberPost));
    }, [numberPost]);

    useEffect(() => {
        if (postLoaded) {
            u(elementRef.current).find('.guten-block-loadmore').on('click', () => {
                setPostLoaded(postLoaded + parseInt(paginationNumberPost));
            });
            u(elementRef.current)
                .find('.btn-pagination.next:not(.disabled)')
                .on('click', () => {
                    setPage(page + 1);
                });
            u(elementRef.current)
                .find('.btn-pagination.prev:not(.disabled)')
                .on('click', () => {
                    setPage(page - 1);
                });
            u(elementRef.current)
                .find('.btn-pagination')
                .each((el) => {
                    const page = el.getAttribute('data-page');
                    if (page) {
                        u(el).on('click', () => {
                            setPage(parseInt(page, 10));
                        });
                    }
                });
        }
    }, [response]);

    useEffect(() => {
        if (isOnEditor()) {
            setLoading(true);

            elementId && apiFetch({
                path: addQueryArgs('/wp/v2/block-renderer/gutenverse/post-list', {
                    context: 'edit',
                    attributes: {
                        elementId,
                        inheritQuery,
                        postType,
                        postOffset,
                        numberPost: ('prevnext' === paginationMode || 'number' === paginationMode) ? numberPost :
                            parseInt(postLoaded) === parseInt(numberPost)
                                ? numberPost
                                : postLoaded,
                        includePost,
                        excludePost,
                        includeCategory,
                        excludeCategory,
                        includeAuthor,
                        includeTag,
                        excludeTag,
                        sortBy,
                        imageEnabled,
                        backgroundImageEnabled,
                        iconEnabled,
                        icon,
                        metaEnabled,
                        metaDateEnabled,
                        metaDateType,
                        metaDateFormat,
                        metaDateFormatCustom,
                        metaDateIcon,
                        metaDateIconPosition,
                        metaCategoryEnabled,
                        metaCategoryIcon,
                        metaPosition,
                        paginationMode,
                        paginationLoadmoreText,
                        paginationLoadingText,
                        paginationNumberPost: ('prevnext' === paginationMode || 'number' === paginationMode) ? numberPost : paginationNumberPost,
                        paginationScrollLimit,
                        paginationIcon,
                        paginationIconPosition,
                        paginationPrevNextText,
                        paginationPrevText,
                        paginationNextText,
                        paginationPrevIcon,
                        paginationNextIcon,
                        editParam: {
                            page
                        }
                    },
                }),
            }).then((data) => {
                setResponse(data.rendered);
            }).catch(() => {
                setResponse('<span>Error</span>');
            }).finally(() => setLoading(false));
        } else {
            let articles = '';
            for (let i = 0; i < numberPost; i++) {
                const bg = backgroundImageEnabled ? `style="background-image: url(${`https://picsum.photos/400/400?random=${i + 1}`})"` : '';

                const img = imageEnabled ? `<img loading="eager" width="400" height="400"
                        src="${`https://picsum.photos/400/400?random=${i + 1}`}"
                        class="attachment-post-thumbnail size-post-thumbnail wp-post-image" alt=""
                        decoding="async" loading="lazy"
                        sizes="(max-width: 400px) 100vw, 400px" />` : '';

                const meta = metaEnabled ? `<div class="meta-lists">
                                        ${metaDateEnabled ? `<span class="meta-date">
                                        ${metaDateIconPosition === 'before' ? `<i aria-hidden="true"
                                        class="${metaDateIcon}"></i>` : ''} &nbsp;${metaDateFormat === 'ago' ? '3 days ago' : 'January 1, 2024'}${metaDateIconPosition === 'before' ? '' : `<i aria-hidden="true"
                                        class="${metaDateIcon}"></i> `}
                                        </span>` : ''}
                                        ${metaCategoryEnabled ? `<span class="meta-category">
                                            <i aria-hidden="true" class="${metaCategoryIcon}"></i> Categorized
                                        </span>` : ''}
                                    </div>` : '';

                articles += `<article class="guten-post post-list-item">
                            <a href="javascript:void(0);" ${bg}>
                                ${img}
                                <div class="guten-postlist-content">
                                    ${meta}
                                    <span class="guten-postlist-title">${dummyText(5, 10)}</span>
                                </div>
                            </a>
                        </article>`;
            }
            let pagination = '';
            switch (paginationMode) {
                default:
                    pagination = '';
                    break;
                case 'loadmore':
                    pagination =
                        `<div class="guten-block-pagination guten-align">
                        <div class="guten-block-loadmore icon-position-before"><span data-load="Load More" data-loading="Loading..."> ${paginationLoadmoreText}</span></div>
                    </div>`;
                    break;
                case 'prevnext':
                    pagination =
                        `<div class="guten_block_nav additional_class" data-page="1">
                        <a href="javascript:void(0);" data-href="#" class="btn-pagination prev disabled" title="Prev">
                            <i class="${paginationPrevIcon}"></i> ${paginationPrevNextText ? paginationPrevText : ''}
                        </a>
                        <a href="javascript:void(0);" data-href="#" class="btn-pagination next " title="Next">
                            ${paginationPrevNextText ? paginationNextText : ''}  <i class="${paginationNextIcon}"></i>
                        </a>
                    </div>`;
                    break;
                case 'number':
                    pagination =
                        `<div class="guten_block_nav" data-page="4">
                        <a href="javascript:void(0);" data-href="#" class="btn-pagination prev" title="Prev">
                            <i class="${paginationPrevIcon}"></i> ${paginationPrevNextText ? paginationPrevText : ''}
                        </a>
                        <a href="javascript:void(0);" data-href="#" class="btn-pagination" data-page="1">1</a>
                        <span>...</span>
                        <a href="javascript:void(0);" data-href="#" class="btn-pagination" data-page="3">3</a>
                        <span class="btn-pagination current">4</span>
                        <a href="javascript:void(0);" data-href="#" class="btn-pagination" data-page="5">5</a>
                        <span>...</span>
                        <a href="javascript:void(0);" data-href="#" class="btn-pagination" data-page="99">99</a>
                        <a href="javascript:void(0);" data-href="#" class="btn-pagination next" title="Next">
                            ${paginationPrevNextText ? paginationNextText : ''}  <i class="${paginationNextIcon}"></i>
                        </a>
                    </div>`;
                    break;
            }
            setResponse(`<div class="gutenverse guten-postlist layout-vertical post-element guten-pagination-disable ${elementId}"
                data-id="${elementId}"></div>
                <div class="guten-block-container">
                    <div class="guten-posts guten-ajax-flag">
                        ${articles}
                    </div>
                </div>
                ${pagination}
            </div>`);
            setLoading(false);
        }

    }, [
        elementId,
        postType,
        postOffset,
        postLoaded,
        includePost,
        excludePost,
        includeCategory,
        excludeCategory,
        includeAuthor,
        includeTag,
        excludeTag,
        sortBy,
        imageEnabled,
        backgroundImageEnabled,
        iconEnabled,
        icon,
        metaEnabled,
        metaDateEnabled,
        metaDateType,
        metaDateFormat,
        metaDateFormatCustom,
        metaDateIcon,
        metaDateIconPosition,
        metaCategoryEnabled,
        metaCategoryIcon,
        metaPosition,
        paginationMode,
        paginationLoadmoreText,
        paginationLoadingText,
        paginationNumberPost,
        paginationScrollLimit,
        paginationIcon,
        paginationIconPosition,
        paginationPrevNextText,
        paginationPrevText,
        paginationNextText,
        paginationPrevIcon,
        paginationNextIcon,
        page
    ]);

    const blockProps = useBlockProps({
        className: classnames(
            'guten-element',
            'guten-post-list',
            'no-margin',
            elementId,
            animationClass,
            displayClass,
            [`layout-${layout}`],
        ),
        ref: elementRef
    });

    return <>
        <BlockPanelController panelList={panelList} props={props} elementRef={elementRef} />
        <div  {...blockProps}>
            {!loading ? <RawHTML key="html" className="guten-raw-wrapper">
                {response}
            </RawHTML> : <PostListSkeleton />}
        </div>
    </>;
});

export default PostListBlock;