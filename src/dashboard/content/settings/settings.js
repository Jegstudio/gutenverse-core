import { __ } from '@wordpress/i18n';
import classnames from 'classnames';
import { useState } from '@wordpress/element';
import { Link } from 'gutenverse-core/router';
import { applyFilters } from '@wordpress/hooks';
import EditorSetting from './src/settings/editor-setting';
import TemplateSetting from './src/settings/template-setting';
import FontIconSetting from './src/settings/font-icon-setting';
import { DashboardBody, DashboardContent } from '../../components';
import FrontEndSetting from './src/settings/frontend-setting';
import { generalTabs, getPluginTabs, getSettingTitle } from './tabs';
import { getSettingsIcon } from 'gutenverse-core/icons';
import { PopupInstallPlugin, PopupPro } from 'gutenverse-core/components';

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
        case 'gtb-setting-tab':
            body = applyFilters(
                'gutenverse.dashboard.settings.gtb',
                body,
                settings,
                props
            );
            break;
        case 'form':
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
        case 'news':
            body = applyFilters(
                'gutenverse.dashboard.settings.news',
                body,
                settings,
                props
            );
            break;
        case 'performance':
            body = applyFilters(
                'gutenverse.setting-pro-performance',
                body,
                settings,
                props
            );
            break;
        default:
            break;
    }
    return <div className="settings-tab-body-wrapper">
        <div className="tab-header">
            <h2>
                {getSettingTitle(props.subSettings ? props.subSettings : settings)}
            </h2>
        </div>
        <div className="settings-tab-body">
            {body}
        </div>
    </div>;
};

const Settings = (props) => {
    const [popupActive, setPopupActive] = useState(false);
    const [installPopup, setInstallPopup] = useState(false);

    const { location } = props;
    const { pathname, search } = location;
    const query = new URLSearchParams(search);
    const page = query.get('page');
    const path = query.get('path');
    const settings = query.get('settings') ? query.get('settings') : 'editor';
    const subSettings = query.get('sub-menu') ? query.get('sub-menu') : '';
    props = { ...props, settings, subSettings };
    const pluginTabs = getPluginTabs(props.settingValues);

    return <DashboardContent>
        <PopupPro
            active={popupActive}
            setActive={setPopupActive}
            description={<>{__('Upgrade ', '--gctd--')}<span>{__(' Gutenverse PRO ', '--gctd--')}</span>{__(' version to ', '--gctd--')}<br />{__(' unlock these premium features', '--gctd--')}</>}
        />
        <PopupInstallPlugin
            active={installPopup}
            setActive={setInstallPopup}
            description={<>{__('Please Install Gutenverse News Add\'s On Plugin', '--gctd--')}</>}
        />
        <DashboardBody>
            <div className="setting-tabs">
                <div className="settings-tab-header">
                    <SettingLists
                        label={__('General Settings', '--gcdt--')}
                        path={path}
                        page={page}
                        pathname={pathname}
                        setPopupActive={setPopupActive}
                        settings={settings}
                        tabs={generalTabs}
                        subSettings={subSettings}
                        extraClasses={'general'}
                    />

                    <SettingLists
                        label={__('Plugins Settings', '--gcdt--')}
                        path={path}
                        page={page}
                        pathname={pathname}
                        setPopupActive={setPopupActive}
                        settings={settings}
                        tabs={pluginTabs}
                        subSettings={subSettings}
                        extraClasses={'plugins'}
                    />
                </div>
                <SettingsBody {...props} setPopupActive={setPopupActive} setInstallPopup={setInstallPopup} />
            </div>
        </DashboardBody>
    </DashboardContent>;
};

const SettingLists = ({ label, path, page, pathname, setPopupActive, settings, tabs, subSettings, extraClasses }) => {
    const icons = getSettingsIcon('#99A2A9');
    const iconsActive = getSettingsIcon('#3B57F7');
    if (Object.keys(tabs).length === 0) {
        return '';
    }

    return <div className={`tab-items ${extraClasses}`}>
        <span className="tab-label">{label}</span>
        {Object.keys(tabs).map(key => {
            const item = tabs[key].title;
            const icon = icons[key] ? icons[key] : '';
            const iconActive = iconsActive[key] ? iconsActive[key] : '';
            const param = 'subMenu' in tabs[key] ? `?page=${page}&path=${path}&settings=${key}&sub-menu=${tabs[key].subMenu[0].id}` : `?page=${page}&path=${path}&settings=${key}`;
            const classes = classnames('tab-item', {
                active: key === settings,
                locked: tabs[key].pro
            });
            return <div className="nav-wrapper" key={param}>
                <div className="main-menu">
                    <Link
                        index={key}
                        to={{
                            pathname: pathname,
                            search: param,
                        }}
                        className={classes}
                        location={location}
                        pro={tabs[key].pro}
                        setActive={() => setPopupActive(true)}
                    >
                        {key === settings ? iconActive : icon}
                        {item}
                    </Link>
                </div>

                {'subMenu' in tabs[key] && (key === settings) && <div className="sub-menu">
                    {tabs[key].subMenu.map((value) => {
                        let item = value.title;
                        let param = `?page=${page}&path=${path}&settings=${key}&sub-menu=${value.id}`;
                        let classes = classnames('tab-item', {
                            active: value.id === subSettings,
                            locked: value.pro
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
                            pro={value.pro}
                            setActive={() => setPopupActive(true)}
                            withAccess={value.withAccess}
                        >
                            {item}
                        </Link>;
                    })}

                </div>}

            </div>;
        })}
    </div>;
};

export default Settings;