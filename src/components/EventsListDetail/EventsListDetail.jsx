import React, { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useTheme } from '@react-navigation/native';
import Animated from 'react-native-reanimated';
import { nanoid } from 'nanoid/non-secure';
import { removeEvent } from '../../stores/events/events.reducer';
import EventsListItemDetail from '../EventsListItemDetail';
import SwipableItem from '../SwipableItem';
import { styles } from './EventsListDetail.styles';

const EventsListDetail = ({ events, style, share, isContextMenuEnabled = true, isTitleEditable }) => {
    const dispatch = useDispatch();
    const theme = useTheme();

    const removeItemHandler = id => {
        dispatch(removeEvent(id));
    };

    const swipableItemsRefs = [];
    let prevOpenedItem = useRef(null);

    const closeItem = index => {
        if(prevOpenedItem.current && prevOpenedItem.current !== swipableItemsRefs[index]) {
            prevOpenedItem.current?.close();
        }

        prevOpenedItem.current = swipableItemsRefs[index];
    };
    return (
        <Animated.View style={[styles.eventsListDetailContainer, style]}>
            { events.map((event, index) => (
                <SwipableItem
                    key={nanoid()}
                    index={index}
                    enabled={false}
                    leftActions={[{ systemName: 'bell.slash', onPress: () => removeItemHandler(event?.id) }]}
                    rightActions={[{ systemName: 'trash', color: theme.colors.notification, onPress: () => removeItemHandler(event?.id) }]}
                    refs={swipableItemsRefs}
                    prevOpenedItem={prevOpenedItem}
                    closeItem={closeItem}
                >
                    <EventsListItemDetail
                        event={event}
                        share={share}
                        remove={removeItemHandler}
                        isContextMenuEnabled={isContextMenuEnabled}
                        isTitleEditable={isTitleEditable}
                    />
                </SwipableItem>
            )) }
        </Animated.View>
    );
};

export default EventsListDetail;
