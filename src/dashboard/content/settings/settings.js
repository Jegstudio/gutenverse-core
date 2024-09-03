import { __ } from '@wordpress/i18n';
import classnames from 'classnames';
import { useState } from '@wordpress/element';
import { Link } from 'gutenverse-core/router';
import { applyFilters } from '@wordpress/hooks';
import EditorSetting from './src/settings/editor-setting';
import TemplateSetting from './src/settings/template-setting';
import FontIconSetting from './src/settings/font-icon-setting';
import { DashboardBody, DashboardContent, DashboardHeader,PopupPro } from '../../components';
import FrontEndSetting from './src/settings/frontend-setting';

const SettingsBody = ({ settings, ...props }) => {

    let body = '';
    switch (settings) {
        case 'editor':
            body = <EditorSetting {...props} />;
            break;
        case 'frontend':
            body = <FrontEndSetting {...props} />;
            break;
        case 'template':
            body = <TemplateSetting {...props} />;
            break;
        case 'font-icon':
            body = <FontIconSetting {...props} />;
            break;
        case 'form':
            body = applyFilters(
                'gutenverse.dashboard.settings.body',
                body,
                settings,
                props
            );
            break;
        case 'maintenance':
            body = applyFilters(
                'gutenverse.dashboard.settings.body',
                body,
                settings,
                props
            );
            break;
        case 'custom-font':
            body = applyFilters(
                'gutenverse.setting-pro-content',
                body,
                settings,
                props
            );
            break;
        default:
            break;
    }

    return <div className="settings-tab-body">{body}</div>;
};

const Settings = (props) => {
    const [popupActive, setPopupActive] = useState(false);
    const { location } = props;
    const { pathname, search } = location;
    const query = new URLSearchParams(search);
    const page = query.get('page');
    const path = query.get('path');
    const settings = query.get('settings') ? query.get('settings') : 'editor';

    const tabs = applyFilters(
        'gutenverse.dashboard.settings.navigation',
        {
            editor: {
                title : __('Editor', '--gctd--'),
                pro   : false,
            },
            frontend:{
                title : __('Frontend', '--gctd--'),
                pro   : false,
            },
            template: {
                title : __('Template', '--gctd--'),
                pro   : false,
            },
            ['font-icon']: {
                title : __('Font Icon', '--gctd--'),
                pro   : false,
            },
            ['custom-font']: {
                title : __('Custom Font', '--gctd--'),
                pro   : true,
            },
        }
    );
    props = { ...props, settings };
    return <DashboardContent>
        <PopupPro
            active={popupActive}
            setActive={setPopupActive}
            description={<>{__('Upgrade ', '--gctd--')}<span>{__(' Gutenverse PRO ', '--gctd--')}</span>{__(' version to ', '--gctd--')}<br />{__(' unlock these premium features', '--gctd--')}</>}
        />
        <DashboardHeader>
            <h2>{__('General Settings', '--gctd--')}</h2>
        </DashboardHeader>
        <DashboardBody>
            <div className="setting-tabs">
                <div className="settings-tab-header">
                    <div className="tab-items">
                        {Object.keys(tabs).map(key => {
                            const item = tabs[key].title;
                            const param = `?page=${page}&path=${path}&settings=${key}`;
                            const classes = classnames('tab-item', {
                                active: key === settings,
                                locked: tabs[key].pro
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
                                pro={tabs[key].pro}
                                setActive={()=>setPopupActive(true)}
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