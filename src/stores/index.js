import { configureStore } from '@reduxjs/toolkit';
import events from './events/events.reducer';

export const store = configureStore({
    reducer: {
        events
    }
});
