import { compose } from '@wordpress/compose';
import { withCustomStyle, withMouseMoveEffect } from 'gutenverse-core/hoc';
import { useBlockProps } from '@wordpress/block-editor';
import { classnames } from 'gutenverse-core/components';
import { PanelController } from 'gutenverse-core/controls';
import { panelList } from './panels/panel-list';
import WPSwiper from '../../components/swiper/wp-swiper';
import ContentItem from './components/content-item';
import { swiperSettings } from '../../components/swiper/helper';
import { useRef } from '@wordpress/element';
import { useEffect } from '@wordpress/element';
import { withCopyElementToolbar } from 'gutenverse-core/hoc';
import { useAnimationEditor } from 'gutenverse-core/hooks';
import { useDisplayEditor } from 'gutenverse-core/hooks';
import { dispatch } from '@wordpress/data';
import { getImageSrc } from 'gutenverse-core/editor-helper';
const TestimonialsBlock = compose(
    withCustomStyle(panelList),
    withCopyElementToolbar(),
    withMouseMoveEffect
)((props) => {
    const {
        selectBlock
    } = dispatch('core/block-editor');
    const {
        clientId,
        attributes,
        setElementRef,
        setAttributes
    } = props;
    const {
        elementId,
        testimonialData,
        contentType,
        showQuote,
        iconQuote,
        quoteOverride,
        contentPosition,
        showRating,
        iconRatingHalf,
        iconRatingFull,
        starPosition,
        dotsColor
    } = attributes;
    const animationClass = useAnimationEditor(attributes);
    const displayClass = useDisplayEditor(attributes);
    const testimonialRef = useRef();
    const blockProps = useBlockProps({
        className: classnames(
            'guten-element',
            'guten-testimonials',
            'no-margin',
            elementId,
            animationClass,
            displayClass,
            `style-${contentType}`,
            'quote-override',
        ),
        ref: testimonialRef
    });
    const focusBlock = () => {
        selectBlock(clientId);
    };
    console.log(dotsColor);
    useEffect(() => {
        if (testimonialRef.current) {
            setElementRef(testimonialRef.current);
        }
    }, [testimonialRef]);
    return <>
        <PanelController panelList={panelList} {...props} />
        <div {...blockProps}>
            <div className="testimonials-list" onClick={focusBlock}>
                <WPSwiper
                    {...swiperSettings(attributes)}
                    shouldSwiperUpdate={true}
                    rebuildOnUpdate={true}>
                    {testimonialData.map((data, index) => <div key={index} >
                        <ContentItem {...data}
                            contentType={contentType}
                            showQuote={showQuote}
                            iconQuote={iconQuote}
                            quoteOverride={quoteOverride}
                            contentPosition={contentPosition}
                            showRating={showRating}
                            iconRatingFull={iconRatingFull}
                            iconRatingHalf={iconRatingHalf}
                            starPosition={starPosition}
                            frontEnd={false}
                            setAttributes={setAttributes}
                            index={index}
                            testimonialData={testimonialData}
                            src={getImageSrc(data.src)}
                        />
                    </div>)}
                </WPSwiper>
            </div>
        </div>
    </>;
});

export default TestimonialsBlock;