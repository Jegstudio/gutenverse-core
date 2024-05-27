
import { __ } from '@wordpress/i18n';

export const ContentV170 = () => {
    const { gutenverseAssetURL: assetURL } = window['GutenverseDashboard'];

    return (
        <>
            <h2 className="update-title">{__('What\'s New', 'gutenverse')}</h2>
            <p className="update-desc">{__('There are some new features and improvement added. Below are summary of the new updates: ', 'gutenverse')}</p>
            <ol>
                <li>{__('New Block : Popup Builder.', 'gutenverse')}</li>
                <p>
                    {__('We added new block ', 'gutenverse')}
                    <strong>{__('popup builder', 'gutenverse')}</strong>
                    {__('. More option for you to build functionality on your amazing website.', 'gutenverse')}
                </p>
                <img src={assetURL + '/img/upgrade-notice-1.7.0-1.webp'}></img>
                <li>{__('Dashboard UI/UX Improvement.', 'gutenverse')}</li>
                <p>
                    {__('We made a more polished and improved Dashboard experience, so you can swithc between options seamlessly', 'gutenverse')}
                </p>
                <img src={assetURL + '/img/upgrade-notice-1.7.0-2.webp'}></img>
                <li>{__('New Setting : Responsive Breakpoints.', 'gutenverse')}</li>
                <p>
                    {__('An option many users have been waiting for, now you can edit your site\'s Tablet and Mobile breakpoints.', 'gutenverse')}
                </p>
                <img src={assetURL + '/img/upgrade-notice-1.7.0-3.webp'}></img>
                <li>{__('New Setting : Block Management', 'gutenverse')}</li>
                <p>
                    {__('Have some blocks you never used at all? Now you can disable it and make your editing exprience more lightly. NOTE: If you have some blocks already saved in your site, disabling the block will make the layout containing that block not rendered.', 'gutenverse')}
                </p>
                <img src={assetURL + '/img/upgrade-notice-1.7.0-4.webp'}></img>
                <li>{__('New System Status', 'gutenverse')}</li>
                <p>
                    {__('System status will help you notice the requirement for your website, and also make it easy for you to provide information if you need support.', 'gutenverse')}
                </p>
                <div className="update-multi-images">
                    <img src={assetURL + '/img/upgrade-notice-1.7.0-5-1.webp'}></img>
                    <img src={assetURL + '/img/upgrade-notice-1.7.0-5-2.webp'}></img>
                </div>
            </ol>
        </>
    );
};
