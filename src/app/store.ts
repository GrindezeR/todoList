import {applyMiddleware, combineReducers, createStore} from "redux";
import {taskReducer} from "../features/TodolistsList/task_reducer";
import {todolistReducer} from "../features/TodolistsList/todolist_reducer";
import thunk from "redux-thunk";
import {TypedUseSelectorHook, useSelector} from "react-redux";
import {appReducer} from "./app-reducer";

const rootReducer = combineReducers({
    todolists: todolistReducer,
    tasks: taskReducer,
    app: appReducer,
});

export type AppRootStateType = ReturnType<typeof rootReducer>;

//Типизация чтобы не писать каждый раз тип RootState:
export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector;
export const store = createStore(rootReducer, applyMiddleware(thunk));

// store.subscribe(() => {
//     console.log('TASKS', store.getState().tasks);
//     console.log('TODOLISTS', store.getState().todolists);
// });

//@ts-ignore
window.store = store;