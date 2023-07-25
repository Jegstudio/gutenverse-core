import { __ } from '@wordpress/i18n';
import classnames from 'classnames';
import { Link } from 'gutenverse-core/router';
import { applyFilters } from '@wordpress/hooks';
import EditorSetting from './src/settings/editor-setting';
import TemplateSetting from './src/settings/template-setting';
import FontIconSetting from './src/settings/font-icon-setting';
import { DashboardBody, DashboardContent, DashboardHeader } from '../../components';

const SettingsBody = ({ settings, ...props }) => {
    let body = '';

    switch (settings) {
        case 'editor':
            body = <EditorSetting {...props} />;
            break;
        case 'template':
            body = <TemplateSetting {...props} />;
            break;
        case 'font-icon':
            body = <FontIconSetting {...props} />;
            break;
        default:
            break;
    }

    body = applyFilters(
        'gutenverse.dashboard.settings.body',
        body,
        settings,
        props
    );

    return <div className="settings-tab-body">{body}</div>;
};

const Settings = (props) => {
    const { location } = props;
    const { pathname, search } = location;
    const query = new URLSearchParams(search);
    const page = query.get('page');
    const path = query.get('path');
    const settings = query.get('settings') ? query.get('settings') : 'editor';

    const tabs = applyFilters(
        'gutenverse.dashboard.settings.navigation',
        {
            editor: __('Editor', '--gctd--'),
            template: __('Template', '--gctd--'),
            ['font-icon']: __('Font Icon', '--gctd--'),
        }
    );

    props = { ...props, settings };

    return <DashboardContent>
        <DashboardHeader>
            <h2>{__('General Settings', '--gctd--')}</h2>
        </DashboardHeader>
        <DashboardBody>
            <div className="setting-tabs">
                <div className="settings-tab-header">
                    <div className="tab-items">
                        {Object.keys(tabs).map(key => {
                            const item = tabs[key];
                            const param = `?page=${page}&path=${path}&settings=${key}`;
                            const classes = classnames('tab-item', {
                                active: key === settings
                            });

                            return <Link
                                index={key}
                                key={param}
                                to={{
                                    pathname: pathname,
                                    search: param,
                                }}
                                className={classes}
                                location={location}
                            >
                                {item}
                            </Link>;
                        })}
                    </div>
                </div>
                <SettingsBody {...props} />
            </div>
        </DashboardBody>
    </DashboardContent>;
};

export default Settings;