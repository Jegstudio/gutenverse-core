import { createReduxStore, combineReducers, register } from '@wordpress/data';

const { pathname, search } = window?.location;
const DEFAULT_STATE = { pathname, search };

const routes = (state = DEFAULT_STATE, action) => {
    switch (action.type) {
        case 'UPDATE_LOCATION':
            return {
                ...state,
                ...action.location,
            };
        default:
            return state;
    }
};

const updateLocation = (location) => {
    return {
        type: 'UPDATE_LOCATION',
        location
    };
};

const getLocation = (state = DEFAULT_STATE) => {
    const { routes } = state;

    return routes;
};

export const store = createReduxStore('gutenverse/router', {
    reducer: combineReducers({
        routes
    }),
    actions: {
        updateLocation
    },
    selectors: {
        getLocation
    }
});

register(store);