import { useEffect, useState } from '@wordpress/element';
import Dashboard from '../content/dashboard/dashboard';
import ThemeList from '../content/themelist/themelist';
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
import { fetchLibraryData } from 'gutenverse-core-editor/requests';
import Ecosystem from '../content/ecosystem/ecosystem';

const Content = ({ initialLibraryData, initialPluginData, location }) => {
    const { createInfoNotice, createErrorNotice } = useDispatch(noticesStore);
    const query = new URLSearchParams(location?.search);
    const page = query.get('page');
    const path = query.get('path');
    const {
        homeSlug
    } = window['GutenverseDashboard'];

    const {
        settingsData
    } = window['GutenverseSettings'];

    const [settingValues, setSettingValues] = useState(settingsData);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        fetchLibraryData().then(result => {
            initialLibraryData({
                'layoutData': result['layout-data'],
                'layoutCategories': result['layout-categories'],
                'themeData': result['theme-data'],
                'themeCategories': result['theme-categories'],
                'sectionData': result['section-data'],
                'sectionCategories': result['section-categories'],
                'pluginEcosystem': result['plugin-ecosystem'],
            });
        });

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
            createInfoNotice(__('Setting Saved', 'gutenverse'), {
                type: 'snackbar',
                isDismissible: true,
            });
        }).catch(() => {
            setSaving(false);
            createErrorNotice(__('Saving Data Error', 'gutenverse'), {
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
                routePage = <ThemeList {...props} />;
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
            default:
                routePage = <Dashboard {...props} />;
                break;
        }

        routePage = applyFilters(
            'gutenverse.dashboard.route.content',
            routePage,
            path
        );
    }

    return <div className={`content-wrapper ${path ? path : 'dashboard'}`}>
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
