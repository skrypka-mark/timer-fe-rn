import React, { useRef, useState, useEffect, cloneElement } from 'react';
import { TouchableWithoutFeedback, View, Text, Image, Animated, StyleSheet, StatusBar } from 'react-native';
import { useNavigation, useTheme } from '@react-navigation/native';
import { ContextMenuView } from 'react-native-ios-context-menu';
// import TimerTime from '../../../../components/TimerTime';
import Timer from '../../features/AnimatedEventScreen/components/Timer';
import { eventContextMenuItems } from '../../constants';
import { styles } from './EventsListItemDetail.styles';

const BORDER_RADIUS = 10;

const EventsListItemDetail = ({ id, title, time, image }) => {
    const navigation = useNavigation();

    const imageRef = useRef(null);
    const animatedValue = useRef(new Animated.Value(1)).current;
    const [activeTimerId, setActiveTimerId] = useState(null);

    const timerItemPressHandler = () => {
        imageRef.current?.measure((x, y, width, height, pageX, pageY) => {
            const imageSpecs = { width, height, pageX, pageY, borderRadius: BORDER_RADIUS };
            navigation.navigate('event', { id, title, time, image, imageSpecs })
        });
        setActiveTimerId(id);
    };

    useEffect(() => {
        navigation.addListener('focus', () => setActiveTimerId(null));
        return () => navigation.removeListener('focus', () => setActiveTimerId(null));
    }, []);
    // useEffect(() => {
    //     Animated.timing(animatedValue, {
    //         toValue: Number(activeTimerId !== id),
    //         duration: 200,
    //         useNativeDriver: true
    //     }).start();
    // }, [activeTimerId]);

    return (
        <TouchableWithoutFeedback onPress={timerItemPressHandler}>
            <ContextMenuView
                style={{ marginBottom: 10 }}
                onPressMenuPreview={timerItemPressHandler}
                menuConfig={{
                    menuTitle: '',
                    menuPreferredElementSize: 'large',
                    menuItems: eventContextMenuItems
                }}
                onMenuWillShow={() => StatusBar.setHidden(true, 'fade')}
                onMenuWillHide={() => StatusBar.setHidden(false, 'fade')}
            >
                <Animated.View style={[styles.container, { borderRadius: BORDER_RADIUS, opacity: animatedValue }]}>
                    <Image source={image} style={styles.image} resizeMode='cover' ref={imageRef} />
                    <Timer title={title} time={time} blurAmount={0} style={StyleSheet.absoluteFillObject} />
                        {/* <Text style={styles.title}>
                            { title }
                        </Text>
                        <View style={styles.timeContainer}>
                            <TimerTime time={time} style={styles.time} />
                        </View> */}
                </Animated.View>
            </ContextMenuView>
        </TouchableWithoutFeedback>
    );
};

export default EventsListItemDetail;
