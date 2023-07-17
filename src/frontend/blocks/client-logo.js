import { Default, u, applyFilters } from 'gutenverse-core-frontend/blocks';
import Swiper, { Autoplay, Navigation, Pagination } from 'swiper';

Swiper.use([Autoplay, Navigation, Pagination]);

class GutenverseClientLogo extends Default {
    /* public */
    init() {
        this._elements.map(element => {
            this._addSliderEffect(element);
        });
    }

    /* private */
    _addSliderEffect(element) {
        const sliderContainer = u(element).find('.swiper-container');
        const id = sliderContainer.attr('id');
        const loop = sliderContainer.data('loop');
        const autoplay = sliderContainer.data('autoplay');
        const timeout = sliderContainer.data('timeout');
        const nav = sliderContainer.data('nav');
        const arrow = sliderContainer.data('arrow');
        const breakpoints = sliderContainer.data('breakpoints');

        const isTrue = (val) => val === 'true';

        const settings = {
            loop: isTrue(loop),
            autoplay: isTrue(autoplay) ? {
                delay: parseInt(timeout)
            } : false,
            navigation: isTrue(arrow) ? {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            } : false,
            pagination: isTrue(nav) ? {
                el: '.swiper-pagination',
                type: 'bullets',
                clickable: true
            } : false,
            breakpoints: this.swiperBreakpoint(JSON.parse(breakpoints))
        };

        const settingsProps = {
            id,
            loop,
            autoplay,
            timeout,
            nav,
            arrow,
            breakpoints
        };

        const settingsFilter = applyFilters(
            'gutenverse.swiper.frontend',
            settings,
            settingsProps
        );

        new Swiper(`.${id} .swiper-container`, settingsFilter);
    }
}

export default GutenverseClientLogo;