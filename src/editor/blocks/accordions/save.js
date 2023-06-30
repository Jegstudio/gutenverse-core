
import { InnerBlocks } from '@wordpress/block-editor';
import classnames from 'classnames';
import { useAnimationFrontend } from 'gutenverse-core/hooks';
import { useDisplayFrontend } from 'gutenverse-core/hooks';

export const save = ({ attributes }) => {
    const {
        elementId,
    } = attributes;

    const animationClass = useAnimationFrontend(attributes);
    const displayClass = useDisplayFrontend(attributes);

    const className = classnames(
        'guten-element',
        'guten-accordions',
        elementId,
        animationClass,
        displayClass,
    );

    return <div className={className}>
        <InnerBlocks.Content />
    </div>;
};

export default save;