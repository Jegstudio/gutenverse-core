import { compose } from '@wordpress/compose';
import { useEffect, useState } from '@wordpress/element';
import { withCustomStyle } from 'gutenverse-core/hoc';
import { useBlockProps } from '@wordpress/block-editor';
import classnames from 'classnames';
import { PanelController } from 'gutenverse-core/controls';
import { panelList } from './panels/panel-list';
import apiFetch from '@wordpress/api-fetch';
import { addQueryArgs } from '@wordpress/url';
import { RawHTML } from '@wordpress/element';
import { PostSkeleton } from 'gutenverse-core/components';
import { u } from 'umbrellajs';
import { useRef } from '@wordpress/element';
import { withCopyElementToolbar } from 'gutenverse-core/hoc';
import { useAnimationEditor } from 'gutenverse-core/hooks';
import { useDisplayEditor } from 'gutenverse-core/hooks';
import { canRenderTransform } from 'gutenverse-core/styling';

const PostBlockBlock = compose(
    withCustomStyle(panelList),
    withCopyElementToolbar()
)((props) => {
    const {
        attributes,
        deviceType,
        setElementRef
    } = props;

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
        transform
    } = attributes;

    const animationClass = useAnimationEditor(attributes);
    const displayClass = useDisplayEditor(attributes);
    const [response, setResponse] = useState(null);
    const [loading, setLoading] = useState(true);
    const [postLoaded, setPostLoaded] = useState(0);
    const postBlockRef = useRef();
    const [theTransform, setTheTransform] = useState(false);

    useEffect(() => {
        setTheTransform(canRenderTransform(transform));
    }, [transform]);

    useEffect(() => {
        if (postBlockRef.current) {
            setElementRef(postBlockRef.current);
        }
    }, [postBlockRef]);

    useEffect(() => {
        setPostLoaded(parseInt(numberPost));
    }, [numberPost]);

    useEffect(() => {
        if (postLoaded) {
            u(postBlockRef.current).find('.guten-block-loadmore').on('click', () => {
                setPostLoaded(postLoaded + parseInt(paginationNumberPost));
            });
        }
    }, [response]);

    useEffect(() => {
        setLoading(true);

        elementId && apiFetch({
            path: addQueryArgs('/wp/v2/block-renderer/gutenverse/post-block', {
                context: 'edit',
                attributes: {
                    elementId,
                    inheritQuery,
                    postType,
                    postOffset,
                    numberPost: parseInt(postLoaded) === parseInt(numberPost) ? numberPost : postLoaded,
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
                    transform
                },
            }),
        }).then((data) => {
            setResponse(data.rendered);
        }).catch(() => {
            setResponse('<span>Error</span>');
        }).finally(() => setLoading(false));
    }, [
        elementId,
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
        transform
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
            {
                'gutenverse-transform': theTransform
            }
        ),
        ref: postBlockRef
    });

    return <>
        <PanelController panelList={panelList} {...props} />
        <div  {...blockProps}>
            {!loading ? <RawHTML key="html" className="guten-raw-wrapper">
                {response}
            </RawHTML> : <PostSkeleton number={column[deviceType]} />}
        </div>
    </>;
});

export default PostBlockBlock;