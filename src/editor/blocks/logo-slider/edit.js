import { compose } from '@wordpress/compose';
import { withCustomStyle } from 'gutenverse-core/hoc';
import { useBlockProps } from '@wordpress/block-editor';
import { classnames } from 'gutenverse-core/components';
import { PanelController } from 'gutenverse-core/controls';
import { panelList } from './panels/panel-list';
import Swiper from '../../components/swiper/id-swiper';
import { swiperSettings } from 'gutenverse-core/editor-helper';
import { useRef } from '@wordpress/element';
import { useEffect } from '@wordpress/element';
import { getImageSrc } from 'gutenverse-core/editor-helper';
import { isEmpty } from 'lodash';
import { withCopyElementToolbar } from 'gutenverse-core/hoc';
import { useAnimationEditor } from 'gutenverse-core/hooks';
import { useDisplayEditor } from 'gutenverse-core/hooks';
import { dispatch } from '@wordpress/data';

const LogoSlider = compose(
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
        logos,
    } = attributes;

    const sliderRef = useRef();
    const animationClass = useAnimationEditor(attributes);
    const displayClass = useDisplayEditor(attributes);

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
        ref: sliderRef
    });

    const focusBlock = () => {
        selectBlock(clientId);
    };

    useEffect(() => {
        if (sliderRef.current) {
            setElementRef(sliderRef.current);
        }
    }, [sliderRef]);

    return <>
        <PanelController panelList={panelList} {...props} />
        <div  {...blockProps}>
            <div className="client-list" onClick={focusBlock}>
                <Swiper
                    {...swiperSettings(attributes)}
                    shouldSwiperUpdate={true}
                    rebuildOnUpdate={true}>
                    {logos.map((logo, index) => {
                        return <div className="image-list" key={index}>
                            <div className="content-image">
                                {logo && <img className="main-image" src={getImageSrc(logo.src)} alt={logo.title} />}
                                {logo && <img className="hover-image" src={!isEmpty(logo.hoverSrc) ? getImageSrc(logo.hoverSrc) : getImageSrc(logo.src)} alt={logo.title} />}
                            </div>
                        </div>;
                    })}
                </Swiper>
            </div>
        </div>
    </>;
});

export default LogoSlider;