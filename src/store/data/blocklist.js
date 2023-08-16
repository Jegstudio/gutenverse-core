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
    const lockedList = [];

    const lockedBlocks = applyFilters(
        'gutenverse.blocklist.locked',
        [
            ...PRO_STATE_DEFAULT
        ]
    );

    lockedBlocks.map(lockedBlock => {
        let exist = false;

        blockList.map(block => {
            if (block.name === lockedBlock.name) {
                exist = true;
            }
        });

        if (!exist) {
            lockedList.push(lockedBlock);
        }
    });

    return [
        ...lockedList,
        ...blockList,
    ];
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