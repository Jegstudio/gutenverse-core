import apiFetch from '@wordpress/api-fetch';

const PRICING_PLAN_API_PATH = 'gutenverse-client/v1/pricing-plan';
const DEFAULT_PRICING_PLAN = {
    active_promotion: [],
    is_event_sales: false,
    event_expired: '',
};

let pricingPlanPromise = null;

const getTempPricingPlanData = () => {
    if (typeof window === 'undefined') {
        return null;
    }

    return window.GutenverseTempPricingData || null;
};

const getRuntimeObjects = () => {
    if (typeof window === 'undefined') {
        return [];
    }

    return ['GutenverseConfig', 'GutenverseDashboard', 'GutenverseData']
        .map((key) => window[key])
        .filter(Boolean);
};

const isValidPricingPlan = (pricingPlan) => Boolean(
    pricingPlan
    && typeof pricingPlan === 'object'
    && Array.isArray(pricingPlan?.active_promotion)
    && Object.prototype.hasOwnProperty.call(pricingPlan, 'is_event_sales')
    && Object.prototype.hasOwnProperty.call(pricingPlan, 'event_expired')
);

const normalizePricingPlan = (pricingPlan = null) => ({
    ...DEFAULT_PRICING_PLAN,
    ...(isValidPricingPlan(pricingPlan) ? pricingPlan : {}),
});

const setRuntimePricingPlan = (pricingPlan) => {
    if (typeof window === 'undefined') {
        return pricingPlan;
    }

    window.GutenverseTempPricingData = pricingPlan;

    getRuntimeObjects().forEach((runtime) => {
        runtime.pricingPlan = pricingPlan;
    });

    return pricingPlan;
};

const getPricingPlanFallback = () => {
    const runtime = getRuntimeObjects()[0] || {};

    return normalizePricingPlan(runtime?.pricingPlan);
};

const ensurePricingPlanData = ({ force = false } = {}) => {
    if (!force && pricingPlanPromise) {
        return pricingPlanPromise;
    }

    const tempPricingPlan = normalizePricingPlan(getTempPricingPlanData());

    if (!force && getTempPricingPlanData()) {
        return Promise.resolve(setRuntimePricingPlan(tempPricingPlan));
    }

    const fallbackPricingPlan = getPricingPlanFallback();

    pricingPlanPromise = apiFetch({
        path: PRICING_PLAN_API_PATH,
        method: 'GET',
    })
        .then((response) => {
            const pricingPlan = response?.pricingPlan || response;

            if (!isValidPricingPlan(pricingPlan)) {
                return fallbackPricingPlan;
            }

            return setRuntimePricingPlan(normalizePricingPlan(pricingPlan));
        })
        .catch(() => fallbackPricingPlan)
        .finally(() => {
            pricingPlanPromise = null;
        });

    return pricingPlanPromise;
};

const prefetchPricingPlanData = () => {
    ensurePricingPlanData();
};

export {
    DEFAULT_PRICING_PLAN,
    ensurePricingPlanData,
    getPricingPlanFallback,
    prefetchPricingPlanData,
};
