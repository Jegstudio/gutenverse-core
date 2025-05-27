import anime from 'animejs';
import { useEffect, useRef } from '@wordpress/element';
import { u } from 'gutenverse-core/components';
import listAnimationStyles from './list-animation-styles';


const TextAnimatedComponent = (props) => {
    const {
        text = '',
        loop,
        animatedTextRef,
        splitByWord,
        style,
        textType,
        animationDuration,
        displayDuration,
        transitionDuration,
        rotationTexts,
    } = props;

    const animation = useRef(null);
    const targets = useRef(null);
    const rotationTextIndex = useRef(0);
    const animationStyle = listAnimationStyles[style];

    const getText = () => {
        if (textType == 'rotation' && rotationTexts.length != 0) {
            if (rotationTextIndex.current >= rotationTexts.length) {
                rotationTextIndex.current = 0;
            }
            return rotationTexts[rotationTextIndex.current].rotationText;
        }
        return text;
    };

    const updateRotationIndex = () => {
        if (rotationTextIndex.current + 1 >= rotationTexts.length) {
            rotationTextIndex.current = 0;
        } else {
            rotationTextIndex.current++;
        }
    };

    const stopRotating = () => {
        const isLastItem = (rotationTextIndex.current + 1) >= rotationTexts.length;
        return !loop && isLastItem;
    };

    const nextRotationText = () => {
        updateRotationIndex();
        textAnimation();
    };

    const resetText = () => {
        const textWrapper = u(animatedTextRef.current).find('.text-wrapper');
        if (!textWrapper) return;
        textWrapper.html(getText());
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
            isRotationType: textType == 'rotation' && rotationTexts.length != 0,
            stopRotating,
            nextRotationText,
        };
        const animationStyle = listAnimationStyles[style];
        animationStyle(animationProps);
    };

    useEffect(() => {
        rotationTextIndex.current = 0;

        if (animationStyle) {
            textAnimation();
        }

        return () => {
            if (animation.current) {
                animation.current.remove(targets.current);
                resetText();
            }
        };
    }, [
        loop,
        splitByWord,
        style,
        textType,
        animationDuration,
        displayDuration,
        transitionDuration,
        text,
        rotationTexts,
    ]);

    return <>
        <span className="text-content">
            <span className="text-wrapper">
                <span className="letters">{getText()}</span>
            </span>
        </span>
    </>;
};

export default TextAnimatedComponent;