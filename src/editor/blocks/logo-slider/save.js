
import { classnames } from 'gutenverse-core/components';
import { useBlockProps } from '@wordpress/block-editor';
import { swiperData } from 'gutenverse-core/helper';
import { getImageSrc } from 'gutenverse-core/editor-helper';
import { isEmpty } from 'lodash';
import { useAnimationFrontend } from 'gutenverse-core/hooks';
import { useDisplayFrontend } from 'gutenverse-core/hooks';
import { withMouseMoveEffectScript } from 'gutenverse-core/hoc';
import { compose } from '@wordpress/compose';

const save = compose(
    withMouseMoveEffectScript
)(({ attributes }) => {
    const {
        elementId,
        logos,
        showNav,
        showArrow,
        arrowPosition,
    } = attributes;

    const animationClass = useAnimationFrontend(attributes);
    const displayClass = useDisplayFrontend(attributes);

    const className = classnames(
        'guten-element',
        'guten-client-logo',
        'grid-desktop-3',
        elementId,
        animationClass,
        displayClass,
        {
            [`arrow-${arrowPosition}`]: arrowPosition
        }
    );

    return (
        <div {...useBlockProps.save({ className })}>
            <div className="client-list">
                <div id={elementId} className="swiper-container" {...swiperData(attributes)}>
                    <div className="swiper-wrapper">
                        {logos.map((logo, index) => {
                            return <div className="swiper-slide image-list" key={index}>
                                <div className="content-image">
                                    <img className="main-image" src={getImageSrc(logo.src)} alt={logo.title} />
                                    <img className="hover-image" src={!isEmpty(logo.hoverSrc) ? getImageSrc(logo.hoverSrc) : getImageSrc(logo.src)} alt={logo.title} />
                                </div>
                            </div>;
                        })}
                    </div>
                    {showNav && <div className="swiper-pagination" />}
                    {showArrow && <div className="swiper-button-prev" />}
                    {showArrow && <div className="swiper-button-next" />}
                </div>
            </div>
        </div>
    );
});

export default save;