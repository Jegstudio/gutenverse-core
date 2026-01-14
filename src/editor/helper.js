const defImageLoad = {
    eager: {
        label: 'Normal Load',
        value: 'eager',
    },
    lazy: {
        label: 'Lazy Load',
        value: 'lazy',
    }
};

/**
 * 
 * @param {string} imageLoad ImageLoad attribute
 * @param {boolean} isLazy old lazyLoad attribute
 * @returns {Object}
 */
export const getDefaultImageLoad = (imageLoad = '', isLazy = false) => {
    if (imageLoad.length > 1) {
        return defImageLoad[imageLoad]
    }
    if (isLazy) {
        return defImageLoad.lazy
    }
    const {
        defaultImageLoad = 'eager'
    } = window['GutenverseConfig'];
    return defImageLoad[defaultImageLoad];
}
