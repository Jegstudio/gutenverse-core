import { createReduxStore, combineReducers, register } from '@wordpress/data';
import { applyFilters } from '@wordpress/hooks';
import { IconConditionsBlockSVG } from 'gutenverse-core/icons';

const PRO_STATE_DEFAULT = [
    {
        name: 'gutenverse/conditions',
        title: 'Condition Filter',
        category: 'gutenverse-structure',
        icon: <IconConditionsBlockSVG/>,
        pro: true,
        locked: true,
    },
];

const blockList = (state = [], action) => {
    switch (action.type) {
        case 'UPDATE_LIST':
            if (action?.list?.pro) {
                const updatedState = state.filter(block => {
                    return action?.list?.name !== block.name;
                });

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

    return applyFilters(
        'gutenverse.blocklist.locked',
        [
            ...PRO_STATE_DEFAULT,
            ...blockList
        ]
    );
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