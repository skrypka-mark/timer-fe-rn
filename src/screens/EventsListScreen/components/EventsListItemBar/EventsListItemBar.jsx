import React, { useRef, useState, useEffect } from 'react';
import { TouchableWithoutFeedback, View, Text, Image, Animated, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import TimerTime from '../../../../components/TimerTime';
import { styles } from './EventsListItemBar.styles';
import Timer from '../../../EventScreen/components/Timer';

const BORDER_RADIUS = 10;

const EventsListItemBar = ({ id, title, time, image }) => {
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
            <Animated.View style={[styles.container, { borderRadius: BORDER_RADIUS, opacity: animatedValue }]}>
                <Image source={image} style={styles.image} resizeMode='cover' ref={imageRef} />
                <Timer title={title} time={time} blurAmount={1} style={StyleSheet.absoluteFillObject} />
                    {/* <Text style={styles.title}>
                        { title }
                    </Text>
                    <View style={styles.timeContainer}>
                        <TimerTime time={time} style={styles.time} />
                    </View> */}
            </Animated.View>
        </TouchableWithoutFeedback>
    );
};

export default EventsListItemBar;
