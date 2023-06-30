
import { getImageSrc } from 'gutenverse-core/editor-helper';

const ContentItem = (data) => {
    const {
        src,
        name,
        description,
        comment,
        contentType,
        showQuote,
        iconQuote,
        quoteOverride
    } = data;

    const overrideQuote = quoteOverride ? 'quote-override' : '';

    const content = () => {
        switch (contentType) {
            case 1:
                return <div className="testimonial-slider hover-from-left">
                    <div className="comment-bio">
                        <div className="profile-image">
                            <img src={getImageSrc(src)} alt={name}/>
                        </div>
                        <ul className="rating-stars"></ul>
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
                    <div className="comment-header"><ul className="rating-stars"></ul></div>
                    <div className="comment-bio">
                        <div className="bio-details">
                            <div className="profile-image"><img src={getImageSrc(src)} alt={name}/></div>
                            <span className="profile-info">
                                <strong className="profile-name">{name}</strong>
                                <p className="profile-des">{description}</p>
                            </span>
                        </div>
                        {showQuote && <div className={`${overrideQuote} icon-content`}><i aria-hidden="true" className={`${iconQuote}`}></i></div>}
                    </div>
                    <div className="comment-content">
                        <p>{comment}</p>
                    </div>
                </>;
            case 3:
                return <>
                    {showQuote && <div className={`${overrideQuote} icon-content`}><i aria-hidden="true" className={`${iconQuote}`}></i></div>}
                    <div className="comment-bio">
                        <div className="bio-details">
                            <div className="profile-image"><img src={getImageSrc(src)} alt={name}/></div>
                        </div>
                    </div>
                    <ul className="rating-stars"></ul>
                    <div className="comment-content"><p>{comment}</p></div>
                    <span className="profile-info">
                        <strong className="profile-name">{name}</strong>
                        <p className="profile-des">{description}</p>
                    </span>
                </>;
            case 4:
                return <>
                    {showQuote && <div className={`${overrideQuote} icon-content`}><i aria-hidden="true" className={`${iconQuote}`}></i></div>}
                    <div className="comment-bio">
                        <div className="bio-details">
                            <div className="profile-image"><img src={getImageSrc(src)} alt={name}/></div>
                            <ul className="rating-stars"></ul>
                            <span className="profile-info">
                                <strong className="profile-name">{name}</strong>
                                <p className="profile-des">{description}</p>
                            </span>
                        </div>
                    </div>
                    <div className="comment-content"><p>{comment}</p></div>
                </>;
        }
    };

    return <div className="guten-testimonial-item">
        <div className="testimonial-box hover-from-left">{content()}</div>
    </div>;
};

export default ContentItem;