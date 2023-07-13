
import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';
import classnames from 'classnames';
import { useAnimationFrontend } from 'gutenverse-core-editor/hooks';
import { useDisplayFrontend } from 'gutenverse-core-editor/hooks';

const SaveSocialShare = ({ attributes }) => {
    const {
        elementId,
        orientation,
    } = attributes;

    const animationClass = useAnimationFrontend(attributes);
    const displayClass = useDisplayFrontend(attributes);

    const className = classnames(
        'guten-element',
        'guten-social-share',
        elementId,
        orientation,
        animationClass,
        displayClass,
        'guten-social-share',
    );


    return <div {...useBlockProps.save({ className })}>
        <InnerBlocks.Content/>
    </div>;
};

export default SaveSocialShare;