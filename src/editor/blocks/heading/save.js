/* External dependencies */

import classnames from 'classnames';

/* WordPress dependencies */
import { RichText, useBlockProps } from '@wordpress/block-editor';
import { compose } from '@wordpress/compose';

/* Gutenverse dependencies */
import { withAnimationAdvanceScript } from 'gutenverse-core/hoc';
import { useAnimationFrontend, useDisplayFrontend, useAnimationAdvanceData } from 'gutenverse-core/hooks';
import { canRenderTransform } from 'gutenverse-core/styling';

const save = compose(
    withAnimationAdvanceScript('heading')
)((props) => {
    const {
        attributes
    } = props;

    const {
        elementId,
        content,
        type,
        transform
    } = attributes;

    const advanceAnimationData = useAnimationAdvanceData(attributes);
    const animationClass = useAnimationFrontend(attributes);
    const displayClass = useDisplayFrontend(attributes);
    const theTransform = canRenderTransform(transform);

    const TagName = 'h' + type;
    const className = classnames(
        'guten-element',
        elementId,
        animationClass,
        displayClass,
        {
            'gutenverse-transform': theTransform
        }
    );

    return (
        <TagName {...useBlockProps.save({ className, ...advanceAnimationData })}>
            <RichText.Content value={content} />
        </TagName>
    );
});

export default save;