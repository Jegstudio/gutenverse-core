import u from 'umbrellajs';
import { Default } from 'gutenverse-core-frontend/blocks';
import anime from 'animejs';

class GutenverseAnimatedText extends Default {
    /* public */
    init() {
        this._elements.map(element => {
            this._loadAnimation(element);
        });
    }

    /* private */
    _animationList(element, style, loop) {
        const textWrapper = ['jump', 'bend', 'drop', 'flip', 'pop'].includes(style) ? element.find('.text-content .letters') : element.find('.text-content');
        textWrapper.html(textWrapper.text().replace(/\S/g, '<span class=\'letter\'>$&</span>'));

        const letterWrapper = element.find('.text-content .letter');
        let animeInit = null;

        switch (style) {
            case 'zoom':
                animeInit = anime.timeline({loop})
                    .add({
                        targets: letterWrapper.nodes,
                        scale: [4,1],
                        opacity: [0,1],
                        translateZ: 0,
                        easing: 'easeOutExpo',
                        duration: 950,
                        delay: (el, i) => 70*i
                    });
                break;
            case 'fade':
                animeInit = anime.timeline({loop})
                    .add({
                        targets: letterWrapper.nodes,
                        opacity: [0,1],
                        easing: 'easeInOutQuad',
                        duration: 2250,
                        delay: (el, i) => 150 * (i+1)
                    });
                break;
            case 'jump':
                animeInit = anime.timeline({loop})
                    .add({
                        targets: letterWrapper.nodes,
                        translateY: ['1.1em', 0],
                        translateZ: 0,
                        duration: 750,
                        delay: (el, i) => 50 * i
                    });
                break;
            case 'bend':
                animeInit = anime.timeline({loop})
                    .add({
                        targets: letterWrapper.nodes,
                        translateY: ['1.1em', 0],
                        translateX: ['0.55em', 0],
                        translateZ: 0,
                        rotateZ: [180, 0],
                        duration: 750,
                        easing: 'easeOutExpo',
                        delay: (el, i) => 50 * i
                    });
                break;
            case 'drop':
                animeInit = anime.timeline({loop})
                    .add({
                        targets: letterWrapper.nodes,
                        scale: [0, 1],
                        duration: 1500,
                        elasticity: 600,
                        delay: (el, i) => 45 * (i+1)
                    });
                break;
            case 'flip':
                animeInit = anime.timeline({loop})
                    .add({
                        targets: letterWrapper.nodes,
                        rotateY: [-90, 0],
                        duration: 1300,
                        delay: (el, i) => 45 * i
                    });
                break;
            case 'pop':
                animeInit = anime.timeline({loop})
                    .add({
                        targets: letterWrapper.nodes,
                        scale: [0.3,1],
                        opacity: [0,1],
                        translateZ: 0,
                        easing: 'easeOutExpo',
                        duration: 600,
                        delay: (el, i) => 70 * (i+1)
                    });
                break;
            case 'slide':
                animeInit = anime.timeline({loop})
                    .add({
                        targets: letterWrapper.nodes,
                        translateX: [40,0],
                        translateZ: 0,
                        opacity: [0,1],
                        easing: 'easeOutExpo',
                        duration: 1200,
                        delay: (el, i) => 500 + 30 * i
                    });

                loop && animeInit.add({
                    targets: letterWrapper.nodes,
                    translateX: [0,-30],
                    opacity: [1,0],
                    easing: 'easeInExpo',
                    duration: 1100,
                    delay: (el, i) => 100 + 30 * i
                });
                break;
            case 'rising':
                animeInit = anime.timeline({loop})
                    .add({
                        targets: letterWrapper.nodes,
                        translateY: [100,0],
                        translateZ: 0,
                        opacity: [0,1],
                        easing: 'easeOutExpo',
                        duration: 1400,
                        delay: (el, i) => 300 + 30 * i
                    });

                loop && animeInit.add({
                    targets: letterWrapper.nodes,
                    translateY: [0,-100],
                    opacity: [1,0],
                    easing: 'easeInExpo',
                    duration: 1200,
                    delay: (el, i) => 100 + 30 * i
                });
                break;
            case 'fall':
                animeInit = anime.timeline({loop})
                    .add({
                        targets: letterWrapper.nodes,
                        translateY: [-100,0],
                        easing: 'easeOutExpo',
                        duration: 1400,
                        delay: (el, i) => 30 * i
                    });

                loop && animeInit.add({
                    targets: letterWrapper.nodes,
                    opacity: 0,
                    duration: 1000,
                    easing: 'easeOutExpo',
                    delay: 1000
                });
                break;
            default:
                break;
        }

        loop && ['zoom', 'fade', 'jump', 'bend', 'drop', 'flip', 'pop'].includes(style) && animeInit.add({
            targets: textWrapper.nodes,
            opacity: 0,
            duration: 1000,
            easing: 'easeOutExpo',
            delay: 1000
        });
    }

    _loadAnimation(element) {
        const thisElement = u(element);
        const style = thisElement.data('animation');
        const loop = thisElement.data('loop');

        this._animationList(thisElement, style, loop === 'true');
    }
}
export default GutenverseAnimatedText;