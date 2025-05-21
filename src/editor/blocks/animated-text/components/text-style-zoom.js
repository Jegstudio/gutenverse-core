import anime from 'animejs';
import { useEffect, useRef, useState } from '@wordpress/element';

const TextStyleZoom = (props) => {
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
            zoomAnimation();
        }, displayDuration);
    };

    const zoomAnimation = () => {
        anime.remove('.letter');

        const animeInstance = anime({
            targets: [...animatedTextRef.current.getElementsByClassName('letter')],
            scale: [4, 1],
            opacity: [0, 1],
            translateZ: 0,
            easing: 'easeOutExpo',
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
        zoomAnimation();

        return () => {
            anime.remove('.letter');
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, [loop, splitByWord, style, animationDuration, displayDuration, text]);

    return <span className="text-content">{text}</span>;
};

export default TextStyleZoom;