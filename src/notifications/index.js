import { createPortal, render, useEffect, useState } from '@wordpress/element';
import { addFilter, applyFilters } from '@wordpress/hooks';
import { __ } from '@wordpress/i18n';
import { IconNoticeWarningSVG } from 'gutenverse-core/icons';
import isEmpty from 'lodash/isEmpty';
import { CheckSquare } from 'gutenverse-core/components';

// @since v3.2.0
const NotificationList = () => {
    const localStorageKey = 'gutenverse_read_notifications';
    let content = [];
    const [notifTotal, setNotifTotal] = useState(0);
    const [readNotifications, setReadNotifications] = useState(JSON.parse(localStorage.getItem(localStorageKey)) || []);

    const notificationList = applyFilters(
        'gutenverse.notification.list',
        [],
        null
    );

    useEffect(() => {
        localStorage.setItem(localStorageKey, JSON.stringify(readNotifications));
    }, [readNotifications]);

    useEffect(() => {
        let total = notifTotal;
        notificationList.map(({ id, show }) => {
            if (show && !readNotifications.includes(id)) total++;
        });
        setNotifTotal(total);
    }, []);

    if (!isEmpty(notificationList)) {
        content = notificationList
            .filter(notification => notification.show)
            .map(notification => {
                const { id, content } = notification;

                const isNew = !readNotifications.includes(id);

                const markAsRead = () => {
                    if (isNew) {
                        setReadNotifications([
                            ...readNotifications,
                            id
                        ]);
                        setNotifTotal(notifTotal - 1);
                    }
                };

                return <div key={id} className="gutenverse-notification-wrapper" onMouseEnter={markAsRead}>
                    {isNew && <span className="notification-new"></span>}
                    {content}
                </div>;
            });
    }

    const parentElement = document.getElementById('wp-admin-bar-gutenverse-adminbar-notification');
    const targetElement = parentElement ? parentElement.querySelector('.notifications-icon') : null;

    const markAllRead = () => {
        const ids = [];
        notificationList.map(({ id, show }) => {
            if (show && !readNotifications.includes(id)) ids.push(id);
        });
        setReadNotifications([
            ...readNotifications,
            ...ids
        ]);
        setNotifTotal(0);
    };

    return <>
        <div className="notification-title">
            <h3>{__('Notification Center', '--gctd--')}</h3>
            <div className="mark-read" onClick={markAllRead}>
                <CheckSquare size={16} />
            </div>
        </div>
        <div className="notification-list">
            {!isEmpty(content) ? content : <p className="notification-empty">{__('There is no Notifications', '--gctd--')}</p>}
        </div>
        {notifTotal > 0 && createPortal(<span className="notification-total">{notifTotal}</span>, targetElement)}
    </>;
};

const loadGutenverseNotifications = () => {
    const notifDiv = document.getElementById('gutenverse-notification-list');

    if (notifDiv) {
        render(
            <NotificationList />,
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
    'gutenverse/notiication/list',
    (list) => {
        const { noticeActions } = window['GutenverseDashboard'];

        const notice = {
            id: 'gutenverse-notice-wp-59',
            show: noticeActions['gutenverse-notice-wp-59']?.notCompatible,
            content: <div className="gutenverse-notification">
                <div className="gutenverse-notification-icon">
                    <IconNoticeWarningSVG />
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
    'gutenverse/notiication/list',
    (list) => {
        const { mismatch, assetURL, noticeActions } = window['GutenverseDashboard'];

        const notice = {
            id: 'gutenverse-notice-mismatch-version',
            show: mismatch,
            content: <div className="gutenverse-notification">
                <div className="gutenverse-notification-icon">
                    <img src={`${assetURL}/icon/icon-notice-gutenverse.svg`} />
                </div>
                <div className="gutenverse-notification-inner">
                    <h3>{__('Gutenverse Upgrade Notice!', '--gctd--')}</h3>
                    <p>{__('We have noticed that the versions of your Gutenverse plugins do not match. We recommend updating Gutenverse to ensure seamless compatibility and functionality of the plugins.', '--gctd--')}</p>
                    <div className="gutenverse-notification-action">
                        <a className="guten-button guten-primary" href={noticeActions?.pluginPage}>{__('Go to plugin page', '--gctd--')}</a>
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
