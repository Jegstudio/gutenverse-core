import { compose } from '@wordpress/compose';
import { withCustomStyle, withMouseMoveEffect } from 'gutenverse-core/hoc';

import {
    useInnerBlocksProps, useBlockProps,
} from '@wordpress/block-editor';
import { classnames } from 'gutenverse-core/components';
import { panelList } from './panels/panel-list';
import { PanelController } from 'gutenverse-core/controls';
import { useRef } from '@wordpress/element';
import { useEffect } from '@wordpress/element';
import { withCopyElementToolbar } from 'gutenverse-core/hoc';
import { withAnimationAdvance } from 'gutenverse-core/hoc';
import { useAnimationEditor } from 'gutenverse-core/hooks';
import { useDisplayEditor } from 'gutenverse-core/hooks';

const SocialIcons = compose(
    withCustomStyle(panelList),
    withAnimationAdvance('social-icons'),
    withCopyElementToolbar(),
    withMouseMoveEffect
)(props => {
    const {
        attributes,
        setElementRef
    } = props;

    const {
        elementId,
        orientation = 'horizontal',
        shape,
        color,
        showText,
    } = attributes;

    const displayClass = useDisplayEditor(attributes);
    const animationClass = useAnimationEditor(attributes);
    const socialIconsRef = useRef();

    const blockProps = useBlockProps({
        className: classnames(
            'guten-element',
            'guten-social-icons',
            'no-margin',
            elementId,
            shape,
            orientation,
            color,
            animationClass,
            displayClass,
            {
                'show-text': showText,
            }),
        ref: socialIconsRef
    });

    const innerBlocksProps = useInnerBlocksProps(blockProps, {
        template: [['gutenverse/social-icon']],
        allowedBlocks: ['gutenverse/social-icon'],
        orientation,
        __experimentalAppenderTagName: 'div',
    });

    useEffect(() => {
        if (socialIconsRef.current) {
            setElementRef(socialIconsRef.current);
        }
    }, [socialIconsRef]);

    return <>
        <PanelController panelList={panelList} {...props} />
        <div {...innerBlocksProps} />
    </>;
});

export default SocialIcons;