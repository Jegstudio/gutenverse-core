
import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';
import classnames from 'classnames';
import { useAnimationFrontend } from 'gutenverse-core/hooks';
import { useDisplayFrontend } from 'gutenverse-core/hooks';
import { canRenderTransform } from 'gutenverse-core/styling';

const SaveSocialShare = ({ attributes }) => {
    const {
        elementId,
        orientation,
        transform
    } = attributes;

    const animationClass = useAnimationFrontend(attributes);
    const displayClass = useDisplayFrontend(attributes);
    const theTransform = canRenderTransform(transform);

    const className = classnames(
        'guten-element',
        'guten-social-share',
        elementId,
        orientation,
        animationClass,
        displayClass,
        'guten-social-share',
        {
            'gutenverse-transform': theTransform
        }
    );


    return <div {...useBlockProps.save({ className })}>
        <InnerBlocks.Content/>
    </div>;
};

export default SaveSocialShare;