import React, { createRef, useRef, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import { useRoute, useTheme } from '@react-navigation/native';
import Animated from 'react-native-reanimated';
import { PanGestureHandler, TapGestureHandler } from 'react-native-gesture-handler';
import { SFSymbol } from 'react-native-sfsymbols';
import FastImage from 'react-native-fast-image';
import { captureRef } from 'react-native-view-shot';
import Share from 'react-native-share';
import { updateEvent } from '../../stores/events/events.reducer';
import { useImageSharedElement } from './hooks/useImageSharedElement';
import EventHeaderBackground from '../../components/EventHeaderBackground';
import HeaderButton from '../../components/HeaderButton';
import HeaderText from '../../components/HeaderText';
import Timer from './components/Timer';
import SharableEventShot from '../../components/SharableEventShot';

const EventScreen = () => {
    const dispatch = useDispatch();
    const route = useRoute();
    const theme = useTheme();

    const eventRef = useRef(null);
    const imagePan = createRef();
    const imageTap = createRef();

    const [isImageLoading, setIsImageLoading] = useState(true);

    const { event, imageSpecs, isTitleEditable } = route.params;
    const {
        animatedHeaderStyles, animatedEventContainerStyles,
        animatedImageStyles, animatedTimerStyles,
        animatedBlurredTimerStyles, pressHeaderAnimationStyles,
        panGestureEventHandler, tapGestureActiveHandler, closeHandler,
        onLayout,

        animatedContainerStyles, clipContainerAnimatedStyles
    } = useImageSharedElement(imageSpecs);

    const shareHandler = async () => {
        try {
            const url = await captureRef(eventRef, {
                format: 'png',
                quality: 0.7
            });
            await Share.open({
                // title: event.title,
                // message: 'Share your event',
                url
            });
        } catch(error) {
            console.log(error);
        }
    };

    const titleBlurHandler = ({ nativeEvent }) => dispatch(updateEvent({ ...event, title: nativeEvent.text }));

    const imageLoadHandler = isImageLoading ? () => {
        setIsImageLoading(false);
        onLayout();
    } : () => {};

    return (
        <View style={styles.container}>
            <Animated.View style={clipContainerAnimatedStyles}>
                <Animated.View style={animatedContainerStyles}>
                    <PanGestureHandler ref={imagePan} simultaneousHandlers={imageTap} onGestureEvent={panGestureEventHandler}>
                        <Animated.View style={animatedEventContainerStyles}>
                            <TapGestureHandler ref={imageTap} simultaneousHandlers={imagePan} onActivated={tapGestureActiveHandler}>
                                <Animated.View style={animatedImageStyles}>
                                    <FastImage
                                        source={event.image}
                                        style={styles.image}
                                        resizeMode='cover'
                                        onLoad={imageLoadHandler}
                                    />
                                </Animated.View>
                            </TapGestureHandler>
                            <Timer
                                title={event.title}
                                timer={event.timer}
                                style={animatedBlurredTimerStyles}
                                isTitleEditable={isTitleEditable}
                                onTitleBlur={titleBlurHandler}
                            />
                            <Timer
                                title={event.title}
                                timer={event.timer}
                                style={animatedTimerStyles}
                                short
                            />
                        </Animated.View>
                    </PanGestureHandler>
                </Animated.View>
            </Animated.View>
            <Animated.View style={pressHeaderAnimationStyles}>
                <Animated.View style={animatedHeaderStyles}>
                    <EventHeaderBackground
                        leftButton={() => (
                            <HeaderButton onPress={closeHandler}>
                                <HeaderText color={theme.colors.notification}>
                                    Cancel
                                </HeaderText>
                            </HeaderButton>
                        )}
                        rightButton={() => (
                            <HeaderButton onPress={shareHandler}>
                                <SFSymbol
                                    name='square.and.arrow.up'
                                    // weight='heavy'
                                    // scale='medium'
                                    // color=''
                                    size={20}
                                    resizeMode='center'
                                    // multicolor={false}
                                    style={{ width: 32, height: 32 }}
                                />
                            </HeaderButton>
                        )}
                    />
                </Animated.View>
            </Animated.View>

            <SharableEventShot title={event.title} image={event.image} timer={event.timer} ref={eventRef} />
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
