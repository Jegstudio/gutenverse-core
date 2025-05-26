import anime from 'animejs';
import { useEffect, useRef } from '@wordpress/element';
import { u } from 'gutenverse-core/components';
import textStyleBend from './text-style-bend';
import textStyleDrop from './text-style-drop';
import textStyleFade from './text-style-fade';
import textStyleFall from './text-style-fall';
import textStyleFlip from './text-style-flip';
import textStyleJump from './text-style-jump';
import textStylePop from './text-style-pop';
import textStyleRising from './text-style-rising';
import textStyleSlide from './text-style-slide';
import textStyleZoom from './text-style-zoom';

const listAnimationStyle = {
    'bend': (animationProps) => textStyleBend(animationProps),
    'drop': (animationProps) => textStyleDrop(animationProps),
    'fade': (animationProps) => textStyleFade(animationProps),
    'fall': (animationProps) => textStyleFall(animationProps),
    'flip': (animationProps) => textStyleFlip(animationProps),
    'jump': (animationProps) => textStyleJump(animationProps),
    'pop': (animationProps) => textStylePop(animationProps),
    'rising': (animationProps) => textStyleRising(animationProps),
    'slide': (animationProps) => textStyleSlide(animationProps),
    'zoom': (animationProps) => textStyleZoom(animationProps),
};

const TextAnimatedComponent = (props) => {
    const {
        text,
        loop,
        animatedTextRef,
        splitByWord,
        style,
        animationDuration,
        displayDuration,
        transitionDuration,
    } = props;

    const animation = useRef(null);
    const targets = useRef(null);


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

    const textAnimation = () => {
        resetText();
        if (animation.current) {
            animation.current.remove(targets.current);
        }

        targets.current = [...animatedTextRef.current.getElementsByClassName('letter')];
        animation.current = anime.timeline({loop});
        const animationProps = {
            ...props,
            animationRef: animation,
            targetRef: targets,
        };
        const animationStyle = listAnimationStyle[style];
        animationStyle(animationProps);
    };

    useEffect(() => {

        if (Object.prototype.hasOwnProperty.call(listAnimationStyle, style)) {
            textAnimation();
        }

        return () => {
            if (animation.current) {
                animation.current.remove(targets.current);
            }
        };
    }, [
        loop,
        splitByWord,
        style,
        animationDuration,
        displayDuration,
        transitionDuration,
        text,
    ]);

    return <>
        <span className="text-content">
            <span className="text-wrapper">
                <span className="letters">{text}</span>
            </span>
        </span>
    </>;
};

export default TextAnimatedComponent;