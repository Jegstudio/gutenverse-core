import { compose } from '@wordpress/compose';

import { withCustomStyle } from 'gutenverse-core/hoc';
import { useBlockProps } from '@wordpress/block-editor';
import classnames from 'classnames';
import { PanelController } from 'gutenverse-core/controls';
import { panelList } from './panels/panel-list';
import SwiperCore, { Autoplay, Navigation, Pagination, Zoom } from 'swiper';
import { Swiper } from 'gutenverse-core/components';
import ContentItem from './components/content-item';
import { swiperSettings } from 'gutenverse-core/editor-helper';
import { useRef } from '@wordpress/element';
import { useEffect, useState } from '@wordpress/element';
import { withCopyElementToolbar } from 'gutenverse-core/hoc';
import { useAnimationEditor } from 'gutenverse-core/hooks';
import { useDisplayEditor } from 'gutenverse-core/hooks';
import { dispatch } from '@wordpress/data';
import { canRenderTransform } from 'gutenverse-core/styling';

SwiperCore.use([Autoplay, Navigation, Pagination, Zoom]);

const TestimonialsBlock = compose(
    withCustomStyle(panelList),
    withCopyElementToolbar()
)((props) => {
    const {
        selectBlock
    } = dispatch('core/block-editor');

    const {
        clientId,
        attributes,
        setElementRef
    } = props;

    const {
        elementId,
        testimonialData,
        contentType,
        showQuote,
        iconQuote,
        quoteOverride,
        transform
    } = attributes;

    const animationClass = useAnimationEditor(attributes);
    const displayClass = useDisplayEditor(attributes);
    const testimonialRef = useRef();
    const [theTransform, setTheTransform] = useState(false);

    useEffect(() => {
        setTheTransform(canRenderTransform(transform));
    }, [transform]);

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
            {
                'gutenverse-transform': theTransform
            }
        ),
        ref: testimonialRef
    });

    const focusBlock = () => {
        selectBlock(clientId);
    };

    useEffect(() => {
        if (testimonialRef.current) {
            setElementRef(testimonialRef.current);
        }
    }, [testimonialRef]);

    return <>
        <PanelController panelList={panelList} {...props} />
        <div {...blockProps}>
            <div className="testimonials-list" onClick={focusBlock}>
                <Swiper
                    {...swiperSettings(attributes)}
                    shouldSwiperUpdate={true}
                    rebuildOnUpdate={true}>
                    {testimonialData.map((data, index) => <div key={index} >
                        <ContentItem {...data} contentType={contentType} showQuote={showQuote} iconQuote={iconQuote} quoteOverride={quoteOverride} />
                    </div>)}
                </Swiper>
            </div>
        </div>
    </>;
});

export default TestimonialsBlock;