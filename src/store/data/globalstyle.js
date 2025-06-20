import { createReduxStore, combineReducers, register } from '@wordpress/data';
import { globalVariable } from 'gutenverse-core/config';

const defaultState = globalVariable;

export const variableReducer = (state = defaultState, action) => {
    switch (action.type) {
        case 'INIT_VARIABLE_FONT':
            return {
                ...state,
                fonts: [
                    ...action.fonts
                ],
            };
        case 'ADD_VARIABLE_FONT':
            return {
                ...state,
                fonts: [
                    ...state.fonts,
                    action.font
                ],
            };
        case 'EDIT_VARIABLE_FONT':
            let fonts = state.fonts;
            if (typeof fonts === 'object') {
                fonts = Object.values(fonts);
            }
            fonts[action.index] = action.font;
            return {
                ...state,
                fonts: fonts
            };
        case 'DELETE_VARIABLE_FONT':
            return {
                ...state,
                fonts: state.fonts.filter(font => font.id !== action.id)
            };
        case 'SET_VARIABLE_FONT':
            return {
                ...state,
                fonts: action.fonts
            };
        default:
            return state;
    }
};

export const variableAction = {
    initVariableFont: (fonts) => {
        return {
            type: 'INIT_VARIABLE_FONT',
            fonts
        };
    },
    addVariableFont: (font) => {
        return {
            type: 'ADD_VARIABLE_FONT',
            font
        };
    },
    editVariableFont: (font, index) => {
        return {
            type: 'EDIT_VARIABLE_FONT',
            font,
            index
        };
    },
    deleteVariableFont: (id) => {
        return {
            type: 'DELETE_VARIABLE_FONT',
            id
        };
    },
    setVariableFont: (fonts) => {
        return {
            type: 'SET_VARIABLE_FONT',
            fonts
        };
    }
};

export const variableSelector = {
    getVariable: (state) => {
        const { variable } = state;
        return variable;
    }
};

export const googleFontReducer = (state = {}, action) => {
    switch (action.type) {
        case 'ADD_GOOGLE_FONT':
            return {
                ...state,
                [action.id]: action.data,
            };
        default:
            return state;
    }
};

export const googleFontAction = {
    setGoogleFonts: (id, data) => {
        return {
            type: 'ADD_GOOGLE_FONT',
            id,
            data
        };
    },
};

export const googleFontSelector = {
    getGoogleFont: (state) => {
        const { googleFont } = state;
        return googleFont;
    }
};
export const customFontReducer = (state = {}, action) => {
    switch (action.type) {
        case 'ADD_CUSTOM_FONT':
            return {
                ...state,
                [action.id]: action.data,
            };
        default:
            return state;
    }
};

export const customFontAction = {
    setCustomFonts: (id, data) => {
        return {
            type: 'ADD_CUSTOM_FONT',
            id,
            data
        };
    },
};

export const customFontSelector = {
    getCustomFont: (state) => {
        const { customFont } = state;
        return customFont;
    }
};

export const store = createReduxStore('gutenverse/global-style', {
    reducer: combineReducers({
        variable: variableReducer,
        googleFont: googleFontReducer,
        customFont: customFontReducer
    }),
    actions: {
        ...variableAction,
        ...googleFontAction,
        ...customFontAction
    },
    selectors: {
        ...variableSelector,
        ...googleFontSelector,
        ...customFontSelector
    }
});

register(store);