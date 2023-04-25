import React from 'react';
import { Svg, Path } from 'react-native-svg';

const SettingsIcon = ({ color }) => (
    <Svg width="26" height="27" viewBox="0 0 26 27" fill="none" xmlns="http://www.w3.org/2000/svg">
        <Path d="M13 17.25C15.1088 17.25 16.8183 15.5711 16.8183 13.5C16.8183 11.4289 15.1088 9.75 13 9.75C10.8912 9.75 9.18164 11.4289 9.18164 13.5C9.18164 15.5711 10.8912 17.25 13 17.25Z" stroke={color} strokeWidth="1.875" />
        <Path d="M15.2465 1.19C14.7793 1 14.1862 1 13 1C11.8138 1 11.2207 1 10.7535 1.19C10.4445 1.31564 10.1637 1.49987 9.92716 1.73215C9.69064 1.96444 9.50306 2.24023 9.37512 2.54375C9.25803 2.8225 9.21094 3.14875 9.19312 3.6225C9.18519 3.96499 9.08875 4.29987 8.91287 4.59571C8.73698 4.89155 8.48742 5.13863 8.18762 5.31375C7.8833 5.4813 7.54059 5.57013 7.19171 5.57188C6.84283 5.57363 6.49923 5.48824 6.19318 5.32375C5.76552 5.10125 5.45624 4.97875 5.1495 4.93875C4.48042 4.85234 3.80379 5.03038 3.26833 5.43375C2.86868 5.7375 2.57085 6.24125 1.97773 7.25C1.38461 8.25875 1.08678 8.7625 1.02187 9.25625C0.978134 9.58182 1.00013 9.91265 1.08661 10.2299C1.1731 10.5471 1.32236 10.8445 1.52589 11.105C1.71426 11.345 1.97773 11.5462 2.38629 11.7987C2.98832 12.17 3.37524 12.8025 3.37524 13.5C3.37524 14.1975 2.98832 14.83 2.38629 15.2C1.97773 15.4537 1.71299 15.655 1.52589 15.895C1.32236 16.1555 1.1731 16.4529 1.08661 16.7701C1.00013 17.0873 0.978134 17.4182 1.02187 17.7438C1.08806 18.2363 1.38461 18.7413 1.97646 19.75C2.57085 20.7587 2.8674 21.2625 3.26833 21.5662C3.53362 21.7661 3.83641 21.9127 4.15941 21.9977C4.4824 22.0826 4.81927 22.1042 5.15077 22.0613C5.45624 22.0213 5.76552 21.8988 6.19318 21.6763C6.49923 21.5118 6.84283 21.4264 7.19171 21.4281C7.54059 21.4299 7.8833 21.5187 8.18762 21.6862C8.80237 22.0362 9.16766 22.68 9.19312 23.3775C9.21094 23.8525 9.25676 24.1775 9.37512 24.4562C9.50306 24.7598 9.69064 25.0356 9.92716 25.2678C10.1637 25.5001 10.4445 25.6844 10.7535 25.81C11.2207 26 11.8138 26 13 26C14.1862 26 14.7793 26 15.2465 25.81C15.5555 25.6844 15.8363 25.5001 16.0728 25.2678C16.3094 25.0356 16.4969 24.7598 16.6249 24.4562C16.742 24.1775 16.7891 23.8525 16.8069 23.3775C16.8323 22.68 17.1976 22.035 17.8124 21.6862C18.1167 21.5187 18.4594 21.4299 18.8083 21.4281C19.1572 21.4264 19.5008 21.5118 19.8068 21.6763C20.2345 21.8988 20.5438 22.0213 20.8492 22.0613C21.1807 22.1042 21.5176 22.0826 21.8406 21.9977C22.1636 21.9127 22.4664 21.7661 22.7317 21.5662C23.1326 21.2637 23.4292 20.7587 24.0223 19.75C24.6154 18.7413 24.9132 18.2375 24.9781 17.7438C25.0219 17.4182 24.9999 17.0873 24.9134 16.7701C24.8269 16.4529 24.6776 16.1555 24.4741 15.895C24.2857 15.655 24.0223 15.4538 23.6137 15.2013C23.3155 15.0233 23.0683 14.7737 22.8953 14.4762C22.7224 14.1786 22.6292 13.8427 22.6248 13.5C22.6248 12.8025 23.0117 12.17 23.6137 11.8C24.0223 11.5463 24.287 11.345 24.4741 11.105C24.6776 10.8445 24.8269 10.5471 24.9134 10.2299C24.9999 9.91265 25.0219 9.58182 24.9781 9.25625C24.9119 8.76375 24.6154 8.25875 24.0235 7.25C23.4292 6.24125 23.1326 5.7375 22.7317 5.43375C22.4664 5.23386 22.1636 5.08727 21.8406 5.00233C21.5176 4.9174 21.1807 4.89579 20.8492 4.93875C20.5438 4.97875 20.2345 5.10125 19.8056 5.32375C19.4997 5.48802 19.1563 5.57328 18.8077 5.57153C18.459 5.56978 18.1165 5.48108 17.8124 5.31375C17.5126 5.13863 17.263 4.89155 17.0871 4.59571C16.9113 4.29987 16.8148 3.96499 16.8069 3.6225C16.7891 3.1475 16.7432 2.8225 16.6249 2.54375C16.4969 2.24023 16.3094 1.96444 16.0728 1.73215C15.8363 1.49987 15.5555 1.31564 15.2465 1.19Z" stroke={color} strokeWidth="1.875" />
    </Svg>
);

export default SettingsIcon;