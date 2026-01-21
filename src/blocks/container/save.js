import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';
import classnames from 'classnames';
import isEmpty from 'lodash/isEmpty';
import { useAnimationFrontend, useDisplayFrontend } from 'gutenverse-core/hooks';
import { withVideoBackground, withBackgroundSlideshowScript, withCursorEffectScript, withBackgroundEffectScript, withAnimationAdvanceScript } from 'gutenverse-core/hoc';
import { SectionDividerBottom, SectionDividerTop } from '../section/components/section-divider';
import { SectionDividerAnimatedBottomSave, SectionDividerAnimatedTopSave } from '../section/components/section-divider-animated';
import { isEmptyValue } from 'gutenverse-core/editor-helper';
import { compose } from '@wordpress/compose';
import { FluidCanvasSave } from 'gutenverse-core/components';
import { isAnimationActive } from 'gutenverse-core/helper';

const save = compose(
    withAnimationAdvanceScript('container'),
    withVideoBackground,
    withBackgroundSlideshowScript,
    withCursorEffectScript,
    withBackgroundEffectScript
)(({ attributes, videoContainer, slideElements }) => {
    const {
        elementId,
        containerLayout,
        backgroundAnimated,
        background,
        backgroundOverlay,
        backgroundOverlayHover,
        cursorEffect,

        // New effects
        backgroundEffect,
        topDivider,
        bottomDivider,
        topDividerAnimated,
        bottomDividerAnimated
    } = attributes;

    const dataId = elementId?.split('-')[1];
    const isSlideShow = background?.slideImage?.length > 0;
    const _isBgAnimated = isAnimationActive(backgroundAnimated);
    const _isTopDividerAnimated = !isEmptyValue(topDividerAnimated) && topDividerAnimated.type !== 'none';
    const _isBottomDividerAnimated = !isEmptyValue(bottomDividerAnimated) && bottomDividerAnimated.type !== 'none';
    const isBackgroundEffect = (backgroundEffect !== undefined) && (backgroundEffect?.type !== 'none') && !isEmpty(backgroundEffect);

    const animationClass = useAnimationFrontend(attributes);
    const displayClass = useDisplayFrontend(attributes);

    const className = classnames(
        'guten-element',
        'guten-flex-container',
        containerLayout,
        elementId,
        animationClass,
        displayClass,
        {
            'background-animated': _isBgAnimated,
            'guten-background-slideshow': isSlideShow,
            'guten-video-background': background?.backgroundType === 'video' && background?.videoUrl,
            ['guten-cursor-effect']: cursorEffect?.show,
            'guten-background-effect-active': isBackgroundEffect,
        }
    );

    return (
        <div {...useBlockProps.save({ className })} data-id={dataId}>
            <FluidCanvasSave attributes={attributes} />
            {(_isBgAnimated || isSlideShow || _isTopDividerAnimated || _isBottomDividerAnimated) &&
                <div className="guten-data">
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
            {!isEmpty(topDivider) && <SectionDividerTop {...{ attributes }} />}
            {!isEmpty(bottomDivider) && <SectionDividerBottom {...{ attributes }} />}
            {_isTopDividerAnimated && <SectionDividerAnimatedTopSave {...{ attributes }} />}
            {_isBottomDividerAnimated && <SectionDividerAnimatedBottomSave {...{ attributes }} />}
            {'boxed' === containerLayout ? <div className="guten-inner-container">
                <InnerBlocks.Content />
            </div> : <InnerBlocks.Content />}
        </div>
    );
});

export default save;
