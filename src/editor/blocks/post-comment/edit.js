import { compose } from '@wordpress/compose';
import { useEffect } from '@wordpress/element';
import { withCustomStyle } from 'gutenverse-core/hoc';
import { InspectorControls, useBlockProps } from '@wordpress/block-editor';
import classnames from 'classnames';
import { PanelController } from 'gutenverse-core/controls';
import { panelList } from './panels/panel-list';
import { useRef, useState } from '@wordpress/element';
import { withCopyElementToolbar } from 'gutenverse-core/hoc';
import { useAnimationEditor } from 'gutenverse-core/hooks';
import { useDisplayEditor } from 'gutenverse-core/hooks';
import CommentPlaceholder from './components/comment-placeholder';
import { __ } from '@wordpress/i18n';
import { PanelTutorial } from 'gutenverse-core/controls';
import { canRenderTransform } from 'gutenverse-core/styling';

const PostCommentBlock = compose(
    withCustomStyle(panelList),
    withCopyElementToolbar()
)((props) => {
    const {
        attributes,
        setElementRef
    } = props;

    const {
        elementId,
        showForm,
        transform
    } = attributes;

    const animationClass = useAnimationEditor(attributes);
    const displayClass = useDisplayEditor(attributes);
    const postCommentRef = useRef();
    const [theTransform, setTheTransform] = useState(false);

    useEffect(() => {
        setTheTransform(canRenderTransform(transform));
    }, [transform]);

    useEffect(() => {
        postCommentRef.current && setElementRef(postCommentRef.current);
    }, [postCommentRef]);

    const blockProps = useBlockProps({
        className: classnames(
            'guten-element',
            'guten-post-comment',
            'no-margin',
            elementId,
            animationClass,
            displayClass,
            {
                'gutenverse-transform': theTransform
            }
        ),
        ref: postCommentRef
    });

    return <>
        <InspectorControls>
            <PanelTutorial
                title={__('How Post Comment works?', 'gutenverse')}
                list={[
                    {
                        title: __('On Frontend', 'gutenverse'),
                        description: __('Comment data will be fetched automatically based on the current post/loop.', 'gutenverse')
                    },
                    {
                        title: __('Inside Page Editor and Site Editor', 'gutenverse'),
                        description: __('It will load placeholder data.', 'gutenverse')
                    },
                ]}
            />
        </InspectorControls>
        <PanelController panelList={panelList} {...props} />
        <div  {...blockProps}>
            <CommentPlaceholder showForm={showForm}/>
        </div>
    </>;
});

export default PostCommentBlock;