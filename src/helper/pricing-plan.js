import apiFetch from '@wordpress/api-fetch';

const PRICING_PLAN_API_PATH = 'gutenverse-client/v1/pricing-plan';
const DEFAULT_PRICING_PLAN = {
    active_promotion: [],
    is_event_sales: false,
    event_expired: '',
    checkout_provider: 'default',
    default_checkout_url: '',
};

const PRICING_PLAN_PROMISE_KEY = 'GutenverseTempPricingDataPromise';

const getTempPricingPlanData = () => {
    if (typeof window === 'undefined') {
        return null;
    }

    return window.GutenverseTempPricingData || null;
};

const getPricingPlanPromise = () => {
    if (typeof window === 'undefined') {
        return null;
    }

    return window[PRICING_PLAN_PROMISE_KEY] || null;
};

const setPricingPlanPromise = (promise) => {
    if (typeof window === 'undefined') {
        return promise;
    }

    if (promise) {
        window[PRICING_PLAN_PROMISE_KEY] = promise;
    } else {
        delete window[PRICING_PLAN_PROMISE_KEY];
    }

    return promise;
};

const getRuntimeObjects = () => {
    if (typeof window === 'undefined') {
        return [];
    }

    return ['GutenverseConfig', 'GutenverseDashboard', 'GutenverseData']
        .map((key) => window[key])
        .filter(Boolean);
};

const getFallbackRuntimeObjects = () => {
    if (typeof window === 'undefined') {
        return [];
    }

    return ['GutenverseDashboard', 'GutenverseConfig', 'GutenverseData']
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
    const runtime = getFallbackRuntimeObjects().find((item) => isValidPricingPlan(item?.pricingPlan)) || {};

    return normalizePricingPlan(runtime?.pricingPlan);
};

const hasRuntimePricingPlanFallback = () => getFallbackRuntimeObjects()
    .some((item) => isValidPricingPlan(item?.pricingPlan));

const ensurePricingPlanData = ({ force = false } = {}) => {
    const tempPricingPlan = normalizePricingPlan(getTempPricingPlanData());
    const fallbackPricingPlan = getPricingPlanFallback();

    if (!force && getTempPricingPlanData()) {
        return Promise.resolve(setRuntimePricingPlan(tempPricingPlan));
    }

    if (!force && hasRuntimePricingPlanFallback()) {
        return Promise.resolve(setRuntimePricingPlan(fallbackPricingPlan));
    }

    if (!force && getPricingPlanPromise()) {
        return getPricingPlanPromise();
    }

    const pricingPlanPromise = apiFetch({
        path: PRICING_PLAN_API_PATH,
        method: 'GET',
    })
        .then((response) => {
            const pricingPlan = response?.pricingPlan || response;

            if (!isValidPricingPlan(pricingPlan)) {
                return setRuntimePricingPlan(fallbackPricingPlan);
            }

            return setRuntimePricingPlan(normalizePricingPlan(pricingPlan));
        })
        .catch(() => setRuntimePricingPlan(fallbackPricingPlan))
        .finally(() => {
            setPricingPlanPromise(null);
        });

    return setPricingPlanPromise(pricingPlanPromise);
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
