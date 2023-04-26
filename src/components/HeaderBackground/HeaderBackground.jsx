import React from 'react';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { BlurView } from '@react-native-community/blur';
import { styles } from './HeaderBackground.styles';

const HeaderBackground = ({ leftButton, rightButton }) => {
    const insets = useSafeAreaInsets();

    return (
        <BlurView style={[styles.header, { height: insets.top + 50 }]} blurType='regular'>
            <View style={styles.headerWrapper}>
                { leftButton && leftButton() }
                { rightButton && rightButton() }
            </View>
        </BlurView>
    );
};

export default HeaderBackground;
