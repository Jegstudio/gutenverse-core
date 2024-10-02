const BackgroundSlideShow = (props) => {
    const {attributes, addStyle} = props;
    const {background} = attributes;
    if (background.slideImage?.length < 1) return '';

    const slides = background.slideImage.map((image) => {
        return <img key={image._key} className={`bg-slideshow-item item-${image.image.id}`} src={image.image.image} />;
    });
    return <>
        <div className="bg-slideshow-container">
            {slides}
        </div>
    </>;
};

export default BackgroundSlideShow;