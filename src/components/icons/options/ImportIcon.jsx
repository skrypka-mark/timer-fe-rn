import React from 'react';
import { Svg, Path } from 'react-native-svg';

const ImportIcon = ({ color }) => (
    <Svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
        <Path d="M19.875 12.5833C19.5988 12.5833 19.3338 12.6931 19.1385 12.8884C18.9431 13.0838 18.8334 13.3487 18.8334 13.625V17.7917C18.8334 18.0679 18.7236 18.3329 18.5283 18.5282C18.3329 18.7236 18.068 18.8333 17.7917 18.8333H3.20837C2.93211 18.8333 2.66715 18.7236 2.4718 18.5282C2.27645 18.3329 2.16671 18.0679 2.16671 17.7917V13.625C2.16671 13.3487 2.05696 13.0838 1.86161 12.8884C1.66626 12.6931 1.40131 12.5833 1.12504 12.5833C0.848773 12.5833 0.583821 12.6931 0.388471 12.8884C0.193121 13.0838 0.083374 13.3487 0.083374 13.625V17.7917C0.083374 18.6205 0.412614 19.4153 0.998665 20.0014C1.58472 20.5874 2.37957 20.9167 3.20837 20.9167H17.7917C18.6205 20.9167 19.4154 20.5874 20.0014 20.0014C20.5875 19.4153 20.9167 18.6205 20.9167 17.7917V13.625C20.9167 13.3487 20.807 13.0838 20.6116 12.8884C20.4163 12.6931 20.1513 12.5833 19.875 12.5833ZM9.76046 14.3646C9.85952 14.4594 9.97634 14.5337 10.1042 14.5833C10.2289 14.6384 10.3637 14.6669 10.5 14.6669C10.6364 14.6669 10.7712 14.6384 10.8959 14.5833C11.0237 14.5337 11.1406 14.4594 11.2396 14.3646L15.4063 10.1979C15.6024 10.0018 15.7126 9.73572 15.7126 9.45833C15.7126 9.18093 15.6024 8.91489 15.4063 8.71874C15.2101 8.52259 14.9441 8.4124 14.6667 8.4124C14.3893 8.4124 14.1233 8.52259 13.9271 8.71874L11.5417 11.1146V1.12499C11.5417 0.848728 11.432 0.583776 11.2366 0.388425C11.0413 0.193075 10.7763 0.0833282 10.5 0.0833282C10.2238 0.0833282 9.95882 0.193075 9.76347 0.388425C9.56812 0.583776 9.45837 0.848728 9.45837 1.12499V11.1146L7.07296 8.71874C6.97583 8.62162 6.86053 8.54458 6.73363 8.49201C6.60674 8.43945 6.47073 8.4124 6.33337 8.4124C6.19602 8.4124 6.06001 8.43945 5.93311 8.49201C5.80622 8.54458 5.69091 8.62162 5.59379 8.71874C5.49667 8.81587 5.41962 8.93117 5.36706 9.05807C5.3145 9.18497 5.28744 9.32097 5.28744 9.45833C5.28744 9.59568 5.3145 9.73169 5.36706 9.85859C5.41962 9.98549 5.49667 10.1008 5.59379 10.1979L9.76046 14.3646Z" fill={color} />
    </Svg>
);

export default ImportIcon;