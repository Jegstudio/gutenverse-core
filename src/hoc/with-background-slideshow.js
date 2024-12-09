import { useEffect, useState } from '@wordpress/element';
import { imagePlaceholder } from 'gutenverse-core/config';

export const withBackgroundSlideshow = (BlockControl) => {
    return (props) => {
        const {attributes, addStyle, removeStyle, elementRef} = props;
        const {background, elementId} = attributes;
        const {slideImage, infiniteLoop} = background;

        if (background.slideImage?.length < 1 ) return <BlockControl {...props}/>;

        // const { width = '', height = '' } = elementRef?.current?.getBoundingClientRect();
        const elements = <div className="bg-slideshow-item">
            {slideImage.map((image, index) => (
                <div
                    key={index}
                    className={`${index}-child-slideshow ${elementId}-slideshow-image slideshow-image ${1 === index ? 'current' : 0 === index ? 'previous' : ''}`}
                    style={{ backgroundImage: `url(${image?.image?.image ? image?.image?.image : imagePlaceholder})` }}
                />
            ))}
        </div>;

        let intervalToggle;
        function toggleClassWithDuration(elements, duration, infiniteLoop, prevClass = 'previous',  currentClass = 'current') {
            let currentIndex = 1;
            let prevIndex = 0;

            elements.forEach(el => {
                el.classList.remove(prevClass);
                el.classList.remove(currentClass);
            });

            elements[currentIndex].classList.add(currentClass);
            elements[prevIndex].classList.add(prevClass);

            intervalToggle = setInterval(() => {
                elements[prevIndex].classList.remove(prevClass);
                prevIndex = (prevIndex + 1) % elements.length;
                elements[prevIndex].classList.add(prevClass);

                elements[currentIndex].classList.remove(currentClass);
                currentIndex = (currentIndex + 1) % elements.length;
                elements[currentIndex].classList.add(currentClass);
                if (!infiniteLoop && currentIndex === (slideImage.length - 1)){
                    clearInterval(intervalToggle);
                }
            }, duration);

            if (duration <= 0) {
                clearInterval(intervalToggle);
            }
        }

        useEffect(() => {
            clearInterval(intervalToggle);
            const slideshowImage = document.querySelectorAll(`.${elementId}-slideshow-image`);
            slideshowImage?.length > 0 && toggleClassWithDuration(slideshowImage, background.displayDuration * 1000, infiniteLoop);

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
            background.backgroundSize]);

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
    const {duration, backgroundPosition, transition, backgroundSize, backgroundRepeat, displayDuration} = background;
    let styles = '';
    const bgPosition = backgroundPosition && 'default' !== backgroundPosition ? backgroundPosition.replace(/-/g, ' ') : 'center';

    styles += `
        .bg-slideshow-container .bg-slideshow-item .${elementId}-slideshow-image {
            background-size: ${backgroundSize};
            background-position: ${bgPosition};
            background-repeat: ${backgroundRepeat};
        }
    `;

    switch (transition) {
        case 'fade': {
            styles += `.bg-slideshow-container .bg-slideshow-item .${elementId}-slideshow-image.previous {
                ${displayDuration > 0 && `animation: fade ${duration}s ease-in-out forwards;`}
            }`;
            break;
        }
        case 'slideRight': {
            styles += `.bg-slideshow-container .bg-slideshow-item .${elementId}-slideshow-image.previous {
                ${displayDuration > 0 && `animation: fade ${duration}s ease-in-out forwards;`}
            }`;
            break;
        }
        case 'slideLeft': {
            styles += `.bg-slideshow-container .bg-slideshow-item .${elementId}-slideshow-image.previous {
                ${displayDuration > 0 && `animation: fade ${duration}s ease-in-out forwards;`}
            }`;
            break;
        }
        case 'slideTop': {
            styles += `.bg-slideshow-container .bg-slideshow-item .${elementId}-slideshow-image.previous {
                ${displayDuration > 0 && `animation: fade ${duration}s ease-in-out forwards;`}
            }`;
            break;
        }
        case 'slideDown': {
            styles += `.bg-slideshow-container .bg-slideshow-item .${elementId}-slideshow-image.previous {
                ${displayDuration > 0 && `animation: fade ${duration}s ease-in-out forwards;`}
            }`;
            break;
        }
    }

    return styles;
};