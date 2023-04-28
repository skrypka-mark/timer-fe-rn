import { useEffect } from 'react';
import { Keyboard } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';

export const useKeyboardAwareStyles = () => {
    const insets = useSafeAreaInsets();
    const keyboardHeight = useSharedValue(0);
    const keyboardAwareAnimatedStyles = useAnimatedStyle(() => ({
        paddingBottom: keyboardHeight.value - insets.bottom
    }));

    useEffect(() => {
        const showKeyboardSubscription = Keyboard.addListener('keyboardDidShow', e => {
            keyboardHeight.value = withTiming(e.endCoordinates.height, { duration: 300 });
        });
        const hideKeyboardSubscription = Keyboard.addListener('keyboardWillHide', () => {
            keyboardHeight.value = withTiming(0, { duration: 300 });
        });

        return () => {
            showKeyboardSubscription.remove();
            hideKeyboardSubscription.remove();
        };
    }, []);

    return keyboardAwareAnimatedStyles;
};
