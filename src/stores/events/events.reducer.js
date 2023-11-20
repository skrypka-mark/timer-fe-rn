import { createSlice } from '@reduxjs/toolkit';
import { getRandomId, convertColorWithAlpha } from '../../helpers/utils';
import { firebaseStorageURL } from '../../lib/firebase/config';
import {
  CHANGE_NAME,
  CHANGE_DATE,
  CHANGE_TIME,
  CHANGE_REPEAT_AMOUNT,
  CHANGE_REPEAT_LABEL,
  TOGGLE_NOTIFICATION,
  CHANGE_BACKGROUND_IMAGE,
  CHANGE_FONT_FAMILY,
  CHANGE_FONT_COLOR,
  CHANGE_BACKGROUND_COLOR,
  CHANGE_BACKGROUND_OPACITY,
  CHANGE_DISPLAY_UNIT,
  repeatPickerValues,
  fontFamilies
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
      date: JSON.stringify(new Date()),
      time: JSON.stringify(new Date()),
      repeat: {
        amount: repeatPickerValues.amounts[0],
        label: repeatPickerValues.labels[2]
      },
      // time: { days: null, hours: null, minutes: null, seconds: null },
      fontFamily: fontFamilies[0],
      fontColor: '#fff',
      backgroundColor: convertColorWithAlpha('#000', 0.6),
      backgroundOpacity: 0.6,
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
    image: { uri: `${firebaseStorageURL}default.jpg?alt=media&token=e47b9b0b-566f-4271-8a49-9bb6c87bdaea` },
    notification: true,
    createdAt: ''
  }
};

const eventsSlice = createSlice({
  name: 'events',
  initialState: {
    events: [
      {
        id: getRandomId(),
        title: 'Wedding',
        timer: {
          date: JSON.stringify(new Date('2023-06-25')),
          time: JSON.stringify(new Date('2023-06-25T03:24:00')),
          repeat: {
            amount: repeatPickerValues.amounts[0],
            label: repeatPickerValues.labels[2]
          },
          fontFamily: fontFamilies[1],
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
        image: { uri: `${firebaseStorageURL}wedding.jpg?alt=media&token=c01a3d4a-1643-43a9-ad43-08ee99678bfc` },
        notification: true,
        createdAt: ''
      },
      {
        id: getRandomId(),
        title: 'New Year',
        timer: {
          date: JSON.stringify(new Date('2023-12-30')),
          time: JSON.stringify(new Date('2023-12-30T24:00:00')),
          repeat: {
            amount: repeatPickerValues.amounts[0],
            label: repeatPickerValues.labels[2]
          },
          fontFamily: fontFamilies[6],
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
        image: { uri: `${firebaseStorageURL}new-year.jpg?alt=media&token=d4987fff-b2be-463e-b6cb-58882e60c64a` },
        notification: true,
        createdAt: ''
      },
      {
        id: getRandomId(),
        title: 'Halloween',
        timer: {
          date: JSON.stringify(new Date('2023-07-25')),
          time: JSON.stringify(new Date('2023-07-25T03:24:00')),
          repeat: {
            amount: repeatPickerValues.amounts[0],
            label: repeatPickerValues.labels[2]
          },
          fontFamily: fontFamilies[5],
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
        image: { uri: `${firebaseStorageURL}halloween.jpg?alt=media&token=99fb76e4-1cec-4601-a2c2-c61a5f50bc9a` },
        notification: true,
        createdAt: ''
      }
    ],
    emptyEvent: initialState.emptyEvent,
    openEventId: null,
    eventsListAppearence: listAppearences.DETAIL
  },
  reducers: {
    addEvent: (state, { payload }) => {
      payload.id = getRandomId();
      state.events = [...state.events, payload];
    },
    addEmptyEvent: (state, { payload }) => {
      state.emptyEvent = payload;
    },
    editEvent: (state, { payload }) => {
      const eventToEdit = state.emptyEvent;

      switch (payload.type) {
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
    updateEvent: (state, { payload }) => {
      const eventIndex = state.events.findIndex(({ id }) => id === payload?.id);

      if (eventIndex !== -1) {
        state.events[eventIndex] = payload;
      }
    },
    removeEvent: (state, { payload }) => {
      const eventToRemoveIndex = state.events.findIndex(({ id }) => id === payload);

      state.events = [...state.events.slice(0, eventToRemoveIndex), ...state.events.slice(eventToRemoveIndex + 1)];
    },
    saveEvent: (state, { payload }) => {
      const { id } = payload;
      const eventToSaveIndex = state.events.findIndex(event => event.id === id);
      if (eventToSaveIndex !== -1) {
        state.events[eventToSaveIndex] = payload;
      } else {
        state.events = [...state.events, payload];
      }
    },

    resetEmptyEvent: state => {
      state.emptyEvent = initialState.emptyEvent;
    },

    setOpenEventId: (state, { payload }) => {
      state.openEventId = payload;
    },
    resetOpenEventId: state => {
      state.openEventId = null;
    },

    updateListAppearence: (state, { payload }) => {
      state.eventsListAppearence = payload;
    },
    toggleListAppearence: state => {
      state.eventsListAppearence =
        state.eventsListAppearence === listAppearences.DETAIL ? listAppearences.REGULAR : listAppearences.DETAIL;
    }
  }
});

export const {
  addEvent,
  addEmptyEvent,
  editEvent,
  updateEvent,
  removeEvent,
  saveEvent,
  resetEmptyEvent,
  setOpenEventId,
  resetOpenEventId,
  updateListAppearence,
  toggleListAppearence
} = eventsSlice.actions;
export default eventsSlice.reducer;
