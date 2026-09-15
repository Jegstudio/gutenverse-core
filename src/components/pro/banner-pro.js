import { applyFilters } from '@wordpress/hooks';
import ButtonUpgradePro from './button-upgrade-pro';
import isEmpty from 'lodash/isEmpty';

const  BannerPro = ({
    subtitle,
    title,
    leftBannerImg,
    rightBannerImg,
    backgroundGradient,
    container,
    customStyles = {},
    link
}) => {
    const {
        eventBanner,
        imgDir,
    } = window['GutenverseConfig'] || window['GutenverseDashboard'] || {};
    const eventData = eventBanner;
    const today = new Date();
    const expired = new Date(eventData?.expired);
    const eventBannerImage = container === 'library' ? eventData?.bannerLibrary : eventData?.banner;
    const showEventBanner = eventBannerImage && eventData?.url && !Number.isNaN(expired.getTime()) && today <= expired && container === 'library';
    const banner = <div className="banner-pro" style={customStyles}>
        {imgDir && (
            <>
                <img className="banner-image-background" src={`${imgDir}/${backgroundGradient}`} />
                <img className="banner-image-left" src={`${imgDir}/${leftBannerImg}`} />
                <img className="banner-image-right" src={`${imgDir}/${rightBannerImg}`} />
                <img className={`banner-image-arrow ${container}`} src={`${imgDir}/banner-arrow-blue.png`} />
                <img className={`banner-image-blink ${container}`} src={`${imgDir}/banner-graphic-blink.png`} />
            </>
        )}
        {!isEmpty(subtitle) && <p className="subtitle">{subtitle}</p>}
        {!isEmpty(title) && <h4 className="title">{title}</h4>}
        <div className="buttons">
            <ButtonUpgradePro location={container} isBanner={true} link={link}/>
            {/* <a className="demo-button" href={themesUrl} target="_blank" rel="noreferrer">{__('View Prebuild Demo', '--gctd--')}</a> */}
        </div>
    </div>;
    // Remove banner when script PRO is loaded.
    const bannerPro = applyFilters(
        'gutenverse.pro.upgrade.banner',
        banner,
        null
    );
    const EventBanner = () => {
        return <>
            {
                showEventBanner ? <div className="event-banner-wrapper">
                    <a href={eventData?.url} target="_blank" rel="noreferrer" aria-label="Gutenverse event banner">
                        <img
                            src={eventBannerImage}
                            alt=""
                            onError={(event) => event.currentTarget.closest('.event-banner-wrapper')?.remove()}
                        />
                    </a>
                </div> : bannerPro
            }
        </>
    }
    return <EventBanner/>;
};

export default BannerPro;
