import isEmpty from 'lodash/isEmpty';

export const withBackgroundSlideshowScript = ({ BlockElement, props }) => {
    const { attributes } = props;
    const { background } = attributes;
    const { slideImage = {} } = background;
    const {image_placeholder} = window.GutenverseFrontendConfig;
    if (background.slideImage?.length < 1 ) return <BlockElement {...props}/>;

    const images = slideImage.map((image) => image?.image?.image);
    const slideElements = <div className="bg-slideshow-container">
        <div className="bg-slideshow-item">
            {images.map((imageURL, index) => (
                <div
                    key={index}
                    className={`${index}-child-slideshow slideshow-image ${1 === index ? 'current' : 0 === index ? 'previous' : ''}`}
                    style={{ backgroundImage: `url(${imageURL ? imageURL : image_placeholder})` }}
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