import { createSlice } from '@reduxjs/toolkit';

const newEventReducer = createSlice({
    name: 'newEvent',
    initialState: {
        event: {
            id: String(state.events.length),
            title: '',
            timer: {
                time: { days: null, hours: null, minutes: null, seconds: null },
                fontFamily: '',
                fontColor: '',
                backgroundColor: '',
                backgroundOpacity: 0.1,
            },
            image: require('../../assets/images/wedding.jpg')
        }
    },
    reducers: {
        newEvent: (state, action) => {
            state.events.push({
                id: String(state.events.length),
                title: '',
                timer: {
                    time: { days: null, hours: null, minutes: null, seconds: null },
                    fontFamily: '',
                    fontColor: '',
                    backgroundColor: '',
                    backgroundOpacity: 0.1,
                },
                image: require('../../assets/images/wedding.jpg')
            });
        }
    }
});