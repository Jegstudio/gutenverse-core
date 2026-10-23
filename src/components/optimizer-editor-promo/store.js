import { registerStore } from '@wordpress/data';

export const STORE_NAME = 'gutenverse-optimizer/store';

const DEFAULT_STATE = {
    showLeftPanel: false,
    pageAudit: null,
};

export const actions = {
    toggleLeftPanel(show) {
        return {
            type: 'TOGGLE_LEFT_PANEL',
            show,
        };
    },
    setPageAudit(audit) {
        return {
            type: 'SET_PAGE_AUDIT',
            audit,
        };
    },
};

const reducer = (state = DEFAULT_STATE, action) => {
    switch (action.type) {
        case 'TOGGLE_LEFT_PANEL':
            return {
                ...state,
                showLeftPanel: action.show,
            };
        case 'SET_PAGE_AUDIT':
            return {
                ...state,
                pageAudit: action.audit,
            };
    }
    return state;
};

export const selectors = {
    isShowLeftPanel(state) {
        return state.showLeftPanel;
    },
    getPageAudit(state) {
        return state.pageAudit;
    },
};

registerStore(STORE_NAME, {
    reducer,
    actions,
    selectors,
});
