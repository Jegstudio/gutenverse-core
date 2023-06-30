import { compose } from '@wordpress/compose';
import { useEffect } from '@wordpress/element';
import { withCustomStyle } from 'gutenverse-core/hoc';
import classnames from 'classnames';
import { PanelController } from 'gutenverse-core/controls';
import { panelList } from './panels/panel-list';
import { useRef } from '@wordpress/element';
import { withCopyElementToolbar } from 'gutenverse-core/hoc';
import { useAnimationEditor } from 'gutenverse-core/hooks';
import { useDisplayEditor } from 'gutenverse-core/hooks';
// import { useEntityBlockEditor } from '@wordpress/core-data';
import {
    InspectorControls,
    useBlockProps,
    // useInnerBlocksProps,
    useSetting,
    Warning,
} from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';
import { PanelTutorial } from 'gutenverse-core/controls';

const Placeholder = () => {
    return <div className="post-content">
        <p>{__('This will be your post\'s content block, it will display all the blocks in any single post or page.', 'gutenverse')}</p>
        <p>{__('That might be a simple arrangement like consecutive paragraphs in a blog post, or a more elaborate composition that includes image galleries, videos, tables, columns, and any other block types.', 'gutenverse')}</p>
    </div>;
};

// const RecursionError = () => {
//     const blockProps = useBlockProps();
//     return (
//         <div {...blockProps}>
//             <Warning>
//                 {__('Block cannot be rendered inside itself.')}
//             </Warning>
//         </div>
//     );
// };

const PostContentBlock = compose(
    withCustomStyle(panelList),
    withCopyElementToolbar()
)((props) => {
    const {
        attributes,
        setElementRef,
        context: { postType, postId }
    } = props;

    const {
        elementId,
        inheritLayout
    } = attributes;

    const animationClass = useAnimationEditor(attributes);
    const displayClass = useDisplayEditor(attributes);
    const postTitleRef = useRef();
    const layout = useSetting('layout');

    /* const [blocks, onInput, onChange] = useEntityBlockEditor(
        'postType',
        postType,
        { id: postId }
    ); */

    useEffect(() => {
        if (postTitleRef.current) {
            setElementRef(postTitleRef.current);
        }
    }, [postTitleRef]);

    const blockProps = useBlockProps({
        className: classnames(
            'guten-element',
            'guten-post-content',
            elementId,
            animationClass,
            displayClass,
        ),
        ref: postTitleRef
    });

    /* const innerProps = useInnerBlocksProps(
        useBlockProps({ className: 'post-content' }),
        {
            value: blocks,
            onInput,
            onChange,
        }
    ); */

    return <>
        <InspectorControls>
            <PanelTutorial
                title={__('How Post Content works?', 'gutenverse')}
                list={[
                    {
                        title: __('On Frontend', 'gutenverse'),
                        description: __('Post content data will be fetched automatically based on the current post/loop.', 'gutenverse')
                    },
                    {
                        title: __('Inside Page/Post Editor and Inside Site Editor', 'gutenverse'),
                        description: __('It will load placeholder data.', 'gutenverse')
                    },
                ]}
            />
        </InspectorControls>
        <PanelController panelList={panelList} {...props} />
        {inheritLayout && layout && layout.contentSize && <style>
            {`.${elementId} > .post-content > * { max-width: ${layout.contentSize}; margin-left:auto; margin-right: auto; }`}
        </style>}
        <div
            {...blockProps}>
            <Placeholder />
            {/* {postId && postType ? <div {...innerProps} /> : <Placeholder />} */}
        </div>
    </>;
});

export default PostContentBlock;