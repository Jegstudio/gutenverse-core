import { compose } from '@wordpress/compose';
import { InspectorControls, useBlockProps } from '@wordpress/block-editor';
import { classnames } from 'gutenverse-core/components';
import { BlockPanelController } from 'gutenverse-core/controls';
import { panelList } from './panels/panel-list';
import { useRef } from '@wordpress/element';
import { withCopyElementToolbar } from 'gutenverse-core/hoc';
import { useAnimationEditor } from 'gutenverse-core/hooks';
import { useDisplayEditor } from 'gutenverse-core/hooks';
import CommentPlaceholder from './components/comment-placeholder';
import { __ } from '@wordpress/i18n';
import { PanelTutorial } from 'gutenverse-core/controls';
import { useDynamicStyle, useGenerateElementId } from 'gutenverse-core/styling';
import getBlockStyle from './styles/block-style';

const PostCommentBlock = compose(
    withCopyElementToolbar()
)((props) => {
    const {
        attributes,
        clientId
    } = props;

    const {
        elementId,
        showForm,
        suffixMain,
        enableSuffix,
        suffixReply,
        enableCommentTitle,
        enablePostTitle,
        enableCommentCount,
        titleText
    } = attributes;

    const animationClass = useAnimationEditor(attributes);
    const displayClass = useDisplayEditor(attributes);
    const elementRef = useRef();

    const blockProps = useBlockProps({
        className: classnames(
            'guten-element',
            'guten-post-comment',
            'no-margin',
            elementId,
            animationClass,
            displayClass,
        ),
        ref: elementRef
    });

    useGenerateElementId(clientId, elementId, elementRef);
    useDynamicStyle(elementId, attributes, getBlockStyle, elementRef);

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
        <BlockPanelController panelList={panelList} props={props} elementRef={elementRef} />
        <div  {...blockProps}>
            <CommentPlaceholder 
                showForm={showForm}
                suffixMain={suffixMain}
                enableSuffix={enableSuffix}
                suffixReply={suffixReply}
                enableCommentTitle={enableCommentTitle}
                titleText={titleText}
                enablePostTitle={enablePostTitle}
                enableCommentCount={enableCommentCount}
            />
        </div>
    </>;
});

export default PostCommentBlock;