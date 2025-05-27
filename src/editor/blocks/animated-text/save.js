
import { classnames } from 'gutenverse-core/components';
import { useBlockProps } from '@wordpress/block-editor';
import { useAnimationFrontend } from 'gutenverse-core/hooks';
import { useDisplayFrontend } from 'gutenverse-core/hooks';
import { withMouseMoveEffectScript } from 'gutenverse-core/hoc';
import { compose } from '@wordpress/compose';
import listAnimationStyles from './components/animation-styles/list-animation-styles';

const save = compose(
    withMouseMoveEffectScript
)(({ attributes }) => {
    const {
        elementId,
        style,
        text,
        titleTag: TitleTag,
        loop,
        splitByWord,
        beforeTextAnimated,
        afterTextAnimated,
        textType,
        rotationTexts,
    } = attributes;

    const animationClass = useAnimationFrontend(attributes);
    const displayClass = useDisplayFrontend(attributes);

    const className = classnames(
        'guten-element',
        'guten-animated-text',
        elementId,
        animationClass,
        displayClass,
        {
            [`style-${style}`]: style && style !== 'none'
        },
    );

    const loadAnimatedText = () => {

        if (listAnimationStyles[style]) {
            return <>
                <span className="text-content">
                    <span className="text-wrapper">
                        <span className="letters">{text}</span>
                    </span>
                </span>
            </>;
        }
        return <span className="text-content">{text}</span>;
    };

    const animationProps = {
        loop,
        splitByWord,
        style,
        textType,
        text,
        rotationTexts,
        animationDuration: parseInt(attributes.animationDuration),
        displayDuration: parseInt(attributes.displayDuration),
        transitionDuration: parseInt(attributes.transitionDuration),
    };


    return <div {...useBlockProps.save({ className })} data-animation={JSON.stringify(animationProps)}>
        <TitleTag>
            <span className={'non-animated-text before-text'}>{beforeTextAnimated}</span>
            {loadAnimatedText()}
            <span className={'non-animated-text after-text'}>{afterTextAnimated}</span>
        </TitleTag>
    </div>;
});

export default save;