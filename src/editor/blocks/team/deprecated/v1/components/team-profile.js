
import { getImageSrc } from 'gutenverse-core/editor-helper';
import { RichText } from '@wordpress/block-editor';

const TeamProfile = (props) => {
    const {
        socialComponent,
        attributes,
        frontEnd,
    } = props;
    const {
        profileType,
        src,
        lazy,
        addPopup,
        overlayType,
        overlayPosition,
        name,
        job,
        description,
        showDesc,
        showSocial,
        nameTag: NameTag,
        hoverBottom,
        hoverBottomDirection,
    } = attributes;
    const lazyLoad = () => {
        if(lazy){
            return <img loading="lazy" src={getImageSrc(src)} alt={name}/>;
        } else return <img src={getImageSrc(src)} alt={name}/>;
    };
    const contentDesc = (classnames, identifier, data, tag ) => {
        if(showDesc){
            if(frontEnd){
                return <RichText.Content
                    className={classnames}
                    tagName={tag}
                    value={data}
                />;
            }
        } else if(!showDesc && identifier !== 'description'){
            if(frontEnd){
                return <RichText.Content
                    className={classnames}
                    tagName={tag}
                    value={data}
                />;
            }
        }
    };

    const contentType = () => {
        switch(profileType) {
            case 'overlay':
                return (
                    <div className={`profile-card card-overlay ${overlayType === undefined ? 'undefined' : overlayType}`}>
                        {lazyLoad()}
                        <div className={`profile-body ${overlayPosition === undefined ? 'undefined' : overlayPosition}`}>
                            {contentDesc(`profile-title ${addPopup ? 'popup' : ''}`,'name', name, NameTag )}
                            {contentDesc('profile-sub', 'job', job, 'p')}
                            {contentDesc('profile-desc', 'description', description, 'p')}
                            {showSocial && <div className="socials-wrapper">
                                {socialComponent}
                            </div>}
                        </div>
                    </div>
                );
            case 'hover':
                return (
                    <div className={'profile-card card-hover'}>
                        <div className={`profile-header ${addPopup ? 'popup' : ''}`} >
                            {lazyLoad()}
                        </div>
                        <div className={'profile-body'}>
                            {contentDesc(`profile-title ${addPopup ? 'popup' : ''}`, 'name', name, NameTag )}
                            {contentDesc('profile-sub', 'job', job, 'p')}
                            {contentDesc('profile-desc', 'description', description, 'p')}
                            {showSocial && <div className="socials-wrapper">
                                {socialComponent}
                            </div>}
                        </div>
                        {hoverBottom && <div className={'border-bottom'}>
                            <div className={`animated ${hoverBottomDirection}`}></div>
                        </div>}
                    </div>
                );
            default:
                return (
                    <div className={'profile-card card-default'}>
                        <div className={`profile-header ${addPopup ? 'popup' : ''}`} >
                            {lazyLoad()}
                        </div>
                        <div className={'profile-body'}>
                            {contentDesc(`profile-title ${addPopup ? 'popup' : ''}`, 'name', name, NameTag )}
                            {contentDesc('profile-sub', 'job', job, 'p')}
                            {contentDesc('profile-desc', 'description', description, 'p')}
                        </div>
                        {showSocial && <div className={'profile-footer'}>
                            <div className="socials-wrapper">
                                {socialComponent}
                            </div>
                        </div>}
                        {hoverBottom && <div className={'border-bottom'}>
                            <div className={`animated ${hoverBottomDirection}`}></div>
                        </div>}
                    </div>
                );
        }
    };
    return (
        <div className={'profile-box'}>
            {contentType()}
        </div>
    );
};

export default TeamProfile;