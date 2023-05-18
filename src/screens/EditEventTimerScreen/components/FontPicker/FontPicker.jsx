import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';
import { fontFamilies } from '../../../../constants';

const FontPicker = ({ value, onChange }) => {
    const theme = useTheme();

    return (
        <Picker
            style={styles.picker}
            itemStyle={styles.pickerItem}
            selectedValue={value}
            onValueChange={onChange}
        >
            { fontFamilies.map(font => (
                <Picker.Item
                    key={font}
                    fontFamily={font}
                    color={theme.colors.text}
                    label={font}
                    value={font}
                />
            )) }
        </Picker>
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
