import React from 'react';
import { View, Text } from 'react-native';
import { Slider } from '@miblanchard/react-native-slider';
import { SCREEN_PADDING } from '../../../../theme';

const SliderPicker = ({ value, onChange }) => {
    return (
        <View
            style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: 10,
                paddingHorizontal: SCREEN_PADDING
            }}
        >
            <Text>
                { (Number(value) * 100).toFixed(0) }%
            </Text>
            <Slider containerStyle={{ flex: 1 }} value={value} onValueChange={newValue => onChange(Number(newValue).toFixed(2))} animationType='spring' trackClickable />
        </View>
    );
};

export default SliderPicker;
