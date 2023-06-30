import anime from 'animejs';
import { useEffect, useState } from '@wordpress/element';
import { u } from 'umbrellajs';

const TextStyleJump = (props) => {
    const {
        text,
        titleTag: TitleTag,
        loop,
        animatedTextRef
    } = props;

    const [animation, setAnimation] = useState();

    const animeInit = () => {
        const textWrapper = u(animatedTextRef.current).find('.text-content .letters');
        textWrapper.html(textWrapper.text().replace(/\S/g, '<span class=\'letter\'>$&</span>'));

        const animeInit = anime.timeline({loop})
            .add({
                targets: [...animatedTextRef.current.getElementsByClassName('letter')],
                translateY: ['1.1em', 0],
                translateZ: 0,
                duration: 750,
                delay: (el, i) => 50 * i
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

    return <TitleTag className="text-content">
        <span className="text-wrapper">
            <span className="letters">{text}</span>
        </span>
    </TitleTag>;
};

export default TextStyleJump;