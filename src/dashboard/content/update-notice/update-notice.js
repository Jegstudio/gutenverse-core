import { useState, useEffect } from '@wordpress/element';
import { sprintf, __ } from '@wordpress/i18n';
import { Link } from 'gutenverse-core/router';
import { applyFilters } from '@wordpress/hooks';
import { DashboardContent } from '../../components';

const UpdateNotice = ({location}) => {
    const { pluginVersions } = window['GutenverseDashboard'];
    const { pathname, search } = location;
    const query = new URLSearchParams(search);
    const page = query.get('page');
    const path = query.get('path');
    const [data, setData] = useState({
        name: '',
        versions: [],
    });

    const { name, versions } = data;

    const plugin = query.get('plugin') || (Object.keys(pluginVersions).length && Object.keys(pluginVersions)[0]);
    const version = query.get('version') || (plugin && plugin in pluginVersions && pluginVersions[plugin].currentNotice);

    useEffect(() => {
        if (plugin) {
            const name = (plugin && plugin in pluginVersions && pluginVersions[plugin].name) || '';
            const versions = (plugin && plugin in pluginVersions && pluginVersions[plugin].noticeVersions) || [];

            setData({
                name,
                versions,
            });
        }
    }, [plugin]);

    const [loaded, setLoaded] = useState(3);

    let routePage = applyFilters('gutenverse.dashboard.notice.content', <></>, plugin, version);

    const increaseLoaded = () => setLoaded(loaded + 3);
    const versionIndex = versions.findIndex((ver) => ver === version);
    const prevVersion = versionIndex < versions.length - 1 ? versions[versionIndex + 1] : version;
    const nextVersion = versionIndex > 0 ? versions[versionIndex - 1] : version;

    if (versionIndex >= loaded) {
        increaseLoaded();
    }

    return (
        <DashboardContent>
            <div id="gutenverse-upgrade-notice" className={`${name.toLowerCase() + '-' + version.split('.').join('')}`}>
                <div className="tabs">
                    {Object.keys(pluginVersions).length > 1 &&
                        Object.keys(pluginVersions).map((key) => {
                            return (
                                <Link
                                    key={key}
                                    index={version}
                                    to={{
                                        pathname: pathname,
                                        search: `?page=${page}&plugin=${key}&path=${path}`,
                                    }}
                                >
                                    <div className={`tab ${plugin === key ? 'active' : ''}`} key={key}>
                                        {pluginVersions[key]?.name}
                                    </div>
                                </Link>
                            );
                        })}
                </div>
                <div className="upgrade-notice-head">
                    <div>
                        <h3 className="upgrade-notice-title">
                            {sprintf(__('%s', '--gctd--'), name)}
                            &nbsp;
                            <span>{sprintf(__('Version %s', '--gctd--'), version)}</span>
                        </h3>
                    </div>
                </div>
                <div className="upgrade-notice-body">
                    <div>{routePage}</div>
                </div>
                <div className="upgrade-notice-footer">
                    <div>
                        <div className="upgrade-history">
                            <h2>{__('Version History', '--gctd--')}</h2>
                            <ul className={loaded >= versions.length ? 'loaded' : ''}>
                                {versions.slice(0, loaded).map((version) => (
                                    <li key={version}>
                                        <Link
                                            index={version}
                                            to={{
                                                pathname: pathname,
                                                search: `?page=${page}&plugin=${plugin}&path=${path}&version=${version}`,
                                            }}
                                        >
                                            {__('Version %s', '--gctd--').replace('%s', version)}
                                        </Link>
                                    </li>
                                ))}
                                {loaded < versions.length && (
                                    <li className="load">
                                        <a onClick={() => increaseLoaded()}>
                                            <sup>. . .</sup>
                                        </a>
                                    </li>
                                )}
                            </ul>
                            <div className="buttons">
                                <Link
                                    to={{
                                        pathname: pathname,
                                        search: `?page=${page}&plugin=${plugin}&path=${path}&version=${prevVersion}`,
                                    }}
                                >
                                    <button className={`prev ${versions[versions.length - 1] === version ? 'disable' : ''}`}>{__('Prev', '--gctd--')}</button>
                                </Link>
                                <Link
                                    to={{
                                        pathname: pathname,
                                        search: `?page=${page}&plugin=${plugin}&path=${path}&version=${nextVersion}`,
                                    }}
                                >
                                    <button className={`next ${versions[0] === version ? 'disable' : ''}`}>{__('Next', '--gctd--')}</button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </DashboardContent>
    );
};

export default UpdateNotice;
