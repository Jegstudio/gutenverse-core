
import { InnerBlocks } from '@wordpress/block-editor';
import classnames from 'classnames';
import { useAnimationFrontend } from 'gutenverse-core/hooks';
import { useDisplayFrontend } from 'gutenverse-core/hooks';
import { canRenderTransform } from 'gutenverse-core/styling';

export const save = ({ attributes }) => {
    const {
        elementId,
        transform
    } = attributes;

    const animationClass = useAnimationFrontend(attributes);
    const displayClass = useDisplayFrontend(attributes);
    const theTransform = canRenderTransform(transform);

    const className = classnames(
        'guten-element',
        'guten-accordions',
        elementId,
        animationClass,
        displayClass,
        {
            'gutenverse-transform': theTransform
        }
    );

    return <div className={className}>
        <InnerBlocks.Content />
    </div>;
};

export default save;