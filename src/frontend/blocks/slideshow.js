import { Default, u } from 'gutenverse-core-frontend';

class GutenverseSlideshow extends Default {
    init() {
        this._elements.map(element => {
            this.startSlideshow(element);
        });
    }

    startSlideshow(element){
        let dataId;
        if (u(element).hasClass('guten-wrap-helper')) {
            dataId = u(element).find('.guten-inner-wrap').data('id');
        } else if (u(element).hasClass('guten-column')) {
            dataId = u(element).find('.guten-column-wrapper').data('id');
        } else {
            dataId = u(element).parent().data('id');
        }

        const background = u(element).find('.guten-data').find(`[data-var="backgroundSlideshow${dataId}"]`).data('value') ? JSON.parse(u(element).find('.guten-data').find(`[data-var="backgroundSlideshow${dataId}"]`).data('value')) : {};
        const {slideImage = {}, infiniteLoop, displayDuration} = background;

        if (slideImage?.length < 1 ) return;
        const images = slideImage.map((image) => image?.image?.image);
        const elementId = `guten-${dataId}`;

        const slideshowImage = document.querySelectorAll(`.guten-${dataId}-slideshow-image`);
        const slideshowContainer = document.querySelectorAll(`.guten-${dataId}-child-slideshow`);
        slideshowImage.length > 0 && this.toggleClassWithDuration(slideshowImage, slideshowContainer, displayDuration * 1000, infiniteLoop, images);
        this.generateStyle(background, elementId);
    }

    toggleClassWithDuration(elements, slideshowContainer, duration, infiniteLoop, images, prevClass = 'previous',  currentClass = 'current', parentClass = 'hasToggledClass') {
        let currentIndex = 1;
        let prevIndex = 0;

        slideshowContainer.forEach(el => {
            el.classList.remove(prevClass);
            el.classList.remove(currentClass);
            el.classList.remove(parentClass);
        });

        slideshowContainer[currentIndex].classList.add(currentClass);
        slideshowContainer[prevIndex].classList.add(prevClass);
        slideshowContainer[currentIndex].classList.add(parentClass);
        slideshowContainer[prevIndex].classList.add(parentClass);

        let intervalToggle = setInterval(() => {
            slideshowContainer[prevIndex].classList.remove(parentClass);
            slideshowContainer[prevIndex].classList.remove(prevClass);
            prevIndex = (prevIndex + 1) % elements.length;
            slideshowContainer[prevIndex].classList.add(prevClass);
            slideshowContainer[prevIndex].classList.add(parentClass);

            slideshowContainer[currentIndex].classList.remove(currentClass);
            currentIndex = (currentIndex + 1) % elements.length;
            slideshowContainer[currentIndex].classList.add(currentClass);
            slideshowContainer[currentIndex].classList.add(parentClass);

            if (!infiniteLoop && currentIndex === (images.length - 1)) {
                clearInterval(intervalToggle);
            }
        }, duration);
    }

    generateStyle(background, elementId) {
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

        this.addAnimation(styles);
    }

    addAnimation(rule){
        let styleElement = document.createElement('style');
        if (styleElement.styleSheet) {
            styleElement.styleSheet.cssText = rule;
        } else {
            styleElement.appendChild(document.createTextNode(rule));
        }
        document.head.appendChild(styleElement);
    }
}

export default GutenverseSlideshow;