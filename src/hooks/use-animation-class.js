import { getDeviceType } from 'gutenverse-core/editor-helper';

const isAnimated = (type) => type.Desktop || type.Tablet || type.Mobile;

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
            [`desktop-${type['Desktop']}`]: type['Desktop'],
            [`tablet-${type['Tablet']}`]: type['Tablet'],
            [`mobile-${type['Mobile']}`]: type['Mobile'],
        };
    }

    return animationClass;
};

export const useAnimationEditor = ({ animation }) => {
    if (animation) {
        const deviceType = getDeviceType();
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
            [`${type[deviceType]}`]: type[deviceType],
        };
    }
};