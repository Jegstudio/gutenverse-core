import { useEffect, useRef } from '@wordpress/element';
import { imagePlaceholder } from 'gutenverse-core/config';
import isEmpty from 'lodash/isEmpty';

export const withBackgroundSlideshow = (BlockControl) => {
    return (props) => {
        const {attributes, addStyle, removeStyle} = props;
        const {background, elementId} = attributes;
        const {slideImage, infiniteLoop} = background;
        const elementRefs = useRef(null);
        if ( isEmpty(background.slideImage) ) return <BlockControl {...props}/>;

        const elements = <div ref={elementRefs} className="bg-slideshow-item">
            {slideImage.map((image, index) => (
                <div
                    className={`${elementId}-child-slideshow slideshow-item-container item-${index}`}
                    key={index} >
                    <div
                        className={`${elementId}-slideshow-image slideshow-image ${1 === index ? 'current' : 0 === index ? 'previous' : ''}`}
                        style={{ backgroundImage: `url(${image?.image?.image ? image?.image?.image : imagePlaceholder})` }}
                    />
                </div>
            ))}
        </div>;

        let intervalToggle;
        function toggleClassWithDuration(elements, slideshowContainer, duration, infiniteLoop, prevClass = 'previous',  currentClass = 'current', parentClass = 'hasToggledClass') {
            let currentIndex = 1;
            let prevIndex = 0;

            slideshowContainer.forEach(el => {
                el.classList.remove(prevClass);
                el.classList.remove(currentClass);
                el.classList.remove(parentClass);
            });

            slideshowContainer[currentIndex]?.classList.add(currentClass);
            slideshowContainer[prevIndex]?.classList.add(prevClass);
            slideshowContainer[currentIndex]?.classList.add(parentClass);
            slideshowContainer[prevIndex]?.classList.add(parentClass);

            intervalToggle = setInterval(() => {
                slideshowContainer[prevIndex].classList.remove(parentClass);
                slideshowContainer[prevIndex].classList.remove(prevClass);
                prevIndex = (prevIndex + 1) % elements.length;
                slideshowContainer[prevIndex].classList.add(prevClass);
                slideshowContainer[prevIndex].classList.add(parentClass);

                slideshowContainer[currentIndex]?.classList.remove(currentClass);
                currentIndex = (currentIndex + 1) % elements.length;
                slideshowContainer[currentIndex]?.classList.add(currentClass);
                slideshowContainer[currentIndex]?.classList.add(parentClass);

                if (!infiniteLoop && currentIndex === (slideImage.length - 1)) {
                    clearInterval(intervalToggle);
                }
            }, duration);

            if (duration <= 0) {
                clearInterval(intervalToggle);
            }
        }

        useEffect(() => {
            clearInterval(intervalToggle);
            const duration = background.displayDuration < 0.1 ? 500 : background.displayDuration * 1000;
            const slideshowImage = document.querySelectorAll(`.${elementId}-slideshow-image`);
            const slideshowContainer = document.querySelectorAll(`.${elementId}-child-slideshow`);
            slideshowImage?.length > 0 && toggleClassWithDuration(slideshowImage, slideshowContainer, duration, infiniteLoop);

            const styles = generateStyle(background, elementId);
            addStyle(`${elementId}-background-slideshow`, styles);
            return () => {
                removeStyle(`${elementId}-background-slideshow`);
                clearInterval(intervalToggle);
            };
        }, [background.displayDuration,
            background.duration,
            background.slideImage.length,
            background.transition,
            background.type,
            background.infiniteLoop,
            background.backgroundPosition,
            background.backgroundRepeat,
            background.backgroundSize,
            background.kenBurns,
            background.direction]);

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
    const {duration, backgroundPosition, transition, backgroundSize, backgroundRepeat, kenBurns, direction} = background;
    const bgPosition = backgroundPosition && 'default' !== backgroundPosition ? backgroundPosition.replace(/-/g, ' ') : 'center';
    const effectDirection = 'directionOut' === direction ? 'ken-burns-toggle-out' : 'ken-burns-toggle-in';
    let styles = '';

    styles += `
        .bg-slideshow-container .bg-slideshow-item .${elementId}-child-slideshow .${elementId}-slideshow-image {
            background-size: ${backgroundSize};
            background-position: ${bgPosition};
            background-repeat: ${backgroundRepeat};
        }
            
        ${kenBurns ? `.bg-slideshow-container .bg-slideshow-item .${elementId}-child-slideshow.hasToggledClass .${elementId}-slideshow-image {
            animation: ${effectDirection} 15s ease-in-out forwards;
        }` : ''}
    `;

    switch (transition) {
        case 'fade': {
            styles += `
            .bg-slideshow-container .bg-slideshow-item .${elementId}-child-slideshow.previous {
                ${`animation: fade ${duration}s ease-in-out forwards;`}
            }`;
            break;
        }
        case 'slideRight': {
            styles += `
            .bg-slideshow-container .bg-slideshow-item .${elementId}-child-slideshow.previous {
                z-index: 1;
                ${`animation: previous-slideRight ${duration}s ease-in-out forwards;`}
            }
            
            .bg-slideshow-container .bg-slideshow-item .${elementId}-child-slideshow.current {
                z-index: 2;
                ${`animation: current-slideRight ${duration}s ease-in-out forwards;`}
            }`;
            break;
        }
        case 'slideLeft': {
            styles += `
            .bg-slideshow-container .bg-slideshow-item .${elementId}-child-slideshow.previous {
                z-index: 1;
                left: unset;
                ${`animation: previous-slideLeft ${duration}s ease-in-out forwards;`}
            }
            
            .bg-slideshow-container .bg-slideshow-item .${elementId}-child-slideshow.current {
                z-index: 2;
                left: unset;
                ${`animation: current-slideLeft ${duration}s ease-in-out forwards;`}
            }`;
            break;
        }
        case 'slideTop': {
            styles += `
            .bg-slideshow-container .bg-slideshow-item .${elementId}-child-slideshow.previous {
                z-index: 1;
                top: unset;
                ${`animation: previous-slideTop ${duration}s ease-in-out forwards;`}
            }
            
            .bg-slideshow-container .bg-slideshow-item .${elementId}-child-slideshow.current {
                z-index: 2;
                top: unset;
                ${`animation: current-slideTop ${duration}s ease-in-out forwards;`}
            }`;
            break;
        }
        case 'slideDown': {
            styles += `
            .bg-slideshow-container .bg-slideshow-item .${elementId}-child-slideshow.previous {
                z-index: 1;
                ${`animation: previous-slideBottom ${duration}s ease-in-out forwards;`}
            }
            
            .bg-slideshow-container .bg-slideshow-item .${elementId}-child-slideshow.current {
                z-index: 2;
                ${`animation: current-slideBottom ${duration}s ease-in-out forwards;`}
            }`;
            break;
        }
    }

    return styles;
};