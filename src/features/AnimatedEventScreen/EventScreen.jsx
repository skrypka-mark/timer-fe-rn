import React, { createRef } from 'react';
import { View, StyleSheet } from 'react-native';
import { useRoute, useTheme } from '@react-navigation/native';
import Animated from 'react-native-reanimated';
import { PanGestureHandler, TapGestureHandler } from 'react-native-gesture-handler';
import { SFSymbol } from 'react-native-sfsymbols';
import Share from 'react-native-share';
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

    const shareHandler = async () => {
        await Share.open({
            title: 'Share event',
            message: 'Share your event',
            // backgroundImage: image,
            // social: Share.Social.INSTAGRAM_STORIES,
            // backgroundBottomColor: '#fefefe',
            // backgroundTopColor: '#906df4',
        });
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
                            <HeaderButton onPress={shareHandler}>
                                <SFSymbol
                                    name='square.and.arrow.up'
                                    // weight='heavy'
                                    // scale='medium'
                                    // color=''
                                    size={20}
                                    resizeMode="center"
                                    // multicolor={false}
                                    style={{ width: 32, height: 32 }}
                                />
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
