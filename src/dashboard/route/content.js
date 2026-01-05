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

const Content = ({ initialLibraryData, initialPluginData, location }) => {
    const { createInfoNotice, createErrorNotice } = useDispatch(noticesStore);
    const query = new URLSearchParams(location?.search);
    const page = query.get('page');
    let path = query.get('path');
    const {
        homeSlug
    } = window['GutenverseDashboard'];
    const {
        settingsData
    } = window['GutenverseSettings'];
    const [settingValues, setSettingValues] = useState(settingsData);
    const [saving, setSaving] = useState(false);
    const [toast, setToast] = useState({
        status: 'success',
        message: 'Notification Toast'
    });
    const [showToast, setShowToast] = useState(false);

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
        location,
        setShowToast,
        setToast
    };

    if (homeSlug === page) {
        switch (path) {
            // case 'theme-list':
            //     routePage = <Themelist {...props} />;
            //     break;
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

    return <div className={`content-wrapper ${path ? path : 'dashboard'}`}>
        {routePage}
        <div className={`gutenverse-notification-toast ${toast?.status} ${showToast ? 'show' : '' }`}>
            {toast?.status === 'success' ? <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="14" height="14" rx="7" fill="#17B26A" />
                <path d="M10.5 4.375L5.6875 9.1875L3.5 7" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
                : <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7 0C3.15 0 0 3.15 0 7C0 10.85 3.15 14 7 14C10.85 14 14 10.85 14 7C14 3.15 10.85 0 7 0ZM9.59 8.61C9.87 8.89 9.87 9.31 9.59 9.59C9.31 9.87 8.89 9.87 8.61 9.59L7 7.98L5.39 9.59C5.11 9.87 4.69 9.87 4.41 9.59C4.13 9.31 4.13 8.89 4.41 8.61L6.02 7L4.41 5.39C4.13 5.11 4.13 4.69 4.41 4.41C4.69 4.13 5.11 4.13 5.39 4.41L7 6.02L8.61 4.41C8.89 4.13 9.31 4.13 9.59 4.41C9.87 4.69 9.87 5.11 9.59 5.39L7.98 7L9.59 8.61Z" fill="#F04438" />
                </svg>
            }
            {toast?.message}
        </div>
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
