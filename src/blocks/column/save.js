import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';
import classnames from 'classnames';
import { compose } from '@wordpress/compose';
import { isAlignStickyColumn, isAnimationActive, isSticky } from 'gutenverse-core/helper';
import { useAnimationAdvanceData, useAnimationFrontend } from 'gutenverse-core/hooks';
import { useDisplayFrontend } from 'gutenverse-core/hooks';
import { withAnimationAdvanceScript, withBackgroundEffectScript, withCursorEffectScript, withMouseMoveEffectScript, withAutoRecovery } from 'gutenverse-core/hoc';
import { FluidCanvasSave } from 'gutenverse-core/components';
import isEmpty from 'lodash/isEmpty';

const save = compose(
    withAnimationAdvanceScript('column'),
    withMouseMoveEffectScript,
    withBackgroundEffectScript,
    withCursorEffectScript,
    withAutoRecovery
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
        backgroundOverlay,
        backgroundOverlayHover,
        backgroundAnimated = {},
        backgroundEffect = {},
        anchor
    } = attributes;
    const isCanSticky = isSticky(sticky) && isAlignStickyColumn(sectionVerticalAlign);
    const isBackgroundEffect = (backgroundEffect !== undefined) && (backgroundEffect?.type !== 'none') && !isEmpty(backgroundEffect);

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
            'guten-background-effect-active': isBackgroundEffect,
        }
    );

    const blockProps = useBlockProps.save({
        className: wrapperClasses,
        id: anchor,
        ...advanceAnimationData,
        ...(
            isCanSticky
                ? { 'data-id': elementId?.split('-')[1] }
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
            {
                (!isEmpty(backgroundOverlay) || !isEmpty(backgroundOverlayHover)) && <div className="guten-background-overlay"></div>
            }
            {
                isCanSticky ? <div className={'sticky-wrapper'} data-id={elementId?.split('-')[1]}>
                    <div className="guten-column-wrapper">
                        {isBackgroundEffect && <div className="guten-background-effect"><div className="inner-background-container"></div></div>}
                        {_isBgAnimated && <div className={'guten-background-animated'}><div className={`animated-layer animated-${dataId}`}></div></div>}
                        <InnerBlocks.Content />
                    </div>
                </div> : <div className="guten-column-wrapper" data-id={elementId?.split('-')[1]}>
                    {isBackgroundEffect && <div className="guten-background-effect"><div className="inner-background-container"></div></div>}
                    {_isBgAnimated && <div className={'guten-background-animated'} data-id={elementId?.split('-')[1]}><div className={`animated-layer animated-${dataId}`}></div></div>}
                    <InnerBlocks.Content />
                </div>
            }
        </div>
    );
});

export default save;