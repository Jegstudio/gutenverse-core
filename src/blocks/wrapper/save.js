
import classnames from 'classnames';
import { useBlockProps } from '@wordpress/block-editor';
import { InnerBlocks } from '@wordpress/block-editor';
import { useAnimationAdvanceData, useAnimationFrontend } from 'gutenverse-core/hooks';
import { compose } from '@wordpress/compose';
import { withAnimationAdvanceScript } from 'gutenverse-core/hoc';
import { isAnimationActive } from 'gutenverse-core/helper';

const save = compose(
    withAnimationAdvanceScript('wrapper')
)(({ attributes }) => {
    const {
        elementId,
        displayType,
        backgroundAnimated = {},
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
            displayType,
            {
                'background-animated': isAnimationActive(backgroundAnimated),
            }
        ),
        ...advanceAnimationData
    });

    const _isBgAnimated = isAnimationActive(backgroundAnimated);
    const dataId = elementId?.split('-')[1];

    return (
        <div {...blockProps}>
            {(_isBgAnimated) &&
                <div className="guten-data">
                    {_isBgAnimated &&
                        <div data-var={`bgAnimatedData${dataId}`} data-value={JSON.stringify({
                            ...backgroundAnimated
                        })} />
                    }
                </div>}
            <div className="guten-background-overlay" />
            <div className="guten-inner-wrap" data-id={elementId?.split('-')[1]}>
                {_isBgAnimated && <div className={'guten-background-animated'}><div className={`animated-layer animated-${dataId}`}></div></div>}
                <InnerBlocks.Content />
            </div>
        </div>
    );
});

export default save;