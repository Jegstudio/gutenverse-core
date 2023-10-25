
import classnames from 'classnames';
import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';
import { compose } from '@wordpress/compose';
import { withAnimationAdvanceScript } from 'gutenverse-core/hoc';
import { useAnimationFrontend } from 'gutenverse-core/hooks';
import { useDisplayFrontend } from 'gutenverse-core/hooks';
import { useAnimationAdvanceData } from 'gutenverse-core/hooks';
import { canRenderTransform } from 'gutenverse-core/styling';

const save = compose(
    withAnimationAdvanceScript('icon-list')
)((props) => {
    const {
        attributes
    } = props;

    const {
        elementId,
        displayInline,
        transform
    } = attributes;

    const advanceAnimationData = useAnimationAdvanceData(attributes);
    const animationClass = useAnimationFrontend(attributes);
    const displayClass = useDisplayFrontend(attributes);
    const theTransform = canRenderTransform(transform);

    const className = classnames(
        'guten-element',
        'guten-icon-list',
        elementId,
        animationClass,
        displayClass,
        {
            'inline-icon-list': displayInline
        },
        {
            'gutenverse-transform': theTransform
        }
    );

    return (
        <div {...useBlockProps.save({ className, ...advanceAnimationData })}>
            <InnerBlocks.Content/>
        </div>
    );
});

export default save;