import { createReduxStore, combineReducers, register } from '@wordpress/data';
import { applyFilters } from '@wordpress/hooks';
import { IconSectionSliderSVG } from 'gutenverse-core/icons';

const PRO_STATE_DEFAULT = [
    // {
    //     name: 'gutenverse/conditions',
    //     title: 'Condition Filter',
    //     category: 'gutenverse-structure',
    //     icon: <IconConditionsBlockSVG />,
    //     pro: true,
    //     locked: true,
    // },
    {
        name: 'gutenverse/section-slider',
        title: 'Section Slider',
        category: 'gutenverse-structure',
        icon: <IconSectionSliderSVG />,
        pro: true,
        locked: true,
        tier: 'professional',
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

    const lockedBlocks = applyFilters('gutenverse.blocklist.locked', PRO_STATE_DEFAULT);

    lockedBlocks.forEach(lockedBlock => {
        const existingBlock = blockList.find(block => block.name === lockedBlock.name);

        if (existingBlock) {
            // Merge without overwriting blockList data
            Object.keys(lockedBlock).forEach(key => {
                if (Array.isArray(lockedBlock[key]) && Array.isArray(existingBlock[key])) {
                    // Merge arrays without duplicates (keep blockList priority)
                    existingBlock[key] = [
                        ...existingBlock[key],
                        ...lockedBlock[key].filter(item => !existingBlock[key].includes(item))
                    ];
                } else if (typeof lockedBlock[key] === 'object' && lockedBlock[key] !== null) {
                    // Merge objects shallowly without overwriting existing values
                    existingBlock[key] = {
                        ...lockedBlock[key],
                        ...existingBlock[key]  // blockList priority
                    };
                } else {
                    // Only add if it doesn’t exist yet in blockList
                    if (existingBlock[key] === undefined || existingBlock[key] === null) {
                        existingBlock[key] = lockedBlock[key];
                    }
                }
            });
        } else {
            // If it doesn't exist, just push it
            blockList.push(lockedBlock);
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