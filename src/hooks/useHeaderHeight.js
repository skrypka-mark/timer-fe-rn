import { useSafeAreaInsets } from 'react-native-safe-area-context';

const HEADER_HEIGHT = 40;

export const useHeaderHeight = () => {
    const insets = useSafeAreaInsets();

    return insets.top + HEADER_HEIGHT;
};
