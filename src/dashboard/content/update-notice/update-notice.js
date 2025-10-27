import { useState, useEffect } from '@wordpress/element';
import { sprintf, __ } from '@wordpress/i18n';
import { Link } from 'gutenverse-core/router';
import { applyFilters } from '@wordpress/hooks';
import { DashboardContent } from '../../components';

const UpdateNotice = ({ location }) => {
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

    let noticeHeader = applyFilters('gutenverse.dashboard.notice.header', (
        <div>
            <h3 className="upgrade-notice-title">
                {sprintf(__('%s', '--gctd--'), name)}
                &nbsp;
                <span>{sprintf(__('Version %s', '--gctd--'), version)}</span>
            </h3>
        </div>
    ), plugin, version);

    let noticeContent = applyFilters('gutenverse.dashboard.notice.content', <></>, plugin, version);

    const increaseLoaded = () => setLoaded(loaded + 3);
    const versionIndex = versions.findIndex((ver) => ver === version);

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
                    {noticeHeader}
                </div>
                <div className="upgrade-notice-body">
                    <div>{noticeContent}</div>
                </div>
            </div>
        </DashboardContent>
    );
};

export default UpdateNotice;
