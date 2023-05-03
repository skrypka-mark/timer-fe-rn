import React from 'react';
import { Svg, Rect, Defs, RadialGradient, Stop } from 'react-native-svg';

const ConicGradientIcon = () => (
    <Svg width="35" height="35" viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg">
        <Rect width="35" height="35" rx="17.5" fill="url(#paint0_angular_358_1275)"/>
        <Defs>
            <RadialGradient id="paint0_angular_358_1275" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(17.5 17.5) rotate(90) scale(17.5)">
                <Stop stopColor="#24D6B6"/>
                <Stop offset="0.255208" stopColor="#B8CF29"/>
                <Stop offset="0.520833" stopColor="#DA2A2A"/>
                <Stop offset="0.786458" stopColor="#C921AE"/>
                <Stop offset="1" stopColor="#24D6B6"/>
            </RadialGradient>
        </Defs>
    </Svg>
);

export default ConicGradientIcon;
