import { getDevice } from 'gutenverse-core/helper';

export const useDisplayFrontend = ({ hideDesktop, hideTablet, hideMobile }) => ({
    'hide-desktop': hideDesktop,
    'hide-tablet': hideTablet,
    'hide-mobile': hideMobile,
});

export const useDisplayEditor = ({ hideDesktop, hideTablet, hideMobile }) => {

    const deviceType = getDevice();

    return {
        'guten-hide-desktop': hideDesktop && deviceType === 'Desktop',
        'guten-hide-tablet': hideTablet && deviceType === 'Tablet',
        'guten-hide-mobile': hideMobile && deviceType === 'Mobile',
    };
};