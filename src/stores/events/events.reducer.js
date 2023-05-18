import { createSlice } from '@reduxjs/toolkit';
import defaultBackgroundImage from '../../assets/images/default.jpg';
import { getRandomId } from '../../utils/getRandomId';
import {
    EDIT_EVENT, EDIT_EMPTY_EVENT,
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
        id: undefined,
        title: '',
        timer: {
            date: null,
            time: null,
            repeat: {
                amount: repeatPickerValues.amounts[0],
                label: repeatPickerValues.labels[2]
            },
            // time: { days: null, hours: null, minutes: null, seconds: null },
            fontFamily: fontFamilies[0],
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
                    date: JSON.stringify(new Date('2023-06-25')),
                    time: JSON.stringify(new Date('2023-06-25T03:24:00')),
                    repeat: {
                        amount: repeatPickerValues.amounts[0],
                        label: repeatPickerValues.labels[2]
                    },
                    fontFamily: fontFamilies[0],
                    fontColor: '#000',
                    backgroundColor: 'rgba(255, 255, 255, 0.2)',
                    backgroundOpacity: 0.1,
                    displayUnits: {
                        years: true,
                        months: true,
                        weeks: true,
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
                    date: JSON.stringify(new Date('2023-12-30')),
                    time: JSON.stringify(new Date('2023-12-30T24:00:00')),
                    repeat: {
                        amount: repeatPickerValues.amounts[0],
                        label: repeatPickerValues.labels[2]
                    },
                    fontFamily: fontFamilies[5],
                    fontColor: '#fff',
                    backgroundColor: 'rgba(0, 0, 0, .1)',
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
                image: require('../../assets/images/new-year.jpg')
            },
            {
                id: '3',
                title: 'Halloween',
                timer: {
                    date: JSON.stringify(new Date('2023-07-25')),
                    time: JSON.stringify(new Date('2023-07-25T03:24:00')),
                    repeat: {
                        amount: repeatPickerValues.amounts[0],
                        label: repeatPickerValues.labels[2]
                    },
                    fontFamily: fontFamilies[4],
                    fontColor: '#fff',
                    backgroundColor: 'rgba(22, 252, 222, .1)',
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
            payload.id = getRandomId();
            state.events = [...state.events, payload];
        },
        addEmptyEvent: (state, { payload }) => {
            if(payload) {
                state.emptyEvent = payload;
                return;
            }
            state.emptyEvent = initialState.emptyEvent;
        },
        editEvent: (state, { payload }) => {
            const eventToEdit = state.emptyEvent;

            switch(payload.type) {
                case CHANGE_NAME:
                    eventToEdit.title = payload.value;
                    break;
                case CHANGE_DATE:
                    eventToEdit.timer.date = payload.value;
                    break;
                case CHANGE_TIME:
                    eventToEdit.timer.time = payload.value;
                    break;
                case CHANGE_REPEAT_AMOUNT:
                    eventToEdit.timer.repeat.amount = payload.value;
                    break;
                case CHANGE_REPEAT_LABEL:
                    eventToEdit.timer.repeat.label = payload.value;
                    break;
                case TOGGLE_NOTIFICATION:
                    eventToEdit.notification = !eventToEdit.notification;
                    break;
                case CHANGE_BACKGROUND_IMAGE:
                    eventToEdit.image = payload.value;
                    break;
                case CHANGE_FONT_FAMILY:
                    eventToEdit.timer.fontFamily = payload.value.fontFamily;
                    break;
                case CHANGE_FONT_COLOR:
                    eventToEdit.timer.fontColor = payload.value.fontColor;
                    break;
                case CHANGE_BACKGROUND_COLOR:
                    eventToEdit.timer.backgroundColor = payload.value.backgroundColor;
                    break;
                case CHANGE_BACKGROUND_OPACITY:
                    eventToEdit.timer.backgroundOpacity = payload.value.backgroundOpacity;
                    eventToEdit.timer.backgroundColor = payload.value.backgroundColor;
                    break;
                case CHANGE_DISPLAY_UNIT:
                    eventToEdit.timer.displayUnits = {
                        ...eventToEdit.timer.displayUnits,
                        ...payload.value
                    };
                    break;
                default:
                    break;
            }
        },
        saveEmptyEvent: (state, { payload }) => {
            const { id } = payload;
            const eventToSaveIndex = state.events.findIndex(event => event.id === id);
            if(eventToSaveIndex !== -1) {
                state.events[eventToSaveIndex] = state.emptyEvent;
            } else {
                state.events = [...state.events, state.emptyEvent];
            }
        },
        resetEmptyEvent: state => {
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
    editEvent,
    editEmptyEvent,
    saveEmptyEvent,
    resetEmptyEvent,
    updateListAppearence,
    toggleListAppearence
} = eventsSlice.actions;
export default eventsSlice.reducer;
