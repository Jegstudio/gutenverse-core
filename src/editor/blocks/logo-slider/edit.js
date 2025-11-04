import { compose } from '@wordpress/compose';
import { withMouseMoveEffect, withPartialRender } from 'gutenverse-core/hoc';
import { useBlockProps } from '@wordpress/block-editor';
import { classnames } from 'gutenverse-core/components';
import { BlockPanelController } from 'gutenverse-core/controls';
import { panelList } from './panels/panel-list';
import { useEffect, useRef, useState } from '@wordpress/element';
import { getImageSrc } from 'gutenverse-core/editor-helper';
import { isEmpty } from 'gutenverse-core/helper';
import { useAnimationEditor, useDisplayEditor } from 'gutenverse-core/hooks';
import { dispatch } from '@wordpress/data';
import { Swiper, swiperSettings } from '../../components/swiper';
import { useDynamicStyle, useGenerateElementId } from 'gutenverse-core/styling';
import getBlockStyle from './styles/block-style';
import { CopyElementToolbar } from 'gutenverse-core/components';

export const logoNormalLazyLoad = (logo) => {
    return <img className="main-image" src={getImageSrc(logo.src)} alt={logo.title} {...(logo.lazyLoad && { loading: 'lazy' })} />;
};

export const logoHoverLazyLoad = (logo) => {
    const hoverSrc = !isEmpty(logo.hoverSrc) ? getImageSrc(logo.hoverSrc) : getImageSrc(logo.src);
    return <img className="hover-image" src={hoverSrc} alt={logo.title} {...(logo.lazyLoad && { loading: 'lazy' })} />;
};

const LogoSlider = compose(
    withPartialRender,
    withMouseMoveEffect
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
        <CopyElementToolbar {...props} />
        <BlockPanelController panelList={panelList} props={props} elementRef={elementRef} setLiveAttr={setLiveAttr} liveAttr={liveAttr} />
        <div  {...blockProps}>
            <div className="client-list" onClick={focusBlock}>
                <Swiper
                    {...swiperSettings(liveAttr)}
                    shouldSwiperUpdate={true}
                    rebuildOnUpdate={true}>
                    {logos.map((logo, index) => {
                        return <div className="image-list" key={index}>
                            {
                                logo.link ? <a href={logo.link} className="content-image">
                                    {logo && logoNormalLazyLoad(logo)}
                                    {logo && logoHoverLazyLoad(logo)}
                                </a> : <div className="content-image">
                                    {logo && logoNormalLazyLoad(logo)}
                                    {logo && logoHoverLazyLoad(logo)}
                                </div>
                            }
                        </div>;
                    })}
                </Swiper>
            </div>
        </div>
    </>;
});

export default LogoSlider;