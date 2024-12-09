import isEmpty from 'lodash/isEmpty';
import { imagePlaceholder } from 'gutenverse-core/config';

export const withBackgroundSlideshowScript = (BlockElement) => {
    return (props) => {
        const { attributes } = props;
        const { background, elementId } = attributes;
        const { slideImage = {} } = background;
        if (isEmpty(background.slideImage)) return <BlockElement {...props}/>;

        const slideElements = <div className="bg-slideshow-container">
            <div className="bg-slideshow-item">
                {slideImage.map((image, index) => (
                    <div
                        key={index}
                        className={`${index}-child-slideshow ${elementId}-slideshow-image slideshow-image ${1 === index ? 'current' : 0 === index ? 'previous' : ''}`}
                        style={{ backgroundImage: `url(${image?.image?.image ? image?.image?.image : imagePlaceholder})` }}
                    />
                ))}
            </div>
        </div>;

        const newProps = {
            ...props,
            slideElements
        };

        return <>
            <BlockElement
                {...newProps}
            />
        </>;
    };
};