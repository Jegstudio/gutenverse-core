import { getDevice } from 'gutenverse-core/helper';

const isAnimated = (type) => type.Desktop && type.Desktop !== 'none' || type.Tablet && type.Tablet !== 'none' || type.Mobile && type.Mobile !== 'none';

export const useAnimationFrontend = ({ animation }) => {
    let animationClass = {};

    if (animation) {
        const {
            type = {
                Desktop: null,
                Tablet: null,
                Mobile: null
            },
            duration = 'normal',
        } = animation;

        animationClass = {
            'animated': isAnimated(type),
            'guten-element-hide': isAnimated(type),
            [`${duration}`]: duration && duration !== 'normal',
            [`desktop-${type['Desktop']}`]: type['Desktop'] && type['Desktop'] !== 'none',
            [`tablet-${type['Tablet']}`]: type['Tablet'] && type['Tablet'] !== 'none',
            [`mobile-${type['Mobile']}`]: type['Mobile'] && type['Mobile'] !== 'none',
        };
    }

    return animationClass;
};

export const useAnimationEditor = ({ animation }) => {
    if (animation) {
        const deviceType = getDevice();
        const {
            type = {
                Desktop: null,
                Tablet: null,
                Mobile: null
            },
            duration = 'normal',
        } = animation;

        return {
            'animated': isAnimated(type),
            [`${duration}`]: duration && duration !== 'normal',
            [`${type[deviceType]}`]: type[deviceType] && type[deviceType] !== 'none',
        };
    }
};