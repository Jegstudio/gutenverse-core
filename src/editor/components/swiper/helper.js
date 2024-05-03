import { getDeviceType } from 'gutenverse-core/editor-helper';
import isInteger from 'lodash/isInteger';

export const swiperSettings = (attributes) => {
    const deviceType = getDeviceType();
    const {
        initialSlide,
        spacing,
        itemShowed,
        loop,
        showNav,
        showArrow,
        zoom,
        zoomRatio,
        autoplay,
        autoplayTimeout
    } = attributes;

    const slidesNumber = () => {
        switch (deviceType) {
            case 'Mobile':
                return 1;
            case 'Tablet':
                return 2;
            default:
                return 3;
        }
    };

    return {
        initialSlide: initialSlide ? initialSlide : 0,
        loop: loop ? loop : false,
        autoplay: autoplay ? {
            delay: parseInt(autoplayTimeout)
        } : false,
        navigation: showArrow ? {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        } : false,
        pagination: showNav ? {
            el: '.swiper-pagination',
            type: 'bullets',
            clickable: true
        } : false,
        zoom: zoom ? {
            maxRatio: zoomRatio ? zoomRatio : 2,
        } : false,
        spaceBetween: spacing && spacing[deviceType] ? parseInt(spacing[deviceType]) : isInteger(spacing) ? spacing : 10,
        slidesPerView: itemShowed && itemShowed[deviceType] ? parseInt(itemShowed[deviceType]) : isInteger(itemShowed) ? itemShowed : slidesNumber(),
        loopAddBlankSlides : loop ? loop : false,
        slidesPerGroupSkip : 0
    };
};

export const swiperNativeSettings = (attributes) => {
    const deviceType = getDeviceType();

    const {
        initialSlide,
        spacing,
        itemShowed,
        loop,
        showNav,
        showArrow,
        zoom,
        zoomRatio,
        autoplay,
        autoplayTimeout
    } = attributes;

    const slidesNumber = () => {
        switch (deviceType) {
            case 'Mobile':
                return 1;
            case 'Tablet':
                return 2;
            default:
                return 3;
        }
    };

    return {
        initialSlide: initialSlide ? initialSlide : 0,
        spaceBetween: spacing && spacing[deviceType] ? parseInt(spacing[deviceType]) : isInteger(spacing) ? spacing : 10,
        slidesPerView: itemShowed && itemShowed[deviceType] ? parseInt(itemShowed[deviceType]) : isInteger(itemShowed) ? itemShowed : slidesNumber(),
        pagination: showNav ? {
            clickable: true
        } : false,
        navigation: showArrow,
        loop: loop ? loop : false,
        autoplay: autoplay ? {
            delay: parseInt(autoplayTimeout),
            disableOnInteraction: false
        } : false,
        zoom: zoom ? {
            maxRatio: zoomRatio ? zoomRatio : 2,
        } : false,
        loopAddBlankSlides : loop ? loop : false,
        slidesPerGroupSkip : 0
    };
};