
import classnames from 'classnames';
import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';
import { useAnimationFrontend } from 'gutenverse-core/hooks';
import { useDisplayFrontend } from 'gutenverse-core/hooks';

const save = ({ attributes }) => {
    const {
        elementId,
        orientation
    } = attributes;

    const animationClass = useAnimationFrontend(attributes);
    const displayClass = useDisplayFrontend(attributes);

    const className = classnames(
        'guten-element',
        'guten-buttons',
        `${orientation}`,
        elementId,
        animationClass,
        displayClass
    );

    return (
        <div {...useBlockProps.save({ className })}>
            <InnerBlocks.Content />
        </div>
    );
};

export default save;