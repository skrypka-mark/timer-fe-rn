import { useEffect } from 'react';
import { Keyboard } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';

export const useKeyboardAwareStyles = defaultValue => {
    const insets = useSafeAreaInsets();
    const keyboardHeight = useSharedValue(defaultValue ?? insets.bottom);
    const keyboardAwareAnimatedStyles = useAnimatedStyle(() => ({
        paddingBottom: keyboardHeight.value
    }));

    useEffect(() => {
        const showKeyboardSubscription = Keyboard.addListener('keyboardDidShow', e => {
            keyboardHeight.value = withTiming(e.endCoordinates.height + (defaultValue ?? insets.bottom), { duration: 300 });
        });
        const hideKeyboardSubscription = Keyboard.addListener('keyboardWillHide', () => {
            keyboardHeight.value = withTiming(defaultValue ?? insets.bottom, { duration: 300 });
        });

        return () => {
            showKeyboardSubscription.remove();
            hideKeyboardSubscription.remove();
        };
    }, []);

    return keyboardAwareAnimatedStyles;
};
