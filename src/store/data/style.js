import { createReduxStore, combineReducers, register } from '@wordpress/data';

const defaultState = {
    style : [],
    font : []
};
export const styleReducer = (state = defaultState, action) => {
    switch (action.type) {
        case 'UPDATE_STYLE':
            let findData = state.style.findIndex(el => el.id === action.data.id);
            if(findData === -1){
                return {
                    ...state,
                    style: [...state.style, action.data]
                };
            }else{
                let newStyle = state.style;
                newStyle[findData].style = action.data.style;
                return {
                    ...state,
                    style: newStyle
                };
            }
        case 'REMOVE_STYLE':
            return {
                ...state,
                style : state.style.filter(el => el.id !== action.id)
            };
        default:
            return state;
    }
};

export const fontReducer = (state = defaultState, action) => {
    switch (action.type) {
        case 'UPDATE_FONT':
            if(action.data.type === 'variable'){
                return state;
            }
            let findData = state.font.findIndex(el => el.font === action.data.font );
            if(findData === -1){
                return {
                    ...state,
                    font: [...state.font, action.data]
                };
            }else{
                let newFont = state.font;
                if(newFont[findData].weight === action.weight || !action.weight ){
                    return state;
                }
                newFont[findData] = action;
                return {
                    ...state,
                    style: newFont
                };
            }
        default:
            return state;
    }
};

export const styleAction = {
    updateStyle: (data) => {
        return {
            type: 'UPDATE_STYLE',
            data
        };
    },
    deleteStyle: (id) => {
        return {
            type: 'REMOVE_STYLE',
            id
        };
    }
};

export const fontAction = {
    updateFont: (data) => {
        return {
            type: 'UPDATE_FONT',
            data
        };
    },
};

export const styleSelector = {
    getStyles: (state) => {
        return state.styleReducer.style;
    }
};

export const fontSelector = {
    getFonts: (state) => {
        return state.fontReducer.font;
    }
};

export const store = createReduxStore('gutenverse/blockstyle', {
    reducer: combineReducers({
        styleReducer,
        fontReducer
    }),
    actions: {
        ...styleAction,
        ...fontAction
    },
    selectors: {
        ...styleSelector,
        ...fontSelector
    }
});

register(store);