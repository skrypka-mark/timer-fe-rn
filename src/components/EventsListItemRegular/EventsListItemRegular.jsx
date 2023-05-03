import React, { useRef, useState, useEffect } from 'react';
import { TouchableWithoutFeedback, View, Text, Image, Animated, StyleSheet, StatusBar } from 'react-native';
import { useNavigation, useTheme } from '@react-navigation/native';
import { ContextMenuView } from 'react-native-ios-context-menu';
import Timer from '../../features/AnimatedEventScreen/components/Timer';
import { RenderTimerShort } from '../../components/TimerTime';
import { eventContextMenuItems } from '../../constants';
import { SCREEN_PADDING } from '../../theme';
import { styles } from './EventsListItemRegular.styles';

const BORDER_RADIUS = 5;

const EventsListItemRegular = ({ id, title, time, image }) => {
    const navigation = useNavigation();
    const theme = useTheme();

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

    const renderContextMenuPreview = () => (
        <Animated.View style={{ position: 'relative' }}>
            <Image source={image} style={{ width: '100%', height: '100%' }} resizeMode='cover' />
            <Timer
                title={title}
                time={time}
                style={[
                    StyleSheet.absoluteFillObject,
                    {
                        top: SCREEN_PADDING,
                        bottom: 'auto',
                        height: 120,
                        marginHorizontal: SCREEN_PADDING,
                        borderRadius: 15,
                    }
                ]}
            />
        </Animated.View>
    );

    return (
        <TouchableWithoutFeedback onPress={timerItemPressHandler}>
            <ContextMenuView
                style={{ marginBottom: 8 }}
                onPressMenuPreview={timerItemPressHandler}
                previewConfig={{
                    previewType: 'CUSTOM',
                    previewSize: 'STRETCH',
                    borderRadius: 5
                }}
                renderPreview={renderContextMenuPreview}
                menuConfig={{
                    menuTitle: '',
                    menuPreferredElementSize: 'large',
                    menuItems: eventContextMenuItems
                }}
                onMenuWillShow={() => StatusBar.setHidden(true, 'fade')}
                onMenuWillHide={() => StatusBar.setHidden(false, 'fade')}
            >
                <Animated.View style={[styles.container, { opacity: animatedValue }]}>
                    <Image
                        source={image}
                        style={[styles.image, { borderRadius: BORDER_RADIUS }]}
                        resizeMode='cover'
                        ref={imageRef}
                    />
                    <View style={styles.textContainer}>
                        <Text style={[styles.title, { color: theme.colors.text }]}>
                            { title }
                        </Text>
                        <RenderTimerShort time={time} style={[styles.time, { color: theme.colors.textSecondary }]} />
                    </View>
                </Animated.View>
            </ContextMenuView>
        </TouchableWithoutFeedback>
    );
};

export default EventsListItemRegular;
