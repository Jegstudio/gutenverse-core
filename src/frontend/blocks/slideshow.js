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

        if (slideImage?.length < 1 || undefined === slideImage?.length) return;
        const transition = (background.duration < 0.1 || undefined === background.duration) ? 1000 : background.duration * 1000 ;
        const transitionDuration = (transition < displayDuration * 1000) ? transition : (displayDuration * 1000) - 100;
        const images = slideImage.map((image) => image?.image?.image);
        const elementId = `guten-${dataId}`;

        const slideshowImage = document.querySelectorAll(`.guten-${dataId}-slideshow-image`);
        const slideshowContainer = document.querySelectorAll(`.guten-${dataId}-child-slideshow`);
        slideshowImage.length > 0 && this.toggleClassWithDuration(slideshowImage, slideshowContainer, displayDuration * 1000, infiniteLoop, images, transitionDuration);
        this.generateStyle(background, elementId);
    }

    toggleClassWithDuration(elements, slideshowContainer, duration, infiniteLoop, images, transition, prevClass = 'previous',  currentClass = 'current', parentClass = 'hasToggledClass') {
        let currentIndex = 1;
        let prevIndex = 0;

        slideshowContainer.forEach(el => {
            el?.classList.remove(prevClass);
            el?.classList.remove(currentClass);
            el?.classList.remove(parentClass);
        });

        slideshowContainer[currentIndex]?.classList.add(currentClass);
        slideshowContainer[prevIndex]?.classList.add(prevClass);
        slideshowContainer[currentIndex]?.classList.add(parentClass);
        slideshowContainer[prevIndex]?.classList.add(parentClass);

        let intervalToggle = setInterval(() => {
            if (slideshowContainer.length <= 2) {
                setTimeout(() => {
                    slideshowContainer[prevIndex]?.classList.remove(parentClass);
                }, transition);
            } else  slideshowContainer[prevIndex]?.classList.remove(parentClass);
            slideshowContainer[prevIndex]?.classList.remove(prevClass);
            prevIndex = (prevIndex + 1) % elements.length;
            slideshowContainer[prevIndex]?.classList.add(prevClass);
            slideshowContainer[prevIndex]?.classList.add(parentClass);

            slideshowContainer[currentIndex]?.classList.remove(currentClass);
            currentIndex = (currentIndex + 1) % elements.length;
            slideshowContainer[currentIndex]?.classList.add(currentClass);
            slideshowContainer[currentIndex]?.classList.add(parentClass);
            if (currentIndex === 1 && slideshowContainer.length <= 2) {
                setTimeout(() => {
                    slideshowContainer[0]?.classList.remove(parentClass);
                }, transition);
            }

            if (!infiniteLoop && currentIndex === (images.length - 1)) {
                clearInterval(intervalToggle);
            }
        }, duration);
    }

    generateStyle(background, elementId) {
        const {duration, backgroundPosition, transition, backgroundSize, backgroundRepeat, kenBurns, direction, displayDuration} = background;
        const bgPosition = backgroundPosition && 'default' !== backgroundPosition ? backgroundPosition.replace(/-/g, ' ') : 'center';
        const effectDirection = 'directionOut' === direction ? 'ken-burns-toggle-out' : 'ken-burns-toggle-in';
        const transitions = (duration < 0.1 || undefined === duration) ? 1 : duration;
        const transitionDuration = (transitions >= displayDuration) ? transitions : displayDuration - 0.1;
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