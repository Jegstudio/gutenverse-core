import { compose } from '@wordpress/compose';
import { useBlockProps, useInnerBlocksProps } from '@wordpress/block-editor';
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

const QueryLoopBlock = compose(
    withPartialRender,
    withMouseMoveEffect
)((props) => {
    const { attributes, clientId } = props;
    const {
        elementId,
        column,
        columnGap,
        rowGap
    } = attributes;

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
        <>
            <CopyElementToolbar {...props} />
            <BlockPanelController panelList={panelList} props={props} elementRef={elementRef} />
            <div {...blockProps}>
                <div {...innerBlocksProps} />
            </div>
        </>
    );
});

export default QueryLoopBlock;
