import { createSlice } from '@reduxjs/toolkit';
import { CHANGE_NAME } from '../../constants';

export const listAppearences = {
    DETAIL: 'DETAIL',
    REGULAR: 'REGULAR'
};

const eventsSlice = createSlice({
    name: 'events',
    initialState: {
        events: [
            {
                id: '1',
                title: 'Wedding',
                time: { days: 324, hours: 7, minutes: 42, seconds: 13 },
                image: require('../../assets/images/wedding.jpg')
            },
            {
                id: '2',
                title: 'New Year',
                time: { days: 324, hours: 7, minutes: 42, seconds: 13 },
                image: require('../../assets/images/new-year.jpg')
            },
            {
                id: '3',
                title: 'Halloween',
                time: { days: 324, hours: 7, minutes: 42, seconds: 13 },
                image: require('../../assets/images/halloween.jpg')
            },
            {
                id: '4',
                title: 'Rendezvous',
                time: { days: 324, hours: 7, minutes: 42, seconds: 13 },
                image: require('../../assets/images/rendezvous.jpg')
            },
            {
                id: '5',
                title: 'Wedding',
                time: { days: 324, hours: 7, minutes: 42, seconds: 13 },
                image: require('../../assets/images/wedding.jpg')
            },
            {
                id: '6',
                title: 'New Year',
                time: { days: 324, hours: 7, minutes: 42, seconds: 13 },
                image: require('../../assets/images/new-year.jpg')
            },
            {
                id: '7',
                title: 'Halloween',
                time: { days: 324, hours: 7, minutes: 42, seconds: 13 },
                image: require('../../assets/images/halloween.jpg')
            },
            {
                id: '8',
                title: 'Rendezvous',
                time: { days: 324, hours: 7, minutes: 42, seconds: 13 },
                image: require('../../assets/images/rendezvous.jpg')
            }
        ],
        newEvent: {},
        eventsListAppearence: listAppearences.DETAIL
    },
    reducers: {
        createEvent: state => {
            state.newEvent = {
                title: '',
                timer: {
                    time: { days: null, hours: null, minutes: null, seconds: null },
                    fontFamily: '',
                    fontColor: '',
                    backgroundColor: '',
                    backgroundOpacity: 0.1,
                },
                image: require('../../assets/images/default.jpg')
            };
        },
        editEvent: (state, { payload }) => {
            console.log(payload);
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

export const { createEvent, editEvent, updateListAppearence, toggleListAppearence } = eventsSlice.actions;
export default eventsSlice.reducer;
