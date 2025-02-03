import { createReduxStore, combineReducers, register } from '@wordpress/data';

export const styleReducer = (state = [], action) => {
    switch (action.type) {
        case 'UPDATE_STYLE':
            let findData = state.findIndex(el => el.id === action.data.id);
            if(findData === -1){
                return [
                    ...state,
                    action.data
                ];
            }else{
                let newState = state;
                newState[findData].style = action.data.style;
                return newState;
            }
        case 'REMOVE_STYLE':
            return state.filter(el => el.id !== action.id);
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
            type: 'DELETE_VARIABLE_FONT',
            id
        };
    }
};

export const styleSelector = {
    getStyle: (state) => {
        console.log(state)
        return state.blockStyle;
    }
};

export const store = createReduxStore('gutenverse/blockstyle', {
    reducer: styleReducer,
    actions: {
        ...styleAction,
    },
    selectors: {
        ...styleSelector,
    }
});

register(store);