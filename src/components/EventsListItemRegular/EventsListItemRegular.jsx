import React, { Fragment, useEffect, useRef, useState } from 'react';
import { Pressable, View, Text, StyleSheet, StatusBar, NativeModules } from 'react-native';
import { useNavigation, useTheme, useIsFocused } from '@react-navigation/native';
import { ContextMenuView, ContextMenuButton } from 'react-native-ios-context-menu';
import Animated, { interpolate, runOnJS, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { SFSymbol } from 'react-native-sfsymbols';
import FastImage from 'react-native-fast-image';
import Timer from '../../features/AnimatedEventScreen/components/Timer';
import SharableEventShot from '../SharableEventShot';
import { eventContextMenuItems } from '../../constants';
import { SCREEN_PADDING } from '../../theme';
import { styles } from './EventsListItemRegular.styles';

const BORDER_RADIUS = 5;

const { RNSharedWidget } = NativeModules;

const EventsListItemRegular = ({ event, share, isContextMenuEnabled, isTitleEditable }) => {
    const navigation = useNavigation();
    const theme = useTheme();
    const isScreenFocused = useIsFocused();

    const eventRef = useRef(null);
    const imageRef = useRef(null);
    const [isContextButtonMenuOpen, setIsContextButtonMenuOpen] = useState(false);

    const animatedValue = useSharedValue(0);
    const opacityAnimatedValue = useSharedValue(1);

    useEffect(() => {
        if(isScreenFocused) {
            opacityAnimatedValue.value = withTiming(1, { duration: 150 });
        }
    }, [isScreenFocused]);

    const timerItemPressHandler = () => {
        imageRef.current?.measure((x, y, width, height, pageX, pageY) => {
            opacityAnimatedValue.value = withTiming(0);

            const imageSpecs = { width, height, pageX, pageY, borderRadius: BORDER_RADIUS, opacity: 0 };
            navigation.navigate('event', { event, imageSpecs, isTitleEditable });
        });
    };

    const renderContextMenuPreview = () => (
        <View style={{ position: 'relative' }}>
            <FastImage source={event?.image} style={{ width: '100%', height: '100%' }} resizeMode='cover' />
            <Timer
                title={event?.title}
                timer={event?.timer}
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
        </View>
    );

    const pressContextMenuItemHandler = ({ nativeEvent }) => {
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
                break;
        }
    };

    const itemContainerAnimatedStyles = useAnimatedStyle(() => ({
        // width: '100%',
        // height: interpolate(animatedValue.value, [0, 1], [ITEM_HEIGHT, 0]),
        // marginBottom: interpolate(animatedValue.value, [0, 1], [SCREEN_PADDING, 0]),
        opacity: opacityAnimatedValue.value
    }));

    return (
        <Fragment>
            <Animated.View style={itemContainerAnimatedStyles}>
                <ContextMenuView
                    style={{ marginBottom: 8 }}
                    previewConfig={{
                        previewType: 'CUSTOM',
                        previewSize: 'STRETCH',
                        borderRadius: BORDER_RADIUS
                    }}
                    renderPreview={renderContextMenuPreview}
                    menuConfig={{
                        menuTitle: '',
                        menuPreferredElementSize: 'large',
                        menuItems: eventContextMenuItems
                    }}
                    isContextMenuEnabled={isContextMenuEnabled}
                    onPressMenuItem={pressContextMenuItemHandler}
                    onPressMenuPreview={timerItemPressHandler}
                    onMenuWillShow={() => StatusBar.setHidden(true, 'fade')}
                    onMenuWillHide={() => StatusBar.setHidden(false, 'fade')}
                >
                    <View style={styles.container}>
                        <Pressable style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }} onPress={timerItemPressHandler}>
                            <FastImage
                                source={event?.image}
                                style={[styles.image, { borderRadius: BORDER_RADIUS }]}
                                resizeMode='cover'
                                ref={imageRef}
                            />
                            <View style={styles.textContainer}>
                                <Text style={[styles.title, { color: theme.colors.text }]}>
                                    { event?.title }
                                </Text>
                                <Timer
                                    timer={event?.timer}
                                    containerStyle={styles.timer}
                                    style={styles.timerText}
                                    short
                                />
                            </View>
                        </Pressable>
                        <ContextMenuButton
                            style={{ marginLeft: 'auto' }}
                            menuConfig={{
                                menuTitle: '',
                                menuItems: eventContextMenuItems
                            }}
                            isMenuPrimaryAction
                            enableContextMenu={isContextMenuEnabled}
                            onPressMenuItem={pressContextMenuItemHandler}
                            onMenuWillShow={() => setIsContextButtonMenuOpen(true)}
                            onMenuWillHide={() => setIsContextButtonMenuOpen(false)}
                        >
                            <View style={{ flexDirection: 'column', justifyContent: 'center' }}>
                                <SFSymbol
                                    name='ellipsis'
                                    scale='medium'
                                    size={16}
                                    resizeMode='center'
                                    color={isContextButtonMenuOpen ? theme.colors.textSecondary : theme.colors.text}
                                    style={{ width: 16, height: 16 }}
                                />
                            </View>
                        </ContextMenuButton>
                    </View>
                </ContextMenuView>
            </Animated.View>

            <SharableEventShot title={event?.title} image={event?.image} timer={event?.timer} ref={eventRef} />
        </Fragment>
    );
};

export default EventsListItemRegular;
