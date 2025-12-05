import { Fragment } from '@wordpress/element';
import { dummyText } from 'gutenverse-core/helper';

const PostBlockColumns = (props) => {
    const {
        postData = [],
        attributes
    } = props;

    const {
        htmlTag = 'h3',
        categoryEnabled,
        categoryPosition,
        excerptEnabled,
        excerptLength = 20,
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
        metaDateIcon,
        metaDateIconPosition,
        postblockType,
        contentOrder = []
    } = attributes;

    const formatDate = (post) => {
        if (!post) return '';
        return post.date || '';
    };

    const trimWords = (text, wordCount) => {
        if (!text) return '';
        const words = text.split(/\s+/);
        if (words.length <= wordCount) return text;
        return words.slice(0, wordCount).join(' ');
    };

    const renderMeta = (post) => {
        if (!metaEnabled) return null;

        return (
            <div className="guten-post-meta">
                {metaAuthorEnabled && (
                    <div className={`guten-meta-author icon-position-${metaAuthorIconPosition}`}>
                        {metaAuthorIconPosition === 'before' && (
                            <i aria-hidden="true" className={metaAuthorIcon}></i>
                        )}
                        <span className="by">{metaAuthorByText}</span>{' '}
                        <a href={'javascript:void(0);'}>
                            {post?.author_name || 'gutenverse'}
                        </a>
                        {metaAuthorIconPosition === 'after' && (
                            <i aria-hidden="true" className={metaAuthorIcon}></i>
                        )}
                    </div>
                )}
                {metaDateEnabled && (
                    <div className={`guten-meta-date icon-position-${metaDateIconPosition}`}>
                        {metaDateIconPosition === 'before' && (
                            <i aria-hidden="true" className={metaDateIcon}></i>
                        )}
                        {formatDate(post)}
                        {metaDateIconPosition === 'after' && (
                            <i aria-hidden="true" className={metaDateIcon}></i>
                        )}
                    </div>
                )}
            </div>
        );
    };

    const renderExcerpt = (post) => {
        if (!excerptEnabled) return null;

        const fullExcerpt = post?.excerpt || dummyText(10, 20);
        const trimmedExcerpt = excerptLength > 0 ? trimWords(fullExcerpt, excerptLength) : fullExcerpt;
        const more = excerptMore || '...';

        return (
            <div className="guten-post-excerpt">
                <p>{trimmedExcerpt}{more}</p>
            </div>
        );
    };

    const renderMetaBottom = (post) => {
        if (!readmoreEnabled && !commentEnabled) return null;

        return (
            <div className="guten-post-meta-bottom">
                {readmoreEnabled && (
                    <div className={`guten-meta-readmore icon-position-${readmoreIconPosition}`}>
                        <a href={'javascript:void(0);'} className="guten-readmore">
                            {readmoreIconPosition === 'before' && (
                                <i aria-hidden="true" className={readmoreIcon}></i>
                            )}
                            {readmoreText}
                            {readmoreIconPosition === 'after' && (
                                <i aria-hidden="true" className={readmoreIcon}></i>
                            )}
                        </a>
                    </div>
                )}
                {commentEnabled && (
                    <div className={`guten-meta-comment icon-position-${commentIconPosition}`}>
                        <a href={'javascript:void(0);'} data-href={post?.comment_url || 'dummy-data'}>
                            {commentIconPosition === 'before' && (
                                <>
                                    <i aria-hidden="true" className={commentIcon}></i>
                                    <span>{post?.comment_count || 0}</span>
                                </>
                            )}
                            {commentIconPosition === 'after' && (
                                <>
                                    <span>{post?.comment_count || 0}</span>
                                    <i aria-hidden="true" className={commentIcon}></i>
                                </>
                            )}
                        </a>
                    </div>
                )}
            </div>
        );
    };

    const renderCategory = (post) => {
        if (!categoryEnabled) return null;

        const position = postblockType === 'type-3' ? `position-${categoryPosition}` : '';
        const category = post?.primary_category || { name: 'category', slug: 'category', url: 'javascript:void(0);' };

        return (
            <div className={`guten-post-category ${position}`}>
                <span>
                    <a href={'javascript:void(0);'} className={`category-${category.slug}`}>
                        {category.name}
                    </a>
                </span>
            </div>
        );
    };

    const renderContent = (post) => {
        let content = [];

        contentOrder.forEach((order, index) => {
            if (order.value === 'title') {
                const HtmlTag = htmlTag;
                content.push(
                    <HtmlTag key={`title-${index}`} className="guten-post-title">
                        <a href={'javascript:void(0);'}>
                            {post?.title || dummyText(5, 10)}
                        </a>
                    </HtmlTag>
                );
            }

            if (order.value === 'meta') {
                content.push(
                    <Fragment key={`meta-${index}`}>
                        {renderMeta(post)}
                    </Fragment>
                );
            }

            if (order.value === 'excerpt') {
                content.push(
                    <Fragment key={`excerpt-${index}`}>
                        {renderExcerpt(post)}
                    </Fragment>
                );
            }

            if (order.value === 'read') {
                content.push(
                    <Fragment key={`read-${index}`}>
                        {renderMetaBottom(post)}
                    </Fragment>
                );
            }
        });

        return content;
    };


    const renderPost = (post, index) => {
        const postClasses = post?.classes || `guten-post post-${index} post type-post status-publish format-standard has-post-thumbnail hentry category-category tag-tag`;
        const category = renderCategory(post);

        return (
            <article key={post?.id || index} className={postClasses}>
                <div className="guten-thumb">
                    <a href={'javascript:void(0);'}>
                        <div className="thumbnail-container">
                            <img
                                loading="eager"
                                width={post?.thumbnail?.width || 400}
                                height={post?.thumbnail?.height || 400}
                                src={post?.thumbnail?.url || `https://picsum.photos/400/400?random=${index + 1}`}
                                className="attachment-post-thumbnail size-post-thumbnail wp-post-image"
                                alt={post?.title || ''}
                                decoding="async"
                                sizes={`(max-width: ${post?.thumbnail?.width || 400}px) 100vw, ${post?.thumbnail?.width || 400}px`}
                            />
                            <div className="guten-overlay"></div>
                        </div>
                    </a>
                    {postblockType === 'type-3' && category}
                </div>
                <div className="guten-postblock-content">
                    {postblockType !== 'type-3' && category}
                    {renderContent(post)}
                </div>
            </article>
        );
    };

    return (
        <div className="guten-posts guten-ajax-flag">
            {postData.length > 0 ? (
                postData.map((post, index) => renderPost(post, index))
            ) : (
                <div className="guten-empty-posts">No posts found</div>
            )}
        </div>
    );
};

export default PostBlockColumns;
