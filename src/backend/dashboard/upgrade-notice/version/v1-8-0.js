
import { __ } from '@wordpress/i18n';

const V180 = () => {
    const { gutenverseAssetURL: assetURL } = window['GutenverseDashboard'];

    return (
        <>
            <h2 className="update-title">{__('What\'s New', 'gutenverse')}</h2>
            <p className="update-desc">{__('This update focuses on improving our plugin functionalities and add some feature for collaboration: ', 'gutenverse')}</p>
            <ol>
                <li>{__('New System : Extend Template Library.', 'gutenverse')}</li>
                <p>
                    {__('Now any author can use our library to put their work.', 'gutenverse')}
                    <i>{__('(Documentation on how to do this will be available soon in our server Gutenverse.com).', 'gutenverse')}</i>
                </p>
                <img src={assetURL + '/img/upgrade-notice-1.8.0-1.webp'}></img>
                <li>{__('New System : Plugin Requirement.', 'gutenverse')}</li>
                <p>
                    {__('Now each layout/section inside template library will have plugin requirement and will tell you if you need to install/update certain plugin.', 'gutenverse')}
                </p>
                <img src={assetURL + '/img/upgrade-notice-1.8.0-2-1.webp'}></img>
                <img src={assetURL + '/img/upgrade-notice-1.8.0-2-2.webp'}></img>
                <img src={assetURL + '/img/upgrade-notice-1.8.0-2-3.webp'}></img>
                <li>{__('Improvement : Improve APIs.', 'gutenverse')}</li>
                <p>
                    {__('We strive to keep fixing and improving our plugin. This improvement is made too make your site more safe and secure.', 'gutenverse')}
                </p>
            </ol>
        </>
    );
};

export default V180;
