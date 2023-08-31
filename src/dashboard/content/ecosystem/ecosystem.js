import { __ } from '@wordpress/i18n';
import { useState, useEffect } from '@wordpress/element';
import apiFetch from '@wordpress/api-fetch';
import { compose } from '@wordpress/compose';
import { withSelect } from '@wordpress/data';
import { withDispatch } from '@wordpress/data';
import classnames from 'classnames';
import isEmpty from 'lodash/isEmpty';
import semver from 'semver';
import { Loader } from 'react-feather';
import { DashboardBody, DashboardContent, DashboardHeader } from '../../components';

const PluginItem = ({
    plugin,
    plugins,
    ...props
}) => {
    const { slug, name, version, icons, description, incoming, icon, url, host } = plugin;
    const [loadingString, setLoadingString] = useState('');
    const [loading, setLoading] = useState(false);
    const [isRetry, setIsRetry] = useState(true);
    const installed = plugins[slug];
    let action = null;
    const downloadZip = (url) => {
        window.location.href = url;
    };
    const installingPlugin = () => {
        setLoading(true);
        setLoadingString(__('Installing Plugin', '--gctd--'));

        apiFetch({
            path: 'wp/v2/plugins',
            method: 'POST',
            data: {
                slug,
                status: 'active'
            },
        }).then(res => {
            const { version, name, plugin } = res;
            props.installPlugin({
                slug: slug,
                name: name,
                path: plugin,
                version: version
            });
            setLoading(false);
        }).then(() => {}).catch(() => {
            alert('Error during installing plugin');
        }).finally(() => {
            setLoading(false);
            setLoadingString('');
        });
    };

    const updatingPlugin = () => {
        setLoading(true);
        setLoadingString(__('Disabling Plugin', '--gctd--'));

        if (installed) {
            apiFetch({
                path: `wp/v2/plugins/plugin?plugin=${installed?.path}`,
                method: 'POST',
                data: {
                    status: 'inactive'
                }
            }).then(() => {
                setLoadingString(__('Deleting Plugin', '--gctd--'));

                return apiFetch({
                    path: `wp/v2/plugins/plugin?plugin=${installed?.path}`,
                    method: 'DELETE',
                });
            }).then(() => {
                installingPlugin();
            });
        }
    };

    const activatingPlugin = (update) => {
        if (update) {
            updatingPlugin();
        } else {
            setLoading(true);
            setLoadingString(__('Activating Plugin', '--gctd--'));
            apiFetch({
                path: `wp/v2/plugins/plugin?plugin=${installed?.path}`,
                method: 'POST',
                data: {
                    status: 'active'
                }
            }).then(res => {
                const { plugin } = res;
                const slug = plugin.split('/');
                props.activatePlugin(slug[0]);
                setLoading(false);
                setLoadingString('');
            }).catch(() => {
                if (isRetry) {
                    setIsRetry(false);
                    activatingPlugin(false);
                }
            });
        }
    };

    const singleClass = classnames('install-action', {
        'loading': loading,
    });

    const loadingCircle = loading && <div className="rotating" style={{ display: 'flex' }}>
        <Loader size={20} />
    </div>;
    
    if ( installed ) {
        const invalidVersion = !isEmpty(version) && !semver.gte(installed.version, version || '0.0.0');
        const string = invalidVersion ? __('Update & Activate Plugin', '--gctd--') : __('Activate Plugin', '--gctd--');
        if (installed.active === false) {
            action = <div className={`${singleClass} update`} onClick={() => {
                activatingPlugin(invalidVersion);
                setIsRetry(true);
            }}>
                {loadingCircle}
                {loading ? loadingString : string}
            </div>;
        } else {
            if (invalidVersion) {
                action = <div className={`${singleClass} update`} onClick={() => host === 'server' ? downloadZip(url) : updatingPlugin()}>
                    {loadingCircle}
                    {loading ? loadingString : __('Update Plugin', '--gctd--')}
                </div>;
            } 

            action = <div className={`${singleClass} installed`} >
                {loadingCircle}
                {loading ? loadingString : __('Downloaded', '--gctd--')}
            </div>;
        }
    } else if ( !installed && incoming == 0) {
        action = <div className={singleClass} onClick={() => host === 'server' ? downloadZip(url) : installingPlugin()}>
            {loadingCircle}
            {loading ? loadingString : __('Download Plugin', '--gctd--')}
        </div>;
    }else{
        action = <div className={`${singleClass} installed`}>
            {loadingCircle}
            {loading ? loadingString : __('Release Soon', '--gctd--')}
        </div>;
    }
    return <div key={slug} className="plugin-item">
        {
            incoming === "1" && <div className="ribbon">SOON</div>
        }
        {
            icon ? <div className="icon-wrapper">
            <img className="icon-plugin" src={icon[0]}/> </div>: <div className="icon-wrapper"> 
            <img className="icon-plugin" src={icons }></img></div>
        }
        <div className="details">
            
            <h2 className="plugin-title">
                {name.includes('Gutenverse') ? <>
                    <span>{__('Gutenverse', '--gctd--')}</span>&nbsp;
                    {name.split('Gutenverse').join('')}
                </> : name}
            </h2>
            {version ? 
            <p className="plugin-version">
                {__('Version ', '--gctd--')}
                {version}
            </p> : 
            <p className="plugin-version">
                {__('Coming Soon', '--gctd--')}
            </p>
            }
            {description && <p className="plugin-description">
                {description.substring(0, 80) + '...'}
            </p>}
        </div>
        <div className="plugin-actions">
            {action}
        </div>
    </div>;
};

const PluginsData = ({
    pluginEcosystem,
    fetching,
    ...props
}) => {
    return fetching ? <>
        <div className="ecosystem-data fetching" />
        <div className="ecosystem-data fetching" />
        <div className="ecosystem-data fetching" />
        <div className="ecosystem-data fetching" />
    </> : pluginEcosystem && pluginEcosystem.map((plugin, i) => {
        return <PluginItem
            key={i}
            plugin={plugin}
            {...props}
        />;
    });
};

const Ecosystem = props => {
    const { library = null, plugins, installPlugin, activatePlugin, updatePlugin } = props;
    const { pluginEcosystem } = library;
    const [fetching, setFetching] = useState(true);

    useEffect(() => {
        const { pluginEcosystem } = library;
        if (pluginEcosystem) {
            setFetching(false);
        }
    }, [library]);

    const pluginsData = {
        fetching,
        plugins: plugins?.installedPlugin,
        pluginEcosystem,
        installPlugin,
        activatePlugin,
        updatePlugin,
    };

    return <DashboardContent>
        <DashboardHeader>
            <h2>{__('Gutenverse Ecosystem', '--gctd--')}</h2>
        </DashboardHeader>
        <DashboardBody>
            <div className="ecosystem-wrapper">
                <PluginsData {...pluginsData} />
            </div>
        </DashboardBody>
    </DashboardContent>;
};

export default compose(
    withSelect(select => {
        const {
            getLibraryData,
            getPluginData,
        } = select('gutenverse/library');

        return {
            library: getLibraryData(),
            plugins: getPluginData()
        };
    }),
    withDispatch((dispatch) => {
        const {
            installPlugin,
            activatePlugin,
            updatePlugin
        } = dispatch('gutenverse/library');

        return {
            installPlugin,
            activatePlugin,
            updatePlugin
        };
    }),
)(Ecosystem);