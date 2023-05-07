import { colorKit } from 'reanimated-color-picker';

export const convertColorWithAlpha = (backgroundColor, alpha) => {
    const backgroundColorObject = colorKit.RGB(backgroundColor).object();
    return colorKit.RGB({ ...backgroundColorObject, a: alpha }).string();
};
