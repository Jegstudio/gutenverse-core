import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';
import classnames from 'classnames';
import { useAnimationFrontend, useDisplayFrontend } from 'gutenverse-core/hooks';

const save = ({ attributes }) => {
    const {
        elementId,
        containerLayout,
    } = attributes;

    const animationClass = useAnimationFrontend(attributes);
    const displayClass = useDisplayFrontend(attributes);

    const className = classnames(
        'guten-element',
        'guten-flex-container',
        containerLayout,
        elementId,
        animationClass,
        displayClass,
    );

    return (
        <div {...useBlockProps.save({ className })}>
            {'boxed' === containerLayout ? <div className="guten-inner-container">
                <InnerBlocks.Content />
            </div> : <InnerBlocks.Content />}
        </div>
    );
};

export default save;

