import React from 'react';
import { View, ScrollView, TouchableWithoutFeedback } from 'react-native';
import ColorPickerIOS, { Panel1, Panel5, HueSlider, Swatches, Preview, OpacitySlider, colorKit } from 'reanimated-color-picker';
import { BlurView } from 'expo-blur';
import CustomThumb from './CustomThumb';
import ConicGradientIcon from '../icons/ConicGradientIcon';

const ColorPicker = ({ value, onChange, opacity = false }) => {
    const colors = [
        '#FFFFFF',
        '#E63D3D',
        '#78D83E',
        '#F7ED15',
        '#000000',
        '#600697',
        '#43CAD2'
    ];
    const renderColorCircle = ({ color, selected, onPress }) => (
        <TouchableWithoutFeedback key={color} onPress={onPress}>
            { selected ? (
                <View
                    style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: 35,
                        height: 35,
                        borderColor: color,
                        borderWidth: 5,
                        borderRadius: 90
                    }}
                >
                    <View
                        style={{
                            width: 21,
                            height: 21,
                            backgroundColor: color,
                            borderRadius: 90
                        }}
                    />
                </View>
            ) : (
                <View
                    style={{
                        width: 35,
                        height: 35,
                        backgroundColor: color,
                        borderRadius: 90
                    }}
                />
            ) }
        </TouchableWithoutFeedback>
    );

    const colorPickerChangeHandler = ({ hex }) => {
        if(opacity !== false) {
            const rgbaObject = colorKit.RGB(hex).object();
            rgbaObject.a = opacity;
            return onChange(colorKit.HEX(rgbaObject));
        }
        return onChange(hex);
    };
    return (
        <View>
            <ColorPickerIOS style={{ padding: 15, paddingBottom: 0 }} value={value} onChange={colorPickerChangeHandler}>
                <Panel1 style={{ borderRadius: 15, marginBottom: 10 }} renderThumb={CustomThumb} />
                <HueSlider renderThumb={CustomThumb} />
            </ColorPickerIOS>
            <ScrollView
                contentContainerStyle={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 10,
                    paddingHorizontal: 15,
                    paddingVertical: 10
                }}
                horizontal
                showsHorizontalScrollIndicator={false}
            >
                {/* <ConicGradientIcon /> */}
                { colors.map(color => renderColorCircle({ color, selected: value === color, onPress: () => colorPickerChangeHandler({ hex: color }) })) }
            </ScrollView>
        </View>
    );
};

export default ColorPicker;
