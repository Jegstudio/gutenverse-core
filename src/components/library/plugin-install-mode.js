import { useState } from '@wordpress/element';
import { __, sprintf } from '@wordpress/i18n';
import classnames from 'classnames';
import isEmpty from 'lodash/isEmpty';
import { withSelect, dispatch } from '@wordpress/data';
import { IconArrowLeftSVG, IconInfoYellowSVG } from 'gutenverse-core-editor/icons';
import { Loader } from 'react-feather';
import apiFetch from '@wordpress/api-fetch';
import semver from 'semver';

const PluginInstallMode = (props) => {
    const { backString, plugins, data, setPluginInstallMode } = props;
    const { installedPlugin } = plugins;
    const { requirements, compatibleVersion } = data;
    const [installCounter, setInstallCounter] = useState(0);

    const increaseCounter = () => {
        setInstallCounter(counter => counter + 1);
    };

    const popupClass = classnames('plugin-install-popup', {
        'show-counter': installCounter > 0
    });

    return <div className={popupClass}>
        <div className="plugin-install-wrapper">
            <div className="back-button" onClick={() => setPluginInstallMode(false)}>
                <IconArrowLeftSVG />
                <span>{backString}</span>
            </div>
            {installCounter > 0 && <div className="plugin-requirement-notice">
                <div className="plugin-requirement-icon">
                    <IconInfoYellowSVG />
                </div>
                <div className="plugin-requirement-content">
                    <strong>{__('Attention!', 'gutenverse')}</strong>
                    &nbsp;
                    <span>{__('Please refresh this page after install or update plugin', 'gutenverse')}</span>
                </div>
            </div>}
            <div className="plugin-install-container">
                <div className="plugin-install-inner">
                    <h2>{__('Plugin Requirement', 'gutenverse')}</h2>
                    <p>{__('Please install or update and activate these missing requirements plugin for this section or layout to work correctly. We recommend to backup your site before install/update plugin listed below.', 'gutenverse')}</p>
                </div>
                <PluginInstallItem
                    plugin={{
                        installed: true,
                        name: 'Gutenverse',
                        slug: 'gutenverse',
                        version: compatibleVersion
                    }}
                    plugins={installedPlugin}
                    installPlugin={props.installPlugin}
                    activatePlugin={props.activatePlugin}
                    updatePlugin={props.updatePlugin}
                    increaseCounter={increaseCounter}
                />
                {requirements.map(requirement => {
                    const { slug } = requirement;
                    return <PluginInstallItem
                        key={slug}
                        plugin={requirement}
                        plugins={installedPlugin}
                        installPlugin={props.installPlugin}
                        activatePlugin={props.activatePlugin}
                        updatePlugin={props.updatePlugin}
                        increaseCounter={increaseCounter}
                    />;
                })}
            </div>
        </div>
    </div>;
};

export const PluginInstallItem = (props) => {
    const [loading, setLoading] = useState(false);
    const [isRetry, setIsRetry] = useState(true);
    const [loadingString, setLoadingString] = useState('');
    const { plugin, plugins } = props;
    const { slug, name, version, url } = plugin;
    const installed = plugins[slug];
    let action = null;

    const installPlugin = () => {
        setLoading(true);
        setLoadingString(__('Installing Plugin', 'gutenverse'));

        apiFetch({
            path: 'wp/v2/plugins',
            method: 'POST',
            data: {
                slug,
                status: 'active'
            },
        }).then(res => {
            const { version, name, plugin } = res;
            const slug = plugin.split('/');
            props.installPlugin({
                slug: slug[0],
                name: name,
                path: plugin,
                version: version
            });
            setLoading(false);
        }).then(() => {
            props.increaseCounter();
        }).catch(() => {
            alert('Error during installing plugin');
        }).finally(() => {
            setLoading(false);
            setLoadingString('');
        });
    };

    const updatePlugin = () => {
        setLoading(true);
        setLoadingString(__('Disabling Plugin', 'gutenverse'));

        apiFetch({
            path: `wp/v2/plugins/plugin?plugin=${installed.path}`,
            method: 'POST',
            data: {
                status: 'inactive'
            }
        }).then(() => {
            setLoadingString(__('Deleting Plugin', 'gutenverse'));

            return apiFetch({
                path: `wp/v2/plugins/plugin?plugin=${installed.path}`,
                method: 'DELETE',
            });
        }).then(() => {
            installPlugin();
        });
    };

    const activatePlugin = (update) => {
        if (update) {
            updatePlugin();
        } else {
            setLoading(true);
            setLoadingString(__('Activating Plugin', 'gutenverse'));
            apiFetch({
                path: `wp/v2/plugins/plugin?plugin=${installed.path}`,
                method: 'POST',
                data: {
                    status: 'active'
                }
            }).then(res => {
                const { plugin } = res;
                const slug = plugin.split('/');
                props.activatePlugin(slug[0]);
                props.increaseCounter();
                setLoading(false);
                setLoadingString('');
            }).catch(e => {
                if (isRetry) {
                    setIsRetry(false);
                    activatePlugin(false);
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

    const pluginPage = <a href={url} target={'_blank'} rel="noreferrer">
        {__('Go to Plugin Page', 'gutenverse')} →
    </a>;

    if (undefined === installed) {
        action = !isEmpty(url) ? pluginPage : <div className={singleClass} onClick={() => installPlugin()}>
            {loadingCircle}
            {loading ? loadingString : __('Install Plugin', 'gutenverse')}
        </div>;
    } else {
        const invalidVersion = !isEmpty(version) && !semver.gte(installed.version, plugin.version || '0.0.0');
        const string = invalidVersion ? __('Update & Activate Plugin', 'gutenverse') : __('Activate Plugin', 'gutenverse');
        if (installed.active === false) {
            action = !isEmpty(url) ? pluginPage : <div className={singleClass} onClick={() => {
                activatePlugin(invalidVersion)
                setIsRetry(true);
            }}>
                {loadingCircle}
                {loading ? loadingString : string}
            </div>;
        } else {
            if (invalidVersion) {
                action = !isEmpty(url) ? pluginPage : <div className={singleClass} onClick={() => updatePlugin()}>
                    {loadingCircle}
                    {loading ? loadingString : __('Update Plugin', 'gutenverse')}
                </div>;
            }
        }
    }

    return <div className="plugin-install-item">
        <PluginItemTitle name={name}
            version={version}
            flag={action === null}
            installedVersion={installed?.version}
        />
        <div className="plugin-install-action">
            {action === null ? <div className="install-action done">
                {__('Installed & Activated', 'gutenverse')}
            </div> : action}
        </div>
    </div>;
};

const PluginItemTitle = ({ version, name, installedVersion, flag }) => {
    return <div className="plugin-install-detail">
        <h2>{name}</h2>
        {
            flag ?
                <span>{sprintf(__('Installed version %s', 'gutenverse'), installedVersion)}</span> :
                !isEmpty(version) && <span>{sprintf(__('Required version %s or later', 'gutenverse'), version)}</span>
        }
    </div>;
};

export default withSelect(select => {
    const { getPluginData } = select('gutenverse/library');

    const installPlugin = (action) => {
        const { slug, name, path, version } = action;
        dispatch( 'gutenverse/library' ).installPlugin({
            slug,
            name,
            path,
            version
        })
    }

    const activatePlugin = (slug) => {
        dispatch( 'gutenverse/library' ).activatePlugin(slug)
    }

    const updatePlugin = (action) => {
        const { slug, version } = action;
        dispatch( 'gutenverse/library' ).updatePlugin({
            slug,
            version
        })
    }

    return {
        plugins: getPluginData(),
        installPlugin,
        activatePlugin,
        updatePlugin,
    };
})(PluginInstallMode);

