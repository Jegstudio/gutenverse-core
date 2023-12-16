import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';
import classnames from 'classnames';
import { compose } from '@wordpress/compose';
import { isAlignStickyColumn, isAnimationActive, isSticky } from 'gutenverse-core/helper';
import { useAnimationAdvanceData, useAnimationFrontend } from 'gutenverse-core/hooks';
import { useDisplayFrontend } from 'gutenverse-core/hooks';
import { withAnimationAdvanceScript, withCursorEffectScript, withMouseMoveEffectScript } from 'gutenverse-core/hoc';
import { FluidCanvasSave } from 'gutenverse-core/components';

const save = compose(
    withCursorEffectScript,
    withAnimationAdvanceScript('column'),
    withMouseMoveEffectScript
)((props) => {
    const {
        attributes,
    } = props;

    const {
        elementId,
        sticky = {},
        stickyShowOn,
        stickyEase,
        stickyPosition,
        stickyDuration,
        topSticky,
        bottomSticky,
        sectionVerticalAlign,
        cursorEffect,
        backgroundAnimated = {},
    } = attributes;

    const isCanSticky =  isSticky(sticky) && isAlignStickyColumn(sectionVerticalAlign);

    const stickyClass = {
        ['guten-sticky']: isCanSticky,
        [`sticky-${stickyPosition}`]: isCanSticky,
    };

    const cursorEffectClass = {
        ['guten-cursor-effect']: cursorEffect?.show
    };

    const advanceAnimationData = useAnimationAdvanceData(attributes);
    const animationClass = useAnimationFrontend(attributes);
    const displayClass = useDisplayFrontend(attributes);

    const wrapperClasses = classnames(
        'guten-element',
        'guten-column',
        elementId,
        animationClass,
        displayClass,
        stickyClass,
        cursorEffectClass,
        {
            'background-animated': isAnimationActive(backgroundAnimated),
        }
    );

    const blockProps = useBlockProps.save({
        className: wrapperClasses,
        ...advanceAnimationData,
        ...(
            isCanSticky
                ? {'data-id': elementId?.split('-')[1]}
                : {}
        ),
    });

    const _isBgAnimated = isAnimationActive(backgroundAnimated);
    const dataId = elementId?.split('-')[1];

    return (
        <div {...blockProps}>
            <FluidCanvasSave attributes={attributes} />
            {(isCanSticky || _isBgAnimated) &&
                <div className="guten-data">
                    {isCanSticky && <div data-var={`stickyData${elementId?.split('-')[1]}`} data-value={JSON.stringify({
                        sticky,
                        stickyShowOn,
                        stickyPosition,
                        stickyEase,
                        stickyDuration,
                        topSticky,
                        bottomSticky
                    })} />}
                    {_isBgAnimated &&
                        <div data-var={`bgAnimatedData${dataId}`} data-value={JSON.stringify({
                            ...backgroundAnimated
                        })} />
                    }
                </div>}
            <div className="guten-background-overlay"></div>
            <div className={'sticky-wrapper'} data-id={elementId?.split('-')[1]}>
                <div className="guten-column-wrapper">
                    {_isBgAnimated && <div className={'guten-background-animated'}><div className={`animated-layer animated-${dataId}`}></div></div>}
                    <InnerBlocks.Content />
                </div>
            </div>
        </div>
    );
});

export default save;