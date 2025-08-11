import { __ } from '@wordpress/i18n';



const {
    activePlugins = []
} = window['GutenverseConfig'] || window['GutenverseDashboard'] || {};

const getPluginTabs = () => {

    const pluginTabs = {
        'form': {
            title: __('Form', 'gutenverse'),
            pro: false,
        },
        'news': {
            title: __('Gutenverse News', 'gutenverse'),
            pro: false,
            subMenu: [
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
            ]
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

export const pluginTabs = getPluginTabs();
const setitngTitle = {
    editor: 'Editor Settings',
    frontend: 'Frontend Settings',
    template: 'Template Settings',
    'gtb-setting-tab': 'Theme Builder Settings',
    'font-icon': 'Font Icon Settings',
    'custom-font': 'Custom Font Settings',
    form: 'Form Settings',
    block_settings: 'Global Block Settings',
    additional_features: 'Gutenverse News Additional Features',

};

export const getSettingTitle = (key) => {
    return setitngTitle[key] ? setitngTitle[key] : '';
};