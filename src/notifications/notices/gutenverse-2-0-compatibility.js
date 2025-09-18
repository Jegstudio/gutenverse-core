import { __ } from '@wordpress/i18n';

export const Gutenverse20Compatibility = ({ data }) => {
    const { action_url, plugin_list } = data;
    return <>
        <div className="gutenverse-2-0-compatibility-notice">
            <h3>{__('Important Gutenverse Compatibility Notice!', 'gutenverse')}</h3>
            <p>
                {__('You are currently using lower version of Gutenverse plugin, we highly recommend to update to Gutenverse 2.0 or higher so you can continue using these plugins :', 'gutenverse')}
            </p>
            <ul className="plugin-list">
                {
                    plugin_list.map((plugin, index) => {
                        return <li key={index} >{plugin}</li>;
                    })
                }
            </ul>
            <div className="gutenverse-upgrade-action">
                <a className="update-action guten-button guten-primary" href={action_url}>{__('Update Gutenverse Now!', 'gutenverse')}</a>
            </div>
        </div>
    </>;
};