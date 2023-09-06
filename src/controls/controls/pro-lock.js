import { useState, useRef, useEffect } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { IconCrownSVG } from 'gutenverse-core/icons';
import { X } from 'react-feather';

const ProLock = ({title, description}) => {
    const [popup, setPopup] = useState(false);
    const popupRef = useRef();
    const {
        imgDir,
        proUrl,
        serverUrl,
        documentationUrl
    } = window['GutenverseConfig'];

    const openLink = () => {
        window.open(proUrl);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (popupRef.current && !popupRef.current.contains(event.target)) {
                setPopup(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [popupRef]);

    return <>
        <div className={'control-locked'}>
            <p className="label" onClick={() => setPopup(true)}>
                <strong>{__('PRO', '--gctd--')}</strong>
                <svg width="10" height="11" viewBox="0 0 10 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4.9974 2.375C2.91406 2.375 1.1349 3.67083 0.414062 5.5C1.1349 7.32917 2.91406 8.625 4.9974 8.625C7.08073 8.625 8.8599 7.32917 9.58073 5.5C8.8599 3.67083 7.08073 2.375 4.9974 2.375ZM4.9974 7.58333C3.8474 7.58333 2.91406 6.65 2.91406 5.5C2.91406 4.35 3.8474 3.41667 4.9974 3.41667C6.1474 3.41667 7.08073 4.35 7.08073 5.5C7.08073 6.65 6.1474 7.58333 4.9974 7.58333ZM4.9974 4.25C4.30573 4.25 3.7474 4.80833 3.7474 5.5C3.7474 6.19167 4.30573 6.75 4.9974 6.75C5.68906 6.75 6.2474 6.19167 6.2474 5.5C6.2474 4.80833 5.68906 4.25 4.9974 4.25Z" fill="#C1313F" />
                </svg>
            </p>
            {popup && <div className={'control-locked-popup'}>
                <div className="popup-body" ref={popupRef}>
                    <div className="close" onClick={() => setPopup(false)}><X size={18}/></div>
                    <h2 className="title">{title}</h2>
                    <div>
                        <div className="gutenverse-button" onClick={openLink}><IconCrownSVG /> Available in Pro Version</div>
                    </div>
                    <div>
                        <p className="description">{description}</p>
                    </div>
                    <div>
                        <img className="illustration" src={`${imgDir}/pro/sticky.gif`} />
                    </div>
                    <div className="more-details">
                        <div className="more-detail">
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="8" cy="8" r="7.75" stroke="#3B57F7" strokeWidth="0.5" />
                                <path d="M6.21875 11.1128V4.89062L11.1076 8.00174L6.21875 11.1128Z" fill="#3B57F7" />
                            </svg>
                            <a href={serverUrl} target="_blank" rel="noreferrer">{__('View Demo', '--gctd--')}</a>
                        </div>
                        <div className="more-detail">
                            <svg width="15" height="12" viewBox="0 0 15 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" clipRule="evenodd" d="M14.7381 1.96275C13.532 1.3059 12.3251 0.976562 11.119 0.976562C9.913 0.976562 8.70605 1.3059 7.5 1.96275V10.9289C8.70605 10.3255 9.913 10.0242 11.119 10.0242C12.3251 10.0242 13.532 10.3255 14.7381 10.9289V1.96275Z" stroke="#3B57F7" strokeWidth="0.5" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M12.9819 3.04573C12.3622 2.87201 11.7424 2.78516 11.1217 2.78516C10.5011 2.78516 9.8822 2.87201 9.26153 3.04573M12.9819 4.85525C12.3622 4.68154 11.7424 4.59468 11.1217 4.59468C10.5011 4.59468 9.8822 4.68154 9.26153 4.85525M12.9819 6.66478C12.3622 6.49106 11.7424 6.4042 11.1217 6.4042C10.5011 6.4042 9.8822 6.49106 9.26153 6.66478M12.9819 8.4743C12.3622 8.30058 11.7424 8.21373 11.1217 8.21373C10.5011 8.21373 9.8822 8.30058 9.26153 8.4743M5.74382 3.04573C5.12315 2.87201 4.50429 2.78516 3.88363 2.78516C3.26296 2.78516 2.6441 2.87201 2.02344 3.04573M5.74382 4.85525C5.12315 4.68154 4.50429 4.59468 3.88363 4.59468C3.26296 4.59468 2.6441 4.68154 2.02344 4.85525M5.74382 6.66478C5.12406 6.49106 4.50429 6.4042 3.88363 6.4042C3.26296 6.4042 2.6441 6.49106 2.02344 6.66478M5.74382 8.4743C5.12406 8.30058 4.50429 8.21373 3.88363 8.21373C3.26296 8.21373 2.6441 8.30058 2.02344 8.4743" stroke="#3B57F7" strokeWidth="0.5" strokeLinecap="round" strokeLinejoin="round" />
                                <path fillRule="evenodd" clipRule="evenodd" d="M7.50372 1.96275C6.29767 1.3059 5.09072 0.976562 3.88467 0.976562C2.67863 0.976562 1.47167 1.3059 0.265625 1.96275V10.9289C1.47167 10.3255 2.67863 10.0242 3.88467 10.0242C5.09072 10.0242 6.29767 10.3255 7.50372 10.9289V1.96275Z" stroke="#3B57F7" strokeWidth="0.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            <a href={documentationUrl} target="_blank" rel="noreferrer">{__('Documentation', '--gctd--')}</a>
                        </div>
                    </div>
                </div>
            </div>}
        </div>
    </>;
};

export default ProLock;