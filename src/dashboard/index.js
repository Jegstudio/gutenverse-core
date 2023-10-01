import Navigation from './route/navigation';
import Content from './route/content';
import { render } from '@wordpress/element';
import { Routing } from 'gutenverse-core/router';
import { ProUpdateNotice } from './content/update-notice/pro-update-notice';
export { blocklistStore, dashboardStore, libraryStore } from 'gutenverse-core/store';

const loadGutenverseDashboard = () => {
    const dashboardDiv = document.getElementById('gutenverse-dashboard');

    if (dashboardDiv) {
        render(
            <Routing>
                {(props) => {
                    return <>
                        <Navigation {...props}/>
                        <ProUpdateNotice/>
                        <Content {...props}/>
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
