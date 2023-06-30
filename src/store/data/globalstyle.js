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
            return {
                ...state,
                fonts: state.fonts.map(font => {
                    if (font.id === action.font.id) {
                        return action.font;
                    } else {
                        return font;
                    }

                })
            };
        case 'DELETE_VARIABLE_FONT':
            return {
                ...state,
                fonts: state.fonts.filter(font => font.id !== action.id)
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
    editVariableFont: (font) => {
        return {
            type: 'EDIT_VARIABLE_FONT',
            font
        };
    },
    deleteVariableFont: (id) => {
        return {
            type: 'DELETE_VARIABLE_FONT',
            id
        };
    },
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

export const store = createReduxStore('gutenverse/global-style', {
    reducer: combineReducers({
        variable: variableReducer,
        googleFont: googleFontReducer
    }),
    actions: {
        ...variableAction,
        ...googleFontAction
    },
    selectors: {
        ...variableSelector,
        ...googleFontSelector,
    }
});

register(store);