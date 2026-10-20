import apiFetch from '@wordpress/api-fetch';
import { __, sprintf } from '@wordpress/i18n';
import { IconCloseSVG } from 'gutenverse-core/icons';
import { useEffect, useRef, useState } from '@wordpress/element';
import { Checkout } from '@freemius/checkout';
import { ensurePricingPlanData, getPricingPlanFallback } from '../../helper/jnews-pricing-plan';

const JNEWS_TRACKING_TIMEOUT = 2000;
const JNEWS_CLOSE_REQUEST_EVENT = 'jnews-blocks:pricing-popup-close-request';
const JNEWS_TRACKING_API_PATH = 'gutenverse-client/v1/freemius/checkout-tracking';
const JNEWS_LEMON_CHECKOUT_URL_API_PATH = 'gutenverse-client/v1/lemon-squeezy/jnews-checkout-url';
const JNEWS_LEMON_JS_URL = 'https://app.lemonsqueezy.com/js/lemon.js';
const JNEWS_LEMON_SCRIPT_ID = 'gutenverse-lemon-squeezy-js';
const JNEWS_DEFAULT_CHECKOUT_PROVIDER = 'default';
const JNEWS_CHECKOUT_PROVIDERS = ['freemius', 'lemon_squeezy', 'default'];
const JNEWS_CHECKOUT_PROVIDER_ALIASES = {
    lemon: 'lemon_squeezy',
    lemonsqueezy: 'lemon_squeezy',
    'lemon-squeezy': 'lemon_squeezy',
};

const JNEWS_BADGES = [
    __('All Features Included', 'jnews-blocks'),
    __('Dedicated Support', 'jnews-blocks'),
    __('Money-Back Guarantee', 'jnews-blocks'),
];

const JNEWS_FEATURES = {
    main: [
        { label: __('1 Sites Licenses', 'jnews-blocks'), include: ['all'] },
        { label: __('78+ Demos', 'jnews-blocks'), include: ['all'] },
        { label: __('1 year priority support', 'jnews-blocks'), include: ['all'] },
        { label: __('Priority updates & new features', 'jnews-blocks'), include: ['all'] },
        { label: __('Speed optimizer', 'jnews-blocks'), include: ['all'] },
        { label: __('SEO optimizer', 'jnews-blocks'), include: ['all'] },
        { label: __('2x faster performance', 'jnews-blocks'), include: ['all'] },
    ],
};

const JNEWS_PLAN_DESCRIPTIONS = {
    personal: __('Suitable for single site publishing.', 'jnews-blocks'),
    professional: __('Best for growing publishers and lean teams.', 'jnews-blocks'),
    agency: __('Built for agencies managing many sites.', 'jnews-blocks'),
};

const JNEWS_FEATURE_GROUP_TITLES = {
    main: __('', 'jnews-blocks'),
};

const JNEWS_LIMITED_BADGE_LABEL = __('Limited', 'jnews-blocks');

const formatPrice = (value, currency = 'USD') => {
    if (typeof value !== 'number' || Number.isNaN(value)) {
        return null;
    }

    return new Intl.NumberFormat(undefined, {
        style: 'currency',
        currency,
        minimumFractionDigits: value % 1 === 0 ? 0 : 1,
        maximumFractionDigits: 1,
    }).format(value);
};

const getPlanFeatureGroups = (slug) => Object.entries(JNEWS_FEATURES)
    .map(([groupKey, features]) => ({
        key: groupKey,
        title: JNEWS_FEATURE_GROUP_TITLES[groupKey],
        features: features
            .filter(({ include = [] }) => include.includes('all') || include.includes(slug))
            .map((feature) => ({
                ...feature,
                isLimited: feature?.limited?.includes(slug),
                isExcept: feature?.except?.includes(slug),
            })),
    }))
    .filter(({ features }) => features.length);

const isEventExpired = (eventExpired) => {
    if (!eventExpired) {
        return true;
    }

    const expiredAt = new Date(eventExpired);

    if (Number.isNaN(expiredAt.getTime())) {
        return true;
    }

    return expiredAt.getTime() <= Date.now();
};

const normalizePlan = (plan, { eventExpired = false } = {}) => {
    const slug = plan?.slug || '';
    const currency = plan?.currency || 'USD';
    const actualPrice = plan?.actual_price;
    const discountAmount = Number(plan?.discount_amount || 0);
    const discountedPrice = plan?.discounted_price;
    const hasDiscount = discountAmount > 0 && actualPrice;
    const showDiscount = hasDiscount && !eventExpired;
    const billedAnnualPrice = showDiscount ? discountedPrice : actualPrice || discountedPrice;
    const displayedMonthlyPrice = billedAnnualPrice / 12;
    const regularMonthlyPrice = actualPrice / 12;

    return {
        ...plan,
        name: plan?.label || plan?.name || '',
        featured: Boolean(plan?.is_featured) || slug === 'professional',
        price: formatPrice(displayedMonthlyPrice, currency) || __('Contact Us', 'jnews-blocks'),
        oldPrice: showDiscount ? formatPrice(regularMonthlyPrice, currency) : null,
        billed: '',
        renewal: showDiscount
            ? sprintf(
                __('Renew at regular rate %s/year', 'jnews-blocks'),
                formatPrice(actualPrice, currency)
            )
            : sprintf(
                __('Renew at regular rate %s/year', 'jnews-blocks'),
                formatPrice(actualPrice, currency)
            ),
        description: JNEWS_PLAN_DESCRIPTIONS[slug] || __('Upgrade to unlock more JNews Blocks features.', 'jnews-blocks'),
        sale: showDiscount ? sprintf(__('%s%% off', 'jnews-blocks'), discountAmount) : null,
    };
};

const normalizeCheckoutProvider = (provider = JNEWS_DEFAULT_CHECKOUT_PROVIDER) => {
    const normalizedProvider = JNEWS_CHECKOUT_PROVIDER_ALIASES[provider] || provider;

    return JNEWS_CHECKOUT_PROVIDERS.includes(normalizedProvider) ? normalizedProvider : JNEWS_DEFAULT_CHECKOUT_PROVIDER;
};

let lemonScriptPromise = null;

const isLemonSqueezyReady = () => (
    typeof window !== 'undefined'
    && window?.LemonSqueezy?.Url
    && typeof window.LemonSqueezy.Url.Open === 'function'
);

const initializeLemonSqueezy = () => {
    if (isLemonSqueezyReady()) {
        return window.LemonSqueezy;
    }

    if (typeof window !== 'undefined' && typeof window.createLemonSqueezy === 'function') {
        window.createLemonSqueezy();
    }

    return isLemonSqueezyReady() ? window.LemonSqueezy : null;
};

const ensureLemonSqueezyLoaded = () => {
    const lemonSqueezy = initializeLemonSqueezy();

    if (lemonSqueezy) {
        return Promise.resolve(lemonSqueezy);
    }

    if (lemonScriptPromise) {
        return lemonScriptPromise;
    }

    lemonScriptPromise = new Promise((resolve, reject) => {
        if (typeof document === 'undefined') {
            reject(new Error(__('Lemon Squeezy checkout is not available.', 'jnews-blocks')));
            return;
        }

        let attempts = 0;
        const maxAttempts = 200;
        const checkReady = () => {
            const nextLemonSqueezy = initializeLemonSqueezy();

            if (nextLemonSqueezy) {
                resolve(nextLemonSqueezy);
                return;
            }

            if (attempts >= maxAttempts) {
                reject(new Error(__('Lemon Squeezy checkout script failed to initialize.', 'jnews-blocks')));
                return;
            }

            attempts += 1;
            window.setTimeout(checkReady, 50);
        };

        let script = document.getElementById(JNEWS_LEMON_SCRIPT_ID)
            || document.querySelector('script[src*="app.lemonsqueezy.com/js/lemon.js"]');

        if (!script) {
            script = document.createElement('script');
            script.id = JNEWS_LEMON_SCRIPT_ID;
            script.src = JNEWS_LEMON_JS_URL;
            script.defer = true;
            script.async = true;
            document.head.appendChild(script);
        }

        script.addEventListener('load', checkReady);
        script.addEventListener('error', () => {
            reject(new Error(__('Failed to load Lemon Squeezy checkout script.', 'jnews-blocks')));
        }, { once: true });

        checkReady();
    }).catch((error) => {
        lemonScriptPromise = null;
        throw error;
    });

    return lemonScriptPromise;
};


const JNewsPopupPricingPlan = ({ onClose, pricingUrl = '' }) => {
    const runtime = window['GutenverseConfig'] ? window['GutenverseConfig'] : window['GutenverseDashboard'];
    const [pricingPlan, setPricingPlan] = useState(() => getPricingPlanFallback());
    const [checkoutRequest, setCheckoutRequest] = useState({ planKey: null, loading: false, error: '' });
    const plans = (pricingPlan.active_promotion || []).map((plan) => normalizePlan(plan, {
        eventExpired: isEventExpired(pricingPlan?.event_expired),
    }));
    const fsCheckoutRef = useRef(null);
    const closePromiseRef = useRef(null);
    const hasClosedRef = useRef(false);
    const handleCloseRef = useRef(null);
    const lemonCheckoutRequestRef = useRef(false);
    const hasPlans = plans.length > 0;
    const checkoutProvider = normalizeCheckoutProvider(pricingPlan?.checkout_provider || pricingPlan?.payment_provider);
    const isPreparingLemonCheckout = 'lemon_squeezy' === checkoutProvider && checkoutRequest.loading;

    const getTrackingPayload = ({ action, plan = null, checkoutData = null } = {}) => {
        let searchParams = null;

        try {
            searchParams = new URL(pricingUrl || runtime?.upgradeProUrl || '').searchParams;
        } catch (error) {
            searchParams = null;
        }

        return {
            action,
            source: searchParams?.get('utm_source') || 'jnews-blocks',
            medium: searchParams?.get('utm_medium') || 'pricing-popup',
            campaign: searchParams?.get('utm_campaign') || pricingPlan?.event_name || 'freemius-checkout',
            client_site: searchParams?.get('utm_client_site') || runtime?.clientUrl || runtime?.url || window?.location?.origin || '',
            client_theme: searchParams?.get('utm_client_theme') || runtime?.activeTheme || '',
            current_url: window?.location?.href || '',
            pricing_url: pricingUrl || runtime?.upgradeProUrl || '',
            product_id: pricingPlan?.product_id || null,
            plan_id: plan?.plan_id || checkoutData?.plan_id || null,
            pricing_id: plan?.pricing_id || checkoutData?.pricing_id || null,
            plan_slug: plan?.slug || null,
            plan_name: plan?.name || null,
            coupon_code: isEventExpired(pricingPlan?.event_expired) ? '' : plan?.coupon_code,
            discount_amount: isEventExpired(pricingPlan?.event_expired) ? '' : plan?.discount_amount,
            external_id: checkoutData?.purchase?.license_id,
            checkout_data: checkoutData,
        };
    };

    const getPlanKey = (plan) => plan?.slug || plan?.plan_id || plan?.pricing_id || plan?.name;

    const sendTrackingData = async (payload) => {
        if (!payload?.pricing_url) {
            return;
        }

        const controller = typeof AbortController !== 'undefined' ? new AbortController() : null;
        const timeoutId = controller ? window.setTimeout(() => controller.abort(), JNEWS_TRACKING_TIMEOUT) : null;

        try {
            await apiFetch({
                path: JNEWS_TRACKING_API_PATH,
                method: 'POST',
                data: payload,
                signal: controller?.signal,
            });
        } catch (error) {
            return null;
        } finally {
            if (timeoutId) {
                window.clearTimeout(timeoutId);
            }
        }
    };

    const handleClose = ({ action = 'close_popup', plan = null, checkoutData = null } = {}) => {
        if (hasClosedRef.current) {
            return closePromiseRef.current;
        }

        hasClosedRef.current = true;
        onClose();
        closePromiseRef.current = sendTrackingData(getTrackingPayload({ action, plan, checkoutData }))
            .finally(() => {
                closePromiseRef.current = null;
            });

        return closePromiseRef.current;
    };

    handleCloseRef.current = handleClose;

    useEffect(() => {
        let isMounted = true;

        ensurePricingPlanData().then((nextPricingPlan) => {
            if (isMounted) {
                setPricingPlan(nextPricingPlan);
            }
        });

        const requestClose = () => {
            handleCloseRef.current?.();
        };

        document.addEventListener(JNEWS_CLOSE_REQUEST_EVENT, requestClose);

        return () => {
            isMounted = false;
            lemonCheckoutRequestRef.current = false;
            document.removeEventListener(JNEWS_CLOSE_REQUEST_EVENT, requestClose);
        };
    }, []);

    const getLemonCheckoutPayload = (plan) => {
        const trackingPayload = getTrackingPayload({ action: 'lemon_checkout_open', plan });
        const lemonVariantId = plan?.lemon_variant_id || plan?.variant_id || '';

        return {
            product_id: plan?.product_id || pricingPlan?.product_id || '',
            variant_id: lemonVariantId,
            lemon_variant_id: lemonVariantId,
            plan_slug: plan?.slug || '',
            tier: plan?.tier || plan?.slug || '',
            plan_name: plan?.name || '',
            coupon_code: trackingPayload?.coupon_code || '',
            source: trackingPayload?.source || '',
            medium: trackingPayload?.medium || '',
            campaign: trackingPayload?.campaign || '',
            client_site: trackingPayload?.client_site || '',
            client_theme: trackingPayload?.client_theme || '',
            current_url: trackingPayload?.current_url || '',
            pricing_url: trackingPayload?.pricing_url || '',
            custom: {
                action: trackingPayload?.action || '',
                source: trackingPayload?.source || '',
                medium: trackingPayload?.medium || '',
                campaign: trackingPayload?.campaign || '',
                client_site: trackingPayload?.client_site || '',
                client_theme: trackingPayload?.client_theme || '',
                current_url: trackingPayload?.current_url || '',
                pricing_url: trackingPayload?.pricing_url || '',
            },
        };
    };

    const handleLemonCheckoutSuccess = (plan, checkoutData) => {
        sendTrackingData(getTrackingPayload({
            action: 'checkout_success',
            plan,
            checkoutData,
        }));
    };

    const handleLemonCheckout = async (plan) => {
        if (lemonCheckoutRequestRef.current) {
            return;
        }

        lemonCheckoutRequestRef.current = true;
        const planKey = getPlanKey(plan);

        setCheckoutRequest({ planKey, loading: true, error: '' });

        try {
            const response = await apiFetch({
                path: JNEWS_LEMON_CHECKOUT_URL_API_PATH,
                method: 'POST',
                data: getLemonCheckoutPayload(plan),
            });

            const checkoutUrl = response?.checkout_url || '';

            if (!checkoutUrl) {
                throw new Error(response?.message || __('No checkout URL returned.', 'jnews-blocks'));
            }

            const lemonCheckout = await ensureLemonSqueezyLoaded();
            lemonCheckout.Setup?.({
                eventHandler: (event) => {
                    if ('Checkout.Success' === event?.event) {
                        handleLemonCheckoutSuccess(plan, event?.data || event);
                    }
                },
            });
            lemonCheckoutRequestRef.current = false;
            setCheckoutRequest({ planKey: null, loading: false, error: '' });
            onClose();
            lemonCheckout.Url.Open(checkoutUrl);
        } catch (error) {
            lemonCheckoutRequestRef.current = false;
            setCheckoutRequest({
                planKey,
                loading: false,
                error: error?.message || __('Failed to request Lemon checkout URL.', 'jnews-blocks'),
            });
        }
    };

    const handleCheckout = (plan) => {
        if ('lemon_squeezy' === checkoutProvider) {
            handleLemonCheckout(plan);
            return;
        }

        if ('default' === checkoutProvider) {
            const checkoutUrl = pricingPlan?.default_checkout_url || pricingUrl || runtime?.upgradeProUrl || '';

            if (checkoutUrl) {
                window.open(checkoutUrl, '_blank', 'noopener,noreferrer');
            }

            return;
        }

        if (!pricingPlan?.public_key || !pricingPlan?.product_id) {
            return;
        }

        if (!fsCheckoutRef.current) {
            const checkoutOptions = {
                product_id: pricingPlan?.product_id,
                public_key: pricingPlan?.public_key,
            };

            if (pricingPlan?.sandbox) {
                checkoutOptions.sandbox = pricingPlan?.sandbox;
            }

            fsCheckoutRef.current = new Checkout(checkoutOptions);
        }

        const openOptions = {
            title: __('JNews Blocks Checkout', 'jnews-blocks'),
            plan_id: plan.plan_id,
            pricing_id: plan.pricing_id,
            billing_cycle: 'annual',
            currency: 'auto',
            readonly_user: true,
            coupon: isEventExpired(pricingPlan?.event_expired) ? '' : plan?.coupon_code,
            success: (data) => handleClose({ action: 'checkout_success', plan, checkoutData: data }),
        };

        fsCheckoutRef.current.open(openOptions);
    };

    return (
        <div className="jnews-blocks-pricing-popup">
            <button
                type="button"
                className="jnews-blocks-pricing-popup__close"
                aria-label={__('Close pricing popup', 'jnews-blocks')}
                onClick={() => onClose()}
            >
                <IconCloseSVG size={20} />
            </button>
            <div className="jnews-blocks-pricing-popup__hero">
                {hasPlans ? <><h2 className="jnews-blocks-pricing-popup__title">{__('Simple Pricing, Everything Included', 'jnews-blocks')}</h2>
                    <p className="jnews-blocks-pricing-popup__subtitle">
                        {__('The full JNews Twenty experience at any scale. No features held back.', 'jnews-blocks')}
                    </p>
                    <div className="jnews-blocks-pricing-popup__badges">
                        {JNEWS_BADGES.map((badge) => (
                            <span key={badge} className="jnews-blocks-pricing-popup__badge">{badge}</span>
                        ))}
                    </div></> : <>
                    <div className="jnews-blocks-pricing-popup__empty-state">
                        <h2 className="jnews-blocks-pricing-popup__title">{__('Pricing plans are currently under maintenance.', 'jnews-blocks')}</h2>
                        <p className="jnews-blocks-pricing-popup__subtitle">{__('Please check back soon. New plans will be available soon.', 'jnews-blocks')}</p>
                    </div>
                </>
                }
            </div>
            <div className="jnews-blocks-pricing-popup__cards">
                {hasPlans && plans.map((plan) => {
                    const planFeatureGroups = getPlanFeatureGroups(plan.slug);
                    const planKey = getPlanKey(plan);
                    const isRequestingCheckout = checkoutRequest.loading && checkoutRequest.planKey === planKey;
                    const isCheckoutDisabled = isPreparingLemonCheckout;
                    const checkoutError = checkoutRequest.planKey === planKey ? checkoutRequest.error : '';

                    return (
                        <article
                            key={plan.name}
                            className={`jnews-blocks-pricing-card${plan.featured ? ' is-featured' : ''}`}
                        >
                            {plan.featured && <span className="jenws-blocks-pricing-card__popular">
                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
                                    <g clipPath="url(#clip0_6584_7920)">
                                        <path d="M11.2543 6.15004C11.0818 5.92504 10.8717 5.73004 10.6767 5.53504C10.1742 5.08503 9.60424 4.76253 9.12424 4.29003C8.00673 3.19502 7.75923 1.38751 8.47174 0C7.75923 0.172501 7.13673 0.562504 6.60422 0.990006C4.66171 2.55002 3.89671 5.30253 4.81171 7.66505C4.84171 7.74005 4.87171 7.81505 4.87171 7.91255C4.87171 8.07755 4.75921 8.22755 4.60921 8.28755C4.43671 8.36255 4.25671 8.31755 4.11421 8.19755C4.07164 8.16189 4.03604 8.11867 4.00921 8.07005C3.1617 6.99754 3.0267 5.46003 3.5967 4.23003C2.3442 5.25003 1.66169 6.97504 1.75919 8.60256C1.80419 8.97756 1.84919 9.35256 1.97669 9.72756C2.08169 10.1776 2.2842 10.6276 2.5092 11.0251C3.3192 12.3226 4.72171 13.2526 6.22922 13.4401C7.83423 13.6426 9.55174 13.3501 10.7818 12.2401C12.1543 10.9951 12.6343 9.00006 11.9293 7.29005L11.8318 7.09505C11.6743 6.75004 11.2543 6.15004 11.2543 6.15004ZM8.88424 10.8751C8.67424 11.0551 8.32923 11.2501 8.05923 11.3251C7.21923 11.6251 6.37922 11.2051 5.88422 10.7101C6.77672 10.5001 7.30923 9.84006 7.46673 9.17256C7.59423 8.57255 7.35423 8.07755 7.25673 7.50005C7.16673 6.94504 7.18173 6.47254 7.38423 5.95504C7.52673 6.24004 7.67673 6.52504 7.85673 6.75004C8.43424 7.50005 9.34174 7.83005 9.53674 8.85006C9.56674 8.95506 9.58174 9.06006 9.58174 9.17256C9.60424 9.78756 9.33424 10.4626 8.88424 10.8751Z" fill="white"/>
                                    </g>
                                    <defs>
                                        <clipPath id="clip0_6584_7920">
                                            <rect width="14" height="14" fill="white"/>
                                        </clipPath>
                                    </defs>
                                </svg>
                                {__('Popular Plan', 'jnews-blocks')}
                            </span>}
                            <div className="jnews-blocks-pricing-card__header">
                                <h3>{plan.name}</h3>
                            </div>
                            <div className="jnews-blocks-pricing-card__body">
                                <div className="jnews-blocks-pricing-card__pricing">
                                    <div className="jnews-blocks-pricing-card__old-price-container">
                                        {plan.oldPrice && <span className="jnews-blocks-pricing-card__old-price">{plan.oldPrice}</span>}
                                        {plan.sale && <span className="jnews-blocks-pricing-card__sale">{plan.sale}</span>}
                                    </div>
                                    <div className="jnews-blocks-pricing-card__price-row">
                                        <span className="jnews-blocks-pricing-card__price">{plan.price}</span>
                                        <span className="jnews-blocks-pricing-card__period">{__('/mo', 'jnews-blocks')}</span>
                                    </div>
                                    {plan.renewal && <p className="jnews-blocks-pricing-card__renewal">{plan.renewal}</p>}
                                </div>
                                <div
                                    className="jnews-blocks-pricing-card__button"
                                    aria-disabled={isCheckoutDisabled}
                                    onClick={() => {
                                        if (!isCheckoutDisabled) {
                                            handleCheckout(plan);
                                        }
                                    }}
                                >
                                    <span>{isRequestingCheckout ? __('Preparing Checkout...', 'jnews-blocks') : __('Purchase Now', 'jnews-blocks')}</span>
                                    <span aria-hidden="true" style={{fontSize: '13px'}}>
                                        <svg width="14" height="10" viewBox="0 0 14 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M13.4596 5.24477C13.7135 4.99093 13.7135 4.57938 13.4596 4.32554L9.32304 0.188962C9.0692 -0.0648793 8.65765 -0.0648792 8.40381 0.188962C8.14996 0.442802 8.14996 0.85436 8.40381 1.1082L12.0808 4.78516L8.40381 8.46211C8.14997 8.71595 8.14997 9.12751 8.40381 9.38135C8.65765 9.63519 9.0692 9.63519 9.32305 9.38135L13.4596 5.24477ZM0 4.78516L5.68248e-08 5.43516L13 5.43516L13 4.78516L13 4.13516L-5.68248e-08 4.13516L0 4.78516Z" fill="white"/>
                                        </svg>
                                    </span>
                                </div>
                                {checkoutError && (
                                    <div className="jnews-blocks-pricing-card__checkout-error">
                                        {checkoutError}
                                    </div>
                                )}
                                <p className="jnews-blocks-pricing-card__description">{plan.description}</p>
                                <div className="jnews-blocks-pricing-card__feature-groups">
                                    {planFeatureGroups.map((group) => (
                                        <div
                                            key={`${plan.name}-${group.key}`}
                                            className="jnews-blocks-pricing-card__feature-group"
                                        >
                                            <h4 className="jnews-blocks-pricing-card__feature-title">{group.title}</h4>
                                            <ul className="jnews-blocks-pricing-card__features">
                                                {group.features.map((feature) => (
                                                    <li
                                                        key={`${plan.name}-${group.key}-${feature.label}`}
                                                        className={feature.isExcept ? 'is-except' : ''}
                                                    >
                                                        <svg width="14" height="10" viewBox="0 0 14 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path fillRule="evenodd" clipRule="evenodd" d="M1.66667 3.33333L0 5L5 10L13.3333 1.66667L11.6667 0L5 6.66667L1.66667 3.33333Z" fill="black"/>
                                                        </svg>
                                                        <span>{feature.label}</span>
                                                        {feature.isLimited && (
                                                            <span className="jnews-blocks-pricing-card__feature-badge">
                                                                {JNEWS_LIMITED_BADGE_LABEL}
                                                            </span>
                                                        )}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </article>
                    );
                })
                }
            </div>
        </div>
    );
};

export default JNewsPopupPricingPlan;
