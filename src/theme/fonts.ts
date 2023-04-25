import { metrics } from './metrics';

export const fontSizes = {
    font6: metrics.screenWidth * (6 / 365),
    font8: metrics.screenWidth * (8 / 365),
    font10: metrics.screenWidth * (10 / 365),
    font12: metrics.screenWidth * (12 / 365),
    font14: metrics.screenWidth * (14 / 365),
    font16: metrics.screenWidth * (16 / 365),
    font18: metrics.screenWidth * (18 / 365),
    font20: metrics.screenWidth * (20 / 365),
    font22: metrics.screenWidth * (22 / 365),
    font24: metrics.screenWidth * (24 / 365)
};

export const fontWeights = {
    full: '900',
    semi: '600',
    low: '400',
    bold: 'bold',
    normal: 'normal'
};

export const fontTypes = {
    montserratMedium: 'Montserrat-Medium',
    montserratRegular: 'Montserrat-Regular',
    montserratSemiBold: 'Montserrat-SemiBold'
};