import { compose } from '@wordpress/compose';
import { withMouseMoveEffect } from 'gutenverse-core/hoc';
import { useBlockProps } from '@wordpress/block-editor';
import { classnames } from 'gutenverse-core/components';
import { BlockPanelController } from 'gutenverse-core/controls';
import { panelList } from './panels/panel-list';
import { useEffect, useRef, useState } from '@wordpress/element';
import { getImageSrc } from 'gutenverse-core/editor-helper';
import { isEmpty } from 'lodash';
import { withCopyElementToolbar } from 'gutenverse-core/hoc';
import { useAnimationEditor, useDisplayEditor } from 'gutenverse-core/hooks';
import { dispatch } from '@wordpress/data';
import { Swiper, swiperSettings } from '../../components/swiper';
import { useDynamicStyle, useGenerateElementId } from 'gutenverse-core/styling';
import getBlockStyle from './styles/block-style';

export const logoNormalLazyLoad = (logo) => {
    if (logo.lazyLoad) {
        return <img className="main-image" src={getImageSrc(logo.src)} alt={logo.title} loading="lazy" />;
    } else {
        return <img className="main-image" src={getImageSrc(logo.src)} alt={logo.title} />;
    }
};
export const logoHoverLazyLoad = (logo) => {
    if (logo.lazyLoad) {
        return <img className="hover-image" src={!isEmpty(logo.hoverSrc) ? getImageSrc(logo.hoverSrc) : getImageSrc(logo.src)} alt={logo.title} loading="lazy" />;
    } else {
        return <img className="hover-image" src={!isEmpty(logo.hoverSrc) ? getImageSrc(logo.hoverSrc) : getImageSrc(logo.src)} alt={logo.title} />;
    }
};
const LogoSlider = compose(
    // withPartialRender,
    // withCustomStyle(panelList),
    withCopyElementToolbar(),
    // withMouseMoveEffect
)((props) => {
    const {
        selectBlock
    } = dispatch('core/block-editor');

    const {
        clientId,
        attributes,
    } = props;

    const {
        elementId,
        logos,
        initialSlide,
        spacing,
        itemShowed,
        loop,
        showNav,
        showArrow,
        autoplay,
        autoplayTimeout
    } = attributes;

    const elementRef = useRef();
    const animationClass = useAnimationEditor(attributes);
    const displayClass = useDisplayEditor(attributes);

    const [liveAttr, setLiveAttr] = useState({
        initialSlide,
        spacing,
        itemShowed,
        loop,
        showNav,
        showArrow,
        autoplay,
        autoplayTimeout
    });

    useGenerateElementId(clientId, elementId, elementRef);
    useDynamicStyle(elementId, attributes, getBlockStyle, elementRef);

    const blockProps = useBlockProps({
        className: classnames(
            'guten-element',
            'guten-client-logo',
            'grid-desktop-3',
            'no-margin',
            elementId,
            animationClass,
            displayClass,
        ),
        ref: elementRef
    });

    const focusBlock = () => {
        selectBlock(clientId);
    };

    useEffect(() => {
        setLiveAttr({
            ...liveAttr,
            loop,
            showNav,
            showArrow,
            initialSlide,
            autoplay,
            autoplayTimeout
        });
    }, [
        loop,
        showNav,
        showArrow,
        initialSlide,
        autoplay,
        autoplayTimeout
    ]);

    return <>
        <BlockPanelController panelList={panelList} props={props} elementRef={elementRef} setLiveAttr={setLiveAttr} liveAttr={liveAttr} />
        <div  {...blockProps}>
            <div className="client-list" onClick={focusBlock}>
                <Swiper
                    {...swiperSettings(liveAttr)}
                    shouldSwiperUpdate={true}
                    rebuildOnUpdate={true}>
                    {logos.map((logo, index) => {
                        return <div className="image-list" key={index}>
                            <div className="content-image">
                                {logo && logoNormalLazyLoad(logo)}
                                {logo && logoHoverLazyLoad(logo)}
                            </div>
                        </div>;
                    })}
                </Swiper>
            </div>
        </div>
    </>;
});

export default LogoSlider;