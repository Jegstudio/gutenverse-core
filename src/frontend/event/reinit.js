import u from 'umbrellajs';

export const ReinitHandler = (data) => {
    let {
        additionalSelector = '',
    } = data || {};
    const mapped = window.GutenverseReinitData || {};
    Object.keys(mapped).forEach((key) => {
        const {
            selector = '',
            handler = () => {},
        } = mapped[key] || {};
        let elements = [];
        if (typeof additionalSelector !== 'string' && additionalSelector) {
            elements = additionalSelector.find(selector);
        } else {
            if (finalSelector === '') {
                data.global = true;
            } else {
                additionalSelector = `${additionalSelector} `;
            }
            const finalSelector = `${additionalSelector}${selector}`;
            elements = u(finalSelector);
        }
        if (elements.length) {
            handler(elements, data);
        }
    });
};
