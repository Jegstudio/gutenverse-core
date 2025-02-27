import { compose } from '@wordpress/compose';
import { useEffect, useState, useRef, RawHTML } from '@wordpress/element';
import {
    withMouseMoveEffect,
    withCopyElementToolbar,
} from 'gutenverse-core/hoc';
import { useBlockProps } from '@wordpress/block-editor';
import { classnames, PostSkeleton, u } from 'gutenverse-core/components';
import { BlockPanelController } from 'gutenverse-core/controls';
import { panelList } from './panels/panel-list';
import apiFetch from '@wordpress/api-fetch';
import { addQueryArgs } from '@wordpress/url';
import { useAnimationEditor, useDisplayEditor } from 'gutenverse-core/hooks';
import { isOnEditor, dummyText } from 'gutenverse-core/helper';
import { useDynamicStyle, useGenerateElementId } from 'gutenverse-core/styling';
import getBlockStyle from './styles/block-style';
import { getDeviceType } from 'gutenverse-core/editor-helper';

const PostBlockBlock = compose(
    // withPartialRender,
    // withCustomStyle(panelList),
    withCopyElementToolbar(),
    // withMouseMoveEffect,
)((props) => {
    const { attributes, clientId, setAttributes } = props;
    const deviceType = getDeviceType();

    const {
        elementId,
        inheritQuery,
        postType,
        postOffset,
        numberPost,
        column,
        breakpoint,
        includePost,
        excludePost,
        includeCategory,
        excludeCategory,
        includeAuthor,
        includeTag,
        excludeTag,
        sortBy,
        htmlTag,
        categoryEnabled,
        categoryPosition,
        excerptEnabled,
        excerptLength,
        excerptMore,
        readmoreEnabled,
        readmoreIcon,
        readmoreIconPosition,
        readmoreText,
        commentEnabled,
        commentIcon,
        commentIconPosition,
        metaEnabled,
        metaAuthorEnabled,
        metaAuthorByText,
        metaAuthorIcon,
        metaAuthorIconPosition,
        metaDateEnabled,
        metaDateType,
        metaDateFormat,
        metaDateFormatCustom,
        metaDateIcon,
        metaDateIconPosition,
        postblockType,
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
        contentOrder
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
        if (numberPost > 0) {
            setPostLoaded(parseInt(numberPost));
        } else {
            setAttributes({
                ...attributes,
                numberPost: 1
            });
        }

    }, [numberPost]);

    useEffect(() => {
        if (postLoaded) {
            u(elementRef.current)
                .find('.guten-block-loadmore')
                .on('click', () => {
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
                            setPage(parseInt(page, 10)); // Convert the page number to an integer and set the page
                        });
                    }
                });
        }
    }, [response]);

    useEffect(() => {
        if (isOnEditor()) {
            setLoading(true);
            elementId &&
                apiFetch({
                    path: addQueryArgs(
                        '/wp/v2/block-renderer/gutenverse/post-block',
                        {
                            context: 'edit',
                            attributes: {
                                elementId,
                                inheritQuery,
                                postType,
                                contentOrder,
                                postOffset,
                                numberPost: ('prevnext' === paginationMode || 'number' === paginationMode) ? numberPost :
                                    parseInt(postLoaded) === parseInt(numberPost)
                                        ? numberPost
                                        : postLoaded,
                                breakpoint,
                                includePost,
                                excludePost,
                                includeCategory,
                                excludeCategory,
                                includeAuthor,
                                includeTag,
                                excludeTag,
                                sortBy,
                                htmlTag,
                                categoryEnabled,
                                categoryPosition,
                                excerptEnabled,
                                excerptLength,
                                excerptMore,
                                readmoreEnabled,
                                readmoreIcon,
                                readmoreIconPosition,
                                readmoreText,
                                commentEnabled,
                                commentIcon,
                                commentIconPosition,
                                metaEnabled,
                                metaAuthorEnabled,
                                metaAuthorByText,
                                metaAuthorIcon,
                                metaAuthorIconPosition,
                                metaDateEnabled,
                                metaDateType,
                                metaDateFormat,
                                metaDateFormatCustom,
                                metaDateIcon,
                                metaDateIconPosition,
                                postblockType,
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
                        },
                    ),
                })
                    .then((data) => {
                        setResponse(data.rendered);
                    })
                    .catch(() => {
                        setResponse('<span>Error</span>');
                    })
                    .finally(() => setLoading(false));
        } else {
            let articles = '';
            for (let i = 0; i < numberPost; i++) {

                const meta = metaEnabled ?
                    `<div class="guten-post-meta">
                        ${metaAuthorEnabled ? `<div class="guten-meta-author icon-position-before">${metaAuthorIconPosition === 'before' ? `<i aria-hidden="true"
                                class="${metaAuthorIcon}"></i>` : ''}<span class="by">${metaAuthorByText}</span> <a href="javascript:void(0);">gutenverse</a>${metaAuthorIconPosition === 'before' ? '' : `<i aria-hidden="true"
                                class="${metaAuthorIcon}"></i>`}
                        </div>` : ''}
                        ${metaDateEnabled ? `<div class="guten-meta-date icon-position-before">${metaDateIconPosition === 'before' ? `<i aria-hidden="true"
                                class="${metaDateIcon}"></i>` : ''}${metaDateFormat === 'ago' ? '3 days ago' : 'January 1, 2024'}${metaDateIconPosition === 'before' ? '' : `<i aria-hidden="true"
                                class="${metaDateIcon}"></i> `}
                        </div>` : ''}
                    </div>` : '';

                const metaBottom = readmoreEnabled || commentEnabled ?
                    `<div class="guten-post-meta-bottom">
                        ${readmoreEnabled ? `<div class="guten-meta-readmore icon-position-after">
                            <a href="javascript:void(0);"
                                ${readmoreIconPosition === 'before' ? 'class="guten-readmore"><i aria-hidden="true" class="fas fa-arrow-right"></i>Read More</a>' : 'class="guten-readmore">Read More<i aria-hidden="true" class="fas fa-arrow-right"></i></a>'}
                        </div>` : ''}
                        ${commentEnabled ? `<div class="guten-meta-comment icon-position-before">
                            <a href="javascript:void(0);" data-href="dummy-data">
                                ${commentIconPosition === 'before' ? '<i aria-hidden="true" class="fas fa-comment"></i><span>0</span>' : '<span>0</span><i aria-hidden="true" class="fas fa-comment"></i>'}
                            </a>
                        </div>` : ''}
                    </div>` : '';

                const excerpt = excerptEnabled ? `<div class="guten-post-excerpt">
                                        <p>${dummyText(10, 20)}${excerptMore ? excerptMore : '...'}</p>
                                    </div>` : '';

                const category = categoryEnabled ?
                    `<div class="guten-post-category ">
                        <span>
                            <a href="javascript:void(0);" class="category-category">category</a>
                        </span>
                    </div>` : '';

                articles += `<article
                                class="guten-post post-${i} post type-post status-publish format-standard has-post-thumbnail hentry category-category tag-tag">
                                <div class="guten-thumb"><a href="javascript:void(0);">
                                        <div class="thumbnail-container ">
                                            <img loading="eager" width="400" height="400"
                                                src="${`https://picsum.photos/400/400?random=${i + 1}`}"
                                                class="attachment-post-thumbnail size-post-thumbnail wp-post-image" alt=""
                                                decoding="async" loading="lazy"
                                                sizes="(max-width: 400px) 100vw, 400px" />
                                            <div class="guten-overlay"></div>
                                        </div>
                                    </a></div>
                                <div class="guten-postblock-content">
                                    ${category}
                                    <h3 class="guten-post-title">
                                        <a href="javascript:void(0);">${dummyText(5, 10)}</a>
                                    </h3>
                                    ${meta}
                                    ${excerpt}
                                    ${metaBottom}
                                </div>
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
            setResponse(`<div class="gutenverse guten-postblock postblock-${postblockType} guten-pagination-prevnext break-point-tablet post-element ${elementId}"
                data-id="${elementId}">
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
        contentOrder,
        postType,
        postOffset,
        postLoaded,
        breakpoint,
        includePost,
        excludePost,
        includeCategory,
        excludeCategory,
        includeAuthor,
        includeTag,
        excludeTag,
        sortBy,
        htmlTag,
        categoryEnabled,
        categoryPosition,
        excerptEnabled,
        excerptLength,
        excerptMore,
        readmoreEnabled,
        readmoreIcon,
        readmoreIconPosition,
        readmoreText,
        commentEnabled,
        commentIcon,
        commentIconPosition,
        metaEnabled,
        metaAuthorEnabled,
        metaAuthorByText,
        metaAuthorIcon,
        metaAuthorIconPosition,
        metaDateEnabled,
        metaDateType,
        metaDateFormat,
        metaDateFormatCustom,
        metaDateIcon,
        metaDateIconPosition,
        postblockType,
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
            'guten-post-block',
            'no-margin',
            elementId,
            animationClass,
            displayClass,
            deviceType.toLowerCase(),
        ),
        ref: elementRef,
    });

    const postSkeletonCondition = () => {
        return column[deviceType] ? (
            <PostSkeleton number={column[deviceType]} />
        ) : (
            <PostSkeleton number={1} />
        );
    };
    return (
        <>
            <BlockPanelController panelList={panelList} props={props} elementRef={elementRef} />
            <div {...blockProps}>
                {!loading ? (
                    <RawHTML key="html" className="guten-raw-wrapper">
                        {response}
                    </RawHTML>
                ) : (
                    postSkeletonCondition()
                )}
            </div>
        </>
    );
});

export default PostBlockBlock;
