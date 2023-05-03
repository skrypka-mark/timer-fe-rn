import React, { useEffect } from 'react';
import { StyleSheet, View, TouchableWithoutFeedback, StatusBar } from 'react-native';
import { useNavigation, useRoute, useTheme } from '@react-navigation/native';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    interpolate,
    withSpring,
    withTiming,
    runOnJS
} from 'react-native-reanimated';
import HapticFeedback from 'react-native-haptic-feedback';
import { BlurView } from 'expo-blur';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import SettingsList from '../../components/ui/SettingsList';

const AnimatedTouchableWithoutFeedback = Animated.createAnimatedComponent(TouchableWithoutFeedback);

const EditSettingsRowScreen = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const theme = useTheme();
    const animatedValue = useSharedValue(0);

    const { title, rowSpecs } = route.params;

    useEffect(() => {
        animatedValue.value = 0;
        animatedValue.value = withSpring(1, { mass: 1.2 });
        HapticFeedback.trigger('impactMedium');
        StatusBar.setHidden(true, 'fade');
    }, []);

    const rowAnimatedStyles = useAnimatedStyle(() => ({
        position: 'absolute',
        top: interpolate(animatedValue.value, [0, 1], [rowSpecs.pageY, rowSpecs.pageY - 5]),
        left: interpolate(animatedValue.value, [0, 1], [rowSpecs.pageX, rowSpecs.pageX - 5]),
        width: interpolate(animatedValue.value, [0, 1], [rowSpecs.width, rowSpecs.width + 10]),
        height: interpolate(animatedValue.value, [0, 1], [rowSpecs.height, rowSpecs.height + 10]),
        opacity: interpolate(animatedValue.value, [0, 0.3, 1], [0, 1, 1])
    }));
    const backdropAnimatedStyles = useAnimatedStyle(() => ({
        opacity: interpolate(animatedValue.value, [0, 1], [0, 1]),
        // borderTopLeftRadius: interpolate(animatedValue.value, [0, 1], [radiusTop])
    }));
    const pickerAnimatedStyles = useAnimatedStyle(() => ({
        position: 'absolute',
        top: rowSpecs.pageY + rowSpecs.height + 20,
        right: interpolate(animatedValue.value, [0, 1], [-50, rowSpecs.pageX - 5]),
        opacity: interpolate(animatedValue.value, [0, 1], [0, 1]),
        borderRadius: 15,
        overflow: 'hidden'
    }));

    const backdropPressHandler = () => {
        StatusBar.setHidden(false, 'fade');
        animatedValue.value = withTiming(0, { duration: 300 }, finished => finished && runOnJS(navigation.goBack)());
    };

    const PickerComponent = {
        'Date': (
            <DateTimePicker
                display='inline'
                value={new Date()}
                positiveButton={{ label: 'Okay' }}
                negativeButton={{ label: 'Cancel' }}
            />
        ),
        'Time': (
            <DateTimePicker
                mode='time'
                display='spinner'
                value={new Date()}
                style={{ width: 210 }}
                positiveButton={{ label: 'Okay' }}
                negativeButton={{ label: 'Cancel' }}
            />
        ),
        'Repeat': (
            <View style={{ width: 250, flexDirection: 'row' }}>
                <Picker style={{ width: '40%', marginRight: -5 }} selectedValue={1} itemStyle={{ color: theme.colors.text }}>
                    { Array(12).fill('').map((_, index) => (
                        <Picker.Item key={index} label={`${index + 1}`} value={`${index + 1}`} />
                    )) }
                </Picker>
                <Picker style={{ width: '65%', marginLeft: -5 }} selectedValue='Days' itemStyle={{ color: theme.colors.text }}>
                    { ['Minutes', 'Hours', 'Days', 'Weeks', 'Months'].map((label, index) => (
                        <Picker.Item key={index} label={label} value={label} />
                    )) }
                </Picker>
            </View>
        )
    };

    return (
        <View style={StyleSheet.absoluteFillObject}>
            <AnimatedTouchableWithoutFeedback style={[StyleSheet.absoluteFillObject, backdropAnimatedStyles]} onPress={backdropPressHandler}>
                <BlurView intensity={50} style={StyleSheet.absoluteFillObject}>
                    <View style={[StyleSheet.absoluteFillObject, { backgroundColor: theme.colors.backgroundOpacity }]} />
                </BlurView>
            </AnimatedTouchableWithoutFeedback>
            <Animated.View style={rowAnimatedStyles}>
                <SettingsList.Row title={title} radiusTop radiusBottom hasArrow hideDivider />
            </Animated.View>
            <Animated.View style={[pickerAnimatedStyles, { backgroundColor: theme.colors.card }]}>
                { PickerComponent[title] }
            </Animated.View>
        </View>
    );
};

export default EditSettingsRowScreen;
