import { compose } from '@wordpress/compose';

import { withCustomStyle, withMouseMoveEffect, withPartialRender } from 'gutenverse-core/hoc';
import {
    useInnerBlocksProps, useBlockProps,
} from '@wordpress/block-editor';
import { classnames } from 'gutenverse-core/components';
import { PanelController } from 'gutenverse-core/controls';
import { panelList } from './panels/panel-list';
import { useEffect } from '@wordpress/element';
import { useRef } from '@wordpress/element';
import { withCopyElementToolbar } from 'gutenverse-core/hoc';
import { withAnimationAdvance } from 'gutenverse-core/hoc';
import { useAnimationEditor } from 'gutenverse-core/hooks';
import { useDisplayEditor } from 'gutenverse-core/hooks';

const IconListBlock = compose(
    withPartialRender,
    withCustomStyle(panelList),
    withAnimationAdvance('icon-list'),
    withCopyElementToolbar(),
    withMouseMoveEffect
)((props) => {
    const {
        attributes,
        setElementRef
    } = props;

    const {
        elementId,
        displayInline,
    } = attributes;
    const iconListRef = useRef();
    const animationClass = useAnimationEditor(attributes);
    const displayClass = useDisplayEditor(attributes);

    const blockProps = useBlockProps({
        className: classnames(
            'guten-element',
            'guten-icon-list',
            'no-margin',
            elementId,
            animationClass,
            displayClass,
            {
                'inline-icon-list': displayInline
            },
        ),
        ref: iconListRef
    });

    const innerBlocksProps = useInnerBlocksProps(blockProps, {
        template: [
            ['gutenverse/icon-list-item', { icon: 'fas fa-check', text: 'List Item 1' }],
            ['gutenverse/icon-list-item', { icon: 'fas fa-check', text: 'List Item 2' }],
            ['gutenverse/icon-list-item', { icon: 'fas fa-check', text: 'List Item 3' }],
        ],
        allowedBlocks: ['gutenverse/icon-list-item'],
        __experimentalAppenderTagName: 'div',
    });
    useEffect(() => {
        if (iconListRef.current) {
            setElementRef && setElementRef(iconListRef.current);
        }
    }, [iconListRef]);

    return <>
        <PanelController panelList={panelList} {...props} />
        <ul {...innerBlocksProps} />
    </>;
});

export default IconListBlock;