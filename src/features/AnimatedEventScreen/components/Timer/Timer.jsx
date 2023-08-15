import React, { useState, useMemo, memo } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { useTheme } from '@react-navigation/native';
import Animated from 'react-native-reanimated';
import { BlurView } from 'expo-blur';
import TimerUnits from '../../../../components/TimerUnits';
import { convertColorWithAlpha } from '../../../../helpers/utils/convertColorWithAlpha';
import { fontSizes } from '../../../../theme/fonts';
import { styles } from './Timer.styles';

const AnimatedBlurView = Animated.createAnimatedComponent(BlurView);

const Timer = ({
    title,
    timer,
    backgroundColor: backgroundColorProp,
    fontColor: fontColorProp,
    fontFamily: fontFamilyProp,
    blurAmount = 30,
    isTitleEditable,
    short,
    containerStyle,
    style,
    onTitleBlur
}) => {
    const theme = useTheme();

    const backgroundColor = useMemo(() => {
        return backgroundColorProp
            ? backgroundColorProp
            : convertColorWithAlpha(timer?.backgroundColor, Number(timer?.backgroundOpacity))
    }, [backgroundColorProp, timer]);
    const fontColor = useMemo(() => {
        return fontColorProp
            ? fontColorProp
            : timer?.fontColor || theme.colors.text
    }, [fontColorProp, timer, theme]);
    const fontFamily = useMemo(() => {
        return fontFamilyProp
            ? fontFamilyProp
            : timer?.fontFamily
    }, [fontFamilyProp, timer]);

    // const blurType = theme.dark ? 'dark' : 'light';
    // const AnimatedComponent = props => blurAmount ? <AnimatedBlurView { ...props } /> : <Animated.View { ...props } />;

    const renderTitle = () => {
        const [editableTitle, setEditableTitle] = useState(title);

        if(isTitleEditable) {
            return (
                <TextInput
                    style={[styles.timerTitle, { fontFamily, color: fontColor }]}
                    // numberOfLines={1}
                    value={editableTitle}
                    onBlur={onTitleBlur}
                    onChange={({ nativeEvent }) => setEditableTitle(nativeEvent.text)}
                />
            );
        }

        return (
            <Text
                style={[ styles.timerTitle, { fontFamily, color: fontColor }]}
                // numberOfLines={1}
                // adjustsFontSizeToFit
            >
                { title }
            </Text>
        );
    };

    if(short && !title) return (
        <TimerUnits
            timer={timer}
            containerStyle={containerStyle}
            style={style}
            color={theme.colors.textSecondary}
            short
        />
    );
    if(short && title) return (
        <Animated.View style={[style, { overflow: 'hidden' }]}>
            <View style={[styles.timer, { backgroundColor }]}>
                { renderTitle() }
                <View style={styles.timeContainer}>
                    <TimerUnits
                        timer={timer}
                        containerStyle={{ width: '100%' }}
                        unitStyle={{ alignSelf: 'flex-end', marginLeft: 5, fontSize: fontSizes.font16, fontWeight: '400' }}
                        style={styles.time}
                        color={fontColor}
                        short
                        dividers={false}
                    />
                </View>
            </View>
        </Animated.View>
    );
    return (
        <Animated.View style={[style, { overflow: 'hidden' }]}>
            <BlurView style={styles.timer} intensity={blurAmount}>
                <View style={[StyleSheet.absoluteFillObject, { backgroundColor }]} />
                { renderTitle() }
                <View style={styles.timeContainer}>
                    <TimerUnits
                        timer={timer}
                        style={styles.time}
                        color={fontColor}
                    />
                </View>
            </BlurView>
        </Animated.View>
    );
};

export default memo(Timer);
