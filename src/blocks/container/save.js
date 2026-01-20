import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';
import classnames from 'classnames';
import isEmpty from 'lodash/isEmpty';
import { useAnimationFrontend, useDisplayFrontend } from 'gutenverse-core/hooks';
import { withVideoBackground, withBackgroundSlideshowScript } from 'gutenverse-core/hoc';
import { compose } from '@wordpress/compose';
import { FluidCanvasSave } from 'gutenverse-core/components';
import { isAnimationActive } from 'gutenverse-core/helper';

const save = compose(
    withVideoBackground,
    withBackgroundSlideshowScript
)(({ attributes, videoContainer, slideElements }) => {
    const {
        elementId,
        containerLayout,
        backgroundAnimated,
        background,
        backgroundOverlay,
        backgroundOverlayHover
    } = attributes;

    const dataId = elementId?.split('-')[1];
    const isSlideShow = background?.slideImage?.length > 0;
    const _isBgAnimated = isAnimationActive(backgroundAnimated);
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
            'guten-background-slideshow' : isSlideShow,
            'guten-video-background': background?.backgroundType === 'video' && background?.videoUrl,
        }
    );

    return (
        <div {...useBlockProps.save({ className })} data-id={dataId}>
            <FluidCanvasSave attributes={attributes} />
            {(_isBgAnimated || isSlideShow) &&
                <div className="guten-data">
                    {_isBgAnimated &&
                        <div data-var={`bgAnimatedData${dataId}`} data-value={JSON.stringify({
                            ...backgroundAnimated
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
            {videoContainer}
            {
                (!isEmpty(backgroundOverlay) || !isEmpty(backgroundOverlayHover)) && <div className="guten-background-overlay"></div>
            }
            {'boxed' === containerLayout ? <div className="guten-inner-container">
                <InnerBlocks.Content />
            </div> : <InnerBlocks.Content />}
        </div>
    );
});

export default save;
