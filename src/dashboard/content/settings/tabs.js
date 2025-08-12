import { __ } from '@wordpress/i18n';
import { applyFilters } from '@wordpress/hooks';



const {
    activePlugins = []
} = window['GutenverseConfig'] || window['GutenverseDashboard'] || {};

export const getPluginTabs = () => {
    const pluginTabs = {
        'form': {
            title: __('Form', 'gutenverse'),
            pro: false,
        },
        'news': {
            title: __('Gutenverse News', 'gutenverse'),
            pro: false,
            subMenu: applyFilters('gutenverse.news.settings.submenu', [
                {
                    id: 'block_settings',
                    title: 'Global Block Settings'
                },
                {
                    id: 'additional_features',
                    title: 'Addiitonal Features',
                    pro: true,
                    withAccess: true
                }
            ])
        },
    };

    return Object.fromEntries(
        Object.entries(pluginTabs).filter(([key]) => activePlugins.includes('gutenverse-' + key))
    );
}

export const generalTabs = {
    editor: {
        title: __('Editor', '--gctd--'),
        pro: false,
    },
    frontend: {
        title: __('Frontend', '--gctd--'),
        pro: false,
    },
    template: {
        title: __('Template', '--gctd--'),
        pro: false,
    },
    ['font-icon']: {
        title: __('Font Icon', '--gctd--'),
        pro: false,
    },
    ['custom-font']: {
        title: __('Custom Font', '--gctd--'),
        pro: true,
    },
};

const setitngTitle = {
    editor: __('Editor Settings', '--gctd--'),
    frontend: __('Frontend Settings', '--gctd--'),
    template: __('Template Settings', '--gctd--'),
    'gtb-setting-tab': __('Theme Builder Settings', '--gctd--'),
    'font-icon': __('Font Icon Settings', '--gctd--'),
    'custom-font': __('Custom Font Settings', '--gctd--'),
    form: __('Form Settings', '--gctd--'),
    block_settings: __('Global Block Settings', '--gctd--'),
    additional_features: __('Gutenverse News Additional Features', '--gctd--'),
    view_counter: __('View Counter Settings', '--gctd--'),
    paywall: __('Paywall Settings', '--gctd--'),

};

export const getSettingTitle = (key) => {
    return setitngTitle[key] ? setitngTitle[key] : '';
};