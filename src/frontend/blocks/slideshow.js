import { Default, u } from 'gutenverse-core-frontend';

class GutenverseSlideshow extends Default {
    init() {
        this._elements.map(element => {
            this.startSlideshow(element);
        });
    }

    startSlideshow(element){
        const {image_placeholder} = window.GutenverseFrontendConfig;
        const dataId = u(element).parent().data('id');
        const background = u(element).find('.guten-data').find(`[data-var="backgroundSlideshow${dataId}"]`).data('value') ? JSON.parse(u(element).find('.guten-data').find(`[data-var="backgroundSlideshow${dataId}"]`).data('value')) : null;
        const {slideImage = {}, transition, infiniteLoop, displayDuration} = background;

        if (slideImage?.length < 1 ) return;
        const images = slideImage.map((image) => image?.image?.image);

        const innerElement = u(element).find('.bg-slideshow-item');
        images.forEach((image, index) => {
            const divElement = document.createElement('div');
            u(divElement).addClass(`${index}-child-slideshow slideshow-image`);
            u(divElement).attr(
                'style',
                `background-image: url(${image ? image : image_placeholder})`
            );
            innerElement?.append(divElement);
        });

        const slideshowImage = document.querySelectorAll('.slideshow-image');
        transition === 'fade' && this.toggleClassWithDuration(slideshowImage, displayDuration * 1000, infiniteLoop, images);
    }

    toggleClassWithDuration(elements, duration, infiniteLoop, images, prevClass = 'previous',  currentClass = 'current') {
        let currentIndex = 1;
        let prevIndex = 0;
        let count = images.length - 2;

        elements.forEach(el => {
            el.classList.remove(prevClass);
            el.classList.remove(currentClass);
        });

        elements[currentIndex].classList.add(currentClass);
        elements[prevIndex].classList.add(prevClass);

        let intervalToggle = setInterval(() => {
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
        if (duration <= 0) {
            clearInterval(intervalToggle);
        }
    }
}

export default GutenverseSlideshow;