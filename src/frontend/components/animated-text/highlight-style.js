import listHighlightStyles from './highlight-styles/list-highlighted-styles';

export class HighlightStyle {
    constructor(element, animationProps) {
        this.element = element;
        this.loop = animationProps.loop;
        this.text = animationProps.text;
        this.animationDuration = animationProps.animationDuration;
        this.displayDuration = animationProps.displayDuration;
        this.transitionDuration = animationProps.transitionDuration;
        this.highlightStyle = listHighlightStyles[animationProps.style];
        this.animeInit = null;
        this.target = null;
    }
}