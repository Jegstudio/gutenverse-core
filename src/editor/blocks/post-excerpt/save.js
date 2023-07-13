
import classnames from 'classnames';
import { useBlockProps } from '@wordpress/block-editor';
import { useAnimationFrontend } from 'gutenverse-core-editor/hooks';
import { useDisplayFrontend } from 'gutenverse-core-editor/hooks';

const save = ({ attributes }) => {
    const {
        elementId,
    } = attributes;

    const animationClass = useAnimationFrontend(attributes);
    const displayClass = useDisplayFrontend(attributes);

    const className = classnames(
        'guten-element',
        'guten-post-excerpt',
        elementId,
        animationClass,
        displayClass
    );

    return (
        <div {...useBlockProps.save({ className })}>
            {/* Block content */}
        </div>
    );
};

export default save;