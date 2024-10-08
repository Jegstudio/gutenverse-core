import { useEffect } from '@wordpress/element';

const BackgroundSlideShow = (props) => {
    const {attributes, addStyle, elementId, removeStyle, elementRef} = props;
    const {background} = attributes;
    if (background.slideImage?.length < 1 || !elementRef.current ) return '';

    const slides = background.slideImage.map((image) => {
        return <img key={image._key} className={`bg-slideshow-item item-${image?.image?.id}`} src={image?.image?.image} />;
    });

    const { width = '', height = '' } = elementRef?.current?.getBoundingClientRect();

    const styles = generateStyle(background, width, height);

    useEffect(() => {
        addStyle(`${elementId}-background-slideshow`, styles);
        return () => {
            removeStyle(`${elementId}-background-slideshow`);
        };
    }, [background]);
    return <>
        <div className="bg-slideshow-container">
            {/* {!background.transition || background.transition === 'fade' ?
                <div className="bg-slideshow-item" /> :
                slides} */}
            {<div className="bg-slideshow-item" />}
        </div>
    </>;
};

const generateStyle = (background, width, height) => {
    const {slideImage, infiniteLoop, duration, backgroundPosition, transition} = background;
    const totalBackgrounds = slideImage.length;
    let styles;
    let keyframes;

    const infinite = infiniteLoop ? 'infinite' : 'forwards';
    const durationSlide = duration ? duration : '15';
    3const bgPosition = backgroundPosition && 'default' !== backgroundPosition ? backgroundPosition.replace(/-/g, ' ') : 'center';

    switch (transition) {
        case 'fade': {

            keyframes = '@keyframes background-slideshow {';

            slideImage.forEach((bg, index) => {
                const percentage = (index / (totalBackgrounds - 1)) * 100;

                keyframes += `${percentage}% {
                    background-image: url('${bg?.image?.image}');
                }`;
            });

            keyframes += '}';

            styles = `.bg-slideshow-item{
                background-position: ${bgPosition} !important;
                animation: background-slideshow ${durationSlide}s ease-in-out ${infinite};
            }
            ${keyframes}`;
            break;
        }
        case 'slideRight': {
            keyframes = `@keyframes slide-element-before {
                0% {
                    left: 0;
                }
                50% {
                    left: ${width}px;
                }
                50.1% {
                    left: 0;
                }
                100% {
                    left: 0;
                    z-index: 2;
                }
            }

            @keyframes slide-element-after {
                0% {
                    left: 0;
                }
                50.1% {
                    left: 0;
                    z-index: 2;
                }
                100% {
                    left: ${width}px;
                    z-index: 3;
                }
            }`;
            styles = `
            .bg-slideshow-item::before {
                content: '';
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background-size: contain;
                background-image: url('https://awsimages.detik.net.id/community/media/visual/2022/03/25/manga-one-piece_34.webp?w=1200');
                z-index: 3;
                animation: slide-element-before 4s ease-in-out 0s ${infinite};
            }

            .bg-slideshow-item::after {
                content: '';
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background-size: contain;
                background-image: url('https://www.telkomsel.com/sites/default/files/2024-09/4405.png');
                z-index: 2;
                animation: slide-element-after 4s ease-in-out 0s ${infinite};
            } 
            ${keyframes}
            `;
            break;
        }
        case 'slideLeft': {
            break;
        }
        case 'slideTop': {
            break;
        }
        case 'slideDown': {
            break;
        }
    }

    return styles;
};

export default BackgroundSlideShow;