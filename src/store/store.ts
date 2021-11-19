import {applyMiddleware, combineReducers, createStore} from "redux";
import {taskReducer} from "../state/task_reducer";
import {todolistReducer} from "../state/todolist_reducer";
import thunk from "redux-thunk";

const rootReducer = combineReducers({
    todolists: todolistReducer,
    tasks: taskReducer
});

export type AppRootStateType = ReturnType<typeof rootReducer>;

export const store = createStore(rootReducer, applyMiddleware(thunk));

// store.subscribe(() => {
//     console.log('TASKS', store.getState().tasks);
//     console.log('TODOLISTS', store.getState().todolists);
// });

//@ts-ignore
window.store = store;