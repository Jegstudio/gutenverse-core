
import classnames from 'classnames';
import { __ } from '@wordpress/i18n';
import { X } from 'react-feather';
import { getImageSrc } from 'gutenverse-core-editor/helper';

const TeamPopup = ({elementId, show = false, onClose = () => {}, src, nameTag: NameTag, name, description, job, phone, email, socialComponent}) => {
    const classNames = {
        className: classnames(
            'profile-popup',
            {
                ['show']: show
            }
        )
    };

    return <div id={elementId} {...classNames}>
        <div className="overlay" onClick={onClose}></div>
        <div className="popup">
            <div className="popup-close" onClick={onClose}><X/></div>
            <div className="content-1">
                <img src={getImageSrc(src)} alt={name}/>
            </div>
            <div className="content-2">
                <NameTag className={'profile-title'}>{name}</NameTag>
                <p className={'profile-sub'}>{job}</p>
                <p className={'profile-desc'}>{description}</p>
                <p className={'profile-phone'}><strong>{__('Phone', 'gutenverse')} :</strong>  {phone}</p>
                <p className={'profile-email'}><strong>{__('Email', 'gutenverse')} :</strong>  {email}</p>
                {socialComponent}
            </div>
        </div>
    </div>;
};

export default TeamPopup;