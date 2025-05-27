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

const listAnimationStyles = {
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

export default listAnimationStyles;