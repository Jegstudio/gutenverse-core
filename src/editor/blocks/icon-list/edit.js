import { compose } from '@wordpress/compose';

import { withCustomStyle } from 'gutenverse-core-editor/hoc';
import {
    useInnerBlocksProps, useBlockProps,
} from '@wordpress/block-editor';
import classnames from 'classnames';
import { PanelController } from 'gutenverse-core-editor/controls';
import { panelList } from './panels/panel-list';
import { useEffect } from '@wordpress/element';
import { useRef } from '@wordpress/element';
import { withCopyElementToolbar } from 'gutenverse-core-editor/hoc';
import { withAnimationAdvance } from 'gutenverse-core-editor/hoc';
import { useAnimationEditor } from 'gutenverse-core-editor/hooks';
import { useDisplayEditor } from 'gutenverse-core-editor/hooks';

const IconListBlock = compose(
    withCustomStyle(panelList),
    withAnimationAdvance('icon-list'),
    withCopyElementToolbar()
)((props) => {
    const {
        attributes,
        setElementRef,
        setAdanimRef
    } = props;

    const {
        elementId,
        displayInline
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
            }
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
            setElementRef(iconListRef.current);
            setAdanimRef(iconListRef.current);
        }
    }, [iconListRef]);

    return <>
        <PanelController panelList={panelList} {...props} />
        <ul {...innerBlocksProps} />
    </>;
});

export default IconListBlock;