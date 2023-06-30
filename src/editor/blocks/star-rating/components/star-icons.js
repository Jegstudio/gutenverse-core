

const StarIcons = ({starIcon, rating, total}) => {
    const faIcon = (active = false) => {
        switch (starIcon) {
            case 'rounded':
                return active ? 'full fas fa-star' : 'empty far fa-star';
            case 'rounded-fill':
                return active ? 'full fas fa-star' : 'empty fas fa-star';
            case 'fill':
                return active ? 'full fa fa-star' : 'empty fa fa-star';
            case 'smile-2':
                return active ? 'full fas fa-smile' : 'empty fas fa-frown';
            case 'thumbs':
                return active ? 'full fas fa-thumbs-up' : 'empty fas fa-thumbs-down';
            case 'default':
            default:
                return active ? 'full fa fa-star' : 'empty fa fa-star-o';
        }
    };

    const icons = [];

    for ( let i=0; i<total; i++ ) {
        const fa = i < rating ? faIcon(true) : faIcon();

        icons.push(<i className={fa}></i>);
    }

    return <div className="rating-icons">
        {icons.map(icon => icon)}
    </div>;
};

export default StarIcons;