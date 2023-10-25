import { compose } from '@wordpress/compose';
import { useEffect, useState } from '@wordpress/element';
import { withCustomStyle } from 'gutenverse-core/hoc';
import { InspectorControls, useBlockProps } from '@wordpress/block-editor';
import classnames from 'classnames';
import { PanelController } from 'gutenverse-core/controls';
import { panelList } from './panels/panel-list';
import { useEntityProp, store as coreStore } from '@wordpress/core-data';
import { useSelect } from '@wordpress/data';
import { useRef } from '@wordpress/element';
import { withCopyElementToolbar } from 'gutenverse-core/hoc';
import { useAnimationEditor } from 'gutenverse-core/hooks';
import { useDisplayEditor } from 'gutenverse-core/hooks';
import { imagePlaceholder } from 'gutenverse-core/config';
import { __ } from '@wordpress/i18n';
import { PanelTutorial } from 'gutenverse-core/controls';
import { canRenderTransform } from 'gutenverse-core/styling';

const PostFeaturedImageBlock = compose(
    withCustomStyle(panelList),
    withCopyElementToolbar()
)((props) => {
    const {
        attributes,
        setElementRef,
        context: { postId, postType }
    } = props;

    const {
        elementId,
        postLink,
        placeholderImg,
        transform
    } = attributes;

    const animationClass = useAnimationEditor(attributes);
    const displayClass = useDisplayEditor(attributes);
    const postFeaturedRef = useRef();
    const [theTransform, setTheTransform] = useState(false);

    useEffect(() => {
        setTheTransform(canRenderTransform(transform));
    }, [transform]);

    const [ featuredImage ] = useEntityProp( 'postType', postType, 'featured_media', postId );
    const [ link ] = useEntityProp( 'postType', postType, 'link', postId );

    const { media } = useSelect(
        (select) => {
            const { getMedia, getPostType } = select(coreStore);
            return {
                media:
                    featuredImage &&
                    getMedia(featuredImage, {
                        context: 'view',
                    }),
                postType: postType && getPostType(postType),
            };
        },
        [featuredImage, postType]
    );
    const mediaUrl = media?.source_url;

    useEffect(() => {
        postFeaturedRef.current && setElementRef(postFeaturedRef.current);
    }, [postFeaturedRef]);

    const blockProps = useBlockProps({
        className: classnames(
            'guten-element',
            'guten-post-featured-image',
            'no-margin',
            elementId,
            animationClass,
            displayClass,
            {
                'gutenverse-transform': theTransform
            }
        ),
        ref: postFeaturedRef
    });

    let content = mediaUrl ? <img src={mediaUrl}/> : placeholderImg ? <img src={imagePlaceholder}/> : __('Post Featured Image', 'gutenverse');

    content = postLink && link ? <a href={link} onClick={e => e.preventDefault()}>{content}</a> : content;

    return <>
        <InspectorControls>
            <PanelTutorial
                title={__('How Post Featured Image works?', 'gutenverse')}
                list={[
                    {
                        title: __('Inside Page Editor, Query Loop Block, and on Frontend', 'gutenverse'),
                        description: __('Image data will be fetched automatically based on the current post/loop.', 'gutenverse')
                    },
                    {
                        title: __('Inside Site Editor', 'gutenverse'),
                        description: __('It will load placeholder data.', 'gutenverse')
                    },
                ]}
            />
        </InspectorControls>
        <PanelController panelList={panelList} {...props} />
        <div  {...blockProps}>
            {content}
        </div>
    </>;
});

export default PostFeaturedImageBlock;