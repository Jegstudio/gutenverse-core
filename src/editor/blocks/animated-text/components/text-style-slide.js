import anime from 'animejs';
import { useEffect, useState } from '@wordpress/element';
import { u } from 'umbrellajs';

const TextStyleSlide = (props) => {
    const {
        text,
        titleTag: TitleTag,
        loop,
        animatedTextRef
    } = props;

    const [animation, setAnimation] = useState();

    const animeInit = () => {
        const textWrapper = u(animatedTextRef.current).find('.text-content');
        textWrapper.html(textWrapper.text().replace(/\S/g, '<span class=\'letter\'>$&</span>'));

        const animeInit = anime.timeline({loop})
            .add({
                targets: [...animatedTextRef.current.getElementsByClassName('letter')],
                translateX: [40,0],
                translateZ: 0,
                opacity: [0,1],
                easing: 'easeOutExpo',
                duration: 1200,
                delay: (el, i) => 500 + 30 * i
            });

        loop && animeInit.add({
            targets: [...animatedTextRef.current.getElementsByClassName('letter')],
            translateX: [0,-30],
            opacity: [1,0],
            easing: 'easeInExpo',
            duration: 1100,
            delay: (el, i) => 100 + 30 * i
        });

        setAnimation(animeInit);
    };

    useEffect(() => animatedTextRef.current && animeInit(), [animatedTextRef]);

    useEffect(() => {
        if (animation) {
            animation.remove([...animatedTextRef.current.getElementsByClassName('letter')]);
            animeInit();
        }
    }, [props]);

    return <TitleTag className="text-content">{text}</TitleTag>;
};

export default TextStyleSlide;