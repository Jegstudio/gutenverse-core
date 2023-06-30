import { getDeviceType } from 'gutenverse-core/editor-helper';

export const useDisplayFrontend = ({ hideDesktop, hideTablet, hideMobile }) => ({
    'hide-desktop': hideDesktop,
    'hide-tablet': hideTablet,
    'hide-mobile': hideMobile,
});

export const useDisplayEditor = ({ hideDesktop, hideTablet, hideMobile }) => {

    const deviceType = getDeviceType();

    return {
        'guten-hide-desktop': hideDesktop && deviceType === 'Desktop',
        'guten-hide-tablet': hideTablet && deviceType === 'Tablet',
        'guten-hide-mobile': hideMobile && deviceType === 'Mobile',
    };
};