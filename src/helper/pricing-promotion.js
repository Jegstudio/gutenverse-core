// The server chooses the active promotion. A missing end date means it is open-ended.
const isPricingPromotionExpired = (pricingPlan = {}, now = Date.now()) => {
    if (![true, 1, '1'].includes(pricingPlan?.is_event_sales)) {
        return true;
    }

    const endDate = pricingPlan?.event_expired;
    if (!endDate) {
        return false;
    }

    // Pricing tools store inclusive calendar dates, rather than midnight deadlines.
    const value = /^\d{4}-\d{2}-\d{2}$/.test(endDate) ? `${endDate}T23:59:59.999` : endDate;
    const expiredAt = new Date(value).getTime();
    return !Number.isFinite(expiredAt) || expiredAt <= now;
};

export { isPricingPromotionExpired };
