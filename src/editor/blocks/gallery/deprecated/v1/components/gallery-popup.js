import { useRef, useState } from '@wordpress/element';
import WPSwiper from '../../../components/swiper/wp-swiper';
import { oldImagePlaceholder } from 'gutenverse-core/config';
import { Maximize, Minimize, X, ZoomIn } from 'gutenverse-core/components';
import { swiperSettings } from '../../../components/swiper/helper';

const GalleryPopup = ({ activeIndex, images, onClose }) => {
    const [zoomIn, setZoomIn] = useState(false);
    const [fullscreen, setFullscreen] = useState(false);
    const popupRef = useRef();
    const sliderRef = useRef();

    const toggleZoom = element => {
        if (zoomIn) {
            element.swiper.zoom.out();
            setZoomIn(false);
        } else {
            element.swiper.zoom.in();
            setZoomIn(true);
        }
    };

    const requestFullscreen = element => {
        if (element.requestFullscreen) {
            element.requestFullscreen();
        } else if (element.webkitRequestFullscreen ) {
            element.webkitRequestFullscreen();
        } else if (element.mozRequestFullScreen) {
            element.mozRequestFullScreen();
        } else if (element.msRequestFullscreen) {
            element.msRequestFullscreen();
        }

        setFullscreen(true);
    };

    const exitFullscreen = () => {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
        }

        setFullscreen(false);
    };
    return <div className="gutenverse-popup-gallery" ref={popupRef}>
        <div className="gallery-header">
            <div className="left-header">
                {/* <span>{`${currentIndex}/${images.length}`}</span> */}
            </div>
            <div className="right-header">
                {fullscreen ? <Minimize onClick={exitFullscreen} /> : <Maximize onClick={() => requestFullscreen(popupRef.current)} />}
                <ZoomIn onClick={() => toggleZoom(sliderRef.current)}/>
                <X onClick={onClose} />
            </div>
        </div>
        <div className="gallery-body">
            <div className="images">
                <WPSwiper
                    {...swiperSettings({
                        initialSlide : activeIndex,
                        loop: true,
                        showArrow: true,
                        zoom: true,
                        spacing: 10,
                        itemShowed: 1,
                    })}
                    ref={sliderRef}>
                    {images.map((image, index) => <div className="image-list" key={index}>
                        <div className="content-image swiper-zoom-container">
                            {image && <img className="main-image" src={image.src ? image.src.image : oldImagePlaceholder} alt={image.title} loading={image.lazyLoad ? 'lazy' : 'eager'}/>}
                        </div>
                    </div>)}
                </WPSwiper>
            </div>
        </div>
    </div>;
};

export default GalleryPopup;