import anime from 'animejs';
import { useEffect, useState } from '@wordpress/element';
import { u } from 'umbrellajs';

const TextStyleFall = (props) => {
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
                translateY: [-100,0],
                easing: 'easeOutExpo',
                duration: 1400,
                delay: (el, i) => 30 * i
            });

        loop && animeInit.add({
            targets: [...animatedTextRef.current.getElementsByClassName('letter')],
            opacity: 0,
            duration: 1000,
            easing: 'easeOutExpo',
            delay: 1000
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

export default TextStyleFall;