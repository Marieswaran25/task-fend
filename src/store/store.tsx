'use client';

import { configureStore } from '@reduxjs/toolkit';

import usersApi from './hooks/use-users-query';
import userReducer from './slices/users';

export const makeStore = () => {
    return configureStore({
        reducer: {
            users: userReducer,
            [usersApi.reducerPath]: usersApi.reducer,
        },
        middleware: getDefaultMiddleware => getDefaultMiddleware().concat([usersApi.middleware]),
    });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
