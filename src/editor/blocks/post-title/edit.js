import { compose } from '@wordpress/compose';
import { useEffect } from '@wordpress/element';
import { withCustomStyle } from 'gutenverse-core/hoc';
import { InspectorControls, useBlockProps } from '@wordpress/block-editor';
import classnames from 'classnames';
import { PanelController } from 'gutenverse-core/controls';
import { panelList } from './panels/panel-list';
import { useEntityProp } from '@wordpress/core-data';
import { useRef, useState } from '@wordpress/element';
import { withCopyElementToolbar } from 'gutenverse-core/hoc';
import { useAnimationEditor } from 'gutenverse-core/hooks';
import { useDisplayEditor } from 'gutenverse-core/hooks';
import { PanelTutorial } from 'gutenverse-core/controls';
import { __ } from '@wordpress/i18n';
import { canRenderTransform } from 'gutenverse-core/styling';

const PostTitleBlock = compose(
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
        postLinkTarget,
        postLinkRel = 'noreferrer',
        htmlTag: HtmlTag,
        transform
    } = attributes;

    const animationClass = useAnimationEditor(attributes);
    const displayClass = useDisplayEditor(attributes);
    const postTitleRef = useRef();
    const linkTarget = postLinkTarget ? '_blank' : '_self';
    const [theTransform, setTheTransform] = useState(false);

    useEffect(() => {
        setTheTransform(canRenderTransform(transform));
    }, [transform]);

    const [ postTitle = 'Post Title' ] = useEntityProp('postType', postType, 'title', postId);
    const [ link ] = useEntityProp( 'postType', postType, 'link', postId );

    useEffect(() => {
        postTitleRef.current && setElementRef(postTitleRef.current);
    }, [postTitleRef]);

    const blockProps = useBlockProps({
        className: classnames(
            'guten-element',
            'guten-post-title',
            elementId,
            animationClass,
            displayClass,
            {
                'gutenverse-transform': theTransform
            }
        ),
        ref: postTitleRef
    });

    return <>
        <InspectorControls>
            <PanelTutorial
                title={__('How Post Title works?', 'gutenverse')}
                list={[
                    {
                        title: __('Inside Page Editor, Query Loop Block, and on Frontend', 'gutenverse'),
                        description: __('Title data will be fetched automatically based on the current post/loop.', 'gutenverse')
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
            <HtmlTag>{postLink ? <a href={link} target={linkTarget} rel={postLinkRel} onClick={e => e.preventDefault()}>{postTitle}</a> : postTitle}</HtmlTag>
        </div>
    </>;
});

export default PostTitleBlock;