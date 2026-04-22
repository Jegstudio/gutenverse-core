
import classnames from 'classnames';
import { useBlockProps } from '@wordpress/block-editor';
import { InnerBlocks } from '@wordpress/block-editor';
import { useAnimationAdvanceData, useAnimationFrontend, useDisplayFrontend } from 'gutenverse-core/hooks';
import { compose } from '@wordpress/compose';
import { withAnimationAdvanceScript, withBackgroundEffectScript, withCursorEffectScript, withMouseMoveEffectScript, withBackgroundSlideshowScript, withVideoBackground } from 'gutenverse-core/hoc';
import { isAnimationActive } from 'gutenverse-core/helper';
import { FluidCanvasSave } from 'gutenverse-core/components';
import isEmpty from 'lodash/isEmpty';

const saveV4 = compose(
    withAnimationAdvanceScript('wrapper'),
    withVideoBackground,
    withCursorEffectScript,
    withMouseMoveEffectScript,
    withBackgroundEffectScript,
    withBackgroundSlideshowScript,
)((props) => {
    const {
        attributes,
        slideElements,
        videoContainer,
    } = props;
    const {
        elementId,
        displayType,
        cursorEffect,
        url,
        linkTarget,
        backgroundOverlay,
        backgroundOverlayHover,
        backgroundAnimated = {},
        backgroundEffect,
        background,
    } = attributes;

    const isSlideShow = background?.slideImage?.length > 0;
    const usingFeaturedImage = !isEmpty(background?.useFeaturedImage) && (background?.useFeaturedImage?.Desktop || background?.useFeaturedImage?.Tablet || background?.useFeaturedImage?.Mobile);
    const animationClass = useAnimationFrontend(attributes);
    const advanceAnimationData = useAnimationAdvanceData(attributes);
    const displayClass = useDisplayFrontend(attributes);
    const isBackgroundEffect = (backgroundEffect !== undefined) && (backgroundEffect?.type !== 'none') && !isEmpty(backgroundEffect);

    const cursorEffectClass = {
        ['guten-cursor-effect']: cursorEffect?.show
    };

    const className = classnames(
        'guten-element',
        'guten-wrap-helper',
        'no-margin',
        elementId,
        animationClass,
        displayType,
        displayClass,
        cursorEffectClass,
        {
            'background-animated': isAnimationActive(backgroundAnimated),
            'with-url': url,
            'guten-background-effect-active': isBackgroundEffect,
            'guten-background-slideshow': isSlideShow,
            'guten-using-featured-image': usingFeaturedImage,
        }
    );

    const _isBgAnimated = isAnimationActive(backgroundAnimated);
    const dataId = elementId?.split('-')[1];
    const newLinkTarget = (linkTarget === '_blank' || linkTarget === true) ? '_blank' : '_self';
    return (
        <div className={className} {...advanceAnimationData} onClick={url && `window.open('${url}', '${newLinkTarget}');`}>
            {(_isBgAnimated || isSlideShow) &&
                <div className="guten-data">
                    {_isBgAnimated &&
                        <div data-var={`bgAnimatedData${dataId}`} data-value={JSON.stringify({
                            ...backgroundAnimated
                        })} />
                    }
                    {isSlideShow &&
                        <div data-var={`backgroundSlideshow${dataId}`} data-value={( () => {
                            const { slideImage, ...rest } = background;
                            return JSON.stringify({
                                ...rest,
                                slideLength: slideImage?.length || 0
                            });
                        } )()} />
                    }
                </div>}
            <FluidCanvasSave attributes={attributes} />
            {background.type === 'video' && videoContainer}
            {!_isBgAnimated && isSlideShow && slideElements}
            {
                (!isEmpty(backgroundOverlay) || !isEmpty(backgroundOverlayHover)) && <div className="guten-background-overlay"></div>
            }
            <div className="guten-inner-wrap" data-id={dataId}>
                {isBackgroundEffect && <div className="guten-background-effect"><div className="inner-background-container"></div></div>}
                {_isBgAnimated && <div className={'guten-background-animated'}><div className={`animated-layer animated-${dataId}`}>
                    {isSlideShow && slideElements}
                </div></div>}
                <InnerBlocks.Content />
            </div>
        </div>
    );
});

export default saveV4;
