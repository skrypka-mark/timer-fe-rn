import React, { createRef, useRef } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useRoute, useTheme } from '@react-navigation/native';
import Animated from 'react-native-reanimated';
import { PanGestureHandler, TapGestureHandler } from 'react-native-gesture-handler';
import { useImageSharedElement } from './hooks/useImageSharedElement';
import HeaderBackground from '../../components/HeaderBackground';
import HeaderButton from '../../components/HeaderButton';
import HeaderText from '../../components/HeaderText';
import Timer from './components/Timer';

const EventScreen = () => {
    const route = useRoute();
    const theme = useTheme();

    const imagePan = createRef();
    const imageTap = createRef();

    const { title, image, time, imageSpecs } = route.params;
    const {
        animatedHeaderStyles, animatedImageStyles,
        animatedTimerStyles, pressHeaderAnimationStyles,
        panGestureEventHandler, tapGestureActiveHandler, closeHandler
    } = useImageSharedElement(imageSpecs);

    const editHandler = () => {
        // Edit handler here...
    };

    return (
        <View style={styles.container}>
            <Animated.View>
                <PanGestureHandler ref={imagePan} simultaneousHandlers={imageTap} onGestureEvent={panGestureEventHandler}>
                    <Animated.View style={[animatedImageStyles, { overflow: 'hidden' }]}>
                        <TapGestureHandler ref={imageTap} simultaneousHandlers={imagePan} onActivated={tapGestureActiveHandler}>
                            <Animated.Image
                                source={image}
                                style={styles.image}
                                resizeMode='cover'
                            />
                        </TapGestureHandler>
                        <Timer title={title} time={time} style={animatedTimerStyles} />
                    </Animated.View>
                </PanGestureHandler>
            </Animated.View>
            <Animated.View style={pressHeaderAnimationStyles}>
                <Animated.View style={animatedHeaderStyles}>
                    <HeaderBackground
                        leftButton={() => (
                            <HeaderButton onPress={closeHandler}>
                                <HeaderText color={theme.colors.notification}>
                                    Cancel
                                </HeaderText>
                            </HeaderButton>
                        )}
                        rightButton={() => (
                            <HeaderButton onPress={editHandler}>
                                <HeaderText color={theme.colors.primary}>
                                    Edit
                                </HeaderText>
                            </HeaderButton>
                        )}
                    />
                </Animated.View>
            </Animated.View>
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
