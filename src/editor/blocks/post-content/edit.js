import { compose } from '@wordpress/compose';
import { createPortal, useEffect, useMemo, useState } from '@wordpress/element';
import { withCustomStyle, withPartialRender } from 'gutenverse-core/hoc';
import { classnames } from 'gutenverse-core/components';
import { BlockPanelController } from 'gutenverse-core/controls';
import { panelList } from './panels/panel-list';
import { useRef } from '@wordpress/element';
import { withPartialRender } from 'gutenverse-core/hoc';
import { useAnimationEditor } from 'gutenverse-core/hooks';
import { useDisplayEditor } from 'gutenverse-core/hooks';
import { InspectorControls, RecursionProvider, useBlockProps, useHasRecursion, Warning, __experimentalUseBlockPreview as useBlockPreview, store as blockEditorStore } from '@wordpress/block-editor';
import { useDispatch, useSelect } from '@wordpress/data';
import { __ } from '@wordpress/i18n';
import { PanelTutorial } from 'gutenverse-core/controls';
import { useSettingFallback } from 'gutenverse-core/helper';
import { useEntityProp, store as coreStore } from '@wordpress/core-data';
import { store as editorStore } from '@wordpress/editor';
import { parse } from '@wordpress/blocks';


const Placeholder = () => {
    return <div className="post-content">
        <p>{__('This will be your post\'s content block, it will display all the blocks in any single post or page.', 'gutenverse')}</p>
        <p>{__('That might be a simple arrangement like consecutive paragraphs in a blog post, or a more elaborate composition that includes image galleries, videos, tables, columns, and any other block types.', 'gutenverse')}</p>
    </div>;
};

const EditNotice = ({ setEditorWarn }) => {
    const { setRenderingMode } = useDispatch(editorStore);

    const editContent = () => {
        setEditorWarn(false);
        setRenderingMode('post-only');
    };

    const cancelEdit = () => {
        setEditorWarn(false);
    };

    return <div id="gutenverse-warn">
        <div className="gutenverse-editor-warn">
            <div className="gutenverse-warn-wrapper">
                <div className="gutenverse-warn-header">
                    <span>{__('Edit Content', 'gutenverse')}</span>
                </div>
                <div className="gutenverse-warn-description">
                    {__('The editor will switch to content editing. Do you want to proceed?', 'gutenverse')}
                </div>
                <div className="gutenverse-warn-footer">
                    <button className="cancel" onClick={cancelEdit}>Cancel</button>
                    <button className="primary" onClick={editContent}>Continue</button>
                </div>
            </div>
        </div>
    </div>;
};

const ReadOnlyContent = ({
    userCanEdit,
    layoutClassNames,
    parentLayout,
    postType,
    postId,
}) => {
    const [, , content] = useEntityProp(
        'postType',
        postType,
        'content',
        postId
    );
    const blockProps = useBlockProps({ className: layoutClassNames });
    const blocks = useMemo(() => {
        return content?.raw ? parse(content.raw) : [];
    }, [content?.raw]);
    const blockPreviewProps = useBlockPreview({
        blocks,
        props: blockProps,
        layout: parentLayout,
    });

    if (userCanEdit) {
        /*
         * Rendering the block preview using the raw content blocks allows for
         * block support styles to be generated and applied by the editor.
         *
         * The preview using the raw blocks can only be presented to users with
         * edit permissions for the post to prevent potential exposure of private
         * block content.
         */
        return <div {...blockPreviewProps}></div>;
    }

    return content?.protected ? (
        <div {...blockProps}>
            <Warning>{__('This content is password protected.')}</Warning>
        </div>
    ) : (
        <div
            {...blockProps}
            dangerouslySetInnerHTML={{ __html: content?.rendered }}
        ></div>
    );
};

const Content = (props) => {
    const { context: { postType, postId } = {}, layoutClassNames } =
        props;

    const userCanEdit = useSelect(
        (select) =>
            select(coreStore).canUser('update', {
                kind: 'postType',
                name: postType,
                id: postId,
            }),
        [postType, postId]
    );

    if (userCanEdit === undefined) {
        return null;
    }

    return <ReadOnlyContent
        parentLayout={props.parentLayout}
        layoutClassNames={layoutClassNames}
        userCanEdit={userCanEdit}
        postType={postType}
        postId={postId}
    />;
};

const RecursionError = () => {
    const blockProps = useBlockProps();
    return (
        <div {...blockProps}>
            <Warning>
                {__('Block cannot be rendered inside itself.')}
            </Warning>
        </div>
    );
};

const PostContentBlock = compose(
    withPartialRender
)((props) => {
    const {
        clientId,
        attributes,
        setElementRef,
        context,
        __unstableLayoutClassNames: layoutClassNames,
        __unstableParentLayout: parentLayout,
    } = props;
    const [editorWarn, setEditorWarn] = useState(false);

    const { setBlockEditingMode, unsetBlockEditingMode } = useDispatch(blockEditorStore);

    useEffect(() => {
        setBlockEditingMode(clientId, 'contentOnly');

        return () => {
            unsetBlockEditingMode(clientId);
        };

    }, [clientId, setBlockEditingMode, unsetBlockEditingMode]);

    const {
        elementId,
        inheritLayout,
    } = attributes;

    const { postId: contextPostId, postType: contextPostType } = context;
    const hasAlreadyRendered = useHasRecursion(contextPostId);

    if (contextPostId && contextPostType && hasAlreadyRendered) {
        return <RecursionError />;
    }

    const animationClass = useAnimationEditor(attributes);
    const displayClass = useDisplayEditor(attributes);
    const elementRef = useRef();
    const layout = useSettingFallback('layout');

    const blockProps = useBlockProps({
        className: classnames(
            'guten-element',
            'guten-post-content',
            elementId,
            animationClass,
            displayClass,
        ),
        ref: elementRef,
        onClick: () => {
            setEditorWarn(true);
        },
    });

    useGenerateElementId(clientId, elementId, elementRef);
    useDynamicStyle(elementId, attributes, getBlockStyle, elementRef);

    return <>
        <CopyElementToolbar {...props}/>
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
        <BlockPanelController panelList={panelList} props={props} elementRef={elementRef} />
        {inheritLayout && layout && layout.contentSize && <style>
            {`.${elementId} > .post-content > * { max-width: ${layout.contentSize}; margin-left:auto; margin-right: auto; }`}
        </style>}
        <div {...blockProps}>
            <RecursionProvider uniqueId={contextPostId}>
                {contextPostId && contextPostType ? (
                    <Content
                        context={context}
                        parentLayout={parentLayout}
                        layoutClassNames={layoutClassNames}
                    />
                ) : (
                    <Placeholder layoutClassNames={layoutClassNames} />
                )}
            </RecursionProvider>
        </div>
        {editorWarn && createPortal(<EditNotice setEditorWarn={setEditorWarn}/>, document.getElementById('gutenverse-root'))}
    </>;
});

export default PostContentBlock;