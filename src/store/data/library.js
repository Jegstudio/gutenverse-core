import { createReduxStore, combineReducers, register } from '@wordpress/data';

export const modalSelector = {
    getModalData: (state) => {
        return state.modal;
    },
    getImporterData: (state) => {
        return state.modal;
    },
};

export const librarySelector = {
    getLibraryData: (state) => {
        return state.library;
    },
};

export const pluginSelector = {
    getPluginData: (state) => {
        return state.plugin;
    },
};

export const modalAction = {
    initialModalData: (action) => {
        return {
            type: 'INIT_MODAL_DATA',
            ...action
        };
    },
    setActiveLiblary: (active) => {
        return {
            type: 'SET_ACTIVE_LIBRARY',
            active
        };
    },
    setKeyword: (keyword) => {
        return {
            type: 'SET_KEYWORD',
            keyword
        };
    },
    setLicense: (license) => {
        return {
            type: 'SET_LICENSE',
            license
        };
    },
    setStatus: (status) => {
        return {
            type: 'SET_STATUS',
            status
        };
    },
    setCategories: (categories) => {
        return {
            type: 'SET_CATEGORIES',
            categories
        };
    },
    setAuthor: (author) => {
        return {
            type: 'SET_AUTHOR',
            author
        };
    },
    setPaging: (paging) => {
        return {
            type: 'SET_PAGING',
            paging
        };
    },
    setLibrary: (library) => {
        return {
            type: 'SET_LIBRARY',
            library
        };
    },
    setLockLayoutImport: (layout) => {
        return {
            type: 'SET_LAYOUT_IMPORT',
            layout
        };
    },
    setLayoutProgress: (text) => {
        return {
            type: 'SET_LAYOUT_PROGRESS',
            text
        };
    },
    setLockSectionImport: (section) => {
        return {
            type: 'SET_SECTION_IMPORT',
            section
        };
    },
    setSectionProgress: (text) => {
        return {
            type: 'SET_SECTION_PROGRESS',
            text
        };
    },
    setImportNotice: (text) => {
        return {
            type: 'SET_IMPORT_NOTICE',
            text
        };
    },
    setLibraryThemeContent: (demoList) => {
        return {
            type: 'SET_LIBRARY_THEME_CONTENT',
            demoList
        };
    },
};

export const libraryAction = {
    initialLibraryData: (action) => {
        return {
            type: 'INIT_DATA',
            ...action
        };
    },
    layoutLike: (action) => {
        return {
            type: 'LAYOUT_LIKE',
            ...action
        };
    },
    sectionLike: (action) => {
        return {
            type: 'SECTION_LIKE',
            ...action
        };
    },
};

export const pluginAction = {
    initialPluginData: (action) => {
        return {
            type: 'INIT_PLUGIN_DATA',
            ...action
        };
    },
    installPlugin: (action) => {
        const { slug, name, path, version } = action;
        return {
            type: 'INSTALL_PLUGIN',
            slug,
            name,
            path,
            version
        };
    },
    updatePlugin: (slug, version) => {
        return {
            type: 'UPDATE_PLUGIN',
            slug,
            version
        };
    },
    activatePlugin: (slug) => {
        return {
            type: 'ACTIVATE_PLUGIN',
            slug
        };
    },
};

export const modalReducer = (state = {}, action) => {
    switch (action.type) {
        case 'INIT_MODAL_DATA':
            const {
                libraryData,
                layoutContentData,
                themeContentData
            } = action;

            return {
                libraryData,
                layoutContentData,
                themeContentData
            };
        case 'SET_ACTIVE_LIBRARY':
            return {
                ...state,
                libraryData: {
                    ...state.libraryData,
                    active: action.active
                }
            };
        case 'SET_KEYWORD':
            return {
                ...state,
                layoutContentData: {
                    ...state.layoutContentData,
                    keyword: action.keyword
                }
            };
        case 'SET_LICENSE':
            return {
                ...state,
                layoutContentData: {
                    ...state.layoutContentData,
                    license: action.license
                }
            };
        case 'SET_STATUS':
            return {
                ...state,
                layoutContentData: {
                    ...state.layoutContentData,
                    status: action.status
                }
            };
        case 'SET_CATEGORIES':
            let filters = state.layoutContentData.categories;
            if( !filters.some(el => el.id === action.categories.id) ){
                filters.push(action.categories);
            }else{
                filters = filters.filter(el => el.id !== action.categories.id);
            }
            if( Array.isArray(action.categories) && action.categories.length === 0 ){
                filters = action.categories;
            }
            return {
                ...state,
                layoutContentData: {
                    ...state.layoutContentData,
                    categories: filters
                }
            };
        case 'SET_AUTHOR':
            return {
                ...state,
                layoutContentData: {
                    ...state.layoutContentData,
                    author: action.author
                }
            };
        case 'SET_PAGING':
            return {
                ...state,
                layoutContentData: {
                    ...state.layoutContentData,
                    paging: action.paging
                }
            };
        case 'SET_LIBRARY':
            return {
                ...state,
                layoutContentData: {
                    ...state.layoutContentData,
                    library: action.library
                }
            };
        case 'SET_LAYOUT_IMPORT':
            return {
                ...state,
                lockLayoutImport: action.layout
            };
        case 'SET_LAYOUT_PROGRESS':
            return {
                ...state,
                layoutProgress: action.text
            };
        case 'SET_SECTION_IMPORT':
            return {
                ...state,
                lockSectionImport: action.section
            };
        case 'SET_SECTION_PROGRESS':
            return {
                ...state,
                sectionProgress: action.text
            };
        case 'SET_IMPORT_NOTICE':
            return {
                ...state,
                importNotice: action.text
            };
        case 'SET_LIBRARY_THEME_CONTENT':
            return {
                ...state,
                themeContentData: action.demoList
            };
        default:
            return state;
    }
};

export const libraryReducer = (state = {}, action) => {
    switch (action.type) {
        case 'INIT_DATA':
            const {
                layoutData,
                layoutCategories,
                themeData,
                themeCategories,
                sectionData,
                sectionCategories,
                libraryData,
                layoutContentData,
                pluginEcosystem
            } = action;

            return {
                layoutData,
                layoutCategories,
                themeData,
                themeCategories,
                sectionData,
                sectionCategories,
                libraryData,
                layoutContentData,
                pluginEcosystem
            };
        case 'LAYOUT_LIKE':
            return {
                ...state,
                layoutData: state.layoutData.map(layout => {
                    if (action.slug === layout.data.slug) {
                        return {
                            ...layout,
                            like: action.flag
                        };
                    }

                    return layout;
                })
            };
        case 'SECTION_LIKE':
            return {
                ...state,
                sectionData: state.sectionData.map(section => {
                    if (action.slug === section.data.slug) {
                        return {
                            ...section,
                            like: action.flag
                        };
                    }

                    return section;
                })
            };
        default:
            return state;
    }
};

export const pluginReducer = (state = {}, action) => {
    switch (action.type) {
        case 'INIT_PLUGIN_DATA':
            const {
                installedPlugin
            } = action;

            return {
                installedPlugin
            };
        case 'INSTALL_PLUGIN':
            return {
                installedPlugin: {
                    ...state.installedPlugin,
                    [action.slug]: {
                        name: action.name,
                        version: action.version,
                        path: action.path,
                        active: true,
                    },
                }
            };
        case 'UPDATE_PLUGIN':
            return {
                installedPlugin: {
                    ...state.installedPlugin,
                    [action.slug]: {
                        ...state.installedPlugin[action.slug],
                        active: true,
                        version: action.version,
                    }
                },
            };
        case 'ACTIVATE_PLUGIN':
            return {
                installedPlugin: {
                    ...state.installedPlugin,
                    [action.slug]: {
                        ...state.installedPlugin[action.slug],
                        active: true,
                    }
                },
            };
        default:
            return state;
    }
};

export const store = createReduxStore('gutenverse/library', {
    reducer: combineReducers({
        modal: modalReducer,
        library: libraryReducer,
        plugin: pluginReducer,
    }),
    actions: {
        ...modalAction,
        ...libraryAction,
        ...pluginAction,
    },
    selectors: {
        ...modalSelector,
        ...librarySelector,
        ...pluginSelector
    }
});

register(store);