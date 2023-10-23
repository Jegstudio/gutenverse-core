import { compose } from '@wordpress/compose';

import classnames from 'classnames';
import { useBlockProps } from '@wordpress/block-editor';
import ProgressContent from './components/progress-content';
import { withAnimationAdvanceScript } from 'gutenverse-core/hoc';
import { useAnimationFrontend } from 'gutenverse-core/hooks';
import { useDisplayFrontend } from 'gutenverse-core/hooks';
import { useAnimationAdvanceData } from 'gutenverse-core/hooks';
import { canRenderTransform } from 'gutenverse-core/styling';

const save = compose(
    withAnimationAdvanceScript('progress-bar')
)((props) => {
    const {
        attributes
    } = props;

    const {
        elementId,
        style,
        transform
    } = attributes;

    const advanceAnimationData = useAnimationAdvanceData(attributes);
    const animationClass = useAnimationFrontend(attributes);
    const displayClass = useDisplayFrontend(attributes);
    const theTransform = canRenderTransform(transform);

    const className = classnames(
        'guten-element',
        'guten-progress-bar',
        elementId,
        animationClass,
        displayClass
    );

    const wrapperClass = classnames(
        'progress-group',
        {
            [`${style}`]: style && style !== 'default'
        },
        {
            'gutenverse-transform': theTransform
        }
    );

    return (
        <div {...useBlockProps.save({ className, ...advanceAnimationData })}>
            <div className={wrapperClass}>
                <div className="progress-skill-bar">
                    <ProgressContent {...props} />
                </div>
            </div>
        </div>
    );
});

export default save;