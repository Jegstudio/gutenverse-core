
import { oldImagePlaceholder } from "gutenverse-core/config";

const ContentItem = (data) => {
    const {
        src,
        name,
        lazy,
        description,
        comment,
        rating,
        contentType,
        showQuote,
        iconQuote,
        quoteOverride,
        contentPosition,
        showRating,
        iconRatingFull,
        iconRatingHalf,
        starPosition,
    } = data;

    const overrideQuote = quoteOverride ? 'quote-override' : '';
    const getImageSrc = src => src && src.image ? src.image : oldImagePlaceholder;

    const content = () => {
        const commentContent = <div className="comment-content"><p>{comment}</p></div>;
        const starRating = showRating && <>
            {Array.from({ length: rating }, (i) => <li key={i}><i className={iconRatingFull}></i></li>)}
            {parseFloat(rating) !== Math.floor(rating) ? <li><i className={iconRatingHalf}></i></li> : null}
        </>;

        switch (contentType) {
            case 1:
                return <div className="testimonial-slider hover-from-left">
                    <div className="comment-bio">
                        <div className="profile-image">
                            {lazy ? <img loading="lazy" src={getImageSrc(src)} alt={name} /> : <img src={getImageSrc(src)} alt={name} />}
                        </div>
                        <ul className="rating-stars">{starRating}</ul>
                        <span className="profile-info">
                            <strong className="profile-name">{name}</strong>
                            <p className="profile-des">{description}</p>
                        </span>
                    </div>
                    <div className="comment-content">
                        {showQuote && <div className={`${overrideQuote} icon-content`}>
                            <i aria-hidden="true" className={`${iconQuote}`}></i>
                        </div>}
                        <p>{comment}</p>
                    </div>
                </div>;
            case 2:
                return <>
                    {(starPosition === undefined || starPosition === 'above-image') && <div className="comment-header"><ul className="rating-stars">{starRating}</ul></div>}
                    {contentPosition !== undefined && contentPosition === 'above-image' && commentContent}
                    <div className="comment-bio">
                        <div className="bio-details">
                            <div className="profile-image">
                                {lazy ? <img loading="lazy" src={getImageSrc(src)} alt={name} /> : <img src={getImageSrc(src)} alt={name} />}
                            </div>
                            <span className="profile-info">
                                <strong className="profile-name">{name}</strong>
                                <p className="profile-des">{description}</p>
                            </span>
                        </div>
                        {showQuote && <div className={`${overrideQuote} icon-content`}><i aria-hidden="true" className={`${iconQuote}`}></i></div>}
                    </div>
                    {(contentPosition === undefined || contentPosition === 'below-image') && commentContent}
                    {starPosition !== undefined && starPosition === 'below-image' && <div className="comment-header"><ul className="rating-stars">{starRating}</ul></div>}
                </>;
            case 3:
                return <>
                    {showQuote && <div className={`${overrideQuote} icon-content`}><i aria-hidden="true" className={`${iconQuote}`}></i></div>}
                    {contentPosition !== undefined && contentPosition === 'above-image' && commentContent}
                    {starPosition !== undefined && starPosition === 'above-image' && <ul className="rating-stars">{starRating}</ul>}
                    <div className="comment-bio">
                        <div className="bio-details">
                            <div className="profile-image">
                                {lazy ? <img loading="lazy" src={getImageSrc(src)} alt={name} /> : <img src={getImageSrc(src)} alt={name} />}
                            </div>
                        </div>
                    </div>
                    {(starPosition === undefined || starPosition === 'below-image') && <ul className="rating-stars">{starRating}</ul>}
                    {(contentPosition === undefined || contentPosition === 'below-image') && commentContent}
                    <span className="profile-info">
                        <strong className="profile-name">{name}</strong>
                        <p className="profile-des">{description}</p>
                    </span>
                </>;
            case 4:
                return <>
                    {showQuote && <div className={`${overrideQuote} icon-content`}><i aria-hidden="true" className={`${iconQuote}`}></i></div>}
                    {contentPosition !== undefined && contentPosition === 'above-image' && commentContent}
                    <div className="comment-bio">
                        <div className="bio-details">
                            {starPosition !== undefined && starPosition === 'above-image' && <ul className="rating-stars">{starRating}</ul>}
                            <div className="profile-image">
                                {lazy ? <img loading="lazy" src={getImageSrc(src)} alt={name} /> : <img src={getImageSrc(src)} alt={name} />}
                            </div>
                            {(starPosition === undefined || starPosition === 'below-image') && <ul className="rating-stars">{starRating}</ul>}
                            <span className="profile-info">
                                <strong className="profile-name">{name}</strong>
                                <p className="profile-des">{description}</p>
                            </span>
                        </div>
                    </div>
                    {(contentPosition === undefined || contentPosition === 'below-image') && commentContent}
                </>;
        }
    };

    return <div className="guten-testimonial-item">
        <div className="testimonial-box hover-from-left">{content()}</div>
    </div>;
};

export default ContentItem;