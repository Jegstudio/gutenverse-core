
import { compose } from '@wordpress/compose';
import { withCustomStyle } from 'gutenverse-core/hoc';
import {
    useInnerBlocksProps,
    useBlockProps
} from '@wordpress/block-editor';
import classnames from 'classnames';
import { panelList } from './panels/panel-list';
import { PanelController } from 'gutenverse-core/controls';
import { useRef } from '@wordpress/element';
import { useEffect } from '@wordpress/element';
import { withCopyElementToolbar } from 'gutenverse-core/hoc';
import { useAnimationEditor } from 'gutenverse-core/hooks';
import { useDisplayEditor } from 'gutenverse-core/hooks';

const SocialShare = compose(
    withCustomStyle(panelList),
    withCopyElementToolbar()
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
        showText
    } = attributes;

    const socialShareRef = useRef();
    const animationClass = useAnimationEditor(attributes);
    const displayClass = useDisplayEditor(attributes);

    const blockProps = useBlockProps({
        className: classnames(
            'guten-element',
            'guten-social-share',
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
        ref: socialShareRef
    });

    const innerBlocksProps = useInnerBlocksProps(blockProps, {
        template: [
            ['gutenverse/social-share-facebook']
        ],
        allowedBlocks: [
            'gutenverse/social-share-facebook',
            'gutenverse/social-share-twitter',
            'gutenverse/social-share-pinterest',
            'gutenverse/social-share-stumbleupon',
            'gutenverse/social-share-linkedin',
            'gutenverse/social-share-reddit',
            'gutenverse/social-share-tumblr',
            'gutenverse/social-share-vk',
            'gutenverse/social-share-whatsapp',
            'gutenverse/social-share-telegram',
            'gutenverse/social-share-wechat',
            'gutenverse/social-share-line',
            'gutenverse/social-share-email',
        ],
        orientation,
        __experimentalAppenderTagName: 'div',
    });

    useEffect(() => {
        if (socialShareRef.current) {
            setElementRef(socialShareRef.current);
        }
    }, [socialShareRef]);

    return <>
        <PanelController panelList={panelList} {...props} />
        <div {...innerBlocksProps} />
    </>;
});

export default SocialShare;
