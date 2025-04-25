
import { __ } from '@wordpress/i18n';

export const HeaderV300 = () => {
    const { gutenverseAssetURL: assetURL } = window['GutenverseDashboard'];

    return (
        <div className="custom-notice-header">
            <img src={`${assetURL}/img/upgrade-notice-2.0.0-new-bg.png`}/>
            <h3 className="upgrade-notice-title">
                {__('Gutenverse', 'gutenverse')}
                &nbsp;
                <span>{__('Version 3.0.0', 'gutenverse')}</span>
                <svg width="30" height="32" viewBox="0 0 30 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10.887 21.774c2.28-6.758 4.13-8.606 10.887-10.887C15.016 8.607 13.168 6.757 10.887 0 8.607 6.757 6.757 8.606 0 10.887c6.757 2.28 8.606 4.13 10.887 10.887z" fill="url(#170g7q8f6a)"/>
                    <path d="M23.371 20.121c-1.244 3.687-2.253 4.695-5.94 5.94 3.687 1.244 4.696 2.252 5.94 5.939 1.244-3.687 2.253-4.695 5.94-5.94-3.687-1.244-4.696-2.252-5.94-5.939z" fill="url(#whjndz5ptb)"/>
                    <defs>
                        <linearGradient id="170g7q8f6a" x1="2.844" y1="-8.404" x2="32.507" y2="36.419" gradientUnits="userSpaceOnUse">
                            <stop stopColor="#65DCF5"/>
                            <stop offset="1" stopColor="#65DCF5" stopOpacity="0"/>
                        </linearGradient>
                        <linearGradient id="whjndz5ptb" x1="18.983" y1="15.537" x2="35.165" y2="39.989" gradientUnits="userSpaceOnUse">
                            <stop stopColor="#65DCF5"/>
                            <stop offset="1" stopColor="#65DCF5" stopOpacity="0"/>
                        </linearGradient>
                    </defs>
                </svg>
            </h3>
        </div>
    );
};

export const ContentV300 = () => {
    const { gutenverseAssetURL: assetURL } = window['GutenverseDashboard'];

    return (
        <>
            <div className="inner-content">
                <div className="top-content">
                    <div className="badge">{__('New', 'gutenverse')}</div>
                    <h5><strong>{__('What\'s New?', 'gutenverse')}</strong></h5>
                    <p>{__('A smoother editing experience and better design control—all in one update.', 'gutenverse')}</p>
                </div>
                <h4>
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="32" height="32" fill="url(#paint0_linear_22074_8409)"/>
                    <path d="M15 18.1818H10L17 8V13.8182H22L15 24V18.1818Z" fill="white"/>
                    <defs>
                        <linearGradient id="paint0_linear_22074_8409" x1="-12.2857" y1="-6.57143" x2="60.2857" y2="66.5714" gradientUnits="userSpaceOnUse">
                            <stop stop-color="#4569FF"/>
                            <stop offset="0.16" stop-color="#4C82FD"/>
                            <stop offset="0.55" stop-color="#5BB7F8"/>
                            <stop offset="0.84" stop-color="#64D8F5"/>
                            <stop offset="1" stop-color="#68E4F4"/>
                        </linearGradient>
                    </defs>
                </svg>
                    {__('Improve Editing Experience', 'gutenverse')}
                </h4>
                <p>{__('We\’re excited to announce the improvement you\’ve been waiting for! With this update, the editor experience is now smoother, faster, and more intuitive—making content creation more enjoyable than ever.', 'gutenverse')}</p>
                <div className="detail-ecosystem">
                    <img className='image-1' src={assetURL + '/img/upgrade-notice-3.0.0-overlay-image-1.png'}></img>
                    <img className='overlay' src={assetURL + '/img/upgrade-notice-3.0.0-overlay.png'}></img>
                    <img className='image-2' src={assetURL + '/img/upgrade-notice-3.0.0-overlay-image-2.png'}></img>
                </div>
                <h4>
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="32" height="32" fill="url(#paint0_linear_22074_8516)"/>
                    <path d="M16.6 12.5701L19.428 15.3981L12.828 21.9981H10V19.1694L16.6 12.5701ZM17.5427 11.6268L18.9567 10.2128C19.0817 10.0878 19.2512 10.0176 19.428 10.0176C19.6048 10.0176 19.7743 10.0878 19.8993 10.2128L21.7853 12.0981C21.8473 12.16 21.8965 12.2335 21.93 12.3145C21.9636 12.3954 21.9809 12.4822 21.9809 12.5698C21.9809 12.6574 21.9636 12.7441 21.93 12.8251C21.8965 12.906 21.8473 12.9795 21.7853 13.0414L20.3707 14.4554L17.5427 11.6268Z" fill="white"/>
                    <defs>
                        <linearGradient id="paint0_linear_22074_8516" x1="-12.2857" y1="-6.57143" x2="60.2857" y2="66.5714" gradientUnits="userSpaceOnUse">
                            <stop stop-color="#4569FF"/>
                            <stop offset="0.16" stop-color="#4C82FD"/>
                            <stop offset="0.55" stop-color="#5BB7F8"/>
                            <stop offset="0.84" stop-color="#64D8F5"/>
                            <stop offset="1" stop-color="#68E4F4"/>
                        </linearGradient>
                    </defs>
                </svg>
                    {__('Editing Pages and Posts with Templates On', 'gutenverse')}
                </h4>
                <p>{__('In newer versions of WordPress, you can now view your page or post content directly inside the template while editing. This means what you see in the editor now closely matches what you\'ll get on the frontend—We adjust our plugins so it supports this feature, giving you a more accurate and visual editing experience without needing to switch to preview mode.', 'gutenverse')}</p>
                <div className="feature-editing-with-template">
                    <div className='locked-editing-mode'>
                        <div className='image-card-container'>
                            <img className='content-editing' src={assetURL + '/img/upgrade-notice-3.0.0-content-editing.png'}></img>
                            <p>{__('Content', 'gutenverse')} <span>{__('Editing Mode', 'gutenverse')}</span></p>
                        </div>
                        <div className='image-card-container'>
                            <img className='template-editing' src={assetURL + '/img/upgrade-notice-3.0.0-template-editing.png'}></img>
                            <p>{__('Show', 'gutenverse')} <span>{__('Template Mode', 'gutenverse')}</span></p>
                        </div>
                    </div>
                    <div className='image-card-container'>
                        <img className='locked-post-notice' src={assetURL + '/img/upgrade-notice-3.0.0-locked-post-notice.png'}></img>
                        <p>{__('Gutenverse', 'gutenverse')} <span>{__('Post Content', 'gutenverse')}</span> {__('is Locked', 'gutenverse')}</p>
                    </div>
                </div>
                <h4>
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="32" height="32" fill="url(#paint0_linear_22074_8524)"/>
                    <path d="M19.488 17.6C19.552 17.072 19.6 16.544 19.6 16C19.6 15.456 19.552 14.928 19.488 14.4H22.192C22.32 14.912 22.4 15.448 22.4 16C22.4 16.552 22.32 17.088 22.192 17.6M18.072 22.048C18.552 21.16 18.92 20.2 19.176 19.2H21.536C20.7609 20.5346 19.5313 21.5456 18.072 22.048ZM17.872 17.6H14.128C14.048 17.072 14 16.544 14 16C14 15.456 14.048 14.92 14.128 14.4H17.872C17.944 14.92 18 15.456 18 16C18 16.544 17.944 17.072 17.872 17.6ZM16 22.368C15.336 21.408 14.8 20.344 14.472 19.2H17.528C17.2 20.344 16.664 21.408 16 22.368ZM12.8 12.8H10.464C11.2311 11.4618 12.4598 10.4492 13.92 9.952C13.44 10.84 13.08 11.8 12.8 12.8ZM10.464 19.2H12.8C13.08 20.2 13.44 21.16 13.92 22.048C12.4629 21.5453 11.2359 20.5342 10.464 19.2ZM9.808 17.6C9.68 17.088 9.6 16.552 9.6 16C9.6 15.448 9.68 14.912 9.808 14.4H12.512C12.448 14.928 12.4 15.456 12.4 16C12.4 16.544 12.448 17.072 12.512 17.6M16 9.624C16.664 10.584 17.2 11.656 17.528 12.8H14.472C14.8 11.656 15.336 10.584 16 9.624ZM21.536 12.8H19.176C18.9256 11.8092 18.5549 10.8527 18.072 9.952C19.544 10.456 20.768 11.472 21.536 12.8ZM16 8C11.576 8 8 11.6 8 16C8 18.1217 8.84285 20.1566 10.3431 21.6569C11.086 22.3997 11.9679 22.989 12.9385 23.391C13.9091 23.7931 14.9494 24 16 24C18.1217 24 20.1566 23.1571 21.6569 21.6569C23.1571 20.1566 24 18.1217 24 16C24 14.9494 23.7931 13.9091 23.391 12.9385C22.989 11.9679 22.3997 11.086 21.6569 10.3431C20.914 9.60028 20.0321 9.011 19.0615 8.60896C18.0909 8.20693 17.0506 8 16 8Z" fill="white"/>
                    <defs>
                        <linearGradient id="paint0_linear_22074_8524" x1="-12.2857" y1="-6.57143" x2="60.2857" y2="66.5714" gradientUnits="userSpaceOnUse">
                            <stop stop-color="#4569FF"/>
                            <stop offset="0.16" stop-color="#4C82FD"/>
                            <stop offset="0.55" stop-color="#5BB7F8"/>
                            <stop offset="0.84" stop-color="#64D8F5"/>
                            <stop offset="1" stop-color="#68E4F4"/>
                        </linearGradient>
                    </defs>
                </svg>
                    {__('Global Style and Library Improvements', 'gutenverse')}
                </h4>
                <p>{__('The Library now supports importing sections and layouts along with global styles. This makes it easier to maintain design consistency with your current theme—no more manually tweaking imported content to match your site’s look and feel.', 'gutenverse')}</p>
                <p style={{fontStyle:'italic'}}><span>{__('NOTE : ', 'gutenverse')}</span>{__('Global styles are applied only with supported themes.', 'gutenverse')}</p>
                <div className="feature-global-import">
                    <div className='image-card-container'>
                        <img className='image-import-section' src={assetURL + '/img/upgrade-notice-3.0.0-import-section.png'}></img>
                        <p>{__('Importing section with', 'gutenverse')} <span>{__('Default Styles', 'gutenverse')}</span></p>
                    </div>
                    <div className='image-card-container'>
                        <img className='import-with-global' src={assetURL + '/img/upgrade-notice-3.0.0-import-with-global.png'}></img>
                        <p>{__('Importing section with', 'gutenverse')} <span>{__('Global Styles', 'gutenverse')}</span></p>
                    </div>
                </div>
            </div>
        </>
    );
};

