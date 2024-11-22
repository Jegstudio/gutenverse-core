import { useEffect, useState } from '@wordpress/element';
import { imagePlaceholder } from 'gutenverse-core/config';

const BackgroundSlideShow = (props) => {
    const {attributes, addStyle, elementId, removeStyle, elementRef} = props;
    const {background} = attributes;
    const {slideImage, transition, infiniteLoop} = background;

    if (background.slideImage?.length < 1 || !elementRef.current ) return '';

    const { width = '', height = '' } = elementRef?.current?.getBoundingClientRect();
    const images = slideImage.map((image) => image?.image?.image);
    const elements = <div className="bg-slideshow-item">
        {transition === 'fade' && images.map((imageURL, index) => (
            <div
                key={index}
                className={`${index}-child-slideshow slideshow-image ${1 === index ? 'current' : 0 === index ? 'previous' : ''}`}
                style={{ backgroundImage: `url(${imageURL ? imageURL : imagePlaceholder})` }}
            />
        ))}
    </div>;

    let intervalToggle;
    function toggleClassWithDuration(elements, duration, infiniteLoop, prevClass = 'previous',  currentClass = 'current') {
        let currentIndex = 1;
        let prevIndex = 0;
        let count = images.length - 2;

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
            if (!infiniteLoop && count === images.length){
                clearInterval(intervalToggle);
            }
            count++;
        }, duration);
    }

    useEffect(() => {
        clearInterval(intervalToggle);
        const slideshowImage = document.querySelectorAll('.slideshow-image');
        transition === 'fade' && toggleClassWithDuration(slideshowImage, background.displayDuration * 1000, infiniteLoop);

        const styles = generateStyle(background, elementId);
        addStyle(`${elementId}-background-slideshow`, styles);
        return () => {
            removeStyle(`${elementId}-background-slideshow`);
            clearInterval(intervalToggle);
        };
    }, [background]);

    return <>
        <div className="bg-slideshow-container">
            {elements}
        </div>
    </>;
};

const generateStyle = (background, elementId) => {
    const {infiniteLoop, duration, backgroundPosition, transition, backgroundSize, backgroundRepeat} = background;
    let styles = '';
    const bgPosition = backgroundPosition && 'default' !== backgroundPosition ? backgroundPosition.replace(/-/g, ' ') : 'center';

    styles += `
        .bg-slideshow-container .bg-slideshow-item .slideshow-image {
            background-size: ${backgroundSize};
            background-position: ${bgPosition};
            background-repeat: ${backgroundRepeat};
        }
    `;

    switch (transition) {
        case 'fade': {
            styles += `.bg-slideshow-container .bg-slideshow-item .slideshow-image.previous {
                animation: slide ${duration}s ease-in-out 1s forwards;
            }`;
            break;
        }
        case 'slideRight': {
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

    styles += `
    .${elementId} .guten-container.block-editor-block-list__layout {
        z-index: 5;
    }
    `;

    return styles;
};

export default BackgroundSlideShow;