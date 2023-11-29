import anime from 'animejs';
import { useEffect, useState } from '@wordpress/element';
import { u } from 'gutenverse-core/components';

const TextStyleFlip = (props) => {
    const {
        text,
        titleTag: TitleTag,
        loop,
        animatedTextRef,
        splitByWord
    } = props;

    const [animation, setAnimation] = useState();

    const animeInit = () => {
        const textWrapper = u(animatedTextRef.current).find('.text-content .letters');
        textWrapper.html(textWrapper.text().replace(splitByWord ? /\b\w+\b/g : /\S/g, (word) => `<span class='letter'>${word}</span>`));

        const animeInit = anime.timeline({loop})
            .add({
                targets: [...animatedTextRef.current.getElementsByClassName('letter')],
                rotateY: [-90, 0],
                duration: 1300,
                delay: (el, i) => 45 * i
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

export default TextStyleFlip;