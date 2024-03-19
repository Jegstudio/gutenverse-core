
import { getImageSrc } from 'gutenverse-core/editor-helper';
import { __ } from '@wordpress/i18n';
import { RichText } from '@wordpress/block-editor';

const TeamProfile = ({
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
    socialComponent,
    setAttributes,
    frontEnd,
    // onClick = () => {}
}) => {
    const lazyLoad = () => {
        if(lazy){
            return <img loading="lazy" src={getImageSrc(src)} alt={name}/>;
        } else return <img src={getImageSrc(src)} alt={name}/>;
    };
    const contentDesc = (classnames, ariaLabel, identifier, data, tag ) => {
        if(showDesc){
            if(frontEnd){
                return <RichText.Content
                    className={classnames}
                    tagName={tag}
                    aria-label={ariaLabel}
                    value={data}
                />;
            }else{
                return <RichText
                    className={classnames}
                    tagName={tag}
                    aria-label={ariaLabel}
                    value={data}
                    identifier={identifier}
                    onChange={value => setAttributes({ [identifier]: value })}
                />;
            }
        }
    };

    const contentType = () => {
        switch(profileType) {
            case 'overlay':
                return (
                    <div className={`profile-card card-overlay ${overlayType}`}>
                        {lazyLoad()}
                        <div className={`profile-body ${overlayPosition}`}>
                            {contentDesc(`profile-title ${addPopup ? 'popup' : ''}`,__('Profile Name', 'gutenverse'), 'name', name, NameTag )}
                            {contentDesc('profile-sub', __('Profile Job', 'gutenverse'), 'job', job, 'p')}
                            {contentDesc('profile-desc', __('Team Description', 'gutenverse'), 'description', description, 'p')}
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
                            {contentDesc(`profile-title ${addPopup ? 'popup' : ''}`,__('Profile Name', 'gutenverse'), 'name', name, NameTag )}
                            {contentDesc('profile-sub', __('Profile Job', 'gutenverse'), 'job', job, 'p')}
                            {contentDesc('profile-desc', __('Team Description', 'gutenverse'), 'description', description, 'p')}
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
                            {contentDesc(`profile-title ${addPopup ? 'popup' : ''}`,__('Profile Name', 'gutenverse'), 'name', name, NameTag )}
                            {contentDesc('profile-sub', __('Profile Job', 'gutenverse'), 'job', job, 'p')}
                            {contentDesc('profile-desc', __('Team Description', 'gutenverse'), 'description', description, 'p')}
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