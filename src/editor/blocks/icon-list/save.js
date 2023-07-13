
import classnames from 'classnames';
import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';
import { compose } from '@wordpress/compose';
import { withAnimationAdvanceScript } from 'gutenverse-core-editor/hoc';
import { useAnimationFrontend } from 'gutenverse-core-editor/hooks';
import { useDisplayFrontend } from 'gutenverse-core-editor/hooks';
import { useAnimationAdvanceData } from 'gutenverse-core-editor/hooks';

const save = compose(
    withAnimationAdvanceScript('icon-list')
)((props) => {
    const {
        attributes
    } = props;

    const {
        elementId,
        displayInline
    } = attributes;

    const advanceAnimationData = useAnimationAdvanceData(attributes);
    const animationClass = useAnimationFrontend(attributes);
    const displayClass = useDisplayFrontend(attributes);

    const className = classnames(
        'guten-element',
        'guten-icon-list',
        elementId,
        animationClass,
        displayClass,
        {
            'inline-icon-list': displayInline
        }
    );

    return (
        <div {...useBlockProps.save({ className, ...advanceAnimationData })}>
            <InnerBlocks.Content/>
        </div>
    );
});

export default save;