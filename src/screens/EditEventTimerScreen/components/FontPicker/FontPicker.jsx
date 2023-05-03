import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { PickerIOS } from '@react-native-picker/picker';

const FontPicker = ({ value, onChange, fontFamilies }) => {
    const theme = useTheme();

    return (
        <PickerIOS
            style={styles.picker}
            itemStyle={styles.pickerItem}
            selectedValue={value}
            onValueChange={newFont => onChange(newFont)}
        >
            { fontFamilies.map(font => (
                <PickerIOS.Item
                    key={font}
                    color={theme.colors.text}
                    label={font}
                    value={font}
                />
            )) }
        </PickerIOS>
    );
};

const styles = StyleSheet.create({
    picker: {
        padding: 5
    },
    pickerItem: {
        // height: 100,
        // backgroundColor: 'black',
        // height: 50,
        color: 'white'
    }
});

export default FontPicker;
