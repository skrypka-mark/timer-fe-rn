import React, { createRef, useRef } from 'react';
import { View, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import { useRoute, useTheme } from '@react-navigation/native';
import Animated from 'react-native-reanimated';
import { PanGestureHandler, TapGestureHandler } from 'react-native-gesture-handler';
import { SFSymbol } from 'react-native-sfsymbols';
import { captureRef } from 'react-native-view-shot';
import Share from 'react-native-share';
import { editEvent } from '../../stores/events/events.reducer';
import { useImageSharedElement } from './hooks/useImageSharedElement';
import HeaderBackground from '../../components/HeaderBackground';
import HeaderButton from '../../components/HeaderButton';
import HeaderText from '../../components/HeaderText';
import Timer from './components/Timer';
import SharableEventShot from '../../components/SharableEventShot';
import { CHANGE_NAME } from '../../constants';

const EventScreen = () => {
    const dispatch = useDispatch();
    const route = useRoute();
    const theme = useTheme();

    const eventRef = useRef(null);
    const imagePan = createRef();
    const imageTap = createRef();

    const { id, title, image, timer, imageSpecs } = route.params;
    const {
        animatedHeaderStyles, animatedImageStyles,
        animatedTimerStyles, pressHeaderAnimationStyles,
        panGestureEventHandler, tapGestureActiveHandler, closeHandler,

        // animatedContainerStyles
    } = useImageSharedElement(imageSpecs);

    const shareHandler = async () => {
        try {
            const url = await captureRef(eventRef, {
                format: 'png',
                quality: 0.7
            });
            await Share.open({
                // title,
                // message: 'Share your event',
                url
            });
        } catch(error) {
            console.log(error);
        }
    };

    const titleBlurHandler = ({ nativeEvent }) => dispatch(editEvent({ type: CHANGE_NAME, value: nativeEvent.text }));

    return (
        <View style={styles.container}>
            <Animated.View
                // style={animatedContainerStyles}
            >
                <PanGestureHandler ref={imagePan} simultaneousHandlers={imageTap} onGestureEvent={panGestureEventHandler}>
                    <Animated.View style={[animatedImageStyles, { overflow: 'hidden' }]}>
                        <TapGestureHandler ref={imageTap} simultaneousHandlers={imagePan} onActivated={tapGestureActiveHandler}>
                            <Animated.Image
                                source={image}
                                style={styles.image}
                                resizeMode='cover'
                            />
                        </TapGestureHandler>
                        <Timer title={title} timer={timer} style={animatedTimerStyles} onTitleBlur={titleBlurHandler} isTitleEditable />
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

            <SharableEventShot title={title} image={image} timer={timer} ref={eventRef} />
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
