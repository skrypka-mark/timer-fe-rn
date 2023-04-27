import React, { useRef, useState, useEffect } from 'react';
import { TouchableWithoutFeedback, View, Text, Image, Animated, StyleSheet, StatusBar } from 'react-native';
import { useNavigation, useTheme } from '@react-navigation/native';
import { ContextMenuView } from 'react-native-ios-context-menu';
import TimerTime from '../../../../components/TimerTime';
import { styles } from './EventsListItemBar.styles';
import Timer from '../../../../features/AnimatedEventScreen/components/Timer';
import { SCREEN_PADDING } from '../../../../theme';

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
            <ContextMenuView
                style={{ marginBottom: 10 }}
                onPressMenuPreview={timerItemPressHandler}
                // previewConfig={{
                //     previewType: 'CUSTOM',
                //     previewSize: 'STRETCH',
                //     borderRadius: 10
                // }}
                // renderPreview={() => (
                //     <Animated.View style={[styles.container, { position: 'relative' }]}>
                //         <Image source={image} style={styles.image} resizeMode='cover' />
                //         <Timer
                //             title={title}
                //             time={time}
                //             style={[
                //                 StyleSheet.absoluteFillObject,
                //                 {
                //                     top: SCREEN_PADDING,
                //                     bottom: 'auto',
                //                     height: 120,
                //                     marginHorizontal: SCREEN_PADDING,
                //                     borderRadius: BORDER_RADIUS,
                //                 }
                //             ]}
                //         />
                //     </Animated.View>
                // )}
                menuConfig={{
                    menuTitle: '',
                    menuPreferredElementSize: 'large',
                    menuItems: [
                        {
                            actionKey: 'key-01',
                            actionTitle: 'Edit',
                            icon: {
                                type: 'IMAGE_SYSTEM',
                                imageValue: {
                                    systemName: 'square.and.pencil'
                                }
                            }
                        },
                        {
                            actionKey: 'key-02',
                            actionTitle: 'Share',
                            icon: {
                                type: 'IMAGE_SYSTEM',
                                imageValue: {
                                    systemName: 'square.and.arrow.up'
                                }
                            }
                        },
                        {
                            actionKey: 'key-03',
                            actionTitle: 'Delete',
                            menuAttributes: ['destructive'],
                            icon: {
                                type: 'IMAGE_SYSTEM',
                                imageValue: {
                                    systemName: 'trash'
                                }
                            }
                        }
                    ]
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

export default EventsListItemBar;
