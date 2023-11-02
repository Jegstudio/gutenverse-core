import { createReduxStore, combineReducers, register } from '@wordpress/data';

const datas = (state = {}, action) => {
    switch (action.type) {
        case 'UPDATE_DATAS':
            return {
                ...state,
                ...action.params,
            };
        default:
            return state;
    }
};

const updateData = (params) => {
    return {
        type: 'UPDATE_DATAS',
        params
    };
};

const getData = (state = {}) => {
    const { datas } = state;

    return datas;
};

export const store = createReduxStore('gutenverse/data', {
    reducer: combineReducers({
        datas
    }),
    actions: {
        updateData
    },
    selectors: {
        getData
    }
});

register(store);