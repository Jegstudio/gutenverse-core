import { compose } from '@wordpress/compose';
import { useInnerBlocksProps, useBlockProps } from '@wordpress/block-editor';
import { classnames } from 'gutenverse-core/components';
import { BlockPanelController } from 'gutenverse-core/controls';
import { panelList } from './panels/panel-list';
import { useEffect, useRef } from '@wordpress/element';
import { withAnimationAdvanceV2, withCopyElementToolbar, withPartialRender, withPassRef } from 'gutenverse-core/hoc';
import { useAnimationEditor } from 'gutenverse-core/hooks';
import { useDisplayEditor } from 'gutenverse-core/hooks';
import { useDynamicScript, useDynamicStyle, useGenerateElementId } from 'gutenverse-core/styling';
import getBlockStyle from './styles/block-style';

const IconListBlock = compose(
    withPartialRender,
    withPassRef,
    withCopyElementToolbar(),
    withAnimationAdvanceV2('icon-list')
    // withMouseMoveEffect
)((props) => {
    const {
        attributes,
        clientId,
        setBlockRef,
    } = props;

    const {
        elementId,
        displayInline,
    } = attributes;

    const elementRef = useRef(null);
    const animationClass = useAnimationEditor(attributes);
    const displayClass = useDisplayEditor(attributes);

    useGenerateElementId(clientId, elementId, elementRef);
    useDynamicStyle(elementId, attributes, getBlockStyle, elementRef);
    useDynamicScript(elementRef);

    const blockProps = useBlockProps({
        className: classnames(
            'guten-element',
            'guten-icon-list',
            'no-margin',
            elementId,
            animationClass,
            displayClass,
        ),
        ref: elementRef
    });

    const innerBlocksProps = useInnerBlocksProps({
        className: classnames(
            'list-wrapper',
            {
                'inline-icon-list': displayInline,
            }
        )
    }, {
        template: [
            ['gutenverse/icon-list-item', { icon: 'fas fa-check', text: 'List Item 1' }],
            ['gutenverse/icon-list-item', { icon: 'fas fa-check', text: 'List Item 2' }],
            ['gutenverse/icon-list-item', { icon: 'fas fa-check', text: 'List Item 3' }],
        ],
        allowedBlocks: ['gutenverse/icon-list-item'],
        __experimentalAppenderTagName: 'div',
    });

    useEffect(() => {
        if (elementRef) {
            setBlockRef(elementRef);
        }
    }, [elementRef]);

    return <>
        <BlockPanelController panelList={panelList} props={props} elementRef={elementRef} />
        <div {...blockProps}>
            <ul {...innerBlocksProps} />
        </div>
    </>;
});

export default IconListBlock;