import { select, subscribe, dispatch } from '@wordpress/data';
import { render } from '@wordpress/element';
import { useState, useEffect } from '@wordpress/element';
import apiFetch from '@wordpress/api-fetch';
import { __ } from '@wordpress/i18n';
import debounce from 'lodash/debounce';
import { fetchLibraryData } from 'gutenverse-core/requests';
import classnames from 'classnames';
import isEmpty from 'lodash/isEmpty';
import semver from 'semver';
import { Loader } from 'react-feather';
import { LogoIconGutenverseSVG } from 'gutenverse-core/icons';

export const editorWarn = () => {
    const checkMissingBlock = debounce(() => {
        if (window?.GutenverseConfig?.missingBlocksWarn) {
            const missingBlock = checkForMissingBlocks(['gutenverse']);
            if (missingBlock && missingBlock.length > 0) {
                const root = document.getElementById('gutenverse-root');

                const warnRoot = document.createElement('div');
                warnRoot.id = 'gutenverse-warn';

                root.parentNode.insertBefore(warnRoot, root.nextSibling);
                render(<WarnModal missingBlock={missingBlock} />, warnRoot);
            }
        }
    }, 1000);

    let content = false;

    subscribe(() => {
        const temporaryContent = select('core/editor').getEditedPostContent();
        if (select('core').getEntityRecords('postType', 'wp_block') !== null && content !== temporaryContent) {
            content = temporaryContent;
            checkMissingBlock();
        }
    });
};

const checkForMissingBlocks = (unsupportedBlockNames, blocks = false) => {
    if (!blocks) {
        blocks = select('core/block-editor').getBlocks();
    }

    let unsupportedBlocks = [];

    blocks.forEach(block => {
        if (block.name === 'core/missing' && block.attributes && block.attributes.originalName) {
            const originalName = block.attributes.originalName;

            if (unsupportedBlockNames.some(partialName => originalName.startsWith(partialName)) && !unsupportedBlocks.includes(originalName)) {
                console.log(`Unsupported block found in content: ${originalName}`);
                unsupportedBlocks.push(originalName);
            }
        }

        if (block.innerBlocks && block.innerBlocks.length > 0) {
            const innerUnsupportedBlocks = checkForMissingBlocks(unsupportedBlockNames, block.innerBlocks);
            unsupportedBlocks = [...unsupportedBlocks, ...innerUnsupportedBlocks];
        }
    });

    return unsupportedBlocks;
};

const WarnModal = (props) => {
    const { missingBlock } = props;
    const [open, setOpen] = useState(true);
    const [doNotShowAgain, setDoNotShowAgain] = useState(false);
    const [pluginsEco, setPluginsEco] = useState(false);
    const [missingPlugin, setMissingPlugins] = useState(false);
    const [plugins, setPlugins] = useState(window['GutenverseConfig']?.plugins);
    const [refresh, setRefresh] = useState(false);

    const doNotShow = () => {
        setDoNotShowAgain(!doNotShowAgain);
    };

    const activatePlugin = (pluginKey) => {
        setRefresh(true);
        setPlugins((prevPlugins) => {
            if (prevPlugins[pluginKey]) {
                return {
                    ...prevPlugins,
                    [pluginKey]: {
                        ...prevPlugins[pluginKey],
                        active: true,
                    },
                };
            }
            return prevPlugins;
        });
    };

    const installPlugin = ({ slug, name, path, version }) => {
        setRefresh(true);
        setPlugins((prevPlugins) => {
            return {
                ...prevPlugins,
                [slug]: {
                    active: true,
                    name: name,
                    path: path,
                    version: version,
                },
            };
        });
    };

    const closeWarn = () => {
        setOpen(false);
        if (doNotShowAgain) {
            apiFetch({
                path: 'gutenverse-client/v1/settings/modify',
                method: 'POST',
                data: {
                    setting: {
                        editor_settings: {
                            missing_block_warn: false,
                        }
                    }
                }
            });
        }
        if (refresh) {
            window.location.reload();
        }
    };

    useEffect(() => {
        const dev = 'true' == '--dev_mode--';
        if (!pluginsEco) {
            const fetchData = async (dev) => {
                const result = await fetchLibraryData(dev);
                setPluginsEco(result?.['plugin-ecosystem']);
            };

            if (dev) {
                fetchData(true);
            } else {
                fetchData(false);
            }
        } else {
            const slugsToKeep = new Set();
            const defaultSlug = 'gutenverse';

            missingBlock.forEach(type => {
                const parts = type.split('/');
                const prefix = parts[0];
                const suffix = parts[1].split('-')[0];
                const slug = `${prefix}-${suffix}`;
                slugsToKeep.add(slug);
            });

            let filteredPlugins = pluginsEco.filter(plugin => slugsToKeep.has(plugin.slug));

            const matchedSlugs = new Set(filteredPlugins.map(plugin => plugin.slug));
            const unmatched = [...slugsToKeep].some(slug => !matchedSlugs.has(slug));

            if (unmatched) {
                const defaultEntry = pluginsEco.find(plugin => plugin.slug === defaultSlug);
                if (defaultEntry) {
                    filteredPlugins.push(defaultEntry);
                }
            }

            const pluginsData = {
                plugins: plugins,
                pluginEcosystem: filteredPlugins,
                installPlugin,
                activatePlugin,
            };

            setMissingPlugins(pluginsData);
        }
    }, [open, pluginsEco, plugins]);

    return open && missingPlugin && missingPlugin.pluginEcosystem.length ? (
        <div className="gutenverse-editor-warn">
            <div className="gutenverse-warn-wrapper">
                <div className="gutenverse-warn-header">
                    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="none"><path fill="#FFC908" d="M7.5 0a7.501 7.501 0 0 0 0 15 7.5 7.5 0 1 0 0-15m0 3.327a1.27 1.27 0 1 1 0 2.54 1.27 1.27 0 0 1 0-2.54m1.694 7.681c0 .2-.163.363-.363.363H6.169a.363.363 0 0 1-.363-.363v-.726c0-.2.163-.363.363-.363h.363V7.984H6.17a.363.363 0 0 1-.363-.363v-.726c0-.2.163-.363.363-.363h1.936c.2 0 .363.163.363.363V9.92h.363c.2 0 .363.163.363.363z"></path></svg>
                    <span>{__('Missing Gutenverse Block', '--gctd--')}</span>
                </div>
                <div className="gutenverse-warn-description">
                    {__('Some blocks are missing. They might be disabled or require the corresponding Gutenverse plugins to be installed and activated to restore the blocks:', '--gctd--')}
                </div>
                {/* <ul className="gutenverse-warn-list">
                    {missingBlock.map((block, index) => (
                        <li key={index} style={{ marginBottom: '5px' }}>{block}</li>
                    ))}
                </ul> */}
                <div className="gutenverse-warn-plugin-list">
                    <PluginsData {...missingPlugin} />
                </div>
                <div className="gutenverse-warn-footer">
                    <div className="warn-checkbox" onClick={doNotShow}>
                        {doNotShowAgain ? <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect x="0.5" y="0.5" width="15" height="15" rx="1.5" stroke="#3B57F7" />
                            <path d="M12 5L6.5 10.5L4 8" stroke="#3B57F7" strokeWidth="1.6666" strokeLinecap="round" strokeLinejoin="round" />
                        </svg> : <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect x="0.5" y="0.5" width="15" height="15" rx="1.5" fill="white" />
                            <rect x="0.5" y="0.5" width="15" height="15" rx="1.5" stroke="#BDBEBF" />
                        </svg>
                        }
                        {__('Do not show this again', '--gctd--')}
                    </div>
                    <button
                        onClick={closeWarn}
                    >
                        {__('OK', '--gctd--')}
                    </button>
                </div>
            </div>
        </div>
    ) : null;
};

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
        }).then(() => { }).catch(() => {
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

    if (installed) {
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
                {loading ? loadingString : __('Done', '--gctd--')}
            </div>;
        }
    } else if (!installed && incoming == 0) {
        action = <div className={singleClass} onClick={() => host === 'server' ? downloadZip(url) : installingPlugin()}>
            {loadingCircle}
            {loading ? loadingString : __('Download Plugin', '--gctd--')}
        </div>;
    } else {
        action = <div className={`${singleClass} installed`}>
            {loadingCircle}
            {loading ? loadingString : __('Release Soon', '--gctd--')}
        </div>;
    }
    return <div key={slug} className="plugin-item">
        {
            incoming === '1' && <div className="ribbon">SOON</div>
        }
        {
            icon ? <div className="icon-wrapper">
                <img className="icon-plugin" src={icon[0]} /> </div>
                : icons ?
                    <div className="icon-wrapper">
                        <img className="icon-plugin" src={icons}></img></div>
                    :
                    <div className="icon-wrapper">
                        <LogoIconGutenverseSVG className="icon-plugin" /></div>

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
            {/* {description && <p className="plugin-description">
                {description.substring(0, 80) + '...'}
            </p>} */}
        </div>
        <div className="plugin-actions">
            {action}
        </div>
    </div>;
};

const PluginsData = ({
    pluginEcosystem,
    ...props
}) => {
    return pluginEcosystem && pluginEcosystem.map((plugin, i) => {
        return <PluginItem
            key={i}
            plugin={plugin}
            {...props}
        />;
    });
};