import { compose } from '@wordpress/compose';
import { useBlockProps, useInnerBlocksProps, BlockContextProvider } from '@wordpress/block-editor';
import { withMouseMoveEffect, withPartialRender } from 'gutenverse-core/hoc';
import { BlockPanelController } from 'gutenverse-core/controls';
import { panelList } from './panels/panel-list';
import { useAnimationEditor, useDisplayEditor } from 'gutenverse-core/hooks';
import { useDynamicStyle, useGenerateElementId } from 'gutenverse-core/styling';
import getBlockStyle from './styles/block-style';
import { useRef, useMemo } from '@wordpress/element';
import { classnames } from 'gutenverse-core/components';
import { CopyElementToolbar } from 'gutenverse-core/components';
import { getDeviceType } from 'gutenverse-core/editor-helper';
import { useSelect } from '@wordpress/data';
import { store as coreStore } from '@wordpress/core-data';

const QueryLoopBlock = compose(
    withPartialRender,
    withMouseMoveEffect
)((props) => {
    const { attributes, clientId } = props;
    const {
        elementId,
        column,
        columnGap,
        rowGap,
        postType,
        numberPost,
        postOffset,
        sortBy,
        includePost,
        excludePost,
        includeCategory,
        includeTag,
        includeAuthor
    } = attributes;

    const { posts, isResolving } = useSelect((select) => {
        const { getEntityRecords, isResolving: isEntityResolving } = select(coreStore);

        const args = {
            per_page: numberPost || 3,
            offset: postOffset || 0,
            _embed: true,
        };

        // Handle sorting
        switch (sortBy) {
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
        if (includePost?.length > 0) {
            args.include = includePost.map(p => p.value || p);
        }

        // Exclude specific posts
        if (excludePost?.length > 0) {
            args.exclude = excludePost.map(p => p.value || p);
        }

        // Include categories
        if (includeCategory?.length > 0) {
            args.categories = includeCategory.map(c => c.value || c);
        }

        // Include tags
        if (includeTag?.length > 0) {
            args.tags = includeTag.map(t => t.value || t);
        }

        // Include authors
        if (includeAuthor?.length > 0) {
            args.author = includeAuthor.map(a => a.value || a);
        }

        const queryParams = [ 'postType', postType || 'post', args ];

        return {
            posts: getEntityRecords(...queryParams),
            isResolving: isEntityResolving('getEntityRecords', queryParams)
        };
    }, [postType, numberPost, postOffset, sortBy, includePost, excludePost, includeCategory, includeTag, includeAuthor]);

    const animationClass = useAnimationEditor(attributes);
    const displayClass = useDisplayEditor(attributes);
    const elementRef = useRef();
    const deviceType = getDeviceType();

    useGenerateElementId(clientId, elementId, elementRef);
    useDynamicStyle(elementId, attributes, getBlockStyle, elementRef);

    const blockProps = useBlockProps({
        className: classnames(
            'guten-element',
            'guten-query-loop',
            'no-margin',
            elementId,
            animationClass,
            displayClass,
        ),
        ref: elementRef,
    });

    // Calculate grid styles for the container
    const gridStyle = useMemo(() => {
        const cols = column?.[deviceType] || column?.Desktop || 3;
        const colGap = columnGap?.[deviceType] || columnGap?.Desktop || { unit: 'px', point: 20 };
        const rGap = rowGap?.[deviceType] || rowGap?.Desktop || { unit: 'px', point: 20 };

        return {
            display: 'grid',
            gridTemplateColumns: `repeat(${cols}, 1fr)`,
            columnGap: `${colGap.point || 20}${colGap.unit || 'px'}`,
            rowGap: `${rGap.point || 20}${rGap.unit || 'px'}`,
        };
    }, [column, columnGap, rowGap, deviceType]);

    const innerBlocksProps = useInnerBlocksProps({
        className: 'guten-query-loop-container',
        style: gridStyle
    }, {
        template: [
            ['gutenverse/post-template']
        ],
        allowedBlocks: ['gutenverse/post-template'],
    });

    return (
        <BlockContextProvider value={{ 'gutenverse/queryPosts': posts, 'gutenverse/isResolving': isResolving }}>
            <CopyElementToolbar {...props} />
            <BlockPanelController panelList={panelList} props={props} elementRef={elementRef} />
            <div {...blockProps}>
                <div {...innerBlocksProps} />
            </div>
        </BlockContextProvider>
    );
});

export default QueryLoopBlock;
