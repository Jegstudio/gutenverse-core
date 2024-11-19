import { useEffect, useState } from '@wordpress/element';
import { imagePlaceholder } from 'gutenverse-core/config';

const BackgroundSlideShow = (props) => {
    const {attributes, addStyle, elementId, removeStyle, elementRef} = props;
    const {background, transition} = attributes;
    const {slideImage} = background;
    if (background.slideImage?.length < 1 || !elementRef.current ) return '';

    let evenSlide = [];
    let oddSlide = [];

    background.slideImage.forEach((item, index) => {
        if (index % 2 === 0) {
            evenSlide.push(item);
        } else {
            oddSlide.push(item);
        }
    });

    const { width = '', height = '' } = elementRef?.current?.getBoundingClientRect();

    const element = document.querySelector('.second-child-slideshow');
    const images = slideImage.map((image) => image?.image?.image);
    let test = 0;

    const elements = (
        <div className="bg-slideshow-item">
            {transition !== 'fade' && images.map((imageURL, index) => (
                <div
                    key={index}
                    className={`${index}-child-slideshow slideshow-image ${0 === index ? 'current' : images.length - 1 === index ? 'previous' : ''}`}
                    style={{ backgroundImage: `url(${imageURL ? imageURL : imagePlaceholder})` }}
                />
            ))}
        </div>
    );

    let intervalToggle;
    function toggleClassWithDuration(elements, duration, prevClass = 'previous',  currentClass = 'current') {
        let currentIndex = 0;
        let prevIndex = elements.length - 1;

        intervalToggle = setInterval(() => {
            elements[prevIndex].classList.remove(prevClass);
            prevIndex = (prevIndex + 1) % elements.length;
            elements[prevIndex].classList.add(prevClass);

            elements[currentIndex].classList.remove(currentClass);
            currentIndex = (currentIndex + 1) % elements.length;
            elements[currentIndex].classList.add(currentClass);
        }, duration);
    }

    useEffect(() => {
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

        const slideshowImage = document.querySelectorAll('.slideshow-image');
        transition !== 'fade' && toggleClassWithDuration(slideshowImage, background.duration * 1000);

        const styles = generateStyle(background, elementId);
        addStyle(`${elementId}-background-slideshow`, styles);
        return () => {
            removeStyle(`${elementId}-background-slideshow`);
            clearInterval(intervalId);
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
    let styles;
    const bgPosition = backgroundPosition && 'default' !== backgroundPosition ? backgroundPosition.replace(/-/g, ' ') : 'center';


    switch (transition) {
        case 'fade': {
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