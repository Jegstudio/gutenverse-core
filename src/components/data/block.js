import { createReduxStore, register } from '@wordpress/data';

const DEFAULT_STATE = {
    styles: {},
    fonts: {},
    googleFonts: {},
    customFonts: {},
    elements: {}
};

const reducer = (state = DEFAULT_STATE, action) => {
    switch (action.type) {
        case 'INJECT_STYLE':
            return {
                ...state,
                styles: {
                    ...state.styles,
                    [action.id]: action.style
                },
            };
        case 'INJECT_FONT':
            return {
                ...state,
                fonts: {
                    ...state.fonts,
                    [action.id]: action.font
                },
            };
        case 'INJECT_GOOGLE_FONTS':
            return {
                ...state,
                googleFonts: {
                    ...state.googleFonts,
                    [action.id]: action.data,
                },
            };
        case 'INJECT_CUSTOM_FONTS':
            return {
                ...state,
                customFonts: {
                    ...state.customFonts,
                    [action.id]: action.data,
                },
            };
        case 'REGISTER_ELEMENT':
            return {
                ...state,
                elements: {
                    ...state.elements,
                    [action.id]: {
                        ...state.elements[action.id],
                        ...action.data
                    }
                }
            };
        case 'SET_COLUMN_WIDTH':
            return {
                ...state,
                elements: {
                    ...state.elements,
                    [action.id]: {
                        ...state.elements[action.id],
                        ...action.data
                    }
                }
            };
        case 'INJECT_REF':
            return {
                ...state,
                elements: {
                    ...state.elements,
                    [action.id]: {
                        ...state.elements[action.id],
                        ref: action.ref
                    }
                }
            };
    }
};

const actions = {
    setStyle(id, style) {
        return {
            type: 'INJECT_STYLE',
            id,
            style
        };
    },
    setFont(id, font) {
        return {
            type: 'INJECT_FONT',
            id,
            font
        };
    },
    setGoogleFonts(id, data) {
        return {
            type: 'INJECT_GOOGLE_FONTS',
            id,
            data
        };
    },
    setCustomFonts(id, data) {
        return {
            type: 'INJECT_CUSTOM_FONTS',
            id,
            data
        };
    },
    registerElement(id, data) {
        return {
            type: 'REGISTER_ELEMENT',
            id,
            data
        };
    },
    setColumnWidth(id, columnWidth) {
        return {
            type: 'SET_COLUMN_WIDTH',
            id,
            data: {
                columnWidth
            }
        };
    },
    injectRef(id, ref) {
        return {
            type: 'INJECT_REF',
            id,
            ref
        };
    },
};

const selectors = {
    getStyles(state) {
        return state === undefined ? {} : state.styles;
    },
    getFonts(state) {
        return state === undefined ? {} : state.fonts;
    },
    getGoogleFonts(state) {
        return state === undefined ? {} : state.googleFonts;
    },
    getCustomFonts(state) {
        return state === undefined ? {} : state.customFonts;
    },
    elementExist(state, id) {
        if (state !== undefined) {
            return Object.keys(state.elements).find(clientId => state.elements[clientId].elementId === id);
        } else {
            return false;
        }
    },
    findElement(state, id) {
        if(state === undefined) {
            return false;
        } else {
            if(id && state.elements[id]) {
                return state.elements[id];
            }
        }
    }
};

const store = createReduxStore('gutenverse/style', {
    reducer,
    actions,
    selectors
});

register(store);