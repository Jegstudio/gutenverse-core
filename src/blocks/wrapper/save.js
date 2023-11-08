
import classnames from 'classnames';
import { useBlockProps } from '@wordpress/block-editor';
import { InnerBlocks } from '@wordpress/block-editor';
import { useAnimationAdvanceData, useAnimationFrontend } from 'gutenverse-core/hooks';
import { compose } from '@wordpress/compose';
import { withAnimationAdvanceScript } from 'gutenverse-core/hoc';

const save = compose(
    withAnimationAdvanceScript('wrapper')
)(({ attributes }) => {
    const {
        elementId,
        displayType
    } = attributes;

    const animationClass = useAnimationFrontend(attributes);
    const advanceAnimationData = useAnimationAdvanceData(attributes);

    const blockProps = useBlockProps.save({
        className: classnames(
            'guten-element',
            'guten-wrap-helper',
            'no-margin',
            elementId,
            animationClass,
            displayType
        ),
        ...advanceAnimationData
    });

    return (
        <div {...blockProps}>
            <div className="guten-background-overlay" />
            <div className="guten-inner-wrap">
                <InnerBlocks.Content />
            </div>
        </div>
    );
});

export default save;