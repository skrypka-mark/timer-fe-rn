import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import defaultBackgroundImage from '../../assets/images/default.jpg';
import { addEvent } from '../events/events.reducer';
import {
    CHANGE_NAME, CHANGE_DATE, CHANGE_TIME,
    CHANGE_REPEAT_AMOUNT, CHANGE_REPEAT_LABEL,
    TOGGLE_NOTIFICATION, CHANGE_BACKGROUND_IMAGE,
    CHANGE_FONT_FAMILY, CHANGE_FONT_COLOR,
    CHANGE_BACKGROUND_COLOR, CHANGE_BACKGROUND_OPACITY,
    repeatPickerValues
} from '../../constants';

const initialState = {
    newEvent: {
        title: '',
        timer: {
            date: null,
            time: null,
            repeat: {
                amount: repeatPickerValues.amounts[0],
                label: repeatPickerValues.labels[2]
            },
            fontFamily: '',
            fontColor: '',
            backgroundColor: '',
            backgroundOpacity: 0.1
        },
        image: defaultBackgroundImage,
        notification: true
    }
}

export const saveNewEvent = createAsyncThunk(
    'saveNewEvent',
    (newEvent, { dispatch }) => {
        dispatch(addEvent(newEvent));
    }
);

const newEventSlice = createSlice({
    name: 'newEvent',
    initialState,
    reducers: {
        // setNewEvent: state => {
        //     state.newEvent = {
        //         title: '',
        //         timer: {
        //             date: null,
        //             time: null,
        //             repeat: {
        //                 amount: repeatPickerValues.amounts[0],
        //                 label: repeatPickerValues.labels[2]
        //             },
        //             // time: { days: null, hours: null, minutes: null, seconds: null },
        //             fontFamily: '',
        //             fontColor: '',
        //             backgroundColor: '',
        //             backgroundOpacity: 0
        //         },
        //         image: defaultBackgroundImage,
        //         notification: true
        //     };
        // },
        editNewEvent: (state, { payload }) => {
            switch(payload.type) {
                case CHANGE_NAME:
                    state.newEvent.title = payload.value;
                    break;
                case CHANGE_DATE:
                    state.newEvent.timer.date = payload.value;
                    break;
                case CHANGE_TIME:
                    state.newEvent.timer.time = payload.value;
                    break;
                case CHANGE_REPEAT_AMOUNT:
                    state.newEvent.timer.repeat.amount = payload.value;
                    break;
                case CHANGE_REPEAT_LABEL:
                    state.newEvent.timer.repeat.label = payload.value;
                    break;
                case TOGGLE_NOTIFICATION:
                    state.newEvent.notification = !state.newEvent.notification;
                    break;
                case CHANGE_BACKGROUND_IMAGE:
                    state.newEvent.image = payload.value;
                    break;
                case CHANGE_FONT_FAMILY:
                    state.newEvent.timer.fontFamily = payload.value.fontFamily;
                    break;
                case CHANGE_FONT_COLOR:
                    state.newEvent.timer.fontColor = payload.value.fontColor;
                    break;
                case CHANGE_BACKGROUND_COLOR:
                    state.newEvent.timer.backgroundColor = payload.value.backgroundColor;
                    break;
                case CHANGE_BACKGROUND_OPACITY:
                    state.newEvent.timer.backgroundOpacity = payload.value.backgroundOpacity;
                    break;
                default:
                    break;
            }
        },
        resetNewEvent: state => {
            state.newEvent = initialState.newEvent;
        }
    }
});

export const { setNewEvent, editNewEvent, resetNewEvent } = newEventSlice.actions;
export default newEventSlice.reducer;
