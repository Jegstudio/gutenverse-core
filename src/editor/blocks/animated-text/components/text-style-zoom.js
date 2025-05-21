import anime from 'animejs';
import { useEffect, useRef, useState } from '@wordpress/element';
import { u } from 'gutenverse-core/components';

const TextStyleZoom = (props) => {
    const {
        text,
        loop,
        animatedTextRef,
        splitByWord,
        style,
        animationDuration,
        displayDuration,
    } = props;

    const [animation, setAnimation] = useState();
    const timeoutRef = useRef(null);

    const resetText = () => {
        const textWrapper = u(animatedTextRef.current).find('.text-content');
        if (!textWrapper) return;
        textWrapper.html(text);
        textWrapper.html(
            textWrapper.text().replace(
                splitByWord ? /\b\w+\b/g : /\S/g,
                (word) => `<span class='letter'>${word}</span>`
            )
        );
    };

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