import { Default, u } from 'gutenverse-core-frontend';
import anime from 'animejs';
import listAnimationStyles from '../components/animated-text/list-animation-styles';

class GutenverseAnimatedText extends Default {
    /* public */
    init() {
        this._elements.map(element => {
            this._loadAnimation(element);
        });
    }

    /* private */
    _loadAnimation(element) {
        const thisElement = u(element);
        const animationProps = JSON.parse(thisElement.data('animation'));

        const animation = new Animation(thisElement, animationProps);
        animation.run();
    }
}

class Animation {
    constructor(element, animationProps) {
        this.element = element;
        this.loop = animationProps.loop;
        this.splitByWord = animationProps.splitByWord;
        this.style = animationProps.style;
        this.textType = animationProps.textType;
        this.text = animationProps.text;
        this.rotationTexts = animationProps.rotationTexts;
        this.animationDuration = animationProps.animationDuration;
        this.displayDuration = animationProps.displayDuration;
        this.transitionDuration = animationProps.transitionDuration;
        this.rotationTextsLength = this.rotationTexts.length;
        this.rotationTextIndex = 0;
    }

    run() {

        this._resetText();

        const letterWrapper = this.element.find('.text-content .letter');
        let animeInit = anime.timeline({loop: this.loop});

        if (Object.prototype.hasOwnProperty.call(listAnimationStyles, this.style)) {
            listAnimationStyles[this.style]({
                loop: this.loop,
                animation: animeInit,
                target: letterWrapper.nodes,
                animationDuration: this.animationDuration,
                displayDuration: this.displayDuration,
                transitionDuration: this.transitionDuration,
                isRotationType: this.textType == 'rotation',
                stopRotating: this._stopRotating,
                nextRotationText: this._nextRotationText,
            });
        }

    }
    _getText = () => {
        if (this.textType == 'rotation' && this.rotationTexts.length != 0) {
            if (this.rotationTextIndex >= this.rotationTextsLength) {
                this.rotationTextIndex = 0;
            }
            return this.rotationTexts[this.rotationTextIndex].rotationText;
        }
        return this.text;
    }

    _resetText = () => {
        const textWrapper = u(this.element).find('.text-wrapper');
        if (!textWrapper) return;
        textWrapper.html(this._getText());
        textWrapper.html(
            textWrapper.text().replace(
                this.splitByWord ? /\b\w+\b/g : /\S/g,
                (word) => `<span class='letter'>${word}</span>`
            )
        );
    }

    _updateRotationIndex = () => {
        if (this.rotationTextIndex + 1 >= this.rotationTextsLength) {
            this.rotationTextIndex = 0;
        } else {
            this.rotationTextIndex++;
        }
    };

    _stopRotating = () => {
        const isLastItem = (this.rotationTextIndex + 1) >= this.rotationTextsLength;
        return !this.loop && isLastItem;
    };

    _nextRotationText = () => {
        this._updateRotationIndex();
        this.run();
    }
}

export default GutenverseAnimatedText;