import { IconCrownBannerSVG } from 'gutenverse-core/icons';
import { __ } from '@wordpress/i18n';
import { applyFilters } from '@wordpress/hooks';
import { activeTheme, clientUrl } from 'gutenverse-core/config';
import { getUpgradeProps } from '../../../helper/freemius';

const proDemoUrl = 'https://jnews.io/';
const documentationUrl = 'https://support.jegtheme.com/theme/jnews/';
const upgradeProUrl = 'https://jnews.io/pricing';
const LockedJNewsBlocks = ({
    title,
    description,
    img,
    isOpen,
    permaLink,
    assetDir,
    withNotice = false,
}) => {
    const {
        videoDir,
        imgDir
    } = window['GutenverseConfig'];

    const dir = assetDir ? assetDir : videoDir;

    const ButtonPro = applyFilters(
        'jnews-blocks.pro-panel-button',
        () => <a className="gutenverse-button-available-pro" {...getUpgradeProps(`${upgradeProUrl}?utm_source=gutenverse&utm_medium=blockeditor&utm_client_site=${clientUrl}&utm_client_theme=${activeTheme}`)}> {__('Upgrade To Pro', '--gctd--')} <IconCrownBannerSVG /> </a>
    );
    return <>
        <h2 className="title">{title}</h2>
        <div>
            <span className="description">{description}</span>
        </div>
        {withNotice && <UpgradeNotice />}
        <div>
            <ButtonPro />
        </div>
        {!img && <div className="locked-panel-jnews-banner">
            <img src={`${imgDir}/jnews/panel-upgrade-banner.png`} alt="JNews Blocks Banner" />
        </div>}
        <div className="locked-panel-jnews-video">
            {img && <video autoPlay={isOpen} loop={isOpen}>
                <source src={`${dir}/${img}`} type="video/mp4" />
            </video>}
        </div>
        <div className="more-details">
            <div className="more-detail">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="8" cy="8" r="7.75" stroke="#5E23FF" strokeWidth="0.5" />
                    <path d="M6.21875 11.1128V4.89062L11.1076 8.00174L6.21875 11.1128Z" fill="#5E23FF" />
                </svg>
                <a href={`${proDemoUrl}/${permaLink ? permaLink : ''}`} target="_blank" rel="noreferrer">{__('Learn More', '--gctd--')}</a>
            </div>
            <div className="more-detail">
                <svg width="15" height="12" viewBox="0 0 15 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M14.7381 1.96275C13.532 1.3059 12.3251 0.976562 11.119 0.976562C9.913 0.976562 8.70605 1.3059 7.5 1.96275V10.9289C8.70605 10.3255 9.913 10.0242 11.119 10.0242C12.3251 10.0242 13.532 10.3255 14.7381 10.9289V1.96275Z" stroke="#5E23FF" strokeWidth="0.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M12.9819 3.04573C12.3622 2.87201 11.7424 2.78516 11.1217 2.78516C10.5011 2.78516 9.8822 2.87201 9.26153 3.04573M12.9819 4.85525C12.3622 4.68154 11.7424 4.59468 11.1217 4.59468C10.5011 4.59468 9.8822 4.68154 9.26153 4.85525M12.9819 6.66478C12.3622 6.49106 11.7424 6.4042 11.1217 6.4042C10.5011 6.4042 9.8822 6.49106 9.26153 6.66478M12.9819 8.4743C12.3622 8.30058 11.7424 8.21373 11.1217 8.21373C10.5011 8.21373 9.8822 8.30058 9.26153 8.4743M5.74382 3.04573C5.12315 2.87201 4.50429 2.78516 3.88363 2.78516C3.26296 2.78516 2.6441 2.87201 2.02344 3.04573M5.74382 4.85525C5.12315 4.68154 4.50429 4.59468 3.88363 4.59468C3.26296 4.59468 2.6441 4.68154 2.02344 4.85525M5.74382 6.66478C5.12406 6.49106 4.50429 6.4042 3.88363 6.4042C3.26296 6.4042 2.6441 6.49106 2.02344 6.66478M5.74382 8.4743C5.12406 8.30058 4.50429 8.21373 3.88363 8.21373C3.26296 8.21373 2.6441 8.30058 2.02344 8.4743" stroke="#5E23FF" strokeWidth="0.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path fillRule="evenodd" clipRule="evenodd" d="M7.50372 1.96275C6.29767 1.3059 5.09072 0.976562 3.88467 0.976562C2.67863 0.976562 1.47167 1.3059 0.265625 1.96275V10.9289C1.47167 10.3255 2.67863 10.0242 3.88467 10.0242C5.09072 10.0242 6.29767 10.3255 7.50372 10.9289V1.96275Z" stroke="#5E23FF" strokeWidth="0.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <a href={documentationUrl} target="_blank" rel="noreferrer">{__('Documentation', '--gctd--')}</a>
            </div>
        </div>
    </>;
};

const UpgradeNotice = () => {
    return <div className="locked-panel-jnews-notice">
        <svg xmlns="http://www.w3.org/2000/svg" width="10" height="12" viewBox="0 0 10 12" fill="none">
            <path d="M5 2C2.23877 2 0 4.23958 0 7C0 9.76204 2.23877 12 5 12C7.76123 12 10 9.76204 10 7C10 4.23958 7.76123 2 5 2ZM5 4.21774C5.46766 4.21774 5.84677 4.59685 5.84677 5.06452C5.84677 5.53218 5.46766 5.91129 5 5.91129C4.53234 5.91129 4.15323 5.53218 4.15323 5.06452C4.15323 4.59685 4.53234 4.21774 5 4.21774ZM6.12903 9.33871C6.12903 9.47232 6.02071 9.58065 5.8871 9.58065H4.1129C3.97929 9.58065 3.87097 9.47232 3.87097 9.33871V8.85484C3.87097 8.72123 3.97929 8.6129 4.1129 8.6129H4.35484V7.32258H4.1129C3.97929 7.32258 3.87097 7.21425 3.87097 7.08065V6.59677C3.87097 6.46317 3.97929 6.35484 4.1129 6.35484H5.40323C5.53683 6.35484 5.64516 6.46317 5.64516 6.59677V8.6129H5.8871C6.02071 8.6129 6.12903 8.72123 6.12903 8.85484V9.33871Z" fill="#5E23FF" />
        </svg>
        <span>This option requires the  <a href={upgradeProUrl} target="_blank" rel="noopener noreferrer">JNews Blocks PRO</a> plugin. Upgrade now to use this option.</span>
    </div>;
}


export default LockedJNewsBlocks;
