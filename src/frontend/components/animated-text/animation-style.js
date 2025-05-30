import listAnimationStyles from './animation-styles/list-animation-styles';
import anime from 'animejs';
import { u } from 'gutenverse-core-frontend';

export class AnimationStyle {
    constructor(element, animationProps) {
        this.element = element;
        this.loop = animationProps.loop;
        this.splitByWord = animationProps.splitByWord;
        this.textType = animationProps.textType;
        this.text = animationProps.text;
        this.rotationTexts = animationProps.rotationTexts;
        this.animationDuration = animationProps.animationDuration;
        this.displayDuration = animationProps.displayDuration;
        this.transitionDuration = animationProps.transitionDuration;
        this.rotationTextIndex = 0;
        this.animationStyle = listAnimationStyles[animationProps.style];
        this.animeInit = null;
        this.target = null;
    }

    run() {

        this._generateText();

        if (this.animeInit) {
            this.animeInit.remove(this.target.nodes);
        }
        this.target = this.element.find('.text-content .letter');
        this.animeInit = anime.timeline({loop: this.loop});

        if (this.animationStyle) {
            this.animationStyle({
                loop: this.loop,
                animation: this.animeInit,
                target: this.target.nodes,
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
            if (this.rotationTextIndex >= this.rotationTexts.length) {
                this.rotationTextIndex = 0;
            }
            return this.rotationTexts[this.rotationTextIndex].rotationText;
        }
        return this.text;
    }

    _generateText = () => {
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
        if (this.rotationTextIndex + 1 >= this.rotationTexts.length) {
            this.rotationTextIndex = 0;
        } else {
            this.rotationTextIndex++;
        }
    };

    _stopRotating = () => {
        const isLastItem = (this.rotationTextIndex + 1) >= this.rotationTexts.length;
        return !this.loop && isLastItem;
    };

    _nextRotationText = () => { // recursive
        this._updateRotationIndex();
        this.run();
    }
}