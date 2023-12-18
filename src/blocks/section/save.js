import classnames from 'classnames';
import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';
import { withVideoBackground, withCursorEffectScript, withMouseMoveEffectScript, withBackgroundEffectScript} from 'gutenverse-core/hoc';
import { SectionDividerBottom, SectionDividerTop } from './components/section-divider';
import { compose } from '@wordpress/compose';
import { isAnimationActive, isSticky } from 'gutenverse-core/helper';
import { withAnimationAdvanceScript } from 'gutenverse-core/hoc';
import { useAnimationFrontend } from 'gutenverse-core/hooks';
import { useDisplayFrontend } from 'gutenverse-core/hooks';
import { useAnimationAdvanceData } from 'gutenverse-core/hooks';
import { isEmptyValue } from 'gutenverse-core/editor-helper';
import { SectionDividerAnimatedBottomSave, SectionDividerAnimatedTopSave } from './components/section-divider-animated';
import { FluidCanvasSave } from 'gutenverse-core/components';

const save = compose(
    withAnimationAdvanceScript('section'),
    withVideoBackground,
    withCursorEffectScript,
    withMouseMoveEffectScript,
    withBackgroundEffectScript,
)((props) => {
    const {
        attributes,
        videoContainer
    } = props;

    const {
        elementId,
        layout = 'boxed',
        gap = 'default',
        align,
        overflow,
        topDivider,
        bottomDivider,
        topDividerAnimated,
        bottomDividerAnimated,
        sticky = {},
        stickyShowOn,
        stickyEase,
        stickyPosition,
        stickyDuration,
        topSticky,
        bottomSticky,
        backgroundAnimated = {},
        cursorEffect,
        backgroundEffect = {},
    } = attributes;

    const advanceAnimationData = useAnimationAdvanceData(attributes);
    const animationClass = useAnimationFrontend(attributes);
    const displayClass = useDisplayFrontend(attributes);

    const className = classnames(
        'guten-element',
        'guten-section',
        elementId,
        animationClass,
        displayClass,
        {
            'background-animated': isAnimationActive(backgroundAnimated),
            [`layout-${layout}`]: layout,
            [`align-${align}`]: align,
            [`overflow-${overflow}`]: overflow && overflow !== 'none',
            ['guten-sticky']: isSticky(sticky),
            [`sticky-${stickyPosition}`]: isSticky(sticky),
            ['guten-cursor-effect']: cursorEffect?.show,
        }
    );

    const wrapperClassName = classnames(
        'section-wrapper',
        {
            ['guten-section-wrapper']: isSticky(sticky),
            [`section-${elementId}`]: isSticky(sticky),
            [`sticky-${stickyPosition}`]: isSticky(sticky),
        }
    );

    const containerClass = classnames('guten-container', {
        [`guten-column-gap-${gap}`]: true,
    });

    const _isSticky = isSticky(sticky);
    const _isBgAnimated = isAnimationActive(backgroundAnimated);
    const _isBgEffect = (backgroundEffect !== undefined) && (backgroundEffect?.type !== 'none');
    const _isTopDividerAnimated = !isEmptyValue(topDividerAnimated) && topDividerAnimated.type !== 'none';
    const _isBottomDividerAnimated = !isEmptyValue(bottomDividerAnimated) && bottomDividerAnimated.type !== 'none';
    const dataId = elementId?.split('-')[1];

    return (
        <div className={wrapperClassName} data-id={dataId}>
            <FluidCanvasSave attributes={attributes} />
            <section { ...useBlockProps.save({ className, ...advanceAnimationData })}>
                {(_isSticky || _isBgAnimated || _isTopDividerAnimated || _isBottomDividerAnimated) &&
                    <div className="guten-data">
                        {_isSticky &&
                            <div data-var={`stickyData${dataId}`} data-value={JSON.stringify({
                                sticky,
                                stickyShowOn,
                                stickyPosition,
                                stickyEase,
                                stickyDuration,
                                topSticky,
                                bottomSticky
                            })} />
                        }
                        {_isBgAnimated &&
                            <div data-var={`bgAnimatedData${dataId}`} data-value={JSON.stringify({
                                ...backgroundAnimated
                            })} />
                        }
                        {_isTopDividerAnimated &&
                            <div data-var={`topDividerAnimatedData${dataId}`} data-value={JSON.stringify({
                                ...topDividerAnimated
                            })} />
                        }
                        {_isBottomDividerAnimated &&
                            <div data-var={`bottomDividerAnimatedData${dataId}`} data-value={JSON.stringify({
                                ...bottomDividerAnimated
                            })} />
                        }
                    </div>
                }
                {_isBgAnimated && <div className={'guten-background-animated'}><div className={`animated-layer animated-${dataId}`}></div></div>}
                {_isBgEffect && <div className="guten-background-effect"><div className="inner-background-container"></div></div>}
                {videoContainer}
                <div className="guten-background-overlay"></div>
                {topDivider && <SectionDividerTop {...props} />}
                {bottomDivider && <SectionDividerBottom {...props} />}
                {_isTopDividerAnimated && <SectionDividerAnimatedTopSave {...props} />}
                {_isBottomDividerAnimated && <SectionDividerAnimatedBottomSave {...props} />}
                <div className={containerClass}>
                    <InnerBlocks.Content />
                </div>
            </section>
        </div>
    );
});

export default save;