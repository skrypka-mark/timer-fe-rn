import { configureStore } from '@reduxjs/toolkit';
import events from './events/events.reducer';
import newEvent from './new-event/new-event.reducer';

export const store = configureStore({
    reducer: {
        events, newEvent
    }
});
