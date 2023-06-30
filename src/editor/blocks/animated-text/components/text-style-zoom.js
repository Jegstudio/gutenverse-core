import anime from 'animejs';
import { useEffect, useState } from '@wordpress/element';
import { u } from 'umbrellajs';

const TextStyleZoom = (props) => {
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

        const animeInit = anime.timeline({ loop })
            .add({
                targets: [...animatedTextRef.current.getElementsByClassName('letter')],
                scale: [4, 1],
                opacity: [0, 1],
                translateZ: 0,
                easing: 'easeOutExpo',
                duration: 950,
                delay: (el, i) => 70 * i
            });

        loop && animeInit.add({
            targets: [...animatedTextRef.current.getElementsByClassName('text-content')],
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
            animation.restart();
            animation.remove([...animatedTextRef.current.getElementsByClassName('letter'), ...animatedTextRef.current.getElementsByClassName('text-content')]);
            animeInit();
        }
    }, [props]);

    return <TitleTag className="text-content">{text}</TitleTag>;
};

export default TextStyleZoom;