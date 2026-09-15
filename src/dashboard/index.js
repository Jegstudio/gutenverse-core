import Navigation from './route/navigation';
import Content from './route/content';
import { render } from '@wordpress/element';
import { Routing } from 'gutenverse-core/router';
import { ProUpdateNotice } from './content/update-notice/pro-update-notice';
export { blocklistStore, dashboardStore, libraryStore } from 'gutenverse-core/store';

const loadGutenverseDashboard = () => {
    const dashboardDiv = document.getElementById('gutenverse-dashboard');
    const {
        eventBanner,
    } = window['GutenverseConfig'] || window['GutenverseDashboard'] || {};
    const eventData = eventBanner;
    const today = new Date();
    const expired = new Date(eventData?.expired);
    const showEventBanner = eventData?.banner && eventData?.url && !Number.isNaN(expired.getTime()) && today <= expired;
    const EventBanner = () => {
        return showEventBanner && <div className="event-banner-wrapper">
            <a href={eventData?.url} target="_blank" rel="noreferrer" aria-label="Gutenverse event banner">
                <img
                    src={eventData?.banner}
                    alt=""
                    onError={(event) => event.currentTarget.closest('.event-banner-wrapper')?.remove()}
                />
            </a>
        </div>;
    };

    if (dashboardDiv) {
        render(
            <Routing>
                {(props) => {
                    return <>
                        <Navigation {...props} />
                        <EventBanner />
                        <ProUpdateNotice />
                        <Content {...props} />
                    </>;
                }}
            </Routing>,
            dashboardDiv
        );
    }
};

if (document.readyState === 'complete' || document.readyState === 'interactive') {
    loadGutenverseDashboard();
} else {
    window.addEventListener('load', () => {
        loadGutenverseDashboard();
    });
}
