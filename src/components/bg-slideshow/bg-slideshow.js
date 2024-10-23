import { useEffect, useState } from '@wordpress/element';

const BackgroundSlideShow = (props) => {
    const {attributes, addStyle, elementId, removeStyle, elementRef} = props;
    const {background} = attributes;
    const {slideImage} = background;
    if (background.slideImage?.length < 1 || !elementRef.current ) return '';
    const newSlide = [...background.slideImage, background.slideImage[0]];
    const [ duration, setDuration ] = useState(background.duration);

    let evenSlide = [];
    let oddSlide = [];

    background.slideImage.forEach((item, index) => {
        if (index % 2 === 0) {
            evenSlide.push(item);
        } else {
            oddSlide.push(item);
        }
    });

    const newOddSlide = [...oddSlide, oddSlide[0]];
    const newEvenSlide = [...evenSlide, evenSlide[0]];
    const { width = '', height = '' } = elementRef?.current?.getBoundingClientRect();

    const element = document.querySelector('.second-child-slideshow');
    const images = slideImage.map((image) => image?.image?.image);
    let test = 0;

    useEffect(() => {
        console.log(background.duration, (width * 10 / 100));

        let intervalId = setInterval(() => {
            if (element && images.length > 0) {
                const leftPosition = element.getBoundingClientRect().left;
                if (Math.abs(leftPosition + width) <= (width * 10 / 100)) {
                    let pattern = [0];

                    if (images.length > 1) {
                        pattern.push(images.length - 1);
                    }

                    if (images.length > 2) {
                        pattern.push(1);
                    }

                    const bgImage = images[pattern[test % pattern.length]];
                    element.style.backgroundImage = `url("${bgImage}")`;
                    test++;
                }
            }
        }, background.duration * 1000);

        const styles = generateStyle(background, width, height, newSlide, newOddSlide, newEvenSlide, elementId);
        addStyle(`${elementId}-background-slideshow`, styles);
        return () => {
            removeStyle(`${elementId}-background-slideshow`);
            clearInterval(intervalId);
        };
    }, [background]);
    return <>
        <div className="bg-slideshow-container">
            {/* {!background.transition || background.transition === 'fade' ?
                <div className="bg-slideshow-item" /> :
                slides} */}
            {<div className="bg-slideshow-item">
                <div className="first-child-slideshow" />
                <div className="second-child-slideshow" />
            </div>}
        </div>
    </>;
};

const generateKeyframes = (newSlide, order) => {
    const totalBg = newSlide.length;
    let bgImagekeyframes = `@keyframes background-${order}-slideshow {`;

    newSlide.forEach((bg, index) => {
        const percentage = (index / (totalBg - 1)) * 100;
        if (index === 0 || percentage === 100) {
            if (percentage === 100) {
                bgImagekeyframes += `${percentage - 0.1}% {
                    background-image: url('${newSlide[index - 1]?.image?.image}');
                }`;
            }
            bgImagekeyframes += `${percentage}% {
                background-image: url('${bg?.image?.image}');`;
            bgImagekeyframes += '}';
        } else {
            bgImagekeyframes += `${percentage - 0.15}% {
                background-image: url('${newSlide[index - 1]?.image?.image}');
            }`;
            bgImagekeyframes += `${percentage - 0.1}% {
                background-image: url('${bg?.image?.image}');
            }`;
        }
    });

    bgImagekeyframes += '}';

    return bgImagekeyframes;
};

const generateStyle = (background, width, height, newSlide, newOddSlide, newEvenSlide, elementId) => {
    const {infiniteLoop, duration, backgroundPosition, transition, backgroundSize, backgroundRepeat} = background;
    let styles;
    let keyframes;

    const infinite = infiniteLoop ? 'infinite' : 'forwards';
    const durationSlide = duration ? duration : '15';
    const bgPosition = backgroundPosition && 'default' !== backgroundPosition ? backgroundPosition.replace(/-/g, ' ') : 'center';

    const oddKeyframes = generateKeyframes(newOddSlide, 'even');
    const evenKeyframes = generateKeyframes(newEvenSlide, 'odd');
    const fullKeyframes = generateKeyframes(newSlide, 'full');

    switch (transition) {
        case 'fade': {
            keyframes = `@keyframes fade-element {
                0% {
                    opacity: 1;
                }
                50% {
                    opacity: 0;
                }
                90% {
                    opacity: 1;
                    z-index: 2;
                }
                100% {
                    opacity: 1;
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
                background-size: ${backgroundSize};
                background-position: ${bgPosition} !important;
                background-repeat: ${backgroundRepeat};
                z-index: 3;
                animation: fade-element ${durationSlide}s ease-in-out 0s ${infinite}, background-even-slideshow ${(newEvenSlide.length - 1) * (durationSlide)}s ease ${durationSlide/2}s ${infinite};
            }

            .bg-slideshow-item::after {
                content: '';
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background-size: ${backgroundSize};
                background-position: ${bgPosition} !important;
                background-repeat: ${backgroundRepeat};
                z-index: 2;
                animation: fade-element ${durationSlide}s ease-in-out ${durationSlide/2}s ${infinite}, background-odd-slideshow ${(newOddSlide.length - 1) * (durationSlide)}s ease ${infinite};
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
                50.01% {
                    left: -${width}px;
                }
                100% {
                    left: 0;
                    z-index: 2;
                }
            }

            @keyframes slide-element-after {
                0% {
                    left: -${width}px;
                }
                50.01% {
                    left: 0;
                    z-index: 2;
                }
                100% {
                    left: ${width}px;
                    z-index: 3;
                }
            }`;
            styles = `
            .first-child-slideshow {
                content: '';
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background-size: ${backgroundSize};
                background-position: ${bgPosition} !important;
                background-repeat: ${backgroundRepeat};
                // background-image: url('http://gutenverse.local/wp-content/uploads/2024/09/FeaxosUaUAAWp-T.jpg');
                z-index: 3;
                animation: slide-element-before ${durationSlide}s ease-in-out 0s ${infinite};
            }

            .second-child-slideshow {
                content: '';
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background-size: ${backgroundSize};
                background-position: ${bgPosition} !important;
                background-repeat: ${backgroundRepeat};
                background-image: url('http://gutenverse.local/wp-content/uploads/2024/09/Screenshot-2024-08-14-at-09.38.28.png');
                z-index: 2;
                animation: slide-element-after ${durationSlide}s ease-in-out 0s ${infinite};
            } 
            ${keyframes}
            ${fullKeyframes}`;
            break;
        }
        case 'slideLeft': {
            keyframes = `@keyframes slide-element-before {
                0% {
                    right: 0;
                }
                50% {
                    right: ${width}px;
                }
                50.1% {
                    right:  -${width}px;
                }
                100% {
                    right: 0;
                    z-index: 2;
                }
            }

            @keyframes slide-element-after {
                0% {
                    right: -${width}px;
                }
                50.1% {
                    right: 0;
                    z-index: 2;
                }
                100% {
                    right: ${width}px;
                    z-index: 3;
                }
            }`;

            styles = `
            .bg-slideshow-item::before {
                content: '';
                position: absolute;
                top: 0;
                right: 0;
                width: 100%;
                height: 100%;
                background-size: ${backgroundSize};
                background-position: ${bgPosition} !important;
                background-repeat: ${backgroundRepeat};
                background-image: url('https://awsimages.detik.net.id/community/media/visual/2022/03/25/manga-one-piece_34.webp?w=1200');
                z-index: 3;
                animation: slide-element-before ${durationSlide}s ease-in-out 0s ${infinite}, background-even-slideshow ${(newEvenSlide.length - 1) * (durationSlide)}s ease ${durationSlide/2}s ${infinite};
            }

            .bg-slideshow-item::after {
                content: '';
                position: absolute;
                top: 0;
                right: 0;
                width: 100%;
                height: 100%;
                background-size: ${backgroundSize};
                background-position: ${bgPosition} !important;
                background-repeat: ${backgroundRepeat};
                background-image: url('https://www.telkomsel.com/sites/default/files/2024-09/4405.png');
                z-index: 2;
                animation: slide-element-after ${durationSlide}s ease-in-out 0s ${infinite}, background-odd-slideshow ${(newOddSlide.length - 1) * (durationSlide)}s ease ${infinite};
            } 
            ${keyframes}`;
            break;
        }
        case 'slideTop': {
            keyframes = `@keyframes slide-element-before {
                0% {
                    bottom: 0;
                }
                50% {
                    bottom: ${height}px;
                }
                50.1% {
                    bottom: -${height}px;
                }
                100% {
                    bottom: 0;
                    z-index: 2;
                }
            }

            @keyframes slide-element-after {
                0% {
                    bottom: -${height}px;
                }
                50.1% {
                    bottom: 0;
                    z-index: 2;
                }
                100% {
                    bottom: ${height}px;
                    z-index: 3;
                }
            }`;
            styles = `
            .bg-slideshow-item::before {
                content: '';
                position: absolute;
                bottom: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background-size: ${backgroundSize};
                background-position: ${bgPosition} !important;
                background-repeat: ${backgroundRepeat};
                background-image: url('https://awsimages.detik.net.id/community/media/visual/2022/03/25/manga-one-piece_34.webp?w=1200');
                z-index: 3;
                animation: slide-element-before ${durationSlide}s ease-in-out 0s ${infinite}, background-even-slideshow ${(newEvenSlide.length - 1) * (durationSlide)}s ease ${durationSlide/2}s ${infinite};
            }

            .bg-slideshow-item::after {
                content: '';
                position: absolute;
                bottom: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background-size: ${backgroundSize};
                background-position: ${bgPosition} !important;
                background-repeat: ${backgroundRepeat};
                background-image: url('https://www.telkomsel.com/sites/default/files/2024-09/4405.png');
                z-index: 2;
                animation: slide-element-after ${durationSlide}s ease-in-out 0s ${infinite}, background-odd-slideshow ${(newOddSlide.length - 1) * (durationSlide)}s ease ${infinite};
            } 
            ${keyframes}`;
            break;
        }
        case 'slideDown': {
            keyframes = `@keyframes slide-element-before {
                0% {
                    top: 0;
                }
                50% {
                    top: ${height}px;
                }
                50.1% {
                    top: -${height}px;
                }
                100% {
                    top: 0;
                    z-index: 2;
                }
            }

            @keyframes slide-element-after {
                0% {
                    top: -${height}px;
                }
                50.1% {
                    top: 0;
                    z-index: 2;
                }
                100% {
                    top: ${height}px;
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
                background-size: ${backgroundSize};
                background-position: ${bgPosition} !important;
                background-repeat: ${backgroundRepeat};
                background-image: url('https://awsimages.detik.net.id/community/media/visual/2022/03/25/manga-one-piece_34.webp?w=1200');
                z-index: 3;
                animation: slide-element-before ${durationSlide}s ease-in-out 0s ${infinite}, background-even-slideshow ${(newEvenSlide.length - 1) * (durationSlide)}s ease ${durationSlide/2}s ${infinite};
            }

            .bg-slideshow-item::after {
                content: '';
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background-size: ${backgroundSize};
                background-position: ${bgPosition} !important;
                background-repeat: ${backgroundRepeat};
                background-image: url('https://www.telkomsel.com/sites/default/files/2024-09/4405.png');
                z-index: 2;
                animation: slide-element-after ${durationSlide}s ease-in-out 0s ${infinite}, background-odd-slideshow ${(newOddSlide.length - 1) * (durationSlide)}s ease ${infinite};
            } 
            ${keyframes}`;
            break;
        }
    }

    styles += `
    .${elementId} .guten-container.block-editor-block-list__layout {
        z-index: 5;
    }
    ${oddKeyframes}
    ${evenKeyframes}
    `;

    return styles;
};

export default BackgroundSlideShow;