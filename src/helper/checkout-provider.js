// Select checkout only from the product's server response.
const PROVIDERS = ['freemius', 'lemon_squeezy', 'default'];
const ALIASES = { lemon: 'lemon_squeezy', lemonsqueezy: 'lemon_squeezy', 'lemon-squeezy': 'lemon_squeezy' };

const resolveCheckoutProvider = (pricingPlan = {}) => {
    const value = pricingPlan?.checkout_provider || pricingPlan?.payment_provider || pricingPlan?.gateway || 'default';
    const provider = typeof value === 'string' ? value.trim().toLowerCase() : '';
    const normalized = ALIASES[provider] || provider;
    return PROVIDERS.includes(normalized) ? normalized : 'default';
};

const getFreemiusCheckoutConfig = (pricingPlan = {}) => {
    const config = {
        product_id: pricingPlan?.product_id || pricingPlan?.freemius_product_id,
        public_key: pricingPlan?.public_key || pricingPlan?.freemius_public_key,
    };
    const sandbox = pricingPlan?.sandbox || pricingPlan?.freemius_sandbox;
    if (sandbox) config.sandbox = sandbox;
    return config;
};

export { resolveCheckoutProvider, getFreemiusCheckoutConfig };
