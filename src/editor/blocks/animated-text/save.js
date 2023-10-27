
import classnames from 'classnames';
import { useBlockProps } from '@wordpress/block-editor';
import { useAnimationFrontend } from 'gutenverse-core/hooks';
import { useDisplayFrontend } from 'gutenverse-core/hooks';

const save = ({ attributes }) => {
    const {
        elementId,
        style,
        text,
        titleTag: TitleTag,
        loop,
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
        switch (style) {
            case 'jump':
            case 'bend':
            case 'drop':
            case 'flip':
            case 'pop':
                return <TitleTag className="text-content">
                    <span className="text-wrapper">
                        <span className="letters">{text}</span>
                    </span>
                </TitleTag>;
            default:
                return <TitleTag className="text-content">{text}</TitleTag>;
        }
    };

    return (
        <div {...useBlockProps.save({ className })} data-animation={style} data-loop={loop}>
            {loadAnimatedText()}
        </div>
    );
};

export default save;