import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { combineReducers } from 'redux';
import formReducer from './formSlice';
import pollReducer from './pollSlice';
import { enableMapSet } from 'immer';
enableMapSet();

const rootReducer = combineReducers({
    form: formReducer,
    poll: pollReducer

});

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    whitelist: ['poll', 'form'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
