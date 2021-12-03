import {applyMiddleware, combineReducers, createStore} from "redux";
import {TaskActionsType, taskReducer} from "../features/TodolistsList/task_reducer";
import {TodolistActionsType, todolistReducer} from "../features/TodolistsList/todolist_reducer";
import thunk, {ThunkAction} from "redux-thunk";
import {TypedUseSelectorHook, useSelector} from "react-redux";
import {AppActionsType, appReducer} from "./app-reducer";
import {AuthActionsType, authReducer} from "../features/Login/auth-reducer";

const rootReducer = combineReducers({
    todolists: todolistReducer,
    tasks: taskReducer,
    app: appReducer,
    auth: authReducer,
});

export type AppRootStateType = ReturnType<typeof rootReducer>;
// Типы actions для всего App
export type GlobalActionsType = AppActionsType
    | AuthActionsType
    | TodolistActionsType
    | TaskActionsType

// Типизация для других thunk внутри TC
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppRootStateType, unknown, GlobalActionsType>
// Типизация чтобы не писать каждый раз тип RootState:
export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector;
export const store = createStore(rootReducer, applyMiddleware(thunk));

// store.subscribe(() => {
//     console.log('TASKS', store.getState().tasks);
//     console.log('TODOLISTS', store.getState().todolists);
// });

//@ts-ignore
window.store = store;