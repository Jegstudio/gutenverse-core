import { __, sprintf } from '@wordpress/i18n';
import { IconCloseSVG } from 'gutenverse-core/icons';
import { useEffect, useState } from '@wordpress/element';

const BADGES = [
    __('No Credit Card Required', 'gutenverse'),
    __('Lifetime Support', 'gutenverse'),
    __('Money-Back Guarantee', 'gutenverse'),
];

const FEATURES = {
    main: [
        { label: __('1 Sites Licenses', 'gutenverse'), include: ['basic'] },
        { label: __('10 Sites Licenses', 'gutenverse'), include: ['professional'] },
        { label: __('100 Sites Licenses', 'gutenverse'), include: ['agency'] },
        { label: __('1000 Sites Licenses', 'gutenverse'), include: ['enterprise'] },
        { label: __('Priority Support', 'gutenverse'), include: ['all'] },
        { label: __('Lifetime Updates', 'gutenverse'), include: ['all'] },
    ],
    essential_features: [
        { label: __('User-First UI/UX', 'gutenverse'), include: ['all'] },
        { label: __('FSE (Full Site Editing) Compatible', 'gutenverse'), include: ['all'] },
        { label: __('Smooth Responsive Editor Preview', 'gutenverse'), include: ['all'] },
        { label: __('Global Color & Typography', 'gutenverse'), include: ['all'] },
        { label: __('Multipurpose Blocks', 'gutenverse'), include: ['all'], limited: ['basic'] },
        { label: __('Form Blocks', 'gutenverse'), include: ['all'], limited: ['basic'] },
        { label: __('News Blocks', 'gutenverse'), include: ['all'], limited: ['basic'] },
    ],
    fse: [
        { label: __('Latest Native WordPress Standard', 'gutenverse'), include: ['all'] },
        { label: __('Seamless Editing', 'gutenverse'), include: ['all'] },
        { label: __('Custom Editor Responsive Breakpoints', 'gutenverse'), include: ['all'] },
        { label: __('Custom Header', 'gutenverse'), include: ['all'] },
        { label: __('Custom Footer', 'gutenverse'), include: ['all'] },
        { label: __('Custom Templates', 'gutenverse'), include: ['all'] },
        { label: __('Custom Patterns', 'gutenverse'), include: ['all'] },
        { label: __('Custom Pages', 'gutenverse'), include: ['all'] },
        { label: __('Custom Archives', 'gutenverse'), include: ['all'] },
    ],
    demo: [
        { label: __('10 Unibiz Demos'), include: ['basic'] },
        { label: __('50 Unibiz Demos', 'gutenverse'), include: ['professional', 'agency', 'enterprise'] },
        { label: __('350+ Section Template', 'gutenverse'), include: ['basic'] },
        { label: __('800+ Section Template', 'gutenverse'), include: ['professional', 'agency', 'enterprise'] },
        { label: __('25 Layouts', 'gutenverse'), include: ['basic'] },
        { label: __('40 Layouts', 'gutenverse'), include: ['professional', 'agency', 'enterprise'] },
        { label: __('4000+ Icons', 'gutenverse'), include: ['all'] },
        { label: __('One Click Import', 'gutenverse'), include: ['all'] },
    ],
    animation: [
        { label: __('Standard Animation Effects', 'gutenverse'), include: ['all'] },
        { label: __('Responsive Animation Breakpoints', 'gutenverse'), include: ['all'] },
        { label: __('Advanced Animation Effect', 'gutenverse'), include: ['all'], except: ['basic'] },
        { label: __('Layout Animation', 'gutenverse'), include: ['all'], except: ['basic'] },
        { label: __('Mouse Animation Effects', 'gutenverse'), include: ['all'], except: ['basic'] },
        { label: __('Background Animation Effects', 'gutenverse'), include: ['all'], except: ['basic'] },
        { label: __('Lottie Animation Support', 'gutenverse'), include: ['all'], except: ['basic'] },
    ],
    adv_script_style: [
        { label: __('Advance Responsive Control', 'gutenverse'), include: ['all'] },
        { label: __('Shape Divider', 'gutenverse'), include: ['all'] },
        { label: __('Sticky Block', 'gutenverse'), include: ['all'], limited: ['basic'] },
        { label: __('Advance Visual Effect & Styling', 'gutenverse'), include: ['all'], limited: ['basic'] },
        { label: __('Custom JS & CSS Scripts', 'gutenverse'), include: ['all'], except: ['basic'] },
        { label: __('Custom Font', 'gutenverse'), include: ['all'], except: ['basic'] },
    ],
    data_builder: [
        { label: __('Mega Menu Builder', 'gutenverse'), include: ['all'], except: ['basic'] },
        { label: __('Dynamic Data', 'gutenverse'), include: ['all'], except: ['basic'] },
        { label: __('Conditional Logic Content', 'gutenverse'), include: ['all'], except: ['basic'] },
        { label: __('Advance Slider', 'gutenverse'), include: ['all'], except: ['basic'] },
        { label: __('Advance Tabs', 'gutenverse'), include: ['all'] },
    ],
    popup: [
        { label: __('Drag and drop Popup builder', 'gutenverse'), include: ['all'] },
        { label: __('Popup Builder', 'gutenverse'), include: ['all'], limited: ['basic'] },
        { label: __('Advance Trigger Options', 'gutenverse'), include: ['all'], except: ['basic'] },
    ],
    news: [
        { label: __('Advance Posts Filter', 'gutenverse'), include: ['all'] },
        { label: __('Advance Posts Sorting', 'gutenverse'), include: ['all'] },
        { label: __('Advance Posts Blocks', 'gutenverse'), include: ['all'], limited: ['basic'] },
        { label: __('Single Posts Blocks', 'gutenverse'), include: ['all'], limited: ['basic'] },
        { label: __('News Archives Blocks', 'gutenverse'), include: ['all'], limited: ['basic'] },
        { label: __('Unique Content Group', 'gutenverse'), include: ['all'], limited: ['basic'] },
        { label: __('Auto Update RSS Blocks', 'gutenverse'), include: ['all'], except: ['basic'] },
        { label: __('Single Post Pagination', 'gutenverse'), include: ['all'], except: ['basic'] },
    ],
    form: [
        { label: __('Basic Form Block & Builder', 'gutenverse'), include: ['all'] },
        { label: __('Custom Actions', 'gutenverse'), include: ['all'] },
        { label: __('Form Security & Compliance', 'gutenverse'), include: ['all'] },
        { label: __('Email & Notifications', 'gutenverse'), include: ['all'] },
        { label: __('Form Data Management', 'gutenverse'), include: ['all'] },
        { label: __('Advance Form Logic & inputs', 'gutenverse'), include: ['all'], limited: ['basic'] },
        { label: __('Advance Form Builder', 'gutenverse'), include: ['all'], limited: ['basic'] },
        { label: __('Payment Form', 'gutenverse'), include: ['all'], except: ['basic'] },
        { label: __('Multi Step Form', 'gutenverse'), include: ['all'], except: ['basic'] },
        { label: __('Calculation Form', 'gutenverse'), include: ['all'], except: ['basic'] },
    ],
    performance: [
        { label: __('FSE Optimized', 'gutenverse'), include: ['all'] },
        { label: __('Lightweight Assets', 'gutenverse'), include: ['all'] },
        { label: __('Optimize DOM Size', 'gutenverse'), include: ['all'] },
        { label: __('Modular & Minified JS/CSS', 'gutenverse'), include: ['all'] },
        { label: __('Lazy Loading & Responsive Images', 'gutenverse'), include: ['all'] },
        { label: __('Core Web Vitals Ready', 'gutenverse'), include: ['all'] },
        { label: __('Smart Style File Management', 'gutenverse'), include: ['all'] },
        { label: __('Instant Preload', 'gutenverse'), include: ['all'], except: ['basic'] },
    ],
    theme_builder: [
        { label: __('Drag and Drop Themes Creation', 'gutenverse'), include: ['all'] },
        { label: __('Advance Theme Styling & Customization', 'gutenverse'), include: ['all'] },
        { label: __('Global Style & fonts Manager', 'gutenverse'), include: ['all'] },
        { label: __('Modular & Minified JS/CSS', 'gutenverse'), include: ['all'] },
        { label: __('Lazy Loading & Responsive Images', 'gutenverse'), include: ['all'] },
        { label: __('Assets Manager', 'gutenverse'), include: ['all'] },
        { label: __('One Click Export', 'gutenverse'), include: ['all'] },
    ]
};

const PLAN_DESCRIPTIONS = {
    basic: __('Suitable for individual WordPress site users.', 'gutenverse'),
    professional: __('Ideal for users who own multiple WordPress sites.', 'gutenverse'),
    agency: __('Suitable for an agency who works for dozens of clients.', 'gutenverse'),
    enterprise: __('Great for enterprises who manage a lot of websites.', 'gutenverse'),
};

const DEFAULT_PRICING_PLAN = {
    active_promotion: [],
    is_event_sales: false,
    event_expired: '',
};

/**
 * Fetches live pricing data from the Freemius AJAX endpoint.
 *
 * @param {Object} config - Pricing config from window['JkitDashboardOption'].freemius.pricing.
 * @return {Promise<Object>} pricingData — { plugin, plans[], install, reviews }.
 */
export const fetchPricingData = (config) => {
    const {
        request_handler_url,
        sandbox,
        s_ctx_type,
        s_ctx_id,
        s_ctx_ts,
        s_ctx_secure,
    } = config;

    const params = { pricing_action: 'fetch_pricing_data', trial: 'false' };
    if (sandbox) params.sandbox = sandbox;
    if (s_ctx_type) params.s_ctx_type = s_ctx_type;
    if (s_ctx_id) params.s_ctx_id = s_ctx_id;
    if (s_ctx_ts) params.s_ctx_ts = s_ctx_ts;
    if (s_ctx_secure) params.s_ctx_secure = s_ctx_secure;

    const url = `${request_handler_url}&${new URLSearchParams(params).toString()}`;

    return fetch(url, { method: 'GET' })
        .then((res) => res.json())
        .then((data) => (data.data ? data.data : data));
};


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

const getPrimaryFeatures = (slug) => FEATURES.main
    .filter(({ include = [] }) => include.includes('all') || include.includes(slug))
    .map(({ label }) => label);

const getPreferredPricing = (pricing = [], currency = 'usd') => {
    const normalizedCurrency = String(currency || 'usd').toLowerCase();
    const visiblePricing = pricing.filter((item) => item && !item.is_hidden);
    const matchingCurrency = visiblePricing.filter((item) => String(item.currency || '').toLowerCase() === normalizedCurrency);
    const pricingPool = matchingCurrency.length ? matchingCurrency : visiblePricing;
    const annualPricing = pricingPool.filter((item) => typeof item.annual_price === 'number' && item.annual_price > 0);

    if (annualPricing.length) {
        return annualPricing.sort((first, second) => {
            const firstLicenses = Number.isFinite(first.licenses) ? first.licenses : Number.MAX_SAFE_INTEGER;
            const secondLicenses = Number.isFinite(second.licenses) ? second.licenses : Number.MAX_SAFE_INTEGER;

            return firstLicenses - secondLicenses;
        })[0];
    }

    return pricingPool[0] || null;
};

const mapFreemiusPlan = (plan, currency = 'usd') => {
    const pricing = getPreferredPricing(plan?.pricing || [], currency);

    if (!pricing) {
        return null;
    }

    return {
        plan_id: String(plan.id),
        price_id: String(pricing.id),
        label: plan.title || plan.name || '',
        slug: plan.name || '',
        discount_amount: '',
        discount_type: 'percentage',
        coupon_code: '',
        monthly_price: typeof pricing.monthly_price === 'number' ? pricing.monthly_price : null,
        annual_price: typeof pricing.annual_price === 'number' ? pricing.annual_price : null,
        lifetime_price: typeof pricing.lifetime_price === 'number' ? pricing.lifetime_price : null,
        licenses: Number.isFinite(pricing.licenses) ? pricing.licenses : null,
        currency: (pricing.currency || currency || 'usd').toUpperCase(),
        is_featured: Boolean(plan.is_featured),
    };
};

const normalizePlan = (plan) => {
    const slug = plan?.slug || '';
    const currency = plan?.currency || 'USD';
    const annualPrice = typeof plan?.annual_price === 'number' ? plan.annual_price : null;
    const monthlyPrice = typeof plan?.monthly_price === 'number' ? plan.monthly_price : null;
    const lifetimePrice = typeof plan?.lifetime_price === 'number' ? plan.lifetime_price : null;
    const discountAmount = Number(plan?.discount_amount || 0);
    const hasDiscount = discountAmount > 0 && annualPrice;
    const discountedAnnualPrice = hasDiscount ? annualPrice * ((100 - discountAmount) / 100) : annualPrice;
    const displayedMonthlyPrice = annualPrice
        ? discountedAnnualPrice / 12
        : monthlyPrice || lifetimePrice;
    const regularMonthlyPrice = annualPrice ? annualPrice / 12 : monthlyPrice;

    return {
        ...plan,
        name: plan?.label || plan?.name || '',
        featured: Boolean(plan?.is_featured) || slug === 'professional',
        price: formatPrice(displayedMonthlyPrice, currency) || __('Contact Us', 'gutenverse'),
        oldPrice: hasDiscount ? formatPrice(regularMonthlyPrice, currency) : null,
        billed: annualPrice
            ? sprintf(
                __('Billed annually. Pay %s/year today', 'gutenverse'),
                formatPrice(discountedAnnualPrice, currency)
            )
            : monthlyPrice
                ? __('Billed monthly.', 'gutenverse')
                : __('One-time payment.', 'gutenverse'),
        renewal: hasDiscount
            ? sprintf(
                __('Renew at regular rate %s/year', 'gutenverse'),
                formatPrice(annualPrice, currency)
            )
            : null,
        description: PLAN_DESCRIPTIONS[slug] || __('Upgrade to unlock more Gutenverse features.', 'gutenverse'),
        sale: hasDiscount ? sprintf(__('SALE %s%% Off', 'gutenverse'), discountAmount) : null,
        features: getPrimaryFeatures(slug),
    };
};

const fetchFreemiusPricingPlan = async (pricingConfig) => {
    if (!pricingConfig?.request_handler_url) {
        return DEFAULT_PRICING_PLAN;
    }
    const {
        request_handler_url,
        sandbox,
        s_ctx_type,
        s_ctx_id,
        s_ctx_ts,
        s_ctx_secure,
    } = pricingConfig;

    const params = {
        pricing_action: 'fetch_pricing_data',
        trial: 'false',
    };

    if (sandbox) params.sandbox = sandbox;
    if (s_ctx_type) params.s_ctx_type = s_ctx_type;
    if (s_ctx_id) params.s_ctx_id = s_ctx_id;
    if (s_ctx_ts) params.s_ctx_ts = s_ctx_ts;
    if (s_ctx_secure) params.s_ctx_secure = s_ctx_secure;

    console.log(request_handler_url, params, pricingConfig);
    
    const response = await fetch(`${request_handler_url}&${new URLSearchParams(params).toString()}`, {
        method: 'GET',
    });
    console.log(response)

    if (!response.ok) {
        console.error(`Freemius pricing request failed with status ${response.status}`);
    }

    const payload = await response.json();
    const currency = pricingConfig?.currency || 'usd';
    const activePromotion = (payload?.plans || [])
        .filter((plan) => plan && !plan.is_hidden && plan.name !== 'free')
        .map((plan) => mapFreemiusPlan(plan, currency))
        .filter(Boolean);

    return {
        active_promotion: activePromotion,
        is_event_sales: false,
        event_expired: '',
    };
};

const PopupPricingPlan = ({ pricingUrl, onClose }) => {
    const runtime = window['GutenverseConfig'] ? window['GutenverseConfig'] : window['GutenverseDashboard'];
    const { pricingPlan, freemius = {} } = runtime;
    const [planData, setPlanData] = useState(pricingPlan || DEFAULT_PRICING_PLAN);
    const [isLoading, setIsLoading] = useState(Boolean(freemius?.pricingConfig?.request_handler_url));

    useEffect(() => {
        let isMounted = true;

        const loadPricing = async () => {
            if (!freemius?.pricingConfig?.request_handler_url) {
                setIsLoading(false);
                return;
            }

            try {
                const nextPlanData = await fetchFreemiusPricingPlan(freemius.pricingConfig);

                if (!isMounted) {
                    return;
                }

                runtime.pricingPlan = nextPlanData;
                setPlanData(nextPlanData);
            } catch (error) {
                if (isMounted) {
                    setPlanData(pricingPlan || DEFAULT_PRICING_PLAN);
                }
            } finally {
                if (isMounted) {
                    setIsLoading(false);
                }
            }
        };

        loadPricing();

        return () => {
            isMounted = false;
        };
    }, []);

    const plans = (planData?.active_promotion || []).map(normalizePlan);

    return (
        <div className="gutenverse-pricing-popup">
            <button
                type="button"
                className="gutenverse-pricing-popup__close"
                aria-label={__('Close pricing popup', 'gutenverse')}
                onClick={onClose}
            >
                <IconCloseSVG size={20} />
            </button>
            <div className="gutenverse-pricing-popup__hero">
                <h2 className="gutenverse-pricing-popup__title">{__('Affordable Pricing Plan', 'gutenverse')}</h2>
                <p className="gutenverse-pricing-popup__subtitle">
                    {__('Gutenverse helps maximize your WordPress website\'s potential. Upgrade to PRO for more features.', 'gutenverse')}
                </p>
                <div className="gutenverse-pricing-popup__badges">
                    {BADGES.map((badge) => (
                        <span key={badge} className="gutenverse-pricing-popup__badge">{badge}</span>
                    ))}
                </div>
            </div>
            <div className="gutenverse-pricing-popup__cards">
                {isLoading && (
                    <article className="gutenverse-pricing-card">
                        <div className="gutenverse-pricing-card__body">
                            <p className="gutenverse-pricing-card__billing">{__('Loading pricing...', 'gutenverse')}</p>
                        </div>
                    </article>
                )}
                {plans.map((plan) => (
                    <article
                        key={plan.name}
                        className={`gutenverse-pricing-card${plan.featured ? ' is-featured' : ''}`}
                    >
                        <div className="gutenverse-pricing-card__header">
                            <h3>{plan.name}</h3>
                            {plan.featured && (
                                <span className="gutenverse-pricing-card__pill">{__('Popular', 'gutenverse')}</span>
                            )}
                        </div>
                        <div className="gutenverse-pricing-card__body">
                            <div className="gutenverse-pricing-card__pricing">
                                {plan.oldPrice && <span className="gutenverse-pricing-card__old-price">{plan.oldPrice}</span>}
                                {plan.sale && <span className="gutenverse-pricing-card__sale">{plan.sale}</span>}
                                <div className="gutenverse-pricing-card__price-row">
                                    <span className="gutenverse-pricing-card__price">{plan.price}</span>
                                    <span className="gutenverse-pricing-card__period">{__('/mo', 'gutenverse')}</span>
                                </div>
                                <p className="gutenverse-pricing-card__billing">{plan.billed}</p>
                                {plan.renewal && <p className="gutenverse-pricing-card__renewal">{plan.renewal}</p>}
                            </div>
                            <a
                                href={pricingUrl}
                                className="gutenverse-pricing-card__button"
                                target="_blank"
                                rel="noreferrer"
                            >
                                <span>{__('Purchase Now', 'gutenverse')}</span>
                                <span aria-hidden="true">&#8250;</span>
                            </a>
                            <p className="gutenverse-pricing-card__description">{plan.description}</p>
                            <ul className="gutenverse-pricing-card__features">
                                {plan.features.map((feature) => (
                                    <li key={`${plan.name}-${feature}`}>{feature}</li>
                                ))}
                            </ul>
                        </div>
                    </article>
                ))}
            </div>
        </div>
    );
};

export default PopupPricingPlan;
