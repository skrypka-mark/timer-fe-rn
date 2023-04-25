import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useRoute } from '@react-navigation/native';
import Animated from 'react-native-reanimated';
import { PanGestureHandler } from 'react-native-gesture-handler';
import { useImageSharedElement } from './hooks/useImageSharedElement';
import Timer from './components/Timer';

const TimerScreen = () => {
    const route = useRoute();

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

export default TimerScreen;
