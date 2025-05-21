import anime from 'animejs';
import { useEffect, useRef, useState } from '@wordpress/element';
import { u } from 'gutenverse-core/components';

const TextStyleFade = (props) => {
    const {
        text,
        loop,
        animatedTextRef,
        splitByWord,
        style,
        resetText,
        animationDuration,
        displayDuration,
    } = props;

    const [animation, setAnimation] = useState();
    const timeoutRef = useRef(null);

    const loopAnimation = () => {
        timeoutRef.current = setTimeout(() => {
            resetText();
            fadeAnimation();
        }, displayDuration);
    };

    const fadeAnimation = () => {
        anime.remove('.letter');
        const animeInstance = anime({
            targets: [...animatedTextRef.current.getElementsByClassName('letter')],
            opacity: [0, 1],
            easing: 'easeInOutQuad',
            duration: animationDuration,
            delay: (el, i) => 70 * i,
            complete: () => {
                if (loop) {
                    loopAnimation();
                }
            }
        });

        setAnimation(animeInstance);
    };

    useEffect(() => {
        if (animation) {
            anime.remove('.letter');
            setAnimation(null);
        }
        resetText();
        fadeAnimation();

        return () => {
            anime.remove('.letter');
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, [loop, splitByWord, style, animationDuration, displayDuration, text]);

    return <span className="text-content">{text}</span>;
};

export default TextStyleFade;