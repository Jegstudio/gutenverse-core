import { createReduxStore, combineReducers, register } from '@wordpress/data';
import { applyFilters } from '@wordpress/hooks';
import { IconConditionsBlockSVG, IconFormCalculationSVG, IconFormImageRadioSVG, IconFormPaymentSVG, IconFormStepperNavigationButtonSVG, IconFormStepperSVG, IconLottieSVG, IconMegaMenuSVG } from 'gutenverse-core/icons';

const PRO_STATE_DEFAULT = applyFilters(
    'gutenverse.blocklist.locked',
    [
        {
            name: 'gutenverse/conditions',
            title: 'Condition Filter',
            category: 'gutenverse-structure',
            icon: <IconConditionsBlockSVG/>,
            pro: true,
            locked: true,
        },
        {
            name: 'gutenverse/lottie',
            title: 'Lottie',
            category: 'gutenverse-element',
            icon: <IconLottieSVG/>,
            pro: true,
            locked: true,
        },
        {
            name: 'gutenverse/mega-menu',
            title: 'Mega Menu',
            category: 'gutenverse-element',
            icon: <IconMegaMenuSVG/>,
            pro: true,
            locked: true,
        },
        {
            name: 'gutenverse/form-input-calculation',
            title: 'Calculation Input',
            category: 'gutenverse-form',
            icon: <IconFormCalculationSVG/>,
            pro: true,
            locked: true,
        },
        {
            name: 'gutenverse/form-input-image-radio',
            title: 'Image Radio',
            category: 'gutenverse-form',
            icon: <IconFormImageRadioSVG/>,
            pro: true,
            locked: true,
        },
        {
            name: 'gutenverse/form-input-payment',
            title: 'Payment',
            category: 'gutenverse-form',
            icon: <IconFormPaymentSVG/>,
            pro: true,
            locked: true,
        },
        {
            name: 'gutenverse/form-stepper-navigation',
            title: 'Stepper Navigation',
            category: 'gutenverse-form',
            icon: <IconFormStepperNavigationButtonSVG/>,
            pro: true,
            locked: true,
        },
        {
            name: 'gutenverse/form-stepper',
            title: 'Stepper',
            category: 'gutenverse-form',
            icon: <IconFormStepperSVG/>,
            pro: true,
            locked: true,
        },
    ]
);

const blockList = (state = PRO_STATE_DEFAULT, action) => {
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