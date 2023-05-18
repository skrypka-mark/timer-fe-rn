import React, { Fragment, useRef, useState, useEffect } from 'react';
import { Pressable, View, Text, Image, Animated, StyleSheet, StatusBar } from 'react-native';
import { useNavigation, useTheme } from '@react-navigation/native';
import { ContextMenuView, ContextMenuButton } from 'react-native-ios-context-menu';
import { SFSymbol } from 'react-native-sfsymbols';
import Timer from '../../features/AnimatedEventScreen/components/Timer';
import SharableEventShot from '../SharableEventShot';
import { eventContextMenuItems } from '../../constants';
import { SCREEN_PADDING } from '../../theme';
import { styles } from './EventsListItemRegular.styles';

const BORDER_RADIUS = 5;

const EventsListItemRegular = ({ event, share }) => {
    const navigation = useNavigation();
    const theme = useTheme();

    const eventRef = useRef(null);
    const imageRef = useRef(null);
    const animatedValue = useRef(new Animated.Value(1)).current;
    const [activeTimerId, setActiveTimerId] = useState(null);
    const [isContextButtonMenuOpen, setIsContextButtonMenuOpen] = useState(false);

    const timerItemPressHandler = () => {
        imageRef.current?.measure((x, y, width, height, pageX, pageY) => {
            const imageSpecs = { width, height, pageX, pageY, borderRadius: 10, opacity: 0 };
            navigation.navigate('event', { id: event?.id, title: event?.title, timer: event?.timer, image: event?.image, imageSpecs });
        });
        setActiveTimerId(event?.id);
    };

    useEffect(() => {
        navigation.addListener('focus', () => setActiveTimerId(null));
        return () => navigation.removeListener('focus', () => setActiveTimerId(null));
    }, []);

    const renderContextMenuPreview = () => (
        <View style={{ position: 'relative' }}>
            <Image source={event?.image} style={{ width: '100%', height: '100%' }} resizeMode='cover' />
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
                share(eventRef);
                break;
            case 'delete':
                break;
        }
    };

    return (
        <Fragment>
            <ContextMenuView
                style={{ marginBottom: 8 }}
                onPressMenuPreview={timerItemPressHandler}
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
                onPressMenuItem={pressContextMenuItemHandler}
                onMenuWillShow={() => StatusBar.setHidden(true, 'fade')}
                onMenuWillHide={() => StatusBar.setHidden(false, 'fade')}
            >
                <View style={styles.container}>
                    <Pressable style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }} onPress={timerItemPressHandler}>
                        <Image
                            source={event?.image}
                            style={[styles.image, { borderRadius: BORDER_RADIUS }]}
                            resizeMode='cover'
                        />
                        <View style={styles.textContainer} ref={imageRef}>
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
                        isMenuPrimaryAction
                        menuConfig={{
                            menuTitle: '',
                            menuItems: eventContextMenuItems
                        }}
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

            <SharableEventShot title={event?.title} image={event?.image} timer={event?.timer} ref={eventRef} />
        </Fragment>
    );
};

export default EventsListItemRegular;
