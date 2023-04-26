import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useRoute, useTheme } from '@react-navigation/native';
import Animated from 'react-native-reanimated';
import { PanGestureHandler } from 'react-native-gesture-handler';
import { useImageSharedElement } from './hooks/useImageSharedElement';
import HeaderBackground from '../../components/HeaderBackground';
import HeaderButton from '../../components/HeaderButton';
import HeaderText from '../../components/HeaderText';
import Timer from './components/Timer';

const EventScreen = () => {
    const route = useRoute();
    const theme = useTheme();

    const { title, image, time, imageSpecs } = route.params;
    const { animatedImageStyles, animatedTimerStyles, gestureEventHandler } = useImageSharedElement(imageSpecs);

    return (
        <View style={styles.container}>
            <PanGestureHandler onGestureEvent={gestureEventHandler}>
                <Animated.View style={[animatedImageStyles, { overflow: 'hidden' }]}>
                    <Animated.Image
                        source={image}
                        style={styles.image}
                        resizeMode='cover'
                    />
                    <Timer title={title} time={time} style={animatedTimerStyles} />
                </Animated.View>
            </PanGestureHandler>
            <HeaderBackground
                leftButton={() => (
                    <HeaderButton>
                        <HeaderText color={theme.colors.notification}>
                            Cancel
                        </HeaderText>
                    </HeaderButton>
                )}
                rightButton={() => (
                    <HeaderButton>
                        <HeaderText color={theme.colors.primary}>
                            Edit
                        </HeaderText>
                    </HeaderButton>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: 'relative'
    },
    image: {
        width: '100%',
        height: '100%'
    }
});

export default EventScreen;
