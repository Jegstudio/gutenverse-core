import { __ } from '@wordpress/i18n';
import { useState } from '@wordpress/element';
import apiFetch from '@wordpress/api-fetch';
import classnames from 'classnames';
import isEmpty from 'lodash/isEmpty';
import semver from 'semver';
import { Loader } from 'react-feather';
import { LogoIconGutenverseSVG } from 'gutenverse-core/icons';
import { getPluginDeps } from '../helper';
import { PluginAction } from '../helper';
import { AlertIcon } from './icons';

const PluginItem = ({ plugin, plugins, ...props }) => {
    const { slug, name, version, icons, description, incoming, icon, url, host } = plugin;
    const [loadingString, setLoadingString] = useState('');
    const [loading, setLoading] = useState(false);
    const [isRetry, setIsRetry] = useState(true);

    const installed = plugins[slug];

    const pluginDepsData = getPluginDeps(installed, plugins);

    const singleClass = classnames('install-action', { loading });

    const loadingCircle = loading && (
        <div className="rotating" style={{ display: 'flex' }}>
            <Loader size={20} />
        </div>
    );

    const installingPlugin = () => {
        setLoading(true);
        setLoadingString(__('Installing Plugin', '--gctd--'));

        apiFetch({
            path: 'wp/v2/plugins',
            method: 'POST',
            data: { slug, status: 'active' },
        }).then(res => {
            const { version, name, plugin } = res;
            props.installPlugin({ slug, name, path: plugin, version });
            setLoading(false);
        }).catch(() => {
            alert('Error during installing plugin');
        }).finally(() => {
            setLoading(false);
            setLoadingString('');
        });
    };

    const updatingPlugin = () => {
        if (!installed) return;
        setLoading(true);
        setLoadingString(__('Disabling Plugin', '--gctd--'));

        apiFetch({
            path: `wp/v2/plugins/plugin?plugin=${installed?.path}`,
            method: 'POST',
            data: { status: 'inactive' },
        }).then(() => {
            setLoadingString(__('Deleting Plugin', '--gctd--'));
            return apiFetch({
                path: `wp/v2/plugins/plugin?plugin=${installed?.path}`,
                method: 'DELETE',
            });
        }).then(() => {
            installingPlugin();
        });
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
                data: { status: 'active' },
            }).then(res => {

                const { plugin } = res;
                const slug = plugin.split('/');
                props.activatePlugin(slug[0]);
                setLoading(false);
                setLoadingString('');
                if (slug[0] === 'gutenverse-pro') {
                    window.location.reload()
                }

            }).catch(() => {
                if (isRetry) {
                    setIsRetry(false);
                    activatingPlugin(false);
                }
            });
        }
    };

    const downloadPlugin = () => {
        if (host === 'server') {
            window.location.href = url;
        } else if (host === 'server-pro') {
            window.open(url, '_blank');
        } else {
            installingPlugin();
        }
    };

    // Determine action button and whether it's an "installed" state
    let action = null;
    let skipFilter = false;

    if (installed) {
        const invalidVersion = (!isEmpty(version) && !semver.gte(installed.version, version || '0.0.0')) && host !== 'server-pro';
        const activateLabel = invalidVersion ? __('Update & Activate Plugin', '--gctd--') : __('Activate Plugin', '--gctd--');

        if (installed.active === false) {
            if (pluginDepsData.canInstall) {
                action = (
                    <div className={`${singleClass} update`} onClick={() => { activatingPlugin(invalidVersion); setIsRetry(true); }}>
                        {loadingCircle}
                        {loading ? loadingString : activateLabel}
                    </div>
                );
            } else {
                skipFilter = true;
                action = (
                    <div className={`${singleClass} installed`}>
                        {loadingCircle}
                        {loading ? loadingString : __('Activate Plugin', '--gctd--')}
                    </div>
                );
            }
        } else {
            skipFilter = true;
            action = (
                <div className={`${singleClass} installed`}>
                    {loadingCircle}
                    {loading ? loadingString : __('Activated', '--gctd--')}
                </div>
            );
        }
    } else if (incoming == 0) {
        action = (
            <div className="install-action" onClick={downloadPlugin}>
                {loadingCircle}
                {loading ? loadingString : __('Download Plugin', '--gctd--')}
            </div>
        );
    } else {
        skipFilter = true;
        action = (
            <div className={`${singleClass} installed`}>
                {loadingCircle}
                {loading ? loadingString : __('Release Soon', '--gctd--')}
            </div>
        );
    }

    const pluginIcon = icon
        ? <div className="icon-wrapper"><img className="icon-plugin" src={icon[0]} /></div>
        : icons
            ? <div className="icon-wrapper"><img className="icon-plugin" src={icons} /></div>
            : <div className="icon-wrapper"><LogoIconGutenverseSVG className="icon-plugin" /></div>;

    const pluginTitle = name.includes('Gutenverse')
        ? <><span>{__('Gutenverse', '--gctd--')}</span>&nbsp;{name.split('Gutenverse').join('')}</>
        : name;

    return (
        <div key={slug} className="plugin-item">
            <div className="plugin-container">
                {incoming === '1' && <div className="ribbon">SOON</div>}
                {pluginIcon}
                <div className="details">
                    <h2 className="plugin-title">{pluginTitle}</h2>
                    {version
                        ? <p className="plugin-version">{__('Version ', '--gctd--')}{version}</p>
                        : <p className="plugin-version">{__('Coming Soon', '--gctd--')}</p>
                    }
                    {description && <p className="plugin-description">{description.substring(0, 80) + '...'}</p>}
                </div>
                <div className="plugin-actions">
                    <PluginAction action={action} plugin={plugin} skipFilter={skipFilter} />
                </div>
            </div>
            {!pluginDepsData.canInstall && pluginDepsData.depsString && (
                <div className="plugin-deps-warning">
                    <AlertIcon />
                    <p>{pluginDepsData.depsString}</p>
                </div>
            )}
        </div>
    );
};

export default PluginItem;
