import { createPortal, render, useEffect, useState, useMemo } from '@wordpress/element';
import { addFilter, applyFilters } from '@wordpress/hooks';
import { __ } from '@wordpress/i18n';
import isEmpty from 'lodash/isEmpty';
import { Gutenverse20Compatibility } from './notices/gutenverse-2-0-compatibility';
import { versionCompare, useNotificationsState } from '../helper';
import { CheckSquare } from 'react-feather';

const getRequiredPluginVersion = (history, currentFrameworkVersion) => {
    let requiredVersion = null;

    if (!history || !history.length) return null;

    for (const entry of history) {
        if (versionCompare(entry.framework_version, currentFrameworkVersion, '<=')) {
            requiredVersion = entry.plugin_version;
        } else {
            break;
        }
    }
    return requiredVersion;
};

const getPluginFrameworkVersion = (history, pluginVersion) => {
    if (!history || !history.length) return null;

    for (const entry of history) {
        if (entry.plugin_version === pluginVersion) {
            return entry.framework_version;
        }
    }
    return null;
};

const useVersionCompatibilityData = (readNotifications, markAsRead) => {
    const { adminUrl, pluginVersions } = window['GutenverseDashboard'];
    const { pluginCheck } = window['GutenversePluginList'];
    const { version } = window['gutenverseLoadedFramework'];

    const data = useMemo(() => {
        if (!version || !pluginCheck) {
            return { content: null, count: 0, newIds: [] };
        }

        let count = 0;
        let newIds = [];

        const content = Object.keys(pluginVersions)?.map((installedSlug) => {

            const compatibilitySlug = installedSlug;
            const history = pluginCheck[compatibilitySlug];

            if (!pluginVersions[installedSlug]) {
                return null;
            }

            const v1 = pluginVersions[installedSlug]['version'];

            let needsUpdate = false;
            let v_core_history = getPluginFrameworkVersion(history, v1) || 'N/A';
            let v2 = null;
            let message = '';

            if (history) {
                v2 = getRequiredPluginVersion(history, version);

                if (v2) {
                    needsUpdate = versionCompare(v1, v2, '<');
                } else {
                    needsUpdate = true;
                    v2 = 'Unknown';
                }

                message = needsUpdate
                    ? __('Hi! Currently you are using an older version of this plugin. Please update to the compatible version: ' + v2 + '.', '--gctd--')
                    : __('Your plugin version is compatible with the current Gutenverse Core.', '--gctd--');

            } else {
                needsUpdate = true;
                v2 = 'Required';
                message = __('Plugin compatibility data is missing. Please update the plugin to the latest version to ensure compatibility.', '--gctd--');
            }

            let button = null;
            let notificationId = null;
            let isNew = false;
            let mouseEnterAction = undefined;

            if (needsUpdate) {
                notificationId = `gutenverse-version-check-${installedSlug}-${v2}`;
                isNew = !readNotifications.includes(notificationId);

                if (isNew) {
                    count++;
                    newIds.push(notificationId);
                }

                mouseEnterAction = () => markAsRead(notificationId);

                button = <a
                    href={adminUrl + '/plugins.php'}
                    rel="noreferrer"
                    className="guten-version-button guten-primary"
                >
                    {__('Need Update', '--gctd--')}
                </a>;
            } else {
                button = <div className="guten-version-button guten-disable">
                    {__('Updated', '--gctd--')}
                </div>;
            }

            return <div
                key={installedSlug}
                className="gutenverse-version-wrapper"
                onMouseEnter={mouseEnterAction}
            >
                {isNew && <span className="notification-new"></span>}
                <div className="gutenverse-version-notice">
                    <h3>{`${pluginVersions[installedSlug]['name']} v${v1}`}</h3>
                    <h5>{__(`Gutenverse Core v${v_core_history}`, '--gctd--')}</h5>
                    <p>{message}</p>
                    <div className="gutenverse-version-action">
                        {button}
                    </div>
                </div>
            </div>;
        }).filter(item => item !== null);

        return { content, count, newIds };

    }, [version, pluginCheck, pluginVersions, adminUrl, readNotifications, markAsRead]);

    return data;
};

const NotificationList = ({ readNotifications, markAsRead, onUpdateTotal }) => {
    let content = [];
    const notificationList = applyFilters(
        'gutenverse.notification.list',
        [],
        null
    );

    const { total, newIds } = useMemo(() => {
        let currentTotal = 0;
        let ids = [];
        notificationList.map(({ id, show }) => {
            if (show) {
                ids.push(id);
                if (!readNotifications.includes(id)) {
                    currentTotal++;
                }
            }
        });
        return { total: currentTotal, newIds: ids };
    }, [notificationList, readNotifications]);

    useEffect(() => {
        if (onUpdateTotal) onUpdateTotal(total, newIds);
    }, [total, newIds, onUpdateTotal, readNotifications]);


    if (!isEmpty(notificationList)) {
        content = notificationList
            .filter(notification => notification.show)
            .map(notification => {
                const { id, content } = notification;
                const isNew = !readNotifications.includes(id);

                return <div key={id} className="gutenverse-notification-wrapper" onMouseEnter={() => markAsRead(id)}>
                    {isNew && <span className="notification-new"></span>}
                    {content}
                </div>;
            });
    }

    return <>
        <div className="notification-list">
            {!isEmpty(content) ? content : <p className="notification-empty">{__('There is no Notifications', '--gctd--')}</p>}
        </div>
    </>;
};

const VersionCompatibility = ({ content }) => {
    return <div className="content-list">
        {!isEmpty(content) ? content : <p className="notification-empty">{__('All plugins are compatible.', '--gctd--')}</p>}
    </div>;
};

const TabContent = () => {
    const [mode, setMode] = useState(null);
    const { readNotifications, markAsRead, markAllRead } = useNotificationsState();

    const [normalNotifTotal, setNormalNotifTotal] = useState(0);
    const [normalNotifIds, setNormalNotifIds] = useState([]);

    const { content: versionContent, count: versionNotifTotal, newIds: versionNotifIds } = useVersionCompatibilityData(readNotifications, markAsRead);

    const totalNotifs = normalNotifTotal + versionNotifTotal;

    const parentElement = document.getElementById('wp-admin-bar-gutenverse-adminbar-notification');
    const targetElement = parentElement ? parentElement.querySelector('.notifications-icon') : null;

    const handleNormalTotalUpdate = (total, ids) => {
        setNormalNotifTotal(total);
        setNormalNotifIds(ids);
    };

    const handleMarkAllRead = () => {
        markAllRead([...normalNotifIds, ...versionNotifIds]);
    };

    let content = '';

    switch (mode) {
        case 'version-check':
            content = <VersionCompatibility content={versionContent} updateCount={versionNotifTotal} />;
            break;
        default:
            content = <NotificationList
                readNotifications={readNotifications}
                markAsRead={markAsRead}
                onUpdateTotal={handleNormalTotalUpdate}
            />;
            break;
    }

    const NotifBadge = ({ total }) => (
        total > 0 ? <span className="notification-total-tab">{total}</span> : null
    );

    return <>
        <div className="tab-header">
            <div className={`header-item ${!mode ? 'active' : ''}`} onClick={() => setMode(null)}>
                <h3>{__('Notification Center', '--gctd--')}</h3>
                <NotifBadge total={normalNotifTotal} />
            </div>
            <div className={`header-item ${mode === 'version-check' ? 'active' : ''}`} onClick={() => setMode('version-check')}>
                <h3>{__('Version Compatibility', '--gctd--')}</h3>
                <NotifBadge total={versionNotifTotal} />
            </div>
            <div className="mark-read" onClick={() => handleMarkAllRead()}>
                <CheckSquare size={16} />
            </div>
        </div>
        <div className="tab-content">
            {content}
        </div>
        {totalNotifs > 0 && targetElement && createPortal(<span className="notification-total">{totalNotifs}</span>, targetElement)}
    </>;
};

const GutenversePluginUpdateNotice = ({ data }) => {
    const { action_url, notice_header, notice_description, notice_action, notice_action_2, plugin_name } = data;
    return <>
        <div className="gutenverse-plugin-update-notice">
            <h3>{notice_header}</h3>
            <p>{notice_description}</p>
            <p>{notice_action} <strong>{`Please update ${plugin_name}`}</strong> {notice_action_2}</p>
            <div className="gutenverse-upgrade-action">
                <a className="button-primary upgrade-themes" href={action_url}>{`Update ${plugin_name} Plugin`}</a>
            </div>
        </div>
    </>;
};

const loadGutenverseNotifications = () => {
    const notifDiv = document.getElementById('gutenverse-notification-list');

    if (notifDiv) {
        render(
            <TabContent />,
            notifDiv
        );
    }
};

if (document.readyState === 'complete' || document.readyState === 'interactive') {
    loadGutenverseNotifications();
} else {
    window.addEventListener('load', () => {
        loadGutenverseNotifications();
    });
}

addFilter(
    'gutenverse.notification.list',
    'gutenverse/notification/list',
    (list) => {
        const { noticeActions } = window['GutenverseDashboard'];

        const notice = {
            id: 'gutenverse-core-notice-wp-59',
            show: noticeActions['gutenverse-core-notice-wp-59']?.show,
            content: <div className="gutenverse-notification">
                <div className="gutenverse-notification-icon">
                    <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect x="1" y="1" width="24" height="24" rx="12" fill="#FEF0C7" />
                        <rect x="1" y="1" width="24" height="24" rx="12" stroke="#FFB200" />
                        <path d="M13.398 8.07918C13.2423 7.7835 12.7581 7.7835 12.6024 8.07918L8.55262 15.7651C8.51616 15.834 8.49809 15.9112 8.50016 15.9892C8.50223 16.0672 8.52437 16.1433 8.56443 16.2102C8.60449 16.277 8.6611 16.3323 8.72874 16.3706C8.79638 16.4089 8.87275 16.429 8.9504 16.4288H17.05C17.1276 16.429 17.2039 16.409 17.2715 16.3707C17.3391 16.3324 17.3957 16.2771 17.4357 16.2103C17.4757 16.1435 17.4978 16.0674 17.4998 15.9895C17.5019 15.9116 17.4838 15.8344 17.4473 15.7656L13.398 8.07918ZM13.4502 15.0725H12.5502V14.1683H13.4502V15.0725ZM12.5502 13.264V11.0035H13.4502L13.4506 13.264H12.5502Z" fill="#FFB200" />
                    </svg>
                </div>
                <div className="gutenverse-notification-inner">
                    <h3>{__('WordPress 5.9 required for Gutenverse.', '--gctd--')}</h3>
                    <p>{__('You are currently using lower version of WordPress, we recommend to update to WordPress 5.9 or higher. Or if you want to keep using lower version of WordPress, please install the latest version of Gutenberg', '--gctd--')}</p>
                </div>
            </div>
        };

        return [
            ...list,
            notice
        ];
    }
);

addFilter(
    'gutenverse.notification.list',
    'gutenverse/notification/list',
    (list) => {
        const { assetURL, noticeActions } = window['GutenverseDashboard'];

        const notice = {
            id: 'gutenverse-core-notice-mismatch-version',
            show: noticeActions['gutenverse-core-notice-mismatch-version']?.show,
            content: <div className="gutenverse-notification">
                <div className="gutenverse-notification-icon">
                    <img src={`${assetURL}/icon/icon-notice-gutenverse.svg`} />
                </div>
                <div className="gutenverse-notification-inner">
                    <h3>{__('Gutenverse Upgrade Notice!', '--gctd--')}</h3>
                    <p>{__('We have noticed that the versions of your Gutenverse plugins do not match. We recommend updating Gutenverse to ensure seamless compatibility and functionality of the plugins.', '--gctd--')}</p>
                    <div className="gutenverse-notification-action">
                        <a className="guten-button guten-primary" href={noticeActions['gutenverse-core-notice-mismatch-version']?.actionUrl}>{__('Go to plugin page', '--gctd--')}</a>
                    </div>
                </div>
            </div>
        };

        return [
            ...list,
            notice
        ];
    }
);

addFilter(
    'gutenverse.notification.list',
    'gutenverse/notification/list',
    (list) => {
        const { assetURL, noticeActions } = window['GutenverseDashboard'];
        const notice = {
            id: 'gutenverse-core-compatibility-notice-2-0',
            show: noticeActions['gutenverse-core-compatibility-notice-2-0']?.show,
            content: <div className="gutenverse-notification">
                <div className="gutenverse-notification-icon">
                    <img src={`${assetURL}/icon/icon-notice-gutenverse.svg`} />
                </div>
                <div className="gutenverse-notification-inner">
                    <Gutenverse20Compatibility data={noticeActions['gutenverse-core-compatibility-notice-2-0']} />
                </div>
            </div>
        };

        return [
            ...list,
            notice
        ];
    }
);

addFilter(
    'gutenverse.notification.list',
    'gutenverse/notification/list',
    (list) => {
        const { noticeActions } = window['GutenverseDashboard'];

        const notice = {
            id: 'gutenverse-update-gutenverse-notice',
            show: noticeActions['gutenverse-update-gutenverse-notice']?.show,
            content: <div className="gutenverse-notification">
                <div className="gutenverse-notification-icon">
                    <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect x="1" y="1" width="24" height="24" rx="12" fill="#FEF0C7" />
                        <rect x="1" y="1" width="24" height="24" rx="12" stroke="#FFB200" />
                        <path d="M13.398 8.07918C13.2423 7.7835 12.7581 7.7835 12.6024 8.07918L8.55262 15.7651C8.51616 15.834 8.49809 15.9112 8.50016 15.9892C8.50223 16.0672 8.52437 16.1433 8.56443 16.2102C8.60449 16.277 8.6611 16.3323 8.72874 16.3706C8.79638 16.4089 8.87275 16.429 8.9504 16.4288H17.05C17.1276 16.429 17.2039 16.409 17.2715 16.3707C17.3391 16.3324 17.3957 16.2771 17.4357 16.2103C17.4757 16.1435 17.4978 16.0674 17.4998 15.9895C17.5019 15.9116 17.4838 15.8344 17.4473 15.7656L13.398 8.07918ZM13.4502 15.0725H12.5502V14.1683H13.4502V15.0725ZM12.5502 13.264V11.0035H13.4502L13.4506 13.264H12.5502Z" fill="#FFB200" />
                    </svg>
                </div>
                <div className="gutenverse-notification-inner">
                    <GutenversePluginUpdateNotice data={noticeActions['gutenverse-update-gutenverse-notice']} />
                </div>
            </div>
        };

        return [
            ...list,
            notice
        ];
    }
);

addFilter(
    'gutenverse.notification.list',
    'gutenverse/notification/list',
    (list) => {
        const { noticeActions } = window['GutenverseDashboard'];

        const notice = {
            id: 'gutenverse-update-gutenverse-form-notice',
            show: noticeActions['gutenverse-update-gutenverse-form-notice']?.show,
            content: <div className="gutenverse-notification">
                <div className="gutenverse-notification-icon">
                    <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect x="1" y="1" width="24" height="24" rx="12" fill="#FEF0C7" />
                        <rect x="1" y="1" width="24" height="24" rx="12" stroke="#FFB200" />
                        <path d="M13.398 8.07918C13.2423 7.7835 12.7581 7.7835 12.6024 8.07918L8.55262 15.7651C8.51616 15.834 8.49809 15.9112 8.50016 15.9892C8.50223 16.0672 8.52437 16.1433 8.56443 16.2102C8.60449 16.277 8.6611 16.3323 8.72874 16.3706C8.79638 16.4089 8.87275 16.429 8.9504 16.4288H17.05C17.1276 16.429 17.2039 16.409 17.2715 16.3707C17.3391 16.3324 17.3957 16.2771 17.4357 16.2103C17.4757 16.1435 17.4978 16.0674 17.4998 15.9895C17.5019 15.9116 17.4838 15.8344 17.4473 15.7656L13.398 8.07918ZM13.4502 15.0725H12.5502V14.1683H13.4502V15.0725ZM12.5502 13.264V11.0035H13.4502L13.4506 13.264H12.5502Z" fill="#FFB200" />
                    </svg>
                </div>
                <div className="gutenverse-notification-inner">
                    <GutenversePluginUpdateNotice data={noticeActions['gutenverse-update-gutenverse-form-notice']} />
                </div>
            </div>
        };

        return [
            ...list,
            notice
        ];
    }
);

addFilter(
    'gutenverse.notification.list',
    'gutenverse/notification/list',
    (list) => {
        const { noticeActions } = window['GutenverseDashboard'];
        const notice = {
            id: 'gutenverse-update-gutenverse-news-notice',
            show: noticeActions['gutenverse-update-gutenverse-news-notice']?.show,
            content: <div className="gutenverse-notification">
                <div className="gutenverse-notification-icon">
                    <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect x="1" y="1" width="24" height="24" rx="12" fill="#FEF0C7" />
                        <rect x="1" y="1" width="24" height="24" rx="12" stroke="#FFB200" />
                        <path d="M13.398 8.07918C13.2423 7.7835 12.7581 7.7835 12.6024 8.07918L8.55262 15.7651C8.51616 15.834 8.49809 15.9112 8.50016 15.9892C8.50223 16.0672 8.52437 16.1433 8.56443 16.2102C8.60449 16.277 8.6611 16.3323 8.72874 16.3706C8.79638 16.4089 8.87275 16.429 8.9504 16.4288H17.05C17.1276 16.429 17.2039 16.409 17.2715 16.3707C17.3391 16.3324 17.3957 16.2771 17.4357 16.2103C17.4757 16.1435 17.4978 16.0674 17.4998 15.9895C17.5019 15.9116 17.4838 15.8344 17.4473 15.7656L13.398 8.07918ZM13.4502 15.0725H12.5502V14.1683H13.4502V15.0725ZM12.5502 13.264V11.0035H13.4502L13.4506 13.264H12.5502Z" fill="#FFB200" />
                    </svg>
                </div>
                <div className="gutenverse-notification-inner">
                    <GutenversePluginUpdateNotice data={noticeActions['gutenverse-update-gutenverse-news-notice']} />
                </div>
            </div>
        };

        return [
            ...list,
            notice
        ];
    }
);

addFilter(
    'gutenverse.notification.list',
    'gutenverse/notification/list',
    (list) => {
        const { noticeActions } = window['GutenverseDashboard'];
        const notice = {
            id: 'gutenverse-update-gutenverse-pro-notice',
            show: noticeActions['gutenverse-update-gutenverse-pro-notice']?.show,
            content: <div className="gutenverse-notification">
                <div className="gutenverse-notification-icon">
                    <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect x="1" y="1" width="24" height="24" rx="12" fill="#FEF0C7" />
                        <rect x="1" y="1" width="24" height="24" rx="12" stroke="#FFB200" />
                        <path d="M13.398 8.07918C13.2423 7.7835 12.7581 7.7835 12.6024 8.07918L8.55262 15.7651C8.51616 15.834 8.49809 15.9112 8.50016 15.9892C8.50223 16.0672 8.52437 16.1433 8.56443 16.2102C8.60449 16.277 8.6611 16.3323 8.72874 16.3706C8.79638 16.4089 8.87275 16.429 8.9504 16.4288H17.05C17.1276 16.429 17.2039 16.409 17.2715 16.3707C17.3391 16.3324 17.3957 16.2771 17.4357 16.2103C17.4757 16.1435 17.4978 16.0674 17.4998 15.9895C17.5019 15.9116 17.4838 15.8344 17.4473 15.7656L13.398 8.07918ZM13.4502 15.0725H12.5502V14.1683H13.4502V15.0725ZM12.5502 13.264V11.0035H13.4502L13.4506 13.264H12.5502Z" fill="#FFB200" />
                    </svg>
                </div>
                <div className="gutenverse-notification-inner">
                    <GutenversePluginUpdateNotice data={noticeActions['gutenverse-update-gutenverse-pro-notice']} />
                </div>
            </div>
        };

        return [
            ...list,
            notice
        ];
    }
);