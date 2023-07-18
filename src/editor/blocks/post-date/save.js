/* External dependencies */

import classnames from 'classnames';

/* WordPress dependencies */
import { useBlockProps } from '@wordpress/block-editor';
import { useAnimationFrontend } from 'gutenverse-core/hooks';
import { useDisplayFrontend } from 'gutenverse-core/hooks';

const save = ({ attributes }) => {
    const {
        elementId,
    } = attributes;

    const animationClass = useAnimationFrontend(attributes);
    const displayClass = useDisplayFrontend(attributes);

    const className = classnames(
        'guten-element',
        'guten-post-date',
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