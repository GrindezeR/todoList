import {combineReducers} from "redux";
import {TaskActionsType, taskReducer} from "../features/TodolistsList/task_reducer";
import {TodolistActionsType, todolistReducer} from "../features/TodolistsList/todolist_reducer";
import thunk, {ThunkAction} from "redux-thunk";
import {TypedUseSelectorHook, useSelector} from "react-redux";
import {AppActionTypes, appReducer} from "../app/app-reducer";
import {authReducer} from "../features/Login/auth-reducer";
import {configureStore} from "@reduxjs/toolkit";

const rootReducer = combineReducers({
    todolists: todolistReducer,
    tasks: taskReducer,
    app: appReducer,
    auth: authReducer,
});

export type AppRootStateType = ReturnType<typeof rootReducer>;

// Типы actions для всего App
export type GlobalActionsType = AppActionTypes
    | TodolistActionsType
    | TaskActionsType

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppRootStateType, unknown, GlobalActionsType> // Типизация для других thunk внутри TC
export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector; // Типизация чтобы не писать каждый раз тип RootState
// export const store = createStore(rootReducer, applyMiddleware(thunk)); //Подключение без redux-toolkit

export const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware => getDefaultMiddleware().prepend(thunk),
})
// store.subscribe(() => {
//     console.log('TASKS', store.getState().tasks);
//     console.log('TODOLISTS', store.getState().todolists);
// });

//@ts-ignore
window.store = store;