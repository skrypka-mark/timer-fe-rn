import React from 'react';
import { View, Text } from 'react-native';
import { useTheme } from '@react-navigation/native';
// import { Slider } from '@miblanchard/react-native-slider';
import Slider from '@react-native-community/slider';
import { SCREEN_PADDING } from '../../../../theme';
import { fontSizes, fontWeights } from '../../../../theme/fonts';

const SliderPicker = ({ initialValue, value, onChange }) => {
    const theme = useTheme();

    return (
        <View
            style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: 10,
                paddingHorizontal: SCREEN_PADDING
            }}
        >
            <Text style={{ color: theme.colors.text, fontSize: fontSizes.font16, fontWeight: fontWeights.low }}>
                { (+value * 100).toFixed(0) }%
            </Text>
            <Slider
                style={{ flex: 1 }}
                value={initialValue}
                onValueChange={onChange}
                tapToSeek
            />
        </View>
    );
};

export default SliderPicker;
