import { createReduxStore, register } from '@wordpress/data';

const DEFAULT_STATE = {
    proLicense: false,
};

const reducer = (state = DEFAULT_STATE, action) => {
    switch (action.type) {
        case 'UPDATE_LICENSE_STATE':
            return {
                ...state,
                proLicense: action.proLicense
            };
    }
};

const actions = {
    setLicenseState(id, style) {
        return {
            type: 'INJECT_STYLE',
            id,
            style
        };
    },
};

const selectors = {};

const store = createReduxStore('gutenverse/license', {
    reducer,
    actions,
    selectors
});

register(store);

