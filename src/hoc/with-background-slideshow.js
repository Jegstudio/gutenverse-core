import { useEffect, useRef } from '@wordpress/element';
import { imagePlaceholder } from 'gutenverse-core/config';
import isEmpty from 'lodash/isEmpty';

export const withBackgroundSlideshow = (BlockControl) => {
    return (props) => {
        const {attributes, addStyle, removeStyle} = props;
        const {background = {}, elementId} = attributes;
        if(background.type !== 'slide'){
            return <BlockControl {...props}/>;
        }
        const {slideImage = {}, infiniteLoop = false} = background;
        const elementRefs = useRef(null);
        const slideshowContainerRefs = useRef([]);
        const slideshowImageRefs = useRef([]);

        const elements = <div ref={elementRefs} className="bg-slideshow-item">
            {!isEmpty(slideImage) && slideImage.map((image, index) => (
                <div
                    className={`${elementId}-child-slideshow slideshow-item-container item-${index}`}
                    key={index}
                    ref={(el) => (slideshowContainerRefs.current[index] = el)}>
                    <div
                        className={`${elementId}-slideshow-image slideshow-image ${1 === index ? 'current' : 0 === index ? 'previous' : ''}`}
                        style={{ backgroundImage: `url(${image?.image?.image ? image?.image?.image : imagePlaceholder})` }}
                        ref={(el) => (slideshowImageRefs.current[index] = el)}
                    />
                </div>
            ))}
        </div>;

        useEffect(() => {
            if (isEmpty(slideImage)) return;
            clearInterval(intervalToggle);
            slideshowContainerRefs.current = slideshowContainerRefs.current.filter((el) => el !== null);
            slideshowImageRefs.current = slideshowImageRefs.current.filter((el) => el !== null);

            const duration = (background.displayDuration < 0.1 || undefined === background.displayDuration) ? 1000 : background.displayDuration * 1000;
            const transitions = (background.duration < 0.1 || undefined === background.duration) ? 1000 : background.duration * 1000 ;
            const transitionDuration = (transitions < duration) ? transitions : duration - 100;
            const slideshowImage = slideshowImageRefs.current;
            const slideshowContainer = slideshowContainerRefs.current;
            slideshowImage?.length > 0 && toggleClassWithDuration(slideshowImage, slideshowContainer, duration, infiniteLoop, transitionDuration);

            const styles = generateStyle(background, elementId);
            addStyle(`${elementId}-background-slideshow`, styles);

            return () => {
                removeStyle(`${elementId}-background-slideshow`);
                clearInterval(intervalToggle);
            };
        }, [background.displayDuration,
            background.duration,
            background.slideImage?.length,
            background.transition,
            background.type,
            background.infiniteLoop,
            background.backgroundPosition,
            background.backgroundRepeat,
            background.backgroundSize,
            background.kenBurns,
            background.direction,
        ]);

        let intervalToggle;
        function toggleClassWithDuration(elements, slideshowContainer, duration, infiniteLoop, transition, prevClass = 'previous',  currentClass = 'current', parentClass = 'hasToggledClass') {
            let currentIndex = 1;
            let prevIndex = 0;

            slideshowContainer.forEach(el => {
                el?.classList?.remove(prevClass);
                el?.classList?.remove(currentClass);
                el?.classList?.remove(parentClass);
            });

            slideshowContainer[currentIndex]?.classList.add(currentClass);
            slideshowContainer[prevIndex]?.classList.add(prevClass);
            slideshowContainer[currentIndex]?.classList.add(parentClass);
            slideshowContainer[prevIndex]?.classList.add(parentClass);

            intervalToggle = setInterval(() => {
                if (slideshowContainer.length <= 2) {
                    setTimeout(() => {
                        slideshowContainer[prevIndex].classList.remove(parentClass);
                    }, transition);
                } else  slideshowContainer[prevIndex].classList.remove(parentClass);
                slideshowContainer[prevIndex].classList.remove(prevClass);
                prevIndex = (prevIndex + 1) % elements.length;
                slideshowContainer[prevIndex].classList.add(prevClass);
                slideshowContainer[prevIndex].classList.add(parentClass);

                slideshowContainer[currentIndex]?.classList.remove(currentClass);
                currentIndex = (currentIndex + 1) % elements.length;
                slideshowContainer[currentIndex]?.classList.add(currentClass);
                slideshowContainer[currentIndex]?.classList.add(parentClass);
                if (currentIndex === 1 && slideshowContainer.length <= 2) {
                    setTimeout(() => {
                        slideshowContainer[0].classList.remove(parentClass);
                    }, transition);
                }

                if (!infiniteLoop && currentIndex === (slideImage.length - 1)) {
                    clearInterval(intervalToggle);
                }
            }, duration);

            if (duration <= 0) {
                clearInterval(intervalToggle);
            }
        }

        const slideElement = <div className="bg-slideshow-container">
            {elements}
        </div>;

        const newProps = {
            ...props,
            slideElement
        };

        return <BlockControl
            {...newProps}
        />;
    };
};

const generateStyle = (background, elementId) => {
    const {duration, backgroundPosition, transition, backgroundSize, backgroundRepeat, kenBurns, direction, displayDuration = 1} = background;
    const bgPosition = backgroundPosition && 'default' !== backgroundPosition ? backgroundPosition.replace(/-/g, ' ') : 'center';
    const effectDirection = 'directionOut' === direction ? 'ken-burns-toggle-out' : 'ken-burns-toggle-in';
    const transitions = (duration < 0.1 || undefined === duration) ? 1 : parseFloat(duration);
    const transitionDuration = (parseFloat(transitions) < parseFloat(displayDuration)) ? parseFloat(transitions) : displayDuration - 0.1;
    let styles = '';

    styles += `
        .bg-slideshow-container .bg-slideshow-item .${elementId}-child-slideshow .${elementId}-slideshow-image {
            background-size: ${backgroundSize};
            background-position: ${bgPosition};
            background-repeat: ${backgroundRepeat};
        }
            
        ${kenBurns ? `.bg-slideshow-container .bg-slideshow-item .${elementId}-child-slideshow.hasToggledClass .${elementId}-slideshow-image {
            animation: ${effectDirection} 20s linear forwards;
        }` : ''}
    `;

    switch (transition) {
        case 'slideRight': {
            styles += `
            .bg-slideshow-container .bg-slideshow-item .${elementId}-child-slideshow.previous {
                z-index: 1;
                ${`animation: previous-slideRight ${transitionDuration}s ease-in-out forwards;`}
            }
            
            .bg-slideshow-container .bg-slideshow-item .${elementId}-child-slideshow.current {
                z-index: 2;
                ${`animation: current-slideRight ${transitionDuration}s ease-in-out forwards;`}
            }`;
            break;
        }
        case 'slideLeft': {
            styles += `
            .bg-slideshow-container .bg-slideshow-item .${elementId}-child-slideshow.previous {
                z-index: 1;
                left: unset;
                ${`animation: previous-slideLeft ${transitionDuration}s ease-in-out forwards;`}
            }
            
            .bg-slideshow-container .bg-slideshow-item .${elementId}-child-slideshow.current {
                z-index: 2;
                left: unset;
                ${`animation: current-slideLeft ${transitionDuration}s ease-in-out forwards;`}
            }`;
            break;
        }
        case 'slideTop': {
            styles += `
            .bg-slideshow-container .bg-slideshow-item .${elementId}-child-slideshow.previous {
                z-index: 1;
                top: unset;
                ${`animation: previous-slideTop ${transitionDuration}s ease-in-out forwards;`}
            }
            
            .bg-slideshow-container .bg-slideshow-item .${elementId}-child-slideshow.current {
                z-index: 2;
                top: unset;
                ${`animation: current-slideTop ${transitionDuration}s ease-in-out forwards;`}
            }`;
            break;
        }
        case 'slideDown': {
            styles += `
            .bg-slideshow-container .bg-slideshow-item .${elementId}-child-slideshow.previous {
                z-index: 1;
                ${`animation: previous-slideBottom ${transitionDuration}s ease-in-out forwards;`}
            }
            
            .bg-slideshow-container .bg-slideshow-item .${elementId}-child-slideshow.current {
                z-index: 2;
                ${`animation: current-slideBottom ${transitionDuration}s ease-in-out forwards;`}
            }`;
            break;
        }
        default: {
            styles += `
            .bg-slideshow-container .bg-slideshow-item .${elementId}-child-slideshow.previous {
                ${`animation: fade ${transitionDuration}s ease-in-out forwards;`}
            }`;
            break;
        }
    }

    return styles;
};