import classnames from 'classnames';
import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';
import { withVideoBackground, withCursorEffectScript, withMouseMoveEffectScript, withBackgroundEffectScript, withBackgroundSlideshowScript } from 'gutenverse-core/hoc';
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
import isEmpty from 'lodash/isEmpty';

const save = compose(
    withAnimationAdvanceScript('section'),
    withVideoBackground,
    withCursorEffectScript,
    withMouseMoveEffectScript,
    withBackgroundEffectScript,
    withBackgroundSlideshowScript,
)((props) => {
    const {
        attributes,
        videoContainer,
        slideElements
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
        backgroundOverlay,
        backgroundOverlayHover,
        background
    } = attributes;
    const isSlideShow = background?.slideImage?.length > 0;
    const usingFeaturedImage = !isEmpty(background?.useFeaturedImage) && (background?.useFeaturedImage?.Desktop || background?.useFeaturedImage?.Tablet || background?.useFeaturedImage?.Mobile);
    const advanceAnimationData = useAnimationAdvanceData(attributes);
    const animationClass = useAnimationFrontend(attributes);
    const displayClass = useDisplayFrontend(attributes);
    const isBackgroundEffect = (backgroundEffect !== undefined) && (backgroundEffect?.type !== 'none') && !isEmpty(backgroundEffect);

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
            'guten-background-effect-active': isBackgroundEffect,
            'guten-background-slideshow' : isSlideShow,
            'guten-using-featured-image': usingFeaturedImage,
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
    const _isTopDividerAnimated = !isEmptyValue(topDividerAnimated) && topDividerAnimated.type !== 'none';
    const _isBottomDividerAnimated = !isEmptyValue(bottomDividerAnimated) && bottomDividerAnimated.type !== 'none';
    const dataId = elementId?.split('-')[1];

    return (
        <div className={wrapperClassName} data-id={dataId}>
            <section {...useBlockProps.save({ className, ...advanceAnimationData, id: attributes.anchor })}>
                <FluidCanvasSave attributes={attributes} />
                {(_isSticky || _isBgAnimated || _isTopDividerAnimated || _isBottomDividerAnimated || isSlideShow) &&
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
                        {isSlideShow &&
                            <div data-var={`backgroundSlideshow${dataId}`} data-value={JSON.stringify({
                                ...background
                            })} />
                        }
                    </div>
                }
                {_isBgAnimated && <div className={'guten-background-animated'}><div className={`animated-layer animated-${dataId}`}>
                    {isSlideShow && slideElements}
                </div></div>}
                {!_isBgAnimated && isSlideShow && slideElements}
                {isBackgroundEffect && <div className="guten-background-effect"><div className="inner-background-container"></div></div>}
                {videoContainer}
                {
                    (!isEmpty(backgroundOverlay) || !isEmpty(backgroundOverlayHover)) && <div className="guten-background-overlay"></div>
                }
                {!isEmpty(topDivider) && <SectionDividerTop {...props} />}
                {!isEmpty(bottomDivider) && <SectionDividerBottom {...props} />}
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