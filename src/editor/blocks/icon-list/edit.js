import { compose } from '@wordpress/compose';

import { withMouseMoveEffect } from 'gutenverse-core/hoc';
import {
    useInnerBlocksProps, useBlockProps,
} from '@wordpress/block-editor';
import { classnames } from 'gutenverse-core/components';
import { BlockPanelController } from 'gutenverse-core/controls';
import { panelList } from './panels/panel-list';
import { useRef } from '@wordpress/element';
import { withCopyElementToolbar } from 'gutenverse-core/hoc';
import { withAnimationAdvance } from 'gutenverse-core/hoc';
import { useAnimationEditor } from 'gutenverse-core/hooks';
import { useDisplayEditor } from 'gutenverse-core/hooks';
import { useDynamicStyle, useGenerateElementId } from 'gutenverse-core/styling';
import getBlockStyle from './styles/block-style';

const IconListBlock = compose(
    // withPartialRender,
    // withCustomStyle(panelList),
    // withAnimationAdvance('icon-list'),
    withCopyElementToolbar(),
    // withMouseMoveEffect
)((props) => {
    const {
        attributes,
        clientId
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

    return <>
        <BlockPanelController panelList={panelList} props={props} elementRef={elementRef} />
        <div {...blockProps}>
            <ul {...innerBlocksProps} />
        </div>
    </>;
});

export default IconListBlock;