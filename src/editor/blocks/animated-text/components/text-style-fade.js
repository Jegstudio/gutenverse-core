import anime from 'animejs';
import { useEffect, useState } from '@wordpress/element';
import { u } from 'gutenverse-core/components';

const TextStyleFade = (props) => {
    const {
        text,
        titleTag: TitleTag,
        loop,
        animatedTextRef,
        splitByWord,
        style
    } = props;

    const [animation, setAnimation] = useState();

    const animeInit = () => {
        const textWrapper = u(animatedTextRef.current).find('.text-content');
        textWrapper.html(textWrapper.text().replace(splitByWord ? /\b\w+\b/g : /\S/g, (word) => `<span class='letter'>${word}</span>`));

        const animeInit = anime.timeline({ loop })
            .add({
                targets: [...animatedTextRef.current.getElementsByClassName('letter')],
                opacity: [0, 1],
                easing: 'easeInOutQuad',
                duration: 2250,
                delay: (el, i) => 150 * (i + 1)
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

    useEffect(() => {
        animeInit();
        return () => {
            if (animation) {
                animation.remove();
                setAnimation(null);
            }
        };
    }, [loop, splitByWord, style]);

    return <TitleTag className="text-content">{text}</TitleTag>;
};

export default TextStyleFade;