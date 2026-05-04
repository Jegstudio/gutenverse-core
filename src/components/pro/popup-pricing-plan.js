import { __, sprintf } from '@wordpress/i18n';
import { IconCloseSVG } from 'gutenverse-core/icons';
import { useRef } from '@wordpress/element';
import { Checkout } from '@freemius/checkout';

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

const FEATURE_GROUP_TITLES = {
    main: __('', 'gutenverse'),
    essential_features: __('Essential Features', 'gutenverse'),
    fse: __('FSE (Full Site Editing)', 'gutenverse'),
    demo: __('Demo & Library', 'gutenverse'),
    animation: __('Animation', 'gutenverse'),
    adv_script_style: __('Advanced Script & Style', 'gutenverse'),
    data_builder: __('Data & Builder', 'gutenverse'),
    popup: __('Popup', 'gutenverse'),
    news: __('News', 'gutenverse'),
    form: __('Form', 'gutenverse'),
    performance: __('Performance Optimization', 'gutenverse'),
    theme_builder: __('Themes Builder', 'gutenverse'),
};

const DEFAULT_PRICING_PLAN = {
    active_promotion: [],
    is_event_sales: false,
    event_expired: '',
};

const LIMITED_BADGE_LABEL = __('Limited', 'gutenverse');

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

const getPlanFeatureGroups = (slug) => Object.entries(FEATURES)
    .map(([groupKey, features]) => ({
        key: groupKey,
        title: FEATURE_GROUP_TITLES[groupKey],
        features: features
            .filter(({ include = [] }) => include.includes('all') || include.includes(slug))
            .map((feature) => ({
                ...feature,
                isLimited: feature?.limited?.includes(slug),
                isExcept: feature?.except?.includes(slug),
            })),
    }))
    .filter(({ features }) => features.length);

const normalizePlan = (plan) => {
    const slug = plan?.slug || '';
    const currency = plan?.currency || 'USD';
    const actualPrice = plan?.actual_price;
    const discountAmount = Number(plan?.discount_amount || 0);
    const discountedPrice = plan?.discounted_price;
    const hasDiscount = discountAmount > 0 && actualPrice;
    const displayedMonthlyPrice = discountedPrice / 12;
    const regularMonthlyPrice = actualPrice / 12;

    return {
        ...plan,
        name: plan?.label || plan?.name || '',
        featured: Boolean(plan?.is_featured) || slug === 'professional',
        price: formatPrice(displayedMonthlyPrice, currency) || __('Contact Us', 'gutenverse'),
        oldPrice: hasDiscount ? formatPrice(regularMonthlyPrice, currency) : null,
        billed: sprintf(
            __('Billed annually. Pay %s/year today', 'gutenverse'),
            formatPrice(discountedPrice, currency)
        ),
        renewal: hasDiscount
            ? sprintf(
                __('Renew at regular rate %s/year', 'gutenverse'),
                formatPrice(actualPrice, currency)
            )
            : null,
        description: PLAN_DESCRIPTIONS[slug] || __('Upgrade to unlock more Gutenverse features.', 'gutenverse'),
        sale: hasDiscount ? sprintf(__('Sale %s%%', 'gutenverse'), discountAmount) : null,
    };
};


const PopupPricingPlan = ({ onClose }) => {
    const runtime = window['GutenverseConfig'] ? window['GutenverseConfig'] : window['GutenverseDashboard'];
    const { pricingPlan = DEFAULT_PRICING_PLAN } = runtime;
    const plans = (pricingPlan.active_promotion || []).map(normalizePlan);
    const fsCheckoutRef = useRef(null);

    const handleCheckout = (plan) => {
        if (!pricingPlan?.public_key || !pricingPlan?.product_id) {
            return;
        }

        if (!fsCheckoutRef.current) {
            const checkoutOptions = {
                product_id: pricingPlan?.product_id,
                public_key: pricingPlan?.public_key,
            };

            if(pricingPlan?.sandbox){
                checkoutOptions.sandbox = pricingPlan?.sandbox;
            }

            fsCheckoutRef.current = new Checkout(checkoutOptions);
        }

        const openOptions = {
            title: __('Gutenverse Checkout', 'gutenverse-pro'),
            plan_id: plan.plan_id,
            pricing_id: plan.pricing_id,
            billing_cycle: 'annual',
            currency: 'auto',
            readonly_user: true,
            coupon: plan?.coupon_code,
            success: () => {
                onClose();
            }
        };

        fsCheckoutRef.current.open(openOptions);
    };
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
                {plans.map((plan) => {
                    const planFeatureGroups = getPlanFeatureGroups(plan.slug);

                    return (
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
                                <div
                                    className="gutenverse-pricing-card__button"
                                    onClick={() => handleCheckout(plan)}
                                >
                                    <span>{__('Purchase Now', 'gutenverse')}</span>
                                    <span aria-hidden="true">&#8250;</span>
                                </div>
                                <p className="gutenverse-pricing-card__description">{plan.description}</p>
                                <div className="gutenverse-pricing-card__feature-groups">
                                    {planFeatureGroups.map((group) => (
                                        <div
                                            key={`${plan.name}-${group.key}`}
                                            className="gutenverse-pricing-card__feature-group"
                                        >
                                            <h4 className="gutenverse-pricing-card__feature-title">{group.title}</h4>
                                            <ul className="gutenverse-pricing-card__features">
                                                {group.features.map((feature) => (
                                                    <li
                                                        key={`${plan.name}-${group.key}-${feature.label}`}
                                                        className={feature.isExcept ? 'is-except' : ''}
                                                    >
                                                        <i
                                                            className={feature.isExcept ? 'fas fa-times-circle' : 'fas fa-check-circle'}
                                                            aria-hidden="true"
                                                        />
                                                        <span>{feature.label}</span>
                                                        {feature.isLimited && (
                                                            <span className="gutenverse-pricing-card__feature-badge">
                                                                {LIMITED_BADGE_LABEL}
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
                })}
            </div>
        </div>
    );
};

export default PopupPricingPlan;
