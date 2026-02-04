import { memo, useMemo, useState } from '@wordpress/element';
import { useSelect } from '@wordpress/data';
import {
    useBlockProps,
    useInnerBlocksProps,
    store as blockEditorStore,
    __experimentalUseBlockPreview as useBlockPreview,
    BlockContextProvider
} from '@wordpress/block-editor';
import { classnames } from 'gutenverse-core/components';
import { Spinner } from '@wordpress/components';
import { store as coreStore } from '@wordpress/core-data';

const TEMPLATE = [
    ['gutenverse/post-featured-image'],
    ['gutenverse/post-title'],
    ['gutenverse/post-excerpt']
];

// The inner blocks component for the active/editable post
function PostTemplateInnerBlocks() {
    const innerBlocksProps = useInnerBlocksProps(
        { className: 'wp-block-post' },
        { template: TEMPLATE, __unstableDisableLayoutClassNames: true }
    );
    return <li {...innerBlocksProps} />;
}

// Memoized preview for non-active posts
function PostTemplateBlockPreview({ blocks, blockContextId, isHidden, setActiveBlockContextId }) {
    const blockPreviewProps = useBlockPreview({
        blocks,
        props: {
            className: 'wp-block-post',
        },
    });

    const handleOnClick = () => {
        setActiveBlockContextId(blockContextId);
    };

    const style = {
        display: isHidden ? 'none' : undefined,
    };

    return (
        <li
            {...blockPreviewProps}
            tabIndex={0}
            role="button"
            onClick={handleOnClick}
            onKeyPress={handleOnClick}
            style={style}
        />
    );
}

const MemoizedPostTemplateBlockPreview = memo(PostTemplateBlockPreview);

export default function Edit({ clientId }) {
    const [activeBlockContextId, setActiveBlockContextId] = useState();

    // Get query attributes from the parent query-loop block
    const { postType, queryArgs } = useSelect((select) => {
        const { getBlockParentsByBlockName, getBlock } = select(blockEditorStore);

        // Find parent query-loop block
        const queryLoopParents = getBlockParentsByBlockName(clientId, 'gutenverse/query-loop');
        if (!queryLoopParents.length) {
            return { postType: 'post', queryArgs: { per_page: 3, _embed: true } };
        }

        const parentBlock = getBlock(queryLoopParents[0]);
        if (!parentBlock) {
            return { postType: 'post', queryArgs: { per_page: 3, _embed: true } };
        }

        const attrs = parentBlock.attributes;

        const args = {
            per_page: attrs.numberPost || 3,
            offset: attrs.postOffset || 0,
            _embed: true,
        };

        // Handle sorting
        switch (attrs.sortBy) {
            case 'oldest':
                args.order = 'asc';
                args.orderby = 'date';
                break;
            case 'alphabet_asc':
                args.order = 'asc';
                args.orderby = 'title';
                break;
            case 'alphabet_desc':
                args.order = 'desc';
                args.orderby = 'title';
                break;
            case 'latest':
            default:
                args.order = 'desc';
                args.orderby = 'date';
                break;
        }

        // Include specific posts
        if (attrs.includePost?.length > 0) {
            args.include = attrs.includePost.map(p => p.value || p);
        }

        // Exclude specific posts
        if (attrs.excludePost?.length > 0) {
            args.exclude = attrs.excludePost.map(p => p.value || p);
        }

        // Include categories
        if (attrs.includeCategory?.length > 0) {
            args.categories = attrs.includeCategory.map(c => c.value || c);
        }

        // Include tags
        if (attrs.includeTag?.length > 0) {
            args.tags = attrs.includeTag.map(t => t.value || t);
        }

        // Include authors
        if (attrs.includeAuthor?.length > 0) {
            args.author = attrs.includeAuthor.map(a => a.value || a);
        }

        return {
            postType: attrs.postType || 'post',
            queryArgs: args
        };
    }, [clientId]);

    // Fetch posts
    const { posts, blocks } = useSelect((select) => {
        const { getEntityRecords } = select(coreStore);
        const { getBlocks } = select(blockEditorStore);

        return {
            posts: getEntityRecords('postType', postType, queryArgs) || [],
            blocks: getBlocks(clientId)
        };
    }, [postType, JSON.stringify(queryArgs), clientId]);

    const blockContexts = useMemo(() =>
        posts.map((post) => ({
            postType: post.type,
            postId: post.id,
        })),
    [posts]
    );

    const blockProps = useBlockProps({
        className: classnames('guten-post-template')
    });

    if (!posts.length) {
        return (
            <div {...blockProps}>
                <Spinner />
            </div>
        );
    }

    return (
        <ul {...blockProps}>
            {blockContexts.map((blockContext) => (
                <BlockContextProvider
                    key={blockContext.postId}
                    value={blockContext}
                >
                    {blockContext.postId === (activeBlockContextId || blockContexts[0]?.postId) ? (
                        <PostTemplateInnerBlocks />
                    ) : (
                        <MemoizedPostTemplateBlockPreview
                            blocks={blocks}
                            blockContextId={blockContext.postId}
                            setActiveBlockContextId={setActiveBlockContextId}
                            isHidden={false}
                        />
                    )}
                </BlockContextProvider>
            ))}
        </ul>
    );
}
