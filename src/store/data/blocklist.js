import { createReduxStore, combineReducers, register } from '@wordpress/data';

const PRO_STATE_DEFAULT = [
    {
        name: 'gutenverse/conditions',
        title: 'Condition Filter',
        category: 'gutenverse-structure',
        pro: true,
        locked: true,
    }
];

const blockList = (state = PRO_STATE_DEFAULT, action) => {
    switch (action.type) {
        case 'UPDATE_LIST':
            if (action?.list?.pro) {
                const updatedState = state.filter(block => {
                    return action?.list?.name !== block.name;
                });

                console.log(updatedState);

                return [
                    ...updatedState,
                    action.list,
                ];
            }

            return [
                ...state,
                action.list,
            ];
        default:
            return state;
    }
};

const updateList = (list) => {
    return {
        type: 'UPDATE_LIST',
        list
    };
};

const getList = (state = []) => {
    const { blockList } = state;
    return blockList;
};

export const store = createReduxStore('gutenverse/blocklist', {
    reducer: combineReducers({
        blockList
    }),
    actions: {
        updateList
    },
    selectors: {
        getList
    }
});

register(store);