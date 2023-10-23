import { compose } from '@wordpress/compose';

import classnames from 'classnames';
import { useBlockProps } from '@wordpress/block-editor';
import StarIcons from './components/star-icons';
import { withAnimationAdvanceScript } from 'gutenverse-core/hoc';
import { useAnimationFrontend } from 'gutenverse-core/hooks';
import { useDisplayFrontend } from 'gutenverse-core/hooks';
import { useAnimationAdvanceData } from 'gutenverse-core/hooks';
import { canRenderTransform } from 'gutenverse-core/styling';

const save = compose(
    withAnimationAdvanceScript('star-rating')
)((props) => {
    const {
        attributes
    } = props;

    const {
        elementId,
        title,
        transform
    } = attributes;

    const advanceAnimationData = useAnimationAdvanceData(attributes);
    const animationClass = useAnimationFrontend(attributes);
    const displayClass = useDisplayFrontend(attributes);
    const theTransform = canRenderTransform(transform);

    const className = classnames(
        'guten-element',
        'guten-star-rating',
        elementId,
        animationClass,
        displayClass,
        {
            'gutenverse-transform': theTransform
        }
    );

    return (
        <div {...useBlockProps.save({ className, ...advanceAnimationData })}>
            <div className="rating-wrapper">
                <span className="rating-title">{title}</span>
                <StarIcons {...attributes}/>
            </div>
        </div>
    );
});

export default save;