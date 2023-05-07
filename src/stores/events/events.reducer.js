import { createSlice } from '@reduxjs/toolkit';
import defaultBackgroundImage from '../../assets/images/default.jpg';
import {
    CHANGE_NAME, CHANGE_DATE, CHANGE_TIME,
    CHANGE_REPEAT_AMOUNT, CHANGE_REPEAT_LABEL,
    TOGGLE_NOTIFICATION, CHANGE_BACKGROUND_IMAGE,
    CHANGE_FONT_FAMILY, CHANGE_FONT_COLOR,
    CHANGE_BACKGROUND_COLOR, CHANGE_BACKGROUND_OPACITY,
    CHANGE_DISPLAY_UNIT, repeatPickerValues, fontFamilies
} from '../../constants';

export const listAppearences = {
    DETAIL: 'DETAIL',
    REGULAR: 'REGULAR'
};

const initialState = {
    emptyEvent: {
        title: '',
        timer: {
            date: null,
            time: null,
            repeat: {
                amount: repeatPickerValues.amounts[0],
                label: repeatPickerValues.labels[2]
            },
            // time: { days: null, hours: null, minutes: null, seconds: null },
            fontFamily: '',
            fontColor: '',
            backgroundColor: '',
            backgroundOpacity: 0.1,
            displayUnits: {
                years: false,
                months: false,
                weeks: false,
                days: true,
                hours: true,
                minutes: true,
                seconds: true
            }
        },
        image: defaultBackgroundImage,
        notification: true
    }
}

const eventsSlice = createSlice({
    name: 'events',
    initialState: {
        events: [
            {
                id: '1',
                title: 'Wedding',
                timer: {
                    date: JSON.stringify(new Date()),
                    time: JSON.stringify(new Date()),
                    displayUnits: {
                        years: false,
                        months: false,
                        weeks: false,
                        days: true,
                        hours: true,
                        minutes: true,
                        seconds: true
                    }
                },
                image: require('../../assets/images/wedding.jpg')
            },
            {
                id: '2',
                title: 'New Year',
                timer: {
                    date: JSON.stringify(new Date()),
                    time: JSON.stringify(new Date()),
                    displayUnits: {
                        years: false,
                        months: false,
                        weeks: false,
                        days: true,
                        hours: true,
                        minutes: true,
                        seconds: true
                    }
                },
                image: require('../../assets/images/new-year.jpg')
            },
            {
                id: '3',
                title: 'Halloween',
                timer: {
                    date: JSON.stringify(new Date()),
                    time: JSON.stringify(new Date()),
                    displayUnits: {
                        years: false,
                        months: false,
                        weeks: false,
                        days: true,
                        hours: true,
                        minutes: true,
                        seconds: true
                    }
                },
                image: require('../../assets/images/halloween.jpg')
            },
            // {
            //     id: '4',
            //     title: 'Rendezvous',
            //     time: { days: 324, hours: 7, minutes: 42, seconds: 13 },
            //     image: require('../../assets/images/rendezvous.jpg')
            // },
            // {
            //     id: '5',
            //     title: 'Wedding',
            //     time: { days: 324, hours: 7, minutes: 42, seconds: 13 },
            //     image: require('../../assets/images/wedding.jpg')
            // },
            // {
            //     id: '6',
            //     title: 'New Year',
            //     time: { days: 324, hours: 7, minutes: 42, seconds: 13 },
            //     image: require('../../assets/images/new-year.jpg')
            // },
            // {
            //     id: '7',
            //     title: 'Halloween',
            //     time: { days: 324, hours: 7, minutes: 42, seconds: 13 },
            //     image: require('../../assets/images/halloween.jpg')
            // },
            // {
            //     id: '8',
            //     title: 'Rendezvous',
            //     time: { days: 324, hours: 7, minutes: 42, seconds: 13 },
            //     image: require('../../assets/images/rendezvous.jpg')
            // }
        ],
        emptyEvent: {},
        eventsListAppearence: listAppearences.DETAIL
    },
    reducers: {
        addEvent: (state, { payload }) => {
            state.events = [...state.events, payload];
        },
        addEmptyEvent: state => {
            state.emptyEvent = initialState.emptyEvent
        },
        editNewEvent: (state, { payload }) => {
            switch(payload.type) {
                case CHANGE_NAME:
                    state.emptyEvent.title = payload.value;
                    break;
                case CHANGE_DATE:
                    state.emptyEvent.timer.date = payload.value;
                    break;
                case CHANGE_TIME:
                    state.emptyEvent.timer.time = payload.value;
                    break;
                case CHANGE_REPEAT_AMOUNT:
                    state.emptyEvent.timer.repeat.amount = payload.value;
                    break;
                case CHANGE_REPEAT_LABEL:
                    state.emptyEvent.timer.repeat.label = payload.value;
                    break;
                case TOGGLE_NOTIFICATION:
                    state.emptyEvent.notification = !state.emptyEvent.notification;
                    break;
                case CHANGE_BACKGROUND_IMAGE:
                    state.emptyEvent.image = payload.value;
                    break;
                case CHANGE_FONT_FAMILY:
                    state.emptyEvent.timer.fontFamily = payload.value.fontFamily;
                    break;
                case CHANGE_FONT_COLOR:
                    state.emptyEvent.timer.fontColor = payload.value.fontColor;
                    break;
                case CHANGE_BACKGROUND_COLOR:
                    state.emptyEvent.timer.backgroundColor = payload.value.backgroundColor;
                    break;
                case CHANGE_BACKGROUND_OPACITY:
                    state.emptyEvent.timer.backgroundOpacity = payload.value.backgroundOpacity;
                    state.emptyEvent.timer.backgroundColor = payload.value.backgroundColor;
                    break;
                case CHANGE_DISPLAY_UNIT:
                    state.emptyEvent.timer.displayUnits = { ...state.emptyEvent.timer.displayUnits, ...payload.value };
                    break;
                default:
                    break;
            }
        },
        saveNewEvent: state => {
            state.events = [...state.events, state.emptyEvent];
        },
        resetNewEvent: state => {
            state.emptyEvent = initialState.emptyEvent;
        },
        updateListAppearence: (state, { payload }) => {
            state.eventsListAppearence = payload;
        },
        toggleListAppearence: state => {
            state.eventsListAppearence = state.eventsListAppearence === listAppearences.DETAIL
                ? listAppearences.REGULAR
                : listAppearences.DETAIL;
        }
    }
});

export const {
    addEvent,
    addEmptyEvent,
    editNewEvent,
    saveNewEvent,
    resetNewEvent,
    updateListAppearence,
    toggleListAppearence
} = eventsSlice.actions;
export default eventsSlice.reducer;
