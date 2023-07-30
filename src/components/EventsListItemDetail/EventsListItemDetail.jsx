import React, { Fragment, useEffect, useRef } from 'react';
import { StyleSheet, StatusBar, NativeModules } from 'react-native';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { TouchableNativeFeedback } from 'react-native-gesture-handler';
import Animated, { interpolate, runOnJS, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { ContextMenuView } from 'react-native-ios-context-menu';
import { useCountdownTimer } from '../../hooks/useCountdownTimer';
import FastImage from 'react-native-fast-image';
import Timer from '../../features/AnimatedEventScreen/components/Timer';
import SharableEventShot from '../SharableEventShot';
import { eventContextMenuItems, getEventContextMenuTitle } from '../../constants';
import { SCREEN_PADDING } from '../../theme';
import { styles } from './EventsListItemDetail.styles';

const BORDER_RADIUS = 15;
const ITEM_HEIGHT = 110;

const { RNSharedWidget } = NativeModules;

const EventsListItemDetail = ({ event, share, remove, isContextMenuEnabled, isTitleEditable }) => {
    const navigation = useNavigation();
    const isScreenFocused = useIsFocused();

    const eventRef = useRef(null);
    const imageRef = useRef(null);
    // const animatedValue = useRef(new Animated.Value(1)).current;
    const animatedValue = useSharedValue(0);
    const opacityAnimatedValue = useSharedValue(1);
    // const [activeTimerId, setActiveTimerId] = useState(null);

    useEffect(() => {
        if(isScreenFocused) {
            opacityAnimatedValue.value = 1;
        }
    }, [isScreenFocused]);

    const timerItemPressHandler = () => {
        imageRef.current?.measure((x, y, width, height, pageX, pageY) => {
            opacityAnimatedValue.value = withTiming(0);

            const imageSpecs = { width, height, pageX, pageY, borderRadius: BORDER_RADIUS };
            navigation.navigate('event', { event, imageSpecs, isTitleEditable });
        });
        // setActiveTimerId(event?.id);
    };
    const removeHandler = id => {
        animatedValue.value = withTiming(1, { duration: 300 }, finished => finished && runOnJS(remove)(id));
    };

    const itemContainerAnimatedStyles = useAnimatedStyle(() => ({
        // width: '100%',
        height: interpolate(animatedValue.value, [0, 1], [ITEM_HEIGHT, 0]),
        marginBottom: interpolate(animatedValue.value, [0, 1], [SCREEN_PADDING, 0]),
        opacity: opacityAnimatedValue.value
    }));
    const itemAnimatedStyles = useAnimatedStyle(() => ({
        height: ITEM_HEIGHT,
        transform: [{ scale: interpolate(animatedValue.value, [0, .5, 1], [1, .8, .5]) }],
        opacity: interpolate(animatedValue.value, [0, .8], [1, 0]),
        borderRadius: BORDER_RADIUS
    }));

    // useEffect(() => {
    //     navigation.addListener('focus', () => setActiveTimerId(null));
    //     return () => navigation.removeListener('focus', () => setActiveTimerId(null));
    // }, []);
    // useEffect(() => {
    //     Animated.timing(animatedValue, {
    //         toValue: Number(activeTimerId !== event?.id),
    //         duration: 200,
    //         useNativeDriver: true
    //     }).start();
    // }, [activeTimerId]);

    return (
        <Fragment>
            <Animated.View style={itemContainerAnimatedStyles}>
                <TouchableNativeFeedback onPress={timerItemPressHandler}>
                    <ContextMenuView
                        previewConfig={{
                            borderRadius: BORDER_RADIUS
                        }}
                        menuConfig={{
                            menuTitle: getEventContextMenuTitle(event),
                            menuPreferredElementSize: 'large',
                            menuItems: eventContextMenuItems
                        }}
                        isContextMenuEnabled={isContextMenuEnabled}
                        onPressMenuItem={({ nativeEvent }) => {
                            switch(nativeEvent.actionKey) {
                                case 'edit':
                                    navigation.navigate('edit-event', { event });
                                    break;
                                case 'share':
                                    share(event?.title, eventRef);
                                    break;
                                case 'show_in_widget':
                                    event && RNSharedWidget.setWidgetData(
                                        'eventWidget',
                                        JSON.stringify({
                                            title: event?.title ?? '',
                                            // date: 'LL LTS',
                                            timer: useCountdownTimer(event?.timer).duration.toString(),
                                            image: event?.image?.uri ?? ''
                                        }),
                                        status => console.log(status)
                                    );
                                    break;
                                case 'delete':
                                    removeHandler(event?.id)
                                    break;
                            }
                        }}
                        onPressMenuPreview={timerItemPressHandler}
                        onMenuWillShow={() => StatusBar.setHidden(true, 'fade')}
                        onMenuWillHide={() => StatusBar.setHidden(false, 'fade')}
                    >
                        <Animated.View style={[styles.container, itemAnimatedStyles]}>
                            <FastImage source={event?.image} style={styles.image} resizeMode='cover' ref={imageRef} />
                            <Timer title={event?.title} timer={event?.timer} style={StyleSheet.absoluteFillObject} short />
                        </Animated.View>
                    </ContextMenuView>
                </TouchableNativeFeedback>
            </Animated.View>
            
            <SharableEventShot title={event?.title} image={event?.image} timer={event?.timer} ref={eventRef} />
        </Fragment>
    );
};

export default EventsListItemDetail;
