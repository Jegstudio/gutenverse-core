
import { __ } from '@wordpress/i18n';

const V160 = () => {
    const { gutenverseAssetURL: assetURL } = window['GutenverseDashboard'];

    return <>
        <h2 className="update-title">{__( 'What\'s New', 'gutenverse' )}</h2>
        <p className="update-desc">{__( 'There are some new exciting updates we want to announce. Below are summary of the new updates: ', 'gutenverse' )}</p>
        <ol>
            <li>{__( 'Section now can be full width in page editor.', 'gutenverse' )}</li>
            <div className="upgrade-notice-figure-2">
                <figure>
                    <img src={ assetURL + '/img/upgrade-notice-1.6.0-1.webp' } />
                    <figcaption>{__( 'Gutenverse section cannot be fullwidth in ', 'gutenverse' )}<strong>{__( 'version 1.5.0 or older', 'gutenverse' )}</strong></figcaption>
                </figure>
                <figure>
                    <img src={ assetURL + '/img/upgrade-notice-1.6.0-2.webp' } />
                    <figcaption><strong>{__( 'After version 1.6.0', 'gutenverse' )}</strong>{__( ', section is fullwidth inside page editor', 'gutenverse' )}</figcaption>
                </figure>
            </div>

            <p>{__( 'If you still prefer to use old layout, you can go to ', 'gutenverse' )}<strong>{__( 'Dashboard→Gutenverse→Settings', 'gutenverse' )}</strong>{__( '. And on Template option, ', 'gutenverse' )}<strong>{__( 'toggle on', 'gutenverse' )}</strong>{__( ' Inherit Layout', 'gutenverse' )}</p>
            <img src={ assetURL + '/img/upgrade-notice-1.6.0-3.webp' } />
            <li>{__( 'Page Template Rework', 'gutenverse' )}</li>
            <p>{__( 'Page template reworked to be able to contain ', 'gutenverse' )}<strong>{__( 'full width content', 'gutenverse' )}</strong>{__( ', if you have saved changes to your page templates and want to use this one, you can reset your page template.', 'gutenverse' )}</p>
            <img src={ assetURL + '/img/upgrade-notice-1.6.0-4.webp' } />

            <p>{__( 'This is a comparison of how the page content looks now on the frontend with the previous version.', 'gutenverse' )}</p>
            <div className="upgrade-notice-figure-2">
                <figure>
                    <img src={ assetURL + '/img/upgrade-notice-1.6.0-5.webp' } />
                    <figcaption>{__( 'Gutenverse version ', 'gutenverse' )}<strong>{__( '1.5.0 or older', 'gutenverse' )}</strong></figcaption>
                </figure>
                <figure>
                    <img src={ assetURL + '/img/upgrade-notice-1.6.0-6.webp' } />
                    <figcaption>{__( 'Gutenverse version ', 'gutenverse' )}<strong>{__( '1.6.0 and later', 'gutenverse' )}</strong></figcaption>
                </figure>
            </div>
            <li>{__( 'Global Style', 'gutenverse' )}</li>
            <p>{__( 'Our themes now attach ', 'gutenverse' )}<strong>{__( 'Global fonts and colors', 'gutenverse' )}</strong>{__( ', so you can changes the global styles without needing to change the styles for each blocks.', 'gutenverse' )}</p>
            <div className="upgrade-notice-figure-3">
                <figure>
                    <img src={ assetURL + '/img/upgrade-notice-1.6.0-7.webp' } />
                    <figcaption><strong>{__( 'List Global Font', 'gutenverse' )}</strong></figcaption>
                </figure>
                <figure>
                    <img src={ assetURL + '/img/upgrade-notice-1.6.0-8.webp' } />
                    <figcaption><strong>{__( 'Attach Global Font', 'gutenverse' )}</strong></figcaption>
                </figure>
                <figure>
                    <img src={ assetURL + '/img/upgrade-notice-1.6.0-9.webp' } />
                    <figcaption><strong>{__( 'Attach Global Color', 'gutenverse' )}</strong></figcaption>
                </figure>
            </div>
        </ol></>;
};

export default V160;