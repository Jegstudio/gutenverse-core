import { compose } from '@wordpress/compose';

import { classnames } from 'gutenverse-core/components';
import { useBlockProps } from '@wordpress/block-editor';
import { InnerBlocks } from '@wordpress/block-editor';
import { withAnimationAdvanceScript } from 'gutenverse-core/hoc';
import { useAnimationFrontend } from 'gutenverse-core/hooks';
import { useDisplayFrontend } from 'gutenverse-core/hooks';
import { useAnimationAdvanceData } from 'gutenverse-core/hooks';

const save = compose(
    withAnimationAdvanceScript('text-editor')
)((props) => {
    const {
        attributes
    } = props;

    const {
        elementId,
        dropcap,
    } = attributes;

    const advanceAnimationData = useAnimationAdvanceData(attributes);
    const animationClass = useAnimationFrontend(attributes);
    const displayClass = useDisplayFrontend(attributes);

    const className = classnames(
        'guten-element',
        'gutenverse-text-editor',
        elementId,
        animationClass,
        displayClass,
        {
            'dropcap': dropcap
        },
    );

    return (
        <div {...useBlockProps.save({ className, ...advanceAnimationData })}>
            <div className="text-content-inner">
                <InnerBlocks.Content/>
            </div>
        </div>
    );
});

export default save;