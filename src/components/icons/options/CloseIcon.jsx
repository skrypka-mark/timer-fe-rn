import React from 'react';
import { Svg, Path } from 'react-native-svg';

const OptionCrossIcon = ({ color }) => (
    <Svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
        <Path d="M13.6849 3.00783L9.23609 7.4566L13.6849 11.9054C13.9208 12.1414 14.0534 12.4614 14.0534 12.7951C14.0534 13.1289 13.9208 13.4489 13.6849 13.6849C13.4489 13.9209 13.1288 14.0534 12.7951 14.0534C12.4614 14.0534 12.1413 13.9209 11.9054 13.6849L7.45658 9.23612L3.0078 13.6849C2.77182 13.9209 2.45177 14.0534 2.11805 14.0534C1.78432 14.0534 1.46427 13.9209 1.22829 13.6849C0.992312 13.4489 0.85974 13.1289 0.85974 12.7951C0.85974 12.4614 0.992312 12.1414 1.22829 11.9054L5.67707 7.4566L1.22829 3.00783C0.992312 2.77185 0.85974 2.45179 0.85974 2.11807C0.85974 1.78435 0.992312 1.46429 1.22829 1.22831C1.46427 0.992336 1.78432 0.859764 2.11805 0.859764C2.45177 0.859764 2.77182 0.992336 3.0078 1.22831L7.45658 5.67709L11.9054 1.22831C12.1413 0.992336 12.4614 0.859764 12.7951 0.859764C13.1288 0.859764 13.4489 0.992336 13.6849 1.22831C13.9208 1.46429 14.0534 1.78435 14.0534 2.11807C14.0534 2.45179 13.9208 2.77185 13.6849 3.00783Z" fill={color} />
    </Svg>
);

export default OptionCrossIcon;