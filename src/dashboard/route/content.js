import { useEffect, useState } from '@wordpress/element';
import Dashboard from '../content/dashboard/dashboard';
import BlockList from '../content/blocklist/blocklist';
import Settings from '../content/settings/settings';
import SystemRequirement from '../content/system/system';
import License from '../content/license/license';
import UpdateNotice from '../content/update-notice/update-notice';
import apiFetch from '@wordpress/api-fetch';
import { __ } from '@wordpress/i18n';
import { store as noticesStore } from '@wordpress/notices';
import { useDispatch, withDispatch } from '@wordpress/data';
import { applyFilters } from '@wordpress/hooks';
import { compose } from '@wordpress/compose';
import { fetchLibraryData } from 'gutenverse-core/requests';
import Ecosystem from '../content/ecosystem/ecosystem';
import Themelist from '../content/themelist/themelist';
import isEmpty from 'lodash/isEmpty';

const Content = ({ initialLibraryData, initialPluginData, location }) => {
    const { createInfoNotice, createErrorNotice } = useDispatch(noticesStore);
    const query = new URLSearchParams(location?.search);
    const page = query.get('page');
    let path = query.get('path');
    const {
        homeSlug,
        showThemeList
    } = window['GutenverseDashboard'];
    const {
        settingsData
    } = window['GutenverseSettings'];
    const [settingValues, setSettingValues] = useState(settingsData);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        const dev = 'true' == '--dev_mode--';
        const fetchData = async (dev) => {
            const result = await fetchLibraryData(dev);
            initialLibraryData({
                'layoutData': result['layout-data'],
                'layoutCategories': result['layout-categories'],
                'themeData': result['theme-data'],
                'themeCategories': result['theme-categories'],
                'sectionData': result['section-data'],
                'sectionCategories': result['section-categories'],
                'pluginEcosystem': result['plugin-ecosystem'],
            });
        };

        if (dev) {
            fetchData(true);
        } else {
            fetchData(false);
        }

        const { plugins } = window['GutenverseDashboard'];
        initialPluginData({
            'installedPlugin': plugins,
        });
    }, []);

    let routePage = null;

    const updateValues = (setting, values) => {
        setSettingValues({
            ...settingValues,
            [setting]: values
        });
    };

    const updateSettingValues = (setting, id, value) => {
        setSettingValues({
            ...settingValues,
            [setting]: {
                ...settingValues[setting],
                [id]: value
            }
        });
    };

    const saveData = (savedKeys = []) => {
        setSaving(true);
        apiFetch({
            path: 'gutenverse-client/v1/settings/modify',
            method: 'POST',
            data: {
                setting: Object.keys({ ...settingValues })
                    .filter(key => savedKeys.includes(key))
                    .reduce((obj, key) => {
                        obj[key] = settingValues[key];
                        return obj;
                    }, {}),
            }
        }).then(() => {
            setSaving(false);
            createInfoNotice(__('Setting Saved', '--gctd--'), {
                type: 'snackbar',
                isDismissible: true,
            });
        }).catch(() => {
            setSaving(false);
            createErrorNotice(__('Saving Data Error', '--gctd--'), {
                type: 'snackbar',
                isDismissible: true,
            });
        });
    };

    const props = {
        saving,
        saveData,
        settingValues,
        updateValues,
        updateSettingValues,
        location
    };

    if (homeSlug === page) {
        switch (path) {
            case 'theme-list':
                routePage = !isEmpty( showThemeList ) ? <Themelist {...props} /> : <Dashboard {...props} />;
                break;
            case 'block-list':
                routePage = <BlockList {...props} />;
                break;
            case 'settings':
                routePage = <Settings {...props} />;
                break;
            case 'update-notice':
                routePage = <UpdateNotice {...props} />;
                break;
            case 'system':
                routePage = <SystemRequirement {...props} />;
                break;
            case 'license':
                routePage = <License {...props} />;
                break;
            case 'ecosystem':
                routePage = <Ecosystem {...props} />;
                break;
            case 'upgrade-pro':
                path = 'dashboard';
                window?.GutenverseDashboard?.upgradeProUrl && window.open(window?.GutenverseDashboard?.upgradeProUrl, '_blank');
                routePage = <Dashboard {...props} />;
                break;
            default:
                path = 'dashboard';
                routePage = <Dashboard {...props} />;
                break;
        }

        routePage = applyFilters(
            'gutenverse.dashboard.route.content',
            routePage,
            path
        );
    }

    return <div className={`content-wrapper ${path === 'theme-list' || !path ? 'dashboard' : path}`}>
        {routePage}
    </div>;
};

export default compose(
    withDispatch((dispatch) => {
        const {
            initialLibraryData,
            initialPluginData
        } = dispatch('gutenverse/library');

        return {
            initialLibraryData,
            initialPluginData
        };
    }),
)(Content);
